import { Quat } from './quat';
import { Mat3 } from './mat3';
import { Mat4 } from './mat4';
import Vec2 from './vec2-impl';
export default Mat3;
export declare type Mat3LikeCtor = new (n: number) => Mat3;
/**
 * Sets the type this library creates for a Mat3
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Mat3
 */
export declare function setDefaultType(ctor: new (n: number) => Mat3): Mat3LikeCtor;
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
export declare function create(v0?: number, v1?: number, v2?: number, v3?: number, v4?: number, v5?: number, v6?: number, v7?: number, v8?: number): Mat3;
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
export declare function set(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, dst?: Mat3): Mat3;
/**
 * Creates a Mat3 from the upper left 3x3 part of a Mat4
 * @param m4 - source matrix
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat3 made from m4
 */
export declare function fromMat4(m4: Mat4, dst?: Mat3): Mat3;
/**
 * Creates a Mat3 rotation matrix from a quaternion
 * @param q - quaternion to create matrix from
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat3 made from q
 */
export declare function fromQuat(q: Quat, dst?: Mat3): Mat3;
/**
 * Negates a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns -m.
 */
export declare function negate(m: Mat3, dst?: Mat3): Mat3;
/**
 * Copies a matrix. (same as {@link mat3.clone})
 * Also see {@link mat3.create} and {@link mat3.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
export declare function copy(m: Mat3, dst?: Mat3): Mat3;
/**
 * Copies a matrix (same as {@link mat3.copy})
 * Also see {@link mat3.create} and {@link mat3.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
export declare const clone: typeof copy;
/**
 * Check if 2 matrices are approximately equal
 * @param a Operand matrix.
 * @param b Operand matrix.
 * @returns true if matrices are approximately equal
 */
export declare function equalsApproximately(a: Mat3, b: Mat3): boolean;
/**
 * Check if 2 matrices are exactly equal
 * @param a Operand matrix.
 * @param b Operand matrix.
 * @returns true if matrices are exactly equal
 */
export declare function equals(a: Mat3, b: Mat3): boolean;
/**
 * Creates a 3-by-3 identity matrix.
 *
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns A 3-by-3 identity matrix.
 */
export declare function identity(dst?: Mat3): Mat3;
/**
 * Takes the transpose of a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The transpose of m.
 */
export declare function transpose(m: Mat3, dst?: Mat3): Mat3;
/**
 * Computes the inverse of a 3-by-3 matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
 */
export declare function inverse(m: Mat3, dst?: Mat3): Mat3;
/**
 * Compute the determinant of a matrix
 * @param m - the matrix
 * @returns the determinant
 */
export declare function determinant(m: Mat3): number;
/**
 * Computes the inverse of a 3-by-3 matrix. (same as inverse)
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
 */
export declare const invert: typeof inverse;
/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
export declare function multiply(a: Mat3, b: Mat3, dst?: Mat3): Mat3;
/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right (same as multiply)
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
export declare const mul: typeof multiply;
/**
 * Sets the translation component of a 3-by-3 matrix to the given
 * vector.
 * @param a - The matrix.
 * @param v - The vector.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix with translation set.
 */
export declare function setTranslation(a: Mat3, v: Vec2, dst?: Mat3): Mat3;
/**
 * Returns the translation component of a 3-by-3 matrix as a vector with 3
 * entries.
 * @param m - The matrix.
 * @param dst - vector to hold result. If not passed a new one is created.
 * @returns The translation component of m.
 */
export declare function getTranslation(m: Mat3, dst?: Vec2): Vec2;
/**
 * Returns an axis of a 3x3 matrix as a vector with 2 entries
 * @param m - The matrix.
 * @param axis - The axis 0 = x, 1 = y,
 * @returns The axis component of m.
 */
export declare function getAxis(m: Mat3, axis: number, dst?: Vec2): Vec2;
/**
 * Sets an axis of a 3x3 matrix as a vector with 2 entries
 * @param m - The matrix.
 * @param v - the axis vector
 * @param axis - The axis  0 = x, 1 = y;
 * @param dst - The matrix to set. If not passed a new one is created.
 * @returns The matrix with axis set.
 */
export declare function setAxis(m: Mat3, v: Vec2, axis: number, dst?: Mat3): Mat3;
/**
 * Returns the scaling component of the matrix
 * @param m - The Matrix
 * @param dst - The vector to set. If not passed a new one is created.
 */
export declare function getScaling(m: Mat3, dst?: Vec2): Vec2;
/**
 * Creates a 3-by-3 matrix which translates by the given vector v.
 * @param v - The vector by which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translation matrix.
 */
export declare function translation(v: Vec2, dst?: Mat3): Mat3;
/**
 * Translates the given 3-by-3 matrix by the given vector v.
 * @param m - The matrix.
 * @param v - The vector by which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translated matrix.
 */
export declare function translate(m: Mat3, v: Vec2, dst?: Mat3): Mat3;
/**
 * Creates a 3-by-3 matrix which rotates  by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
export declare function rotation(angleInRadians: number, dst?: Mat3): Mat3;
/**
 * Rotates the given 3-by-3 matrix  by the given angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
export declare function rotate(m: Mat3, angleInRadians: number, dst?: Mat3): Mat3;
/**
 * Creates a 3-by-3 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param v - A vector of
 *     2 entries specifying the factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
export declare function scaling(v: Vec2, dst?: Mat3): Mat3;
/**
 * Scales the given 3-by-3 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param m - The matrix to be modified.
 * @param v - A vector of 2 entries specifying the
 *     factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
export declare function scale(m: Mat3, v: Vec2, dst?: Mat3): Mat3;
/**
 * Creates a 3-by-3 matrix which scales uniformly in each dimension
 * @param s - Amount to scale
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
export declare function uniformScaling(s: number, dst?: Mat3): Mat3;
/**
 * Scales the given 3-by-3 matrix in each dimension by an amount
 * given.
 * @param m - The matrix to be modified.
 * @param s - Amount to scale.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
export declare function uniformScale(m: Mat3, s: number, dst?: Mat3): Mat3;
