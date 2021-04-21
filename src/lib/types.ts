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

/** Q Store persistence function */
export type Persister<T> = (data: T, initial?: boolean) => T;

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

/** Q Store */
export interface IQStore<T, G, S>
  extends IObservable {
  subscribe(listener: IObservable): Function;
  get(getter: keyof G, payload?: any): T[any] | undefined;
  set(setter: keyof S, payload: any): void;
}

/** Q Store setters */
export type Setters<T> = Mapped<(data: T, payload: number) => void>;

/** Q Store getters */
export type Getters<T> = Mapped<(data: T, payload?: any) => T[any]>; //T[any]>; //|Pick<T, keyof T>>

/** Store options */
export type StoreOptions<T> = {
  /** reactive data */
  data: T;
  /** label store */
  name?: string;
  /** allows logging */
  debug?: boolean;
  /** allows state persistence */
  persist?: boolean;
  /** setters */
  setters?: Setters<T>;
  /** getters */
  getters?: Getters<T>;
};

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

/** Component options */
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
