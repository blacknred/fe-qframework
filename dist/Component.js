"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Component_1;
Object.defineProperty(exports, "__esModule", { value: true });
const Observer_1 = require("./Observer");
const types_1 = require("./types");
const utils_1 = require("./utils");
/**  Q Component class  */
// @withDOM
let Component = Component_1 = class Component {
    /**
     * Q Component class
     * @param {ComponentOptions} options options
     */
    constructor(options) {
        this.data = {}; // TODO: hmmm
        this.methods = {}; // TODO: omg
        // meta options
        this._name = (options === null || options === void 0 ? void 0 : options.name) || `QComponent_${utils_1.uid(4)}`;
        window.$q[this._name] = {};
        // logger
        if (options === null || options === void 0 ? void 0 : options.debug) {
            this.log = utils_1.createLogger(this._name);
        }
        // template
        this._template = options === null || options === void 0 ? void 0 : options.template;
        if (!this._template)
            return;
        // reactive state
        if ((options === null || options === void 0 ? void 0 : options.state) instanceof types_1.QStore) {
            // handle store subscription
            const [data, revoker] = options.state.subscribe(this);
            this._store_subscription = revoker;
            this._state = data;
        }
        else if (options === null || options === void 0 ? void 0 : options.state) {
            // handle local state data
            // @ts-ignore
            process.nextTick(() => {
                var _a;
                this._state = (_a = this.$watch) === null || _a === void 0 ? void 0 : _a.call(this, options.state, this)[0];
            });
        }
        // prev state
        if (this._state) {
            this._prev_state = utils_1.clone(this._state);
        }
        // register methods
        if (options === null || options === void 0 ? void 0 : options.methods) {
            for (let name in options.methods) {
                window.$q[this._name][name] = options.methods[name].bind(this);
                this.methods[name] = options.methods[name].bind(this);
            }
        }
        // children components
        if (options === null || options === void 0 ? void 0 : options.children) {
            this._children = {};
            for (let name in options.children) {
                this._children[name] = {
                    vm: options.children[name],
                    inUse: false,
                    id: utils_1.uid(6)
                };
            }
        }
        // lifecycle hooks
        this._mounted = options === null || options === void 0 ? void 0 : options.mounted;
        this._unmounted = options === null || options === void 0 ? void 0 : options.unmounted;
        this._before = options === null || options === void 0 ? void 0 : options.before;
        this._after = options === null || options === void 0 ? void 0 : options.after;
        // bind render for callback usage
        this.render = this.render.bind(this);
    }
    /**
     * Bind global helper
     */
    static use(name, fn) {
        // @ts-ignore
        Component_1.prototype[`$${name}`] = fn;
    }
    /**
     * State getter
     */
    get state() {
        return this._state || {};
    }
    /**
     * Check readiness to mount
     */
    isReady() {
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
    mount(el = "body") {
        var _a, _b;
        // early return if allready mounted or not ready
        if (this.$el || !this.isReady())
            return this;
        // set HTML node
        this.$el = utils_1.getNode(el);
        // call lifecycle hook
        try {
            (_a = this._mounted) === null || _a === void 0 ? void 0 : _a.call(this);
        }
        catch (e) {
            (_b = this.log) === null || _b === void 0 ? void 0 : _b.call(this, e, "error");
        }
        // initial render
        this.dispatch(true);
        return this;
    }
    /**
     * Unmount an instance
     */
    unmount() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // remove HTML node
            (_a = this.$el) === null || _a === void 0 ? void 0 : _a.remove();
            // clear store subscription
            (_b = this._store_subscription) === null || _b === void 0 ? void 0 : _b.call(this);
            // clear binded data
            delete window.$q[this._name];
            // call lifecycle hook
            try {
                yield ((_c = this._unmounted) === null || _c === void 0 ? void 0 : _c.call(this));
            }
            catch (e) {
                (_d = this.log) === null || _d === void 0 ? void 0 : _d.call(this, e, "error");
            }
        });
    }
    /**
     * Render dispatcher
     */
    dispatch(initial) {
        var _a;
        // update previous state
        const { _prev_state } = this;
        this._prev_state = utils_1.clone(this.state);
        // call a lifecycle hook before rendering to update the
        // computed values and potentially prevent rendering
        if (!initial && ((_a = this._before) === null || _a === void 0 ? void 0 : _a.call(this, _prev_state)))
            return;
        // cancel pending renders
        if (this._debounce) {
            cancelAnimationFrame(this._debounce);
        }
        // fire new render at the next animation frame
        this._debounce = requestAnimationFrame(this.render);
    }
    /**
     * Render
     */
    render() {
        var _a, _b;
        if (!this.$el)
            return;
        const start = Date.now();
        let templateStr;
        // feed template with actual data
        try {
            // Render dispatch and state mutations are prevented(infinite loop).
            const plainState = this.state[types_1.ORIG] || this.state;
            templateStr = this._template.call(null, this.data, plainState);
        }
        catch (e) {
            // render error node in case of template call error
            templateStr = utils_1.createErrorNode(this._name, e);
            (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, e, "error");
        }
        // replace methods declarations
        if (this.methods) {
            for (let name in this.methods) {
                if (!templateStr.includes(name))
                    continue;
                const path = `$q.${this._name}.${name}`;
                templateStr = templateStr.replaceAll(name, path);
            }
        }
        // replace children component tags with actual dom nodes
        if (this._children) {
            for (let name in this._children) {
                if (!templateStr.includes(name))
                    continue;
                const node = `<div id="${this._children[name].id}"></div>`;
                templateStr = templateStr.replace(utils_1.getRegex.tag(name), node);
                this._children[name].inUse = true;
                // this._children[name].vm.unmount();
            }
        }
        // console.log(templateStr);
        // inject template in dom
        if (!this.$dom) {
            // direct inject
            this.$el.innerHTML = templateStr;
        }
        else {
            // inject through virtual dom
            const templateHTML = this.$dom.stringToHTML(templateStr);
            this.$dom.diff(templateHTML, this.$el);
        }
        // mount children
        if (this._children) {
            for (let name in this._children) {
                const { inUse, id, vm } = this._children[name];
                if (inUse)
                    vm.mount(`#${id}`);
            }
        }
        if (this.log) {
            const len = templateStr.length;
            const text = `render ${len} chars in ${Date.now() - start} ms`;
            this.log(text);
        }
        // call a lifecycle hook after rendering to check watched cases
        (_b = this._after) === null || _b === void 0 ? void 0 : _b.call(this);
    }
};
Component = Component_1 = __decorate([
    Observer_1.withWatcher
], Component);
exports.default = Component;
//# sourceMappingURL=Component.js.map