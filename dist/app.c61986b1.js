// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../dist/types.js":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
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


var QStore = function QStore() {
  _classCallCheck(this, QStore);
};

exports.QStore = QStore;
},{}],"../../dist/Observer.js":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withWatcher = void 0;

var types_1 = require("./types");
/** Reactive dispatcher class */


var Observer = /*#__PURE__*/function () {
  /**
   * Reactive dispatcher class
   * @param {IObservable} _observable target for dispatching
   */
  function Observer(_observable) {
    _classCallCheck(this, Observer);

    this._observable = _observable;
  }

  _createClass(Observer, [{
    key: "get",
    value: function get(props, prop) {
      var _a;

      if (prop === types_1.ORIG) return props;
      if (prop === types_1.PROXY) return true;

      if (((_a = props[prop]) === null || _a === void 0 ? void 0 : _a.constructor) === Object || Array.isArray(props[prop])) {
        return new Proxy(props[prop], this);
      }

      return Reflect.get(props, prop);
    }
  }, {
    key: "set",
    value: function set(props, prop, value) {
      if (props[prop] === value) return true;
      props[prop] = value;

      this._observable.dispatch();

      return true;
    }
  }, {
    key: "deleteProperty",
    value: function deleteProperty(props, prop) {
      delete props[prop];

      this._observable.dispatch();

      return true;
    }
  }], [{
    key: "watch",
    value: function watch(data, target) {
      var _Proxy$revocable = Proxy.revocable(data, new Observer(target)),
          proxy = _Proxy$revocable.proxy,
          revoke = _Proxy$revocable.revoke;

      return [proxy, revoke];
    }
  }]);

  return Observer;
}();
/** Observer class decorator */


function withWatcher(constructor) {
  return /*#__PURE__*/function (_constructor) {
    _inherits(_class, _constructor);

    var _super = _createSuper(_class);

    function _class() {
      var _this;

      _classCallCheck(this, _class);

      _this = _super.apply(this, arguments);
      _this.$watch = Observer.watch;
      return _this;
    }

    return _class;
  }(constructor);
}

exports.withWatcher = withWatcher;
exports.default = Observer;
},{"./types":"../../dist/types.js"}],"../../dist/utils.js":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = exports.createPersister = exports.createErrorNode = exports.getNode = exports.isDeepEqual = exports.getRegex = exports.clone = exports.debounce = exports.throttle = exports.wait = exports.uid = void 0;

var types_1 = require("./types");

function uid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 11;
  return Math.random().toString(20).substr(2, len);
}

exports.uid = uid;

function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  return new Promise(function (release) {
    setTimeout(release, ms);
  });
}

exports.wait = wait;

function throttle(callback) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  // throttle: 1 2 _ 4 5 _ 7 8
  // 1. run
  // 2. timeout run
  var waiting = false;
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

function debounce(callback) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  // debounce: _ _ _ _ _ _ _ _ 9
  // 1. timeout run or reassign
  var timer = 0;
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
    var _clone = JSON.parse(JSON.stringify(data));

    return _clone;
  } catch (e) {
    return data;
  }
}

exports.clone = clone;
exports.getRegex = {
  tag: function tag(_tag) {
    return new RegExp("<((".concat(_tag, ")+)([^<]+)*(?:>(.*)</\\1>|\\s+\\/>)"), "i");
  }
}; // export const replace = {
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

  return ctx.every(function (key) {
    var left = typeof key === "function" ? key(a) : a[key];
    var right = typeof key === "function" ? key(b) : b[key];
    return JSON.stringify(left) === JSON.stringify(right);
  });
}

exports.isDeepEqual = isDeepEqual;

function getNode() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "body";
  var elem;

  if (typeof el !== "string") {
    elem = el;
  } else if (el.startsWith("#")) {
    elem = document.getElementById(el.slice(1));
  } else {
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
  return "<div style=\"background: #ff7f502e; width: max-content;\n  padding: 1rem; border: 1px solid coral;\">\n  <p><b>".concat("".concat(label, "</b>: ").concat(error), "</p></div>");
}

exports.createErrorNode = createErrorNode;

function createPersister(adapter, name, logger) {
  return function (data, initial) {
    try {
      if (initial) {
        var cache;

        if (typeof adapter === "function") {
          cache = adapter(data);
        } else if (adapter === "indexeddb") {
          cache = data; // TODO
        } else if (adapter === "websql") {
          cache = data; // TODO
        } else {
          cache = localStorage.getItem(name);
          if (cache) cache = JSON.parse(cache);
        }

        if (_typeof(cache) !== "object") {
          throw new Error("No store data found!");
        }

        return Object.keys(data).reduce(function (a, k) {
          a[k] = cache[k] || data[k];
          return a;
        }, {});
      }

      if (typeof adapter === "function") {
        adapter(data);
      } else if (adapter === "indexeddb") {// TODO
      } else if (adapter === "websql") {// TODO
      } else {
        localStorage.setItem(name, JSON.stringify(data));
      }

      return data;
    } catch (e) {
      logger === null || logger === void 0 ? void 0 : logger(e.message, "warn");
      return data;
    }
  };
}

exports.createPersister = createPersister;

function createLogger(name) {
  var label = name;

  var logger = function logger(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "log";
    var title = "[".concat(label || "Q", " @ ").concat(new Date().toLocaleTimeString(), "]");

    if (Array.isArray(message) && type === "log") {
      console.groupCollapsed("%c ".concat(title), "font-weight: 500; font-style: italic;");
      console.log("prev:", message[0]);
      console.log("next:", message[1]);
      console.groupEnd();
    } else {
      console[type]("%c ".concat(title, " %c ").concat(type.toUpperCase(), " %c ").concat(message), "font-weight: 500; font-style: italic;", "font-weight: bold; color: white; background: ".concat(types_1.LogTypeColor[type], ";"), "color: inherit;");
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

    window.onerror = function (e) {
      var error = e.error || e.toString();
      logger(error, "error");
      return true;
    };

    label = name;
  }

  return logger;
}

exports.createLogger = createLogger;
},{"./types":"../../dist/types.js"}],"../../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../../dist/Component.js":[function(require,module,exports) {
var process = require("process");
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var Component_1;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var Observer_1 = require("./Observer");

var types_1 = require("./types");

var utils_1 = require("./utils");
/**  Q Component class  */
// @withDOM


var Component = Component_1 = /*#__PURE__*/function () {
  /**
   * Q Component class
   * @param {ComponentOptions} options options
   */
  function Component(options) {
    var _this = this;

    _classCallCheck(this, Component);

    this.data = {}; // TODO: hmmm

    this.methods = {}; // TODO: omg
    // meta options

    this._name = (options === null || options === void 0 ? void 0 : options.name) || "QComponent_".concat(utils_1.uid(4));
    window.$q[this._name] = {}; // logger

    if (options === null || options === void 0 ? void 0 : options.debug) {
      this.log = utils_1.createLogger(this._name);
    } // template


    this._template = options === null || options === void 0 ? void 0 : options.template;
    if (!this._template) return; // reactive state

    if ((options === null || options === void 0 ? void 0 : options.state) instanceof types_1.QStore) {
      // handle store subscription
      var _options$state$subscr = options.state.subscribe(this),
          _options$state$subscr2 = _slicedToArray(_options$state$subscr, 2),
          data = _options$state$subscr2[0],
          revoker = _options$state$subscr2[1];

      this._store_subscription = revoker;
      this._state = data;
    } else if (options === null || options === void 0 ? void 0 : options.state) {
      // handle local state data
      // @ts-ignore
      process.nextTick(function () {
        var _a;

        _this._state = (_a = _this.$watch) === null || _a === void 0 ? void 0 : _a.call(_this, options.state, _this)[0];
      });
    } // prev state


    if (this._state) {
      this._prev_state = utils_1.clone(this._state);
    } // register methods


    if (options === null || options === void 0 ? void 0 : options.methods) {
      for (var name in options.methods) {
        window.$q[this._name][name] = options.methods[name].bind(this);
        this.methods[name] = options.methods[name].bind(this);
      }
    } // children components


    if (options === null || options === void 0 ? void 0 : options.children) {
      this._children = {};

      for (var _name in options.children) {
        this._children[_name] = {
          vm: options.children[_name],
          inUse: false,
          id: utils_1.uid(6)
        };
      }
    } // lifecycle hooks


    this._mounted = options === null || options === void 0 ? void 0 : options.mounted;
    this._unmounted = options === null || options === void 0 ? void 0 : options.unmounted;
    this._before = options === null || options === void 0 ? void 0 : options.before;
    this._after = options === null || options === void 0 ? void 0 : options.after; // bind render for callback usage

    this.render = this.render.bind(this);
  }
  /**
   * Bind global helper
   */


  _createClass(Component, [{
    key: "state",
    get:
    /**
     * State getter
     */
    function get() {
      return this._state || {};
    }
    /**
     * Check readiness to mount
     */

  }, {
    key: "isReady",
    value: function isReady() {
      var _a;

      if (!this._template || !("call" in this._template)) {
        (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, "Template function is not provided", "error");
        return false;
      }

      return true;
    }
    /**
     * Mount an instance
     *
     * @param {String|Element} el root DOM Node
     * @returns {Q} instance
     */

  }, {
    key: "mount",
    value: function mount() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "body";

      var _a, _b; // early return if allready mounted or not ready


      if (this.$el || !this.isReady()) return this; // set HTML node

      this.$el = utils_1.getNode(el); // call lifecycle hook

      try {
        (_a = this._mounted) === null || _a === void 0 ? void 0 : _a.call(this);
      } catch (e) {
        (_b = this.log) === null || _b === void 0 ? void 0 : _b.call(this, e, "error");
      } // initial render


      this.dispatch(true);
      return this;
    }
    /**
     * Unmount an instance
     */

  }, {
    key: "unmount",
    value: function unmount() {
      var _a, _b, _c, _d;

      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // remove HTML node
                (_a = this.$el) === null || _a === void 0 ? void 0 : _a.remove(); // clear store subscription

                (_b = this._store_subscription) === null || _b === void 0 ? void 0 : _b.call(this); // clear binded data

                delete window.$q[this._name]; // call lifecycle hook

                _context.prev = 3;
                _context.next = 6;
                return (_c = this._unmounted) === null || _c === void 0 ? void 0 : _c.call(this);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);
                (_d = this.log) === null || _d === void 0 ? void 0 : _d.call(this, _context.t0, "error");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 8]]);
      }));
    }
    /**
     * Render dispatcher
     */

  }, {
    key: "dispatch",
    value: function dispatch(initial) {
      var _a; // update previous state


      var _prev_state = this._prev_state;
      this._prev_state = utils_1.clone(this.state); // call a lifecycle hook before rendering to update the
      // computed values and potentially prevent rendering

      if (!initial && ((_a = this._before) === null || _a === void 0 ? void 0 : _a.call(this, _prev_state))) return; // cancel pending renders

      if (this._debounce) {
        cancelAnimationFrame(this._debounce);
      } // fire new render at the next animation frame


      this._debounce = requestAnimationFrame(this.render);
    }
    /**
     * Render
     */

  }, {
    key: "render",
    value: function render() {
      var _a, _b;

      if (!this.$el) return;
      var start = Date.now();
      var templateStr; // feed template with actual data

      try {
        // Render dispatch and state mutations are prevented(infinite loop).
        var plainState = this.state[types_1.ORIG] || this.state;
        templateStr = this._template.call(null, this.data, plainState);
      } catch (e) {
        // render error node in case of template call error
        templateStr = utils_1.createErrorNode(this._name, e);
        (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, e, "error");
      } // replace methods declarations


      if (this.methods) {
        for (var name in this.methods) {
          if (!templateStr.includes(name)) continue;
          var path = "$q.".concat(this._name, ".").concat(name);
          templateStr = templateStr.replaceAll(name, path);
        }
      } // replace children component tags with actual dom nodes


      if (this._children) {
        for (var _name2 in this._children) {
          if (!templateStr.includes(_name2)) continue;
          var node = "<div id=\"".concat(this._children[_name2].id, "\"></div>");
          templateStr = templateStr.replace(utils_1.getRegex.tag(_name2), node);
          this._children[_name2].inUse = true; // this._children[name].vm.unmount();
        }
      } // console.log(templateStr);
      // inject template in dom


      if (!this.$dom) {
        // direct inject
        this.$el.innerHTML = templateStr;
      } else {
        // inject through virtual dom
        var templateHTML = this.$dom.stringToHTML(templateStr);
        this.$dom.diff(templateHTML, this.$el);
      } // mount children


      if (this._children) {
        for (var _name3 in this._children) {
          var _this$_children$_name = this._children[_name3],
              inUse = _this$_children$_name.inUse,
              id = _this$_children$_name.id,
              vm = _this$_children$_name.vm;
          if (inUse) vm.mount("#".concat(id));
        }
      }

      if (this.log) {
        var len = templateStr.length;
        var text = "render ".concat(len, " chars in ").concat(Date.now() - start, " ms");
        this.log(text);
      } // call a lifecycle hook after rendering to check watched cases


      (_b = this._after) === null || _b === void 0 ? void 0 : _b.call(this);
    }
  }], [{
    key: "use",
    value: function use(name, fn) {
      // @ts-ignore
      Component_1.prototype["$".concat(name)] = fn;
    }
  }]);

  return Component;
}();

Component = Component_1 = __decorate([Observer_1.withWatcher], Component);
exports.default = Component;
},{"./Observer":"../../dist/Observer.js","./types":"../../dist/types.js","./utils":"../../dist/utils.js","process":"../../node_modules/process/browser.js"}],"../../dist/Store.js":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var Observer_1 = require("./Observer");

var types_1 = require("./types");
/** Q Store class */


var Store = /*#__PURE__*/function (_types_1$QStore) {
  _inherits(Store, _types_1$QStore);

  var _super = _createSuper(Store);

  /**
   * Q Store class
   * @param {StoreOptions} options store options
   */
  function Store(options) {
    var _this;

    _classCallCheck(this, Store);

    var _a;

    _this = _super.call(this);
    _this._listeners = new Map(); // meta options

    _this._name = (options === null || options === void 0 ? void 0 : options.name) || "QStore";
    _this._immutable = options === null || options === void 0 ? void 0 : options.immutable; // logger

    if (options === null || options === void 0 ? void 0 : options.debug) {
      _this.log = utils_1.createLogger(_this._name);
    } // reactive data


    _this._data = (options === null || options === void 0 ? void 0 : options.data) || {}; // TODO: no type cast

    if (!(options === null || options === void 0 ? void 0 : options.data)) {
      (_a = _this.log) === null || _a === void 0 ? void 0 : _a.call(_assertThisInitialized(_this), "No data was provided", "warn");
    } // prev data


    _this._prev_data = _this._data; // getters

    _this._getters = options === null || options === void 0 ? void 0 : options.getters; // setters

    _this._setters = options === null || options === void 0 ? void 0 : options.setters; // persister

    if (!!(options === null || options === void 0 ? void 0 : options.persist)) {
      _this.persist = utils_1.createPersister(options.persist, _this._name, _this.log); // load cached data

      _this._data = _this.persist(_this._data, true);
    }

    return _this;
  }
  /**
   * Data getter
   */


  _createClass(Store, [{
    key: "data",
    get: function get() {
      // prevent direct data change
      return this._immutable ? utils_1.clone(this._data) : this._data;
    }
    /**
     * Getter
     *
     * @param {string} getter getter name
     * @param {any} payload payload
     * @returns {T[any] | undefined}
     */

  }, {
    key: "get",
    value: function get(getter, payload) {
      var _a, _b, _c;

      if (!((_a = this._getters) === null || _a === void 0 ? void 0 : _a[getter])) {
        (_b = this.log) === null || _b === void 0 ? void 0 : _b.call(this, "unknown getter ".concat(getter), "warn");
      }

      return (_c = this._getters) === null || _c === void 0 ? void 0 : _c[getter](this.data, payload);
    }
    /**
     * Setter
     *
     * @param {string} setter setter name
     * @param {any} payload payload
     */

  }, {
    key: "set",
    value: function set(setter, payload) {
      var _a, _b, _c;

      if (!((_a = this._setters) === null || _a === void 0 ? void 0 : _a[setter])) {
        (_b = this.log) === null || _b === void 0 ? void 0 : _b.call(this, "unknown setter ".concat(setter), "warn");
      }

      (_c = this._setters) === null || _c === void 0 ? void 0 : _c[setter](this._data, payload);
    }
    /**
     * Update reducer
     *
     * @param {ListenCtx} deps props selectors
     * @returns {this} store
     */

  }, {
    key: "rewatch",
    value: function rewatch(deps) {
      this._temp_deps = deps;
      return this;
    }
    /**
     * Store subscription
     *
     * @param {IObservable} listener listener
     * @returns {Function} unsubscribe function
     */

  }, {
    key: "subscribe",
    value: function subscribe(listener) {
      var _this2 = this;

      var _a; // add listener


      this._listeners.set(listener, this._temp_deps);

      this._temp_deps = undefined; // run watcher

      if (!this._data[types_1.PROXY]) {
        this._data = (_a = this.$watch) === null || _a === void 0 ? void 0 : _a.call(this, this._data, this)[0];
      }

      return [this.data, function () {
        return _this2._listeners.delete(listener);
      }];
    }
    /**
     * Dispatch subscriptions update
     */

  }, {
    key: "dispatch",
    value: function dispatch() {
      var _a, _b; // dispatch listeners


      var _iterator = _createForOfIteratorHelper(this._listeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              listener = _step$value[0],
              deps = _step$value[1];

          if (!deps || !utils_1.isDeepEqual(this._data[types_1.ORIG], this._prev_data, deps)) {
            listener.dispatch();
          }
        } // log

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, [this._prev_data, this._data[types_1.ORIG]]); // persist

      (_b = this.persist) === null || _b === void 0 ? void 0 : _b.call(this, this._data[types_1.ORIG]); // update previous data

      this._prev_data = utils_1.clone(this._data);
    }
  }]);

  return Store;
}(types_1.QStore);

Store = __decorate([Observer_1.withWatcher], Store);
exports.default = Store;
},{"./utils":"../../dist/utils.js","./Observer":"../../dist/Observer.js","./types":"../../dist/types.js"}],"../../dist/index.js":[function(require,module,exports) {
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

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;

var Component_1 = __importDefault(require("./Component"));

var Store_1 = require("./Store");

Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return __importDefault(Store_1).default;
  }
});

__exportStar(require("./utils"), exports);

__exportStar(require("./types"), exports);

if (!window.$q) window.$q = {};
exports.default = Component_1.default;
},{"./Component":"../../dist/Component.js","./Store":"../../dist/Store.js","./utils":"../../dist/utils.js","./types":"../../dist/types.js"}],"store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dist_1 = require("../../dist");

exports.default = new dist_1.Store({
  debug: true,
  persist: "localstorage",
  // immutable: true,
  data: {
    freeze: false,
    todos: [] // k: { i: 9 }

  },
  getters: {
    todosByDate: function todosByDate(data, date) {
      return data.todos.filter(function (t) {
        return t.endsAt === date;
      });
    }
  },
  setters: {
    deleteTodosByDate: function deleteTodosByDate(data, date) {
      data.todos = data.todos.filter(function (t) {
        return t.endsAt === date;
      });
    }
  }
});
},{"../../dist":"../../dist/index.js"}],"components/form.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dist_1 = __importDefault(require("../../../dist"));

var store_1 = __importDefault(require("../store"));

exports.default = new dist_1.default({
  name: "Form",
  debug: true,
  state: {
    canAdd: false,
    freeze: false,
    sort: "priority"
  },
  template: function template(_ref, _ref2) {
    var text = _ref.text,
        date = _ref.date,
        renders = _ref.renders;
    var canAdd = _ref2.canAdd,
        freeze = _ref2.freeze,
        sort = _ref2.sort;
    var today = new Date().toISOString().split("T")[0];
    var isChecked = freeze ? "checked" : "";
    var isDisabled = canAdd ? "" : "disabled";
    var sortOptions = ["date", "priority"].reduce(function (str, opt) {
      var selected = sort === opt ? "selected" : "";
      return str + "<option ".concat(selected, " value=\"").concat(opt, "\">").concat(opt, "</option>");
    }, "");
    return "<section style=\"border: 2px solid pink;\"\n    <small><small>renders: ".concat(renders, "</small></small>\n    <br />\n    <div style=\"margin: 0.5rem 1rem;\">\n      <div style=\"height: 1.8rem; display: flex; margin-bottom: 5px; border: 3px solid #ab9296;\">\n        <input style=\"flex: 1; border: 0; padding: 0 1rem; outline: none;\" value=\"").concat(text, "\" oninput=\"onChange(this.value);\"/>\n        <input style=\"width: 57px; border: 0; cursor: pointer; padding-right: 10px; outline: none;\" type=\"date\"\n          oninput=\"onSetDate(this.value)\" value=\"").concat(date, "\" min=\"").concat(today, "\">\n        <button style=\"border: 0; width: 50px; cursor: pointer; background-color: transparent;\n          border-left: 2px solid #ab9296;\" ").concat(isDisabled, " onclick=\"onSubmit()\"> ADD </button>\n      </div>\n      <div style=\"display: flex; align-items: center; justify-content: space-between;\">\n        <input type=\"checkbox\" ").concat(isChecked, " onclick=\"onFreezeToggle()\"><small style=\"flex: 1;\">&nbspfreeze list</small>\n        <small>sort by&nbsp;</small><select onchange=\"onSort(this.val)\">").concat(sortOptions, "</select>\n      </div>\n    </div>\n    </section>");
  },
  methods: {
    onSubmit: function onSubmit() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$data, text, date;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$data = this.data, text = _this$data.text, date = _this$data.date;

                if (text.length) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _context.t0 = this.state.freeze;

                if (!_context.t0) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return this.$warn("a u sure?");

              case 7:
                _context.t0 = !_context.sent;

              case 8:
                if (!_context.t0) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return");

              case 10:
                store_1.default.data.todos.push({
                  endsAt: date,
                  id: Date.now(),
                  done: false,
                  text: text
                });
                this.data.text = "";
                this.state.canAdd = false;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    },
    onChange: function onChange(val) {
      this.data.text = val;

      if (val.length && !this.state.canAdd) {
        this.state.canAdd = true;
      } else if (!val.length && this.state.canAdd) {
        this.state.canAdd = false;
      }
    },
    onSetDate: function onSetDate(val) {
      this.data.date = val;
    },
    onSort: function onSort(val) {
      this.state.sort = val;
    },
    onFreezeToggle: function onFreezeToggle() {
      this.state.freeze = !this.state.freeze;
    },
    onKeyDown: function onKeyDown(key) {
      if (key.code === "Enter" || key.code === "NumpadEnter") {
        this.methods.onSubmit();
      }
    }
  },
  before: function before(prev) {
    this.data.renders++;
  },
  mounted: function mounted() {
    this.data.renders = 1;
    this.data.text = "";
    this.data.date = new Date().toISOString().split("T")[0];
    document.addEventListener("keydown", this.methods.onKeyDown);
  },
  unmounted: function unmounted() {
    document.removeEventListener("keydown", this.methods.onKeyDown);
  }
});
},{"../../../dist":"../../dist/index.js","../store":"store.ts"}],"helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDatesDiff = exports.asyncConfirm = void 0;
var MS_PER_DAY = 1000 * 60 * 60 * 24;

function asyncConfirm() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "warning";
  return new Promise(function (go) {
    var confirmed = window.confirm(msg);
    return confirmed ? go(true) : go(false);
  });
}

exports.asyncConfirm = asyncConfirm;

function formatDatesDiff(from, to) {
  if (!from) return;
  var a = new Date(from);
  var b = to ? new Date(to) : new Date();
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  var diff = Math.floor((utc1 - utc2) / MS_PER_DAY);
  if (!diff) return "today";
  if (diff < 0) return "".concat(Math.abs(diff), "d ago");
  return "after ".concat(diff, "d");
}

exports.formatDatesDiff = formatDatesDiff;
},{}],"components/list.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dist_1 = __importDefault(require("../../../dist"));

var helpers_1 = require("../helpers");

var store_1 = __importDefault(require("../store")); // import Item from "./item";


exports.default = new dist_1.default({
  name: "List",
  debug: true,
  state: store_1.default.rewatch(["todos"]),
  children: {// Item
  },
  template: function template(_ref, _ref2) {
    var renders = _ref.renders;
    var todos = _ref2.todos;

    var item = function item(_ref3, idx) {
      var id = _ref3.id,
          text = _ref3.text,
          done = _ref3.done,
          endsAt = _ref3.endsAt;
      var content = done ? "<del>".concat(text, "</dev>") : text;
      var secondary = done ? "opacity: 0.3" : "";
      var daysLeft = helpers_1.formatDatesDiff(endsAt);
      return "<li style=\"display: flex; align-items: center; border: 2px solid #ab9296; padding: 6px; margin-bottom: 13px; cursor: pointer; ".concat(secondary, "\">\n        <span style=\"flex-grow: 1; text-align: left; margin: 0 1rem;\" onclick=\"onToggleDone(").concat(idx, ")\">").concat(content, "</span>\n        <span style=\"background-color: #eee; padding: 2px 4px; color: #7d7d7d; \"><small><b>").concat(daysLeft, "</b></small></span>\n        <span style=\"font-weight: bolder; width: 1.5rem; font-size: 1.5rem; line-height: 1.5rem;\"onclick=\"onRemove(").concat(id, ")\">&times;</span>\n      </li>");
    };

    return "<section style=\"border: 2px solid pink;\">\n      <small>renders: ".concat(renders, "</small>\n      <ul style=\"list-style: none; padding-inline-start: 0; text-align: center; margin: 1rem;\">").concat(todos.length ? todos.map(item).join("") : "There are no todos", "</ul>\n      </section>");
  },
  methods: {
    onToggleDone: function onToggleDone(idx) {
      this.state.todos[idx].done = !this.state.todos[idx].done;
    },
    onRemove: function onRemove(id) {
      this.state.todos = this.state.todos.filter(function (t) {
        return t.id !== id;
      });
    }
  },
  before: function before() {
    this.data.renders++;
  },
  mounted: function mounted() {
    this.data.renders = 1;
  }
});
},{"../../../dist":"../../dist/index.js","../helpers":"helpers.ts","../store":"store.ts"}],"app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dist_1 = __importDefault(require("../../dist"));

var form_1 = __importDefault(require("./components/form"));

var list_1 = __importDefault(require("./components/list"));

var helpers_1 = require("./helpers"); // add global helpers


dist_1.default.use("warn", helpers_1.asyncConfirm); // entry point

new dist_1.default({
  name: "App",
  // debug: true,
  // state: {
  //   i: 0
  // },
  children: {
    Form: form_1.default,
    List: list_1.default
  },
  template: function template(_ref) {
    var renders = _ref.renders;
    return "<section style=\"border: 2px dashed pink;width: 450px;margin: 2rem auto;\">\n      <small>renders: ".concat(renders, "</small>\n      <br/>\n      <div style=\"padding: 1rem;\">\n        <Form />\n        <Form />\n        <br/>\n        <List />\n      </div>\n      </section>");
  },
  // methods: {
  //   gg() {
  //     this.state.i++;
  //   }
  // },
  before: function before(prevState) {
    this.data.renders++; // recompute any properties here
    // render prevention also goes here with returning true
  },
  after: function after() {// watch side effects here
  },
  mounted: function mounted() {
    // initial bindings go here
    this.data.renders = 1; // async function fetchTodos() {
    //   await wait(5000);
    //   store.data.todos.push(99)
    // }
    // fetchTodos();
  },
  unmounted: function unmounted() {// side effects clearance go here
    // this.log?.("before removed");
    // clearInterval(this.data.interval);
    // await wait(5000);
    // this.log?.("after removed");
  }
}).mount("#app");
},{"../../dist":"../../dist/index.js","./components/form":"components/form.ts","./components/list":"components/list.ts","./helpers":"helpers.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65514" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map