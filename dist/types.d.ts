declare global {
    interface Window {
        $q: any;
    }
}
export declare const ORIG: string;
export declare const PROXY: string;
export declare type Constructor = new (...args: any[]) => {};
/** Mapped type */
export declare type Mapped<T> = Record<PropertyKey, T>;
/** Log levels */
export declare type LogType = "error" | "warn" | "log";
/** Log level color map */
export declare enum LogTypeColor {
    error = "coral",
    warn = "gold",
    log = "#5eba7d"
}
/** Log data */
export declare type Log = Error | string;
/** Logger function */
export declare type Logger = (message: Log | Log[], type?: LogType) => void;
/** Persistence function */
export declare type Persister<T> = (data: Readonly<T>, initial?: boolean) => T;
/** Persist adapter */
export declare type PersistAdapter<T> = ((data: T) => T | void) | "localstorage" | "indexeddb" | "websql" | boolean;
/** Dispatchable instance */
export interface IObservable {
    dispatch: (initial?: boolean) => void;
}
/** Q Store listener interest updates */
export declare type ListenCtx<T> = (keyof T | ((data: T) => any))[];
/** Q Store listener list */
export declare type Listeners<T> = Map<IObservable, ListenCtx<T> | undefined>;
/** Q Store setter */
export declare type Setter<T> = (
/** store data */
data: T, 
/** payload */
payload: any) => void;
/** Q Store getter */
export declare type Getter<T> = (
/** store data */
data: Readonly<T>, 
/** payload */
payload?: any) => Partial<T>;
/** Q Store options */
export declare type StoreOptions<T = Mapped<any>, G = Mapped<Getter<T>>, S = Mapped<Setter<T>>> = {
    /** reactive data */
    data: T;
    /** store label */
    name?: string;
    /** allows logging */
    debug?: boolean;
    /** prevents direct data change.\
     * may be useful for scenario of changing data only by setters. */
    immutable?: boolean;
    /** persistense adapter.\
     * if a callback is provided, it will be called synchronously both to
     * initialize the store and for each update.\
     * if callback uses initial data fetching, use the setter instead. */
    persist?: PersistAdapter<T>;
    /** store getters.\
     * typings have to be inplemented via type */
    getters?: G;
    /** store setters.\
     * typings have to be inplemented via type */
    setters?: S;
};
/** Q Store abstract class */
export declare abstract class QStore<T = Mapped<any>, G = Mapped<Getter<T>>, S = Mapped<Setter<T>>> implements IObservable {
    abstract dispatch(): void;
    abstract rewatch(deps: ListenCtx<T>): this;
    abstract subscribe(listener: IObservable): [T, Function];
    abstract get(getter: keyof G, payload?: any): T[any] | undefined;
    abstract set(setter: keyof S, payload: any): void;
}
/** Function binded to Q Component */
export declare type BindedMethod<T> = (this: IQComponent<T>, ...args: any[]) => void;
/** Q Component */
export interface IQComponent<T = Mapped<any>> extends IObservable {
    state: T;
    data: Mapped<any>;
    methods: Mapped<(...args: any[]) => void>;
    mount(el: string | Element): IQComponent<T>;
    unmount(): void;
    log?: Logger;
}
/** Q Component child */
export declare type Child = {
    vm: IQComponent;
    inUse: boolean;
    id: string;
};
/** Q Component template function */
export declare type Template<T> = (this: null, 
/** static data */
data: Readonly<any>, 
/** current state */
state: Readonly<T>) => string;
/** Q Component options */
export interface ComponentOptions<T = Mapped<any>> {
    /** allows extra logging */
    debug?: boolean;
    /** label component */
    name?: string;
    /** reactive state or store */
    state?: T | QStore<T>;
    /** template function */
    template: Template<T>;
    /** nested components */
    children?: Mapped<IQComponent>;
    /** methods for template */
    methods?: Mapped<BindedMethod<T>>;
    /** lifecycle hook fires before initial render */
    mounted?: (this: IQComponent<T>) => void;
    /** async lifecycle hook fires after unmounting */
    unmounted?: (this: IQComponent<T>) => void;
    /** lifecycle hook fires before every non initial render.\
     * used for recompute computed values.\
     * return true for render prevention */
    before?: (this: IQComponent<T>, prevState: Readonly<T>) => boolean | void;
    /** lifecycle hook fires after every render.\
     * used for watch side effects */
    after?: (this: IQComponent<T>) => void;
}
//# sourceMappingURL=types.d.ts.map