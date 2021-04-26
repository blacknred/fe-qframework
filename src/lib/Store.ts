import { clone, createLogger, createPersister } from "./utils";
import { withWatcher } from "./Observer";
import {
  StoreOptions,
  IObservable,
  Persister,
  QStore,
  Setter,
  Getter,
  Logger,
  Mapped,
  PROXY,
  ORIG
} from "./types";

/** Q Store class */
@withWatcher
class Store<
  T extends Mapped<any> = Mapped<any>,
  G extends Mapped<Getter<T>> = Mapped<Getter<T>>,
  S extends Mapped<Setter<T>> = Mapped<Setter<T>>
> extends QStore<T, G, S> {
  private _data: T;
  private _prev_data: T;
  private readonly _name: string;
  private readonly _immutable?: boolean;
  private _listeners: IObservable[] = [];
  private readonly _getters?: G;
  private readonly _setters?: S;
  private readonly $watch?: Function;
  private persist?: Persister<T>;
  private log?: Logger;

  /**
   * Q Store class
   * @param {StoreOptions} options store options
   */
  constructor(options: StoreOptions<T, G, S>) {
    super();
    // meta options
    this._name = options?.name || "QStore";
    this._immutable = options?.immutable;
    // logger
    if (options?.debug) {
      this.log = createLogger(this._name);
    }
    // reactive state
    this._data = (options?.data || {}) as T; // TODO: no type cast
    this._prev_data = this._data;
    if (!options?.data) {
      this.log?.("No data was provided", "warn");
    }
    // getters
    this._getters = options?.getters;
    // setters
    this._setters = options?.setters;
    // persister
    if (!!options?.persist) {
      this.persist = createPersister<T>(options.persist, this._name, this.log);
      // load cached data
      this._data = this.persist(this._data, true);
    }
  }

  /**
   * Data getter
   */
  get data(): T {
    // prevent direct data change
    return this._immutable ? clone(this._data) : this._data;
  }

  /**
   * Getter
   *
   * @param {string} getter getter name
   * @param {any} payload payload
   * @returns {T[any] | undefined}
   */
  get(getter: keyof G, payload?: any): T[any] | undefined {
    if (!this._getters?.[getter]) {
      this.log?.(`unknown getter ${getter}`, "warn");
    }
    return this._getters?.[getter](this._data, payload);
  }

  /**
   * Setter
   *
   * @param {string} setter setter name
   * @param {any} payload payload
   */
  set(setter: keyof S, payload: any) {
    if (!this._setters?.[setter]) {
      this.log?.(`unknown setter ${setter}`, "warn");
    }
    this._setters?.[setter](this._data, payload);
  }

  /**
   * Store subscription
   *
   * @param {IObservable} listener listener
   * @returns {Function} unsubscribe function
   */
  subscribe(listener: IObservable): [T, Function] {
    // add listener
    this._listeners.push(listener);

    // run watcher
    if (!this._data[PROXY]) {
      this._data = this.$watch?.(this._data, this)[0];
    }

    // // pass data to listener
    // if ("_state" in listener) {
    //   (listener["_state"] as T) = this.data;
    // }

    return [
      this._data,
      () => {
        this._listeners = this._listeners.filter((o) => o !== listener);
      }
    ];
  }

  /**
   * Dispatch subscriptions update
   */
  dispatch() {
    // dispatch listeners
    this._listeners.forEach((vm) => vm.dispatch());

    // log
    this.log?.([this._prev_data, this._data[ORIG]]);

    // persist
    this.persist?.(this._data[ORIG]);

    // update previous data
    this._prev_data = clone(this._data);
  }
}

export default Store;
