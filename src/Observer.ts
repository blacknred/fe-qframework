import { ORIG, PROXY, Mapped, Constructor, IObservable } from "./types";

/** Reactive dispatcher class */
class Observer<T extends Mapped<any>> implements ProxyHandler<T> {
  /**
   * Reactive dispatcher class
   * @param {IObservable} _observable target for dispatching
   */
  constructor(public _observable: IObservable) {}

  static watch<T extends Mapped<any>>(data: T, target: IObservable) {
    const { proxy, revoke } = Proxy.revocable(data, new Observer<T>(target));
    return [proxy, revoke];
  }

  get(props: T, prop: keyof T): any {
    if (prop === ORIG) return props;
    if (prop === PROXY) return true;

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

/** Observer class decorator */
export function withWatcher<O extends Constructor>(constructor: O) {
  return class extends constructor {
    $watch = Observer.watch;
  };
}

export default Observer;
