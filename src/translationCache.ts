import * as fs from 'fs';
import * as BuildHelpers from './buildHelpers';
import * as CompilationCache from './compilationCache';
import * as pathPlatformDependent from "path";
const path = pathPlatformDependent.posix; // This works everywhere, just use forward slashes
import * as pathUtils from "./pathUtils";
import * as g11n from "./msgFormatParser";
import * as chalk from 'chalk';

const indexOfLangsMessages = 4;

export class TranslationDb implements CompilationCache.ICompilationTranslation {
    // 0 - english message
    // 1 - hint
    // 2 - withParams&1 idAllocated references*2
    // 3 - message id
    // 4+ - message in langs[idx-4]
    db: { [messsageAndHint: string]: (string | number)[] };
    langs: string[];
    usages: { [filename: string]: { [key: string]: boolean } };
    availNumbers: number[];
    nextFreeId: number;
    changeInMessageIds: boolean;
    addedMessage: boolean;

    constructor() {
        this.clear();
    }

    clear() {
        this.db = Object.create(null);
        this.langs = [];
        this.usages = Object.create(null);
        this.availNumbers = [];
        this.nextFreeId = 0;
        this.changeInMessageIds = false;
    }

    addLang(name: string): number {
        let pos = this.langs.indexOf(name);
        if (pos >= 0) return pos;
        this.langs.push(name);
        return this.langs.length - 1;
    }

    buildKey(message: string, hint: string, hasParams: boolean) {
        return message + '\x01\x02' + (hasParams ? '#' : '-') + (hint || '');
    }

    loadLangDbs(dir: string) {
        let trFiles: string[];
        try {
            trFiles = fs.readdirSync(dir).filter(v => /\.json$/i.test(v));
        } catch (err) {
            // ignore errors
            return;
        }
        trFiles.forEach(v => {
            this.loadLangDb(path.join(dir, v));
        });
    }

    loadLangDb(fileName: string) {
        let json = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        if (!Array.isArray(json)) throw new Error('root object is not array');
        if (json.length === 0)
            throw new Error('array cannot be empty');
        let lang = json[0];
        if (typeof lang !== 'string') throw new Error('first item must be string');
        let langidx = indexOfLangsMessages + this.addLang(lang);
        for (let i = 1; i < json.length; i++) {
            let item = json[i];
            if (!Array.isArray(item))
                throw new Error('items must be array');
            if (item.length !== 3 && item.length !== 4)
                throw new Error('items must have length==3 or 4');
            let message = item[0];
            let hint = item[1];
            let flags = item[2];
            if (typeof message !== 'string') throw new Error('item[0] must be message string');
            if (hint != null && typeof hint !== 'string') throw new Error('item[1] must be hint string or null');
            if (typeof flags !== 'number') throw new Error('item[2] must be flags number');
            let key = this.buildKey(item[0], item[1], (item[2] & 1) !== 0);
            let tr = this.db[key];
            if (tr) {
                if (item.length === 4) {
                    tr[langidx] = item[3];
                }
            } else {
                tr = [message, hint, flags, null];
                if (item.length === 4) {
                    tr[langidx] = item[3];
                }
                this.db[key] = tr;
            }
        }
    }

    removeLang(lang: string) {
        let pos = this.langs.indexOf(lang);
        if (pos < 0) return;
        pos += indexOfLangsMessages;
        for (let key in this.db) {
            let tr = this.db[key];
            tr.splice(pos, 1);
        }
    }

    saveLangDbs(dir: string) {
        pathUtils.mkpathsync(dir);
        this.langs.forEach(lang => {
            this.saveLangDb(path.join(dir, lang + ".json"), lang);
        });
    }

    saveLangDb(filename: string, lang: string) {
        let pos = this.langs.indexOf(lang);
        if (pos < 0) pos = this.langs.length;
        pos += indexOfLangsMessages;
        let items = <any[]>[lang];
        for (let key in this.db) {
            let tr = this.db[key];
            let trl = tr[pos];
            if (trl != null) {
                items.push([tr[0], tr[1], <number>tr[2] & 1, trl]);
            } else {
                items.push([tr[0], tr[1], <number>tr[2] & 1]);
            }
        }
        fs.writeFileSync(filename, JSON.stringify(items, null, "\t"));
    }

    pruneUnusedMessages(): void {
        let list = Object.keys(this.db);
        for (let i = 0; i < list.length; i++) {
            let tr = this.db[list[i]];
            if (<number>tr[2] < 2) {
                delete this.db[list[i]];
            }
        }
    }

    currentFileUsages: { [key: string]: boolean };
    newFileUsages: { [key: string]: boolean };

    allocId(): number {
        if (this.availNumbers.length === 0) {
            return this.nextFreeId++;
        }
        return this.availNumbers.pop();
    }

    freeId(id: number) {
        this.availNumbers.push(id);
    }

    clearBeforeCompilation() {
        this.changeInMessageIds = false;
        this.addedMessage = false;
    }

    startCompileFile(fn: string) {
        this.currentFileUsages = this.usages[fn];
        this.newFileUsages = undefined; // lazy allocated for speed
    }

    addUsageOfMessage(info: BuildHelpers.TranslationMessage): number {
        let key = this.buildKey(<string>info.message, info.hint, info.withParams);
        if (this.newFileUsages === undefined) this.newFileUsages = Object.create(null);
        if (this.currentFileUsages !== undefined && this.currentFileUsages[key] === true) {
            let item = this.db[key];
            delete this.currentFileUsages[key];
            this.newFileUsages[key] = true;
            return <number>item[3];
        }
        let item = this.db[key];
        if (this.newFileUsages[key] === true) {
            return <number>item[3];
        }
        this.newFileUsages[key] = true;
        if (item === undefined) {
            item = [info.message, info.hint, (info.withParams ? 1 : 0) + 2, this.allocId()]; // add as allocated
            this.changeInMessageIds = true;
            this.addedMessage = true;
            this.db[key] = item;
            return <number>item[3];
        }
        if ((<number>item[2]) < 2) {
            item[2] = (<number>item[2]) + 2; // add allocated flag
            item[3] = this.allocId();
            this.changeInMessageIds = true;
        } else {
            item[2] = (<number>item[2]) + 2; // increase allocated flag
        }
        return <number>item[3];
    }

    finishCompileFile(fn: string) {
        if (this.currentFileUsages !== undefined) {
            let keys = Object.keys(this.currentFileUsages);
            for (let i = 0; i < keys.length; i++) {
                let item = this.db[keys[i]];
                item[2] = (<number>item[2]) - 2; // decrease allocated flag
                if (<number>item[2] < 2) {
                    this.freeId(<number>item[3]);
                }
            }
        }
        this.usages[fn] = this.newFileUsages;
    }

    getMessageArrayInLang(lang: string): string[] {
        let pos = this.langs.indexOf(lang);
        if (pos < 0) pos = this.langs.length;
        pos += indexOfLangsMessages;
        let result = [];
        let db = this.db;
        let list = Object.keys(db);
        for (let i = 0; i < list.length; i++) {
            let item = db[list[i]];
            if (<number>item[2] >= 2) {
                if (item[pos] != null) {
                    result[<number>item[3]] = item[pos];
                } else {
                    result[<number>item[3]] = item[0]; // English as fallback
                }
            }
        }
        for (let i = 0; i < result.length; i++) {
            if (result[i] === undefined) result[i] = "";
        }
        return result;
    }

    getForTranslationLang(lang: string): [string, string, string, number, string][] {
        let pos = this.langs.indexOf(lang);
        if (pos < 0) pos = this.langs.length;
        pos += indexOfLangsMessages;
        let result = [];
        let db = this.db;
        let list = Object.keys(db);
        for (let i = 0; i < list.length; i++) {
            let item = db[list[i]];
            if (item[pos] != null)
                continue;
            result.push([null, item[0], item[1], <number>item[2] & 1, list[i]]);
        }
        return result;
    }

    setForTranslationLang(lang: string, trs: [string, string, string, number, string][]) {
        let pos = this.langs.indexOf(lang);
        if (pos < 0) pos = this.langs.length;
        pos += indexOfLangsMessages;
        let db = this.db;
        for (let i = 0; i < trs.length; i++) {
            let row = trs[i];
            if (typeof row[0] !== 'string') continue;
            let item = db[row[4]];
            item[pos] = row[0];
        }
    }

    public importTranslatedLanguage(filePathFrom: string, filePathTo?: string): boolean {
        try {
            let normalizedPath = pathUtils.normalizePath(filePathFrom);
            let language = path.basename(normalizedPath, ".txt");
            if (filePathTo != undefined) {
                normalizedPath = pathUtils.normalizePath(filePathTo);
                language = path.basename(normalizedPath, ".json");
            }
            let languageIndex = this.langs.indexOf(language);
            if (languageIndex == -1) throw "Language '" + language + "' does not exist. Probably file name is not valid.";
            this.importTranslatedLanguageInternal(filePathFrom, (source, hint, target) => {
                let key = this.buildKey(source, hint, true);
                let trs = this.db[key];
                if (trs) {
                    let ast = g11n.parse(target);
                    if (typeof ast === "object" && ast.type === "error") {
                        console.log(chalk.red("Skipping wrong translation entry:"));
                        console.log(chalk.yellow("S:" + source));
                        console.log(chalk.yellow("H:" + hint));
                        console.log(chalk.yellow("T:" + target));
                        console.log(chalk.red("Error in g11n format: " + ast.msg));
                    } else {
                        trs[4 + languageIndex] = target;
                    }
                }
                key = this.buildKey(source, hint, false);
                trs = this.db[key];
                if (trs) trs[4 + languageIndex] = target;
            });
            return true;
        }
        catch (ex) {
            console.error(ex);
            return false;
        }
    }
    private parseText(text: string) {
        text = '"' + text + '"';
        console.log(text);
        text = JSON.parse(text);
        return text;
    }
    private importTranslatedLanguageInternal(filePath: string, callback: (source: string, hint: string, target: string) => void) {
        let content = this.loadFileWithoutBOM(filePath);
        content = content.replace(/\r\n|\n|\r/g, "\n");
        let lines = content.split("\n");
        for (let i = 0; i < lines.length;) {
            if (lines[i].length == 0) {
                i++;
                continue;
            }
            if (lines[i][0] != 'S' || lines[i][1] != ':') throw "Invalid file format. (" + lines[i] + ")";
            if (lines[i + 1][0] != 'I' || lines[i + 1][1] != ':') throw "Invalid file format. (" + lines[i + 1] + ")";
            if (lines[i + 2][0] != 'T' || lines[i + 2][1] != ':') throw "Invalid file format. (" + lines[i + 2] + ")";
            let source = lines[i].substr(2);
            source = this.parseText(source);
            let hint = lines[i + 1].substr(2);
            hint = this.parseText(hint);
            let target = lines[i + 2].substr(2);
            target = this.parseText(target);
            callback(source, hint, target);
            i += 3;
        }
    }

    private exportLanguageItem(source: string | number, hint: string | number): string {
        let content = "";
        let stringifyHint = hint;
        if (stringifyHint != null) {
            stringifyHint = JSON.stringify(hint);
            stringifyHint = stringifyHint.substring(1, stringifyHint.length - 1);
        }
        let stringifySource = JSON.stringify(source);
        stringifySource = stringifySource.substring(1, stringifySource.length - 1);
        content += 'S:' + stringifySource + '\r\n';
        content += 'I:' + (stringifyHint ? stringifyHint : '') + '\r\n';
        content += 'T:' + stringifySource + '\r\n';
        return content;
    }

    public getLanguageFromSpecificFile(path: string) {
        let sourceContent = this.loadFileWithoutBOM(path);
        let parseContent = JSON.parse(sourceContent);
        return parseContent[0];
    }

    private loadFileWithoutBOM(fileName: string): string {
        let fileContent = fs.readFileSync(fileName, 'utf-8');
        return fileContent.replace(/^\uFEFF/, '');
    }

    public exportLanguages(filePath: string, language?: string, specificPath?: string, exportOnlyUntranslated = true): boolean {
        try {
            let lang = language;
            if (specificPath != undefined) {
                lang = this.getLanguageFromSpecificFile(specificPath);
            }
            let pos = this.langs.indexOf(lang);
            if (language != undefined && pos == -1) {
                console.error("You have entered unsupported language '" + language + "'. Please enter one of " + this.langs.join(", "));
                return false;
            }
            let content = "";
            let db = this.db;
            for (let key in db) {
                let trs = db[key];
                if (language === undefined && specificPath === undefined) {
                    for (let i = 0; i < this.langs.length; i++) {
                        if (exportOnlyUntranslated && trs[i + 4]) continue;
                        content += this.exportLanguageItem(trs[0], trs[1]);
                        break;
                    }
                } else {
                    if (exportOnlyUntranslated && trs[pos + 4]) continue;
                    content += this.exportLanguageItem(trs[0], trs[1]);
                }
            }
            if (content.length > 0) {
                fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
            }
        }
        catch (ex) {
            console.error(ex);
            return false;
        }
        return true;
    }

    public makeUnionOfExportedLanguages(filePath1: string, filePath2: string, outputPath: string): boolean {
        try {
            let data: { messsageAndHint: string, data: { source: string, hint: string } };
            data = Object.create(null);
            let THIS = this;
            let fn = function (source: string, hint: string, target: string) {
                data[THIS.buildKey(source, hint, false)] = { 'source': source, 'hint': hint }
            }
            this.importTranslatedLanguageInternal(filePath1, fn);
            this.importTranslatedLanguageInternal(filePath2, fn);
            this.saveExportedLanguages(outputPath, data);
            return true;
        }
        catch (ex) {
            console.error(ex);
            return false;
        }
    }

    public makeSubtractOfExportedLanguages(filePath1: string, filePath2: string, outputPath: string): boolean {
        try {
            let data: { messsageAndHint: string, data: { source: string, hint: string } };
            data = Object.create(null);
            this.importTranslatedLanguageInternal(filePath1, (source: string, hint: string, target: string) => {
                data[this.buildKey(source, hint, false)] = { 'source': source, 'hint': hint }
            });
            this.importTranslatedLanguageInternal(filePath2, (source: string, hint: string, target: string) => {
                let key = this.buildKey(source, hint, false);
                if (data[key]) {
                    delete data[key];
                }
            });
            this.saveExportedLanguages(outputPath, data);
            return true;
        }
        catch (ex) {
            console.error(ex);
            return false;
        }
    }

    private saveExportedLanguages(outputPath: string, data: { messsageAndHint: string, data: { source: string, hint: string } }) {
        let content = "";
        for (let key in data) {
            content += this.exportLanguageItem(data[key].source, data[key].hint);
        }
        if (content.length > 0) {
            fs.writeFileSync(outputPath, content, { encoding: 'utf-8' });
        }
    }
}
