/**
 * Array types for vectors and matrices
 */
export type ArrayLike = number[] | Float32Array | Float64Array;
/**
 * Constructor function for array types for vectors and matrices
 */
export type ArrayLikeCtor = new (n: number) => ArrayLike;
