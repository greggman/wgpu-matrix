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
import { create, setDefaultType, VecType } from './vec2';
import { VecType as Vec3Type } from './vec3';
export { create, setDefaultType };
/**
 * Creates a Vec2; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @returns the created vector
 */
export const fromValues = create;
/**
 * Sets the values of a Vec2
 * Also see {@link vec2.create} and {@link vec2.copy}
 *
 * @param x first value
 * @param y second value
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector with its elements set.
 */
export function set(x, y, dst) {
    dst = dst || new VecType(2);
    dst[0] = x;
    dst[1] = y;
    return dst;
}
/**
 * Applies Math.ceil to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the ceil of each element of v.
 */
export function ceil(v, dst) {
    dst = dst || new VecType(2);
    dst[0] = Math.ceil(v[0]);
    dst[1] = Math.ceil(v[1]);
    return dst;
}
/**
 * Applies Math.floor to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the floor of each element of v.
 */
export function floor(v, dst) {
    dst = dst || new VecType(2);
    dst[0] = Math.floor(v[0]);
    dst[1] = Math.floor(v[1]);
    return dst;
}
/**
 * Applies Math.round to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the round of each element of v.
 */
export function round(v, dst) {
    dst = dst || new VecType(2);
    dst[0] = Math.round(v[0]);
    dst[1] = Math.round(v[1]);
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
    dst = dst || new VecType(2);
    dst[0] = Math.min(max, Math.max(min, v[0]));
    dst[1] = Math.min(max, Math.max(min, v[1]));
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
    dst = dst || new VecType(2);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
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
    dst = dst || new VecType(2);
    dst[0] = a[0] + b[0] * scale;
    dst[1] = a[1] + b[1] * scale;
    return dst;
}
/**
 * Returns the angle in radians between two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns The angle in radians between the 2 vectors.
 */
export function angle(a, b) {
    const ax = a[0];
    const ay = a[1];
    const bx = b[0];
    const by = b[1];
    const mag1 = Math.sqrt(ax * ax + ay * ay);
    const mag2 = Math.sqrt(bx * bx + by * by);
    const mag = mag1 * mag2;
    const cosine = mag && dot(a, b) / mag;
    return Math.acos(cosine);
}
/**
 * Subtracts two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the difference of a and b.
 */
export function subtract(a, b, dst) {
    dst = dst || new VecType(2);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
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
        Math.abs(a[1] - b[1]) < utils.EPSILON;
}
/**
 * Check if 2 vectors are exactly equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are exactly equal
 */
export function equals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
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
    dst = dst || new VecType(2);
    dst[0] = a[0] + t * (b[0] - a[0]);
    dst[1] = a[1] + t * (b[1] - a[1]);
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
    dst = dst || new VecType(2);
    dst[0] = a[0] + t[0] * (b[0] - a[0]);
    dst[1] = a[1] + t[1] * (b[1] - a[1]);
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
    dst = dst || new VecType(2);
    dst[0] = Math.max(a[0], b[0]);
    dst[1] = Math.max(a[1], b[1]);
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
    dst = dst || new VecType(2);
    dst[0] = Math.min(a[0], b[0]);
    dst[1] = Math.min(a[1], b[1]);
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
    dst = dst || new VecType(2);
    dst[0] = v[0] * k;
    dst[1] = v[1] * k;
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
    dst = dst || new VecType(2);
    dst[0] = v[0] / k;
    dst[1] = v[1] / k;
    return dst;
}
/**
 * Inverse a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
export function inverse(v, dst) {
    dst = dst || new VecType(2);
    dst[0] = 1 / v[0];
    dst[1] = 1 / v[1];
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
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of a cross b.
 */
export function cross(a, b, dst) {
    dst = dst || new Vec3Type(3);
    const z = a[0] * b[1] - a[1] * b[0];
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = z;
    return dst;
}
/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns dot product
 */
export function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the length of vector
 * @param v - vector.
 * @returns length of vector.
 */
export function length(v) {
    const v0 = v[0];
    const v1 = v[1];
    return Math.sqrt(v0 * v0 + v1 * v1);
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
    return v0 * v0 + v1 * v1;
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
    return Math.sqrt(dx * dx + dy * dy);
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
    return dx * dx + dy * dy;
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
    dst = dst || new VecType(2);
    const v0 = v[0];
    const v1 = v[1];
    const len = Math.sqrt(v0 * v0 + v1 * v1);
    if (len > 0.00001) {
        dst[0] = v0 / len;
        dst[1] = v1 / len;
    }
    else {
        dst[0] = 0;
        dst[1] = 0;
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
    dst = dst || new VecType(2);
    dst[0] = -v[0];
    dst[1] = -v[1];
    return dst;
}
/**
 * Copies a vector. (same as {@link vec2.clone})
 * Also see {@link vec2.create} and {@link vec2.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
export function copy(v, dst) {
    dst = dst || new VecType(2);
    dst[0] = v[0];
    dst[1] = v[1];
    return dst;
}
/**
 * Clones a vector. (same as {@link vec2.copy})
 * Also see {@link vec2.create} and {@link vec2.set}
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
    dst = dst || new VecType(2);
    dst[0] = a[0] * b[0];
    dst[1] = a[1] * b[1];
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
    dst = dst || new VecType(2);
    dst[0] = a[0] / b[0];
    dst[1] = a[1] / b[1];
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
 * Creates a random unit vector * scale
 * @param scale - Default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The random vector.
 */
export function random(scale = 1, dst) {
    dst = dst || new VecType(2);
    const angle = Math.random() * 2 * Math.PI;
    dst[0] = Math.cos(angle) * scale;
    dst[1] = Math.sin(angle) * scale;
    return dst;
}
/**
 * Zero's a vector
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The zeroed vector.
 */
export function zero(dst) {
    dst = dst || new VecType(2);
    dst[0] = 0;
    dst[1] = 0;
    return dst;
}
/**
 * transform Vec2 by 4x4 matrix
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional Vec2 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
export function transformMat4(v, m, dst) {
    dst = dst || new VecType(2);
    const x = v[0];
    const y = v[1];
    dst[0] = x * m[0] + y * m[4] + m[12];
    dst[1] = x * m[1] + y * m[5] + m[13];
    return dst;
}
/**
 * Transforms vec4 by 3x3 matrix
 *
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional Vec2 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
export function transformMat3(v, m, dst) {
    dst = dst || new VecType(2);
    const x = v[0];
    const y = v[1];
    dst[0] = m[0] * x + m[4] * y + m[8];
    dst[1] = m[1] * x + m[5] * y + m[9];
    return dst;
}
/**
 * Rotate a 2D vector
 *
 * @param a The vec2 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 * @returns the rotated vector
 */
export function rotate(a, b, rad, dst) {
    dst = dst || new VecType(2);
    // Translate point to the origin
    const p0 = a[0] - b[0];
    const p1 = a[1] - b[1];
    const sinC = Math.sin(rad);
    const cosC = Math.cos(rad);
    //perform rotation and translate to correct position
    dst[0] = p0 * cosC - p1 * sinC + b[0];
    dst[1] = p0 * sinC + p1 * cosC + b[1];
    return dst;
}
/**
 * Treat a 2D vector as a direction and set it's length
 *
 * @param a The vec2 to lengthen
 * @param len The length of the resulting vector
 * @returns The lengthened vector
 */
export function setLength(a, len, dst) {
    dst = dst || new VecType(2);
    normalize(a, dst);
    return mulScalar(dst, len, dst);
}
/**
 * Ensure a vector is not longer than a max length
 *
 * @param a The vec2 to limit
 * @param maxLen The longest length of the resulting vector
 * @returns The vector, shortened to maxLen if it's too long
 */
export function truncate(a, maxLen, dst) {
    dst = dst || new VecType(2);
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
    dst = dst || new VecType(2);
    return lerp(a, b, 0.5, dst);
}
