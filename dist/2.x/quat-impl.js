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
import { create, setDefaultType, QuatType } from './quat';
import * as vec3 from './vec3-impl.js';
export { create, setDefaultType };
/**
 * Creates a Quat; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param z - Initial w value.
 * @returns the created vector
 */
export const fromValues = create;
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
export function set(x, y, z, w, dst) {
    dst = dst || new QuatType(4);
    dst[0] = x;
    dst[1] = y;
    dst[2] = z;
    dst[3] = w;
    return dst;
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
export function fromAxisAngle(axis, angleInRadians, dst) {
    dst = dst || new QuatType(4);
    const halfAngle = angleInRadians * 0.5;
    const s = Math.sin(halfAngle);
    dst[0] = s * axis[0];
    dst[1] = s * axis[1];
    dst[2] = s * axis[2];
    dst[3] = Math.cos(halfAngle);
    return dst;
}
/**
 * Gets the rotation axis and angle
 * @param q - quaternion to compute from
 * @param dst - Vec3 to hold result. If not passed in a new one is created.
 * @return angle and axis
 */
export function toAxisAngle(q, dst) {
    dst = dst || vec3.create(4);
    const angle = Math.acos(q[3]) * 2;
    const s = Math.sin(angle * 0.5);
    if (s > utils.EPSILON) {
        dst[0] = q[0] / s;
        dst[1] = q[1] / s;
        dst[2] = q[2] / s;
    }
    else {
        dst[0] = 1;
        dst[1] = 0;
        dst[2] = 0;
    }
    return { angle, axis: dst };
}
/**
 * Returns the angle in degrees between two rotations a and b.
 * @param a - quaternion a
 * @param b - quaternion b
 * @return angle in radians between the two quaternions
 */
export function angle(a, b) {
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
export function multiply(a, b, dst) {
    dst = dst || new QuatType(4);
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const aw = a[3];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    const bw = b[3];
    dst[0] = ax * bw + aw * bx + ay * bz - az * by;
    dst[1] = ay * bw + aw * by + az * bx - ax * bz;
    dst[2] = az * bw + aw * bz + ax * by - ay * bx;
    dst[3] = aw * bw - ax * bx - ay * by - az * bz;
    return dst;
}
/**
 * Multiplies two quaternions
 *
 * @param a - the first quaternion
 * @param b - the second quaternion
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export const mul = multiply;
/**
 * Rotates the given quaternion around the X axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export function rotateX(q, angleInRadians, dst) {
    dst = dst || new QuatType(4);
    const halfAngle = angleInRadians * 0.5;
    const qx = q[0];
    const qy = q[1];
    const qz = q[2];
    const qw = q[3];
    const bx = Math.sin(halfAngle);
    const bw = Math.cos(halfAngle);
    dst[0] = qx * bw + qw * bx;
    dst[1] = qy * bw + qz * bx;
    dst[2] = qz * bw - qy * bx;
    dst[3] = qw * bw - qx * bx;
    return dst;
}
/**
 * Rotates the given quaternion around the Y axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export function rotateY(q, angleInRadians, dst) {
    dst = dst || new QuatType(4);
    const halfAngle = angleInRadians * 0.5;
    const qx = q[0];
    const qy = q[1];
    const qz = q[2];
    const qw = q[3];
    const by = Math.sin(halfAngle);
    const bw = Math.cos(halfAngle);
    dst[0] = qx * bw - qz * by;
    dst[1] = qy * bw + qw * by;
    dst[2] = qz * bw + qx * by;
    dst[3] = qw * bw - qy * by;
    return dst;
}
/**
 * Rotates the given quaternion around the Z axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export function rotateZ(q, angleInRadians, dst) {
    dst = dst || new QuatType(4);
    const halfAngle = angleInRadians * 0.5;
    const qx = q[0];
    const qy = q[1];
    const qz = q[2];
    const qw = q[3];
    const bz = Math.sin(halfAngle);
    const bw = Math.cos(halfAngle);
    dst[0] = qx * bw + qy * bz;
    dst[1] = qy * bw - qx * bz;
    dst[2] = qz * bw + qw * bz;
    dst[3] = qw * bw - qz * bz;
    return dst;
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
export function slerp(a, b, t, dst) {
    dst = dst || new QuatType(4);
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
    }
    else {
        scale0 = 1.0 - t;
        scale1 = t;
    }
    dst[0] = scale0 * ax + scale1 * bx;
    dst[1] = scale0 * ay + scale1 * by;
    dst[2] = scale0 * az + scale1 * bz;
    dst[3] = scale0 * aw + scale1 * bw;
    return dst;
}
/**
 * Compute the inverse of a quaternion
 *
 * @param q - quaternion to compute the inverse of
 * @returns A quaternion that is the result of a * b
 */
export function inverse(q, dst) {
    dst = dst || new QuatType(4);
    const a0 = q[0];
    const a1 = q[1];
    const a2 = q[2];
    const a3 = q[3];
    const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    const invDot = dot ? 1 / dot : 0;
    dst[0] = -a0 * invDot;
    dst[1] = -a1 * invDot;
    dst[2] = -a2 * invDot;
    dst[3] = a3 * invDot;
    return dst;
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
export function conjugate(q, dst) {
    dst = dst || new QuatType(4);
    dst[0] = -q[0];
    dst[1] = -q[1];
    dst[2] = -q[2];
    dst[3] = q[3];
    return dst;
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
export function fromMat(m, dst) {
    dst = dst || new QuatType(4);
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
        dst[3] = 0.5 * root;
        const invRoot = 0.5 / root; // 1/(4w)
        dst[0] = (m[6] - m[9]) * invRoot;
        dst[1] = (m[8] - m[2]) * invRoot;
        dst[2] = (m[1] - m[4]) * invRoot;
    }
    else {
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
        dst[i] = 0.5 * root;
        const invRoot = 0.5 / root;
        dst[3] = (m[j * 4 + k] - m[k * 4 + j]) * invRoot;
        dst[j] = (m[j * 4 + i] + m[i * 4 + j]) * invRoot;
        dst[k] = (m[k * 4 + i] + m[i * 4 + k]) * invRoot;
    }
    return dst;
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
export function fromEuler(xAngleInRadians, yAngleInRadians, zAngleInRadians, order, dst) {
    dst = dst || new QuatType(4);
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
            dst[0] = sx * cy * cz + cx * sy * sz;
            dst[1] = cx * sy * cz - sx * cy * sz;
            dst[2] = cx * cy * sz + sx * sy * cz;
            dst[3] = cx * cy * cz - sx * sy * sz;
            break;
        case 'xzy':
            dst[0] = sx * cy * cz - cx * sy * sz;
            dst[1] = cx * sy * cz - sx * cy * sz;
            dst[2] = cx * cy * sz + sx * sy * cz;
            dst[3] = cx * cy * cz + sx * sy * sz;
            break;
        case 'yxz':
            dst[0] = sx * cy * cz + cx * sy * sz;
            dst[1] = cx * sy * cz - sx * cy * sz;
            dst[2] = cx * cy * sz - sx * sy * cz;
            dst[3] = cx * cy * cz + sx * sy * sz;
            break;
        case 'yzx':
            dst[0] = sx * cy * cz + cx * sy * sz;
            dst[1] = cx * sy * cz + sx * cy * sz;
            dst[2] = cx * cy * sz - sx * sy * cz;
            dst[3] = cx * cy * cz - sx * sy * sz;
            break;
        case 'zxy':
            dst[0] = sx * cy * cz - cx * sy * sz;
            dst[1] = cx * sy * cz + sx * cy * sz;
            dst[2] = cx * cy * sz + sx * sy * cz;
            dst[3] = cx * cy * cz - sx * sy * sz;
            break;
        case 'zyx':
            dst[0] = sx * cy * cz - cx * sy * sz;
            dst[1] = cx * sy * cz + sx * cy * sz;
            dst[2] = cx * cy * sz - sx * sy * cz;
            dst[3] = cx * cy * cz + sx * sy * sz;
            break;
        default:
            throw new Error(`Unknown rotation order: ${order}`);
    }
    return dst;
}
/**
 * Copies a quaternion. (same as {@link quat.clone})
 * Also see {@link quat.create} and {@link quat.set}
 * @param q - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is a copy of q
 */
export function copy(q, dst) {
    dst = dst || new QuatType(4);
    dst[0] = q[0];
    dst[1] = q[1];
    dst[2] = q[2];
    dst[3] = q[3];
    return dst;
}
/**
 * Clones a quaternion. (same as {@link quat.copy})
 * Also see {@link quat.create} and {@link quat.set}
 * @param q - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A copy of q.
 */
export const clone = copy;
/**
 * Adds two quaternions; assumes a and b have the same dimension.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the sum of a and b.
 */
export function add(a, b, dst) {
    dst = dst || new QuatType(4);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
    dst[3] = a[3] + b[3];
    return dst;
}
/**
 * Subtracts two quaternions.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the difference of a and b.
 */
export function subtract(a, b, dst) {
    dst = dst || new QuatType(4);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    dst[3] = a[3] - b[3];
    return dst;
}
/**
 * Subtracts two quaternions.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the difference of a and b.
 */
export const sub = subtract;
/**
 * Multiplies a quaternion by a scalar.
 * @param v - The quaternion.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
export function mulScalar(v, k, dst) {
    dst = dst || new QuatType(4);
    dst[0] = v[0] * k;
    dst[1] = v[1] * k;
    dst[2] = v[2] * k;
    dst[3] = v[3] * k;
    return dst;
}
/**
 * Multiplies a quaternion by a scalar. (same as mulScalar)
 * @param v - The quaternion.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
export const scale = mulScalar;
/**
 * Divides a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
export function divScalar(v, k, dst) {
    dst = dst || new QuatType(4);
    dst[0] = v[0] / k;
    dst[1] = v[1] / k;
    dst[2] = v[2] / k;
    dst[3] = v[3] / k;
    return dst;
}
/**
 * Computes the dot product of two quaternions
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns dot product
 */
export function dot(a, b) {
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
export function lerp(a, b, t, dst) {
    dst = dst || new QuatType(4);
    dst[0] = a[0] + t * (b[0] - a[0]);
    dst[1] = a[1] + t * (b[1] - a[1]);
    dst[2] = a[2] + t * (b[2] - a[2]);
    dst[3] = a[3] + t * (b[3] - a[3]);
    return dst;
}
/**
 * Computes the length of quaternion
 * @param v - quaternion.
 * @returns length of quaternion.
 */
export function length(v) {
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
export const len = length;
/**
 * Computes the square of the length of quaternion
 * @param v - quaternion.
 * @returns square of the length of quaternion.
 */
export function lengthSq(v) {
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
export const lenSq = lengthSq;
/**
 * Divides a quaternion by its Euclidean length and returns the quotient.
 * @param v - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The normalized quaternion.
 */
export function normalize(v, dst) {
    dst = dst || new QuatType(4);
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
    }
    else {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
    }
    return dst;
}
/**
 * Check if 2 quaternions are approximately equal
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns true if quaternions are approximately equal
 */
export function equalsApproximately(a, b) {
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
export function equals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Creates an identity quaternion
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns an identity quaternion
 */
export function identity(dst) {
    dst = dst || new QuatType(4);
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 1;
    return dst;
}
let tempVec3;
let xUnitVec3;
let yUnitVec3;
/**
 * Computes a quaternion to represent the shortest rotation from one vector to another.
 *
 * @param aUnit - the start vector
 * @param bUnit - the end vector
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns the result
 */
export function rotationTo(aUnit, bUnit, dst) {
    dst = dst || new QuatType(4);
    tempVec3 = tempVec3 || vec3.create();
    xUnitVec3 = xUnitVec3 || vec3.create(1, 0, 0);
    yUnitVec3 = yUnitVec3 || vec3.create(0, 1, 0);
    const dot = vec3.dot(aUnit, bUnit);
    if (dot < -0.999999) {
        vec3.cross(xUnitVec3, aUnit, tempVec3);
        if (vec3.len(tempVec3) < 0.000001) {
            vec3.cross(yUnitVec3, aUnit, tempVec3);
        }
        vec3.normalize(tempVec3, tempVec3);
        fromAxisAngle(tempVec3, Math.PI, dst);
        return dst;
    }
    else if (dot > 0.999999) {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 1;
        return dst;
    }
    else {
        vec3.cross(aUnit, bUnit, tempVec3);
        dst[0] = tempVec3[0];
        dst[1] = tempVec3[1];
        dst[2] = tempVec3[2];
        dst[3] = 1 + dot;
        return normalize(dst, dst);
    }
}
let tempQuat1;
let tempQuat2;
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
export function sqlerp(a, b, c, d, t, dst) {
    dst = dst || new QuatType(4);
    tempQuat1 = tempQuat1 || new QuatType(4);
    tempQuat2 = tempQuat2 || new QuatType(4);
    slerp(a, d, t, tempQuat1);
    slerp(b, c, t, tempQuat2);
    slerp(tempQuat1, tempQuat2, 2 * t * (1 - t), dst);
    return dst;
}
