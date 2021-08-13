import { StoreOptions, IObservable, ListenCtx, QStore, Setter, Getter, Mapped } from "./types";
/** Q Store class */
declare class Store<T extends Mapped<any> = Mapped<any>, G extends Mapped<Getter<T>> = Mapped<Getter<T>>, S extends Mapped<Setter<T>> = Mapped<Setter<T>>> extends QStore<T, G, S> {
    private _data;
    private _prev_data;
    private readonly _name;
    private readonly _immutable?;
    private _listeners;
    private _temp_deps?;
    private readonly $watch?;
    private readonly _getters?;
    private readonly _setters?;
    private persist?;
    private log?;
    /**
     * Q Store class
     * @param {StoreOptions} options store options
     */
    constructor(options: StoreOptions<T, G, S>);
    /**
     * Data getter
     */
    get data(): T;
    /**
     * Getter
     *
     * @param {string} getter getter name
     * @param {any} payload payload
     * @returns {T[any] | undefined}
     */
    get(getter: keyof G, payload?: any): T[any] | undefined;
    /**
     * Setter
     *
     * @param {string} setter setter name
     * @param {any} payload payload
     */
    set(setter: keyof S, payload: any): void;
    /**
     * Update reducer
     *
     * @param {ListenCtx} deps props selectors
     * @returns {this} store
     */
    rewatch(deps: ListenCtx<T>): this;
    /**
     * Store subscription
     *
     * @param {IObservable} listener listener
     * @returns {Function} unsubscribe function
     */
    subscribe(listener: IObservable): [T, Function];
    /**
     * Dispatch subscriptions update
     */
    dispatch(): void;
}
export default Store;
//# sourceMappingURL=Store.d.ts.map