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
import * as vec2 from './vec2-impl';
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
 */
let MatType = Float32Array;
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
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 * @returns previous constructor for Mat3
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
export function create(v0, v1, v2, v3, v4, v5, v6, v7, v8) {
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
export function set(v0, v1, v2, v3, v4, v5, v6, v7, v8, dst) {
    dst = dst || newMat3();
    dst[0] = v0;
    dst[1] = v1;
    dst[2] = v2;
    dst[3] = 0;
    dst[4] = v3;
    dst[5] = v4;
    dst[6] = v5;
    dst[7] = 0;
    dst[8] = v6;
    dst[9] = v7;
    dst[10] = v8;
    dst[11] = 0;
    return dst;
}
/**
 * Creates a Mat3 from the upper left 3x3 part of a Mat4
 * @param m4 - source matrix
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat3 made from m4
 */
export function fromMat4(m4, dst) {
    dst = dst || newMat3();
    dst[0] = m4[0];
    dst[1] = m4[1];
    dst[2] = m4[2];
    dst[3] = 0;
    dst[4] = m4[4];
    dst[5] = m4[5];
    dst[6] = m4[6];
    dst[7] = 0;
    dst[8] = m4[8];
    dst[9] = m4[9];
    dst[10] = m4[10];
    dst[11] = 0;
    return dst;
}
/**
 * Creates a Mat3 rotation matrix from a quaternion
 * @param q - quaternion to create matrix from
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat3 made from q
 */
export function fromQuat(q, dst) {
    dst = dst || newMat3();
    const x = q[0];
    const y = q[1];
    const z = q[2];
    const w = q[3];
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const yx = y * x2;
    const yy = y * y2;
    const zx = z * x2;
    const zy = z * y2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    dst[0] = 1 - yy - zz;
    dst[1] = yx + wz;
    dst[2] = zx - wy;
    dst[3] = 0;
    dst[4] = yx - wz;
    dst[5] = 1 - xx - zz;
    dst[6] = zy + wx;
    dst[7] = 0;
    dst[8] = zx + wy;
    dst[9] = zy - wx;
    dst[10] = 1 - xx - yy;
    dst[11] = 0;
    return dst;
}
/**
 * Negates a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns -m.
 */
export function negate(m, dst) {
    dst = dst || newMat3();
    dst[0] = -m[0];
    dst[1] = -m[1];
    dst[2] = -m[2];
    dst[4] = -m[4];
    dst[5] = -m[5];
    dst[6] = -m[6];
    dst[8] = -m[8];
    dst[9] = -m[9];
    dst[10] = -m[10];
    return dst;
}
/**
 * Copies a matrix. (same as {@link mat3.clone})
 * Also see {@link mat3.create} and {@link mat3.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
export function copy(m, dst) {
    dst = dst || newMat3();
    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[4] = m[4];
    dst[5] = m[5];
    dst[6] = m[6];
    dst[8] = m[8];
    dst[9] = m[9];
    dst[10] = m[10];
    return dst;
}
/**
 * Copies a matrix (same as {@link mat3.copy})
 * Also see {@link mat3.create} and {@link mat3.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
export const clone = copy;
/**
 * Check if 2 matrices are approximately equal
 * @param a Operand matrix.
 * @param b Operand matrix.
 * @returns true if matrices are approximately equal
 */
export function equalsApproximately(a, b) {
    return Math.abs(a[0] - b[0]) < utils.EPSILON &&
        Math.abs(a[1] - b[1]) < utils.EPSILON &&
        Math.abs(a[2] - b[2]) < utils.EPSILON &&
        Math.abs(a[4] - b[4]) < utils.EPSILON &&
        Math.abs(a[5] - b[5]) < utils.EPSILON &&
        Math.abs(a[6] - b[6]) < utils.EPSILON &&
        Math.abs(a[8] - b[8]) < utils.EPSILON &&
        Math.abs(a[9] - b[9]) < utils.EPSILON &&
        Math.abs(a[10] - b[10]) < utils.EPSILON;
}
/**
 * Check if 2 matrices are exactly equal
 * @param a Operand matrix.
 * @param b Operand matrix.
 * @returns true if matrices are exactly equal
 */
export function equals(a, b) {
    return a[0] === b[0] &&
        a[1] === b[1] &&
        a[2] === b[2] &&
        a[4] === b[4] &&
        a[5] === b[5] &&
        a[6] === b[6] &&
        a[8] === b[8] &&
        a[9] === b[9] &&
        a[10] === b[10];
}
/**
 * Creates a 3-by-3 identity matrix.
 *
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns A 3-by-3 identity matrix.
 */
export function identity(dst) {
    dst = dst || newMat3();
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    return dst;
}
/**
 * Takes the transpose of a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The transpose of m.
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
    dst[0] = m00;
    dst[1] = m10;
    dst[2] = m20;
    dst[4] = m01;
    dst[5] = m11;
    dst[6] = m21;
    dst[8] = m02;
    dst[9] = m12;
    dst[10] = m22;
    return dst;
}
/**
 * Computes the inverse of a 3-by-3 matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
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
    const b01 = m22 * m11 - m12 * m21;
    const b11 = -m22 * m10 + m12 * m20;
    const b21 = m21 * m10 - m11 * m20;
    const invDet = 1 / (m00 * b01 + m01 * b11 + m02 * b21);
    dst[0] = b01 * invDet;
    dst[1] = (-m22 * m01 + m02 * m21) * invDet;
    dst[2] = (m12 * m01 - m02 * m11) * invDet;
    dst[4] = b11 * invDet;
    dst[5] = (m22 * m00 - m02 * m20) * invDet;
    dst[6] = (-m12 * m00 + m02 * m10) * invDet;
    dst[8] = b21 * invDet;
    dst[9] = (-m21 * m00 + m01 * m20) * invDet;
    dst[10] = (m11 * m00 - m01 * m10) * invDet;
    return dst;
}
/**
 * Compute the determinant of a matrix
 * @param m - the matrix
 * @returns the determinant
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
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
 */
export const invert = inverse;
/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
export function multiply(a, b, dst) {
    dst = dst || newMat3();
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[4 + 0];
    const a11 = a[4 + 1];
    const a12 = a[4 + 2];
    const a20 = a[8 + 0];
    const a21 = a[8 + 1];
    const a22 = a[8 + 2];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b10 = b[4 + 0];
    const b11 = b[4 + 1];
    const b12 = b[4 + 2];
    const b20 = b[8 + 0];
    const b21 = b[8 + 1];
    const b22 = b[8 + 2];
    dst[0] = a00 * b00 + a10 * b01 + a20 * b02;
    dst[1] = a01 * b00 + a11 * b01 + a21 * b02;
    dst[2] = a02 * b00 + a12 * b01 + a22 * b02;
    dst[4] = a00 * b10 + a10 * b11 + a20 * b12;
    dst[5] = a01 * b10 + a11 * b11 + a21 * b12;
    dst[6] = a02 * b10 + a12 * b11 + a22 * b12;
    dst[8] = a00 * b20 + a10 * b21 + a20 * b22;
    dst[9] = a01 * b20 + a11 * b21 + a21 * b22;
    dst[10] = a02 * b20 + a12 * b21 + a22 * b22;
    return dst;
}
/**
 * Multiplies two 3-by-3 matrices with a on the left and b on the right (same as multiply)
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
export const mul = multiply;
/**
 * Sets the translation component of a 3-by-3 matrix to the given
 * vector.
 * @param a - The matrix.
 * @param v - The vector.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix with translation set.
 */
export function setTranslation(a, v, dst) {
    dst = dst || identity();
    if (a !== dst) {
        dst[0] = a[0];
        dst[1] = a[1];
        dst[2] = a[2];
        dst[4] = a[4];
        dst[5] = a[5];
        dst[6] = a[6];
    }
    dst[8] = v[0];
    dst[9] = v[1];
    dst[10] = 1;
    return dst;
}
/**
 * Returns the translation component of a 3-by-3 matrix as a vector with 3
 * entries.
 * @param m - The matrix.
 * @param dst - vector to hold result. If not passed a new one is created.
 * @returns The translation component of m.
 */
export function getTranslation(m, dst) {
    dst = dst || vec2.create();
    dst[0] = m[8];
    dst[1] = m[9];
    return dst;
}
/**
 * Returns an axis of a 3x3 matrix as a vector with 2 entries
 * @param m - The matrix.
 * @param axis - The axis 0 = x, 1 = y,
 * @returns The axis component of m.
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
 * @param m - The matrix.
 * @param v - the axis vector
 * @param axis - The axis  0 = x, 1 = y;
 * @param dst - The matrix to set. If not passed a new one is created.
 * @returns The matrix with axis set.
 */
export function setAxis(m, v, axis, dst) {
    if (dst !== m) {
        dst = copy(m, dst);
    }
    const off = axis * 4;
    dst[off + 0] = v[0];
    dst[off + 1] = v[1];
    return dst;
}
/**
 * Returns the scaling component of the matrix
 * @param m - The Matrix
 * @param dst - The vector to set. If not passed a new one is created.
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
 * @param v - The vector by which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translation matrix.
 */
export function translation(v, dst) {
    dst = dst || newMat3();
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[8] = v[0];
    dst[9] = v[1];
    dst[10] = 1;
    return dst;
}
/**
 * Translates the given 3-by-3 matrix by the given vector v.
 * @param m - The matrix.
 * @param v - The vector by which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translated matrix.
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
        dst[0] = m00;
        dst[1] = m01;
        dst[2] = m02;
        dst[4] = m10;
        dst[5] = m11;
        dst[6] = m12;
    }
    dst[8] = m00 * v0 + m10 * v1 + m20;
    dst[9] = m01 * v0 + m11 * v1 + m21;
    dst[10] = m02 * v0 + m12 * v1 + m22;
    return dst;
}
/**
 * Creates a 3-by-3 matrix which rotates  by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
export function rotation(angleInRadians, dst) {
    dst = dst || newMat3();
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c;
    dst[1] = s;
    dst[2] = 0;
    dst[4] = -s;
    dst[5] = c;
    dst[6] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    return dst;
}
/**
 * Rotates the given 3-by-3 matrix  by the given angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
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
    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
    }
    return dst;
}
/**
 * Creates a 3-by-3 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param v - A vector of
 *     2 entries specifying the factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
export function scaling(v, dst) {
    dst = dst || newMat3();
    dst[0] = v[0];
    dst[1] = 0;
    dst[2] = 0;
    dst[4] = 0;
    dst[5] = v[1];
    dst[6] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    return dst;
}
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
export function scale(m, v, dst) {
    dst = dst || newMat3();
    const v0 = v[0];
    const v1 = v[1];
    dst[0] = v0 * m[0 * 4 + 0];
    dst[1] = v0 * m[0 * 4 + 1];
    dst[2] = v0 * m[0 * 4 + 2];
    dst[4] = v1 * m[1 * 4 + 0];
    dst[5] = v1 * m[1 * 4 + 1];
    dst[6] = v1 * m[1 * 4 + 2];
    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
    }
    return dst;
}
/**
 * Creates a 3-by-3 matrix which scales uniformly in each dimension
 * @param s - Amount to scale
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
export function uniformScaling(s, dst) {
    dst = dst || newMat3();
    dst[0] = s;
    dst[1] = 0;
    dst[2] = 0;
    dst[4] = 0;
    dst[5] = s;
    dst[6] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    return dst;
}
/**
 * Scales the given 3-by-3 matrix in each dimension by an amount
 * given.
 * @param m - The matrix to be modified.
 * @param s - Amount to scale.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
export function uniformScale(m, s, dst) {
    dst = dst || newMat3();
    dst[0] = s * m[0 * 4 + 0];
    dst[1] = s * m[0 * 4 + 1];
    dst[2] = s * m[0 * 4 + 2];
    dst[4] = s * m[1 * 4 + 0];
    dst[5] = s * m[1 * 4 + 1];
    dst[6] = s * m[1 * 4 + 2];
    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
    }
    return dst;
}
