"use strict";
/**
 * .d88888b.
 * d88P" "Y88b
 * 888     888
 * 888     888
 * 888     888
 * 888 Y8b 888
 * Y88b.Y8b88P
 *  "Y888888"
 *        Y8b
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const Component_1 = __importDefault(require("./Component"));
var Store_1 = require("./Store");
Object.defineProperty(exports, "Store", { enumerable: true, get: function () { return __importDefault(Store_1).default; } });
__exportStar(require("./utils"), exports);
__exportStar(require("./types"), exports);
if (!window.$q)
    window.$q = {};
exports.default = Component_1.default;
//# sourceMappingURL=index.js.map