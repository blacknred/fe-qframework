import { Constructor, State, Observable } from "./types";

class Watcher<O extends Observable> {
  constructor(public observable: O) {}

  static job<T, O extends Observable>(data: T, target: O) {
    return new Proxy(data, new Watcher(target));
  }

  get(obj: State, prop: string): any {
    if (
      ["[object Object]", "[object Array]"].indexOf(
        Object.prototype.toString.call(obj[prop])
      ) > -1
    ) {
      return new Proxy(obj[prop], this);
    }

    return obj[prop];
  }

  set(obj: State, prop: string, value: any) {
    if (obj[prop] === value) return true;
    obj[prop] = value;
    this.observable.render();
    return true;
  }

  deleteProperty(obj: State, prop: string) {
    delete obj[prop];
    this.observable.render();
    return true;
  }
}

export function withWatcher<T extends Constructor>(constructor: T) {
  return class extends constructor {
    $watch = Watcher.job;
  };
}

export default Watcher;
