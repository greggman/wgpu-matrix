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
import { QuatArg, Quat } from './quat';
import { Mat3Arg } from './mat3.js';
import { Mat4Arg } from './mat4.js';
import { Vec3Arg } from './vec3.js';
import { getAPI as getVec3API } from './vec3-impl';
import { BaseArgType } from './types';

export { QuatArg, Quat };

type QuatCtor<T extends QuatArg = Float32Array>  = new (n: number) => T;

export type RotationOrder =  'xyz' |  'xzy' |  'yxz' |  'yzx' |  'zxy' |  'zyx';

/**
 * Generates am typed API for Qud
 * @ignore
 */
function getAPIImpl<QuatType extends QuatArg = Float32Array>(Ctor: QuatCtor<QuatType>) {
  const vec3 = getVec3API<QuatType>(Ctor);

/**
 * Creates a quat4; may be called with x, y, z to set initial values.
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
 * Creates a Quat; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param z - Initial w value.
 * @returns the created vector
 */
const fromValues = create;

/**
 * Sets the values of a Quat
 * Also see {@link quat.create} and {@link quat.copy}
 *
 * @param x first value
 * @param y second value
 * @param z third value
 * @param w fourth value
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector with its elements set.
 */
function set<T extends QuatArg = QuatType>(x: number, y: number, z: number, w: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = x;
  newDst[1] = y;
  newDst[2] = z;
  newDst[3] = w;

  return newDst;
}

/**
 * Sets a quaternion from the given angle and  axis,
 * then returns it.
 *
 * @param axis - the axis to rotate around
 * @param angleInRadians - the angle
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The quaternion that represents the given axis and angle
 **/
function fromAxisAngle<T extends QuatArg = QuatType>(axis: Vec3Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const halfAngle = angleInRadians * 0.5;
  const s = Math.sin(halfAngle);

  newDst[0] = s * axis[0];
  newDst[1] = s * axis[1];
  newDst[2] = s * axis[2];
  newDst[3] = Math.cos(halfAngle);

  return newDst;
}

/**
 * Gets the rotation axis and angle
 * @param q - quaternion to compute from
 * @param dst - Vec3 to hold result. If not passed in a new one is created.
 * @return angle and axis
 */
function toAxisAngle<T extends Vec3Arg = QuatType>(q: QuatArg, dst?: T): { angle: number, axis: T } {
  const newDst = (dst ?? vec3.create(3)) as T;

  const angle = Math.acos(q[3]) * 2;
  const s = Math.sin(angle * 0.5);
  if (s > utils.EPSILON) {
    newDst[0] = q[0] / s;
    newDst[1] = q[1] / s;
    newDst[2] = q[2] / s;
  } else {
    newDst[0] = 1;
    newDst[1] = 0;
    newDst[2] = 0;
  }

  return { angle, axis: newDst };
}

/**
 * Returns the angle in degrees between two rotations a and b.
 * @param a - quaternion a
 * @param b - quaternion b
 * @return angle in radians between the two quaternions
 */
function angle(a: QuatArg, b: QuatArg) {
  const d = dot(a, b);
  return Math.acos(2 * d * d - 1);
}

/**
 * Multiplies two quaternions
 *
 * @param a - the first quaternion
 * @param b - the second quaternion
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
function multiply<T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const aw = a[3];

  const bx = b[0];
  const by = b[1];
  const bz = b[2];
  const bw = b[3];

  newDst[0] = ax * bw + aw * bx + ay * bz - az * by;
  newDst[1] = ay * bw + aw * by + az * bx - ax * bz;
  newDst[2] = az * bw + aw * bz + ax * by - ay * bx;
  newDst[3] = aw * bw - ax * bx - ay * by - az * bz;

  return newDst;
}

/**
 * Multiplies two quaternions
 *
 * @param a - the first quaternion
 * @param b - the second quaternion
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
const mul = multiply;

/**
 * Rotates the given quaternion around the X axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
function rotateX<T extends QuatArg = QuatType>(q: QuatArg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const halfAngle = angleInRadians * 0.5;

  const qx = q[0];
  const qy = q[1];
  const qz = q[2];
  const qw = q[3];

  const bx = Math.sin(halfAngle);
  const bw = Math.cos(halfAngle);

  newDst[0] = qx * bw + qw * bx;
  newDst[1] = qy * bw + qz * bx;
  newDst[2] = qz * bw - qy * bx;
  newDst[3] = qw * bw - qx * bx;

  return newDst;
}

/**
 * Rotates the given quaternion around the Y axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
function rotateY<T extends QuatArg = QuatType>(q: QuatArg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const halfAngle = angleInRadians * 0.5;

  const qx = q[0];
  const qy = q[1];
  const qz = q[2];
  const qw = q[3];

  const by = Math.sin(halfAngle);
  const bw = Math.cos(halfAngle);

  newDst[0] = qx * bw - qz * by;
  newDst[1] = qy * bw + qw * by;
  newDst[2] = qz * bw + qx * by;
  newDst[3] = qw * bw - qy * by;

  return newDst;
}

/**
 * Rotates the given quaternion around the Z axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
function rotateZ<T extends QuatArg = QuatType>(q: QuatArg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const halfAngle = angleInRadians * 0.5;

  const qx = q[0];
  const qy = q[1];
  const qz = q[2];
  const qw = q[3];

  const bz = Math.sin(halfAngle);
  const bw = Math.cos(halfAngle);

  newDst[0] = qx * bw + qy * bz;
  newDst[1] = qy * bw - qx * bz;
  newDst[2] = qz * bw + qw * bz;
  newDst[3] = qw * bw - qz * bz;

  return newDst;
}

/**
 * Spherically linear interpolate between two quaternions
 *
 * @param a - starting value
 * @param b - ending value
 * @param t - value where 0 = a and 1 = b
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
function slerp<T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, t: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const aw = a[3];

  let bx = b[0];
  let by = b[1];
  let bz = b[2];
  let bw = b[3];

  let cosOmega = ax * bx + ay * by + az * bz + aw * bw;

  if (cosOmega < 0) {
    cosOmega = -cosOmega;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }

  let scale0;
  let scale1;

  if (1.0 - cosOmega > utils.EPSILON) {
    const omega = Math.acos(cosOmega);
    const sinOmega = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinOmega;
    scale1 = Math.sin(t * omega) / sinOmega;
  } else {
    scale0 = 1.0 - t;
    scale1 = t;
  }

  newDst[0] = scale0 * ax + scale1 * bx;
  newDst[1] = scale0 * ay + scale1 * by;
  newDst[2] = scale0 * az + scale1 * bz;
  newDst[3] = scale0 * aw + scale1 * bw;

  return newDst;
}

/**
 * Compute the inverse of a quaternion
 *
 * @param q - quaternion to compute the inverse of
 * @returns A quaternion that is the result of a * b
 */
function inverse<T extends QuatArg = QuatType>(q: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const a0 = q[0];
  const a1 = q[1];
  const a2 = q[2];
  const a3 = q[3];

  const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  const invDot = dot ? 1 / dot : 0;

  newDst[0] = -a0 * invDot;
  newDst[1] = -a1 * invDot;
  newDst[2] = -a2 * invDot;
  newDst[3] =  a3 * invDot;

  return newDst;
}

/**
 * Compute the conjugate of a quaternion
 * For quaternions with a magnitude of 1 (a unit quaternion)
 * this returns the same as the inverse but is faster to calculate.
 *
 * @param q - quaternion to compute the conjugate of.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The conjugate of q
 */
function conjugate<T extends QuatArg = QuatType>(q: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = -q[0];
  newDst[1] = -q[1];
  newDst[2] = -q[2];
  newDst[3] =  q[3];

  return newDst;
}

/**
 * Creates a quaternion from the given rotation matrix.
 *
 * The created quaternion is not normalized.
 *
 * @param m - rotation matrix
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns the result
 */
function fromMat<T extends QuatArg = QuatType>(m: Mat3Arg | Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  /*
  0 1 2
  3 4 5
  6 7 8

  0 1 2
  4 5 6
  8 9 10
   */

  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  const trace = m[0] + m[5] + m[10];

  if (trace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    const root = Math.sqrt(trace + 1); // 2w
    newDst[3] = 0.5 * root;
    const invRoot = 0.5 / root; // 1/(4w)

    newDst[0] = (m[6] - m[9]) * invRoot;
    newDst[1] = (m[8] - m[2]) * invRoot;
    newDst[2] = (m[1] - m[4]) * invRoot;
  } else {
    // |w| <= 1/2
    let i = 0;

    if (m[5] > m[0]) {
      i = 1;
    }
    if (m[10] > m[i * 4 + i]) {
      i = 2;
    }

    const j = (i + 1) % 3;
    const k = (i + 2) % 3;

    const root = Math.sqrt(m[i * 4 + i] - m[j * 4 + j] - m[k * 4 + k] + 1.0);
    newDst[i] = 0.5 * root;

    const invRoot = 0.5 / root;

    newDst[3] = (m[j * 4 + k] - m[k * 4 + j]) * invRoot;
    newDst[j] = (m[j * 4 + i] + m[i * 4 + j]) * invRoot;
    newDst[k] = (m[k * 4 + i] + m[i * 4 + k]) * invRoot;
  }

  return newDst;
}

/**
 * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
 *
 * @param xAngleInRadians - angle to rotate around X axis in radians.
 * @param yAngleInRadians - angle to rotate around Y axis in radians.
 * @param zAngleInRadians - angle to rotate around Z axis in radians.
 * @param order - order to apply euler angles
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion representing the same rotation as the euler angles applied in the given order
 */
function fromEuler<T extends QuatArg = QuatType>(
    xAngleInRadians: number,
    yAngleInRadians: number,
    zAngleInRadians: number,
    order: RotationOrder,
    dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const xHalfAngle = xAngleInRadians * 0.5;
  const yHalfAngle = yAngleInRadians * 0.5;
  const zHalfAngle = zAngleInRadians * 0.5;

  const sx = Math.sin(xHalfAngle);
  const cx = Math.cos(xHalfAngle);
  const sy = Math.sin(yHalfAngle);
  const cy = Math.cos(yHalfAngle);
  const sz = Math.sin(zHalfAngle);
  const cz = Math.cos(zHalfAngle);

  switch (order) {
    case 'xyz':
      newDst[0] = sx * cy * cz + cx * sy * sz;
      newDst[1] = cx * sy * cz - sx * cy * sz;
      newDst[2] = cx * cy * sz + sx * sy * cz;
      newDst[3] = cx * cy * cz - sx * sy * sz;
      break;

    case 'xzy':
      newDst[0] = sx * cy * cz - cx * sy * sz;
      newDst[1] = cx * sy * cz - sx * cy * sz;
      newDst[2] = cx * cy * sz + sx * sy * cz;
      newDst[3] = cx * cy * cz + sx * sy * sz;
      break;

    case 'yxz':
      newDst[0] = sx * cy * cz + cx * sy * sz;
      newDst[1] = cx * sy * cz - sx * cy * sz;
      newDst[2] = cx * cy * sz - sx * sy * cz;
      newDst[3] = cx * cy * cz + sx * sy * sz;
      break;

    case 'yzx':
      newDst[0] = sx * cy * cz + cx * sy * sz;
      newDst[1] = cx * sy * cz + sx * cy * sz;
      newDst[2] = cx * cy * sz - sx * sy * cz;
      newDst[3] = cx * cy * cz - sx * sy * sz;
      break;

    case 'zxy':
      newDst[0] = sx * cy * cz - cx * sy * sz;
      newDst[1] = cx * sy * cz + sx * cy * sz;
      newDst[2] = cx * cy * sz + sx * sy * cz;
      newDst[3] = cx * cy * cz - sx * sy * sz;
      break;

    case 'zyx':
      newDst[0] = sx * cy * cz - cx * sy * sz;
      newDst[1] = cx * sy * cz + sx * cy * sz;
      newDst[2] = cx * cy * sz - sx * sy * cz;
      newDst[3] = cx * cy * cz + sx * sy * sz;
      break;

    default:
      throw new Error(`Unknown rotation order: ${order}`);
  }

  return newDst;
}

/**
 * Copies a quaternion. (same as {@link quat.clone})
 * Also see {@link quat.create} and {@link quat.set}
 * @param q - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is a copy of q
 */
function copy<T extends QuatArg = QuatType>(q: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = q[0];
  newDst[1] = q[1];
  newDst[2] = q[2];
  newDst[3] = q[3];

  return newDst;
}

/**
 * Clones a quaternion. (same as {@link quat.copy})
 * Also see {@link quat.create} and {@link quat.set}
 * @param q - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A copy of q.
 */
const clone = copy;

/**
 * Adds two quaternions; assumes a and b have the same dimension.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the sum of a and b.
 */
function add<T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] + b[0];
  newDst[1] = a[1] + b[1];
  newDst[2] = a[2] + b[2];
  newDst[3] = a[3] + b[3];

  return newDst;
}

/**
 * Subtracts two quaternions.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the difference of a and b.
 */
function subtract<T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] - b[0];
  newDst[1] = a[1] - b[1];
  newDst[2] = a[2] - b[2];
  newDst[3] = a[3] - b[3];

  return newDst;
}

/**
 * Subtracts two quaternions.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the difference of a and b.
 */
const sub = subtract;

/**
 * Multiplies a quaternion by a scalar.
 * @param v - The quaternion.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
function mulScalar<T extends QuatArg = QuatType>(v: QuatArg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = v[0] * k;
  newDst[1] = v[1] * k;
  newDst[2] = v[2] * k;
  newDst[3] = v[3] * k;

  return newDst;
}

/**
 * Multiplies a quaternion by a scalar. (same as mulScalar)
 * @param v - The quaternion.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
const scale = mulScalar;

/**
 * Divides a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
function divScalar<T extends QuatArg = QuatType>(v: QuatArg, k: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = v[0] / k;
  newDst[1] = v[1] / k;
  newDst[2] = v[2] / k;
  newDst[3] = v[3] / k;

  return newDst;
}

/**
 * Computes the dot product of two quaternions
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns dot product
 */
function dot(a: QuatArg, b: QuatArg): number {
  return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]);
}

/**
 * Performs linear interpolation on two quaternions.
 * Given quaternions a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param t - Interpolation coefficient.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The linear interpolated result.
 */
function lerp<T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, t: number, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = a[0] + t * (b[0] - a[0]);
  newDst[1] = a[1] + t * (b[1] - a[1]);
  newDst[2] = a[2] + t * (b[2] - a[2]);
  newDst[3] = a[3] + t * (b[3] - a[3]);

  return newDst;
}

/**
 * Computes the length of quaternion
 * @param v - quaternion.
 * @returns length of quaternion.
 */
function length(v: QuatArg): number {
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const v3 = v[3];
  return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
}

/**
 * Computes the length of quaternion (same as length)
 * @param v - quaternion.
 * @returns length of quaternion.
 */
const len = length;

/**
 * Computes the square of the length of quaternion
 * @param v - quaternion.
 * @returns square of the length of quaternion.
 */
function lengthSq(v: QuatArg): number {
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const v3 = v[3];
  return v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3;
}

/**
 * Computes the square of the length of quaternion (same as lengthSq)
 * @param v - quaternion.
 * @returns square of the length of quaternion.
 */
const lenSq = lengthSq;

/**
 * Divides a quaternion by its Euclidean length and returns the quotient.
 * @param v - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The normalized quaternion.
 */
function normalize<T extends QuatArg = QuatType>(v: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const v3 = v[3];
  const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);

  if (len > 0.00001) {
    newDst[0] = v0 / len;
    newDst[1] = v1 / len;
    newDst[2] = v2 / len;
    newDst[3] = v3 / len;
  } else {
    newDst[0] = 0;
    newDst[1] = 0;
    newDst[2] = 0;
    newDst[3] = 0;
  }

  return newDst;
}

/**
 * Check if 2 quaternions are approximately equal
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns true if quaternions are approximately equal
 */
function equalsApproximately(a: QuatArg, b: QuatArg): boolean {
  return Math.abs(a[0] - b[0]) < utils.EPSILON &&
         Math.abs(a[1] - b[1]) < utils.EPSILON &&
         Math.abs(a[2] - b[2]) < utils.EPSILON &&
         Math.abs(a[3] - b[3]) < utils.EPSILON;
}

/**
 * Check if 2 quaternions are exactly equal
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns true if quaternions are exactly equal
 */
function equals(a: QuatArg, b: QuatArg): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Creates an identity quaternion
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns an identity quaternion
 */
function identity<T extends QuatArg = QuatType>(dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  newDst[0] = 0;
  newDst[1] = 0;
  newDst[2] = 0;
  newDst[3] = 1;

  return newDst;
}

const tempVec3 = vec3.create();
const xUnitVec3 = vec3.create();
const yUnitVec3 = vec3.create();

/**
 * Computes a quaternion to represent the shortest rotation from one vector to another.
 *
 * @param aUnit - the start vector
 * @param bUnit - the end vector
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns the result
 */
function rotationTo<T extends QuatArg = QuatType>(aUnit: Vec3Arg, bUnit: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  const dot = vec3.dot(aUnit, bUnit);
  if (dot < -0.999999) {
    vec3.cross(xUnitVec3, aUnit, tempVec3);
    if (vec3.len(tempVec3) < 0.000001) {
      vec3.cross(yUnitVec3, aUnit, tempVec3);
    }

    vec3.normalize(tempVec3, tempVec3);
    fromAxisAngle(tempVec3, Math.PI, newDst);

    return newDst;
  } else if (dot > 0.999999) {
    newDst[0] = 0;
    newDst[1] = 0;
    newDst[2] = 0;
    newDst[3] = 1;

    return newDst;
  } else {
    vec3.cross(aUnit, bUnit, tempVec3);

    newDst[0] = tempVec3[0];
    newDst[1] = tempVec3[1];
    newDst[2] = tempVec3[2];
    newDst[3] = 1 + dot;

    return normalize(newDst, newDst);
  }
}

const tempQuat1 = new Ctor(4);
const tempQuat2 = new Ctor(4);

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param a - the first quaternion
 * @param b - the second quaternion
 * @param c - the third quaternion
 * @param d - the fourth quaternion
 * @param t - Interpolation coefficient 0 to 1
 * @returns result
 */
function sqlerp<T extends QuatArg = QuatType>(
    a: QuatArg,
    b: QuatArg,
    c: QuatArg,
    d: QuatArg,
    t: number,
    dst?: T) {
  const newDst = (dst ?? new Ctor(4)) as T;

  slerp(a, d, t, tempQuat1);
  slerp(b, c, t, tempQuat2);
  slerp(tempQuat1, tempQuat2, 2 * t * (1 - t), newDst);

  return newDst;
}

return {
  create,
  fromValues,
  set,
  fromAxisAngle,
  toAxisAngle,
  angle,
  multiply,
  mul,
  rotateX,
  rotateY,
  rotateZ,
  slerp,
  inverse,
  conjugate,
  fromMat,
  fromEuler,
  copy,
  clone,
  add,
  subtract,
  sub,
  mulScalar,
  scale,
  divScalar,
  dot,
  lerp,
  length,
  len,
  lengthSq,
  lenSq,
  normalize,
  equalsApproximately,
  equals,
  identity,
  rotationTo,
  sqlerp,
};

}

type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;

const cache = new Map();

/**
 *
 * Quat4 math functions.
 *
 * Almost all functions take an optional `newDst` argument. If it is not passed in the
 * functions will create a new `Quat4`. In other words you can do this
 *
 *     const v = quat4.cross(v1, v2);  // Creates a new Quat4 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = quat4.create();
 *     quat4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     quat4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
export function getAPI<T extends QuatArg = Float32Array>(Ctor: QuatCtor<T>) {
  let api = cache.get(Ctor);
  if (!api) {
    api = getAPIImpl<T>(Ctor);
    cache.set(Ctor, api);
  }
  return api as API<T>;
}
