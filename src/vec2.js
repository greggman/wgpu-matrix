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
 * @module vec2
 */

let VecType = Float32Array;

/**
 * A JavaScript array with 2 values, Float32Array with 2 values, or a Float64Array with 2 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link vec2.setDefaultType}.
 * @typedef {(number[]|Float32Array|Float64Array)} Vec2
 */

/**
 * Sets the type this library creates for a Vec2
 * @param {constructor} ctor the constructor for the type. Either `Float32Array`, 'Float64Array', or `Array`
 * @return {constructor} previous constructor for Vec2
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
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @return {Vec2} the created vector
 */
export function create(x, y) {
  const dst = new VecType(2);
  if (x !== undefined) {
    dst[0] = x;
    if (y !== undefined) {
      dst[1] = y;
    }
  }
  return dst;
}

/**
 * Creates a Vec2; may be called with x, y, z to set initial values. (same as create)
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @return {Vec2} the created vector
 */
export const fromValues = create;

/**
 * Applies Math.ceil to each element of vector
 * @param {Vec2} v Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that is the ceil of each element of v.
 */
export function ceil(v, dst) {
  dst = dst || new VecType(2);

  dst[0] = Math.ceil(v[0]);
  dst[1] = Math.ceil(v[1]);

  return dst;
}

/**
 * Applies Math.floor to each element of vector
 * @param {Vec2} v Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that is the floor of each element of v.
 */
export function floor(v, dst) {
  dst = dst || new VecType(2);

  dst[0] = Math.floor(v[0]);
  dst[1] = Math.floor(v[1]);

  return dst;
}

/**
 * Applies Math.round to each element of vector
 * @param {Vec2} v Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that is the round of each element of v.
 */
export function round(v, dst) {
  dst = dst || new VecType(2);

  dst[0] = Math.round(v[0]);
  dst[1] = Math.round(v[1]);

  return dst;
}

/**
 * Clamp each element of vector between min and max
 * @param {Vec2} v Operand vector.
 * @param {number} [max] Min value, default 0
 * @param {number} [min] Max value, default 1
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that the clamped value of each element of v.
 */
export function clamp(v, min = 0, max = 1, dst) {
  dst = dst || new VecType(2);

  dst[0] = Math.min(max, Math.max(min, v[0]));
  dst[1] = Math.min(max, Math.max(min, v[1]));

  return dst;
}

/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that is the sum of a and b.
 */
export function add(a, b, dst) {
  dst = dst || new VecType(2);

  dst[0] = a[0] + b[0];
  dst[1] = a[1] + b[1];

  return dst;
}

/**
 * Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {number} scale Amount to scale b
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that is the sum of a + b * scale.
 */
export function addScaled(a, b, scale, dst) {
  dst = dst || new VecType(2);

  dst[0] = a[0] + b[0] * scale;
  dst[1] = a[1] + b[1] * scale;

  return dst;
}

/**
 * Returns the angle in radians between two vectors.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @return {number} The angle in radians between the 2 vectors.
 */
export function angle(a, b) {
  const ax = a[0];
  const ay = a[1];
  const bx = a[0];
  const by = a[1];
  const mag1 = Math.sqrt(ax * ax + ay * ay);
  const mag2 = Math.sqrt(bx * bx + by * by);
  const mag = mag1 * mag2;
  const cosine = mag && dot(a, b) / mag;
  return Math.acos(cosine);
}

/**
 * Subtracts two vectors.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that is the difference of a and b.
 */
export function subtract(a, b, dst) {
  dst = dst || new VecType(2);

  dst[0] = a[0] - b[0];
  dst[1] = a[1] - b[1];

  return dst;
}

/**
 * Subtracts two vectors.
 * @function
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A vector that is the difference of a and b.
 */
export const sub = subtract;

/**
 * Check if 2 vectors are approximately equal
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @returns {bool} true if vectors are approximately equal
 */
export function equalsApproximately(a, b) {
  return Math.abs(a[0] - b[0]) < utils.EPSILON &&
         Math.abs(a[1] - b[1]) < utils.EPSILON;
}

/**
 * Check if 2 vectors are exactly equal
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @returns {bool} true if vectors are exactly equal
 */
export function equals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {number} t Interpolation coefficient.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The linear interpolated result.
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
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} t Interpolation coefficients vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} the linear interpolated result.
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
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The max components vector.
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
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The min components vector.
 */
export function min(a, b, dst) {
  dst = dst || new VecType(2);

  dst[0] = Math.min(a[0], b[0]);
  dst[1] = Math.min(a[1], b[1]);

  return dst;
}

/**
 * Multiplies a vector by a scalar.
 * @param {Vec2} v The vector.
 * @param {number} k The scalar.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The scaled vector.
 */
export function mulScalar(v, k, dst) {
  dst = dst || new VecType(2);

  dst[0] = v[0] * k;
  dst[1] = v[1] * k;

  return dst;
}

/**
 * Multiplies a vector by a scalar. (same as mulScalar)
 * @function
 * @param {Vec2} v The vector.
 * @param {number} k The scalar.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The scaled vector.
 */
export const scale = mulScalar;

/**
 * Divides a vector by a scalar.
 * @param {Vec2} v The vector.
 * @param {number} k The scalar.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The scaled vector.
 */
export function divScalar(v, k, dst) {
  dst = dst || new VecType(2);

  dst[0] = v[0] / k;
  dst[1] = v[1] / k;

  return dst;
}

/**
 * Inverse a vector.
 * @param {Vec2} v The vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The inverted vector.
 */
export function inverse(v, dst) {
  dst = dst || new VecType(2);

  dst[0] = 1 / v[0];
  dst[1] = 1 / v[1];

  return dst;
}

/**
 * Invert a vector. (same as inverse)
 * @function
 * @param {Vec2} v The vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The inverted vector.
 */
export const invert = inverse;

/**
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec3} [dst] vector to hold result. If not new one is created.
 * @return {Vec3} The vector of a cross b.
 */
export function cross(a, b, dst) {
  dst = dst || new VecType(3);
  const z = a[0] * b[1] - a[1] * b[0];
  dst[0] = 0;
  dst[1] = 0;
  dst[2] = z;

  return dst;
}

/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @return {number} dot product
 */
export function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the length of vector
 * @param {Vec2} v vector.
 * @return {number} length of vector.
 */
export function length(v) {
  const v0 = v[0];
  const v1 = v[1];
  return Math.sqrt(v0 * v0 + v1 * v1);
}

/**
 * Computes the length of vector (same as length)
 * @function
 * @param {Vec2} v vector.
 * @return {number} length of vector.
 */
export const len = length;

/**
 * Computes the square of the length of vector
 * @param {Vec2} v vector.
 * @return {number} square of the length of vector.
 */
export function lengthSq(v) {
  const v0 = v[0];
  const v1 = v[1];
  return v0 * v0 + v1 * v1;
}

/**
 * Computes the square of the length of vector (same as lengthSq)
 * @function
 * @param {Vec2} v vector.
 * @return {number} square of the length of vector.
 */
export const lenSq = lengthSq;

/**
 * Computes the distance between 2 points
 * @param {Vec2} a vector.
 * @param {Vec2} b vector.
 * @return {number} distance between a and b
 */
export function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Computes the distance between 2 points (same as distance)
 * @function
 * @param {Vec2} a vector.
 * @param {Vec2} b vector.
 * @return {number} distance between a and b
 */
export const dist = distance;

/**
 * Computes the square of the distance between 2 points
 * @param {Vec2} a vector.
 * @param {Vec2} b vector.
 * @return {number} square of the distance between a and b
 */
export function distanceSq(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

/**
 * Computes the square of the distance between 2 points (same as distanceSq)
 * @function
 * @param {Vec2} a vector.
 * @param {Vec2} b vector.
 * @return {number} square of the distance between a and b
 */
export const distSq = distanceSq;

/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param {Vec2} v The vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The normalized vector.
 */
export function normalize(v, dst) {
  dst = dst || new VecType(2);

  const v0 = v[0];
  const v1 = v[1];
  const len = Math.sqrt(v0 * v0 + v1 * v1);

  if (len > 0.00001) {
    dst[0] = v0 / len;
    dst[1] = v1 / len;
  } else {
    dst[0] = 0;
    dst[1] = 0;
  }

  return dst;
}

/**
 * Negates a vector.
 * @param {Vec2} v The vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} -v.
 */
export function negate(v, dst) {
  dst = dst || new VecType(2);

  dst[0] = -v[0];
  dst[1] = -v[1];

  return dst;
}

/**
 * Copies a vector. (same as clone)
 * @param {Vec2} v The vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A copy of v.
 */
export function copy(v, dst) {
  dst = dst || new VecType(2);

  dst[0] = v[0];
  dst[1] = v[1];

  return dst;
}

/**
 * Clones a vector. (same as copy)
 * @param {Vec2} v The vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} A copy of v.
 * @function
 */
export const clone = copy;

/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The vector of products of entries of a and b.
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
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The vector of products of entries of a and b.
 * @function
 */
export const mul = multiply;

/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The vector of quotients of entries of a and b.
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
 * @function
 * @param {Vec2} a Operand vector.
 * @param {Vec2} b Operand vector.
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The vector of quotients of entries of a and b.
 */
export const div = divide;

/**
 * Creates a random unit vector * scale
 * @param {number} scale Default 1
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The random vector.
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
 * @param {Vec2} [dst] vector to hold result. If not new one is created.
 * @return {Vec2} The zeroed vector.
 */
export function zero(dst) {
  dst = dst || new VecType(2);

  dst[0] = 0;
  dst[1] = 0;

  return dst;
}


/**
 * transform Vec2 by 4x4 matrix
 * @param {Vec2} v the vector
 * @param {Mat4} m The matrix.
 * @param {Vec2} [dst] optional Vec2 to store result. If not passed a new one is created.
 * @returns {Vec2} the transformed vector
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
 * @param {Vec2} v the vector
 * @param {Mat3} m The matrix.
 * @param {Vec2} [dst] optional Vec2 to store result. If not passed a new one is created.
 * @returns {Vec2} the transformed vector
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
 * Transforms vec4 by 3x3 matrix
 *
 * @param {Vec2} v the vector
 * @param {Mat2} m The matrix.
 * @param {Vec2} [dst] optional Vec2 to store result. If not passed a new one is created.
 * @returns {Vec2} the transformed vector
 */
export function transformMat2(v, m, dst) {
  dst = dst || new VecType(2);

  const x = v[0];
  const y = v[1];

  dst[0] = m[0] * x + m[2] * y;
  dst[1] = m[1] * x + m[3] * y;

  return dst;
}

