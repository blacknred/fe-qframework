import { createLogger } from "./helpers";
import { Logger, Observable, StoreOptions } from "./types";
import { withWatcher } from "./Watcher";

/**
 * Q Store
 * @param {T} data data
 * @param {StoreOptions} options store options
 */

@withWatcher
class Store<T> {
  _data: T;
  private _prev_data: T;
  private _listeners: Observable[] = [];
  private readonly $watch?: Function;
  private log?: Logger;

  constructor(data: T, options: StoreOptions) {
    // reactive state
    this._data = data;
    this._prev_data = this._data;
    // logger
    if (options?.debug) {
      this.log = createLogger("Store");
    }
    // persister
  }

  /**
   * Component subscription
   *
   * @param {Observable} listener dispatchable component
   * @returns {Function} unsubscribe function
   */
  public subscribe(listener: Observable): Function {
    this._listeners.push(listener);
    this._data = this.$watch?.(this._data, this);

    return () => {
      this._listeners = this._listeners.filter((q) => q !== listener);
    };
  }

  /** Dispatch components renders */
  private dispatch() {
    this.log?.([this._prev_data, this._data]);
    this._listeners.forEach((vm) => vm.dispatch());
    this._prev_data = this._data;
  }
}

export default Store;
