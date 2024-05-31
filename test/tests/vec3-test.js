import {quat, vec3, vec3d, vec3n, utils} from '../../dist/2.x/wgpu-matrix.module.js';

import {
  assertEqual,
  assertInstanceOf,
  assertStrictEqual,
  assertStrictNotEqual,
  assertEqualApproximately,
  assertTruthy,
  assertFalsy,
} from '../assert.js';
import {describe, it} from '../mocha-support.js';

// Note: vec3.create is use extensively in these tests but that is NOT idiomatic!
// Idiomatic usage use to use raw JS arrays where convenient. For example
//
// const up = [0, 1, 0];
// const m = m4.lookAt(target, eye, up);
//
// The reason vec3.create is used in the tests is to make sure we are working
// with the specified default type when testing.

function check(vec3, Type) {
  describe('using ' + Type, () => {

    function clone(v) {
      return v.length ? v.slice() : v;
    }

    function testV3WithoutDest(func, expected, ...args) {
      const v = args.shift();
      const d = func(clone(v), ...args);
      assertEqualApproximately(d, expected);
      assertInstanceOf(d, Type);
    }

    function testV3WithDest(func, expected, ...args) {
      const firstArg = args.shift();
      // clone expected so we can check it wasn't modified
      expected = vec3.clone(expected);
      const d = vec3.create();
      // clone v to make sure it's the correct type
      const c = func(clone(firstArg), ...args, d);
      assertStrictEqual(c, d);
      assertEqualApproximately(c, expected);

      // test if we pass same vector as source and dest we get
      // correct result
      //if (firstArg.length) {
      //  d = vec3.clone(firstArg);
      //  // clone args to make sure we don't overwrite first arg
      //  const bOrig = args.map(b => clone(b));
      //  c = func(d, ...args, d);
      //  assertStrictEqual(c, d);
      //  elementsEqual(c, expected);
      //  args.forEach((b, ndx) => {
      //    assertEqual(b, bOrig[ndx]);
      //  });
      //}

      // test if we pass operand as dest we get correct result
      //if (args.length > 0 && firstArg.length) {
      //  d = vec3.clone(args[0]);
      //  // clone v to make sure it is not overwritten
      //  const vOrig = vec3.clone(firstArg);
      //  c = func(firstArg, d, d);
      //  elementsEqual(c, expected);
      //  assertEqual(firstArg, vOrig);
      //  assertStrictEqual(c, d);
      //}
    }

    function testV3WithAndWithoutDest(func, expected, ...args) {
      expected = vec3.clone(expected);
      testV3WithoutDest(func, expected, ...args);
      testV3WithDest(func, expected, ...args);
    }

    it('should add', () => {
      const expected = [3, 5, 7];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.add(a, b, newDst);
      }, expected, [1, 2, 3], [2, 3, 4]);
    });

    it('should compute angle', () => {
      const tests = [
        { a: [1, 0, 0], b: [ 0, 1, 0], expected: Math.PI / 2, },
        { a: [1, 0, 0], b: [-1, 0, 0], expected: Math.PI, },
        { a: [1, 0, 0], b: [ 1, 0, 0], expected: 0, },
        { a: [1, 2, 3], b: [ 4, 5, 6], expected: 0.2257261 },
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
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.ceil(a, newDst);
      }, expected, [1.1, -1.1, 2.9]);
    });

    it('should compute floor', () => {
      const expected = [1, -2, 2];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.floor(a, newDst);
      }, expected, [1.1, -1.1, 2.9]);
    });

    it('should compute round', () => {
      const expected = [1, -1, 3];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.round(a, newDst);
      }, expected, [1.1, -1.1, 2.9]);
    });

    it('should clamp', () => {
      {
        const expected = [1, 0, 0.5];
        testV3WithAndWithoutDest((a, newDst) => {
          return vec3.clamp(a, 0, 1, newDst);
        }, expected, [2, -1, 0.5]);
      }
      {
        const expected = [-10, 5, 2.9];
        testV3WithAndWithoutDest((a, newDst) => {
          return vec3.clamp(a, -10, 5, newDst);
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
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.subtract(a, b, newDst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should sub', () => {
      const expected = [-1, -2, -3];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.sub(a, b, newDst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should lerp', () => {
      const expected = [1.5, 3, 4.5];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.lerp(a, b, 0.5, newDst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should lerp under 0', () => {
      const expected = [0.5, 1, 1.5];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.lerp(a, b, -0.5, newDst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should lerp over 0', () => {
      const expected = [2.5, 5, 7.5];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.lerp(a, b, 1.5, newDst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should multiply by scalar', () => {
      const expected = [2, 4, 6];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.mulScalar(a, 2, newDst);
      }, expected, [1, 2, 3]);
    });

    it('should scale', () => {
      const expected = [2, 4, 6];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.scale(a, 2, newDst);
      }, expected, [1, 2, 3]);
    });

    it('should add scaled', () => {
      const expected = [5, 10, 15];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.addScaled(a, [2, 4, 6], 2, newDst);
      }, expected, [1, 2, 3]);
    });

    it('should divide by scalar', () => {
      const expected = [0.5, 1, 1.5];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.divScalar(a, 2, newDst);
      }, expected, [1, 2, 3]);
    });

    it('should inverse', () => {
      const expected = [1 / 2, 1 / 3, 1 / -4];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.inverse(a, newDst);
      }, expected, [2, 3, -4]);
    });

    it('should cross', () => {
      const expected = [
        2 * 6 - 3 * 4,
        3 * 2 - 1 * 6,
        1 * 4 - 2 * 2,
      ];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.cross(a, b, newDst);
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
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.normalize(a, newDst);
      }, expected, [1, 2, 3]);
    });

    it('should negate', () => {
      const expected = [-1, -2, -3];
      testV3WithAndWithoutDest((a, newDst) => {
        return vec3.negate(a, newDst);
      }, expected, [1, 2, 3]);
    });

    it('should copy', () => {
      const expected = [1, 2, 3];
      const v = vec3.create(1, 2, 3);
      testV3WithAndWithoutDest((a, newDst) => {
        const result = vec3.copy(a, newDst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3]);
    });

    it('should clone', () => {
      const expected = [1, 2, 3];
      const v = vec3.create(1, 2, 3);
      testV3WithAndWithoutDest((a, newDst) => {
        const result = vec3.clone(a, newDst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3]);
    });

    it('should set', () => {
      const expected = [2, 3, 4];
      testV3WithAndWithoutDest((a, b, c, newDst) => {
        return vec3.set(a, b, c, newDst);
      }, expected, 2, 3, 4);
    });

    it('should multiply', () => {
      const expected = [2, 8, 18];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.multiply(a, b, newDst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should mul', () => {
      const expected = [2, 8, 18];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.mul(a, b, newDst);
      }, expected, [1, 2, 3], [2, 4, 6]);
    });

    it('should divide', () => {
      const expected = [
        1 / 2, 2 / 3, 3 / 4,
      ];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.divide(a, b, newDst);
      }, expected, [1, 2, 3], [2, 3, 4]);
    });

    it('should div', () => {
      const expected = [
        1 / 2, 2 / 3, 3 / 4,
      ];
      testV3WithAndWithoutDest((a, b, newDst) => {
        return vec3.div(a, b, newDst);
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
      testV3WithAndWithoutDest((v, newDst) => {
        return vec3.transformMat3(v, m, newDst);
      }, expected, [1, 2, 3]);
    });

    it('should transform by 4x4', () => {
      const expected = [5, 9, 15];
      testV3WithAndWithoutDest((v, newDst) => {
        const m = [
          1, 0, 0, 0,
          0, 2, 0, 0,
          0, 0, 3, 0,
          4, 5, 6, 1,
        ];
        return vec3.transformMat4(v, m, newDst);
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
      testV3WithAndWithoutDest((v, mat, newDst) => {
        return vec3.transformMat4Upper3x3(v, mat, newDst);
      }, expected, [2, 3, 4], m);
    });

    it('should transform by quat', () => {
      const tests = [
        {
          q: quat.fromEuler(0.1, 0.2, 0.3, 'xyz'),
          expected: Type === Float32Array
            ? [ 10.48346640790187, 20.99753274028838, 33.81124896860183 ]
            : [ 10.483466535953458, 20.99753253479091, 33.81124896860183 ],
        },
        {
          q: quat.fromEuler(1.1, 2.2, 3.3, 'xyz'),
          expected: Type === Float32Array
            ? [ 31.030506373087608, 1.3403475284576416, -27.00575828552246 ]
            : [ 31.03050528998851, 1.340347488701262, -27.005757983559995 ],
        },
      ];
      for (const {q, expected} of tests) {
        testV3WithAndWithoutDest((v, q, newDst) => {
          return vec3.transformQuat(v, q, newDst);
        }, expected, [11, 22, 33], q);
      }
    });

    it('should zero', () => {
      const v = vec3.zero();
      assertEqual(v, [0, 0, 0]);
      const v2 = vec3.create(1, 2, 3);
      const vn = vec3.zero(v2);
      assertStrictEqual(v2, vn);
      assertEqual(v2, [0, 0, 0]);
    });

    describe('rotateX', function () {
      describe('rotation around world origin [0, 0, 0]', function () {
        it("should return the rotated vector", function () {
          testV3WithAndWithoutDest((a, b, angle, newDst) => {
            return vec3.rotateX(a, b, angle, newDst);
          }, [0, -1, 0], [0, 1, 0], [0, 0, 0], Math.PI);
        });
      });

      describe('rotation around an arbitrary origin', function () {
        const expected = [2, 3, 0];
        testV3WithAndWithoutDest((a, b, angle, newDst) => {
          return vec3.rotateX(a, b, angle, newDst);
        }, expected, [2, 7, 0], [2, 5, 0], Math.PI);
      });
    });

    describe('rotateY', function () {
      describe('rotation around world origin [0, 0, 0]', function () {
        it("should return the rotated vector", function () {
          const expected = [-1, 0, 0];
          testV3WithAndWithoutDest((a, b, angle, newDst) => {
            return vec3.rotateY(a, b, angle, newDst);
          }, expected, [1, 0, 0],  [0, 0, 0], Math.PI);
        });
      });
      describe('rotation around an arbitrary origin', function () {
        it("should return the rotated vector", function () {
          const expected = [-6, 3, 10];
          testV3WithAndWithoutDest((a, b, angle, newDst) => {
            return vec3.rotateY(a, b, angle, newDst);
          }, expected, [-2, 3, 10], [-4, 3, 10], Math.PI);
        });
      });
    });

    describe('rotateZ', function () {
      describe('rotation around world origin [0, 0, 0]', function () {
        it("should return the rotated vector", function () {
          const expected = [0, -1, 0];
          testV3WithAndWithoutDest((a, b, angle, newDst) => {
            return vec3.rotateZ(a, b, angle, newDst);
          }, expected, [0, 1, 0], [0, 0, 0], Math.PI);
        });
      });
      describe('rotation around an arbitrary origin', function () {
        it("should return the rotated vector", function () {
          const expected = [0, -6, -5];
          testV3WithAndWithoutDest((a, b, angle, newDst) => {
            return vec3.rotateZ(a, b, angle, newDst);
          }, expected, [0, 6, -5], [0, 0, -5], Math.PI);
        });
      });
    });

    describe('setLength', function () {
      describe('set the length of a provided direction vector', function () {
        it("should return the lengthened vector", function () {
          const expected = [8.429313930168536, 8.429313930168536, 8.429313930168536];
          testV3WithAndWithoutDest(
            (a, len, newDst) => vec3.setLength(a, len, newDst),
            expected,
            [1, 1, 1], 14.6);
        });
      });
    });

    describe('truncate', function () {
      describe('limit a vector to a max length', function () {
        it("should shorten the vector", function () {
          const expected = [2.309401076758503, 2.309401076758503, 2.309401076758503];
          testV3WithAndWithoutDest(
            (a, len, newDst) => vec3.truncate(a, len, newDst),
            expected,
            [8.429313930168536, 8.429313930168536, 8.429313930168536], 4.0);
        });

        it("should preserve the vector when shorter than maxLen", function () {
          const expected = [8.429313930168536, 8.429313930168536, 8.429313930168536];
          testV3WithAndWithoutDest(
            (a, len, newDst) => vec3.truncate(a, len, newDst),
            expected, [8.429313930168536, 8.429313930168536, 8.429313930168536], 18.0);
        });
      });
    });

    describe('midpoint', function () {
      describe('return the midpoint between 2 vectors', function () {

        it("should return the midpoint", function () {
          const vecA = [ 0, 0, 0 ];
          const vecB = [ 10, 10, 10 ];
          const result = vec3.midpoint(vecA, vecB);
          assertEqualApproximately(result, [ 5, 5, 5 ]);
        });

        it("should handle negatives", function () {
          const vecA = [ -10, -10, -10 ];
          const vecB = [ 10, 10, 10 ];
          const result = vec3.midpoint(vecA, vecB);
          assertEqualApproximately(result, [ 0, 0, 0 ]);
        });

      });
    });

  });
}

describe('vec3', () => {

  check(vec3n, Array);
  check(vec3, Float32Array);
  check(vec3d, Float64Array);

});
