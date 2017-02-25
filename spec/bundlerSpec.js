"use strict";
const ts = require("typescript");
const fs = require("fs");
const compilationCache = require("../dist/compilationCache");
const pathPlatformDependent = require("path");
const path = pathPlatformDependent.posix; // This works everywhere, just use forward slashes
const pathUtils = require("../dist/pathUtils");
const specdirname = path.join(__dirname.replace(/\\/g, "/"), "../spec");
describe("bundler", () => {
    let testpath = path.join(specdirname, "bundle");
    let di = fs.readdirSync(testpath).sort();
    try {
        fs.mkdirSync(path.join(testpath, "_accept"));
    }
    catch (err) { }
    ;
    try {
        fs.mkdirSync(path.join(testpath, "_expect"));
    }
    catch (err) { }
    ;
    di.forEach(n => {
        if (n[0] === ".")
            return;
        if (n[0] === "_")
            return;
        //if ((() => n !== "bundleBug")()) return;
        it(n, (done) => {
            var full = path.join(testpath, n);
            var cc = new compilationCache.CompilationCache();
            function write(fn, b) {
                let dir = path.join(testpath, '_accept', n);
                pathUtils.mkpathsync(dir);
                fs.writeFileSync(path.join(dir, fn), b);
            }
            ;
            let project = {
                dir: full,
                main: 'main.ts',
                options: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES5 },
                totalBundle: true,
                compress: n !== "compressBug2",
                mangle: n !== "extend",
                beautify: n === "extend",
                writeFileCallback: write,
                mainExamples: [''],
            };
            cc.compile(project).then(() => {
                let acc = path.join(testpath, '_accept', n);
                let exp = path.join(testpath, '_expect', n);
                pathUtils.mkpathsync(exp);
                let files = fs.readdirSync(acc);
                files.forEach((fn) => {
                    let source = fs.readFileSync(path.join(acc, fn)).toString('utf-8');
                    let dest = "";
                    try {
                        dest = fs.readFileSync(path.join(exp, fn)).toString('utf-8');
                    }
                    catch (err) { }
                    if (dest != source) {
                        fail(path.join(acc, fn) + " is not equal to " + path.join(exp, fn));
                    }
                });
            }).then(done, e => {
                fail(e);
                done();
            });
        });
    });
});
//# sourceMappingURL=bundlerSpec.js.map