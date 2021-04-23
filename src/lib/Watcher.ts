import {
  ORIG,
  Mapped,
  Constructor,
  IObservable,
  ProxyDispatcher
} from "./types";

/**
 * Reactive dispatcher class
 * @param {IObservable} _observable target for dispatching
 */
class Watcher<T extends Mapped<any>> extends ProxyDispatcher<T> {
  static job<T extends Mapped<any>>(data: T, target: IObservable) {
    const { proxy, revoke } = Proxy.revocable(data, new Watcher<T>(target));
    return [proxy, revoke];
  }

  get(props: T, prop: keyof T): any {
    if (prop === ORIG) return props;

    if (props[prop]?.constructor === Object || Array.isArray(props[prop])) {
      return new Proxy(props[prop], this);
    }

    return Reflect.get(props, prop);
  }

  set(props: T, prop: keyof T, value: any) {
    if (props[prop] === value) return true;
    (props[prop] as object) = value;
    this._observable.dispatch();
    return true;
  }

  deleteProperty(props: T, prop: keyof T) {
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
