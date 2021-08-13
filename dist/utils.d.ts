import { Mapped, Logger, Persister, PersistAdapter, ListenCtx } from "./types";
export declare function uid(len?: number): string;
export declare function wait(ms?: number): Promise<void>;
export declare function throttle(callback: Function, limit?: number): () => void;
export declare function debounce(callback: Function, limit?: number): () => void;
export declare function clone(data: any): any;
export declare const getRegex: {
    tag(tag: string): RegExp;
};
/**
 * JSON based object comparison
 *
 * limitations:
 * - key order matters
 * - some types are not representable(dates=>strings, ignores keys with undefined values)
 */
export declare function isDeepEqual(a: any, b: any, ctx?: ListenCtx<any>): boolean;
export declare function getNode(el?: string | Element): Element;
export declare function createErrorNode(label: string, error: any): string;
export declare function createPersister<T extends Mapped<any>>(adapter: PersistAdapter<T>, name: string, logger?: Logger): Persister<T>;
export declare function createLogger(name: string): Logger;
//# sourceMappingURL=utils.d.ts.map