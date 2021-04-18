import { createLogger } from "./helpers";
import { Logger, Observable, Props } from "./types";
import { withWatcher } from "./Watcher";

// type StoreOptions<T> = {
//   data?: T;
//   debug?: boolean;
// };

/**
 * Q Store
 * @param {O} _observable target for dispatching
 */

@withWatcher
class Store<T> {
  private _data: T;
  private _prev_data: T;
  private _listeners: Observable[] = [];
  private readonly $watch?: Function;
  private log?: Logger;

  constructor(options: T) {
    // reactive state
    this._data = options.data || options;
    this._prev_data = this._data;
    // logger
    if (options?.debug) {
      this.log = createLogger("Store");
    }
  }

  public subscribe(listener: Observable): Function {
    this._listeners.push(listener);
    this._data = this.$watch?.(this._data, this);

    return () => {
      this._listeners = this._listeners.filter((q) => q !== listener);
    };
  }

  private dispatch() {
    // console.log("67687", this.data, this._listeners);
    this.log?.([this._prev_data, this._data]);
    this._listeners.forEach((vm) => vm.dispatch());
    this._prev_data = this._data;
  }
}

export default Store;
