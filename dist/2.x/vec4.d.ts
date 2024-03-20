/**
 * A JavaScript array with 4 values, Float32Array with 4 values, or a Float64Array with 4 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link vec4.setDefaultType}.
 */
export type Vec4 = number[] | Float32Array | Float64Array;
/**
 *
 * Vec4 math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new `Vec4`. In other words you can do this
 *
 *     const v = vec4.cross(v1, v2);  // Creates a new Vec4 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = vec4.create();
 *     vec4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     vec4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
export declare let VecType: new (n: number) => Vec4;
/**
 * Sets the type this library creates for a Vec4
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Vec4
 */
export declare function setDefaultType(ctor: new (n: number) => Vec4): new (n: number) => Vec4;
/**
 * Creates a vec4; may be called with x, y, z to set initial values.
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param w - Initial w value.
 * @returns the created vector
 */
export declare function create(x?: number, y?: number, z?: number, w?: number): Vec4;
