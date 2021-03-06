"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathPlatformDependent = require("path");
const path = pathPlatformDependent.posix; // This works everywhere, just use forward slashes
const image = require("../dist/imageOps");
require('bluebird');
describe("replaceColor", () => {
    it("works", (done) => {
        image.loadPNG(path.join(__dirname, "../spec/light.png")).then((t) => {
            image.replaceColor(t, "#80ff80");
            return image.savePNG(t, path.join(__dirname, "../spec/lightshine.png"));
        }).then(done);
    });
});
//# sourceMappingURL=imageOpsSpec.js.map