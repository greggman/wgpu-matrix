import { Mat3 } from './mat3';
import { Mat4 } from './mat4';
import { Vec2, create, setDefaultType } from './vec2';
import { Vec3 } from './vec3';
export default Vec2;
export { create, setDefaultType };
/**
 * Creates a Vec2; may be called with x, y, z to set initial values. (same as create)
 * @param x - Initial x value.
 * @param y - Initial y value.
 * @returns the created vector
 */
export declare const fromValues: typeof create;
/**
 * Sets the values of a Vec2
 * Also see {@link vec2.create} and {@link vec2.copy}
 *
 * @param x first value
 * @param y second value
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector with its elements set.
 */
export declare function set(x: number, y: number, dst?: Vec2): Vec2;
/**
 * Applies Math.ceil to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the ceil of each element of v.
 */
export declare function ceil(v: Vec2, dst?: Vec2): Vec2;
/**
 * Applies Math.floor to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the floor of each element of v.
 */
export declare function floor(v: Vec2, dst?: Vec2): Vec2;
/**
 * Applies Math.round to each element of vector
 * @param v - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the round of each element of v.
 */
export declare function round(v: Vec2, dst?: Vec2): Vec2;
/**
 * Clamp each element of vector between min and max
 * @param v - Operand vector.
 * @param max - Min value, default 0
 * @param min - Max value, default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that the clamped value of each element of v.
 */
export declare function clamp(v: Vec2, min?: number, max?: number, dst?: Vec2): Vec2;
/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a and b.
 */
export declare function add(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
/**
 * Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param scale - Amount to scale b
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the sum of a + b * scale.
 */
export declare function addScaled(a: Vec2, b: Vec2, scale: number, dst?: Vec2): Vec2;
/**
 * Returns the angle in radians between two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns The angle in radians between the 2 vectors.
 */
export declare function angle(a: Vec2, b: Vec2): number;
/**
 * Subtracts two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the difference of a and b.
 */
export declare function subtract(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
/**
 * Subtracts two vectors.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A vector that is the difference of a and b.
 */
export declare const sub: typeof subtract;
/**
 * Check if 2 vectors are approximately equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are approximately equal
 */
export declare function equalsApproximately(a: Vec2, b: Vec2): boolean;
/**
 * Check if 2 vectors are exactly equal
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns true if vectors are exactly equal
 */
export declare function equals(a: Vec2, b: Vec2): boolean;
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
export declare function lerp(a: Vec2, b: Vec2, t: number, dst?: Vec2): Vec2;
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
export declare function lerpV(a: Vec2, b: Vec2, t: Vec2, dst?: Vec2): Vec2;
/**
 * Return max values of two vectors.
 * Given vectors a and b returns
 * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The max components vector.
 */
export declare function max(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
/**
 * Return min values of two vectors.
 * Given vectors a and b returns
 * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The min components vector.
 */
export declare function min(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
/**
 * Multiplies a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
export declare function mulScalar(v: Vec2, k: number, dst?: Vec2): Vec2;
/**
 * Multiplies a vector by a scalar. (same as mulScalar)
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
export declare const scale: typeof mulScalar;
/**
 * Divides a vector by a scalar.
 * @param v - The vector.
 * @param k - The scalar.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The scaled vector.
 */
export declare function divScalar(v: Vec2, k: number, dst?: Vec2): Vec2;
/**
 * Inverse a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
export declare function inverse(v: Vec2, dst?: Vec2): Vec2;
/**
 * Invert a vector. (same as inverse)
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The inverted vector.
 */
export declare const invert: typeof inverse;
/**
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of a cross b.
 */
export declare function cross(a: Vec2, b: Vec2, dst?: Vec3): Vec3;
/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @returns dot product
 */
export declare function dot(a: Vec2, b: Vec2): number;
/**
 * Computes the length of vector
 * @param v - vector.
 * @returns length of vector.
 */
export declare function length(v: Vec2): number;
/**
 * Computes the length of vector (same as length)
 * @param v - vector.
 * @returns length of vector.
 */
export declare const len: typeof length;
/**
 * Computes the square of the length of vector
 * @param v - vector.
 * @returns square of the length of vector.
 */
export declare function lengthSq(v: Vec2): number;
/**
 * Computes the square of the length of vector (same as lengthSq)
 * @param v - vector.
 * @returns square of the length of vector.
 */
export declare const lenSq: typeof lengthSq;
/**
 * Computes the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns distance between a and b
 */
export declare function distance(a: Vec2, b: Vec2): number;
/**
 * Computes the distance between 2 points (same as distance)
 * @param a - vector.
 * @param b - vector.
 * @returns distance between a and b
 */
export declare const dist: typeof distance;
/**
 * Computes the square of the distance between 2 points
 * @param a - vector.
 * @param b - vector.
 * @returns square of the distance between a and b
 */
export declare function distanceSq(a: Vec2, b: Vec2): number;
/**
 * Computes the square of the distance between 2 points (same as distanceSq)
 * @param a - vector.
 * @param b - vector.
 * @returns square of the distance between a and b
 */
export declare const distSq: typeof distanceSq;
/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The normalized vector.
 */
export declare function normalize(v: Vec2, dst?: Vec2): Vec2;
/**
 * Negates a vector.
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns -v.
 */
export declare function negate(v: Vec2, dst?: Vec2): Vec2;
/**
 * Copies a vector. (same as {@link vec2.clone})
 * Also see {@link vec2.create} and {@link vec2.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
export declare function copy(v: Vec2, dst?: Vec2): Vec2;
/**
 * Clones a vector. (same as {@link vec2.copy})
 * Also see {@link vec2.create} and {@link vec2.set}
 * @param v - The vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns A copy of v.
 */
export declare const clone: typeof copy;
/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of products of entries of a and b.
 */
export declare function multiply(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length. (same as mul)
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of products of entries of a and b.
 */
export declare const mul: typeof multiply;
/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of quotients of entries of a and b.
 */
export declare function divide(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length. (same as divide)
 * @param a - Operand vector.
 * @param b - Operand vector.
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The vector of quotients of entries of a and b.
 */
export declare const div: typeof divide;
/**
 * Creates a random unit vector * scale
 * @param scale - Default 1
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The random vector.
 */
export declare function random(scale?: number, dst?: Vec2): Vec2;
/**
 * Zero's a vector
 * @param dst - vector to hold result. If not passed in a new one is created.
 * @returns The zeroed vector.
 */
export declare function zero(dst?: Vec2): Vec2;
/**
 * transform Vec2 by 4x4 matrix
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional Vec2 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
export declare function transformMat4(v: Vec2, m: Mat4, dst?: Vec2): Vec2;
/**
 * Transforms vec4 by 3x3 matrix
 *
 * @param v - the vector
 * @param m - The matrix.
 * @param dst - optional Vec2 to store result. If not passed a new one is created.
 * @returns the transformed vector
 */
export declare function transformMat3(v: Vec2, m: Mat3, dst?: Vec2): Vec2;
