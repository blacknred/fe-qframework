import { Constructor, Props, Observable } from "./types";

class Watcher<O extends Observable> {
  constructor(public observable: O) {}

  static job<T, O extends Observable>(data: T, target: O) {
    return new Proxy(data, new Watcher(target));
  }

  get(props: Props, name: string): any {
    if (
      ["[object Object]", "[object Array]"].indexOf(
        Object.prototype.toString.call(props[name])
      ) > -1
    ) {
      return new Proxy(props[name], this);
    }

    return props[name];
  }

  set(props: Props, name: string, value: any) {
    if (props[name] === value) return true;
    props[name] = value;
    this.observable.render();
    return true;
  }

  deleteProperty(props: Props, name: string) {
    delete props[name];
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
