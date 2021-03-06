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

import * as vec2 from './vec2.js';
import * as utils from './utils.js';

/**
 * 3x3 Matrix math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new matrix. In other words you can do this
 *
 *     const mat = mat3.translation([1, 2, 3]);  // Creates a new translation matrix
 *
 * or
 *
 *     const mat = mat3.create();
 *     mat3.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any matrix as the destination. So for example
 *
 *     const mat = mat3.identity();
 *     const trans = mat3.translation([1, 2, 3]);
 *     mat3.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
 *
 * @module mat3
 */
let MatType = Float32Array;

/**
 * A JavaScript array with 12 values, a Float32Array with 12 values, or a Float64Array with 12 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link mat3.setDefaultType}.
 *
 * `mat3` uses the space of 12 elements
 *
 * ```js
 * // a mat3
 * [
 *   xx, xy, xz, ?
 *   yx, yy, yz, ?
 *   zx, zy, zz, ?
 * ]
 * ```
 *
 * @typedef {(number[]|Float32Array|Float64Array)} Mat3
 */

// This mess is because with Mat3 we have 3 unused elements.
// For Float32Array and Float64Array that's not an issue
// but for Array it's troublesome
const ctorMap = new Map([
  [Float32Array, () => new Float32Array(12)],
  [Float64Array, () => new Float64Array(12)],
  [Array, () => new Array(12).fill(0)],
]);
let newMat3 = ctorMap.get(Float32Array);

/**
 * Sets the type this library creates for a Mat3
 * @param {constructor} ctor the constructor for the type. Either `Float32Array`, 'Float64Array', or `Array`
 * @return {constructor} previous constructor for Mat3
 */
export function setDefaultType(ctor) {
  const oldType = MatType;
  MatType = ctor;
  newMat3 = ctorMap.get(ctor);
  return oldType;
}

/**
 * Create a Mat3 from values
 *
 * Note: Since passing in a raw JavaScript array
 * is valid in all circumstances, if you want to
 * force a JavaScript array into a Mat3's specified type
 * it would be faster to use
 *
 * ```
 * const m = mat3.clone(someJSArray);
 * ```
 *
 * Note: a consequence of the implementation is if your Mat3Type = `Array`
 * instead of `Float32Array` or `Float64Array` then any values you
 * don't pass in will be undefined. Usually this is not an issue since
 * (a) using `Array` is rare and (b) using `mat3.create` is usually used
 * to create a Mat3 to be filled out as in
 *
 * ```
 * const m = mat3.create();
 * mat3.perspective(fov, aspect, near, far, m);
 * ```
 *
 * @param {number} [v0] value for element 0
 * @param {number} [v1] value for element 1
 * @param {number} [v2] value for element 2
 * @param {number} [v3] value for element 3
 * @param {number} [v4] value for element 4
 * @param {number} [v5] value for element 5
 * @param {number} [v6] value for element 6
 * @param {number} [v7] value for element 7
 * @param {number} [v8] value for element 8
 * @returns {Mat3} created from values.
 */
export function create(
    v0, v1, v2,
    v3, v4, v5,
    v6, v7, v8) {
  const dst = newMat3();
  // to make the array homogenous
  dst[3] = 0;
  dst[7] = 0;
  dst[11] = 0;
  if (v0 !== undefined) {
    dst[0] = v0;
    if (v1 !== undefined) {
      dst[1] = v1;
      if (v2 !== undefined) {
        dst[2] = v2;
        if (v3 !== undefined) {
          dst[4] = v3;
          if (v4 !== undefined) {
            dst[5] = v4;
            if (v5 !== undefined) {
              dst[6] = v5;
              if (v6 !== undefined) {
                dst[8] = v6;
                if (v7 !== undefined) {
                  dst[9] = v7;
                  if (v8 !== undefined) {
                    dst[10] = v8;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return dst;
}

/**
 * Negates a matrix.
 * @param {Mat3} m The matrix.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} -m.
 */
export function negate(m, dst) {
  dst = dst || newMat3();

  dst[ 0] = -m[ 0];
  dst[ 1] = -m[ 1];
  dst[ 2] = -m[ 2];
  dst[ 4] = -m[ 4];
  dst[ 5] = -m[ 5];
  dst[ 6] = -m[ 6];
  dst[ 8] = -m[ 8];
  dst[ 9] = -m[ 9];
  dst[10] = -m[10];

  return dst;
}

/**
 * Copies a matrix.
 * @param {Mat3} m The matrix.
 * @param {Mat3} [dst] The matrix. If not passed a new one is created.
 * @return {Mat3} A copy of m.
 */
export function copy(m, dst) {
  dst = dst || newMat3();

  dst[ 0] = m[ 0];
  dst[ 1] = m[ 1];
  dst[ 2] = m[ 2];

  dst[ 4] = m[ 4];
  dst[ 5] = m[ 5];
  dst[ 6] = m[ 6];

  dst[ 8] = m[ 8];
  dst[ 9] = m[ 9];
  dst[10] = m[10];

  return dst;
}

/**
 * Copies a matrix (same as copy)
 * @function
 * @param {Mat3} m The matrix.
 * @param {Mat3} [dst] The matrix. If not passed a new one is created.
 * @return {Mat3} A copy of m.
 */
export const clone = copy;

/**
 * Check if 2 matrices are approximately equal
 * @param {Mat3} a Operand matrix.
 * @param {Mat3} b Operand matrix.
 * @returns {bool} true if matrices are approximately equal
 */
export function equalsApproximately(a, b) {
  return Math.abs(a[ 0] - b[ 0]) < utils.EPSILON &&
         Math.abs(a[ 1] - b[ 1]) < utils.EPSILON &&
         Math.abs(a[ 2] - b[ 2]) < utils.EPSILON &&
         Math.abs(a[ 4] - b[ 4]) < utils.EPSILON &&
         Math.abs(a[ 5] - b[ 5]) < utils.EPSILON &&
         Math.abs(a[ 6] - b[ 6]) < utils.EPSILON &&
         Math.abs(a[ 8] - b[ 8]) < utils.EPSILON &&
         Math.abs(a[ 9] - b[ 9]) < utils.EPSILON &&
         Math.abs(a[10] - b[10]) < utils.EPSILON;
}

/**
 * Check if 2 matrices are exactly equal
 * @param {Mat3} a Operand matrix.
 * @param {Mat3} b Operand matrix.
 * @returns {bool} true if matrices are exactly equal
 */
export function equals(a, b) {
  return a[ 0] === b[ 0] &&
         a[ 1] === b[ 1] &&
         a[ 2] === b[ 2] &&
         a[ 4] === b[ 4] &&
         a[ 5] === b[ 5] &&
         a[ 6] === b[ 6] &&
         a[ 8] === b[ 8] &&
         a[ 9] === b[ 9] &&
         a[10] === b[10];
}

/**
 * Creates an n-by-n identity matrix.
 *
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} An n-by-n identity matrix.
 */
export function identity(dst) {
  dst = dst || newMat3();

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;

  return dst;
}

/**
 * Takes the transpose of a matrix.
 * @param {Mat3} m The matrix.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The transpose of m.
 */
export function transpose(m, dst) {
  dst = dst || newMat3();
  if (dst === m) {
    let t;

    // 0 1 2
    // 4 5 6
    // 8 9 10

    t = m[1];
    m[1] = m[4];
    m[4] = t;

    t = m[2];
    m[2] = m[8];
    m[8] = t;

    t = m[6];
    m[6] = m[9];
    m[9] = t;

    return dst;
  }

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];

  dst[ 0] = m00;
  dst[ 1] = m10;
  dst[ 2] = m20;
  dst[ 4] = m01;
  dst[ 5] = m11;
  dst[ 6] = m21;
  dst[ 8] = m02;
  dst[ 9] = m12;
  dst[10] = m22;

  return dst;
}

/**
 * Computes the inverse of a 3-by-3 matrix.
 * @param {Mat3} m The matrix.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The inverse of m.
 */
export function inverse(m, dst) {
  dst = dst || newMat3();

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];

  const m11_x_m22 = m11 * m22;
  const m21_x_m12 = m21 * m12;
  const m01_x_m22 = m01 * m22;
  const m21_x_m02 = m21 * m02;
  const m01_x_m12 = m01 * m12;
  const m11_x_m02 = m11 * m02;

  const invDet = 1 / (
      m00 * (m11_x_m22 - m21_x_m12) -
      m10 * (m01_x_m22 - m21_x_m02) +
      m20 * (m01_x_m12 - m11_x_m02));

  dst[ 0] = +(m11_x_m22 - m21_x_m12) * invDet;
  dst[ 1] = -(m10 * m22 - m20 * m12) * invDet;
  dst[ 2] = +(m10 * m21 - m20 * m11) * invDet;
  dst[ 4] = -(m01_x_m22 - m21_x_m02) * invDet;
  dst[ 5] = +(m00 * m22 - m20 * m02) * invDet;
  dst[ 6] = -(m00 * m21 - m20 * m01) * invDet;
  dst[ 8] = +(m01_x_m12 - m11_x_m02) * invDet;
  dst[ 9] = -(m00 * m12 - m10 * m02) * invDet;
  dst[10] = +(m00 * m11 - m10 * m01) * invDet;

  return dst;
}

/**
 * Compute the determinant of a matrix
 * @param {Mat3} m the matrix
 * @returns {number} the determinant
 */
export function determinant(m) {
  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];

  return m00 * (m11 * m22 - m21 * m12) -
         m10 * (m01 * m22 - m21 * m02) +
         m20 * (m01 * m12 - m11 * m02);
}

/**
 * Computes the inverse of a 3-by-3 matrix. (same as inverse)
 * @function
 * @param {Mat3} m The matrix.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The inverse of m.
 */
export const invert = inverse;

/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right
 * @param {Mat3} a The matrix on the left.
 * @param {Mat3} b The matrix on the right.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The matrix product of a and b.
 */
export function multiply(a, b, dst) {
  dst = dst || newMat3();

  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a10 = a[ 4 + 0];
  const a11 = a[ 4 + 1];
  const a12 = a[ 4 + 2];
  const a20 = a[ 8 + 0];
  const a21 = a[ 8 + 1];
  const a22 = a[ 8 + 2];
  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b10 = b[ 4 + 0];
  const b11 = b[ 4 + 1];
  const b12 = b[ 4 + 2];
  const b20 = b[ 8 + 0];
  const b21 = b[ 8 + 1];
  const b22 = b[ 8 + 2];

  dst[ 0] = a00 * b00 + a10 * b01 + a20 * b02;
  dst[ 1] = a01 * b00 + a11 * b01 + a21 * b02;
  dst[ 2] = a02 * b00 + a12 * b01 + a22 * b02;
  dst[ 4] = a00 * b10 + a10 * b11 + a20 * b12;
  dst[ 5] = a01 * b10 + a11 * b11 + a21 * b12;
  dst[ 6] = a02 * b10 + a12 * b11 + a22 * b12;
  dst[ 8] = a00 * b20 + a10 * b21 + a20 * b22;
  dst[ 9] = a01 * b20 + a11 * b21 + a21 * b22;
  dst[10] = a02 * b20 + a12 * b21 + a22 * b22;

  return dst;
}

/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right (same as multiply)
 * @function
 * @param {Mat3} a The matrix on the left.
 * @param {Mat3} b The matrix on the right.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The matrix product of a and b.
 */
export const mul = multiply;

/**
 * Sets the translation component of a 3-by-3 matrix to the given
 * vector.
 * @param {Mat3} a The matrix.
 * @param {Vec2} v The vector.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The matrix with translation set.
 */
export function setTranslation(a, v, dst) {
  dst = dst || identity();
  if (a !== dst) {
    dst[ 0] = a[ 0];
    dst[ 1] = a[ 1];
    dst[ 2] = a[ 2];
    dst[ 4] = a[ 4];
    dst[ 5] = a[ 5];
    dst[ 6] = a[ 6];
  }
  dst[ 8] = v[0];
  dst[ 9] = v[1];
  dst[10] = 1;
  return dst;
}

/**
 * Returns the translation component of a 3-by-3 matrix as a vector with 3
 * entries.
 * @param {Mat3} m The matrix.
 * @param {Vec2} [dst] vector to hold result. If not passed a new one is created.
 * @return {Vec2} The translation component of m.
 */
export function getTranslation(m, dst) {
  dst = dst || vec2.create();
  dst[0] = m[8];
  dst[1] = m[9];
  return dst;
}

/**
 * Returns an axis of a 3x3 matrix as a vector with 2 entries
 * @param {Mat3} m The matrix.
 * @param {number} axis The axis 0 = x, 1 = y,
 * @return {Vec2} The axis component of m.
 */
export function getAxis(m, axis, dst) {
  dst = dst || vec2.create();
  const off = axis * 4;
  dst[0] = m[off + 0];
  dst[1] = m[off + 1];
  return dst;
}

/**
 * Sets an axis of a 3x3 matrix as a vector with 2 entries
 * @param {Mat3} m The matrix.
 * @param {Vec2} v the axis vector
 * @param {number} axis The axis  0 = x, 1 = y;
 * @param {Mat3} [dst] The matrix to set. If not passed a new one is created.
 * @return {Mat3} The matrix with axis set.
 */
export function setAxis(a, v, axis, dst) {
  if (dst !== a) {
    dst = copy(a, dst);
  }
  const off = axis * 4;
  dst[off + 0] = v[0];
  dst[off + 1] = v[1];
  return dst;
}

/**
 * Returns the scaling component of the matrix
 * @param {Mat3} m The Matrix
 * @param {Vec2} [dst] The vector to set. If not passed a new one is created.
 */
export function getScaling(m, dst) {
  dst = dst || vec2.create();

  const xx = m[0];
  const xy = m[1];
  const yx = m[4];
  const yy = m[5];

  dst[0] = Math.sqrt(xx * xx + xy * xy);
  dst[1] = Math.sqrt(yx * yx + yy * yy);

  return dst;
}

/**
 * Creates a 3-by-3 matrix which translates by the given vector v.
 * @param {Vec2} v The vector by which to translate.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The translation matrix.
 */
export function translation(v, dst) {
  dst = dst || newMat3();

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 8] = v[0];
  dst[ 9] = v[1];
  dst[10] = 1;
  return dst;
}

/**
 * Translates the given 3-by-3 matrix by the given vector v.
 * @param {Mat3} m The matrix.
 * @param {Vec2} v The vector by which to translate.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The translated matrix.
 */
export function translate(m, v, dst) {
  dst = dst || newMat3();

  const v0 = v[0];
  const v1 = v[1];

  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];

  if (m !== dst) {
    dst[ 0] = m00;
    dst[ 1] = m01;
    dst[ 2] = m02;
    dst[ 4] = m10;
    dst[ 5] = m11;
    dst[ 6] = m12;
  }

  dst[ 8] = m00 * v0 + m10 * v1 + m20;
  dst[ 9] = m01 * v0 + m11 * v1 + m21;
  dst[10] = m02 * v0 + m12 * v1 + m22;

  return dst;
}

/**
 * Creates a 3-by-3 matrix which rotates  by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The rotation matrix.
 */
export function rotation(angleInRadians, dst) {
  dst = dst || newMat3();

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c;
  dst[ 1] = s;
  dst[ 2] = 0;
  dst[ 4] = -s;
  dst[ 5] = c;
  dst[ 6] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;

  return dst;
}

/**
 * Rotates the given 3-by-3 matrix  by the given angle.
 * @param {Mat3} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The rotated matrix.
 */
export function rotate(m, angleInRadians, dst) {
  dst = dst || newMat3();

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c * m00 + s * m10;
  dst[ 1] = c * m01 + s * m11;
  dst[ 2] = c * m02 + s * m12;

  dst[ 4] = c * m10 - s * m00;
  dst[ 5] = c * m11 - s * m01;
  dst[ 6] = c * m12 - s * m02;


  if (m !== dst) {
    dst[ 8] = m[ 8];
    dst[ 9] = m[ 9];
    dst[10] = m[10];
  }

  return dst;
}

/**
 * Creates a 3-by-3 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param {Vec2} v A vector of
 *     2 entries specifying the factor by which to scale in each dimension.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The scaling matrix.
 */
export function scaling(v, dst) {
  dst = dst || newMat3();

  dst[ 0] = v[0];
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 4] = 0;
  dst[ 5] = v[1];
  dst[ 6] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;

  return dst;
}

/**
 * Scales the given 3-by-3 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param {Mat3} m The matrix to be modified.
 * @param {Vec2} v A vector of 2 entries specifying the
 *     factor by which to scale in each dimension.
 * @param {Mat3} [dst] matrix to hold result. If not passed a new one is created.
 * @return {Mat3} The scaled matrix.
 */
export function scale(m, v, dst) {
  dst = dst || newMat3();

  const v0 = v[0];
  const v1 = v[1];

  dst[ 0] = v0 * m[0 * 4 + 0];
  dst[ 1] = v0 * m[0 * 4 + 1];
  dst[ 2] = v0 * m[0 * 4 + 2];

  dst[ 4] = v1 * m[1 * 4 + 0];
  dst[ 5] = v1 * m[1 * 4 + 1];
  dst[ 6] = v1 * m[1 * 4 + 2];

  if (m !== dst) {
    dst[ 8] = m[ 8];
    dst[ 9] = m[ 9];
    dst[10] = m[10];
  }

  return dst;
}

