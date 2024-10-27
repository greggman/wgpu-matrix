/**
 * Some docs
 * @namespace wgpu-matrix
 */
import {MutableNumberArray, BaseArgType, ZeroArray} from './types';
import {Mat3Arg, Mat3Type, getAPI as getMat3API} from './mat3-impl';
import {Mat4Arg, Mat4Type, getAPI as getMat4API} from './mat4-impl';
import {QuatArg, QuatType, getAPI as getQuatAPI, RotationOrder} from './quat-impl';
import {Vec2Arg, Vec2Type, getAPI as getVec2API} from './vec2-impl';
import {Vec3Arg, Vec3Type, getAPI as getVec3API} from './vec3-impl';
import {Vec4Arg, Vec4Type, getAPI as getVec4API} from './vec4-impl';
import * as utils from './utils';

export {
  RotationOrder,
  utils,

  MutableNumberArray,
  BaseArgType,

  Mat3Arg,
  Mat4Arg,
  QuatArg,
  Vec2Arg,
  Vec3Arg,
  Vec4Arg,

  Mat3Type,
  Mat4Type,
  QuatType,
  Vec2Type,
  Vec3Type,
  Vec4Type,
};

export type BaseCtor<T extends BaseArgType>  = new (n: number) => T;

export type Mat3 = Mat3Type<Float32Array>;
export type Mat4 = Mat4Type<Float32Array>;
export type Quat = QuatType<Float32Array>;
export type Vec2 = Vec2Type<Float32Array>;
export type Vec3 = Vec3Type<Float32Array>;
export type Vec4 = Vec4Type<Float32Array>;

export type Mat3d = Mat3Type<Float64Array>;
export type Mat4d = Mat4Type<Float64Array>;
export type Quatd = QuatType<Float64Array>;
export type Vec2d = Vec2Type<Float64Array>;
export type Vec3d = Vec3Type<Float64Array>;
export type Vec4d = Vec4Type<Float64Array>;

export type Mat3n = Mat3Type<number[]>;
export type Mat4n = Mat4Type<number[]>;
export type Quatn = QuatType<number[]>;
export type Vec2n = Vec2Type<number[]>;
export type Vec3n = Vec3Type<number[]>;
export type Vec4n = Vec4Type<number[]>;

/**
 * Generate wgpu-matrix API for type
 */
function wgpuMatrixAPI<
    Mat3 extends BaseArgType,
    Mat4 extends BaseArgType,
    Quat extends BaseArgType,
    Vec2 extends BaseArgType,
    Vec3 extends BaseArgType,
    Vec4 extends BaseArgType,
>(
    Mat3Ctor: BaseCtor<Mat3>,
    Mat4Ctor: BaseCtor<Mat4>,
    QuatCtor: BaseCtor<Quat>,
    Vec2Ctor: BaseCtor<Vec2>,
    Vec3Ctor: BaseCtor<Vec3>,
    Vec4Ctor: BaseCtor<Vec4>,
) {
  return {
    /** @namespace mat3 */
    mat3: getMat3API<Mat3>(Mat3Ctor),
    /** @namespace mat4 */
    mat4: getMat4API<Mat4>(Mat4Ctor),
    /** @namespace quat */
    quat: getQuatAPI<Quat>(QuatCtor),
    /** @namespace vec2 */
    vec2: getVec2API<Vec2>(Vec2Ctor),
    /** @namespace vec3 */
    vec3: getVec3API<Vec3>(Vec3Ctor),
    /** @namespace vec4 */
    vec4: getVec4API<Vec4>(Vec4Ctor),
  };
}

export const {
  /**
   * 3x3 Matrix functions that default to returning `Float32Array`
   * @namespace
   */
  mat3,
  /**
   * 4x4 Matrix functions that default to returning `Float32Array`
   * @namespace
   */
  mat4,
  /**
   * Quaternion functions that default to returning `Float32Array`
   * @namespace
   */
  quat,
  /**
   * Vec2 functions that default to returning `Float32Array`
   * @namespace
   */
  vec2,
  /**
   * Vec3 functions that default to returning `Float32Array`
   * @namespace
   */
  vec3,
  /**
   * Vec3 functions that default to returning `Float32Array`
   * @namespace
   */
  vec4,
} = wgpuMatrixAPI<
  Mat3, Mat4, Quat, Vec2, Vec3, Vec4>(
    Float32Array, Float32Array, Float32Array, Float32Array, Float32Array, Float32Array);

export const {
  /**
   * 3x3 Matrix functions that default to returning `Float64Array`
   * @namespace
   */
  mat3: mat3d,
  /**
   * 4x4 Matrix functions that default to returning `Float64Array`
   * @namespace
   */
  mat4: mat4d,
  /**
   * Quaternion functions that default to returning `Float64Array`
   * @namespace
   */
  quat: quatd,
  /**
   * Vec2 functions that default to returning `Float64Array`
   * @namespace
   */
  vec2: vec2d,
  /**
   * Vec3 functions that default to returning `Float64Array`
   * @namespace
   */
  vec3: vec3d,
  /**
   * Vec3 functions that default to returning `Float64Array`
   * @namespace
   */
  vec4: vec4d,
} = wgpuMatrixAPI<
  Mat3d, Mat4d, Quatd, Vec2d, Vec3d, Vec4d>(
    Float64Array, Float64Array, Float64Array, Float64Array, Float64Array, Float64Array);

export const {
  /**
   * 3x3 Matrix functions that default to returning `number[]`
   * @namespace
   */
  mat3: mat3n,
  /**
   * 4x4 Matrix functions that default to returning `number[]`
   * @namespace
   */
  mat4: mat4n,
  /**
   * Quaternion functions that default to returning `number[]`
   * @namespace
   */
  quat: quatn,
  /**
   * Vec2 functions that default to returning `number[]`
   * @namespace
   */
  vec2: vec2n,
  /**
   * Vec3 functions that default to returning `number[]`
   * @namespace
   */
  vec3: vec3n,
  /**
   * Vec3 functions that default to returning `number[]`
   * @namespace
   */
  vec4: vec4n,
} = wgpuMatrixAPI<
  Mat3n, Mat4n, Quatn, Vec2n, Vec3n, Vec4n>(
    ZeroArray, Array, Array, Array, Array, Array);
