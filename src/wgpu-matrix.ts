import {BaseArgType, ZeroArray} from './types';
import {Mat3Arg, Mat3 as Mat3Type, getAPI as getMat3API} from './mat3-impl';
import {Mat4Arg, Mat4 as Mat4Type, getAPI as getMat4API} from './mat4-impl';
import {QuatArg, Quat as QuatType, getAPI as getQuatAPI, RotationOrder} from './quat-impl';
import {Vec2Arg, Vec2 as Vec2Type, getAPI as getVec2API} from './vec2-impl';
import {Vec3Arg, Vec3 as Vec3Type, getAPI as getVec3API} from './vec3-impl';
import {Vec4Arg, Vec4 as Vec4Type, getAPI as getVec4API} from './vec4-impl';
import * as utils from './utils';

//export type Mat4<T extends Mat4Arg> = T;
export { BaseArgType };

/** @namespace */
const mat4 = getMat4API(Float32Array);
/** @namespace */
const mat4d = getMat4API(Float64Array);
/** @namespace */
const mat4n = getMat4API(ZeroArray);

/** @namespace */
const mat3 = getMat3API(Float32Array);
/** @namespace */
const mat3d = getMat3API(Float64Array);
/** @namespace */
const mat3n = getMat3API(ZeroArray);

/** @namespace */
const quat = getQuatAPI(Float32Array);
/** @namespace */
const quatd = getQuatAPI(Float64Array);
/** @namespace */
const quatn = getQuatAPI(ZeroArray);

/** @namespace */
const vec2 = getVec2API(Float32Array);
/** @namespace */
const vec2d = getVec2API(Float64Array);
/** @namespace */
const vec2n = getVec2API(ZeroArray);

/** @namespace */
const vec3 = getVec3API(Float32Array);
/** @namespace */
const vec3d = getVec3API(Float64Array);
/** @namespace */
const vec3n = getVec3API(ZeroArray);

/** @namespace */
const vec4 = getVec4API(Float32Array);
/** @namespace */
const vec4d = getVec4API(Float64Array);
/** @namespace */
const vec4n = getVec4API(ZeroArray);

///** @namespace */
//const wgpuMatrix = wgpuMatrixAPI(Float32Array);
//export default wgpuMatrix;

type Mat3 = Mat3Type<Float32Array>;
type Mat4 = Mat4Type<Float32Array>;
type Quat = QuatType<Float32Array>;
type Vec2 = Vec2Type<Float32Array>;
type Vec3 = Vec3Type<Float32Array>;
type Vec4 = Vec4Type<Float32Array>;

type Mat3d = Mat3Type<Float64Array>;
type Mat4d = Mat4Type<Float64Array>;
type Quatd = QuatType<Float64Array>;
type Vec2d = Vec2Type<Float64Array>;
type Vec3d = Vec3Type<Float64Array>;
type Vec4d = Vec4Type<Float64Array>;

type Mat3n = Mat3Type<number[]>;
type Mat4n = Mat4Type<number[]>;
type Quatn = QuatType<number[]>;
type Vec2n = Vec2Type<number[]>;
type Vec3n = Vec3Type<number[]>;
type Vec4n = Vec4Type<number[]>;

export {
  Mat3,
  Mat3d,
  Mat3n,
  Mat3Arg,
  mat3,
  mat3d,
  mat3n,

  Mat4,
  Mat4d,
  Mat4n,
  Mat4Arg,
  mat4,
  mat4d,
  mat4n,

  Quat,
  Quatd,
  Quatn,
  QuatArg,
  quat,
  quatd,
  quatn,
  RotationOrder,

  utils,

  Vec2,
  Vec2d,
  Vec2n,
  Vec2Arg,
  vec2,
  vec2d,
  vec2n,

  Vec3,
  Vec3d,
  Vec3n,
  Vec3Arg,
  vec3,
  vec3d,
  vec3n,

  Vec4,
  Vec4d,
  Vec4n,
  Vec4Arg,
  vec4,
  vec4d,
  vec4n,
};