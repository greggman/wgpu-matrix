/* global setDefaultType */
/* global mat3 */
/* global mat4 */
/* global vec2 */
/* global vec3 */
/* global vec4 */

import {
  assertInstanceOf,
} from '../assert.js';

import {describe, it} from '../mocha-support.js';

describe('wgpu-matrix', () => {

  function check(Type) {

    it(`setsDefaultType to ${Type}`, () => {
      setDefaultType(Type);
      assertInstanceOf(mat3.create(), Type);
      assertInstanceOf(mat4.create(), Type);
      assertInstanceOf(vec2.create(), Type);
      assertInstanceOf(vec3.create(), Type);
      assertInstanceOf(vec4.create(), Type);
    });

  }

  check(Array);
  check(Float64Array);
  check(Float32Array);
});
