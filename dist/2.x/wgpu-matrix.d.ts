import * as types from './array-like';
import * as mat3 from './mat3-impl';
import * as mat4 from './mat4-impl';
import * as vec2 from './vec2-impl';
import * as vec3 from './vec3-impl';
import * as vec4 from './vec4-impl';
import * as utils from './utils';
/**
 * Sets the type this library creates for all types
 * @remarks
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
export { mat3, mat4, types, // for docs
utils, vec2, vec3, vec4, };
