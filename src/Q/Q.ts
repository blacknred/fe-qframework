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

import VDom, { withDOM } from "./VDom";
import { withWatcher } from "./Watcher";
import { Child, Template, Options, IQ, Logger, State } from "./types";
import {
  createErrorNode,
  createLogger,
  replaceTag,
  getNode,
  uid
} from "./helpers";

/**
 * Q class
 *
 * @param {Options} options options
 */

// @withDOM
@withWatcher
class Q implements IQ {
  private $el?: Element;
  private readonly $dom?: VDom;
  private readonly $watch?: Function;
  log: Logger;
  //
  private readonly _template: Template;
  private readonly _state?: State;
  private _prev_state?: State;
  private readonly _children?: Child[];
  readonly props: any = {};
  //
  private readonly _mounted?: Function;
  private readonly _before?: Function;
  private readonly _after?: Function;
  private readonly _unmounted?: Function;
  //
  private readonly _debug?: boolean;
  private readonly _name: string;
  private _debounce?: number;

  constructor(options: Options) {
    // meta options
    this._debug = options?.debug;
    this._name = options?.name || "Q";
    // reactive state
    this._state = options?.state;
    this._prev_state = options?.state;
    // this._state = this.$watch?.(this._state, this);
    // template
    this._template = options?.template;
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
    // livecycle hooks
    this._mounted = options?.mounted;
    this._before = options?.before;
    this._after = options?.after;
    this._unmounted = options?.unmounted;

    // logger
    this.log = createLogger(this._name);
    // bind render for callback usage
    this._render = this._render.bind(this);
  }

  /**
   * State getter
   */
  get state(): State | void {
    return this._state;
  }

  // /**
  //  * State setter
  //  *
  //  * @param {any} data state value
  //  */
  // set state(data: any) {
  //   // set data and run watcher
  //   if (!this.$watch) this._state = data;
  //   else this._state = this.$watch(data, this);

  //   // call render
  //   this.render();
  // }

  /**
   * Check readiness to mount
   */
  isReady(): boolean {
    if (!this._template || !('call' in this._template)) {
      this.log("Template function is not provided", "ERROR");
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
  async mount(el: string | Element = "body"): Promise<Q> {
    // check readiness
    if (!this.isReady()) return this;

    // set HTML node
    this.$el = getNode(el);

    // call livecycle hook
    try {
      await this._mounted?.(this);
    } catch (e) {
      this.log(e, "ERROR");
    }

    // initial render// this.state = this._state;
    this.render(true);

    return this;
  }

  /**
   * Unmount an instance
   */
  async unmount() {
    // call livecycle hook
    try {
      await this._unmounted?.(this);
    } catch (e) {
      this.log(e, "ERROR");
    }

    // remove HTML node
    this.$el?.remove();
  }

  /**
   * Render
   */
  private render(initial?: boolean) {
    // update previous state
    const { _prev_state } = this;
    this._prev_state = this.state;

    // call livecycle hook to check render prevention
    if (!initial && this._before?.(_prev_state)) return;

    // cancel pending renders
    if (this._debounce) {
      window.cancelAnimationFrame(this._debounce);
    }

    // fire new render at the next animation frame
    this._debounce = window.requestAnimationFrame(this._render);
  }

  /**
   * Render template
   */
  private _render() {
    if (!this.$el) return;

    const start = Date.now();
    let templateStr;

    try {
      // feed template with actual data
      templateStr = this._template(this.state, this.props);
    } catch (e) {
      // render error node in case of template call error
      templateStr = createErrorNode(this._name, e);
      this.log(e, "ERROR");
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

    if (this._debug) {
      const len = templateStr.length;
      const text = `render ${len} chars in ${Date.now() - start} ms`;
      this.log(text);
    }

    // call livecycle hook
    this._after?.(this.state);
  }
}

export default Q;
