"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QStore = exports.LogTypeColor = exports.PROXY = exports.ORIG = void 0;
exports.ORIG = Symbol.for("ORIGINAL");
exports.PROXY = Symbol.for("PROXY");
/** Log level color map */
var LogTypeColor;
(function (LogTypeColor) {
    LogTypeColor["error"] = "coral";
    LogTypeColor["warn"] = "gold";
    LogTypeColor["log"] = "#5eba7d";
})(LogTypeColor = exports.LogTypeColor || (exports.LogTypeColor = {}));
/** Q Store abstract class */
class QStore {
}
exports.QStore = QStore;
//# sourceMappingURL=types.js.map