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
export let VecType = Float32Array;
/**
 * Sets the type this library creates for a Vec3
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Vec3
 */
export function setDefaultType(ctor) {
    const oldType = VecType;
    VecType = ctor;
    return oldType;
}
/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @returns the created vector
 */
export function create(x, y, z) {
    const dst = new VecType(3);
    if (x !== undefined) {
        dst[0] = x;
        if (y !== undefined) {
            dst[1] = y;
            if (z !== undefined) {
                dst[2] = z;
            }
        }
    }
    return dst;
}
