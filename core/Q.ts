import { withDOM } from "./VDom";
import Watch, { withWatch } from "./Watch";

type Options = {
  data: any;
  template: (props: any) => string;
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
  private _template: (props: any) => string;
  private _debounce: number | null = null;

  constructor(options: Options) {
    this.$el = document.querySelector("body");
    this._template = options.template;
    this.$watch = Watch.job;
    this.data = options.data;
  }

  /**
   * Mount an instance
   * @param {String|Element} el root DOM Node
   */
  mount(el: string | Element) {
    const elem = typeof el === "string" ? document.querySelector(el) : el;
    if (elem) this.$el = elem;
    this.$el!.innerHTML = this._template(this._data);

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

  private render() {
    // cancel pending renders
    if (this._debounce) {
      window.cancelAnimationFrame(this._debounce);
    }

    // fire new render at the next animation frame
    this._debounce = window.requestAnimationFrame(() => {
      // diff from virtual dom
      const st = Date.now();
      const templateHTML = this.$dom.stringToHTML(this._template(this._data));
      this.$dom.diff(templateHTML, this.$el);
      console.log(`render in ${Date.now() - st} ms`);
    });
  }
}

export default Q;
