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
import { Mat3Arg } from './mat3';
import { Mat4Arg } from './mat4';
import { Vec2Arg, Vec2Type } from './vec2';
import { Vec3Arg } from './vec3';
import { BaseArgType } from './types';

export { Vec2Arg, Vec2Type };

type Vec2Ctor<T extends Vec2Arg = Float32Array>  = new (n: number) => T;

/**
 * Generates am typed API for Vec3
 */
function getAPIImpl<VecType extends Vec2Arg = Float32Array>(Ctor: Vec2Ctor<VecType>) {

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
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @returns the created vector
 */
function create(x = 0, y = 0) {
  const newDst = new Ctor(2);
  if (x !== undefined) {
    newDst[0] = x;
    if (y !== undefined) {
      newDst[1] = y;
    }
  }
  return newDst;
}

/**
 * Creates a Vec2; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @returns the created vector
 */
const fromValues = create;

/**
 * Sets the values of a Vec2
 * Also see {@link vec2.create} and {@link vec2.copy}
 *
 * @param x first value
 * @param y second value
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector with its elements set.
 */
function set<T extends Vec2Arg = VecType>(x: number, y: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = x;
  newDst[1] = y;

  return newDst;
}

/**
 * Applies Math.ceil to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the ceil of each element of v.
 */
function ceil<T extends Vec2Arg = VecType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = Math.ceil(v[0]);
  newDst[1] = Math.ceil(v[1]);

  return newDst;
}

/**
 * Applies Math.floor to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the floor of each element of v.
 */
function floor<T extends Vec2Arg = VecType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = Math.floor(v[0]);
  newDst[1] = Math.floor(v[1]);

  return newDst;
}

/**
 * Applies Math.round to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the round of each element of v.
 */
function round<T extends Vec2Arg = VecType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = Math.round(v[0]);
  newDst[1] = Math.round(v[1]);

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
function clamp<T extends Vec2Arg = VecType>(v: Vec2Arg, min = 0, max = 1, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = Math.min(max, Math.max(min, v[0]));
  newDst[1] = Math.min(max, Math.max(min, v[1]));

  return newDst;
}

/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a and b.
 */
function add<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = a[0] + b[0];
  newDst[1] = a[1] + b[1];

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
function addScaled<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, scale: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = a[0] + b[0] * scale;
  newDst[1] = a[1] + b[1] * scale;

  return newDst;
}

/**
 * Returns the angle in radians between two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns The angle in radians between the 2 vectors.
 */
function angle(a: Vec2Arg, b: Vec2Arg): number {
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
function subtract<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = a[0] - b[0];
  newDst[1] = a[1] - b[1];

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
function equalsApproximately(a: Vec2Arg, b: Vec2Arg): boolean {
  return Math.abs(a[0] - b[0]) < utils.EPSILON &&
         Math.abs(a[1] - b[1]) < utils.EPSILON;
}

/**
 * Check if 2 vectors are exactly equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are exactly equal
 */
function equals(a: Vec2Arg, b: Vec2Arg): boolean {
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
function lerp<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, t: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = a[0] + t * (b[0] - a[0]);
  newDst[1] = a[1] + t * (b[1] - a[1]);

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
function lerpV<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, t: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = a[0] + t[0] * (b[0] - a[0]);
  newDst[1] = a[1] + t[1] * (b[1] - a[1]);

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
function max<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = Math.max(a[0], b[0]);
  newDst[1] = Math.max(a[1], b[1]);

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
function min<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = Math.min(a[0], b[0]);
  newDst[1] = Math.min(a[1], b[1]);

  return newDst;
}

/**
 * Multiplies a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
function mulScalar<T extends Vec2Arg = VecType>(v: Vec2Arg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = v[0] * k;
  newDst[1] = v[1] * k;

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
function divScalar<T extends Vec2Arg = VecType>(v: Vec2Arg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = v[0] / k;
  newDst[1] = v[1] / k;

  return newDst;
}

/**
 * Inverse a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
function inverse<T extends Vec2Arg = VecType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = 1 / v[0];
  newDst[1] = 1 / v[1];

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
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of a cross b.
 */
function cross<T extends Vec3Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;
  const z = a[0] * b[1] - a[1] * b[0];
  newDst[0] = 0;
  newDst[1] = 0;
  newDst[2] = z;

  return newDst;
}

/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns dot product
 */
function dot(a: Vec2Arg, b: Vec2Arg): number {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the length of vector
 * @param v - vector.
 * @returns length of vector.
 */
function length(v: Vec2Arg): number {
  const v0 = v[0];
  const v1 = v[1];
  return Math.sqrt(v0 * v0 + v1 * v1);
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
function lengthSq(v: Vec2Arg): number {
  const v0 = v[0];
  const v1 = v[1];
  return v0 * v0 + v1 * v1;
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
function distance(a: Vec2Arg, b: Vec2Arg): number {
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
const dist = distance;

/**
 * Computes the square of the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns square of the distance between a and b
 */
function distanceSq(a: Vec2Arg, b: Vec2Arg): number {
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
const distSq = distanceSq;

/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The normalized vector.
 */
function normalize<T extends Vec2Arg = VecType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  const v0 = v[0];
  const v1 = v[1];

  const lenSq = v0 * v0 + v1 * v1;
  const scale = lenSq > 0 ? 1 / Math.sqrt(lenSq) : 1;

  newDst[0] = v0 * scale;
  newDst[1] = v1 * scale;

  return newDst;
}

/**
 * Negates a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns -v.
 */
function negate<T extends Vec2Arg = VecType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = -v[0];
  newDst[1] = -v[1];

  return newDst;
}

/**
 * Copies a vector. (same as {@link vec2.clone})
 * Also see {@link vec2.create} and {@link vec2.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
function copy<T extends Vec2Arg = VecType>(v: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = v[0];
  newDst[1] = v[1];

  return newDst;
}

/**
 * Clones a vector. (same as {@link vec2.copy})
 * Also see {@link vec2.create} and {@link vec2.set}
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
function multiply<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = a[0] * b[0];
  newDst[1] = a[1] * b[1];

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
function divide<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = a[0] / b[0];
  newDst[1] = a[1] / b[1];

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
 * Creates a random unit vector * scale
 * @param scale - Default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The random vector.
 */
function random<T extends Vec2Arg = VecType>(scale = 1, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  const angle = Math.random() * 2 * Math.PI;
  newDst[0] = Math.cos(angle) * scale;
  newDst[1] = Math.sin(angle) * scale;

  return newDst;
}

/**
 * Zero's a vector
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The zeroed vector.
 */
function zero<T extends Vec2Arg = VecType>(dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  newDst[0] = 0;
  newDst[1] = 0;

  return newDst;
}


/**
 * Transform Vec2 by 4x4 matrix
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional Vec2 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
function transformMat4<T extends Vec2Arg = VecType>(v: Vec2Arg, m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  const x = v[0];
  const y = v[1];

  newDst[0] = x * m[0] + y * m[4] + m[12];
  newDst[1] = x * m[1] + y * m[5] + m[13];

  return newDst;
}

/**
 * Transform Vec2 by 3x3 matrix
 *
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional Vec2 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
function transformMat3<T extends Vec2Arg = VecType>(v: Vec2Arg, m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  const x = v[0];
  const y = v[1];

  newDst[0] = m[0] * x + m[4] * y + m[8];
  newDst[1] = m[1] * x + m[5] * y + m[9];

  return newDst;
}

/**
 * Rotate a 2D vector
 *
 * @param a The vec2 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 * @returns the rotated vector
 */
function rotate<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, rad: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

  // Translate point to the origin
  const p0 = a[0] - b[0];
  const p1 = a[1] - b[1];
  const sinC = Math.sin(rad);
  const cosC = Math.cos(rad);

  //perform rotation and translate to correct position
  newDst[0] = p0 * cosC - p1 * sinC + b[0];
  newDst[1] = p0 * sinC + p1 * cosC + b[1];

  return newDst;
}

/**
 * Treat a 2D vector as a direction and set it's length
 *
 * @param a The vec2 to lengthen
 * @param len The length of the resulting vector
 * @returns The lengthened vector
 */
function setLength<T extends Vec2Arg = VecType>(a: Vec2Arg, len: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;
  normalize(a, newDst);
  return mulScalar(newDst, len, newDst);
}

/**
 * Ensure a vector is not longer than a max length
 *
 * @param a The vec2 to limit
 * @param maxLen The longest length of the resulting vector
 * @returns The vector, shortened to maxLen if it's too long
 */
function truncate<T extends Vec2Arg = VecType>(a: Vec2Arg, maxLen: number, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;

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
function midpoint<T extends Vec2Arg = VecType>(a: Vec2Arg, b: Vec2Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(2)) as T;
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
  angle,
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
  cross,
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
  random,
  zero,
  transformMat4,
  transformMat3,
  rotate,
  setLength,
  truncate,
  midpoint,
};
}

type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;

const cache = new Map();

export function getAPI<T extends Vec2Arg = Float32Array>(Ctor: Vec2Ctor<T>) {
  let api = cache.get(Ctor);
  if (!api) {
    api = getAPIImpl<T>(Ctor);
    cache.set(Ctor, api);
  }
  return api as API<T>;
}
