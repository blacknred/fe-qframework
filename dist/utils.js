"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.createPersister = exports.createErrorNode = exports.getNode = exports.isDeepEqual = exports.getRegex = exports.clone = exports.debounce = exports.throttle = exports.wait = exports.uid = void 0;
const types_1 = require("./types");
function uid(len = 11) {
    return Math.random().toString(20).substr(2, len);
}
exports.uid = uid;
function wait(ms = 1000) {
    return new Promise((release) => {
        setTimeout(release, ms);
    });
}
exports.wait = wait;
function throttle(callback, limit = 100) {
    // throttle: 1 2 _ 4 5 _ 7 8
    // 1. run
    // 2. timeout run
    let waiting = false;
    return function () {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(function () {
                waiting = false;
            }, limit);
        }
    };
}
exports.throttle = throttle;
function debounce(callback, limit = 100) {
    // debounce: _ _ _ _ _ _ _ _ 9
    // 1. timeout run or reassign
    let timer = 0;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            console.log("55");
            callback.apply(this, arguments);
        }, limit);
    };
}
exports.debounce = debounce;
function clone(data) {
    try {
        // some props may be lost but this is enough for debugging
        const clone = JSON.parse(JSON.stringify(data));
        return clone;
    }
    catch (e) {
        return data;
    }
}
exports.clone = clone;
exports.getRegex = {
    tag(tag) {
        return new RegExp(`<((${tag})+)([^<]+)*(?:>(.*)</\\1>|\\s+\\/>)`, "i");
    }
};
// export const replace = {
//   all(here: string, pattern: string, after: string): string {
//     const re = new RegExp(pattern, "i");
//     return here.replace(re, after);
//   },
//   tag(target: string, tag: string, after: string) {
//     const pattern = `<((${tag})+)([^<]+)*(?:>(.*)</\\1>|\\s+\\/>)`;
//     return this.all(target, pattern, after);
//   },
//   method(target: string, methodName: string, after: string) {
//     const pattern = `${methodName}`;
//     return this.all(target, pattern, after);
//   }
// };
/**
 * JSON based object comparison
 *
 * limitations:
 * - key order matters
 * - some types are not representable(dates=>strings, ignores keys with undefined values)
 */
function isDeepEqual(a, b, ctx) {
    if (!ctx || !Array.isArray(ctx) || !ctx.length) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return ctx.every((key) => {
        const left = typeof key === "function" ? key(a) : a[key];
        const right = typeof key === "function" ? key(b) : b[key];
        return JSON.stringify(left) === JSON.stringify(right);
    });
}
exports.isDeepEqual = isDeepEqual;
function getNode(el = "body") {
    let elem;
    if (typeof el !== "string") {
        elem = el;
    }
    else if (el.startsWith("#")) {
        elem = document.getElementById(el.slice(1));
    }
    else {
        elem = document.querySelector(el);
    }
    if (!elem) {
        elem = document.createElement("div");
        document.body.appendChild(elem);
    }
    return elem;
}
exports.getNode = getNode;
function createErrorNode(label, error) {
    return `<div style="background: #ff7f502e; width: max-content;
  padding: 1rem; border: 1px solid coral;">
  <p><b>${`${label}</b>: ${error}`}</p></div>`;
}
exports.createErrorNode = createErrorNode;
function createPersister(adapter, name, logger) {
    return (data, initial) => {
        try {
            if (initial) {
                let cache;
                if (typeof adapter === "function") {
                    cache = adapter(data);
                }
                else if (adapter === "indexeddb") {
                    cache = data; // TODO
                }
                else if (adapter === "websql") {
                    cache = data; // TODO
                }
                else {
                    cache = localStorage.getItem(name);
                    if (cache)
                        cache = JSON.parse(cache);
                }
                if (typeof cache !== "object") {
                    throw new Error("No store data found!");
                }
                return Object.keys(data).reduce((a, k) => {
                    a[k] = cache[k] || data[k];
                    return a;
                }, {});
            }
            if (typeof adapter === "function") {
                adapter(data);
            }
            else if (adapter === "indexeddb") {
                // TODO
            }
            else if (adapter === "websql") {
                // TODO
            }
            else {
                localStorage.setItem(name, JSON.stringify(data));
            }
            return data;
        }
        catch (e) {
            logger === null || logger === void 0 ? void 0 : logger(e.message, "warn");
            return data;
        }
    };
}
exports.createPersister = createPersister;
function createLogger(name) {
    let label = name;
    const logger = (message, type = "log") => {
        const title = `[${label || "Q"} @ ${new Date().toLocaleTimeString()}]`;
        if (Array.isArray(message) && type === "log") {
            console.groupCollapsed(`%c ${title}`, "font-weight: 500; font-style: italic;");
            console.log("prev:", message[0]);
            console.log("next:", message[1]);
            console.groupEnd();
        }
        else {
            console[type](`%c ${title} %c ${type.toUpperCase()} %c ${message}`, "font-weight: 500; font-style: italic;", `font-weight: bold; color: white; background: ${types_1.LogTypeColor[type]};`, "color: inherit;");
        }
    };
    if (!window.onerror) {
        // console.log(`
        //  .d88888b.
        // d88P" "Y88b
        // 888     888
        // 888     888
        // 888     888
        // 888 Y8b 888
        // Y88b.Y8b88P
        // "Y888888"
        //       Y8b`);
        label = "Q";
        window.onerror = (e) => {
            const error = e.error || e.toString();
            logger(error, "error");
            return true;
        };
        label = name;
    }
    return logger;
}
exports.createLogger = createLogger;
//# sourceMappingURL=utils.js.map