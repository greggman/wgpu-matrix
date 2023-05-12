import { Quat4, create, setDefaultType } from './quat4';
import { Mat3 } from './mat3';
import { Mat4 } from './mat4';
import { Vec3 } from './vec3';
export declare type RotationOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx';
export default Quat4;
export { create, setDefaultType };
/**
 * Creates a Quat4; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @param z - Initial z value.
 * @param z - Initial w value.
 * @returns the created vector
 */
export declare const fromValues: typeof create;
/**
 * Sets a quat from the given angle and  axis,
 * then returns it.
 *
 * @param axis - the axis to rotate around
 * @param angleInRadians - the angle
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The quaternion that represents the given axis and angle
 **/
export declare function fromAxisAngle(axis: Vec3, angleInRadians: number, dst?: Quat4): Quat4;
/**
 * Gets the rotation axis and angle
 * @param q - quaternion to compute from
 * @param dst - Vec3 to hold result. If not passed in a new one is created.
 * @return angle and axis
 */
export declare function toAxisAngle(q: Quat4, dst?: Vec3): {
    angle: number;
    axis: Vec3;
};
/**
 * Returns the angle in degrees between two rotations a and b.
 * @param a quaternion
 * @param b quaternion
 * @return angle in radians between the two quaternions
 */
export declare function angle(a: Quat4, b: Quat4): number;
/**
 * Multiplies two quaternions
 *
 * @param a - the first quaternion
 * @param b - the second quaternion
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export declare function multiply(a: Quat4, b: Quat4, dst?: Quat4): Quat4;
/**
 * Multiplies two quaternions
 *
 * @param a - the first quaternion
 * @param b - the second quaternion
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export declare const mul: typeof multiply;
/**
 * Rotates the given quaternion around the X axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export declare function rotateX(q: Quat4, angleInRadians: number, dst?: Quat4): Quat4;
/**
 * Rotates the given quaternion around the Y axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export declare function rotateY(q: Quat4, angleInRadians: number, dst?: Quat4): Quat4;
/**
 * Rotates the given quaternion around the Z axis by the given angle.
 * @param q - quaternion to rotate
 * @param angleInRadians - The angle by which to rotate
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export declare function rotateZ(q: Quat4, angleInRadians: number, dst?: Quat4): Quat4;
/**
 * Spherically linear interpolate between two quaternions
 *
 * @param a - starting value
 * @param b - ending value
 * @param t - value where 0 = a and 1 = b
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the result of a * b
 */
export declare function slerp(a: Quat4, b: Quat4, t: number, dst?: Quat4): Quat4;
/**
 * Compute the inverse of a quaternion
 *
 * @param q - quaternion to compute the inverse of
 * @returns A quaternion that is the result of a * b
 */
export declare function inverse(q: Quat4, dst?: Quat4): Quat4;
/**
 * Compute the conjugate of a quaternion
 * For quaternions with a magnitude of 1 (a unit quaternion)
 * this returns the same as the inverse but is faster to calculate.
 *
 * @param q - quaternion to compute the conjugate of.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The conjugate of q
 */
export declare function conjugate(q: Quat4, dst?: Quat4): Quat4;
/**
 * Creates a quaternion from the given rotation matrix.
 *
 * The created quaternion is not normalized.
 *
 * @param m - rotation matrix
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns the result
 */
export declare function fromMat(m: Mat3 | Mat4, dst?: Quat4): Quat4;
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
export declare function fromEuler(xAngleInRadians: number, yAngleInRadians: number, zAngleInRadians: number, order: RotationOrder, dst?: Quat4): import("./array-like.js").ArrayLike;
/**
 * Copies a quaternion. (same as clone)
 * @param q - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is a copy of q
 */
export declare function copy(q: Quat4, dst?: Quat4): Quat4;
/**
 * Clones a quaternion. (same as copy)
 * @param q - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A copy of q.
 */
export declare const clone: typeof copy;
/**
 * Adds two quaternions; assumes a and b have the same dimension.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the sum of a and b.
 */
export declare function add(a: Quat4, b: Quat4, dst?: Quat4): Quat4;
/**
 * Subtracts two quaternions.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the difference of a and b.
 */
export declare function subtract(a: Quat4, b: Quat4, dst?: Quat4): Quat4;
/**
 * Subtracts two quaternions.
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns A quaternion that is the difference of a and b.
 */
export declare const sub: typeof subtract;
/**
 * Multiplies a quaternion by a scalar.
 * @param v - The quaternion.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
export declare function mulScalar(v: Quat4, k: number, dst?: Quat4): Quat4;
/**
 * Multiplies a quaternion by a scalar. (same as mulScalar)
 * @param v - The quaternion.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
export declare const scale: typeof mulScalar;
/**
 * Divides a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The scaled quaternion.
 */
export declare function divScalar(v: Quat4, k: number, dst?: Quat4): Quat4;
/**
 * Computes the dot product of two quaternions
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns dot product
 */
export declare function dot(a: Quat4, b: Quat4): number;
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
export declare function lerp(a: Quat4, b: Quat4, t: number, dst?: Quat4): Quat4;
/**
 * Computes the length of quaternion
 * @param v - quaternion.
 * @returns length of quaternion.
 */
export declare function length(v: Quat4): number;
/**
 * Computes the length of quaternion (same as length)
 * @param v - quaternion.
 * @returns length of quaternion.
 */
export declare const len: typeof length;
/**
 * Computes the square of the length of quaternion
 * @param v - quaternion.
 * @returns square of the length of quaternion.
 */
export declare function lengthSq(v: Quat4): number;
/**
 * Computes the square of the length of quaternion (same as lengthSq)
 * @param v - quaternion.
 * @returns square of the length of quaternion.
 */
export declare const lenSq: typeof lengthSq;
/**
 * Divides a quaternion by its Euclidean length and returns the quotient.
 * @param v - The quaternion.
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns The normalized quaternion.
 */
export declare function normalize(v: Quat4, dst?: Quat4): Quat4;
/**
 * Check if 2 quaternions are approximately equal
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns true if quaternions are approximately equal
 */
export declare function equalsApproximately(a: Quat4, b: Quat4): boolean;
/**
 * Check if 2 quaternions are exactly equal
 * @param a - Operand quaternion.
 * @param b - Operand quaternion.
 * @returns true if quaternions are exactly equal
 */
export declare function equals(a: Quat4, b: Quat4): boolean;
/**
 * Computes a quaternion to represent the shortest rotation from one vector to another.
 *
 * @param aUnit - the start vector
 * @param bUnit - the end vector
 * @param dst - quaternion to hold result. If not passed in a new one is created.
 * @returns the result
 */
export declare function rotationTo(aUnit: Vec3, bUnit: Vec3, dst?: Quat4): Quat4;
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
export declare function sqlerp(a: Quat4, b: Quat4, c: Quat4, d: Quat4, t: number, dst?: Quat4): Quat4;
