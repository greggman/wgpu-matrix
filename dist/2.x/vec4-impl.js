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
import * as utils from './utils.js';
import { create, setDefaultType, VecType } from './vec4';
export { create, setDefaultType };
/**
 * Creates a vec4; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param z - Initial w value.
 * @returns the created vector
 */
export const fromValues = create;
/**
 * Sets the values of a Vec4
 * Also see {@link vec4.create} and {@link vec4.copy}
 *
 * @param x first value
 * @param y second value
 * @param z third value
 * @param w fourth value
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector with its elements set.
 */
export function set(x, y, z, w, dst) {
    dst = dst || new VecType(4);
    dst[0] = x;
    dst[1] = y;
    dst[2] = z;
    dst[3] = w;
    return dst;
}
/**
 * Applies Math.ceil to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the ceil of each element of v.
 */
export function ceil(v, dst) {
    dst = dst || new VecType(4);
    dst[0] = Math.ceil(v[0]);
    dst[1] = Math.ceil(v[1]);
    dst[2] = Math.ceil(v[2]);
    dst[3] = Math.ceil(v[3]);
    return dst;
}
/**
 * Applies Math.floor to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the floor of each element of v.
 */
export function floor(v, dst) {
    dst = dst || new VecType(4);
    dst[0] = Math.floor(v[0]);
    dst[1] = Math.floor(v[1]);
    dst[2] = Math.floor(v[2]);
    dst[3] = Math.floor(v[3]);
    return dst;
}
/**
 * Applies Math.round to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the round of each element of v.
 */
export function round(v, dst) {
    dst = dst || new VecType(4);
    dst[0] = Math.round(v[0]);
    dst[1] = Math.round(v[1]);
    dst[2] = Math.round(v[2]);
    dst[3] = Math.round(v[3]);
    return dst;
}
/**
 * Clamp each element of vector between min and max
 * @param v - Operand vector.
 * @param max - Min value, default 0
 * @param min - Max value, default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that the clamped value of each element of v.
 */
export function clamp(v, min = 0, max = 1, dst) {
    dst = dst || new VecType(4);
    dst[0] = Math.min(max, Math.max(min, v[0]));
    dst[1] = Math.min(max, Math.max(min, v[1]));
    dst[2] = Math.min(max, Math.max(min, v[2]));
    dst[3] = Math.min(max, Math.max(min, v[3]));
    return dst;
}
/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a and b.
 */
export function add(a, b, dst) {
    dst = dst || new VecType(4);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
    dst[3] = a[3] + b[3];
    return dst;
}
/**
 * Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param scale - Amount to scale b
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a + b * scale.
 */
export function addScaled(a, b, scale, dst) {
    dst = dst || new VecType(4);
    dst[0] = a[0] + b[0] * scale;
    dst[1] = a[1] + b[1] * scale;
    dst[2] = a[2] + b[2] * scale;
    dst[3] = a[3] + b[3] * scale;
    return dst;
}
/**
 * Subtracts two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the difference of a and b.
 */
export function subtract(a, b, dst) {
    dst = dst || new VecType(4);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    dst[3] = a[3] - b[3];
    return dst;
}
/**
 * Subtracts two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the difference of a and b.
 */
export const sub = subtract;
/**
 * Check if 2 vectors are approximately equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are approximately equal
 */
export function equalsApproximately(a, b) {
    return Math.abs(a[0] - b[0]) < utils.EPSILON &&
        Math.abs(a[1] - b[1]) < utils.EPSILON &&
        Math.abs(a[2] - b[2]) < utils.EPSILON &&
        Math.abs(a[3] - b[3]) < utils.EPSILON;
}
/**
 * Check if 2 vectors are exactly equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are exactly equal
 */
export function equals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param t - Interpolation coefficient.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The linear interpolated result.
 */
export function lerp(a, b, t, dst) {
    dst = dst || new VecType(4);
    dst[0] = a[0] + t * (b[0] - a[0]);
    dst[1] = a[1] + t * (b[1] - a[1]);
    dst[2] = a[2] + t * (b[2] - a[2]);
    dst[3] = a[3] + t * (b[3] - a[3]);
    return dst;
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient vector t, returns
 * a + t * (b - a).
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param t - Interpolation coefficients vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns the linear interpolated result.
 */
export function lerpV(a, b, t, dst) {
    dst = dst || new VecType(4);
    dst[0] = a[0] + t[0] * (b[0] - a[0]);
    dst[1] = a[1] + t[1] * (b[1] - a[1]);
    dst[2] = a[2] + t[2] * (b[2] - a[2]);
    dst[3] = a[3] + t[3] * (b[3] - a[3]);
    return dst;
}
/**
 * Return max values of two vectors.
 * Given vectors a and b returns
 * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The max components vector.
 */
export function max(a, b, dst) {
    dst = dst || new VecType(4);
    dst[0] = Math.max(a[0], b[0]);
    dst[1] = Math.max(a[1], b[1]);
    dst[2] = Math.max(a[2], b[2]);
    dst[3] = Math.max(a[3], b[3]);
    return dst;
}
/**
 * Return min values of two vectors.
 * Given vectors a and b returns
 * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The min components vector.
 */
export function min(a, b, dst) {
    dst = dst || new VecType(4);
    dst[0] = Math.min(a[0], b[0]);
    dst[1] = Math.min(a[1], b[1]);
    dst[2] = Math.min(a[2], b[2]);
    dst[3] = Math.min(a[3], b[3]);
    return dst;
}
/**
 * Multiplies a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
export function mulScalar(v, k, dst) {
    dst = dst || new VecType(4);
    dst[0] = v[0] * k;
    dst[1] = v[1] * k;
    dst[2] = v[2] * k;
    dst[3] = v[3] * k;
    return dst;
}
/**
 * Multiplies a vector by a scalar. (same as mulScalar)
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
export const scale = mulScalar;
/**
 * Divides a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
export function divScalar(v, k, dst) {
    dst = dst || new VecType(4);
    dst[0] = v[0] / k;
    dst[1] = v[1] / k;
    dst[2] = v[2] / k;
    dst[3] = v[3] / k;
    return dst;
}
/**
 * Inverse a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
export function inverse(v, dst) {
    dst = dst || new VecType(4);
    dst[0] = 1 / v[0];
    dst[1] = 1 / v[1];
    dst[2] = 1 / v[2];
    dst[3] = 1 / v[3];
    return dst;
}
/**
 * Invert a vector. (same as inverse)
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
export const invert = inverse;
/**
 * Computes the dot product of two vectors
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns dot product
 */
export function dot(a, b) {
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]);
}
/**
 * Computes the length of vector
 * @param v - vector.
 * @returns length of vector.
 */
export function length(v) {
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const v3 = v[3];
    return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
}
/**
 * Computes the length of vector (same as length)
 * @param v - vector.
 * @returns length of vector.
 */
export const len = length;
/**
 * Computes the square of the length of vector
 * @param v - vector.
 * @returns square of the length of vector.
 */
export function lengthSq(v) {
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const v3 = v[3];
    return v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3;
}
/**
 * Computes the square of the length of vector (same as lengthSq)
 * @param v - vector.
 * @returns square of the length of vector.
 */
export const lenSq = lengthSq;
/**
 * Computes the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns distance between a and b
 */
export function distance(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    const dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
}
/**
 * Computes the distance between 2 points (same as distance)
 * @param a - vector.
 * @param b - vector.
 * @returns distance between a and b
 */
export const dist = distance;
/**
 * Computes the square of the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns square of the distance between a and b
 */
export function distanceSq(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    const dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
}
/**
 * Computes the square of the distance between 2 points (same as distanceSq)
 * @param a - vector.
 * @param b - vector.
 * @returns square of the distance between a and b
 */
export const distSq = distanceSq;
/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The normalized vector.
 */
export function normalize(v, dst) {
    dst = dst || new VecType(4);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const v3 = v[3];
    const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
    if (len > 0.00001) {
        dst[0] = v0 / len;
        dst[1] = v1 / len;
        dst[2] = v2 / len;
        dst[3] = v3 / len;
    }
    else {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
    }
    return dst;
}
/**
 * Negates a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns -v.
 */
export function negate(v, dst) {
    dst = dst || new VecType(4);
    dst[0] = -v[0];
    dst[1] = -v[1];
    dst[2] = -v[2];
    dst[3] = -v[3];
    return dst;
}
/**
 * Copies a vector. (same as {@link vec4.clone})
 * Also see {@link vec4.create} and {@link vec4.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
export function copy(v, dst) {
    dst = dst || new VecType(4);
    dst[0] = v[0];
    dst[1] = v[1];
    dst[2] = v[2];
    dst[3] = v[3];
    return dst;
}
/**
 * Clones a vector. (same as {@link vec4.copy})
 * Also see {@link vec4.create} and {@link vec4.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
export const clone = copy;
/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of products of entries of a and b.
 */
export function multiply(a, b, dst) {
    dst = dst || new VecType(4);
    dst[0] = a[0] * b[0];
    dst[1] = a[1] * b[1];
    dst[2] = a[2] * b[2];
    dst[3] = a[3] * b[3];
    return dst;
}
/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length. (same as mul)
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of products of entries of a and b.
 */
export const mul = multiply;
/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of quotients of entries of a and b.
 */
export function divide(a, b, dst) {
    dst = dst || new VecType(4);
    dst[0] = a[0] / b[0];
    dst[1] = a[1] / b[1];
    dst[2] = a[2] / b[2];
    dst[3] = a[3] / b[3];
    return dst;
}
/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length. (same as divide)
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of quotients of entries of a and b.
 */
export const div = divide;
/**
 * Zero's a vector
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The zeroed vector.
 */
export function zero(dst) {
    dst = dst || new VecType(4);
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    return dst;
}
/**
 * transform vec4 by 4x4 matrix
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional vec4 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
export function transformMat4(v, m, dst) {
    dst = dst || new VecType(4);
    const x = v[0];
    const y = v[1];
    const z = v[2];
    const w = v[3];
    dst[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    dst[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    dst[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    dst[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return dst;
}
/**
 * Treat a 4D vector as a direction and set it's length
 *
 * @param a The vec4 to lengthen
 * @param len The length of the resulting vector
 * @returns The lengthened vector
 */
export function setLength(a, len, dst) {
    dst = dst || new VecType(4);
    normalize(a, dst);
    return mulScalar(dst, len, dst);
}
/**
 * Ensure a vector is not longer than a max length
 *
 * @param a The vec4 to limit
 * @param maxLen The longest length of the resulting vector
 * @returns The vector, shortened to maxLen if it's too long
 */
export function truncate(a, maxLen, dst) {
    dst = dst || new VecType(4);
    if (length(a) > maxLen) {
        return setLength(a, maxLen, dst);
    }
    return copy(a, dst);
}
/**
 * Return the vector exactly between 2 endpoint vectors
 *
 * @param a Endpoint 1
 * @param b Endpoint 2
 * @returns The vector exactly residing between endpoints 1 and 2
 */
export function midpoint(a, b, dst) {
    dst = dst || new VecType(4);
    return lerp(a, b, 0.5, dst);
}
