import { Constructor, Props, IObservable } from "./types";

export const ORIG = (Symbol.for("ORIGINAL") as unknown) as string;

/**
 * Reactive dispatcher class
 * @param {O} _observable target for dispatching
 */

class Watcher<O extends IObservable> {
  constructor(public _observable: O) {}

  static job<T, O extends IObservable>(data: T, target: O) {
    return new Proxy(data, new Watcher(target));
  }

  get(target: Props, prop: string): any {
    if (prop === ORIG) return target;

    if (target[prop]?.constructor === Object || Array.isArray(target[prop])) {
      return new Proxy(target[prop], this);
    }

    return Reflect.get(target, prop);
  }

  set(target: Props, prop: string, value: any) {
    if (target[prop] === value) return true;
    target[prop] = value;
    this._observable.dispatch();
    return true;
  }

  deleteProperty(target: Props, prop: string) {
    delete target[prop];
    this._observable.dispatch();
    return true;
  }
}

/** Watcher class decorator */
export function withWatcher<T extends Constructor>(constructor: T) {
  return class extends constructor {
    $watch = Watcher.job;
  };
}

export default Watcher;
