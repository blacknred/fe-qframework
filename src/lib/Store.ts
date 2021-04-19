import { Logger, IObservable, StoreOptions, Props, Persister } from "./types";
import { clone, createLogger, createPersister } from "./helpers";
import Watcher, { ORIG, withWatcher } from "./Watcher";

/**
 * Q Store class
 * @param {T} data data
 * @param {StoreOptions} options store options
 */

@withWatcher
class Store<T> implements IObservable {
  private _data: T;
  private _prev_data: T;
  private _listeners: IObservable[] = [];
  private readonly _name: string;
  private readonly $watch?: Function;
  private persister?: Persister<T>;
  private log?: Logger;

  constructor(data: T, options: StoreOptions) {
    // meta options
    this._name = options?.name || "QStore";
    // reactive state
    this._data = data;
    this._prev_data = data;
    // logger
    if (options?.debug) {
      this.log = createLogger(this._name);
    }
    // persister
    if (options?.persister) {
      this.persister = createPersister<T>(this._name, this.log);
      this._data = this.persister(this._data, true);
    }
  }

  /**
   * Data getter
   */
  get data(): T {
    return this._data;
  }

  /**
   * Store subscription
   *
   * @param {IObservable} listener listener
   * @returns {Function} unsubscribe function
   */
  subscribe(listener: IObservable): Function {
    // add listener
    this._listeners.push(listener);

    // run watcher
    if (!(this._data instanceof Watcher)) {
      this._data = this.$watch?.(this._data, this);
    }

    // pass data to listener
    if ("_state" in listener) {
      (listener["_state"] as Props) = this._data;
    }

    // return unsubscribe function
    return () => {
      this._listeners = this._listeners.filter((o) => o !== listener);
    };
  }

  /** Dispatcher */
  dispatch() {
    // dispatch listeners
    this._listeners.forEach((vm) => vm.dispatch());

    // log
    this.log?.([this._prev_data, (this._data as Props)[ORIG]]);

    // persist
    this.persister?.((this._data as Props)[ORIG]);

    // update previous data
    this._prev_data = clone(this._data);
  }
}

export default Store;
