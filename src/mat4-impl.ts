import { Mat4Arg, Mat4Type } from './mat4';
import { Mat3Arg } from './mat3';
import { QuatArg } from './quat';
import { Vec3Arg } from './vec3';
import { getAPI as getVec3API } from './vec3-impl';
import { BaseArgType } from './types';
import * as utils from './utils';

export { Mat4Arg, Mat4Type };

type Mat4Ctor<T extends Mat4Arg = Float32Array>  = new (n: number) => T;

/**
 * Generates a typed API for Mat4
 * */
function getAPIImpl<MatType extends Mat4Arg = Float32Array>(Ctor: Mat4Ctor<MatType>) {
  const vec3 = getVec3API<MatType>(Ctor);

/**
 * 4x4 Matrix math math functions.
 *
 * Almost all functions take an optional `newDst` argument. If it is not passed in the
 * functions will create a new matrix. In other words you can do this
 *
 *     const mat = mat4.translation([1, 2, 3]);  // Creates a new translation matrix
 *
 * or
 *
 *     const mat = mat4.create();
 *     mat4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any matrix as the destination. So for example
 *
 *     const mat = mat4.identity();
 *     const trans = mat4.translation([1, 2, 3]);
 *     mat4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
 *
 */


/**
 * Create a Mat4 from values
 *
 * Note: Since passing in a raw JavaScript array
 * is valid in all circumstances, if you want to
 * force a JavaScript array into a Mat4's specified type
 * it would be faster to use
 *
 * ```
 * const m = mat4.clone(someJSArray);
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
 * @param v9 - value for element 9
 * @param v10 - value for element 10
 * @param v11 - value for element 11
 * @param v12 - value for element 12
 * @param v13 - value for element 13
 * @param v14 - value for element 14
 * @param v15 - value for element 15
 * @returns created from values.
 */
function create(
    v0?: number, v1?: number, v2?: number, v3?: number,
    v4?: number, v5?: number, v6?: number, v7?: number,
    v8?: number, v9?: number, v10?: number, v11?: number,
    v12?: number, v13?: number, v14?: number, v15?: number) {
  const newDst = new Ctor(16);
  if (v0 !== undefined) {
    newDst[0] = v0;
    if (v1 !== undefined) {
      newDst[1] = v1;
      if (v2 !== undefined) {
        newDst[2] = v2;
        if (v3 !== undefined) {
          newDst[3] = v3;
          if (v4 !== undefined) {
            newDst[4] = v4;
            if (v5 !== undefined) {
              newDst[5] = v5;
              if (v6 !== undefined) {
                newDst[6] = v6;
                if (v7 !== undefined) {
                  newDst[7] = v7;
                  if (v8 !== undefined) {
                    newDst[8] = v8;
                    if (v9 !== undefined) {
                      newDst[9] = v9;
                      if (v10 !== undefined) {
                        newDst[10] = v10;
                        if (v11 !== undefined) {
                          newDst[11] = v11;
                          if (v12 !== undefined) {
                            newDst[12] = v12;
                            if (v13 !== undefined) {
                              newDst[13] = v13;
                              if (v14 !== undefined) {
                                newDst[14] = v14;
                                if (v15 !== undefined) {
                                  newDst[15] = v15;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
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
 * Sets the values of a Mat4
 * Also see {@link mat4.create} and {@link mat4.copy}
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
 * @param v9 - value for element 9
 * @param v10 - value for element 10
 * @param v11 - value for element 11
 * @param v12 - value for element 12
 * @param v13 - value for element 13
 * @param v14 - value for element 14
 * @param v15 - value for element 15
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat4 created from values.
 */
function set<T extends Mat4Arg = MatType>(
    v0: number, v1: number, v2: number, v3: number,
    v4: number, v5: number, v6: number, v7: number,
    v8: number, v9: number, v10: number, v11: number,
    v12: number, v13: number, v14: number, v15: number,
    dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = v0;   newDst[ 1] = v1;   newDst[ 2] = v2;   newDst[ 3] = v3;
  newDst[ 4] = v4;   newDst[ 5] = v5;   newDst[ 6] = v6;   newDst[ 7] = v7;
  newDst[ 8] = v8;   newDst[ 9] = v9;   newDst[10] = v10;  newDst[11] = v11;
  newDst[12] = v12;  newDst[13] = v13;  newDst[14] = v14;  newDst[15] = v15;

  return newDst;
}

/**
 * Creates a Mat4 from a Mat3
 * @param m3 - source matrix
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat4 made from m3
 */
function fromMat3<T extends Mat4Arg = MatType>(m3: Mat3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = m3[0];  newDst[ 1] = m3[1];  newDst[ 2] = m3[ 2];  newDst[ 3] = 0;
  newDst[ 4] = m3[4];  newDst[ 5] = m3[5];  newDst[ 6] = m3[ 6];  newDst[ 7] = 0;
  newDst[ 8] = m3[8];  newDst[ 9] = m3[9];  newDst[10] = m3[10];  newDst[11] = 0;
  newDst[12] = 0;      newDst[13] = 0;      newDst[14] = 0;       newDst[15] = 1;

  return newDst;
}

/**
 * Creates a Mat4 rotation matrix from a quaternion
 * @param q - quaternion to create matrix from
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns Mat4 made from q
 */
function fromQuat<T extends Mat4Arg = MatType>(q: QuatArg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

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
  newDst[12] = 0;            newDst[13] = 0;            newDst[14] = 0;            newDst[15] = 1;

  return newDst;
}

/**
 * Negates a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns -m.
 */
function negate<T extends Mat4Arg = MatType>(m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = -m[ 0];  newDst[ 1] = -m[ 1];  newDst[ 2] = -m[ 2];  newDst[ 3] = -m[ 3];
  newDst[ 4] = -m[ 4];  newDst[ 5] = -m[ 5];  newDst[ 6] = -m[ 6];  newDst[ 7] = -m[ 7];
  newDst[ 8] = -m[ 8];  newDst[ 9] = -m[ 9];  newDst[10] = -m[10];  newDst[11] = -m[11];
  newDst[12] = -m[12];  newDst[13] = -m[13];  newDst[14] = -m[14];  newDst[15] = -m[15];

  return newDst;
}

/**
 * Copies a matrix. (same as {@link mat4.clone})
 * Also see {@link mat4.create} and {@link mat4.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
function copy<T extends Mat4Arg = MatType>(m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = m[ 0];  newDst[ 1] = m[ 1];  newDst[ 2] = m[ 2];  newDst[ 3] = m[ 3];
  newDst[ 4] = m[ 4];  newDst[ 5] = m[ 5];  newDst[ 6] = m[ 6];  newDst[ 7] = m[ 7];
  newDst[ 8] = m[ 8];  newDst[ 9] = m[ 9];  newDst[10] = m[10];  newDst[11] = m[11];
  newDst[12] = m[12];  newDst[13] = m[13];  newDst[14] = m[14];  newDst[15] = m[15];

  return newDst;
}

/**
 * Copies a matrix (same as {@link mat4.copy})
 * Also see {@link mat4.create} and {@link mat4.set}
 * @param m - The matrix.
 * @param dst - The matrix. If not passed a new one is created.
 * @returns A copy of m.
 */
const clone = copy;

/**
 * Check if 2 matrices are approximately equal
 * @param a - Operand matrix.
 * @param b - Operand matrix.
 * @returns true if matrices are approximately equal
 */
function equalsApproximately(a: Mat4Arg, b: Mat4Arg): boolean {
  return Math.abs(a[ 0] - b[ 0]) < utils.EPSILON &&
         Math.abs(a[ 1] - b[ 1]) < utils.EPSILON &&
         Math.abs(a[ 2] - b[ 2]) < utils.EPSILON &&
         Math.abs(a[ 3] - b[ 3]) < utils.EPSILON &&
         Math.abs(a[ 4] - b[ 4]) < utils.EPSILON &&
         Math.abs(a[ 5] - b[ 5]) < utils.EPSILON &&
         Math.abs(a[ 6] - b[ 6]) < utils.EPSILON &&
         Math.abs(a[ 7] - b[ 7]) < utils.EPSILON &&
         Math.abs(a[ 8] - b[ 8]) < utils.EPSILON &&
         Math.abs(a[ 9] - b[ 9]) < utils.EPSILON &&
         Math.abs(a[10] - b[10]) < utils.EPSILON &&
         Math.abs(a[11] - b[11]) < utils.EPSILON &&
         Math.abs(a[12] - b[12]) < utils.EPSILON &&
         Math.abs(a[13] - b[13]) < utils.EPSILON &&
         Math.abs(a[14] - b[14]) < utils.EPSILON &&
         Math.abs(a[15] - b[15]) < utils.EPSILON;
}

/**
 * Check if 2 matrices are exactly equal
 * @param a - Operand matrix.
 * @param b - Operand matrix.
 * @returns true if matrices are exactly equal
 */
function equals(a: Mat4Arg, b: Mat4Arg): boolean {
  return a[ 0] === b[ 0] &&
         a[ 1] === b[ 1] &&
         a[ 2] === b[ 2] &&
         a[ 3] === b[ 3] &&
         a[ 4] === b[ 4] &&
         a[ 5] === b[ 5] &&
         a[ 6] === b[ 6] &&
         a[ 7] === b[ 7] &&
         a[ 8] === b[ 8] &&
         a[ 9] === b[ 9] &&
         a[10] === b[10] &&
         a[11] === b[11] &&
         a[12] === b[12] &&
         a[13] === b[13] &&
         a[14] === b[14] &&
         a[15] === b[15];
}

/**
 * Creates a 4-by-4 identity matrix.
 *
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns A 4-by-4 identity matrix.
 */
function identity<T extends Mat4Arg = MatType>(dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = 1;  newDst[ 1] = 0;  newDst[ 2] = 0;  newDst[ 3] = 0;
  newDst[ 4] = 0;  newDst[ 5] = 1;  newDst[ 6] = 0;  newDst[ 7] = 0;
  newDst[ 8] = 0;  newDst[ 9] = 0;  newDst[10] = 1;  newDst[11] = 0;
  newDst[12] = 0;  newDst[13] = 0;  newDst[14] = 0;  newDst[15] = 1;

  return newDst;
}

/**
 * Takes the transpose of a matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The transpose of m.
 */
function transpose<T extends Mat4Arg = MatType>(m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;
  if (newDst === m) {
    let t;

    t = m[1];
    m[1] = m[4];
    m[4] = t;

    t = m[2];
    m[2] = m[8];
    m[8] = t;

    t = m[3];
    m[3] = m[12];
    m[12] = t;

    t = m[6];
    m[6] = m[9];
    m[9] = t;

    t = m[7];
    m[7] = m[13];
    m[13] = t;

    t = m[11];
    m[11] = m[14];
    m[14] = t;
    return newDst;
  }

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];

  newDst[ 0] = m00;  newDst[ 1] = m10;  newDst[ 2] = m20;  newDst[ 3] = m30;
  newDst[ 4] = m01;  newDst[ 5] = m11;  newDst[ 6] = m21;  newDst[ 7] = m31;
  newDst[ 8] = m02;  newDst[ 9] = m12;  newDst[10] = m22;  newDst[11] = m32;
  newDst[12] = m03;  newDst[13] = m13;  newDst[14] = m23;  newDst[15] = m33;

  return newDst;
}

/**
 * Computes the inverse of a 4-by-4 matrix.
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
 */
function inverse<T extends Mat4Arg = MatType>(m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];
  const tmp0  = m22 * m33;
  const tmp1  = m32 * m23;
  const tmp2  = m12 * m33;
  const tmp3  = m32 * m13;
  const tmp4  = m12 * m23;
  const tmp5  = m22 * m13;
  const tmp6  = m02 * m33;
  const tmp7  = m32 * m03;
  const tmp8  = m02 * m23;
  const tmp9  = m22 * m03;
  const tmp10 = m02 * m13;
  const tmp11 = m12 * m03;
  const tmp12 = m20 * m31;
  const tmp13 = m30 * m21;
  const tmp14 = m10 * m31;
  const tmp15 = m30 * m11;
  const tmp16 = m10 * m21;
  const tmp17 = m20 * m11;
  const tmp18 = m00 * m31;
  const tmp19 = m30 * m01;
  const tmp20 = m00 * m21;
  const tmp21 = m20 * m01;
  const tmp22 = m00 * m11;
  const tmp23 = m10 * m01;

  const t0 = (tmp0 * m11 + tmp3 * m21 + tmp4 * m31) -
      (tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
  const t1 = (tmp1 * m01 + tmp6 * m21 + tmp9 * m31) -
      (tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
  const t2 = (tmp2 * m01 + tmp7 * m11 + tmp10 * m31) -
      (tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
  const t3 = (tmp5 * m01 + tmp8 * m11 + tmp11 * m21) -
      (tmp4 * m01 + tmp9 * m11 + tmp10 * m21);

  const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  newDst[ 0] = d * t0;
  newDst[ 1] = d * t1;
  newDst[ 2] = d * t2;
  newDst[ 3] = d * t3;
  newDst[ 4] = d * ((tmp1 * m10 + tmp2 * m20 + tmp5 * m30) -
          (tmp0 * m10 + tmp3 * m20 + tmp4 * m30));
  newDst[ 5] = d * ((tmp0 * m00 + tmp7 * m20 + tmp8 * m30) -
          (tmp1 * m00 + tmp6 * m20 + tmp9 * m30));
  newDst[ 6] = d * ((tmp3 * m00 + tmp6 * m10 + tmp11 * m30) -
          (tmp2 * m00 + tmp7 * m10 + tmp10 * m30));
  newDst[ 7] = d * ((tmp4 * m00 + tmp9 * m10 + tmp10 * m20) -
          (tmp5 * m00 + tmp8 * m10 + tmp11 * m20));
  newDst[ 8] = d * ((tmp12 * m13 + tmp15 * m23 + tmp16 * m33) -
          (tmp13 * m13 + tmp14 * m23 + tmp17 * m33));
  newDst[ 9] = d * ((tmp13 * m03 + tmp18 * m23 + tmp21 * m33) -
          (tmp12 * m03 + tmp19 * m23 + tmp20 * m33));
  newDst[10] = d * ((tmp14 * m03 + tmp19 * m13 + tmp22 * m33) -
          (tmp15 * m03 + tmp18 * m13 + tmp23 * m33));
  newDst[11] = d * ((tmp17 * m03 + tmp20 * m13 + tmp23 * m23) -
          (tmp16 * m03 + tmp21 * m13 + tmp22 * m23));
  newDst[12] = d * ((tmp14 * m22 + tmp17 * m32 + tmp13 * m12) -
          (tmp16 * m32 + tmp12 * m12 + tmp15 * m22));
  newDst[13] = d * ((tmp20 * m32 + tmp12 * m02 + tmp19 * m22) -
          (tmp18 * m22 + tmp21 * m32 + tmp13 * m02));
  newDst[14] = d * ((tmp18 * m12 + tmp23 * m32 + tmp15 * m02) -
          (tmp22 * m32 + tmp14 * m02 + tmp19 * m12));
  newDst[15] = d * ((tmp22 * m22 + tmp16 * m02 + tmp21 * m12) -
          (tmp20 * m12 + tmp23 * m22 + tmp17 * m02));

  return newDst;
}

/**
 * Compute the determinant of a matrix
 * @param m - the matrix
 * @returns the determinant
 */
function determinant(m: Mat4Arg): number {
  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];

  const tmp0  = m22 * m33;
  const tmp1  = m32 * m23;
  const tmp2  = m12 * m33;
  const tmp3  = m32 * m13;
  const tmp4  = m12 * m23;
  const tmp5  = m22 * m13;
  const tmp6  = m02 * m33;
  const tmp7  = m32 * m03;
  const tmp8  = m02 * m23;
  const tmp9  = m22 * m03;
  const tmp10 = m02 * m13;
  const tmp11 = m12 * m03;

  const t0 = (tmp0 * m11 + tmp3 * m21 + tmp4 * m31) -
             (tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
  const t1 = (tmp1 * m01 + tmp6 * m21 + tmp9 * m31) -
             (tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
  const t2 = (tmp2 * m01 + tmp7 * m11 + tmp10 * m31) -
             (tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
  const t3 = (tmp5 * m01 + tmp8 * m11 + tmp11 * m21) -
             (tmp4 * m01 + tmp9 * m11 + tmp10 * m21);

  return m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3;
}

/**
 * Computes the inverse of a 4-by-4 matrix. (same as inverse)
 * @param m - The matrix.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The inverse of m.
 */
const invert = inverse;

/**
 * Multiplies two 4-by-4 matrices with a on the left and b on the right
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
function multiply<T extends Mat4Arg = MatType>(a: Mat4Arg, b: Mat4Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[ 4 + 0];
  const a11 = a[ 4 + 1];
  const a12 = a[ 4 + 2];
  const a13 = a[ 4 + 3];
  const a20 = a[ 8 + 0];
  const a21 = a[ 8 + 1];
  const a22 = a[ 8 + 2];
  const a23 = a[ 8 + 3];
  const a30 = a[12 + 0];
  const a31 = a[12 + 1];
  const a32 = a[12 + 2];
  const a33 = a[12 + 3];
  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b03 = b[3];
  const b10 = b[ 4 + 0];
  const b11 = b[ 4 + 1];
  const b12 = b[ 4 + 2];
  const b13 = b[ 4 + 3];
  const b20 = b[ 8 + 0];
  const b21 = b[ 8 + 1];
  const b22 = b[ 8 + 2];
  const b23 = b[ 8 + 3];
  const b30 = b[12 + 0];
  const b31 = b[12 + 1];
  const b32 = b[12 + 2];
  const b33 = b[12 + 3];

  newDst[ 0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
  newDst[ 1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
  newDst[ 2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
  newDst[ 3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
  newDst[ 4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
  newDst[ 5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
  newDst[ 6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
  newDst[ 7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
  newDst[ 8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
  newDst[ 9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
  newDst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
  newDst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
  newDst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
  newDst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
  newDst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
  newDst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

  return newDst;
}

/**
 * Multiplies two 4-by-4 matrices with a on the left and b on the right (same as multiply)
 * @param a - The matrix on the left.
 * @param b - The matrix on the right.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix product of a and b.
 */
const mul = multiply;

/**
 * Sets the translation component of a 4-by-4 matrix to the given
 * vector.
 * @param a - The matrix.
 * @param v - The vector.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The matrix with translation set.
 */
function setTranslation<T extends Mat4Arg = MatType>(a: Mat4Arg, v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? identity()) as T;
  if (a !== newDst) {
    newDst[ 0] = a[ 0];
    newDst[ 1] = a[ 1];
    newDst[ 2] = a[ 2];
    newDst[ 3] = a[ 3];
    newDst[ 4] = a[ 4];
    newDst[ 5] = a[ 5];
    newDst[ 6] = a[ 6];
    newDst[ 7] = a[ 7];
    newDst[ 8] = a[ 8];
    newDst[ 9] = a[ 9];
    newDst[10] = a[10];
    newDst[11] = a[11];
  }
  newDst[12] = v[0];
  newDst[13] = v[1];
  newDst[14] = v[2];
  newDst[15] = 1;
  return newDst;
}

///**
// * Returns the translation component of a 4-by-4 matrix as a vector with 3
// * entries.
// * @param m - The matrix.
// * @param dst - vector to hold result. If not passed a new one is created.
// * @returns The translation component of m.
// */
function getTranslation<T extends Vec3Arg = MatType>(m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? vec3.create()) as T;
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
function getAxis<T extends Vec3Arg = MatType>(m: Mat4Arg, axis: number, dst?: T) {
  const newDst = (dst ?? vec3.create());
  const off = axis * 4;
  newDst[0] = m[off + 0];
  newDst[1] = m[off + 1];
  newDst[2] = m[off + 2];
  return newDst;
}

/**
 * Sets an axis of a 4x4 matrix as a vector with 3 entries
 * @param m - The matrix.
 * @param v - the axis vector
 * @param axis - The axis  0 = x, 1 = y, 2 = z;
 * @param dst - The matrix to set. If not passed a new one is created.
 * @returns The matrix with axis set.
 */
function setAxis<T extends Mat4Arg = MatType>(m: Mat4Arg, v: Vec3Arg, axis: number, dst: T) {
  const newDst = (dst === m) ? dst : copy(m, dst);

  const off = axis * 4;
  newDst[off + 0] = v[0];
  newDst[off + 1] = v[1];
  newDst[off + 2] = v[2];
  return newDst;
}

///**
// * Returns the scaling component of the matrix
// * @param m - The Matrix
// * @param dst - The vector to set. If not passed a new one is created.
// */
function getScaling<T extends Vec3Arg = MatType>(m: Mat4Arg, dst?: T) {
  const newDst = (dst ?? vec3.create()) as T;

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
 * Computes a 4-by-4 perspective transformation matrix given the angular height
 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
 * arguments define a frustum extending in the negative z direction.  The given
 * angle is the vertical angle of the frustum, and the horizontal angle is
 * determined to produce the given aspect ratio.  The arguments near and far are
 * the distances to the near and far clipping planes.  Note that near and far
 * are not z coordinates, but rather they are distances along the negative
 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
 * from 0 to 1 in the z dimension.
 *
 * Note: If you pass `Infinity` for zFar then it will produce a projection matrix
 * returns -Infinity for Z when transforming coordinates with Z <= 0 and +Infinity for Z
 * otherwise.
 *
 * @param fieldOfViewYInRadians - The camera angle from top to bottom (in radians).
 * @param aspect - The aspect ratio width / height.
 * @param zNear - The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param zFar - The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The perspective matrix.
 */
function perspective<T extends Mat4Arg = MatType>(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);

  newDst[0]  = f / aspect;
  newDst[1]  = 0;
  newDst[2]  = 0;
  newDst[3]  = 0;

  newDst[4]  = 0;
  newDst[5]  = f;
  newDst[6]  = 0;
  newDst[7]  = 0;

  newDst[8]  = 0;
  newDst[9]  = 0;
  newDst[11] = -1;

  newDst[12] = 0;
  newDst[13] = 0;
  newDst[15] = 0;

  if (Number.isFinite(zFar)) {
    const rangeInv = 1 / (zNear - zFar);
    newDst[10] = zFar * rangeInv;
    newDst[14] = zFar * zNear * rangeInv;
  } else {
    newDst[10] = -1;
    newDst[14] = -zNear;
  }

  return newDst;
}

/**
 * Computes a 4-by-4 reverse-z perspective transformation matrix given the angular height
 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
 * arguments define a frustum extending in the negative z direction.  The given
 * angle is the vertical angle of the frustum, and the horizontal angle is
 * determined to produce the given aspect ratio.  The arguments near and far are
 * the distances to the near and far clipping planes.  Note that near and far
 * are not z coordinates, but rather they are distances along the negative
 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
 * from 1 (at -zNear) to 0 (at -zFar) in the z dimension.
 *
 * @param fieldOfViewYInRadians - The camera angle from top to bottom (in radians).
 * @param aspect - The aspect ratio width / height.
 * @param zNear - The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param zFar - The depth (negative z coordinate)
 *     of the far clipping plane. (default = Infinity)
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The perspective matrix.
 */function perspectiveReverseZ<T extends Mat4Arg = MatType>(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar = Infinity, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const f = 1 / Math.tan(fieldOfViewYInRadians * 0.5);

  newDst[ 0] = f / aspect;
  newDst[ 1] = 0;
  newDst[ 2] = 0;
  newDst[ 3] = 0;

  newDst[ 4] = 0;
  newDst[ 5] = f;
  newDst[ 6] = 0;
  newDst[ 7] = 0;

  newDst[ 8] = 0;
  newDst[ 9] = 0;
  newDst[11] = -1;

  newDst[12] = 0;
  newDst[13] = 0;
  newDst[15] = 0;

  if (zFar === Infinity) {
    newDst[10] = 0;
    newDst[14] = zNear;
  } else {
    const rangeInv = 1 / (zFar - zNear);
    newDst[10] = zNear * rangeInv;
    newDst[14] = zFar * zNear * rangeInv;
  }

  return newDst;
}

/**
 * Computes a 4-by-4 orthogonal transformation matrix that transforms from
 * the given the left, right, bottom, and top dimensions to -1 +1 in x, and y
 * and 0 to +1 in z.
 * @param left - Left side of the near clipping plane viewport.
 * @param right - Right side of the near clipping plane viewport.
 * @param bottom - Bottom of the near clipping plane viewport.
 * @param top - Top of the near clipping plane viewport.
 * @param near - The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param far - The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param dst - Output matrix. If not passed a new one is created.
 * @returns The orthographic projection matrix.
 */
function ortho<T extends Mat4Arg = MatType>(left: number, right: number, bottom: number, top: number, near: number, far: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[0]  = 2 / (right - left);
  newDst[1]  = 0;
  newDst[2]  = 0;
  newDst[3]  = 0;

  newDst[4]  = 0;
  newDst[5]  = 2 / (top - bottom);
  newDst[6]  = 0;
  newDst[7]  = 0;

  newDst[8]  = 0;
  newDst[9]  = 0;
  newDst[10] = 1 / (near - far);
  newDst[11] = 0;

  newDst[12] = (right + left) / (left - right);
  newDst[13] = (top + bottom) / (bottom - top);
  newDst[14] = near / (near - far);
  newDst[15] = 1;

  return newDst;
}

/**
 * Computes a 4-by-4 perspective transformation matrix given the left, right,
 * top, bottom, near and far clipping planes. The arguments define a frustum
 * extending in the negative z direction. The arguments near and far are the
 * distances to the near and far clipping planes. Note that near and far are not
 * z coordinates, but rather they are distances along the negative z-axis. The
 * matrix generated sends the viewing frustum to the unit box. We assume a unit
 * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
 * dimension.
 * @param left - The x coordinate of the left plane of the box.
 * @param right - The x coordinate of the right plane of the box.
 * @param bottom - The y coordinate of the bottom plane of the box.
 * @param top - The y coordinate of the right plane of the box.
 * @param near - The negative z coordinate of the near plane of the box.
 * @param far - The negative z coordinate of the far plane of the box.
 * @param dst - Output matrix. If not passed a new one is created.
 * @returns The perspective projection matrix.
 */
function frustum<T extends Mat4Arg = MatType>(left: number, right: number, bottom: number, top: number, near: number, far: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const dx = (right - left);
  const dy = (top - bottom);
  const dz = (near - far);

  newDst[ 0] = 2 * near / dx;
  newDst[ 1] = 0;
  newDst[ 2] = 0;
  newDst[ 3] = 0;
  newDst[ 4] = 0;
  newDst[ 5] = 2 * near / dy;
  newDst[ 6] = 0;
  newDst[ 7] = 0;
  newDst[ 8] = (left + right) / dx;
  newDst[ 9] = (top + bottom) / dy;
  newDst[10] = far / dz;
  newDst[11] = -1;
  newDst[12] = 0;
  newDst[13] = 0;
  newDst[14] = near * far / dz;
  newDst[15] = 0;

  return newDst;
}

/**
 * Computes a 4-by-4 reverse-z perspective transformation matrix given the left, right,
 * top, bottom, near and far clipping planes. The arguments define a frustum
 * extending in the negative z direction. The arguments near and far are the
 * distances to the near and far clipping planes. Note that near and far are not
 * z coordinates, but rather they are distances along the negative z-axis. The
 * matrix generated sends the viewing frustum to the unit box. We assume a unit
 * box extending from -1 to 1 in the x and y dimensions and from 1 (-near) to 0 (-far) in the z
 * dimension.
 * @param left - The x coordinate of the left plane of the box.
 * @param right - The x coordinate of the right plane of the box.
 * @param bottom - The y coordinate of the bottom plane of the box.
 * @param top - The y coordinate of the right plane of the box.
 * @param near - The negative z coordinate of the near plane of the box.
 * @param far - The negative z coordinate of the far plane of the box.
 * @param dst - Output matrix. If not passed a new one is created.
 * @returns The perspective projection matrix.
 */
function frustumReverseZ<T extends Mat4Arg = MatType>(left: number, right: number, bottom: number, top: number, near: number, far = Infinity, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const dx = (right - left);
  const dy = (top - bottom);

  newDst[ 0] = 2 * near / dx;
  newDst[ 1] = 0;
  newDst[ 2] = 0;
  newDst[ 3] = 0;
  newDst[ 4] = 0;
  newDst[ 5] = 2 * near / dy;
  newDst[ 6] = 0;
  newDst[ 7] = 0;
  newDst[ 8] = (left + right) / dx;
  newDst[ 9] = (top + bottom) / dy;
  newDst[11] = -1;
  newDst[12] = 0;
  newDst[13] = 0;
  newDst[15] = 0;

  if (far === Infinity) {
    newDst[10] = 0;
    newDst[14] = near;
  } else {
    const rangeInv = 1 / (far - near);
    newDst[10] = near * rangeInv;
    newDst[14] = far * near * rangeInv;
  }

  return newDst;
}

const xAxis = vec3.create();
const yAxis = vec3.create();
const zAxis = vec3.create();

/**
 * Computes a 4-by-4 aim transformation.
 *
 * This is a matrix which positions an object aiming down positive Z.
 * toward the target.
 *
 * Note: this is **NOT** the inverse of lookAt as lookAt looks at negative Z.
 *
 * @param position - The position of the object.
 * @param target - The position meant to be aimed at.
 * @param up - A vector pointing up.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The aim matrix.
 */
function aim<T extends Mat4Arg = MatType>(position: Vec3Arg, target: Vec3Arg, up: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  vec3.normalize(vec3.subtract(target, position, zAxis), zAxis);
  vec3.normalize(vec3.cross(up, zAxis, xAxis), xAxis);
  vec3.normalize(vec3.cross(zAxis, xAxis, yAxis), yAxis);

  newDst[ 0] = xAxis[0];     newDst[ 1] = xAxis[1];     newDst[ 2] = xAxis[2];     newDst[ 3] = 0;
  newDst[ 4] = yAxis[0];     newDst[ 5] = yAxis[1];     newDst[ 6] = yAxis[2];     newDst[ 7] = 0;
  newDst[ 8] = zAxis[0];     newDst[ 9] = zAxis[1];     newDst[10] = zAxis[2];     newDst[11] = 0;
  newDst[12] = position[0];  newDst[13] = position[1];  newDst[14] = position[2];  newDst[15] = 1;

  return newDst;
}

/**
 * Computes a 4-by-4 camera aim transformation.
 *
 * This is a matrix which positions an object aiming down negative Z.
 * toward the target.
 *
 * Note: this is the inverse of `lookAt`
 *
 * @param eye - The position of the object.
 * @param target - The position meant to be aimed at.
 * @param up - A vector pointing up.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The aim matrix.
 */
function cameraAim<T extends Mat4Arg = MatType>(eye: Vec3Arg, target: Vec3Arg, up: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  vec3.normalize(vec3.subtract(eye, target, zAxis), zAxis);
  vec3.normalize(vec3.cross(up, zAxis, xAxis), xAxis);
  vec3.normalize(vec3.cross(zAxis, xAxis, yAxis), yAxis);

  newDst[ 0] = xAxis[0];     newDst[ 1] = xAxis[1];     newDst[ 2] = xAxis[2];     newDst[ 3] = 0;
  newDst[ 4] = yAxis[0];     newDst[ 5] = yAxis[1];     newDst[ 6] = yAxis[2];     newDst[ 7] = 0;
  newDst[ 8] = zAxis[0];     newDst[ 9] = zAxis[1];     newDst[10] = zAxis[2];     newDst[11] = 0;
  newDst[12] = eye[0];  newDst[13] = eye[1];  newDst[14] = eye[2];  newDst[15] = 1;

  return newDst;
}

/**
 * Computes a 4-by-4 view transformation.
 *
 * This is a view matrix which transforms all other objects
 * to be in the space of the view defined by the parameters.
 *
 * @param eye - The position of the object.
 * @param target - The position meant to be aimed at.
 * @param up - A vector pointing up.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The look-at matrix.
 */
function lookAt<T extends Mat4Arg = MatType>(eye: Vec3Arg, target: Vec3Arg, up: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  vec3.normalize(vec3.subtract(eye, target, zAxis), zAxis);
  vec3.normalize(vec3.cross(up, zAxis, xAxis), xAxis);
  vec3.normalize(vec3.cross(zAxis, xAxis, yAxis), yAxis);

  newDst[ 0] = xAxis[0];  newDst[ 1] = yAxis[0];  newDst[ 2] = zAxis[0];  newDst[ 3] = 0;
  newDst[ 4] = xAxis[1];  newDst[ 5] = yAxis[1];  newDst[ 6] = zAxis[1];  newDst[ 7] = 0;
  newDst[ 8] = xAxis[2];  newDst[ 9] = yAxis[2];  newDst[10] = zAxis[2];  newDst[11] = 0;

  newDst[12] = -(xAxis[0] * eye[0] + xAxis[1] * eye[1] + xAxis[2] * eye[2]);
  newDst[13] = -(yAxis[0] * eye[0] + yAxis[1] * eye[1] + yAxis[2] * eye[2]);
  newDst[14] = -(zAxis[0] * eye[0] + zAxis[1] * eye[1] + zAxis[2] * eye[2]);
  newDst[15] = 1;

  return newDst;
}

/**
 * Creates a 4-by-4 matrix which translates by the given vector v.
 * @param v - The vector by
 *     which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translation matrix.
 */
function translation<T extends Mat4Arg = MatType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = 1;     newDst[ 1] = 0;     newDst[ 2] = 0;     newDst[ 3] = 0;
  newDst[ 4] = 0;     newDst[ 5] = 1;     newDst[ 6] = 0;     newDst[ 7] = 0;
  newDst[ 8] = 0;     newDst[ 9] = 0;     newDst[10] = 1;     newDst[11] = 0;
  newDst[12] = v[0];  newDst[13] = v[1];  newDst[14] = v[2];  newDst[15] = 1;

  return newDst;
}

/**
 * Translates the given 4-by-4 matrix by the given vector v.
 * @param m - The matrix.
 * @param v - The vector by
 *     which to translate.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The translated matrix.
 */
function translate<T extends Mat4Arg = MatType>(m: Mat4Arg, v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];

  if (m !== newDst) {
    newDst[ 0] = m00;
    newDst[ 1] = m01;
    newDst[ 2] = m02;
    newDst[ 3] = m03;
    newDst[ 4] = m10;
    newDst[ 5] = m11;
    newDst[ 6] = m12;
    newDst[ 7] = m13;
    newDst[ 8] = m20;
    newDst[ 9] = m21;
    newDst[10] = m22;
    newDst[11] = m23;
  }

  newDst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
  newDst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
  newDst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
  newDst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

  return newDst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
function rotationX<T extends Mat4Arg = MatType>(angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = 1;  newDst[ 1] =  0;  newDst[ 2] = 0;  newDst[ 3] = 0;
  newDst[ 4] = 0;  newDst[ 5] =  c;  newDst[ 6] = s;  newDst[ 7] = 0;
  newDst[ 8] = 0;  newDst[ 9] = -s;  newDst[10] = c;  newDst[11] = 0;
  newDst[12] = 0;  newDst[13] =  0;  newDst[14] = 0;  newDst[15] = 1;

  return newDst;
}

/**
 * Rotates the given 4-by-4 matrix around the x-axis by the given
 * angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
function rotateX<T extends Mat4Arg = MatType>(m: Mat4Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[4]  = c * m10 + s * m20;
  newDst[5]  = c * m11 + s * m21;
  newDst[6]  = c * m12 + s * m22;
  newDst[7]  = c * m13 + s * m23;
  newDst[8]  = c * m20 - s * m10;
  newDst[9]  = c * m21 - s * m11;
  newDst[10] = c * m22 - s * m12;
  newDst[11] = c * m23 - s * m13;

  if (m !== newDst) {
    newDst[ 0] = m[ 0];
    newDst[ 1] = m[ 1];
    newDst[ 2] = m[ 2];
    newDst[ 3] = m[ 3];
    newDst[12] = m[12];
    newDst[13] = m[13];
    newDst[14] = m[14];
    newDst[15] = m[15];
  }

  return newDst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
function rotationY<T extends Mat4Arg = MatType>(angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = c;  newDst[ 1] = 0;  newDst[ 2] = -s;  newDst[ 3] = 0;
  newDst[ 4] = 0;  newDst[ 5] = 1;  newDst[ 6] =  0;  newDst[ 7] = 0;
  newDst[ 8] = s;  newDst[ 9] = 0;  newDst[10] =  c;  newDst[11] = 0;
  newDst[12] = 0;  newDst[13] = 0;  newDst[14] =  0;  newDst[15] = 1;

  return newDst;
}

/**
 * Rotates the given 4-by-4 matrix around the y-axis by the given
 * angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
function rotateY<T extends Mat4Arg = MatType>(m: Mat4Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = c * m00 - s * m20;
  newDst[ 1] = c * m01 - s * m21;
  newDst[ 2] = c * m02 - s * m22;
  newDst[ 3] = c * m03 - s * m23;
  newDst[ 8] = c * m20 + s * m00;
  newDst[ 9] = c * m21 + s * m01;
  newDst[10] = c * m22 + s * m02;
  newDst[11] = c * m23 + s * m03;

  if (m !== newDst) {
    newDst[ 4] = m[ 4];
    newDst[ 5] = m[ 5];
    newDst[ 6] = m[ 6];
    newDst[ 7] = m[ 7];
    newDst[12] = m[12];
    newDst[13] = m[13];
    newDst[14] = m[14];
    newDst[15] = m[15];
  }

  return newDst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotation matrix.
 */
function rotationZ<T extends Mat4Arg = MatType>(angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] =  c;  newDst[ 1] = s;  newDst[ 2] = 0;  newDst[ 3] = 0;
  newDst[ 4] = -s;  newDst[ 5] = c;  newDst[ 6] = 0;  newDst[ 7] = 0;
  newDst[ 8] =  0;  newDst[ 9] = 0;  newDst[10] = 1;  newDst[11] = 0;
  newDst[12] =  0;  newDst[13] = 0;  newDst[14] = 0;  newDst[15] = 1;

  return newDst;
}

/**
 * Rotates the given 4-by-4 matrix around the z-axis by the given
 * angle.
 * @param m - The matrix.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
function rotateZ<T extends Mat4Arg = MatType>(m: Mat4Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  newDst[ 0] = c * m00 + s * m10;
  newDst[ 1] = c * m01 + s * m11;
  newDst[ 2] = c * m02 + s * m12;
  newDst[ 3] = c * m03 + s * m13;
  newDst[ 4] = c * m10 - s * m00;
  newDst[ 5] = c * m11 - s * m01;
  newDst[ 6] = c * m12 - s * m02;
  newDst[ 7] = c * m13 - s * m03;

  if (m !== newDst) {
    newDst[ 8] = m[ 8];
    newDst[ 9] = m[ 9];
    newDst[10] = m[10];
    newDst[11] = m[11];
    newDst[12] = m[12];
    newDst[13] = m[13];
    newDst[14] = m[14];
    newDst[15] = m[15];
  }

  return newDst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the given axis by the given
 * angle.
 * @param axis - The axis
 *     about which to rotate.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns A matrix which rotates angle radians
 *     around the axis.
 */
function axisRotation<T extends Mat4Arg = MatType>(axis: Vec3Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;

  newDst[ 0] = xx + (1 - xx) * c;
  newDst[ 1] = x * y * oneMinusCosine + z * s;
  newDst[ 2] = x * z * oneMinusCosine - y * s;
  newDst[ 3] = 0;
  newDst[ 4] = x * y * oneMinusCosine - z * s;
  newDst[ 5] = yy + (1 - yy) * c;
  newDst[ 6] = y * z * oneMinusCosine + x * s;
  newDst[ 7] = 0;
  newDst[ 8] = x * z * oneMinusCosine + y * s;
  newDst[ 9] = y * z * oneMinusCosine - x * s;
  newDst[10] = zz + (1 - zz) * c;
  newDst[11] = 0;
  newDst[12] = 0;
  newDst[13] = 0;
  newDst[14] = 0;
  newDst[15] = 1;

  return newDst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the given axis by the given
 * angle. (same as axisRotation)
 * @param axis - The axis
 *     about which to rotate.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns A matrix which rotates angle radians
 *     around the axis.
 */
const rotation = axisRotation;

/**
 * Rotates the given 4-by-4 matrix around the given axis by the
 * given angle.
 * @param m - The matrix.
 * @param axis - The axis
 *     about which to rotate.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
function axisRotate<T extends Mat4Arg = MatType>(m: Mat4Arg, axis: Vec3Arg, angleInRadians: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;

  const r00 = xx + (1 - xx) * c;
  const r01 = x * y * oneMinusCosine + z * s;
  const r02 = x * z * oneMinusCosine - y * s;
  const r10 = x * y * oneMinusCosine - z * s;
  const r11 = yy + (1 - yy) * c;
  const r12 = y * z * oneMinusCosine + x * s;
  const r20 = x * z * oneMinusCosine + y * s;
  const r21 = y * z * oneMinusCosine - x * s;
  const r22 = zz + (1 - zz) * c;

  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];

  newDst[ 0] = r00 * m00 + r01 * m10 + r02 * m20;
  newDst[ 1] = r00 * m01 + r01 * m11 + r02 * m21;
  newDst[ 2] = r00 * m02 + r01 * m12 + r02 * m22;
  newDst[ 3] = r00 * m03 + r01 * m13 + r02 * m23;
  newDst[ 4] = r10 * m00 + r11 * m10 + r12 * m20;
  newDst[ 5] = r10 * m01 + r11 * m11 + r12 * m21;
  newDst[ 6] = r10 * m02 + r11 * m12 + r12 * m22;
  newDst[ 7] = r10 * m03 + r11 * m13 + r12 * m23;
  newDst[ 8] = r20 * m00 + r21 * m10 + r22 * m20;
  newDst[ 9] = r20 * m01 + r21 * m11 + r22 * m21;
  newDst[10] = r20 * m02 + r21 * m12 + r22 * m22;
  newDst[11] = r20 * m03 + r21 * m13 + r22 * m23;

  if (m !== newDst) {
    newDst[12] = m[12];
    newDst[13] = m[13];
    newDst[14] = m[14];
    newDst[15] = m[15];
  }

  return newDst;
}

/**
 * Rotates the given 4-by-4 matrix around the given axis by the
 * given angle. (same as rotate)
 * @param m - The matrix.
 * @param axis - The axis
 *     about which to rotate.
 * @param angleInRadians - The angle by which to rotate (in radians).
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The rotated matrix.
 */
const rotate = axisRotate;

/**
 * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param v - A vector of
 *     three entries specifying the factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
function scaling<T extends Mat4Arg = MatType>(v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = v[0];  newDst[ 1] = 0;     newDst[ 2] = 0;     newDst[ 3] = 0;
  newDst[ 4] = 0;     newDst[ 5] = v[1];  newDst[ 6] = 0;     newDst[ 7] = 0;
  newDst[ 8] = 0;     newDst[ 9] = 0;     newDst[10] = v[2];  newDst[11] = 0;
  newDst[12] = 0;     newDst[13] = 0;     newDst[14] = 0;     newDst[15] = 1;

  return newDst;
}

/**
 * Scales the given 4-by-4 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param m - The matrix to be modified.
 * @param v - A vector of three entries specifying the
 *     factor by which to scale in each dimension.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
function scale<T extends Mat4Arg = MatType>(m: Mat4Arg, v: Vec3Arg, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  newDst[ 0] = v0 * m[0 * 4 + 0];
  newDst[ 1] = v0 * m[0 * 4 + 1];
  newDst[ 2] = v0 * m[0 * 4 + 2];
  newDst[ 3] = v0 * m[0 * 4 + 3];
  newDst[ 4] = v1 * m[1 * 4 + 0];
  newDst[ 5] = v1 * m[1 * 4 + 1];
  newDst[ 6] = v1 * m[1 * 4 + 2];
  newDst[ 7] = v1 * m[1 * 4 + 3];
  newDst[ 8] = v2 * m[2 * 4 + 0];
  newDst[ 9] = v2 * m[2 * 4 + 1];
  newDst[10] = v2 * m[2 * 4 + 2];
  newDst[11] = v2 * m[2 * 4 + 3];

  if (m !== newDst) {
    newDst[12] = m[12];
    newDst[13] = m[13];
    newDst[14] = m[14];
    newDst[15] = m[15];
  }

  return newDst;
}

/**
 * Creates a 4-by-4 matrix which scales a uniform amount in each dimension.
 * @param s - the amount to scale
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaling matrix.
 */
function uniformScaling<T extends Mat4Arg = MatType>(s: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = s;  newDst[ 1] = 0;  newDst[ 2] = 0;  newDst[ 3] = 0;
  newDst[ 4] = 0;  newDst[ 5] = s;  newDst[ 6] = 0;  newDst[ 7] = 0;
  newDst[ 8] = 0;  newDst[ 9] = 0;  newDst[10] = s;  newDst[11] = 0;
  newDst[12] = 0;  newDst[13] = 0;  newDst[14] = 0;  newDst[15] = 1;

  return newDst;
}

/**
 * Scales the given 4-by-4 matrix in each dimension by a uniform scale.
 * @param m - The matrix to be modified.
 * @param s - The amount to scale.
 * @param dst - matrix to hold result. If not passed a new one is created.
 * @returns The scaled matrix.
 */
function uniformScale<T extends Mat4Arg = MatType>(m: Mat4Arg, s: number, dst?: T) {
  const newDst = (dst ?? new Ctor(16)) as T;

  newDst[ 0] = s * m[0 * 4 + 0];
  newDst[ 1] = s * m[0 * 4 + 1];
  newDst[ 2] = s * m[0 * 4 + 2];
  newDst[ 3] = s * m[0 * 4 + 3];
  newDst[ 4] = s * m[1 * 4 + 0];
  newDst[ 5] = s * m[1 * 4 + 1];
  newDst[ 6] = s * m[1 * 4 + 2];
  newDst[ 7] = s * m[1 * 4 + 3];
  newDst[ 8] = s * m[2 * 4 + 0];
  newDst[ 9] = s * m[2 * 4 + 1];
  newDst[10] = s * m[2 * 4 + 2];
  newDst[11] = s * m[2 * 4 + 3];

  if (m !== newDst) {
    newDst[12] = m[12];
    newDst[13] = m[13];
    newDst[14] = m[14];
    newDst[15] = m[15];
  }

  return newDst;
}

return {
  create,
  set,
  fromMat3,
  fromQuat,
  negate,
  copy,
  clone,
  equalsApproximately,
  equals,
  identity,
  transpose,
  inverse,
  determinant,
  invert,
  multiply,
  mul,
  setTranslation,
  getTranslation,
  getAxis,
  setAxis,
  getScaling,
  perspective,
  perspectiveReverseZ,
  ortho,
  frustum,
  frustumReverseZ,
  aim,
  cameraAim,
  lookAt,
  translation,
  translate,
  rotationX,
  rotateX,
  rotationY,
  rotateY,
  rotationZ,
  rotateZ,
  axisRotation,
  rotation,
  axisRotate,
  rotate,
  scaling,
  scale,
  uniformScaling,
  uniformScale,
};

}


type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;

const cache = new Map();

export function getAPI<T extends Mat4Arg = Float32Array>(Ctor: Mat4Ctor<T>) {
  let api = cache.get(Ctor);
  if (!api) {
    api = getAPIImpl<T>(Ctor);
    cache.set(Ctor, api);
  }
  return api as API<T>;
}
