/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
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
export let VecType = Float32Array;
/**
 * Sets the type this library creates for a Vec2
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Vec2
 */
export function setDefaultType(ctor) {
    const oldType = VecType;
    VecType = ctor;
    return oldType;
}
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
export function create(x = 0, y = 0) {
    const dst = new VecType(2);
    if (x !== undefined) {
        dst[0] = x;
        if (y !== undefined) {
            dst[1] = y;
        }
    }
    return dst;
}
