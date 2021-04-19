import VDom, { withDOM } from "./VDom";
import Watcher, { withWatcher, ORIG } from "./Watcher";
import {
  ComponentOptions,
  IQComponent,
  IObservable,
  Template,
  Logger,
  Child,
  Props
} from "./types";
import {
  createErrorNode,
  createLogger,
  replaceTag,
  getNode,
  uid,
  clone
} from "./helpers";

/**
 * Q Component class
 * @param {ComponentOptions} options options
 */

// @withDOM
@withWatcher
class Component implements IQComponent, IObservable {
  private $el?: Element;
  private readonly $dom?: VDom;
  private readonly $watch?: Function;
  log?: Logger;
  //
  private _state: Props;
  private _prev_state: Props;
  readonly props: Props = {};
  private readonly _template: Template<Props>;
  private readonly _children?: Child<Component>[];
  //
  private readonly _mounted?: Function;
  private readonly _before?: Function;
  private readonly _after?: Function;
  private readonly _unmounted?: Function;
  //
  private readonly _name: string;
  private _store_subscription?: Function;
  private _debounce?: number;

  constructor(options: ComponentOptions) {
    // meta options
    this._name = options?.name || "QComponent";
    // logger
    if (options?.debug) {
      this.log = createLogger(this._name);
    }
    // reactive state
    this._state = options?.state || {};
    this._prev_state = this._state;
    // template, disable dispatch call from template
    this._template = options?.template?.bind({});
    // children components
    if (options?.children) {
      const children = Object.entries(options.children);
      this._children = children.map(([name, vm]) => ({
        inUse: false,
        id: uid(6),
        name,
        vm
      }));
    }
    // lifecycle hooks, disable dispatch call from render hooks
    this._mounted = options?.mounted;
    this._unmounted = options?.unmounted;
    this._before = options?.before?.bind({});
    this._after = options?.after?.bind({});
    // bind render for callback usage
    this.render = this.render.bind(this);
  }

  /**
   * State getter
   */
  get state(): Props {
    return this._state;
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
  mount(el: string | Element = "body"): Component {
    // check readiness
    if (!this.isReady()) return this;

    // check window sandbox
    // @ts-ignore
    if (!window.q) window.q = {};

    // set HTML node
    this.$el = getNode(el);

    // call lifecycle hook
    try {
      this._mounted?.(this);
    } catch (e) {
      this.log?.(e, "error");
    }

    // watch state changes
    if (!!this._state.subscribe) {
      // handle store(shared state)
      this._store_subscription = this._state.subscribe(this);
      this._prev_state = clone(this._state);
    } else if (!(this._state instanceof Watcher)) {
      // or run watcher for own state
      this._state = this.$watch?.(this._state, this);
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

    // call lifecycle hook
    try {
      await this._unmounted?.(this);
    } catch (e) {
      this.log?.(e, "error");
    }
  }

  /**
   * Dispatcher
   */
  dispatch(initial?: boolean) {
    // update previous state
    const { _prev_state } = this;
    this._prev_state = clone(this._state);

    // call lifecycle hook to check render prevention
    if (!initial && this._before?.(_prev_state, this.state)) return;

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

    try {
      // feed template with actual data.
      // Render dispatch and state mutations are prevented due infinite loop.
      templateStr = this._template(this._state[ORIG], this.props);
    } catch (e) {
      // render error node in case of template call error
      templateStr = createErrorNode(this._name, e);
      this.log?.(e, "error");
    }

    // replace children component tags with actual dom nodes
    if (this._children) {
      for (let child of this._children) {
        if (!templateStr.includes(child.name)) continue;
        const node = `<div id="${child.id}"></div>`;
        templateStr = replaceTag(templateStr, child.name, node);
        child.inUse = true;
      }
    }
    // console.log(templateStr);
    // inject template in dom
    if (!this.$dom) {
      // direct inject
      this.$el.innerHTML = templateStr;
    } else {
      // inject throuth virtual dom
      const templateHTML = this.$dom.stringToHTML(templateStr);
      this.$dom.diff(templateHTML as HTMLElement, this.$el as Node);
    }

    // mount children
    if (this._children) {
      for (let child of this._children) {
        if (child.inUse) child.vm.mount(`#${child.id}`);
      }
    }

    if (this.log) {
      const len = templateStr.length;
      const text = `render ${len} chars in ${Date.now() - start} ms`;
      this.log(text);
    }

    // call lifecycle hook
    this._after?.(this._state[ORIG]);
  }
}

export default Component;
