import {setDefaultType, mat3, mat4, vec2, vec3, vec4} from '../../dist/2.x/wgpu-matrix.module.js';

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
