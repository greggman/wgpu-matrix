/**
 * A JavaScript array with 3 values, Float32Array with 3 values, or a Float64Array with 3 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link vec3.setDefaultType}.
 */
export declare type Vec3 = number[] | Float32Array | Float64Array;
/**
 *
 * Vec3 math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new `Vec3`. In other words you can do this
 *
 *     const v = vec3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = vec3.create();
 *     vec3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     vec3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
export declare let VecType: new (n: number) => Vec3;
/**
 * Sets the type this library creates for a Vec3
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Vec3
 */
export declare function setDefaultType(ctor: new (n: number) => Vec3): new (n: number) => Vec3;
/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @returns the created vector
 */
export declare function create(x?: number, y?: number, z?: number): Vec3;
