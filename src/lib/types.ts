import Component from "./Component";
import Store from "./Store";

export type Constructor = new (...args: any[]) => {};

export interface IObservable {
  dispatch: (initial?: boolean) => void;
}

export interface IQComponent {
  mount(el: string | Element): Component;
  unmount(): void;
}

export type Props = Record<string, any>;

export type Child<T> = {
  /** instance */
  vm: T;
  id: string;
  name: string;
  inUse: boolean;
};

export type Template<T> = (
  /** current state */
  state: T,
  /** static props */
  props: T
) => string;

export type LifeCycle<T> = (
  /** instance */
  vm: T
) => void;

export type BeforeLifeCycle<T> = (
  /** previous state */
  prevState: T,
  /** current state */
  state: T
) => boolean | void;

export type AfterLifeCycle<T> = (
  /** current state */
  state: T
) => void;

/** Component options */
export type ComponentOptions = {
  /** allows extra logging */
  debug?: boolean;
  /** label component */
  name?: string;
  /** reactive store or state */
  state?: Store<Props> | Props;
  /** template function */
  template: Template<Props>;
  /** nested components */
  children?: Record<string, Component>;
  /** lifecycle hook fires before initial render */
  mounted?: LifeCycle<Component>;
  /** lifecycle hook fires before every non initial render,
   * return true for render prevention */
  before?: BeforeLifeCycle<Props>;
  /** lifecycle hook fires after every render */
  after?: AfterLifeCycle<Props>;
  /** async lifecycle hook fires after unmounting */
  unmounted?: LifeCycle<Component>;
};

/** Store options */
export type StoreOptions = {
  /** label store */
  name?: string;
  /** allows logging */
  debug?: boolean;
  /** allows persist state */
  persister?: any;
};

export type LogType = "error" | "warn" | "log";

export enum LogTypeColor {
  error = "coral",
  warn = "gold",
  log = "green"
}

export type Log = Error | string;

export type Logger = (message: Log | Log[], type?: LogType) => void;

export type Persister<T> = (data: T, initial?: boolean) => T;
