import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import * as evalNode from "./evalNode";
import * as spriter from "./spriter";
import * as imageOps from "./imageOps";
import * as imgCache from "./imgCache";
import * as Promise from "bluebird";

export interface SourceInfo {
    sourceFile: ts.SourceFile;
    sourceDeps: string[];
    bobrilNamespace: string;
    styleDefs: StyleDefInfo[];
    sprites: SpriteInfo[];
    trs: TranslationMessage[];
}

export interface StyleDefInfo {
    callExpression: ts.CallExpression;
    isEx: boolean;
    name?: string;
}

export interface SpriteInfo {
    callExpression: ts.CallExpression;
    name?: string;
    color?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export interface TranslationMessage {
    callExpression: ts.CallExpression;
    message: string | number;
    withParams: boolean;
    knownParams?: string[];
    hint?: string;
}

function isBobrilFunction(name: string, callExpression: ts.CallExpression, sourceInfo: SourceInfo): boolean {
    return callExpression.expression.getText() === sourceInfo.bobrilNamespace + '.' + name;
}

export function gatherSourceInfo(source: ts.SourceFile, tc: ts.TypeChecker, resolvePathStringLiteral: (sl: ts.StringLiteral) => string): SourceInfo {
    let result: SourceInfo = { sourceFile: source, sourceDeps: [], bobrilNamespace: null, sprites: [], styleDefs: [], trs: [] };
    function visit(n: ts.Node) {
        if (n.kind === ts.SyntaxKind.ImportDeclaration) {
            let id = <ts.ImportDeclaration>n;
            let moduleSymbol = tc.getSymbolAtLocation(id.moduleSpecifier);
            let sf = moduleSymbol.valueDeclaration.getSourceFile();
            let fn = sf.fileName;
            // bobril import is detected that filename contains bobril and content contains sprite export
            if (result.bobrilNamespace == null && id.importClause.namedBindings.kind === ts.SyntaxKind.NamespaceImport && /bobril/i.test(fn) && moduleSymbol.exports["sprite"] != null) {
                result.bobrilNamespace = (<ts.NamespaceImport>id.importClause.namedBindings).name.text;
            }
            result.sourceDeps.push(fn);
        }
        else if (n.kind === ts.SyntaxKind.ExportDeclaration) {
            let ed = <ts.ExportDeclaration>n;
            if (ed.moduleSpecifier) {
                let moduleSymbol = tc.getSymbolAtLocation(ed.moduleSpecifier);
                result.sourceDeps.push(moduleSymbol.valueDeclaration.getSourceFile().fileName);
            }
        }
        else if (n.kind === ts.SyntaxKind.CallExpression) {
            let ce = <ts.CallExpression>n;
            if (isBobrilFunction('sprite', ce, result)) {
                let si: SpriteInfo = { callExpression: ce };
                for (let i = 0; i < ce.arguments.length; i++) {
                    let res = evalNode.evalNode(ce.arguments[i], tc, i === 0 ? resolvePathStringLiteral : null); // first argument is path
                    if (res !== undefined) switch (i) {
                        case 0:
                            if (typeof res === 'string') si.name = res;
                            break;
                        case 1:
                            if (typeof res === 'string') si.color = res;
                            break;
                        case 2:
                            if (typeof res === 'number') si.width = res;
                            break;
                        case 3:
                            if (typeof res === 'number') si.height = res;
                            break;
                        case 4:
                            if (typeof res === 'number') si.x = res;
                            break;
                        case 5:
                            if (typeof res === 'number') si.y = res;
                            break;
                        default: throw new Error('b.sprite cannot have more than 6 parameters');
                    }
                }
                result.sprites.push(si);
            } else if (isBobrilFunction('styleDef', ce, result) || isBobrilFunction('styleDefEx', ce, result)) {
                let item: StyleDefInfo = { callExpression: ce, isEx: isBobrilFunction('styleDefEx', ce, result) };
                if (ce.arguments.length == 3 + (item.isEx ? 1 : 0)) {
                    item.name = evalNode.evalNode(ce.arguments[ce.arguments.length - 1], tc, null);
                } else {
                    if (ce.parent.kind === ts.SyntaxKind.VariableDeclaration) {
                        let vd = <ts.VariableDeclaration>ce.parent;
                        item.name = (<ts.Identifier>vd.name).text;
                    } else if (ce.parent.kind === ts.SyntaxKind.BinaryExpression) {
                        let be = <ts.BinaryExpression>ce.parent;
                        if (be.operatorToken.kind === ts.SyntaxKind.FirstAssignment && be.left.kind === ts.SyntaxKind.Identifier) {
                            item.name = (<ts.Identifier>be.left).text;
                        }
                    }
                }
                result.styleDefs.push(item);
            } else if (isBobrilFunction('t', ce, result)) {
                let item: TranslationMessage = { callExpression: ce, message: undefined, withParams: false, knownParams: undefined, hint: undefined };
                item.message = evalNode.evalNode(ce.arguments[0], tc, null);
                if (ce.arguments.length >= 2) {
                    item.withParams = true;
                    let params = evalNode.evalNode(ce.arguments[1], tc, null);
                    item.knownParams = params !== undefined && typeof params === "object" ? Object.keys(params) : [];
                }
                if (ce.arguments.length >= 3) {
                    item.hint = evalNode.evalNode(ce.arguments[2], tc, null);
                }
                result.trs.push(item);
            }
        }
        ts.forEachChild(n, visit);
    }
    visit(source);
    return result;
}

function createNodeFromValue(value: string|number|boolean): ts.Node {
    if (value === null) {
        let nullNode = ts.createNode(ts.SyntaxKind.NullKeyword);
        nullNode.pos = -1;
        return nullNode;
    }
    if (value === true) {
        let result = ts.createNode(ts.SyntaxKind.TrueKeyword);
        result.pos = -1;
        return result;
    }
    if (value === false) {
        let result = ts.createNode(ts.SyntaxKind.FalseKeyword);
        result.pos = -1;
        return result;
    }
    if (typeof value === "string") {
        let result = <ts.StringLiteral>ts.createNode(ts.SyntaxKind.StringLiteral);
        result.pos = -1;
        result.text = value;
        return result;
    }
    if (typeof value === "number") {
        let result = <ts.LiteralExpression>ts.createNode(ts.SyntaxKind.NumericLiteral);
        result.pos = -1;
        result.text = "" + value;
        return result;
    }
    throw new Error('Don\'t know how to create node for ' + value);
}

export function setMethod(callExpression: ts.CallExpression, name: string) {
    var ex = <ts.PropertyAccessExpression>callExpression.expression;
    let result = <ts.Identifier>ts.createNode(ts.SyntaxKind.Identifier);
    result.pos = -1;
    result.flags = ex.name.flags;
    result.text = name;
    ex.name = result;
    ex.pos = -1; // This is for correctly not wrap line after "b."
}

export function setArgument(callExpression: ts.CallExpression, index: number, value: string|number|boolean): void {
    while (callExpression.arguments.length < index) {
        callExpression.arguments.push(<ts.Expression>createNodeFromValue(null));
    }
    if (callExpression.arguments.length === index) {
        callExpression.arguments.push(<ts.Expression>createNodeFromValue(value));
    } else {
        callExpression.arguments[index] = <ts.Expression>createNodeFromValue(value);
    }
}

export function setArgumentCount(callExpression: ts.CallExpression, count: number) {
    var a = callExpression.arguments;
    while (a.length < count) {
        a.push(<ts.Expression>createNodeFromValue(null));
    }
    while (count < a.length) {
        a.pop();
    }
}

function assign(target: Object, ...sources: Object[]): Object {
    let totalArgs = arguments.length;
    for (let i = 1; i < totalArgs; i++) {
        let source = arguments[i];
        if (source == null) continue;
        let keys = Object.keys(source);
        let totalKeys = keys.length;
        for (let j = 0; j < totalKeys; j++) {
            let key = keys[j];
            (<any>target)[key] = (<any>source)[key];
        }
    }
    return target;
}

export function rememberCallExpression(callExpression: ts.CallExpression): () => void {
    let argumentsOriginal = callExpression.arguments;
    callExpression.arguments = <any>assign(argumentsOriginal.slice(0), argumentsOriginal);
    var ex = <ts.PropertyAccessExpression>callExpression.expression;
    let expressionName = ex.name;
    let expressionPos = ex.pos;
    return () => {
        callExpression.arguments = argumentsOriginal;
        ex.name = expressionName;
        ex.pos = expressionPos;
    };
}

var defaultLibFilename = path.join(path.dirname(path.resolve(require.resolve("typescript"))), "lib.es6.d.ts");
var defaultLibFilenameNorm = defaultLibFilename.replace(/\\/g, "/");

var lastLibPrecompiled;

function createCompilerHost(currentDirectory) {
    function getCanonicalFileName(fileName) {
        return ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
    }
    function getSourceFile(filename, languageVersion, onError) {
        if (filename === defaultLibFilenameNorm && lastLibPrecompiled) {
            return lastLibPrecompiled;
        }
        var text = fs.readFileSync(filename === defaultLibFilenameNorm ? defaultLibFilename : path.resolve(currentDirectory, filename)).toString();
        if (filename === defaultLibFilenameNorm) {
            lastLibPrecompiled = ts.createSourceFile(filename, text, languageVersion, true);
            return lastLibPrecompiled;
        }
        return ts.createSourceFile(filename, text, languageVersion, true);
    }
    function writeFile(fileName, data, writeByteOrderMark, onError) {
        fileName = path.join(currentDirectory, fileName);
        console.log("Writing " + fileName);
        try {
            var text = ts.sys.readFile(fileName, 'utf-8');
        } catch (e) {
            text = "";
        }
        if (text === data) {
            fs.utimesSync(fileName, new Date(), new Date());
            return;
        }
        try {
            ts.sys.writeFile(fileName, data, false);
        } catch (e) {
            if (onError) {
                onError(e.message);
            }
        }
    }
    return {
        getSourceFile: getSourceFile,
        getDefaultLibFileName: function(options) { return defaultLibFilename; },
        writeFile: writeFile,
        getCurrentDirectory: function() { return currentDirectory; },
        useCaseSensitiveFileNames: function() { return ts.sys.useCaseSensitiveFileNames; },
        getCanonicalFileName: getCanonicalFileName,
        getNewLine: function() { return '\n'; }
    };
}

function reportDiagnostic(diagnostic) {
    var output = "";
    if (diagnostic.file) {
        var loc = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        output += diagnostic.file.fileName + "(" + loc.line + "," + loc.character + "): ";
    }
    var category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
    output += category + " TS" + diagnostic.code + ": " + diagnostic.messageText + ts.sys.newLine;
    ts.sys.write(output);
}

function reportDiagnostics(diagnostics) {
    for (var i = 0; i < diagnostics.length; i++) {
        reportDiagnostic(diagnostics[i]);
    }
}

export function compile(done: () => void) {
    var full = "c:/Research/bobrilapp";
    var program = ts.createProgram(["app.ts"], { module: ts.ModuleKind.CommonJS }, createCompilerHost(full));
    var diagnostics = program.getSyntacticDiagnostics();
    reportDiagnostics(diagnostics);
    if (diagnostics.length === 0) {
        var diagnostics = program.getGlobalDiagnostics();
        reportDiagnostics(diagnostics);
        if (diagnostics.length === 0) {
            var diagnostics = program.getSemanticDiagnostics();
            reportDiagnostics(diagnostics);
        }
    }
    var tc = program.getTypeChecker();
    var sourceFiles = program.getSourceFiles();
    var bundleCache = new imgCache.ImgBundleCache(new imgCache.ImgCache());
    for (let i = 0; i < sourceFiles.length; i++) {
        var src = sourceFiles[i];
        if (src.hasNoDefaultLib) continue; // skip searching default lib
        var srcInfo = gatherSourceInfo(src, tc, (nn: ts.StringLiteral) => path.join(path.dirname(nn.getSourceFile().fileName), nn.text));
        //console.log(src.fileName);
        //console.log(srcInfo);
        if (srcInfo.sprites.length > 0) {
            for (let i = 0; i < srcInfo.sprites.length; i++) {
                var si = srcInfo.sprites[i];
                bundleCache.add(path.join(full, si.name), si.color, si.width, si.height, si.x, si.y);
            }
        }
    }

    bundleCache.wasChange();
    let prom = bundleCache.build().then((bi) => {
        return imageOps.savePNG(bi, path.join(full, "bundle.png"));
    }).then(() => {
        for (let i = 0; i < sourceFiles.length; i++) {
            var src = sourceFiles[i];
            if (src.hasNoDefaultLib) continue; // skip searching default lib
            var srcInfo = gatherSourceInfo(src, tc, (nn: ts.StringLiteral) => path.join(path.dirname(nn.getSourceFile().fileName), nn.text));
            if (srcInfo.sprites.length > 0) {
                for (let i = 0; i < srcInfo.sprites.length; i++) {
                    var si = srcInfo.sprites[i];
                    var bundlePos = bundleCache.query(path.join(full, si.name), si.color, si.width, si.height, si.x, si.y);
                    setMethod(si.callExpression, "spriteb");
                    setArgument(si.callExpression, 0, bundlePos.width);
                    setArgument(si.callExpression, 1, bundlePos.height);
                    setArgument(si.callExpression, 2, bundlePos.x);
                    setArgument(si.callExpression, 3, bundlePos.y);
                    setArgumentCount(si.callExpression, 4);
                }
            }
        }
    });

    prom = prom.then(() => {
        for (let i = 0; i < sourceFiles.length; i++) {
            var src = sourceFiles[i];
            if (src.hasNoDefaultLib) continue; // skip searching default lib
            program.emit(src);
        }
    }).then(done, (err) => {
        console.log(err);
    });
}
