import { ComponentOptions, BindedMethod, IQComponent, Logger, Mapped } from "./types";
/**  Q Component class  */
declare class Component<T extends Mapped<any> = Mapped<any>> implements IQComponent<T> {
    private $el?;
    private readonly $dom?;
    private readonly $watch?;
    log?: Logger;
    private _state?;
    private _prev_state?;
    readonly data: Mapped<any>;
    readonly methods: Mapped<BindedMethod<T>>;
    private readonly _template;
    private readonly _children?;
    private readonly _mounted?;
    private readonly _unmounted?;
    private readonly _before?;
    private readonly _after?;
    private readonly _name;
    private _store_subscription?;
    private _debounce?;
    /**
     * Q Component class
     * @param {ComponentOptions} options options
     */
    constructor(options: ComponentOptions<T>);
    /**
     * Bind global helper
     */
    static use(name: string, fn: Function): void;
    /**
     * State getter
     */
    get state(): T;
    /**
     * Check readiness to mount
     */
    private isReady;
    /**
     * Mount an instance
     *
     * @param {String|Element} el root DOM Node
     * @returns {Q} instance
     */
    mount(el?: string | Element): this;
    /**
     * Unmount an instance
     */
    unmount(): Promise<void>;
    /**
     * Render dispatcher
     */
    dispatch(initial?: boolean): void;
    /**
     * Render
     */
    private render;
}
export default Component;
//# sourceMappingURL=Component.d.ts.map