import {vec2, vec2n, vec2d, utils} from '../../dist/3.x/wgpu-matrix.module.js';

import {
  assertEqual,
  assertInstanceOf,
  assertStrictEqual,
  assertStrictNotEqual,
  assertEqualApproximately,
  assertTruthy,
  assertFalsy,
  assertArrayEqualApproximately,
} from '../assert.js';
import {describe, it} from '../mocha-support.js';

// Note: vec2.create is use extensively in these tests but that is NOT idiomatic!
// Idiomatic usage use to use raw JS arrays where convenient. For example
//
// const dist = vec3.distance([1, 2], [3, 4]);
//
// The reason vec2.create is used in the tests is to make sure we are working
// with the specified default type when testing.

function check(vec2, Type) {
  describe('using ' + Type, () => {

    function clone(c) {
      return c.length ? c.slice() : c;
    }

    //function elementsEqual(a, b) {
    //  assertStrictEqual(a.length, b.length);
    //  for (let i = 0; i < a.length; ++i) {
    //    const diff = Math.abs(a[i] - b[i]);
    //    assertLessThan(diff, 0.0000001);
    //  }
    //}

    function testV2WithoutDest(func, expected, tolerance, ...args) {
      const v = args.shift();
      const d = func(clone(v), ...args);
      assertEqualApproximately(d, expected, tolerance);
      assertInstanceOf(d, Type);
    }

    function testV2WithDest(func, expected, tolerance, ...args) {
      const firstArg = args.shift();
      // clone expected so we can check it wasn't modified
      expected = vec2.clone(expected);
      const d = vec2.create();
      // clone v to make sure it's the correct type
      const c = func(clone(firstArg), ...args, d);
      assertStrictEqual(c, d);
      assertEqualApproximately(c, expected, tolerance);

      //// test if we pass same vector as source and dest we get
      //// correct result
      //if (firstArg.length) {
      //  d = clone(firstArg);
      //  // clone args to make sure we don't overwrite first arg
      //  const bOrig = args.map(b => clone(b));
      //  c = func(d, ...args, d);
      //  assertStrictEqual(c, d);
      //  elementsEqual(c, expected);
      //  args.forEach((b, ndx) => {
      //    assertEqual(b, bOrig[ndx]);
      //  });
      //}

      //// test if we pass operand as dest we get correct result
      //if (args.length > 0 && firstArg.length) {
      //  d = vec2.clone(args[0]);
      //  // clone v to make sure it is not overwritten
      //  const vOrig = vec2.clone(firstArg);
      //  c = func(firstArg, d, d);
      //  elementsEqual(c, expected);
      //  assertEqual(firstArg, vOrig);
      //  assertStrictEqual(c, d);
      //}
    }

    function testV2WithAndWithoutDestImpl(func, expected, tolerance, ...args) {
      expected = vec2.clone(expected);
      testV2WithoutDest(func, expected, tolerance, ...args);
      testV2WithDest(func, expected, tolerance, ...args);
    }

    function testV2WithAndWithoutDest(func, expected, ...args) {
      testV2WithAndWithoutDestImpl(func, expected, 0, ...args);
    }

    function testV2WithAndWithoutDestApprox(func, expected, ...args) {
      testV2WithAndWithoutDestImpl(func, expected, 1e7, ...args);
    }

    it('should add', () => {
      const expected = [3, 5];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.add(a, b, newDst);
      }, expected, [1, 2], [2, 3]);
    });

    it('should compute angle', () => {
      const tests = [
        { a: [1, 0], b: [ 0, 1], expected: Math.PI / 2, },
        { a: [1, 0], b: [-1, 0], expected: Math.PI, },
        { a: [1, 0], b: [ 1, 0], expected: 0, },
        { a: [1, 2], b: [ 4, 5], expected: 0.2110933, },
        { a: [1, 0], b: [ 0, Number.POSITIVE_INFINITY], expected: Math.PI / 2, },
      ];
      for (const {a, b, expected} of tests) {
        const av = vec2.create(...a);
        const bv = vec2.create(...b);
        assertEqualApproximately(vec2.angle(av, bv), expected);
        vec2.mulScalar(av, 1000, av);
        vec2.mulScalar(bv, 1000, bv);
        assertEqualApproximately(vec2.angle(av, bv), expected);
      }
    });

    it('should compute ceil', () => {
      const expected = [2, -1];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.ceil(a, newDst);
      }, expected, [1.1, -1.1]);
    });

    it('should compute floor', () => {
      const expected = [1, -2];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.floor(a, newDst);
      }, expected, [1.1, -1.1]);
    });

    it('should compute round', () => {
      const expected = [1, -1];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.round(a, newDst);
      }, expected, [1.1, -1.1]);
    });

    it('should clamp', () => {
      {
        const expected = [1, 0];
        testV2WithAndWithoutDest((a, newDst) => {
          return vec2.clamp(a, 0, 1, newDst);
        }, expected, [2, -1]);
      }
      {
        const expected = [-10, 5];
        testV2WithAndWithoutDest((a, newDst) => {
          return vec2.clamp(a, -10, 5, newDst);
        }, expected, [-22, 50]);
      }
    });

    it('should equals approximately', () => {
      assertTruthy(vec2.equalsApproximately(vec2.create(2, 3), vec2.create(2, 3)));
      assertTruthy(vec2.equalsApproximately(vec2.create(2, 3), vec2.create(2 + utils.EPSILON * 0.5, 3)));
      assertFalsy(vec2.equalsApproximately(vec2.create(2, 3), vec2.create(2.001, 3)));
    });

    it('should equals', () => {
      assertTruthy(vec2.equals(vec2.create(2, 3), vec2.create(2, 3)));
      assertFalsy(vec2.equals(vec2.create(2, 3), vec2.create(2 + utils.EPSILON * 0.5, 3)));
    });

    it('should subtract', () => {
      const expected = [-2, -3];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.subtract(a, b, newDst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should sub', () => {
      const expected = [-2, -3];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.sub(a, b, newDst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should lerp', () => {
      const expected = [3, 4.5];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.lerp(a, b, 0.5, newDst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should lerp under 0', () => {
      const expected = [0.5, 1.5];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.lerp(a, b, -0.5, newDst);
      }, expected, [1, 3], [2, 6]);
    });

    it('should lerp over 0', () => {
      const expected = [2.5, 7.5];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.lerp(a, b, 1.5, newDst);
      }, expected, [1, 3], [2, 6]);
    });

    it('should multiply by scalar', () => {
      const expected = [4, 6];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.mulScalar(a, 2, newDst);
      }, expected, [2, 3]);
    });

    it('should scale', () => {
      const expected = [4, 6];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.scale(a, 2, newDst);
      }, expected, [2, 3]);
    });

    it('should add scaled', () => {
      const expected = [10, 15];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.addScaled(a, [4, 6], 2, newDst);
      }, expected, [2, 3]);
    });

    it('should divide by scalar', () => {
      const expected = [0.5, 1.5];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.divScalar(a, 2, newDst);
      }, expected, [1, 3]);
    });

    it('should inverse', () => {
      const expected = [1 / 3, 1 / -4];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.inverse(a, newDst);
      }, expected, [3, -4]);
    });

    it('should cross', () => {
      const expected = [
        0,
        0,
        2 * 5 - 3 * 4,
      ];
      const c = vec2.cross(vec2.create(2, 3), vec2.create(4, 5));
      assertArrayEqualApproximately(c, expected);
      const d = vec2.cross(vec2.create(3, 2), vec2.create(4, 5), c);
      assertStrictEqual(d, c);
      const expected2 = [
        0,
        0,
        3 * 5 - 2 * 4,
      ];
      assertArrayEqualApproximately(c, expected2);

    });

    it('should compute dot product', () => {
      const expected = 2 * 4 + 3 * 6;
      const value = vec2.dot(vec2.create(2, 3), vec2.create(4, 6));
      assertStrictEqual(value, expected);
    });

    it('should compute length', () => {
      const expected = Math.sqrt(2 * 2 + 3 * 3);
      const value = vec2.length(vec2.create(2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute length squared', () => {
      const expected = 2 * 2 + 3 * 3;
      const value = vec2.lengthSq(vec2.create(2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute len', () => {
      const expected = Math.sqrt(2 * 2 + 3 * 3);
      const value = vec2.len(vec2.create(2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute lenSq', () => {
      const expected = 2 * 2 + 3 * 3;
      const value = vec2.lenSq(vec2.create(2, 3));
      assertStrictEqual(value, expected);
    });

    it('should compute distance', () => {
      const expected = Math.sqrt(3 * 3 + 4 * 4);
      const value = vec2.distance(vec2.create(2, 3), [5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should compute distance squared', () => {
      const expected = 3 * 3 + 4 * 4;
      const value = vec2.distanceSq(vec2.create(2, 3), [5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should compute dist', () => {
      const expected = Math.sqrt(3 * 3 + 4 * 4);
      const value = vec2.dist(vec2.create(2, 3), [5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should compute dist squared', () => {
      const expected = 3 * 3 + 4 * 4;
      const value = vec2.distSq(vec2.create(2, 3), [5, 7]);
      assertStrictEqual(value, expected);
    });

    it('should normalize', () => {
      const length = Math.sqrt(2 * 2 + 3 * 3);
      const expected = [
        2 / length,
        3 / length,
      ];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.normalize(a, newDst);
      }, expected, [2, 3]);
    });

    it('should negate', () => {
      const expected = [-2, 3];
      testV2WithAndWithoutDest((a, newDst) => {
        return vec2.negate(a, newDst);
      }, expected, [2, -3]);
    });

    it('should copy', () => {
      const expected = [2, 3];
      const v = vec2.create(2, 3);
      testV2WithAndWithoutDest((a, newDst) => {
        const result = vec2.copy(a, newDst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [2, 3]);
    });

    it('should clone', () => {
      const expected = [2, 3];
      const v = vec2.create(2, 3);
      testV2WithAndWithoutDest((a, newDst) => {
        const result = vec2.clone(a, newDst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [2, 3]);
    });

    it('should set', () => {
      const expected = [2, 3];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.set(a, b, newDst);
      }, expected, 2, 3);
    });

    it('should multiply', () => {
      const expected = [8, 18];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.multiply(a, b, newDst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should mul', () => {
      const expected = [8, 18];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.mul(a, b, newDst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should divide', () => {
      const expected = [2 / 3, 3 / 4];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.divide(a, b, newDst);
      }, expected, [2, 3], [3, 4]);
    });

    it('should div', () => {
      const expected = [2 / 3, 3 / 4];
      testV2WithAndWithoutDest((a, b, newDst) => {
        return vec2.div(a, b, newDst);
      }, expected, [2, 3], [3, 4]);
    });

    it('should fromValues', () => {
      const expected = vec2.create(2, 3);
      const v1 = vec2.fromValues(2, 3);
      assertEqual(v1, expected);
    });

    it('should random', () => {
      for (let i = 0; i < 100; ++i) {
        const v1 = vec2.random();
        assertEqualApproximately(vec2.length(v1), 1);
        const v2 = vec2.random(2);
        assertEqualApproximately(vec2.length(v2), 2);
        const vp5 = vec2.random(0.5);
        assertEqualApproximately(vec2.length(vp5), 0.5);
        const vd = vec2.create();
        const vn = vec2.random(3, vd);
        assertStrictEqual(vd, vn);
        assertEqualApproximately(vec2.length(3, vd), 3);
      }
    });

    /*
    it('should transform by 2x2', () => {
      const expected = [14, 21];
      testV2WithAndWithoutDest((a, newDst) => {
        const m = [
          4, 3,
          2, 5,
        ];
        return vec2.transformMat2(a, m, newDst);
      }, expected, [2, 3]);
    });
    */

    it('should transform by 3x3', () => {
      const expected = [16, 17];
      testV2WithAndWithoutDest((a, newDst) => {
        const m = [
          4, 0, 0, 11,
          0, 5, 0, 12,
          8, 2, 0, 13,
        ];
        return vec2.transformMat3(a, m, newDst);
      }, expected, [2, 3]);
    });

    it('should transform by 4x4', () => {
      const expected = [6, 11];
      testV2WithAndWithoutDest((a, newDst) => {
        const m = [
          1, 0, 0, 0,
          0, 2, 0, 0,
          0, 0, 3, 0,
          4, 5, 6, 1,
        ];
        return vec2.transformMat4(a, m, newDst);
      }, expected, [2, 3]);
    });

    it('should zero', () => {
      const v = vec2.zero();
      assertEqual(v, [0, 0]);
      const v2 = vec2.create(2, 3);
      const vn = vec2.zero(v2);
      assertStrictEqual(v2, vn);
      assertEqual(v2, [0, 0]);
    });

    describe('rotate', function () {
      describe('rotation around world origin [0, 0]', function () {
        it("should return the rotated vector", function () {
          const expected = [0, -1];
          testV2WithAndWithoutDestApprox((a, b, angle, newDst) => {
            return vec2.rotate(a, b, angle, newDst);
          }, expected, [0, 1], [0, 0], Math.PI);
        });
      });
      describe('rotation around an arbitrary origin', function () {
        it("should return the rotated vector", function () {
          const expected = [-6, -5];
          testV2WithAndWithoutDestApprox((a, b, angle, newDst) => {
            return vec2.rotate(a, b, angle, newDst);
          }, expected, [6, -5], [0, -5], Math.PI);
        });
      });
    });

    describe('setLength', function () {
      describe('set the length of a provided direction vector', function () {
        it("should return the lengthened vector", function () {
          const expected = [10.323759005323593, 10.323759005323593];
          testV2WithAndWithoutDestApprox(
            (a, len, newDst) => vec2.setLength(a, len, newDst),
            expected,
            [1, 1], 14.6);
       });
      });
    });

    describe('truncate', function () {
      describe('limit a vector to a max length', function () {

        it("should shorten the vector", function () {
          const expected = [2.82842712474619, 2.82842712474619];
          testV2WithAndWithoutDestApprox(
            (a, len, newDst) => vec2.truncate(a, len, newDst),
            expected,
            [10.323759005323593, 10.323759005323593],
            4.0);
        });

        it("should preserve the vector when shorter than maxLen", function () {
          const expected = [11, 12];
          testV2WithAndWithoutDestApprox(
            (a, len, newDst) => vec2.truncate(a, len, newDst),
            expected,
            [11, 12],
            14.6);
        });
      });
    });

    describe('midpoint', function () {
      describe('return the midpoint between 2 vectors', function () {

        it("should return the midpoint", function () {
          const expected = [5, 5];
          testV2WithAndWithoutDest(
            (a, b, newDst) => vec2.midpoint(a, b, newDst),
            expected,
            [0, 0], [10, 10]
          );
        });

        it("should handle negatives", function () {
          const expected = [10, 10];
          testV2WithAndWithoutDest(
            (a, b, newDst) => vec2.midpoint(a, b, newDst),
            expected,
            [-10, -20], [30, 40]);
        });

      });
    });


  });
}

describe('vec2', () => {

  check(vec2n, Array);
  check(vec2, Float32Array);
  check(vec2d, Float64Array);

});

