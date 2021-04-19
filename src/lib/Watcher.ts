import { Constructor, Props, IObservable } from "./types";

export const ORIG = (Symbol.for("ORIGINAL") as unknown) as string;

/**
 * Reactive dispatcher class
 * @param {IObservable} _observable target for dispatching
 */

class Watcher<T extends Props> {
  constructor(public _observable: IObservable) {}

  static job<T extends Props>(data: T, target: IObservable) {
    return new Proxy(data, new Watcher<T>(target));
  }

  get(props: T, prop: string): any {
    if (prop === ORIG) return props;

    if (props[prop]?.constructor === Object || Array.isArray(props[prop])) {
      return new Proxy(props[prop], this);
    }

    return Reflect.get(props, prop);
  }

  set(props: T, prop: string, value: any) {
    if (props[prop] === value) return true;
    (props[prop] as object) = value;
    this._observable.dispatch();
    return true;
  }

  deleteProperty(props: T, prop: string) {
    delete props[prop];
    this._observable.dispatch();
    return true;
  }
}

/** Watcher class decorator */
export function withWatcher<O extends Constructor>(constructor: O) {
  return class extends constructor {
    $watch = Watcher.job;
  };
}

export default Watcher;
