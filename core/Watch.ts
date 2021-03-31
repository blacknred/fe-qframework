type Constructor = new (...args: any[]) => {};

class Watch<K extends { render: () => void }> {
  constructor(public _this: K) {}

  static job<T extends {}, K extends { render: () => void }>(
    data: T,
    target: K
  ) {
    return new Proxy(data, new Watch(target));
  }

  get(obj: Record<string, any>, prop: string): any {
    if (
      ["[object Object]", "[object Array]"].indexOf(
        Object.prototype.toString.call(obj[prop])
      ) > -1
    ) {
      return new Proxy(obj[prop], this);
    }
    return obj[prop];
  }

  set(obj: Record<string, any>, prop: string, value: any) {
    if (obj[prop] === value) return true;
    obj[prop] = value;
    this._this.render();
    return true;
  }

  deleteProperty(obj: Record<string, any>, prop: string) {
    delete obj[prop];
    this._this.render();
    return true;
  }
}

export function withWatch<T extends Constructor>(constructor: T) {
  return class extends constructor {
    $watch = Watch.job;
  };
}

export default Watch;
