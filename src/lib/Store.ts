import { clone, createLogger, createPersister, isDeepEqual } from "./utils";
import { withWatcher } from "./Observer";
import {
  StoreOptions,
  IObservable,
  Persister,
  Listeners,
  ListenCtx,
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
  private _listeners: Listeners<T> = new Map();
  private _temp_deps?: ListenCtx<T>;
  private readonly $watch?: Function;
  private readonly _getters?: G;
  private readonly _setters?: S;
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

    // reactive data
    this._data = options?.data || ({} as T); // TODO: no type cast
    if (!options?.data) {
      this.log?.("No data was provided", "warn");
    }

    // prev data
    this._prev_data = this._data;

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

    return this._getters?.[getter](this.data, payload);
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
   * Update reducer
   *
   * @param {ListenCtx} deps props selectors
   * @returns {this} store
   */
  rewatch(deps: ListenCtx<T>): this {
    this._temp_deps = deps;

    return this;
  }

  /**
   * Store subscription
   *
   * @param {IObservable} listener listener
   * @returns {Function} unsubscribe function
   */
  subscribe(listener: IObservable): [T, Function] {
    // add listener
    this._listeners.set(listener, this._temp_deps);
    this._temp_deps = undefined;

    // run watcher
    if (!this._data[PROXY]) {
      this._data = this.$watch?.(this._data, this)[0];
    }

    return [this.data, () => this._listeners.delete(listener)];
  }

  /**
   * Dispatch subscriptions update
   */
  dispatch() {
    // dispatch listeners
    for (let [listener, deps] of this._listeners) {
      if (!deps || !isDeepEqual(this._data[ORIG], this._prev_data, deps)) {
        listener.dispatch();
      }
    }

    // log
    this.log?.([this._prev_data, this._data[ORIG]]);

    // persist
    this.persist?.(this._data[ORIG]);

    // update previous data
    this._prev_data = clone(this._data);
  }
}

export default Store;
