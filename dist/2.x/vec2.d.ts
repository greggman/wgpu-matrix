/**
 * A JavaScript array with 2 values, Float32Array with 2 values, or a Float64Array with 2 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link vec2.setDefaultType}.
 */
export declare type Vec2 = number[] | Float32Array | Float64Array;
/**
 *
 * Vec2 math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new Vec2. In other words you can do this
 *
 *     const v = vec2.cross(v1, v2);  // Creates a new Vec2 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = vec2.create();
 *     vec2.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     vec2.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
export declare let VecType: new (n: number) => Vec2;
/**
 * Sets the type this library creates for a Vec2
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Vec2
 */
export declare function setDefaultType(ctor: new (n: number) => Vec2): new (n: number) => Vec2;
/**
 * Creates a Vec2; may be called with x, y, z to set initial values.
 *
 * Note: Since passing in a raw JavaScript array
 * is valid in all circumstances, if you want to
 * force a JavaScript array into a Vec2's specified type
 * it would be faster to use
 *
 * ```
 * const v = vec2.clone(someJSArray);
 * ```
 *
 * Note: a consequence of the implementation is if your Vec2Type = `Array`
 * instead of `Float32Array` or `Float64Array` then any values you
 * don't pass in will be undefined. Usually this is not an issue since
 * (a) using `Array` is rare and (b) using `vec2.create` is usually used
 * to create a Vec2 to be filled out as in
 *
 * ```
 * const sum = vec2.create();
 * vec2.add(v1, v2, sum);
 * ```
 *
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @returns the created vector
 */
export declare function create(x?: number, y?: number): Vec2;
