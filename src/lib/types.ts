import Component from "./Component";

export const ORIG = (Symbol.for("ORIGINAL") as unknown) as string;

export type Constructor = new (...args: any[]) => {};

/** Mapped type */
export type Mapped<T> = Record<PropertyKey, T>;

/** Log levels */
export type LogType = "error" | "warn" | "log";

/** Log level color map */
export enum LogTypeColor {
  error = "coral",
  warn = "gold",
  log = "#5eba7d"
}

/** Log data */
export type Log = Error | string;

/** Logger function */
export type Logger = (message: Log | Log[], type?: LogType) => void;

/** Persistence function */
export type Persister<T> = (data: T, initial?: boolean) => T;

/** Persist adapter */
export type PersistAdapter<T> =
  | boolean
  | "localstorage"
  | "indexeddb"
  | "websql"
  | ((data: T) => T | void);

/** Dispatch-ready instance */
export interface IObservable {
  dispatch: (initial?: boolean) => void;
}

/** Reactive dispatcher abstract class */
export abstract class ProxyDispatcher<T extends Mapped<any>>
  implements ProxyHandler<T> {
  constructor(public _observable: IObservable) {}

  abstract get(props: T, prop: keyof T): any;
  abstract set(props: T, prop: keyof T, value: any): boolean;
  abstract deleteProperty(props: T, prop: keyof T): boolean;
}

// ----------------------------------------------------------------------------

/** Q Store setter */
export type Setter<T> = (
  /** store data */
  data: T,
  /** payload */
  payload: any
) => void;

/** Q Store getter */
export type Getter<T> = (
  /** store data */
  data: T,
  /** payload */
  payload?: any
) => T[keyof T]; //T[any]>; //|Pick<T, keyof T>>

/** Q Store options */
export type StoreOptions<
  T = Mapped<any>,
  G = Mapped<Getter<T>>,
  S = Mapped<Setter<T>>
> = {
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

/** Q Store */
export interface IQStore<
  T = Mapped<any>,
  G = Mapped<Getter<T>>,
  S = Mapped<Setter<T>>
> extends IObservable {
  subscribe(listener: IObservable): Function;
  get(getter: keyof G, payload?: any): T[any] | undefined;
  set(setter: keyof S, payload: any): void;
}

// ---------------------------------------------------------------------------

/** Q Component */
export interface IQComponent<T> extends IObservable {
  mount(el: string | Element): Component<T>;
  unmount(): void;
}

/** Q Component child */
export type Child<T> = {
  /** instance */
  vm: T;
  /** id */
  id: string;
  /** tag */
  name: string;
  /** usage flag */
  inUse: boolean;
};

/** Q Component template function */
export type Template<T> = (
  /** current state */
  state: T,
  /** static props */
  props: any
) => string;

/** Q Component LifeCycle function */
export type LifeCycle<T> = (
  /** instance */
  vm: T
) => void;

/** Q Component BeforeLifeCycle function */
export type BeforeLifeCycle<T> = (
  /** previous state */
  prevState: T,
  /** current state */
  nextState: T
) => boolean | void;

/** Q Component AfterLifeCycle function */
export type AfterLifeCycle<T> = (
  /** current state */
  state: T
) => void;

/** Q Component options */
export type ComponentOptions<T> = {
  /** allows extra logging */
  debug?: boolean;
  /** label component */
  name?: string;
  /** reactive state or store */
  state?: T | IQStore<T>;
  /** template function */
  template: Template<T>;
  /** nested components */
  children?: Mapped<Component<any>>;
  /** methods for template */
  methods?: Mapped<Function>;
  /** lifecycle hook fires before initial render */
  mounted?: LifeCycle<Component<any>>;
  /** async lifecycle hook fires after unmounting */
  unmounted?: LifeCycle<Component<any>>;
  /** lifecycle hook fires before every non initial render,
   * return true for render prevention */
  before?: BeforeLifeCycle<T>;
  /** lifecycle hook fires after every render */
  after?: AfterLifeCycle<T>;
};
