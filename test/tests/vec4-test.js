/* global vec4 utils */

import {
  assertEqual,
  assertInstanceOf,
  assertLessThan,
  assertStrictEqual,
  assertStrictNotEqual,
  assertIsArray,
  assertTruthy,
  assertFalsy,
} from '../assert.js';
import {describe, it, before} from '../mocha-support.js';

// Note: v3.create is use extensively in these tests but that is NOT idiomatic!
// Idiomatic usage use to use raw JS arrays where convenient. For example
//
// const up = [0, 1, 0];
// const m = m4.lookAt(target, eye, up);
//
// The reason v3.create is used in the tests is to make sure we are working
// with the specified default type when testing.

function check(Type) {
  describe('using ' + Type, () => {

    before(() => {
      vec4.setDefaultType(Type);
    });

    function elementsEqual(a, b) {
      assertStrictEqual(a.length, b.length);
      for (let i = 0; i < a.length; ++i) {
        const diff = Math.abs(a[i] - b[i]);
        assertLessThan(diff, 0.0000001);
      }
    }

    function testV4WithoutDest(func, expected, ...args) {
      const v = args.shift();
        const d = func(vec4.clone(v), ...args);
      assertEqual(d, expected);
      assertInstanceOf(d, Type);
    }

    function testV4WithDest(func, expected, ...args) {
      const v = args.shift();
      // clone expected so we can check it wasn't modified
      expected = vec4.clone(expected);
      let d = vec4.create();
      // clone v to make sure it's the correct type
      let c = func(vec4.clone(v), ...args, d);
      assertStrictEqual(c, d);
      assertEqual(c, expected);

      // test if we pass same vector as source and dest we get
      // correct result
      d = vec4.clone(v);
      // clone args to make sure we don't overwrite first arg
      const bOrig = args.map(b => b.slice());
      c = func(d, ...args, d);
      assertStrictEqual(c, d);
      elementsEqual(c, expected);
      args.forEach((b, ndx) => {
        assertEqual(b, bOrig[ndx]);
      });

      // test if we pass operand as dest we get correct result
      if (args.length > 0) {
        d = vec4.clone(args[0]);
        // clone v to make sure it is not overwritten
        const vOrig = vec4.clone(v);
        c = func(v, d, d);
        elementsEqual(c, expected);
        assertEqual(v, vOrig);
        assertStrictEqual(c, d);
     }
    }

    function testV4WithAndWithoutDest(func, expected, ...args) {
      expected = vec4.clone(expected);
      testV4WithoutDest(func, expected, ...args);
      testV4WithDest(func, expected, ...args);
    }

    it('should add', () => {
      const expected = [3, 5, 7, 9];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.add(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 3, 4, 5]);
    });

    it('should compute ceil', () => {
      const expected = [2, -1, 3, -4];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.ceil(a, dst);
      }, expected, [1.1, -1.1, 2.9, -4.2]);
    });

    it('should compute floor', () => {
      const expected = [1, -2, 2, -4];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.floor(a, dst);
      }, expected, [1.1, -1.1, 2.9, -3.1]);
    });

    it('should compute round', () => {
      const expected = [1, -1, 3, 0];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.round(a, dst);
      }, expected, [1.1, -1.1, 2.9, 0.1]);
    });

    it('should clamp', () => {
      {
        const expected = [1, 0, 0.5, 0];
        testV4WithAndWithoutDest((a, dst) => {
          return vec4.clamp(a, 0, 1, dst);
        }, expected, [2, -1, 0.5, -4]);
      }
      {
        const expected = [-10, 5, 2.9, -9];
        testV4WithAndWithoutDest((a, dst) => {
          return vec4.clamp(a, -10, 5, dst);
        }, expected, [-22, 50, 2.9, -9]);
      }
    });

    it('should equals approximately', () => {
      assertTruthy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3, 4)));
      assertTruthy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1 + utils.EPSILON * 0.5, 2, 3, 4)));
      assertTruthy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1, 2 + utils.EPSILON * 0.5, 3, 4)));
      assertTruthy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3 + utils.EPSILON * 0.5, 4)));
      assertTruthy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3, 4 + utils.EPSILON * 0.5)));
      assertFalsy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1.0001, 2, 3, 4)));
      assertFalsy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1, 2.0001, 3, 4)));
      assertFalsy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3.0001, 4)));
      assertFalsy(vec4.equalsApproximately(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3, 4.0001)));
    });

    it('should equals', () => {
      assertTruthy(vec4.equals(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3, 4)));
      assertFalsy(vec4.equals(vec4.create(1, 2, 3, 4), vec4.create(1 + utils.EPSILON * 0.5, 2, 3, 4)));
      assertFalsy(vec4.equals(vec4.create(1, 2, 3, 4), vec4.create(1, 2 + utils.EPSILON * 0.5, 3, 4)));
      assertFalsy(vec4.equals(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3 + utils.EPSILON * 0.5, 4)));
      assertFalsy(vec4.equals(vec4.create(1, 2, 3, 4), vec4.create(1, 2, 3, 4 + utils.EPSILON * 0.5)));
    });

    it('should subtract', () => {
      const expected = [-1, -2, -3, -4];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.subtract(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should sub', () => {
      const expected = [-1, -2, -3, -4];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.sub(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should lerp', () => {
      const expected = [1.5, 3, 4.5, 6];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.lerp(a, b, 0.5, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should lerp under 0', () => {
      const expected = [0.5, 1, 1.5, 2];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.lerp(a, b, -0.5, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should lerp over 0', () => {
      const expected = [2.5, 5, 7.5, 10];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.lerp(a, b, 1.5, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should multiply by scalar', () => {
      const expected = [2, 4, 6, 8];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.mulScalar(a, 2, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should scale', () => {
      const expected = [2, 4, 6, 8];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.scale(a, 2, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should add scaled', () => {
      const expected = [5, 10, 15, 20];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.addScaled(a, [2, 4, 6, 8], 2, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should divide by scalar', () => {
      const expected = [0.5, 1, 1.5, 2];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.divScalar(a, 2, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should inverse', () => {
      const expected = [1 / 2, 1 / 3, 1 / -4, 1 / -8];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.inverse(a, dst);
      }, expected, [2, 3, -4, -8]);
    });

    it('should compute dot product', () => {
      const expected = 1 * 2 + 2 * 4 + 3 * 6 + 4 * 8;
      const value = vec4.dot(vec4.create(1, 2, 3, 4), vec4.create(2, 4, 6, 8));
      assertStrictEqual(value, expected);
    });

    it('should compute length', () => {
      const expected = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4);
      const value = vec4.length(vec4.create(1, 2, 3, 4));
      assertStrictEqual(value, expected);
    });

    it('should compute length squared', () => {
      const expected = 1 * 1 + 2 * 2 + 3 * 3 + 4 * 4;
      const value = vec4.lengthSq(vec4.create(1, 2, 3, 4));
      assertStrictEqual(value, expected);
    });

    it('should compute len', () => {
      const expected = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4);
      const value = vec4.len(vec4.create(1, 2, 3, 4));
      assertStrictEqual(value, expected);
    });

    it('should compute lenSq', () => {
      const expected = 1 * 1 + 2 * 2 + 3 * 3 + 4 * 4;
      const value = vec4.lenSq(vec4.create(1, 2, 3, 4));
      assertStrictEqual(value, expected);
    });

    it('should compute distance', () => {
      const expected = Math.sqrt(2 * 2 + 3 * 3 + 4 * 4 + 5 * 5);
      const value = vec4.distance(vec4.create(1, 2, 3, 4), [3, 5, 7, 9]);
      assertStrictEqual(value, expected);
    });

    it('should compute distance squared', () => {
      const expected = 2 * 2 + 3 * 3 + 4 * 4 + 5 * 5;
      const value = vec4.distanceSq(vec4.create(1, 2, 3, 4), [3, 5, 7, 9]);
      assertStrictEqual(value, expected);
    });

    it('should compute dist', () => {
      const expected = Math.sqrt(2 * 2 + 3 * 3 + 4 * 4 + 5 * 5);
      const value = vec4.dist(vec4.create(1, 2, 3, 4), [3, 5, 7, 9]);
      assertStrictEqual(value, expected);
    });

    it('should compute dist squared', () => {
      const expected = 2 * 2 + 3 * 3 + 4 * 4 + 5 * 5;
      const value = vec4.distSq(vec4.create(1, 2, 3, 4), [3, 5, 7, 9]);
      assertStrictEqual(value, expected);
    });

    it('should normalize', () => {
      const length = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4);
      const expected = [
        1 / length,
        2 / length,
        3 / length,
        4 / length,
      ];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.normalize(a, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should negate', () => {
      const expected = [-1, -2, -3, 4];
      testV4WithAndWithoutDest((a, dst) => {
        return vec4.negate(a, dst);
      }, expected, [1, 2, 3, -4]);
    });

    it('should copy', () => {
      const expected = [1, 2, 3, 4];
      const v = vec4.create(1, 2, 3, 4);
      testV4WithAndWithoutDest((a, dst) => {
        const result = vec4.copy(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3, 4]);
    });

    it('should clone', () => {
      const expected = [1, 2, 3, 4];
      const v = vec4.create(1, 2, 3, 4);
      testV4WithAndWithoutDest((a, dst) => {
        const result = vec4.clone(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3, 4]);
    });

    it('should multiply', () => {
      const expected = [2, 8, 18, 32];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.multiply(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should mul', () => {
      const expected = [2, 8, 18, 32];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.mul(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should divide', () => {
      const expected = [1 / 2, 2 / 3, 3 / 4, 4 / 5];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.divide(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 3, 4, 5]);
    });

    it('should div', () => {
      const expected = [1 / 2, 2 / 3, 3 / 4, 4 / 5];
      testV4WithAndWithoutDest((a, b, dst) => {
        return vec4.div(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 3, 4, 5]);
    });

    it('should fromValues', () => {
      const expected = vec4.create(1, 2, 3, 4);
      const v1 = vec4.fromValues(1, 2, 3, 4);
      assertEqual(v1, expected);
    });

    it('should transform by 4x4', () => {
      const expected = [17, 24, 33, 4];
      const m = [
        1, 0, 0, 0,
        0, 2, 0, 0,
        0, 0, 3, 0,
        4, 5, 6, 1,
      ];
      testV4WithAndWithoutDest((v, mat, dst) => {
        return vec4.transformMat4(v, mat, dst);
      }, expected, [1, 2, 3, 4], m);
    });

    it('should zero', () => {
      const v = vec4.zero();
      assertEqual(v, [0, 0, 0, 0]);
      const v2 = vec4.create(1, 2, 3, 4);
      const vn = vec4.zero(v2);
      assertStrictEqual(v2, vn);
      assertEqual(v2, [0, 0, 0, 0]);
    });

  });
}

describe('vec4', () => {

  it('should set default type', () => {
    vec4.setDefaultType(Array);
    let d = vec4.create(1, 2, 3, 4);
    assertIsArray(d);
    vec4.setDefaultType(Float32Array);
    d = vec4.create(1, 2, 3, 4);
    assertInstanceOf(d, Float32Array);
  });

  check(Array);
  check(Float32Array);
  check(Float64Array);

});

