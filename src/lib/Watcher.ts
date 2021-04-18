import { Constructor, Props, Observable } from "./types";

/**
 * Reactive dispatcher
 * @param {O} _observable target for dispatching
 */

class Watcher<O extends Observable> {
  constructor(public _observable: O) {}

  static job<T, O extends Observable>(data: T, target: O) {
    return new Proxy(data, new Watcher(target));
  }

  get(props: Props, name: string): any {
    if (props[name]?.constructor === Object || Array.isArray(props[name])) {
      return new Proxy(props[name], this);
    }

    return props[name];
  }

  set(props: Props, name: string, value: any) {
    if (props[name] === value) return true;
    props[name] = value;
    this._observable.dispatch();
    return true;
  }

  deleteProperty(props: Props, name: string) {
    delete props[name];
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
