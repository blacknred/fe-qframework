"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withWatcher = void 0;
const types_1 = require("./types");
/** Reactive dispatcher class */
class Observer {
    /**
     * Reactive dispatcher class
     * @param {IObservable} _observable target for dispatching
     */
    constructor(_observable) {
        this._observable = _observable;
    }
    static watch(data, target) {
        const { proxy, revoke } = Proxy.revocable(data, new Observer(target));
        return [proxy, revoke];
    }
    get(props, prop) {
        var _a;
        if (prop === types_1.ORIG)
            return props;
        if (prop === types_1.PROXY)
            return true;
        if (((_a = props[prop]) === null || _a === void 0 ? void 0 : _a.constructor) === Object || Array.isArray(props[prop])) {
            return new Proxy(props[prop], this);
        }
        return Reflect.get(props, prop);
    }
    set(props, prop, value) {
        if (props[prop] === value)
            return true;
        props[prop] = value;
        this._observable.dispatch();
        return true;
    }
    deleteProperty(props, prop) {
        delete props[prop];
        this._observable.dispatch();
        return true;
    }
}
/** Observer class decorator */
function withWatcher(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.$watch = Observer.watch;
        }
    };
}
exports.withWatcher = withWatcher;
exports.default = Observer;
//# sourceMappingURL=Observer.js.map