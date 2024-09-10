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
import { QuatArg } from './quat';
import { Mat3Arg, Mat3Type } from './mat3';
import { Mat4Arg } from './mat4';
import { Vec2Arg } from './vec2';
import { Vec3Arg } from './vec3';
import { getAPI as getVec2API } from './vec2-impl';
import { getAPI as getVec3API } from './vec3-impl';
import { BaseArgType } from './types';

export { Mat3Arg, Mat3Type };

type Mat3Ctor<T extends Mat3Arg = Float32Array>  = new (n: number) => T;

/**
 * Generates a typed API for Mat3
 * */
function getAPIImpl<MatType extends Mat3Arg = Float32Array>(Ctor: Mat3Ctor<MatType>) {
  const vec2 = getVec2API<MatType>(Ctor);
  const vec3 = getVec3API<MatType>(Ctor);

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
 * @param v0 - value for element 0
 * @param v1 - value for element 1
 * @param v2 - value for element 2
 * @param v3 - value for element 3
 * @param v4 - value for element 4
 * @param v5 - value for element 5
 * @param v6 - value for element 6
 * @param v7 - value for element 7
 * @param v8 - value for element 8
 * @returns matrix created from values.
 */
function create(
    v0?: number, v1?: number, v2?: number,
    v3?: number, v4?: number, v5?: number,
    v6?: number, v7?: number, v8?: number) {
  const newDst = new Ctor(12);
  // to make the array homogenous
  newDst[3] = 0;
  newDst[7] = 0;
  newDst[11] = 0;

  if (v0 !== undefined) {
    newDst[0] = v0;
    if (v1 !== undefined) {
      newDst[1] = v1;
      if (v2 !== undefined) {
        newDst[2] = v2;
        if (v3 !== undefined) {
          newDst[4] = v3;
          if (v4 !== undefined) {
            newDst[5] = v4;
            if (v5 !== undefined) {
              newDst[6] = v5;
              if (v6 !== undefined) {
                newDst[8] = v6;
                if (v7 !== undefined) {
                  newDst[9] = v7;
                  if (v8 !== undefined) {
                    newDst[10] = v8;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return newDst;
}

/**
 * Sets the values of a Mat3
 * Also see {@link mat3.create} and {@link mat3.copy}
 *
 * @param v0 - value for element 0
 * @param v1 - value for element 1
 * @param v2 - value for element 2
 * @param v3 - value for element 3
 * @param v4 - value for element 4
 * @param v5 - value for element 5
 * @param v6 - value for element 6
 * @param v7 - value for element 7
 * @param v8 - value for element 8
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat3 set from values.
 */
function set<T extends Mat3Arg = MatType>(
    v0: number, v1: number, v2: number,
    v3: number, v4: number, v5: number,
    v6: number, v7: number, v8: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[0] = v0;  newDst[1] = v1;  newDst[ 2] = v2;  newDst[ 3] = 0;
  newDst[4] = v3;  newDst[5] = v4;  newDst[ 6] = v5;  newDst[ 7] = 0;
  newDst[8] = v6;  newDst[9] = v7;  newDst[10] = v8;  newDst[11] = 0;

  return newDst;
}

/**
 * Creates a Mat3 from the upper left 3x3 part of a Mat4
 * @param m4 - source matrix
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat3 made from m4
 */
function fromMat4<T extends Mat3Arg = MatType>(m4: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;
  newDst[0] = m4[0];  newDst[1] = m4[1];  newDst[ 2] = m4[ 2];  newDst[ 3] = 0;
  newDst[4] = m4[4];  newDst[5] = m4[5];  newDst[ 6] = m4[ 6];  newDst[ 7] = 0;
  newDst[8] = m4[8];  newDst[9] = m4[9];  newDst[10] = m4[10];  newDst[11] = 0;
  return newDst;
}

/**
 * Creates a Mat3 rotation matrix from a quaternion
 * @param q - quaternion to create matrix from
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat3 made from q
 */
function fromQuat<T extends Mat3Arg = MatType>(q: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const x = q[0]; const y = q[1]; const z = q[2]; const w = q[3];
  const x2 = x + x; const y2 = y + y; const z2 = z + z;

  const xx = x * x2;
  const yx = y * x2;
  const yy = y * y2;
  const zx = z * x2;
  const zy = z * y2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;

  newDst[ 0] = 1 - yy - zz;  newDst[ 1] = yx + wz;      newDst[ 2] = zx - wy;      newDst[ 3] = 0;
  newDst[ 4] = yx - wz;      newDst[ 5] = 1 - xx - zz;  newDst[ 6] = zy + wx;      newDst[ 7] = 0;
  newDst[ 8] = zx + wy;      newDst[ 9] = zy - wx;      newDst[10] = 1 - xx - yy;  newDst[11] = 0;

  return newDst;
}

/**
 * Negates a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns -m.
 */
function negate<T extends Mat3Arg = MatType>(m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = -m[ 0];  newDst[ 1] = -m[ 1];  newDst[ 2] = -m[ 2];
  newDst[ 4] = -m[ 4];  newDst[ 5] = -m[ 5];  newDst[ 6] = -m[ 6];
  newDst[ 8] = -m[ 8];  newDst[ 9] = -m[ 9];  newDst[10] = -m[10];

  return newDst;
}

/**
 * Copies a matrix. (same as {@link mat3.clone})
 * Also see {@link mat3.create} and {@link mat3.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
function copy<T extends Mat3Arg = MatType>(m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = m[ 0];  newDst[ 1] = m[ 1];  newDst[ 2] = m[ 2];
  newDst[ 4] = m[ 4];  newDst[ 5] = m[ 5];  newDst[ 6] = m[ 6];
  newDst[ 8] = m[ 8];  newDst[ 9] = m[ 9];  newDst[10] = m[10];

  return newDst;
}

/**
 * Copies a matrix (same as {@link mat3.copy})
 * Also see {@link mat3.create} and {@link mat3.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
const clone = copy;

/**
 * Check if 2 matrices are approximately equal
 * @param a Operand matrix.
 * @param b Operand matrix.
 * @returns true if matrices are approximately equal
 */
function equalsApproximately(a: Mat3Arg, b: Mat3Arg): boolean {
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
 * @param a Operand matrix.
 * @param b Operand matrix.
 * @returns true if matrices are exactly equal
 */
function equals(a: Mat3Arg, b: Mat3Arg): boolean {
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
 * Creates a 3-by-3 identity matrix.
 *
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns A 3-by-3 identity matrix.
 */
function identity<T extends Mat3Arg = MatType>(dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = 1;  newDst[ 1] = 0;  newDst[ 2] = 0;
  newDst[ 4] = 0;  newDst[ 5] = 1;  newDst[ 6] = 0;
  newDst[ 8] = 0;  newDst[ 9] = 0;  newDst[10] = 1;

  return newDst;
}

/**
 * Takes the transpose of a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The transpose of m.
 */
function transpose<T extends Mat3Arg = MatType>(m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;
  if (newDst === m) {
    let t: number;

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

    return newDst;
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

  newDst[ 0] = m00;  newDst[ 1] = m10;  newDst[ 2] = m20;
  newDst[ 4] = m01;  newDst[ 5] = m11;  newDst[ 6] = m21;
  newDst[ 8] = m02;  newDst[ 9] = m12;  newDst[10] = m22;

  return newDst;
}

/**
 * Computes the inverse of a 3-by-3 matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
 */
function inverse<T extends Mat3Arg = MatType>(m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];

  const b01 =  m22 * m11 - m12 * m21;
  const b11 = -m22 * m10 + m12 * m20;
  const b21 =  m21 * m10 - m11 * m20;

  const invDet = 1 / (m00 * b01 + m01 * b11 + m02 * b21);

  newDst[ 0] = b01 * invDet;
  newDst[ 1] = (-m22 * m01 + m02 * m21) * invDet;
  newDst[ 2] = ( m12 * m01 - m02 * m11) * invDet;
  newDst[ 4] = b11 * invDet;
  newDst[ 5] = ( m22 * m00 - m02 * m20) * invDet;
  newDst[ 6] = (-m12 * m00 + m02 * m10) * invDet;
  newDst[ 8] = b21 * invDet;
  newDst[ 9] = (-m21 * m00 + m01 * m20) * invDet;
  newDst[10] = ( m11 * m00 - m01 * m10) * invDet;

  return newDst;
}

/**
 * Compute the determinant of a matrix
 * @param m - the matrix
 * @returns the determinant
 */
function determinant(m: Mat3Arg): number {
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
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
 */
const invert = inverse;

/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
function multiply<T extends Mat3Arg = MatType>(a: Mat3Arg, b: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

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

  newDst[ 0] = a00 * b00 + a10 * b01 + a20 * b02;
  newDst[ 1] = a01 * b00 + a11 * b01 + a21 * b02;
  newDst[ 2] = a02 * b00 + a12 * b01 + a22 * b02;
  newDst[ 4] = a00 * b10 + a10 * b11 + a20 * b12;
  newDst[ 5] = a01 * b10 + a11 * b11 + a21 * b12;
  newDst[ 6] = a02 * b10 + a12 * b11 + a22 * b12;
  newDst[ 8] = a00 * b20 + a10 * b21 + a20 * b22;
  newDst[ 9] = a01 * b20 + a11 * b21 + a21 * b22;
  newDst[10] = a02 * b20 + a12 * b21 + a22 * b22;

  return newDst;
}

/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right (same as multiply)
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
const mul = multiply;

/**
 * Sets the translation component of a 3-by-3 matrix to the given
 * vector.
 * @param a - The matrix.
 * @param v - The vector.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix with translation set.
 */
function setTranslation<T extends Mat3Arg = MatType>(a: Mat3Arg, v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? identity()) as T;
  if (a !== newDst) {
    newDst[ 0] = a[ 0];
    newDst[ 1] = a[ 1];
    newDst[ 2] = a[ 2];
    newDst[ 4] = a[ 4];
    newDst[ 5] = a[ 5];
    newDst[ 6] = a[ 6];
  }
  newDst[ 8] = v[0];
  newDst[ 9] = v[1];
  newDst[10] = 1;
  return newDst;
}

/**
 * Returns the translation component of a 3-by-3 matrix as a vector with 3
 * entries.
 * @param m - The matrix.
 * @param dst - vector to hold result. If not passed a new one is created.
 * @returns The translation component of m.
 */
function getTranslation<T extends Vec2Arg = MatType>(m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? vec2.create()) as T;
  newDst[0] = m[8];
  newDst[1] = m[9];
  return newDst;
}

/**
 * Returns an axis of a 3x3 matrix as a vector with 2 entries
 * @param m - The matrix.
 * @param axis - The axis 0 = x, 1 = y,
 * @returns The axis component of m.
 */
function getAxis<T extends Vec2Arg = MatType>(m: Mat3Arg, axis: number, dst?: T) {
  const newDst = (dst ?? vec2.create()) as T;
  const off = axis * 4;
  newDst[0] = m[off + 0];
  newDst[1] = m[off + 1];
  return newDst;
}

/**
 * Sets an axis of a 3x3 matrix as a vector with 2 entries
 * @param m - The matrix.
 * @param v - the axis vector
 * @param axis - The axis  0 = x, 1 = y;
 * @param dst - The matrix to set. If not passed a new one is created.
 * @returns The matrix with axis set.
 */
function setAxis<T extends Mat3Arg = MatType>(m: Mat3Arg, v: Vec2Arg, axis: number, dst?: T) {
  const newDst = (dst === m ? m : copy(m, dst)) as T;

  const off = axis * 4;
  newDst[off + 0] = v[0];
  newDst[off + 1] = v[1];
  return newDst;
}

/**
 * Returns the "2d" scaling component of the matrix
 * @param m - The Matrix
 * @param dst - The vector to set. If not passed a new one is created.
 */
function getScaling<T extends Vec2Arg = MatType>(m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? vec2.create());

  const xx = m[0];
  const xy = m[1];
  const yx = m[4];
  const yy = m[5];

  newDst[0] = Math.sqrt(xx * xx + xy * xy);
  newDst[1] = Math.sqrt(yx * yx + yy * yy);

  return newDst;
}


/**
 * Returns the "3d" scaling component of the matrix
 * @param m - The Matrix
 * @param dst - The vector to set. If not passed a new one is created.
 */
function get3DScaling<T extends Vec3Arg = MatType>(m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? vec3.create());

  const xx = m[0];
  const xy = m[1];
  const xz = m[2];
  const yx = m[4];
  const yy = m[5];
  const yz = m[6];
  const zx = m[8];
  const zy = m[9];
  const zz = m[10];

  newDst[0] = Math.sqrt(xx * xx + xy * xy + xz * xz);
  newDst[1] = Math.sqrt(yx * yx + yy * yy + yz * yz);
  newDst[2] = Math.sqrt(zx * zx + zy * zy + zz * zz);

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which translates by the given vector v.
 * @param v - The vector by which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translation matrix.
 */
function translation<T extends Mat3Arg = MatType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = 1;     newDst[ 1] = 0;     newDst[ 2] = 0;
  newDst[ 4] = 0;     newDst[ 5] = 1;     newDst[ 6] = 0;
  newDst[ 8] = v[0];  newDst[ 9] = v[1];  newDst[10] = 1;

  return newDst;
}

/**
 * Translates the given 3-by-3 matrix by the given vector v.
 * @param m - The matrix.
 * @param v - The vector by which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translated matrix.
 */
function translate<T extends Mat3Arg = MatType>(m: Mat3Arg, v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

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

  if (m !== newDst) {
    newDst[ 0] = m00;
    newDst[ 1] = m01;
    newDst[ 2] = m02;
    newDst[ 4] = m10;
    newDst[ 5] = m11;
    newDst[ 6] = m12;
  }

  newDst[ 8] = m00 * v0 + m10 * v1 + m20;
  newDst[ 9] = m01 * v0 + m11 * v1 + m21;
  newDst[10] = m02 * v0 + m12 * v1 + m22;

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which rotates  by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
function rotation<T extends Mat3Arg = MatType>(angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] =  c;  newDst[ 1] = s;  newDst[ 2] = 0;
  newDst[ 4] = -s;  newDst[ 5] = c;  newDst[ 6] = 0;
  newDst[ 8] =  0;  newDst[ 9] = 0;  newDst[10] = 1;

  return newDst;
}

/**
 * Rotates the given 3-by-3 matrix  by the given angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
function rotate<T extends Mat3Arg = MatType>(m: Mat3Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = c * m00 + s * m10;
  newDst[ 1] = c * m01 + s * m11;
  newDst[ 2] = c * m02 + s * m12;

  newDst[ 4] = c * m10 - s * m00;
  newDst[ 5] = c * m11 - s * m01;
  newDst[ 6] = c * m12 - s * m02;


  if (m !== newDst) {
    newDst[ 8] = m[ 8];
    newDst[ 9] = m[ 9];
    newDst[10] = m[10];
  }

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which rotates around the x-axis by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
function rotationX<T extends Mat3Arg = MatType>(angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = 1;  newDst[ 1] =  0;  newDst[ 2] = 0;
  newDst[ 4] = 0;  newDst[ 5] =  c;  newDst[ 6] = s;
  newDst[ 8] = 0;  newDst[ 9] = -s;  newDst[10] = c;

  return newDst;
}

/**
 * Rotates the given 3-by-3 matrix around the x-axis by the given
 * angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
function rotateX<T extends Mat3Arg = MatType>(m: Mat3Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[4]  = c * m10 + s * m20;
  newDst[5]  = c * m11 + s * m21;
  newDst[6]  = c * m12 + s * m22;
  newDst[8]  = c * m20 - s * m10;
  newDst[9]  = c * m21 - s * m11;
  newDst[10] = c * m22 - s * m12;

  if (m !== newDst) {
    newDst[ 0] = m[ 0];
    newDst[ 1] = m[ 1];
    newDst[ 2] = m[ 2];
  }

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which rotates around the y-axis by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
function rotationY<T extends Mat3Arg = MatType>(angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = c;  newDst[ 1] = 0;  newDst[ 2] = -s;
  newDst[ 4] = 0;  newDst[ 5] = 1;  newDst[ 6] =  0;
  newDst[ 8] = s;  newDst[ 9] = 0;  newDst[10] =  c;

  return newDst;
}

/**
 * Rotates the given 3-by-3 matrix around the y-axis by the given
 * angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
function rotateY<T extends Mat3Arg = MatType>(m: Mat3Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = c * m00 - s * m20;
  newDst[ 1] = c * m01 - s * m21;
  newDst[ 2] = c * m02 - s * m22;
  newDst[ 8] = c * m20 + s * m00;
  newDst[ 9] = c * m21 + s * m01;
  newDst[10] = c * m22 + s * m02;

  if (m !== newDst) {
    newDst[ 4] = m[ 4];
    newDst[ 5] = m[ 5];
    newDst[ 6] = m[ 6];
  }

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which rotates around the z-axis by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
const rotationZ = rotation;

/**
 * Rotates the given 3-by-3 matrix around the z-axis by the given
 * angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
const rotateZ = rotate;

/**
 * Creates a 3-by-3 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has two
 * entries.
 * @param v - A vector of
 *     2 entries specifying the factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
function scaling<T extends Mat3Arg = MatType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = v[0];  newDst[ 1] = 0;     newDst[ 2] = 0;
  newDst[ 4] = 0;     newDst[ 5] = v[1];  newDst[ 6] = 0;
  newDst[ 8] = 0;     newDst[ 9] = 0;     newDst[10] = 1;

  return newDst;
}

/**
 * Scales the given 3-by-3 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * two entries.
 * @param m - The matrix to be modified.
 * @param v - A vector of 2 entries specifying the
 *     factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
function scale<T extends Mat3Arg = MatType>(m: Mat3Arg, v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const v0 = v[0];
  const v1 = v[1];

  newDst[ 0] = v0 * m[0 * 4 + 0];
  newDst[ 1] = v0 * m[0 * 4 + 1];
  newDst[ 2] = v0 * m[0 * 4 + 2];

  newDst[ 4] = v1 * m[1 * 4 + 0];
  newDst[ 5] = v1 * m[1 * 4 + 1];
  newDst[ 6] = v1 * m[1 * 4 + 2];

  if (m !== newDst) {
    newDst[ 8] = m[ 8];
    newDst[ 9] = m[ 9];
    newDst[10] = m[10];
  }

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param v - A vector of
 *     3 entries specifying the factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
function scaling3D<T extends Mat3Arg = MatType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = v[0];  newDst[ 1] = 0;     newDst[ 2] = 0;
  newDst[ 4] = 0;     newDst[ 5] = v[1];  newDst[ 6] = 0;
  newDst[ 8] = 0;     newDst[ 9] = 0;     newDst[10] = v[2];

  return newDst;
}

/**
 * Scales the given 3-by-3 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param m - The matrix to be modified.
 * @param v - A vector of 3 entries specifying the
 *     factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
function scale3D<T extends Mat3Arg = MatType>(m: Mat3Arg, v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  newDst[ 0] = v0 * m[0 * 4 + 0];
  newDst[ 1] = v0 * m[0 * 4 + 1];
  newDst[ 2] = v0 * m[0 * 4 + 2];

  newDst[ 4] = v1 * m[1 * 4 + 0];
  newDst[ 5] = v1 * m[1 * 4 + 1];
  newDst[ 6] = v1 * m[1 * 4 + 2];

  newDst[ 8] = v2 * m[2 * 4 + 0];
  newDst[ 9] = v2 * m[2 * 4 + 1];
  newDst[10] = v2 * m[2 * 4 + 2];

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which scales uniformly in the X and Y dimensions
 * @param s - Amount to scale
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
function uniformScaling<T extends Mat3Arg = MatType>(s: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = s;  newDst[ 1] = 0;  newDst[ 2] = 0;
  newDst[ 4] = 0;  newDst[ 5] = s;  newDst[ 6] = 0;
  newDst[ 8] = 0;  newDst[ 9] = 0;  newDst[10] = 1;

  return newDst;
}

/**
 * Scales the given 3-by-3 matrix in the X and Y dimension by an amount
 * given.
 * @param m - The matrix to be modified.
 * @param s - Amount to scale.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
function uniformScale<T extends Mat3Arg = MatType>(m: Mat3Arg, s: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = s * m[0 * 4 + 0];
  newDst[ 1] = s * m[0 * 4 + 1];
  newDst[ 2] = s * m[0 * 4 + 2];

  newDst[ 4] = s * m[1 * 4 + 0];
  newDst[ 5] = s * m[1 * 4 + 1];
  newDst[ 6] = s * m[1 * 4 + 2];

  if (m !== newDst) {
    newDst[ 8] = m[ 8];
    newDst[ 9] = m[ 9];
    newDst[10] = m[10];
  }

  return newDst;
}

/**
 * Creates a 3-by-3 matrix which scales uniformly in each dimension
 * @param s - Amount to scale
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
function uniformScaling3D<T extends Mat3Arg = MatType>(s: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = s;  newDst[ 1] = 0;  newDst[ 2] = 0;
  newDst[ 4] = 0;  newDst[ 5] = s;  newDst[ 6] = 0;
  newDst[ 8] = 0;  newDst[ 9] = 0;  newDst[10] = s;

  return newDst;
}

/**
 * Scales the given 3-by-3 matrix in each dimension by an amount
 * given.
 * @param m - The matrix to be modified.
 * @param s - Amount to scale.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
function uniformScale3D<T extends Mat3Arg = MatType>(m: Mat3Arg, s: number, dst?: T) {
  const newDst = (dst ?? new Ctor(12)) as T;

  newDst[ 0] = s * m[0 * 4 + 0];
  newDst[ 1] = s * m[0 * 4 + 1];
  newDst[ 2] = s * m[0 * 4 + 2];

  newDst[ 4] = s * m[1 * 4 + 0];
  newDst[ 5] = s * m[1 * 4 + 1];
  newDst[ 6] = s * m[1 * 4 + 2];

  newDst[ 8] = s * m[2 * 4 + 0];
  newDst[ 9] = s * m[2 * 4 + 1];
  newDst[10] = s * m[2 * 4 + 2];

  return newDst;
}

return {
  clone,
  create,
  set,
  fromMat4,
  fromQuat,
  negate,
  copy,
  equalsApproximately,
  equals,
  identity,
  transpose,
  inverse,
  invert,
  determinant,
  mul,
  multiply,
  setTranslation,
  getTranslation,
  getAxis,
  setAxis,
  getScaling,
  get3DScaling,
  translation,
  translate,
  rotation,
  rotate,
  rotationX,
  rotateX,
  rotationY,
  rotateY,
  rotationZ,
  rotateZ,
  scaling,
  scale,
  uniformScaling,
  uniformScale,
  scaling3D,
  scale3D,
  uniformScaling3D,
  uniformScale3D,
};

}

type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;

const cache = new Map();

export function getAPI<T extends Mat4Arg = Float32Array>(Ctor: Mat3Ctor<T>) {
  let api = cache.get(Ctor);
  if (!api) {
    api = getAPIImpl<T>(Ctor);
    cache.set(Ctor, api);
  }
  return api as API<T>;
}
