"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const Observer_1 = require("./Observer");
const types_1 = require("./types");
/** Q Store class */
let Store = class Store extends types_1.QStore {
    /**
     * Q Store class
     * @param {StoreOptions} options store options
     */
    constructor(options) {
        var _a;
        super();
        this._listeners = new Map();
        // meta options
        this._name = (options === null || options === void 0 ? void 0 : options.name) || "QStore";
        this._immutable = options === null || options === void 0 ? void 0 : options.immutable;
        // logger
        if (options === null || options === void 0 ? void 0 : options.debug) {
            this.log = utils_1.createLogger(this._name);
        }
        // reactive data
        this._data = (options === null || options === void 0 ? void 0 : options.data) || {}; // TODO: no type cast
        if (!(options === null || options === void 0 ? void 0 : options.data)) {
            (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, "No data was provided", "warn");
        }
        // prev data
        this._prev_data = this._data;
        // getters
        this._getters = options === null || options === void 0 ? void 0 : options.getters;
        // setters
        this._setters = options === null || options === void 0 ? void 0 : options.setters;
        // persister
        if (!!(options === null || options === void 0 ? void 0 : options.persist)) {
            this.persist = utils_1.createPersister(options.persist, this._name, this.log);
            // load cached data
            this._data = this.persist(this._data, true);
        }
    }
    /**
     * Data getter
     */
    get data() {
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
    get(getter, payload) {
        var _a, _b, _c;
        if (!((_a = this._getters) === null || _a === void 0 ? void 0 : _a[getter])) {
            (_b = this.log) === null || _b === void 0 ? void 0 : _b.call(this, `unknown getter ${getter}`, "warn");
        }
        return (_c = this._getters) === null || _c === void 0 ? void 0 : _c[getter](this.data, payload);
    }
    /**
     * Setter
     *
     * @param {string} setter setter name
     * @param {any} payload payload
     */
    set(setter, payload) {
        var _a, _b, _c;
        if (!((_a = this._setters) === null || _a === void 0 ? void 0 : _a[setter])) {
            (_b = this.log) === null || _b === void 0 ? void 0 : _b.call(this, `unknown setter ${setter}`, "warn");
        }
        (_c = this._setters) === null || _c === void 0 ? void 0 : _c[setter](this._data, payload);
    }
    /**
     * Update reducer
     *
     * @param {ListenCtx} deps props selectors
     * @returns {this} store
     */
    rewatch(deps) {
        this._temp_deps = deps;
        return this;
    }
    /**
     * Store subscription
     *
     * @param {IObservable} listener listener
     * @returns {Function} unsubscribe function
     */
    subscribe(listener) {
        var _a;
        // add listener
        this._listeners.set(listener, this._temp_deps);
        this._temp_deps = undefined;
        // run watcher
        if (!this._data[types_1.PROXY]) {
            this._data = (_a = this.$watch) === null || _a === void 0 ? void 0 : _a.call(this, this._data, this)[0];
        }
        return [this.data, () => this._listeners.delete(listener)];
    }
    /**
     * Dispatch subscriptions update
     */
    dispatch() {
        var _a, _b;
        // dispatch listeners
        for (let [listener, deps] of this._listeners) {
            if (!deps || !utils_1.isDeepEqual(this._data[types_1.ORIG], this._prev_data, deps)) {
                listener.dispatch();
            }
        }
        // log
        (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, [this._prev_data, this._data[types_1.ORIG]]);
        // persist
        (_b = this.persist) === null || _b === void 0 ? void 0 : _b.call(this, this._data[types_1.ORIG]);
        // update previous data
        this._prev_data = utils_1.clone(this._data);
    }
};
Store = __decorate([
    Observer_1.withWatcher
], Store);
exports.default = Store;
//# sourceMappingURL=Store.js.map