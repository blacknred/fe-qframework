import { Constructor } from './types';
/** Virtual DOM class */
declare class VDom {
    protected _parser: DOMParser;
    /**
     * Convert a template string into HTML DOM nodes
     * @param  {String} str Template string
     * @return {Node}       Template HTML
     */
    stringToHTML(str: string): Node;
    /**
     * Get the type for a node
     * @param  {Element} node HTML node
     * @return {String}       Type
     */
    getNodeType(node: Element): string;
    /**
     * Get the content from a node
     * @param  {Element} node  HTML node
     * @return {String | null} Content
     */
    getNodeContent(node: Element): string | null;
    /**
     * Compare the template to the UI and make updates
     * @param  {Node} template Template HTML
     * @param  {Node} el       HTML Node
     */
    diff(template: HTMLElement, el: Node): void;
}
/** Virtual Dom class decorator */
export declare function withDOM<O extends Constructor>(constructor: O): {
    new (...args: any[]): {
        $dom: VDom;
    };
} & O;
export default VDom;
//# sourceMappingURL=VDom.d.ts.map