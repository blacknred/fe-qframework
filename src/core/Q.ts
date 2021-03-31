import { withDOM } from "./VDom";
import Watch, { withWatch } from "./Watch";

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
// @withWatch
class Q implements IQ {
  private $dom: any = null;
  private $watch: any = null;
  private $el: Element | null;
  private _data: any;
  private _template: Template;
  private _debounce: number | null = null;

  constructor(options: Options) {
    this.$el = document.querySelector("body");
    this._template = options.template;
    this.$watch = Watch.job;
    this.data = options.data;
  }

  /**
   * Mount an instance
   *
   * @param {String|Element} el root DOM Node
   * @returns {Q} instance
   */
  mount(el: string | Element): Q {
    const elem = typeof el === "string" ? document.querySelector(el) : el;
    if (elem) this.$el = elem;
    this.$el!.innerHTML = this._template(this._data, this);

    return this;
  }

  get data(): any {
    return this._data;
  }

  set data(data: any) {
    this._data = this.$watch(data, this);
    this.render();
    // return true;
  }

  /**
   * Render template
   */
  protected render() {
    // cancel pending renders
    if (this._debounce) {
      window.cancelAnimationFrame(this._debounce);
    }

    // fire new render at the next animation frame
    this._debounce = window.requestAnimationFrame(() => {
      const st = Date.now();
      const templateStr = this._template(this._data, this);
      const templateHTML = this.$dom.stringToHTML(templateStr);
      this.$dom.diff(templateHTML, this.$el);
      console.log(
        `render ${templateStr.length} chars in ${Date.now() - st} ms`
      );
    });
  }
}

export default Q;
