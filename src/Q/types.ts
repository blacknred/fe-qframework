import Q from "./Q";

export type Constructor = new (...args: any[]) => {};

export type Observable = {
  render: (initial?: boolean) => void;
};

export type State = Record<string, any>;

export type Template = (state: State, props: any) => string;

export type Child = { id: string; name: string; vm: Q; inUse: boolean };

export type LiveCycle = (vm: Q) => void;
export type BeforeLiveCycle = (prevState: State) => boolean | void;
export type AfterLiveCycle = (newState: State) => void;

export interface IQ {
  mount(el: string | Element): Promise<Q> | void;
  unmount(): void;
}

export type Options = {
  // meta
  debug?: boolean;
  name?: string;
  // base
  state?: State;
  template: Template;
  children?: Record<string, Q>;
  // livecycle
  mounted?: LiveCycle;
  before?: BeforeLiveCycle;
  after?: AfterLiveCycle;
  unmounted?: LiveCycle;
};

export type LogType = "ERROR" | "WARN" | "INFO";

export enum LogTypeColor {
  ERROR = "coral",
  WARN = "gold",
  INFO = "green"
}

export type Logger = (message: Error | string, type?: LogType) => void;
