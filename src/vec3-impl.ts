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
import { Vec3Arg, Vec3Type } from './vec3';
import { Mat3Arg } from './mat3';
import { Mat4Arg } from './mat4';
import { QuatArg } from './quat';
import { BaseArgType } from './types';

export { Vec3Arg, Vec3Type };

type Vec3Ctor<T extends Vec3Arg = Float32Array>  = new (n: number) => T;

/**
 * Generates am typed API for Vec3
 * */
function getAPIImpl<VecType extends Vec3Arg = Float32Array>(Ctor: Vec3Ctor<VecType>) {

/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @returns the created vector
 */
function create(x?: number, y?: number, z?: number) {
  const newDst = new Ctor(3);
  if (x !== undefined) {
    newDst[0] = x;
    if (y !== undefined) {
      newDst[1] = y;
      if (z !== undefined) {
        newDst[2] = z;
      }
    }
  }
  return newDst;
}

/**
 * Creates a vec3; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @returns the created vector
 */
const fromValues = create;

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
function set<T extends Vec3Arg = VecType>(x: number, y: number, z: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = x;
  newDst[1] = y;
  newDst[2] = z;

  return newDst;
}

/**
 * Applies Math.ceil to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the ceil of each element of v.
 */
function ceil<T extends Vec3Arg = VecType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = Math.ceil(v[0]);
  newDst[1] = Math.ceil(v[1]);
  newDst[2] = Math.ceil(v[2]);

  return newDst;
}

/**
 * Applies Math.floor to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the floor of each element of v.
 */
function floor<T extends Vec3Arg = VecType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = Math.floor(v[0]);
  newDst[1] = Math.floor(v[1]);
  newDst[2] = Math.floor(v[2]);

  return newDst;
}

/**
 * Applies Math.round to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the round of each element of v.
 */
function round<T extends Vec3Arg = VecType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = Math.round(v[0]);
  newDst[1] = Math.round(v[1]);
  newDst[2] = Math.round(v[2]);

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
function clamp<T extends Vec3Arg = VecType>(v: Vec3Arg, min = 0, max = 1, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = Math.min(max, Math.max(min, v[0]));
  newDst[1] = Math.min(max, Math.max(min, v[1]));
  newDst[2] = Math.min(max, Math.max(min, v[2]));

  return newDst;
}

/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a and b.
 */
function add<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = a[0] + b[0];
  newDst[1] = a[1] + b[1];
  newDst[2] = a[2] + b[2];

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
function addScaled<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, scale: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = a[0] + b[0] * scale;
  newDst[1] = a[1] + b[1] * scale;
  newDst[2] = a[2] + b[2] * scale;

  return newDst;
}

/**
 * Returns the angle in radians between two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns The angle in radians between the 2 vectors.
 */
function angle(a: Vec3Arg, b: Vec3Arg): number {
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
function subtract<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = a[0] - b[0];
  newDst[1] = a[1] - b[1];
  newDst[2] = a[2] - b[2];

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
function equalsApproximately(a: Vec3Arg, b: Vec3Arg): boolean {
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
function equals(a: Vec3Arg, b: Vec3Arg): boolean {
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
function lerp<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, t: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = a[0] + t * (b[0] - a[0]);
  newDst[1] = a[1] + t * (b[1] - a[1]);
  newDst[2] = a[2] + t * (b[2] - a[2]);

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
function lerpV<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, t: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = a[0] + t[0] * (b[0] - a[0]);
  newDst[1] = a[1] + t[1] * (b[1] - a[1]);
  newDst[2] = a[2] + t[2] * (b[2] - a[2]);

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
function max<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = Math.max(a[0], b[0]);
  newDst[1] = Math.max(a[1], b[1]);
  newDst[2] = Math.max(a[2], b[2]);

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
function min<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = Math.min(a[0], b[0]);
  newDst[1] = Math.min(a[1], b[1]);
  newDst[2] = Math.min(a[2], b[2]);

  return newDst;
}

/**
 * Multiplies a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
function mulScalar<T extends Vec3Arg = VecType>(v: Vec3Arg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = v[0] * k;
  newDst[1] = v[1] * k;
  newDst[2] = v[2] * k;

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
function divScalar<T extends Vec3Arg = VecType>(v: Vec3Arg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = v[0] / k;
  newDst[1] = v[1] / k;
  newDst[2] = v[2] / k;

  return newDst;
}

/**
 * Inverse a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
function inverse<T extends Vec3Arg = VecType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = 1 / v[0];
  newDst[1] = 1 / v[1];
  newDst[2] = 1 / v[2];

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
function cross<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  const t1 = a[2] * b[0] - a[0] * b[2];
  const t2 = a[0] * b[1] - a[1] * b[0];
  newDst[0] = a[1] * b[2] - a[2] * b[1];
  newDst[1] = t1;
  newDst[2] = t2;

  return newDst;
}

/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns dot product
 */
function dot(a: Vec3Arg, b: Vec3Arg): number {
  return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
}

/**
 * Computes the length of vector
 * @param v - vector.
 * @returns length of vector.
 */
function length(v: Vec3Arg): number {
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
const len = length;

/**
 * Computes the square of the length of vector
 * @param v - vector.
 * @returns square of the length of vector.
 */
function lengthSq(v: Vec3Arg): number {
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
const lenSq = lengthSq;

/**
 * Computes the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns distance between a and b
 */
function distance(a: Vec3Arg, b: Vec3Arg): number {
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
const dist = distance;

/**
 * Computes the square of the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns square of the distance between a and b
 */
function distanceSq(a: Vec3Arg, b: Vec3Arg): number {
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
const distSq = distanceSq;

/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The normalized vector.
 */
function normalize<T extends Vec3Arg = VecType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
  const scale = len > 0 ? 1 / len : len;

  newDst[0] = v0 * scale;
  newDst[1] = v1 * scale;
  newDst[2] = v2 * scale;

  return newDst;
}

/**
 * Negates a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns -v.
 */
function negate<T extends Vec3Arg = VecType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = -v[0];
  newDst[1] = -v[1];
  newDst[2] = -v[2];

  return newDst;
}

/**
 * Copies a vector. (same as {@link vec3.clone})
 * Also see {@link vec3.create} and {@link vec3.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
function copy<T extends Vec3Arg = VecType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = v[0];
  newDst[1] = v[1];
  newDst[2] = v[2];

  return newDst;
}

/**
 * Clones a vector. (same as {@link vec3.copy})
 * Also see {@link vec3.create} and {@link vec3.set}
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
function multiply<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = a[0] * b[0];
  newDst[1] = a[1] * b[1];
  newDst[2] = a[2] * b[2];

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
function divide<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = a[0] / b[0];
  newDst[1] = a[1] / b[1];
  newDst[2] = a[2] / b[2];

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
 * Creates a random vector
 * @param scale - Default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The random vector.
 */
function random<T extends Vec3Arg = VecType>(scale = 1, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  const angle = Math.random() * 2 * Math.PI;
  const z = Math.random() * 2 - 1;
  const zScale = Math.sqrt(1 - z * z) * scale;
  newDst[0] = Math.cos(angle) * zScale;
  newDst[1] = Math.sin(angle) * zScale;
  newDst[2] = z * scale;

  return newDst;
}

/**
 * Zero's a vector
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The zeroed vector.
 */
function zero<T extends Vec3Arg = VecType>(dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  newDst[0] = 0;
  newDst[1] = 0;
  newDst[2] = 0;

  return newDst;
}


/**
 * transform vec3 by 4x4 matrix
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional vec3 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
function transformMat4<T extends Vec3Arg = VecType>(v: Vec3Arg, m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  const x = v[0];
  const y = v[1];
  const z = v[2];
  const w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1;

  newDst[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  newDst[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  newDst[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;

  return newDst;
}

/**
 * Transform vec3 by upper 3x3 matrix inside 4x4 matrix.
 * @param v - The direction.
 * @param m - The matrix.
 * @param dst - optional vec3 to store result. If not passed a new one is created.
 * @returns The transformed vector.
 */
function transformMat4Upper3x3<T extends Vec3Arg = VecType>(v: Vec3Arg, m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  newDst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
  newDst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
  newDst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

  return newDst;
}

/**
 * Transforms vec3 by 3x3 matrix
 *
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional vec3 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
function transformMat3<T extends Vec3Arg = VecType>(v: Vec3Arg, m: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

  const x = v[0];
  const y = v[1];
  const z = v[2];

  newDst[0] = x * m[0] + y * m[4] + z * m[8];
  newDst[1] = x * m[1] + y * m[5] + z * m[9];
  newDst[2] = x * m[2] + y * m[6] + z * m[10];

  return newDst;
}

/**
 * Transforms vec3 by Quaternion
 * @param v - the vector to transform
 * @param q - the quaternion to transform by
 * @param dst - optional vec3 to store result. If not passed a new one is created.
 * @returns the transformed
 */
function transformQuat<T extends Vec3Arg = VecType>(v: Vec3Arg, q: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

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

  newDst[0] = x + uvX * w2 + (qy * uvZ - qz * uvY) * 2;
  newDst[1] = y + uvY * w2 + (qz * uvX - qx * uvZ) * 2;
  newDst[2] = z + uvZ * w2 + (qx * uvY - qy * uvX) * 2;

  return newDst;
}

/**
 * Returns the translation component of a 4-by-4 matrix as a vector with 3
 * entries.
 * @param m - The matrix.
 * @param dst - vector to hold result. If not passed a new one is created.
 * @returns The translation component of m.
 */
function getTranslation<T extends Vec3Arg = VecType>(m: Mat3Arg, dst?: T) {
    const newDst = (dst ?? new Ctor(3)) as T;
    newDst[0] = m[12];
    newDst[1] = m[13];
    newDst[2] = m[14];
    return newDst;
}
/**
 * Returns an axis of a 4x4 matrix as a vector with 3 entries
 * @param m - The matrix.
 * @param axis - The axis 0 = x, 1 = y, 2 = z;
 * @returns The axis component of m.
 */
function getAxis<T extends Vec3Arg = VecType>(m: Mat4Arg, axis: number, dst?: T) {
    const newDst = (dst ?? new Ctor(3)) as T;
    const off = axis * 4;
    newDst[0] = m[off + 0];
    newDst[1] = m[off + 1];
    newDst[2] = m[off + 2];
    return newDst;
}
/**
 * Returns the scaling component of the matrix
 * @param m - The Matrix
 * @param dst - The vector to set. If not passed a new one is created.
 */
function getScaling<T extends Vec3Arg = VecType>(m: Mat4Arg, dst?: T) {
    const newDst = (dst ?? new Ctor(3)) as T;
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
 * Rotate a 3D vector around the x-axis
 *
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @param dst - The vector to set. If not passed a new one is created.
 * @returns the rotated vector
 */
function rotateX<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, rad: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;
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
  newDst[0] = r[0] + b[0];
  newDst[1] = r[1] + b[1];
  newDst[2] = r[2] + b[2];

  return newDst;
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
function rotateY<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, rad: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;
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
  newDst[0] = r[0] + b[0];
  newDst[1] = r[1] + b[1];
  newDst[2] = r[2] + b[2];

  return newDst;
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
function rotateZ<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, rad: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;
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
  newDst[0] = r[0] + b[0];
  newDst[1] = r[1] + b[1];
  newDst[2] = r[2] + b[2];

  return newDst;
}

/**
 * Treat a 3D vector as a direction and set it's length
 *
 * @param a The vec3 to lengthen
 * @param len The length of the resulting vector
 * @returns The lengthened vector
 */
function setLength<T extends Vec3Arg = VecType>(a: Vec3Arg, len: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;
  normalize(a, newDst);
  return mulScalar(newDst, len, newDst);
}

/**
 * Ensure a vector is not longer than a max length
 *
 * @param a The vec3 to limit
 * @param maxLen The longest length of the resulting vector
 * @returns The vector, shortened to maxLen if it's too long
 */
function truncate<T extends Vec3Arg = VecType>(a: Vec3Arg, maxLen: number, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;

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
function midpoint<T extends Vec3Arg = VecType>(a: Vec3Arg, b: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(3)) as T;
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
  transformMat4Upper3x3,
  transformMat3,
  transformQuat,
  getTranslation,
  getAxis,
  getScaling,
  rotateX,
  rotateY,
  rotateZ,
  setLength,
  truncate,
  midpoint,
};

}

type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;

const cache = new Map();

export function getAPI<T extends Mat4Arg = Float32Array>(Ctor: Vec3Ctor<T>) {
  let api = cache.get(Ctor);
  if (!api) {
    api = getAPIImpl<T>(Ctor);
    cache.set(Ctor, api);
  }
  return api as API<T>;
}
