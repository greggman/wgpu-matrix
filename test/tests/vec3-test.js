import {vec3, utils} from '../../dist/2.x/wgpu-matrix.module.js';

import {
  assertEqual,
  assertInstanceOf,
  assertLessThan,
  assertStrictEqual,
  assertStrictNotEqual,
  assertIsArray,
  assertEqualApproximately,
  assertTruthy,
  assertFalsy,
} from '../assert.js';
import {describe, it, before} from '../mocha-support.js';

// Note: vec3.create is use extensively in these tests but that is NOT idiomatic!
// Idiomatic usage use to use raw JS arrays where convenient. For example
//
// const up = [0, 1, 0];
// const m = m4.lookAt(target, eye, up);
//
// The reason vec3.create is used in the tests is to make sure we are working
// with the specified default type when testing.

function check(Type) {
  describe('using ' + Type, () => {

    before(() => {
      vec3.setDefaultType(Type);
    });

    function elementsEqual(a, b) {
      assertStrictEqual(a.length, b.length);
      for (let i = 0; i < a.length; ++i) {
        const diff = Math.abs(a[i] - b[i]);
        assertLessThan(diff, 0.0000001);
      }
    }

    function testV3WithoutDest(func, expected, ...args) {
      const v = args.shift();
        const d = func(vec3.clone(v), ...args);
      assertEqual(d, expected);
      assertInstanceOf(d, Type);
    }

    function testV3WithDest(func, expected, ...args) {
      const v = args.shift();
      // clone expected so we can check it wasn't modified
      expected = vec3.clone(expected);
      let d = vec3.create();
      // clone v to make sure it's the correct type
      let c = func(vec3.clone(v), ...args, d);
      assertStrictEqual(c, d);
      assertEqual(c, expected);

      // test if we pass same vector as source and dest we get
      // correct result
      d = vec3.clone(v);
      // clone args to make sure we don't overwrite first arg
      const bOrig = args.map(b => b.slice(b));
      c = func(d, ...args, d);
      assertStrictEqual(c, d);
      elementsEqual(c, expected);
      args.forEach((b, ndx) => {
        assertEqual(b, bOrig[ndx]);
      });

      // test if we pass operand as dest we get correct result
      if (args.length > 0) {
        d = vec3.clone(args[0]);
        // clone v to make sure it is not overwritten
        const vOrig = vec3.clone(v);
        c = func(v, d, d);
        elementsEqual(c, expected);
        assertEqual(v, vOrig);
        assertStrictEqual(c, d);
     }
    }

    function testV3WithAndWithoutDest(func, expected, ...args) {
      expected = vec3.clone(expected);
      testV3WithoutDest(func, expected, ...args);
      testV3WithDest(func, expected, ...args);
    }

    it('should add', () => {
      const expected = [3, 5, 7];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.add(a, b, dst);
      }, expected, [1, 2, 3], [2, 3, 4]);
    });

    it('should compute angle', () => {
      const tests = [
        { a: [1, 0, 0], b: [ 0, 1, 0], expected: Math.PI / 2, },
        { a: [1, 0, 0], b: [-1, 0, 0], expected: Math.PI, },
        { a: [1, 0, 0], b: [ 1, 0, 0], expected: 0, },
        { a: [1, 2, 3], b: [ 4, 5, 6], expected: 0.225726 },
        { a: [1, 0, 0], b: [ 0, Number.POSITIVE_INFINITY, 0], expected: Math.PI / 2, },
      ];
      for (const {a, b, expected} of tests) {
        const av = vec3.create(...a);
        const bv = vec3.create(...b);
        assertEqualApproximately(vec3.angle(av, bv), expected);
        vec3.mulScalar(av, 1000, av);
        vec3.mulScalar(bv, 1000, bv);
        assertEqualApproximately(vec3.angle(av, bv), expected);
      }
    });

    it('should compute ceil', () => {
      const expected = [2, -1, 3];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.ceil(a, dst);
      }, expected, [1.1, -1.1, 2.9]);
    });

    it('should compute floor', () => {
      const expected = [1, -2, 2];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.floor(a, dst);
      }, expected, [1.1, -1.1, 2.9]);
    });

    it('should compute round', () => {
      const expected = [1, -1, 3];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.round(a, dst);
      }, expected, [1.1, -1.1, 2.9]);
    });

    it('should clamp', () => {
      {
        const expected = [1, 0, 0.5];
        testV3WithAndWithoutDest((a, dst) => {
          return vec3.clamp(a, 0, 1, dst);
        }, expected, [2, -1, 0.5]);
      }
      {
        const expected = [-10, 5, 2.9];
        testV3WithAndWithoutDest((a, dst) => {
          return vec3.clamp(a, -10, 5, dst);
        }, expected, [-22, 50, 2.9]);
      }
    });

    it('should equals approximately', () => {
      assertTruthy(vec3.equalsApproximately(vec3.create(1, 2, 3), vec3.create(1, 2, 3)));
      assertTruthy(vec3.equalsApproximately(vec3.create(1, 2, 3), vec3.create(1 + utils.EPSILON * 0.5, 2, 3)));
      assertFalsy(vec3.equalsApproximately(vec3.create(1, 2, 3), vec3.create(1.001, 2, 3)));
    });

    it('should equals', () => {
      assertTruthy(vec3.equals(vec3.create(1, 2, 3), vec3.create(1, 2, 3)));
      assertFalsy(vec3.equals(vec3.create(1, 2, 3), vec3.create(1 + utils.EPSILON * 0.5, 2, 3)));
    });

    it('should subtract', () => {
      const expected = [-1, -2, -3];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.subtract(a, b, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should sub', () => {
      const expected = [-1, -2, -3];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.sub(a, b, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should lerp', () => {
      const expected = [1.5, 3, 4.5];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.lerp(a, b, 0.5, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should lerp under 0', () => {
      const expected = [0.5, 1, 1.5];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.lerp(a, b, -0.5, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should lerp over 0', () => {
      const expected = [2.5, 5, 7.5];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.lerp(a, b, 1.5, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should multiply by scalar', () => {
      const expected = [2, 4, 6];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.mulScalar(a, 2, dst);
      }, expected, [1, 2, 3]);
    });

    it('should scale', () => {
      const expected = [2, 4, 6];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.scale(a, 2, dst);
      }, expected, [1, 2, 3]);
    });

    it('should add scaled', () => {
      const expected = [5, 10, 15];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.addScaled(a, [2, 4, 6], 2, dst);
      }, expected, [1, 2, 3]);
    });

    it('should divide by scalar', () => {
      const expected = [0.5, 1, 1.5];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.divScalar(a, 2, dst);
      }, expected, [1, 2, 3]);
    });

    it('should inverse', () => {
      const expected = [1 / 2, 1 / 3, 1 / -4];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.inverse(a, dst);
      }, expected, [2, 3, -4]);
    });

    it('should cross', () => {
      const expected = [
        2 * 6 - 3 * 4,
        3 * 2 - 1 * 6,
        1 * 4 - 2 * 2,
      ];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.cross(a, b, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should compute dot product', () => {
      const expected = 1 * 2 + 2 * 4 + 3 * 6;
      const value = vec3.dot(vec3.create(1, 2, 3), vec3.create(2, 4, 6));
      assertStrictEqual(value, expected);
    });

    it('should compute length', () => {
      const expected = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3);
      const value = vec3.length(vec3.create(1, 2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute length squared', () => {
      const expected = 1 * 1 + 2 * 2 + 3 * 3;
      const value = vec3.lengthSq(vec3.create(1, 2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute len', () => {
      const expected = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3);
      const value = vec3.len(vec3.create(1, 2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute lenSq', () => {
      const expected = 1 * 1 + 2 * 2 + 3 * 3;
      const value = vec3.lenSq(vec3.create(1, 2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute distance', () => {
      const expected = Math.sqrt(2 * 2 + 3 * 3 + 4 * 4);
      const value = vec3.distance(vec3.create(1, 2, 3), [3, 5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should compute distance squared', () => {
      const expected = 2 * 2 + 3 * 3 + 4 * 4;
      const value = vec3.distanceSq(vec3.create(1, 2, 3), [3, 5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should compute dist', () => {
      const expected = Math.sqrt(2 * 2 + 3 * 3 + 4 * 4);
      const value = vec3.dist(vec3.create(1, 2, 3), [3, 5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should compute dist squared', () => {
      const expected = 2 * 2 + 3 * 3 + 4 * 4;
      const value = vec3.distSq(vec3.create(1, 2, 3), [3, 5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should normalize', () => {
      const length = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3);
      const expected = [
        1 / length,
        2 / length,
        3 / length,
      ];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.normalize(a, dst);
      }, expected, [1, 2, 3]);
    });

    it('should negate', () => {
      const expected = [-1, -2, -3];
      testV3WithAndWithoutDest((a, dst) => {
        return vec3.negate(a, dst);
      }, expected, [1, 2, 3]);
    });

    it('should copy', () => {
      const expected = [1, 2, 3];
      const v = vec3.create(1, 2, 3);
      testV3WithAndWithoutDest((a, dst) => {
        const result = vec3.copy(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3]);
    });

    it('should clone', () => {
      const expected = [1, 2, 3];
      const v = vec3.create(1, 2, 3);
      testV3WithAndWithoutDest((a, dst) => {
        const result = vec3.clone(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3]);
    });

    it('should multiply', () => {
      const expected = [2, 8, 18];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.multiply(a, b, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should mul', () => {
      const expected = [2, 8, 18];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.mul(a, b, dst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should divide', () => {
      const expected = [
        1 / 2, 2 / 3, 3 / 4,
      ];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.divide(a, b, dst);
      }, expected, [1, 2, 3], [2, 3, 4]);
    });

    it('should div', () => {
      const expected = [
        1 / 2, 2 / 3, 3 / 4,
      ];
      testV3WithAndWithoutDest((a, b, dst) => {
        return vec3.div(a, b, dst);
      }, expected, [1, 2, 3], [2, 3, 4]);
    });

    it('should fromValues', () => {
      const expected = vec3.create(1, 2, 3);
      const v1 = vec3.fromValues(1, 2, 3);
      assertEqual(v1, expected);
    });

    it('should random', () => {
      for (let i = 0; i < 100; ++i) {
        const v1 = vec3.random();
        assertEqualApproximately(vec3.length(v1), 1);
        const v2 = vec3.random(2);
        assertEqualApproximately(vec3.length(v2), 2);
        const vp5 = vec3.random(0.5);
        assertEqualApproximately(vec3.length(vp5), 0.5);
        const vd = vec3.create();
        const vn = vec3.random(3, vd);
        assertStrictEqual(vd, vn);
        assertEqualApproximately(vec3.length(3, vd), 3);
      }
    });

    it('should transform by 3x3', () => {
      const expected = [4, 10, 18];
      const m = [
        4, 0, 0, 0,
        0, 5, 0, 0,
        0, 0, 6, 0,
      ];
      testV3WithAndWithoutDest((v, dst) => {
        return vec3.transformMat3(v, m, dst);
      }, expected, [1, 2, 3]);
    });

    it('should transform by 4x4', () => {
      const expected = [5, 9, 15];
      testV3WithAndWithoutDest((v, dst) => {
        const m = [
          1, 0, 0, 0,
          0, 2, 0, 0,
          0, 0, 3, 0,
          4, 5, 6, 1,
        ];
        return vec3.transformMat4(v, m, dst);
      }, expected, [1, 2, 3]);
    });

    it('should transform by 4x4Upper3x3', () => {
      const expected = [2, 6, 12];
      const m = [
        1, 0, 0, 0,
        0, 2, 0, 0,
        0, 0, 3, 0,
        4, 5, 6, 1,
      ];
      testV3WithAndWithoutDest((v, mat, dst) => {
        return vec3.transformMat4Upper3x3(v, mat, dst);
      }, expected, [2, 3, 4], m);
    });

    it('should zero', () => {
      const v = vec3.zero();
      assertEqual(v, [0, 0, 0]);
      const v2 = vec3.create(1, 2, 3);
      const vn = vec3.zero(v2);
      assertStrictEqual(v2, vn);
      assertEqual(v2, [0, 0, 0]);
    });

  });
}

describe('vec3', () => {

  it('should set default type', () => {
    vec3.setDefaultType(Array);
    let d = vec3.create(1, 2, 3);
    assertIsArray(d);

    d = vec3.add([1, 2, 3], [4, 5, 6]);
    assertIsArray(d);

    vec3.setDefaultType(Float32Array);
    d = vec3.create(1, 2, 3);
    assertInstanceOf(d, Float32Array);

    d = vec3.add([1, 2, 3], [4, 5, 6]);
    assertInstanceOf(d, Float32Array);
  });

  check(Array);
  check(Float32Array);
  check(Float64Array);

});

