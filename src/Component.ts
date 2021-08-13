import VDom, { withDOM } from "./VDom";
import { withWatcher } from "./Observer";
import {
  ComponentOptions,
  BindedMethod,
  IQComponent,
  Template,
  Logger,
  Mapped,
  QStore,
  Child,
  ORIG
} from "./types";
import {
  createErrorNode,
  createLogger,
  getRegex,
  getNode,
  clone,
  uid
} from "./utils";

/**  Q Component class  */
// @withDOM
@withWatcher
class Component<T extends Mapped<any> = Mapped<any>> implements IQComponent<T> {
  private $el?: Element;
  private readonly $dom?: VDom;
  private readonly $watch?: Function;
  log?: Logger;

  private _state?: T;
  private _prev_state?: T;
  readonly data: Mapped<any> = {}; // TODO: hmmm
  readonly methods: Mapped<BindedMethod<T>> = {}; // TODO: omg
  private readonly _template: Template<T>;
  private readonly _children?: Mapped<Child>;

  private readonly _mounted?: Function;
  private readonly _unmounted?: Function;
  private readonly _before?: Function;
  private readonly _after?: Function;

  private readonly _name: string;
  private _store_subscription?: Function;
  private _debounce?: number;

  /**
   * Q Component class
   * @param {ComponentOptions} options options
   */
  constructor(options: ComponentOptions<T>) {
    // meta options
    this._name = options?.name || `QComponent_${uid(4)}`;
    window.$q[this._name] = {};

    // logger
    if (options?.debug) {
      this.log = createLogger(this._name);
    }

    // template
    this._template = options?.template;
    if (!this._template) return;

    // reactive state
    if (options?.state instanceof QStore) {
      // handle store subscription
      const [data, revoker] = options.state.subscribe(this);
      this._store_subscription = revoker;
      this._state = data;
    } else if (options?.state) {
      // handle local state data
      // @ts-ignore
      process.nextTick(() => {
        this._state = this.$watch?.(options.state, this)[0];
      });
    }

    // prev state
    if (this._state) {
      this._prev_state = clone(this._state);
    }

    // register methods
    if (options?.methods) {
      for (let name in options.methods) {
        window.$q[this._name][name] = options.methods[name].bind(this);
        this.methods[name] = options.methods[name].bind(this);
      }
    }

    // children components
    if (options?.children) {
      this._children = {};
      for (let name in options.children) {
        this._children[name] = {
          vm: options.children[name],
          inUse: false,
          id: uid(6)
        };
      }
    }

    // lifecycle hooks
    this._mounted = options?.mounted;
    this._unmounted = options?.unmounted;
    this._before = options?.before;
    this._after = options?.after;

    // bind render for callback usage
    this.render = this.render.bind(this);
  }

  /**
   * Bind global helper
   */
  static use(name: string, fn: Function) {
    // @ts-ignore
    Component.prototype[`$${name}`] = fn;
  }

  /**
   * State getter
   */
  get state(): T {
    return this._state || ({} as T);
  }

  /**
   * Check readiness to mount
   */
  private isReady(): boolean {
    if (!this._template || !("call" in this._template)) {
      this.log?.("Template function is not provided", "error");
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
  mount(el: string | Element = "body"): this {
    // early return if allready mounted or not ready
    if (this.$el || !this.isReady()) return this;

    // set HTML node
    this.$el = getNode(el);

    // call lifecycle hook
    try {
      this._mounted?.();
    } catch (e) {
      this.log?.(e, "error");
    }

    // initial render
    this.dispatch(true);

    return this;
  }

  /**
   * Unmount an instance
   */
  async unmount() {
    // remove HTML node
    this.$el?.remove();

    // clear store subscription
    this._store_subscription?.();

    // clear binded data
    delete window.$q[this._name];

    // call lifecycle hook
    try {
      await this._unmounted?.();
    } catch (e) {
      this.log?.(e, "error");
    }
  }

  /**
   * Render dispatcher
   */
  dispatch(initial?: boolean) {
    // update previous state
    const { _prev_state } = this;
    this._prev_state = clone(this.state);

    // call a lifecycle hook before rendering to update the
    // computed values and potentially prevent rendering
    if (!initial && this._before?.(_prev_state)) return;

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
  private render() {
    if (!this.$el) return;

    const start = Date.now();
    let templateStr;

    // feed template with actual data
    try {
      // Render dispatch and state mutations are prevented(infinite loop).
      const plainState = this.state[ORIG] || this.state;
      templateStr = this._template.call(null, this.data, plainState);
    } catch (e) {
      // render error node in case of template call error
      templateStr = createErrorNode(this._name, e);
      this.log?.(e, "error");
    }

    // replace methods declarations
    if (this.methods) {
      for (let name in this.methods) {
        if (!templateStr.includes(name)) continue;
        const path = `$q.${this._name}.${name}`;
        templateStr = templateStr.replaceAll(name, path);
      }
    }

    // replace children component tags with actual dom nodes
    if (this._children) {
      for (let name in this._children) {
        if (!templateStr.includes(name)) continue;
        const node = `<div id="${this._children[name].id}"></div>`;
        templateStr = templateStr.replace(getRegex.tag(name), node);
        this._children[name].inUse = true;
        // this._children[name].vm.unmount();
      }
    }

    // console.log(templateStr);
    // inject template in dom
    if (!this.$dom) {
      // direct inject
      this.$el.innerHTML = templateStr;
    } else {
      // inject through virtual dom
      const templateHTML = this.$dom.stringToHTML(templateStr);
      this.$dom.diff(templateHTML as HTMLElement, this.$el as Node);
    }

    // mount children
    if (this._children) {
      for (let name in this._children) {
        const { inUse, id, vm } = this._children[name];
        if (inUse) vm.mount(`#${id}`);
      }
    }

    if (this.log) {
      const len = templateStr.length;
      const text = `render ${len} chars in ${Date.now() - start} ms`;
      this.log(text);
    }

    // call a lifecycle hook after rendering to check watched cases
    this._after?.();
  }
}

export default Component;
