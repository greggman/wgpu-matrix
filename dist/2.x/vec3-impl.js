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
import { create, setDefaultType, VecType } from './vec3';
export { create, setDefaultType };
/**
 * Creates a vec3; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @returns the created vector
 */
export const fromValues = create;
/**
 * Sets the values of a Vec3
 * Also see {@link vec3.create} and {@link vec3.copy}
 *
 * @param x first value
 * @param y second value
 * @param z third value
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector with its elements set.
 */
export function set(x, y, z, dst) {
    dst = dst || new VecType(3);
    dst[0] = x;
    dst[1] = y;
    dst[2] = z;
    return dst;
}
/**
 * Applies Math.ceil to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the ceil of each element of v.
 */
export function ceil(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = Math.ceil(v[0]);
    dst[1] = Math.ceil(v[1]);
    dst[2] = Math.ceil(v[2]);
    return dst;
}
/**
 * Applies Math.floor to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the floor of each element of v.
 */
export function floor(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = Math.floor(v[0]);
    dst[1] = Math.floor(v[1]);
    dst[2] = Math.floor(v[2]);
    return dst;
}
/**
 * Applies Math.round to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the round of each element of v.
 */
export function round(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = Math.round(v[0]);
    dst[1] = Math.round(v[1]);
    dst[2] = Math.round(v[2]);
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
    dst = dst || new VecType(3);
    dst[0] = Math.min(max, Math.max(min, v[0]));
    dst[1] = Math.min(max, Math.max(min, v[1]));
    dst[2] = Math.min(max, Math.max(min, v[2]));
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
    dst = dst || new VecType(3);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
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
    dst = dst || new VecType(3);
    dst[0] = a[0] + b[0] * scale;
    dst[1] = a[1] + b[1] * scale;
    dst[2] = a[2] + b[2] * scale;
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
    const az = a[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
    const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
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
    dst = dst || new VecType(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
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
        Math.abs(a[2] - b[2]) < utils.EPSILON;
}
/**
 * Check if 2 vectors are exactly equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are exactly equal
 */
export function equals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
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
    dst = dst || new VecType(3);
    dst[0] = a[0] + t * (b[0] - a[0]);
    dst[1] = a[1] + t * (b[1] - a[1]);
    dst[2] = a[2] + t * (b[2] - a[2]);
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
    dst = dst || new VecType(3);
    dst[0] = a[0] + t[0] * (b[0] - a[0]);
    dst[1] = a[1] + t[1] * (b[1] - a[1]);
    dst[2] = a[2] + t[2] * (b[2] - a[2]);
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
    dst = dst || new VecType(3);
    dst[0] = Math.max(a[0], b[0]);
    dst[1] = Math.max(a[1], b[1]);
    dst[2] = Math.max(a[2], b[2]);
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
    dst = dst || new VecType(3);
    dst[0] = Math.min(a[0], b[0]);
    dst[1] = Math.min(a[1], b[1]);
    dst[2] = Math.min(a[2], b[2]);
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
    dst = dst || new VecType(3);
    dst[0] = v[0] * k;
    dst[1] = v[1] * k;
    dst[2] = v[2] * k;
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
    dst = dst || new VecType(3);
    dst[0] = v[0] / k;
    dst[1] = v[1] / k;
    dst[2] = v[2] / k;
    return dst;
}
/**
 * Inverse a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
export function inverse(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = 1 / v[0];
    dst[1] = 1 / v[1];
    dst[2] = 1 / v[2];
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
    dst = dst || new VecType(3);
    const t1 = a[2] * b[0] - a[0] * b[2];
    const t2 = a[0] * b[1] - a[1] * b[0];
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = t1;
    dst[2] = t2;
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
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
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
    return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
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
    return v0 * v0 + v1 * v1 + v2 * v2;
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
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
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
    return dx * dx + dy * dy + dz * dz;
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
    dst = dst || new VecType(3);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
    if (len > 0.00001) {
        dst[0] = v0 / len;
        dst[1] = v1 / len;
        dst[2] = v2 / len;
    }
    else {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
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
    dst = dst || new VecType(3);
    dst[0] = -v[0];
    dst[1] = -v[1];
    dst[2] = -v[2];
    return dst;
}
/**
 * Copies a vector. (same as {@link vec3.clone})
 * Also see {@link vec3.create} and {@link vec3.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
export function copy(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = v[0];
    dst[1] = v[1];
    dst[2] = v[2];
    return dst;
}
/**
 * Clones a vector. (same as {@link vec3.copy})
 * Also see {@link vec3.create} and {@link vec3.set}
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
    dst = dst || new VecType(3);
    dst[0] = a[0] * b[0];
    dst[1] = a[1] * b[1];
    dst[2] = a[2] * b[2];
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
    dst = dst || new VecType(3);
    dst[0] = a[0] / b[0];
    dst[1] = a[1] / b[1];
    dst[2] = a[2] / b[2];
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
 * Creates a random vector
 * @param scale - Default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The random vector.
 */
export function random(scale = 1, dst) {
    dst = dst || new VecType(3);
    const angle = Math.random() * 2 * Math.PI;
    const z = Math.random() * 2 - 1;
    const zScale = Math.sqrt(1 - z * z) * scale;
    dst[0] = Math.cos(angle) * zScale;
    dst[1] = Math.sin(angle) * zScale;
    dst[2] = z * scale;
    return dst;
}
/**
 * Zero's a vector
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The zeroed vector.
 */
export function zero(dst) {
    dst = dst || new VecType(3);
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
    return dst;
}
/**
 * transform vec3 by 4x4 matrix
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional vec3 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
export function transformMat4(v, m, dst) {
    dst = dst || new VecType(3);
    const x = v[0];
    const y = v[1];
    const z = v[2];
    const w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1;
    dst[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    dst[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    dst[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return dst;
}
/**
 * Transform vec4 by upper 3x3 matrix inside 4x4 matrix.
 * @param v - The direction.
 * @param m - The matrix.
 * @param dst - optional Vec3 to store result. If not passed a new one is created.
 * @returns The transformed vector.
 */
export function transformMat4Upper3x3(v, m, dst) {
    dst = dst || new VecType(3);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
    dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
    dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
    return dst;
}
/**
 * Transforms vec3 by 3x3 matrix
 *
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional vec3 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
export function transformMat3(v, m, dst) {
    dst = dst || new VecType(3);
    const x = v[0];
    const y = v[1];
    const z = v[2];
    dst[0] = x * m[0] + y * m[4] + z * m[8];
    dst[1] = x * m[1] + y * m[5] + z * m[9];
    dst[2] = x * m[2] + y * m[6] + z * m[10];
    return dst;
}
/**
 * Transforms vec3 by Quaternion
 * @param v - the vector to transform
 * @param q - the quaternion to transform by
 * @param dst - optional vec3 to store result. If not passed a new one is created.
 * @returns the transformed
 */
export function transformQuat(v, q, dst) {
    dst = dst || new VecType(3);
    const qx = q[0];
    const qy = q[1];
    const qz = q[2];
    const w2 = q[3] * 2;
    const x = v[0];
    const y = v[1];
    const z = v[2];
    const uvX = qy * z - qz * y;
    const uvY = qz * x - qx * z;
    const uvZ = qx * y - qy * x;
    dst[0] = x + uvX * w2 + (qy * uvZ - qz * uvY) * 2;
    dst[1] = y + uvY * w2 + (qz * uvX - qx * uvZ) * 2;
    dst[2] = z + uvZ * w2 + (qx * uvY - qy * uvX) * 2;
    return dst;
}
/**
 * Returns the translation component of a 4-by-4 matrix as a vector with 3
 * entries.
 * @param m - The matrix.
 * @param dst - vector to hold result. If not passed a new one is created.
 * @returns The translation component of m.
 */
export function getTranslation(m, dst) {
    dst = dst || new VecType(3);
    dst[0] = m[12];
    dst[1] = m[13];
    dst[2] = m[14];
    return dst;
}
/**
 * Returns an axis of a 4x4 matrix as a vector with 3 entries
 * @param m - The matrix.
 * @param axis - The axis 0 = x, 1 = y, 2 = z;
 * @returns The axis component of m.
 */
export function getAxis(m, axis, dst) {
    dst = dst || new VecType(3);
    const off = axis * 4;
    dst[0] = m[off + 0];
    dst[1] = m[off + 1];
    dst[2] = m[off + 2];
    return dst;
}
/**
 * Returns the scaling component of the matrix
 * @param m - The Matrix
 * @param dst - The vector to set. If not passed a new one is created.
 */
export function getScaling(m, dst) {
    dst = dst || new VecType(3);
    const xx = m[0];
    const xy = m[1];
    const xz = m[2];
    const yx = m[4];
    const yy = m[5];
    const yz = m[6];
    const zx = m[8];
    const zy = m[9];
    const zz = m[10];
    dst[0] = Math.sqrt(xx * xx + xy * xy + xz * xz);
    dst[1] = Math.sqrt(yx * yx + yy * yy + yz * yz);
    dst[2] = Math.sqrt(zx * zx + zy * zy + zz * zz);
    return dst;
}
/**
 * Rotate a 3D vector around the x-axis
 *
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @param dst - The vector to set. If not passed a new one is created.
 * @returns the rotated vector
 */
export function rotateX(a, b, rad, dst) {
    dst = dst || new VecType(3);
    const p = [];
    const r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    //perform rotation
    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
    //translate to correct position
    dst[0] = r[0] + b[0];
    dst[1] = r[1] + b[1];
    dst[2] = r[2] + b[2];
    return dst;
}
/**
 * Rotate a 3D vector around the y-axis
 *
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @param dst - The vector to set. If not passed a new one is created.
 * @returns the rotated vector
 */
export function rotateY(a, b, rad, dst) {
    dst = dst || new VecType(3);
    const p = [];
    const r = [];
    // translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    // perform rotation
    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
    // translate to correct position
    dst[0] = r[0] + b[0];
    dst[1] = r[1] + b[1];
    dst[2] = r[2] + b[2];
    return dst;
}
/**
 * Rotate a 3D vector around the z-axis
 *
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @param dst - The vector to set. If not passed a new one is created.
 * @returns {vec3} out
 */
export function rotateZ(a, b, rad, dst) {
    dst = dst || new VecType(3);
    const p = [];
    const r = [];
    // translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    // perform rotation
    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2];
    // translate to correct position
    dst[0] = r[0] + b[0];
    dst[1] = r[1] + b[1];
    dst[2] = r[2] + b[2];
    return dst;
}
/**
 * Treat a 3D vector as a direction and set it's length
 *
 * @param a The vec3 to lengthen
 * @param len The length of the resulting vector
 * @returns The lengthened vector
 */
export function setLength(a, len, dst) {
    dst = dst || new VecType(3);
    normalize(a, dst);
    return mulScalar(dst, len, dst);
}
/**
 * Ensure a vector is not longer than a max length
 *
 * @param a The vec3 to limit
 * @param maxLen The longest length of the resulting vector
 * @returns The vector, shortened to maxLen if it's too long
 */
export function truncate(a, maxLen, dst) {
    dst = dst || new VecType(3);
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
    dst = dst || new VecType(3);
    return lerp(a, b, 0.5, dst);
}
