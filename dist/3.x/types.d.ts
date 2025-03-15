/**
 * A type wider than `number[]`, omitting any instance functions
 * unused by the API, e.g., map, sort. This allows the math
 * functions to operate on a wider range of array-like
 * values.
 */
export interface MutableNumberArray {
    readonly length: number;
    [n: number]: number;
}
/**
 * The types you can pass to most functions that take an
 * array of numbers.
 */
export type BaseArgType = Float32Array | Float64Array | MutableNumberArray;
export declare const ZeroArray: {
    (arrayLength: number): number[];
    (...items: number[]): number[];
    new (arrayLength: number): number[];
    new (...items: number[]): number[];
    isArray(arg: any): arg is any[];
    readonly prototype: any[];
    from<T>(arrayLike: ArrayLike<T>): T[];
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
    from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
    from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
    of<T>(...items: T[]): T[];
    fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
    fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>) => U, thisArg?: any): Promise<Awaited<U>[]>;
    readonly [Symbol.species]: ArrayConstructor;
};
