import Q from "./Q";

export type Constructor = new (...args: any[]) => {};

export type Observable = {
  render: (initial?: boolean) => void;
};

export interface IQ {
  mount(el: string | Element): Promise<Q> | void;
  unmount(): void;
}

export type Props = Record<string, any>;

export type Child = { id: string; name: string; vm: Q; inUse: boolean };

export type Template = (
  /** current state */
  state: Props,
  /** static props */
  props: Props
) => string;

export type LifeCycle = (
  /** Q instance */
  vm: Q
) => void;

export type BeforeLifeCycle = (
  /** previous state */
  prevState: Props,
  /** current state */
  state: Props
) => boolean | void;

export type AfterLifeCycle = (
  /** current state */
  state: Props
) => void;

/** Instance options */
export type Options = {
  /** allows extra logging */
  debug?: boolean;
  /** label component */
  name?: string;
  /** reactive state */
  state?: Props;
  /** template function */
  template: Template;
  /** nested components */
  children?: Record<string, Q>;
  /** lifecycle hook fires before initial render */
  mounted?: LifeCycle;
  /** lifecycle hook fires before every non initial render */
  before?: BeforeLifeCycle;
  /** lifecycle hook fires after every render */
  after?: AfterLifeCycle;
  /** lifecycle hook fires before unmounting */
  unmounted?: LifeCycle;
};

export type LogType = "ERROR" | "WARN" | "INFO";

export enum LogTypeColor {
  ERROR = "coral",
  WARN = "gold",
  INFO = "green"
}

export type Logger = (message: Error | string, type?: LogType) => void;
