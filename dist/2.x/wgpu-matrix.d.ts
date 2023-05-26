import Mat3, * as mat3 from './mat3-impl';
import Mat4, * as mat4 from './mat4-impl';
import Quat, * as quat from './quat-impl';
import Vec2, * as vec2 from './vec2-impl';
import Vec3, * as vec3 from './vec3-impl';
import Vec4, * as vec4 from './vec4-impl';
import * as utils from './utils';
/**
 * Sets the type this library creates for all types
 *
 * example:
 *
 * ```
 * setDefaultType(Float64Array);
 * ```
 *
 * @param ctor - the constructor for the type. Either `Float32Array`, `Float64Array`, or `Array`
 */
export declare function setDefaultType(ctor: new (n: number) => Float32Array | Float64Array | number[]): void;
export { Mat3, mat3, Mat4, mat4, Quat, quat, utils, Vec2, vec2, Vec3, vec3, Vec4, vec4, };
