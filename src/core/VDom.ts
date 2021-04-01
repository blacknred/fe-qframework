type Constructor = new (...args: any[]) => {};

class VDom {
  protected _parser: DOMParser = new DOMParser();

  /**
   * Convert a template string into HTML DOM nodes
   * @param  {String} str Template string
   * @return {Node}       Template HTML
   */
  stringToHTML(str: string): Node {
    const doc = this._parser.parseFromString(str, "text/html");

    // If there are items in the head, move them to the body
    if (doc.head && doc.head.childNodes && doc.head.childNodes.length > 0) {
      Array.from(doc.head.childNodes)
        .reverse()
        .forEach(function (node) {
          doc.body.insertBefore(node, doc.body.firstChild);
        });
    }

    return doc.body || document.createElement("body");
  }

  /**
   * Get the type for a node
   * @param  {Element} node HTML node
   * @return {String}       Type
   */
  getNodeType(node: Element): string {
    if (node.nodeType === 3) return "text";
    if (node.nodeType === 8) return "comment";
    return node.tagName.toLowerCase();
  }

  /**
   * Get the content from a node
   * @param  {Element} node  HTML node
   * @return {String | null} Content
   */
  getNodeContent(node: Element): string | null {
    if (node.childNodes && node.childNodes.length > 0) return null;
    return node.textContent;
  }

  /**
   * Compare the template to the UI and make updates
   * @param  {Node} template Template HTML
   * @param  {Node} el       HTML Node
   */
  diff(template: HTMLElement, el: Node) {
    // Get arrays of child nodes
    const domNodes = Array.prototype.slice.call(el.childNodes);
    const templateNodes = Array.prototype.slice.call(template.childNodes);

    // If extra elements in DOM, remove them
    let count = domNodes.length - templateNodes.length;
    if (count > 0) {
      for (; count > 0; count--) {
        domNodes[domNodes.length - count].parentNode.removeChild(
          domNodes[domNodes.length - count]
        );
      }
    }

    // Diff each item in the templateNodes
    templateNodes.forEach((node, index) => {
      // If element doesn't exist, create it
      if (!domNodes[index]) {
        el.appendChild(node.cloneNode(true));
        return;
      }

      // If element is not the same type, replace it with new element
      if (this.getNodeType(node) !== this.getNodeType(domNodes[index])) {
        domNodes[index].parentNode.replaceChild(
          node.cloneNode(true),
          domNodes[index]
        );
        return;
      }

      // If content is different, update it
      const templateContent = this.getNodeContent(node);
      if (
        templateContent &&
        templateContent !== this.getNodeContent(domNodes[index])
      ) {
        domNodes[index].textContent = templateContent;
      }

      // If target element should be empty, wipe it
      if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
        domNodes[index].innerHTML = "";
        return;
      }

      // If element is empty and shouldn't be, build it up
      // This uses a document fragment to minimize reflows
      if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
        const fragment = document.createDocumentFragment();
        this.diff(node, fragment);
        domNodes[index].appendChild(fragment);
        return;
      }

      // If there are existing child elements that need to be modified, diff them
      if (node.childNodes.length > 0) {
        this.diff(node, domNodes[index]);
      }
    });
  }
}

export function withDOM<T extends Constructor>(constructor: T) {
  return class extends constructor {
    $dom = new VDom();
  };
}

export default VDom;
