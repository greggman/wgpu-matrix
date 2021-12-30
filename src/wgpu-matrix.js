import * as mat3 from './mat3.js';
import * as mat4 from './mat4.js';
import * as vec2 from './vec2.js';
import * as vec3 from './vec3.js';
import * as vec4 from './vec4.js';
import * as utils from './utils.js';

/**
 * Sets the type this library creates for all types
 * @param {constructor} ctor the constructor for the type. Either `Float32Array`, 'Float64Array', or `Array`
 */
export function setDefaultType(ctor) {
  mat3.setDefaultType(ctor);
  mat4.setDefaultType(ctor);
  vec2.setDefaultType(ctor);
  vec3.setDefaultType(ctor);
  vec4.setDefaultType(ctor);
}

export {
  mat3,
  mat4,
  vec2,
  vec3,
  vec4,
  utils,
};