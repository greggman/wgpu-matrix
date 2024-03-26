import {vec2, utils} from '../../dist/2.x/wgpu-matrix.module.js';

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
  assertArrayEqualApproximately,
} from '../assert.js';
import {describe, it, before} from '../mocha-support.js';

// Note: vec2.create is use extensively in these tests but that is NOT idiomatic!
// Idiomatic usage use to use raw JS arrays where convenient. For example
//
// const dist = vec3.distance([1, 2], [3, 4]);
//
// The reason vec2.create is used in the tests is to make sure we are working
// with the specified default type when testing.

function check(Type) {
  describe('using ' + Type, () => {

    before(() => {
      vec2.setDefaultType(Type);
    });

    function clone(c) {
      return c.length ? c.slice() : c;
    }

    function elementsEqual(a, b) {
      assertStrictEqual(a.length, b.length);
      for (let i = 0; i < a.length; ++i) {
        const diff = Math.abs(a[i] - b[i]);
        assertLessThan(diff, 0.0000001);
      }
    }

    function testV2WithoutDest(func, expected, ...args) {
      const v = args.shift();
      const d = func(clone(v), ...args);
      assertEqual(d, expected);
      assertInstanceOf(d, Type);
    }

    function testV2WithDest(func, expected, ...args) {
      const firstArg = args.shift();
      // clone expected so we can check it wasn't modified
      expected = vec2.clone(expected);
      let d = vec2.create();
      // clone v to make sure it's the correct type
      let c = func(clone(firstArg), ...args, d);
      assertStrictEqual(c, d);
      assertEqual(c, expected);

      // test if we pass same vector as source and dest we get
      // correct result
      if (firstArg.length) {
        d = clone(firstArg);
        // clone args to make sure we don't overwrite first arg
        const bOrig = args.map(b => clone(b));
        c = func(d, ...args, d);
        assertStrictEqual(c, d);
        elementsEqual(c, expected);
        args.forEach((b, ndx) => {
          assertEqual(b, bOrig[ndx]);
        });
      }

      // test if we pass operand as dest we get correct result
      if (args.length > 0 && firstArg.length) {
        d = vec2.clone(args[0]);
        // clone v to make sure it is not overwritten
        const vOrig = vec2.clone(firstArg);
        c = func(firstArg, d, d);
        elementsEqual(c, expected);
        assertEqual(firstArg, vOrig);
        assertStrictEqual(c, d);
     }
    }

    function testV2WithAndWithoutDest(func, expected, ...args) {
      expected = vec2.clone(expected);
      testV2WithoutDest(func, expected, ...args);
      testV2WithDest(func, expected, ...args);
    }

    it('should add', () => {
      const expected = [3, 5];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.add(a, b, dst);
      }, expected, [1, 2], [2, 3]);
    });

    it('should compute angle', () => {
      const tests = [
        { a: [1, 0], b: [ 0, 1], expected: Math.PI / 2, },
        { a: [1, 0], b: [-1, 0], expected: Math.PI, },
        { a: [1, 0], b: [ 1, 0], expected: 0, },
        { a: [1, 2], b: [ 4, 5], expected: 0.225726 },
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
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.ceil(a, dst);
      }, expected, [1.1, -1.1]);
    });

    it('should compute floor', () => {
      const expected = [1, -2];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.floor(a, dst);
      }, expected, [1.1, -1.1]);
    });

    it('should compute round', () => {
      const expected = [1, -1];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.round(a, dst);
      }, expected, [1.1, -1.1]);
    });

    it('should clamp', () => {
      {
        const expected = [1, 0];
        testV2WithAndWithoutDest((a, dst) => {
          return vec2.clamp(a, 0, 1, dst);
        }, expected, [2, -1]);
      }
      {
        const expected = [-10, 5];
        testV2WithAndWithoutDest((a, dst) => {
          return vec2.clamp(a, -10, 5, dst);
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
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.subtract(a, b, dst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should sub', () => {
      const expected = [-2, -3];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.sub(a, b, dst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should lerp', () => {
      const expected = [3, 4.5];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.lerp(a, b, 0.5, dst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should lerp under 0', () => {
      const expected = [0.5, 1.5];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.lerp(a, b, -0.5, dst);
      }, expected, [1, 3], [2, 6]);
    });

    it('should lerp over 0', () => {
      const expected = [2.5, 7.5];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.lerp(a, b, 1.5, dst);
      }, expected, [1, 3], [2, 6]);
    });

    it('should multiply by scalar', () => {
      const expected = [4, 6];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.mulScalar(a, 2, dst);
      }, expected, [2, 3]);
    });

    it('should scale', () => {
      const expected = [4, 6];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.scale(a, 2, dst);
      }, expected, [2, 3]);
    });

    it('should add scaled', () => {
      const expected = [10, 15];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.addScaled(a, [4, 6], 2, dst);
      }, expected, [2, 3]);
    });

    it('should divide by scalar', () => {
      const expected = [0.5, 1.5];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.divScalar(a, 2, dst);
      }, expected, [1, 3]);
    });

    it('should inverse', () => {
      const expected = [1 / 3, 1 / -4];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.inverse(a, dst);
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
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.normalize(a, dst);
      }, expected, [2, 3]);
    });

    it('should negate', () => {
      const expected = [-2, 3];
      testV2WithAndWithoutDest((a, dst) => {
        return vec2.negate(a, dst);
      }, expected, [2, -3]);
    });

    it('should copy', () => {
      const expected = [2, 3];
      const v = vec2.create(2, 3);
      testV2WithAndWithoutDest((a, dst) => {
        const result = vec2.copy(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [2, 3]);
    });

    it('should clone', () => {
      const expected = [2, 3];
      const v = vec2.create(2, 3);
      testV2WithAndWithoutDest((a, dst) => {
        const result = vec2.clone(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [2, 3]);
    });

    it('should set', () => {
      const expected = [2, 3];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.set(a, b, dst);
      }, expected, 2, 3);
    });

    it('should multiply', () => {
      const expected = [8, 18];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.multiply(a, b, dst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should mul', () => {
      const expected = [8, 18];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.mul(a, b, dst);
      }, expected, [2, 3], [4, 6]);
    });

    it('should divide', () => {
      const expected = [2 / 3, 3 / 4];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.divide(a, b, dst);
      }, expected, [2, 3], [3, 4]);
    });

    it('should div', () => {
      const expected = [2 / 3, 3 / 4];
      testV2WithAndWithoutDest((a, b, dst) => {
        return vec2.div(a, b, dst);
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
      testV2WithAndWithoutDest((a, dst) => {
        const m = [
          4, 3,
          2, 5,
        ];
        return vec2.transformMat2(a, m, dst);
      }, expected, [2, 3]);
    });
    */

    it('should transform by 3x3', () => {
      const expected = [16, 17];
      testV2WithAndWithoutDest((a, dst) => {
        const m = [
          4, 0, 0, 11,
          0, 5, 0, 12,
          8, 2, 0, 13,
        ];
        return vec2.transformMat3(a, m, dst);
      }, expected, [2, 3]);
    });

    it('should transform by 4x4', () => {
      const expected = [6, 11];
      testV2WithAndWithoutDest((a, dst) => {
        const m = [
          1, 0, 0, 0,
          0, 2, 0, 0,
          0, 0, 3, 0,
          4, 5, 6, 1,
        ];
        return vec2.transformMat4(a, m, dst);
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

  });
}

describe('vec2', () => {

  it('should set default type', () => {
    vec2.setDefaultType(Array);
    let d = vec2.create(1, 2, 3);
    assertIsArray(d);

    d = vec2.add([1, 2], [3, 4]);
    assertIsArray(d);

    vec2.setDefaultType(Float32Array);
    d = vec2.create(1, 2, 3);
    assertInstanceOf(d, Float32Array);

    d = vec2.add([1, 2], [3, 4]);
    assertInstanceOf(d, Float32Array);
  });

  check(Array);
  check(Float32Array);
  check(Float64Array);

  describe('rotate', function() {
    describe('rotation around world origin [0, 0, 0]', function() {
      let vecA, vecB, result;
      beforeEach(function () {
        vecA = [0, 1];
        vecB = [0, 0];
        result = vec2.rotate(vecA, vecB, Math.PI);
      });
      it("should return the rotated vector", function () {
        assertEqualApproximately(result, [0, -1]);
      });
    });
    describe('rotation around an arbitrary origin', function () {
      let vecA, vecB, result;
      beforeEach(function () {
        vecA = [6, -5];
        vecB = [0, -5];
        result = vec2.rotate(vecA, vecB, Math.PI);
      });
      it("should return the rotated vector", function () {
        assertEqualApproximately(result, [-6, -5]);
      });
    });
  });

  describe('setLength', function() {
    describe('set the length of a provided direction vector', function() {
      let vecA, result;
      beforeEach(function () {
        vecA = [1, 1];
        result = vec2.setLength(vecA, 14.6);
      });
      it("should return the lengthend vector", function () {
        assertEqualApproximately(result, [10.323759005323593, 10.323759005323593]);
        assertEqualApproximately(vec2.length(result), 14.6);
      });
    });
  });

});

