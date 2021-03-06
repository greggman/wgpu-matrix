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
 * @module vec4
 */

let VecType = Float32Array;

/**
 * A JavaScript array with 4 values, Float32Array with 4 values, or a Float64Array with 4 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link vec4.setDefaultType}.
 * @typedef {(number[]|Float32Array|Float64Array)} Vec4
 */

/**
 * Sets the type this library creates for a Vec4
 * @param {constructor} ctor the constructor for the type. Either `Float32Array`, 'Float64Array', or `Array`
 * @return {constructor} previous constructor for Vec4
 */
export function setDefaultType(ctor) {
  const oldType = VecType;
  VecType = ctor;
  return oldType;
}

/**
 * Creates a vec4; may be called with x, y, z to set initial values.
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @param {number} [z] Initial z value.
 * @param {number} [w] Initial w value.
 * @return {Vec4} the created vector
 */
export function create(x, y, z, w) {
  const dst = new VecType(4);
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

/**
 * Creates a vec4; may be called with x, y, z to set initial values. (same as create)
 * @function
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @param {number} [z] Initial z value.
 * @param {number} [z] Initial w value.
 * @return {Vec4} the created vector
 */
export const fromValues = create;

/**
 * Applies Math.ceil to each element of vector
 * @param {Vec4} v Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that is the ceil of each element of v.
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
 * @param {Vec4} v Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that is the floor of each element of v.
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
 * @param {Vec4} v Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that is the round of each element of v.
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
 * @param {Vec4} v Operand vector.
 * @param {number} [max] Min value, default 0
 * @param {number} [min] Max value, default 1
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that the clamped value of each element of v.
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
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that is the sum of a and b.
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
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {number} scale Amount to scale b
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that is the sum of a + b * scale.
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
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that is the difference of a and b.
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
 * @function
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A vector that is the difference of a and b.
 */
export const sub = subtract;

/**
 * Check if 2 vectors are approximately equal
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @returns {bool} true if vectors are approximately equal
 */
export function equalsApproximately(a, b) {
  return Math.abs(a[0] - b[0]) < utils.EPSILON &&
         Math.abs(a[1] - b[1]) < utils.EPSILON &&
         Math.abs(a[2] - b[2]) < utils.EPSILON &&
         Math.abs(a[3] - b[3]) < utils.EPSILON;
}

/**
 * Check if 2 vectors are exactly equal
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @returns {bool} true if vectors are exactly equal
 */
export function equals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {number} t Interpolation coefficient.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The linear interpolated result.
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
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} t Interpolation coefficients vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} the linear interpolated result.
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
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The max components vector.
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
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The min components vector.
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
 * @param {Vec4} v The vector.
 * @param {number} k The scalar.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The scaled vector.
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
 * @function
 * @param {Vec4} v The vector.
 * @param {number} k The scalar.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The scaled vector.
 */
export const scale = mulScalar;

/**
 * Divides a vector by a scalar.
 * @param {Vec4} v The vector.
 * @param {number} k The scalar.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The scaled vector.
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
 * @param {Vec4} v The vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The inverted vector.
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
 * @function
 * @param {Vec4} v The vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The inverted vector.
 */
export const invert = inverse;

/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @return {number} dot product
 */
export function dot(a, b) {
  return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]);
}

/**
 * Computes the length of vector
 * @param {Vec4} v vector.
 * @return {number} length of vector.
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
 * @function
 * @param {Vec4} v vector.
 * @return {number} length of vector.
 */
export const len = length;

/**
 * Computes the square of the length of vector
 * @param {Vec4} v vector.
 * @return {number} square of the length of vector.
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
 * @function
 * @param {Vec4} v vector.
 * @return {number} square of the length of vector.
 */
export const lenSq = lengthSq;

/**
 * Computes the distance between 2 points
 * @param {Vec4} a vector.
 * @param {Vec4} b vector.
 * @return {number} distance between a and b
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
 * @function
 * @param {Vec4} a vector.
 * @param {Vec4} b vector.
 * @return {number} distance between a and b
 */
export const dist = distance;

/**
 * Computes the square of the distance between 2 points
 * @param {Vec4} a vector.
 * @param {Vec4} b vector.
 * @return {number} square of the distance between a and b
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
 * @function
 * @param {Vec4} a vector.
 * @param {Vec4} b vector.
 * @return {number} square of the distance between a and b
 */
export const distSq = distanceSq;

/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param {Vec4} v The vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The normalized vector.
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
  } else {
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
  }

  return dst;
}

/**
 * Negates a vector.
 * @param {Vec4} v The vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} -v.
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
 * Copies a vector. (same as clone)
 * @param {Vec4} v The vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A copy of v.
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
 * Clones a vector. (same as copy)
 * @param {Vec4} v The vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} A copy of v.
 * @function
 */
export const clone = copy;

/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The vector of products of entries of a and b.
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
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The vector of products of entries of a and b.
 * @function
 */
export const mul = multiply;

/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The vector of quotients of entries of a and b.
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
 * @function
 * @param {Vec4} a Operand vector.
 * @param {Vec4} b Operand vector.
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The vector of quotients of entries of a and b.
 */
export const div = divide;

/**
 * Zero's a vector
 * @param {Vec4} [dst] vector to hold result. If not new one is created.
 * @return {Vec4} The zeroed vector.
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
 * @param {Vec4} v the vector
 * @param {Mat4} m The matrix.
 * @param {Vec4} [dst] optional vec4 to store result. If not passed a new one is created.
 * @returns {Vec4} the transformed vector
 */
export function transformMat4(v, m, dst) {
  dst = dst || new VecType(4);

  const x = v[0];
  const y = v[1];
  const z = v[2];
  const w = v[3];

  dst[0] = m[0] * x + m[4] * y + m[ 8] * z + m[12] * w;
  dst[1] = m[1] * x + m[5] * y + m[ 9] * z + m[13] * w;
  dst[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  dst[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;

  return dst;
}
