import VDom, { withDOM } from "./VDom";
import { withWatcher } from "./Watcher";

type Template = (props: any, $q?: Q) => string;
type Options = {
  data: any;
  template: Template;
};

interface IQ {
  mount(el: string | Element): Q;
}

/**
 * Q class
 * @param {Object} options options
 */

@withDOM
@withWatcher
class Q implements IQ {
  private $el?: Element;
  private readonly $dom?: VDom;
  private readonly $watch?: Function;
  private readonly _template: Template;
  private _debounce?: number;
  private _data: any;

  constructor(options: Options) {
    this._template = options.template;
    this._data = options.data;
  }

  get data(): any {
    return this._data;
  }

  set data(data: any) {
    if (!this.$watch) this._data = data;
    else this._data = this.$watch(data, this);
    this.render();
  }

  /**
   * Mount an instance
   *
   * @param {String|Element} el root DOM Node
   * @returns {Q} instance
   */
  mount(el: string | Element = "body"): Q {
    // set HTML element
    const elem = typeof el === "string" ? document.querySelector(el) : el;
    if (elem) {
      this.$el = elem;
    } else {
      this.$el = document.createElement("div");
      document.body.appendChild(this.$el);
    }

    // trigger watcher
    this.data = this._data;

    return this;
  }

  /**
   * Render template
   */
  private render() {
    // cancel pending renders
    if (this._debounce) {
      window.cancelAnimationFrame(this._debounce);
    }

    // fire new render at the next animation frame
    this._debounce = window.requestAnimationFrame(() => {
      if (!this.$el) return;

      const st = Date.now();
      const templateStr = this._template(this._data, this);

      if (!this.$dom) {
        this.$el.innerHTML = templateStr;
      } else {
        const templateHTML = this.$dom.stringToHTML(templateStr);
        this.$dom.diff(templateHTML as HTMLElement, this.$el as Node);
      }

      console.log(
        `render ${templateStr.length} chars in ${Date.now() - st} ms`
      );
    });
  }
}

export default Q;
