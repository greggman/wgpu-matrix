import {setDefaultType} from '../../src/wgpu-matrix.js';
import * as mat4 from '../../src/mat4.js';
import * as vec2 from '../../src/vec2.js';
import * as vec3 from '../../src/vec3.js';
import * as vec4 from '../../src/vec4.js';


import {
  assertInstanceOf,
} from '../assert.js';

import {describe, it} from '../mocha-support.js';

describe('wgpu-matrix', () => {

  function check(Type) {

    it(`setsDefaultType to ${Type}`, () => {
      setDefaultType(Type);
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
