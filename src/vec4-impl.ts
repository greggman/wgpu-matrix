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
import { Vec4Arg, Vec4Type } from './vec4';
import { Mat4Arg } from './mat4';
import { BaseArgType } from './types';

export { Vec4Arg, Vec4Type };

type Vec4Ctor<T extends Vec4Arg = Float32Array>  = new (n: number) => T;

/**
 * Generates am typed API for Vec4
 * */
function getAPIImpl<VecType extends Vec4Arg = Float32Array>(Ctor: Vec4Ctor<VecType>) {

/**
 * Creates a vec4; may be called with x, y, z to set initial values.
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param w - Initial w value.
 * @returns the created vector
 */
function create(x?: number, y?: number, z?: number, w?: number) {
  const newDst = new Ctor(4);
  if (x !== undefined) {
    newDst[0] = x;
    if (y !== undefined) {
      newDst[1] = y;
      if (z !== undefined) {
        newDst[2] = z;
        if (w !== undefined) {
          newDst[3] = w;
        }
      }
    }
  }
  return newDst;
}

/**
 * Creates a vec4; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param z - Initial w value.
 * @returns the created vector
 */
const fromValues = create;

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
function set<T extends Vec4Arg = VecType>(x: number, y: number, z: number, w: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = x;
  newDst[1] = y;
  newDst[2] = z;
  newDst[3] = w;

  return newDst;
}

/**
 * Applies Math.ceil to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the ceil of each element of v.
 */
function ceil<T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = Math.ceil(v[0]);
  newDst[1] = Math.ceil(v[1]);
  newDst[2] = Math.ceil(v[2]);
  newDst[3] = Math.ceil(v[3]);

  return newDst;
}

/**
 * Applies Math.floor to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the floor of each element of v.
 */
function floor<T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = Math.floor(v[0]);
  newDst[1] = Math.floor(v[1]);
  newDst[2] = Math.floor(v[2]);
  newDst[3] = Math.floor(v[3]);

  return newDst;
}

/**
 * Applies Math.round to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the round of each element of v.
 */
function round<T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = Math.round(v[0]);
  newDst[1] = Math.round(v[1]);
  newDst[2] = Math.round(v[2]);
  newDst[3] = Math.round(v[3]);

  return newDst;
}

/**
 * Clamp each element of vector between min and max
 * @param v - Operand vector.
 * @param max - Min value, default 0
 * @param min - Max value, default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that the clamped value of each element of v.
 */
function clamp<T extends Vec4Arg = VecType>(v: Vec4Arg, min = 0, max = 1, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = Math.min(max, Math.max(min, v[0]));
  newDst[1] = Math.min(max, Math.max(min, v[1]));
  newDst[2] = Math.min(max, Math.max(min, v[2]));
  newDst[3] = Math.min(max, Math.max(min, v[3]));

  return newDst;
}

/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a and b.
 */
function add<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] + b[0];
  newDst[1] = a[1] + b[1];
  newDst[2] = a[2] + b[2];
  newDst[3] = a[3] + b[3];

  return newDst;
}

/**
 * Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param scale - Amount to scale b
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a + b * scale.
 */
function addScaled<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, scale: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] + b[0] * scale;
  newDst[1] = a[1] + b[1] * scale;
  newDst[2] = a[2] + b[2] * scale;
  newDst[3] = a[3] + b[3] * scale;

  return newDst;
}

/**
 * Subtracts two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the difference of a and b.
 */
function subtract<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] - b[0];
  newDst[1] = a[1] - b[1];
  newDst[2] = a[2] - b[2];
  newDst[3] = a[3] - b[3];

  return newDst;
}

/**
 * Subtracts two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the difference of a and b.
 */
const sub = subtract;

/**
 * Check if 2 vectors are approximately equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are approximately equal
 */
function equalsApproximately(a: Vec4Arg, b: Vec4Arg): boolean {
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
function equals(a: Vec4Arg, b: Vec4Arg): boolean {
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
function lerp<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, t: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] + t * (b[0] - a[0]);
  newDst[1] = a[1] + t * (b[1] - a[1]);
  newDst[2] = a[2] + t * (b[2] - a[2]);
  newDst[3] = a[3] + t * (b[3] - a[3]);

  return newDst;
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
function lerpV<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, t: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] + t[0] * (b[0] - a[0]);
  newDst[1] = a[1] + t[1] * (b[1] - a[1]);
  newDst[2] = a[2] + t[2] * (b[2] - a[2]);
  newDst[3] = a[3] + t[3] * (b[3] - a[3]);

  return newDst;
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
function max<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = Math.max(a[0], b[0]);
  newDst[1] = Math.max(a[1], b[1]);
  newDst[2] = Math.max(a[2], b[2]);
  newDst[3] = Math.max(a[3], b[3]);

  return newDst;
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
function min<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = Math.min(a[0], b[0]);
  newDst[1] = Math.min(a[1], b[1]);
  newDst[2] = Math.min(a[2], b[2]);
  newDst[3] = Math.min(a[3], b[3]);

  return newDst;
}

/**
 * Multiplies a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
function mulScalar<T extends Vec4Arg = VecType>(v: Vec4Arg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = v[0] * k;
  newDst[1] = v[1] * k;
  newDst[2] = v[2] * k;
  newDst[3] = v[3] * k;

  return newDst;
}

/**
 * Multiplies a vector by a scalar. (same as mulScalar)
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
const scale = mulScalar;

/**
 * Divides a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
function divScalar<T extends Vec4Arg = VecType>(v: Vec4Arg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = v[0] / k;
  newDst[1] = v[1] / k;
  newDst[2] = v[2] / k;
  newDst[3] = v[3] / k;

  return newDst;
}

/**
 * Inverse a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
function inverse<T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = 1 / v[0];
  newDst[1] = 1 / v[1];
  newDst[2] = 1 / v[2];
  newDst[3] = 1 / v[3];

  return newDst;
}

/**
 * Invert a vector. (same as inverse)
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
const invert = inverse;

/**
 * Computes the dot product of two vectors
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns dot product
 */
function dot(a: Vec4Arg, b: Vec4Arg): number {
  return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]);
}

/**
 * Computes the length of vector
 * @param v - vector.
 * @returns length of vector.
 */
function length(v: Vec4Arg): number {
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
const len = length;

/**
 * Computes the square of the length of vector
 * @param v - vector.
 * @returns square of the length of vector.
 */
function lengthSq(v: Vec4Arg): number {
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
const lenSq = lengthSq;

/**
 * Computes the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns distance between a and b
 */
function distance(a: Vec4Arg, b: Vec4Arg): number {
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
const dist = distance;

/**
 * Computes the square of the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns square of the distance between a and b
 */
function distanceSq(a: Vec4Arg, b: Vec4Arg): number {
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
const distSq = distanceSq;

/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The normalized vector.
 */
function normalize<T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const v3 = v[3];

  const lenSq = v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3;
  const scale = lenSq > 0 ? 1 / Math.sqrt(lenSq) : 1;

  newDst[0] = v0 * scale;
  newDst[1] = v1 * scale;
  newDst[2] = v2 * scale;
  newDst[3] = v3 * scale;

  return newDst;
}

/**
 * Negates a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns -v.
 */
function negate<T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = -v[0];
  newDst[1] = -v[1];
  newDst[2] = -v[2];
  newDst[3] = -v[3];

  return newDst;
}

/**
 * Copies a vector. (same as {@link vec4.clone})
 * Also see {@link vec4.create} and {@link vec4.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
function copy<T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = v[0];
  newDst[1] = v[1];
  newDst[2] = v[2];
  newDst[3] = v[3];

  return newDst;
}

/**
 * Clones a vector. (same as {@link vec4.copy})
 * Also see {@link vec4.create} and {@link vec4.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
const clone = copy;

/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of products of entries of a and b.
 */
function multiply<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] * b[0];
  newDst[1] = a[1] * b[1];
  newDst[2] = a[2] * b[2];
  newDst[3] = a[3] * b[3];

  return newDst;
}

/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length. (same as mul)
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of products of entries of a and b.
 */
const mul = multiply;

/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of quotients of entries of a and b.
 */
function divide<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] / b[0];
  newDst[1] = a[1] / b[1];
  newDst[2] = a[2] / b[2];
  newDst[3] = a[3] / b[3];

  return newDst;
}

/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length. (same as divide)
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of quotients of entries of a and b.
 */
const div = divide;

/**
 * Zero's a vector
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The zeroed vector.
 */
function zero<T extends Vec4Arg = VecType>(dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = 0;
  newDst[1] = 0;
  newDst[2] = 0;
  newDst[3] = 0;

  return newDst;
}


/**
 * transform vec4 by 4x4 matrix
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional vec4 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
function transformMat4<T extends Vec4Arg = VecType>(v: Vec4Arg, m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const x = v[0];
  const y = v[1];
  const z = v[2];
  const w = v[3];

  newDst[0] = m[0] * x + m[4] * y + m[ 8] * z + m[12] * w;
  newDst[1] = m[1] * x + m[5] * y + m[ 9] * z + m[13] * w;
  newDst[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  newDst[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;

  return newDst;
}


/**
 * Treat a 4D vector as a direction and set it's length
 *
 * @param a The vec4 to lengthen
 * @param len The length of the resulting vector
 * @returns The lengthened vector
 */
function setLength<T extends Vec4Arg = VecType>(a: Vec4Arg, len: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;
  normalize(a, newDst);
  return mulScalar(newDst, len, newDst);
}

/**
 * Ensure a vector is not longer than a max length
 *
 * @param a The vec4 to limit
 * @param maxLen The longest length of the resulting vector
 * @returns The vector, shortened to maxLen if it's too long
 */
function truncate<T extends Vec4Arg = VecType>(a: Vec4Arg, maxLen: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  if (length(a) > maxLen) {
    return setLength(a, maxLen, newDst);
  }

  return copy(a, newDst);
}

/**
 * Return the vector exactly between 2 endpoint vectors
 *
 * @param a Endpoint 1
 * @param b Endpoint 2
 * @returns The vector exactly residing between endpoints 1 and 2
 */
function midpoint<T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;
  return lerp(a, b, 0.5, newDst);
}

return {
  create,
  fromValues,
  set,
  ceil,
  floor,
  round,
  clamp,
  add,
  addScaled,
  subtract,
  sub,
  equalsApproximately,
  equals,
  lerp,
  lerpV,
  max,
  min,
  mulScalar,
  scale,
  divScalar,
  inverse,
  invert,
  dot,
  length,
  len,
  lengthSq,
  lenSq,
  distance,
  dist,
  distanceSq,
  distSq,
  normalize,
  negate,
  copy,
  clone,
  multiply,
  mul,
  divide,
  div,
  zero,
  transformMat4,
  setLength,
  truncate,
  midpoint,
};
}

type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;

const cache = new Map();

/**
 *
 * Vec4 math functions.
 *
 * Almost all functions take an optional `newDst` argument. If it is not passed in the
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
 */
export function getAPI<T extends Mat4Arg = Float32Array>(Ctor: Vec4Ctor<T>) {
  let api = cache.get(Ctor);
  if (!api) {
    api = getAPIImpl<T>(Ctor);
    cache.set(Ctor, api);
  }
  return api as API<T>;
}

