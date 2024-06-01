/**
 * The types you can pass to most functions that take an
 * array of numbers.
 */
export type BaseArgType = Float32Array | Float64Array | number[];
export declare const ZeroArray: {
    (arrayLength: number): number[];
    (...items: number[]): number[];
    new (arrayLength: number): number[];
    new (...items: number[]): number[];
    isArray(arg: any): arg is any[];
    readonly prototype: any[];
    from<T>(arrayLike: ArrayLike<T>): T[];
    from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
    from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
    from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
    of<T_4>(...items: T_4[]): T_4[];
    readonly [Symbol.species]: ArrayConstructor;
};
