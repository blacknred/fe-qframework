import { clone, createLogger, createPersister } from "./helpers";
import { withWatcher } from "./Watcher";
import {
  ProxyDispatcher,
  IObservable,
  StoreOptions,
  Persister,
  IQStore,
  Setters,
  Getters,
  Logger,
  Mapped,
  ORIG
} from "./types";

/**
 * Q Store class
 * @param {StoreOptions} options store options
 */

@withWatcher
class Store<T, G extends Getters<T>= {}, S extends Setters<T>= {}> implements IQStore<T, G, S> {
  private _data: T;
  private _prev_data: T;
  private readonly _name: string;
  private _listeners: IObservable[] = [];
  private readonly _setters?: S;
  private readonly _getters?: G;
  private readonly $watch?: Function;
  private persister?: Persister<T>;
  private log?: Logger;

  constructor(options: StoreOptions<T>) {
    // meta options
    this._name = options?.name || "QStore";
    // logger
    if (options?.debug) {
      this.log = createLogger(this._name);
    }
    // reactive state
    this._data = options?.data || ({} as T);
    this._prev_data = this._data;
    if (!options?.data) {
      this.log?.("No data was provided", "warn");
    }
    // getters
    this._getters = options?.getters;
    // setters
    this._setters = options?.setters;
    // persister
    if (options?.persist) {
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
   * Getter
   *
   * @param {string} getter getter name
   * @param {any} payload payload
   * @returns {T[any] | undefined}
   */
  get(getter: keyof G, payload?: any): T[any] | undefined {
    return this._getters?.[getter](this._data, payload);
  }

  /**
   * Setter
   *
   * @param {string} setter setter name
   * @param {any} payload payload
   */
  set(setter: keyof S, payload: any) {
    this._setters?.[setter](this._data, payload);
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
    if (!(this._data instanceof ProxyDispatcher)) {
      this._data = this.$watch?.(this._data, this);
    }

    // pass data to listener, prevent data mutability with setters usage
    if ("_state" in listener) {
      (listener["_state"] as T) = !!this._setters ? this._prev_data : this.data;
    }

    // return unsubscribe function
    return () => {
      this._listeners = this._listeners.filter((o) => o !== listener);
    };
  }

  /**
   * Dispatch subscriptions update
   */
  dispatch() {
    // dispatch listeners
    this._listeners.forEach((vm) => vm.dispatch());

    // log
    this.log?.([this._prev_data, (this._data as Mapped<any>)[ORIG]]);

    // persist
    this.persister?.((this._data as Mapped<any>)[ORIG]);

    // update previous data
    this._prev_data = clone(this._data);
  }
}

export default Store;
