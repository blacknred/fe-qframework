import { Mapped, Constructor, IObservable } from "./types";
/** Reactive dispatcher class */
declare class Observer<T extends Mapped<any>> implements ProxyHandler<T> {
    _observable: IObservable;
    /**
     * Reactive dispatcher class
     * @param {IObservable} _observable target for dispatching
     */
    constructor(_observable: IObservable);
    static watch<T extends Mapped<any>>(data: T, target: IObservable): ((() => void) | T)[];
    get(props: T, prop: keyof T): any;
    set(props: T, prop: keyof T, value: any): boolean;
    deleteProperty(props: T, prop: keyof T): boolean;
}
/** Observer class decorator */
export declare function withWatcher<O extends Constructor>(constructor: O): {
    new (...args: any[]): {
        $watch: typeof Observer.watch;
    };
} & O;
export default Observer;
//# sourceMappingURL=Observer.d.ts.map