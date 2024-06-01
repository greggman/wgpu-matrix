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
 * Quat4 math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new `Quat4`. In other words you can do this
 *
 *     const v = quat4.cross(v1, v2);  // Creates a new Quat4 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = quat4.create();
 *     quat4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     quat4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
export let QuatType = Float32Array;
/**
 * Sets the type this library creates for a Quat4
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Quat4
 */
export function setDefaultType(ctor) {
    const oldType = QuatType;
    QuatType = ctor;
    return oldType;
}
/**
 * Creates a quat4; may be called with x, y, z to set initial values.
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param w - Initial w value.
 * @returns the created vector
 */
export function create(x, y, z, w) {
    const dst = new QuatType(4);
    if (x !== undefined) {
        dst[0] = x;
        if (y !== undefined) {
            dst[1] = y;
            if (z !== undefined) {
                dst[2] = z;
                if (w !== undefined) {
                    dst[3] = w;
                }
            }
        }
    }
    return dst;
}
