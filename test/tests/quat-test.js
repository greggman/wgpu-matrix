import {mat3, mat4, quat, quatn, quatd, utils, vec3} from '../../dist/3.x/wgpu-matrix.module.js';

import {
  assertEqual,
  assertEqualApproximately,
  assertInstanceOf,
  assertStrictEqual,
  assertStrictNotEqual,
  assertTruthy,
  assertFalsy,
  assertDeepEqualApproximately,
} from '../assert.js';
import {describe, it} from '../mocha-support.js';

// Note: quat.create is use extensively in these tests but that is NOT idiomatic!
// Idiomatic usage use to use raw JS arrays where convenient. For example
//
// const up = [0, 1, 0];
// const m = m4.lookAt(target, eye, up);
//
// The reason quat.create is used in the tests is to make sure we are working
// with the specified default type when testing.

function check(quat, Type) {
  describe('using ' + quat, () => {

    function clone(v) {
      return v.slice ? v.slice() : v;
    }

    function isMaybeQuat(v) {
      return v.length === 4;
    }

    function testQuatWithoutDest(func, expected, ...args) {
      const v = args.shift();
      const d = func(clone(v), ...args);
      assertEqualApproximately(d, expected);
      assertInstanceOf(d, Type);
    }

    function testQuatWithDest(func, expected, ...args) {
      const firstArg = args.shift();
      // clone expected so we can check it wasn't modified
      expected = clone(expected);
      let dst = quat.create();
      // clone v to make sure it's the correct type
      let c = func(clone(firstArg), ...args, dst);
      assertStrictEqual(c, dst);
      assertEqualApproximately(c, expected);

      // test if we pass same quat as source and dest we get
      // correct result
      if (isMaybeQuat(firstArg)) { // guess if it's a Quat
        // clone args to make sure we don't overwrite first arg
        const bOrig = args.map(b => clone(b));
        dst = quat.clone(firstArg);
        c = func(dst, ...args, dst);
        assertStrictEqual(c, dst);
        assertEqualApproximately(c, expected);
        args.forEach((b, ndx) => {
          assertEqual(b, bOrig[ndx]);
        });
      }

      // test if we pass operand as dest we get correct result
      if (args.length === 1 && isMaybeQuat(args[0])) {
        dst = quat.clone(args[0]);
        // clone v to make sure it is not overwritten
        const vOrig = quat.clone(firstArg);
        c = func(firstArg, dst, dst);
        assertEqualApproximately(c, expected);
        assertEqual(firstArg, vOrig);
        assertStrictEqual(c, dst);
      }
    }

    function testQuatWithAndWithoutDest(func, expected, ...args) {
      expected = quat.clone(expected);
      testQuatWithoutDest(func, expected, ...args);
      testQuatWithDest(func, expected, ...args);
    }

    it('should add', () => {
      const expected = [3, 5, 7, 9];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.add(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 3, 4, 5]);
    });

    it('should equals approximately', () => {
      assertTruthy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1, 2, 3, 4)));
      assertTruthy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1 + utils.EPSILON * 0.5, 2, 3, 4)));
      assertTruthy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1, 2 + utils.EPSILON * 0.5, 3, 4)));
      assertTruthy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1, 2, 3 + utils.EPSILON * 0.5, 4)));
      assertTruthy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1, 2, 3, 4 + utils.EPSILON * 0.5)));
      assertFalsy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1.0001, 2, 3, 4)));
      assertFalsy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1, 2.0001, 3, 4)));
      assertFalsy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1, 2, 3.0001, 4)));
      assertFalsy(quat.equalsApproximately(quat.create(1, 2, 3, 4), quat.create(1, 2, 3, 4.0001)));
    });

    it('should equals', () => {
      assertTruthy(quat.equals(quat.create(1, 2, 3, 4), quat.create(1, 2, 3, 4)));
      assertFalsy(quat.equals(quat.create(1, 2, 3, 4), quat.create(1 + utils.EPSILON * 0.5, 2, 3, 4)));
      assertFalsy(quat.equals(quat.create(1, 2, 3, 4), quat.create(1, 2 + utils.EPSILON * 0.5, 3, 4)));
      assertFalsy(quat.equals(quat.create(1, 2, 3, 4), quat.create(1, 2, 3 + utils.EPSILON * 0.5, 4)));
      assertFalsy(quat.equals(quat.create(1, 2, 3, 4), quat.create(1, 2, 3, 4 + utils.EPSILON * 0.5)));
    });

    it('should subtract', () => {
      const expected = [-1, -2, -3, -4];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.subtract(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should sub', () => {
      const expected = [-1, -2, -3, -4];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.sub(a, b, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should lerp', () => {
      const expected = [1.5, 3, 4.5, 6];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.lerp(a, b, 0.5, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should lerp under 0', () => {
      const expected = [0.5, 1, 1.5, 2];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.lerp(a, b, -0.5, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should lerp over 0', () => {
      const expected = [2.5, 5, 7.5, 10];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.lerp(a, b, 1.5, dst);
      }, expected, [1, 2, 3, 4], [2, 4, 6, 8]);
    });

    it('should multiply by scalar', () => {
      const expected = [2, 4, 6, 8];
      testQuatWithAndWithoutDest((a, dst) => {
        return quat.mulScalar(a, 2, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should scale', () => {
      const expected = [2, 4, 6, 8];
      testQuatWithAndWithoutDest((a, dst) => {
        return quat.scale(a, 2, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should divide by scalar', () => {
      const expected = [0.5, 1, 1.5, 2];
      testQuatWithAndWithoutDest((a, dst) => {
        return quat.divScalar(a, 2, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should inverse', () => {
      const expected = [
        -0.021505376344086023,
        -0.03225806451612903,
        0.043010752688172046,
        -0.08602150537634409,
      ];

      testQuatWithAndWithoutDest((a, dst) => {
        return quat.inverse(a, dst);
      }, expected, [2, 3, -4, -8]);
    });

    it('should compute dot product', () => {
      const expected = 1 * 2 + 2 * 4 + 3 * 6 + 4 * 8;
      const value = quat.dot(quat.create(1, 2, 3, 4), quat.create(2, 4, 6, 8));
      assertStrictEqual(value, expected);
    });

    it('should compute length', () => {
      const expected = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4);
      const value = quat.length(quat.create(1, 2, 3, 4));
      assertStrictEqual(value, expected);
    });

    it('should compute length squared', () => {
      const expected = 1 * 1 + 2 * 2 + 3 * 3 + 4 * 4;
      const value = quat.lengthSq(quat.create(1, 2, 3, 4));
      assertStrictEqual(value, expected);
    });

    it('should compute len', () => {
      const expected = Math.sqrt(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4);
      const value = quat.len(quat.create(1, 2, 3, 4));
      assertStrictEqual(value, expected);
    });

    it('should compute lenSq', () => {
      const expected = 1 * 1 + 2 * 2 + 3 * 3 + 4 * 4;
      const value = quat.lenSq(quat.create(1, 2, 3, 4));
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
      testQuatWithAndWithoutDest((a, dst) => {
        return quat.normalize(a, dst);
      }, expected, [1, 2, 3, 4]);
    });

    it('should copy', () => {
      const expected = [1, 2, 3, 4];
      const v = quat.create(1, 2, 3, 4);
      testQuatWithAndWithoutDest((a, dst) => {
        const result = quat.copy(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3, 4]);
    });

    it('should clone', () => {
      const expected = [1, 2, 3, 4];
      const v = quat.create(1, 2, 3, 4);
      testQuatWithAndWithoutDest((a, dst) => {
        const result = quat.clone(a, dst);
        assertStrictNotEqual(result, v);
        return result;
      }, expected, [1, 2, 3, 4]);
    });

    it('should set', () => {
      const expected = [2, 3, 4, 5];
      testQuatWithAndWithoutDest((a, b, c, d, dst) => {
        return quat.set(a, b, c, d, dst);
      }, expected, 2, 3, 4, 5);
    });

    it('should multiply', () => {
      const expected = [-16, -32, -48, -4];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.multiply(a, b, dst);
      }, expected, [1, 2, 3, 4], [-2, -4, -6, -8]);
    });

    it('should mul', () => {
      const expected = [-16, -32, -48, -4];
      testQuatWithAndWithoutDest((a, b, dst) => {
        return quat.mul(a, b, dst);
      }, expected, [1, 2, 3, 4], [-2, -4, -6, -8]);
    });

    it('should fromValues', () => {
      const expected = quat.create(1, 2, 3, 4);
      const v1 = quat.fromValues(1, 2, 3, 4);
      assertEqual(v1, expected);
    });

    it('should fromAxisAngle', () => {
      const axis = [1, 0, 0]; //vec3.normalize([1, 2, 3]);
      const angle = 0; //45 * Math.PI / 180;
      const expected = [0, 0, 0, 1];

      testQuatWithAndWithoutDest((axis, angle, dst) => {
        return quat.fromAxisAngle(axis, angle, dst);
      }, expected, axis, angle);
    });

    it('should toAxisAngle', () => {
      const tests = [
        { axis: [1, 0, 0], angle: 0.1 },
        { axis: [0, 1, 0], angle: 0.1 },
        { axis: [0, 0, 1], angle: 0.1 },
        { axis: vec3.normalize([1, 2, 3]), angle: 0.1 },
      ];
      for (const expected of tests) {
        const { axis, angle } = expected;
        const q = quat.fromAxisAngle(axis, angle);
        const actual = quat.toAxisAngle(q);
        assertDeepEqualApproximately(actual, expected, 1e6);
      }
    });

    it('should angle', () => {
      const tests = [
        { axis: [1, 0, 0], },
        { axis: [0, 1, 0], },
        { axis: [0, 0, 1], },
        { axis: vec3.normalize([1, 2, 3]) },
      ];
      for (const {axis} of tests) {
        const q1 = quat.fromAxisAngle(axis, 0.1);
        const q2 = quat.fromAxisAngle(axis, 0.4);
        const actual = quat.angle(q1, q2);
        assertDeepEqualApproximately(actual, 0.3);
      }
    });

    it('should rotateX', () => {
      const tests = [
        { angle: 0, expected: [1, 2, 3, 4], },
        { angle: Math.PI, expected: [4, 3, -2, -1], },
        { angle: -Math.PI, expected: [-4, -3, 2, 1], },
      ];
      for (const {angle, expected} of tests) {
        testQuatWithAndWithoutDest((a, dst) => {
          return quat.rotateX([1, 2, 3, 4], a, dst);
        }, expected, angle);
      }
    });

    it('should rotateY', () => {
      const tests = [
        { angle: 0, expected: [1, 2, 3, 4], },
        { angle: Math.PI, expected: [-3, 4, 1, -2], },
        { angle: -Math.PI, expected: [3, -4, -1, 2], },
      ];
      for (const {angle, expected} of tests) {
        testQuatWithAndWithoutDest((a, dst) => {
          return quat.rotateY([1, 2, 3, 4], a, dst);
        }, expected, angle);
      }
    });

    it('should rotateZ', () => {
      const tests = [
        { angle: 0, expected: [1, 2, 3, 4], },
        { angle: Math.PI, expected: [-3, 4, 1, -2], },
        { angle: -Math.PI, expected: [3, -4, -1, 2], },
      ];
      for (const {angle, expected} of tests) {
        testQuatWithAndWithoutDest((a, dst) => {
          return quat.rotateY([1, 2, 3, 4], a, dst);
        }, expected, angle);
      }
    });

    it('should slerp', () => {
      const a1 = [0, 1, 0, 1];
      const b1 = [1, 0, 0, 1];
      const a2 = [0, 1, 0, 1];
      const b2 = [0, 1, 0, 0.5];
      const a3 = quat.fromEuler(0.1, 0.2, 0.3, 'xyz');
      const b3 = quat.fromEuler(0.3, 0.2, 0.1, 'xyz');
      const tests = [
        { a: a1, b: b1, t: 0, expected: [0, 1, 0, 1], },
        { a: a1, b: b1, t: 1, expected: [1, 0, 0, 1], },
        { a: a1, b: b1, t: 0.5, expected: [0.5, 0.5, 0, 1], },
        { a: a2, b: b2, t: 0.5, expected: [0, 1, 0, 0.75], },
        { a: a3, b: b3, t: 0.5, expected: [0.1089731245591333, 0.09134010671547867, 0.10897312455913327, 0.9838224947381737], },
      ];
      for (const {a, b, t, expected} of tests) {
        testQuatWithAndWithoutDest((a, b, t, dst) => {
          return quat.slerp(a, b, t, dst);
        }, expected, a, b, t);
      }
    });

    it('should conjugate', () => {
      const expected = [-2, -3, -4, 5];
      testQuatWithAndWithoutDest((q, dst) => {
        return quat.conjugate(q, dst);
      }, expected, [2, 3, 4, 5]);
    });

    it('should fromMat (3/4)', () => {
      const tests = [
        { expected: [0, 0, 0, 1], mat: mat4.identity(), },
        { expected: [1, 0, 0, 0], mat: mat4.rotationX(Math.PI), },
        { expected: [0, 1, 0, 0], mat: mat4.rotationY(Math.PI), },
        { expected: [0, 0, 1, 0], mat: mat4.rotationZ(Math.PI), },
      ].map(({expected, mat}) => [
        { expected, mat },
        { expected, mat: mat3.fromMat4(mat), },
      ]).flat();
      for (const {mat, expected} of tests) {
        testQuatWithAndWithoutDest((mat, dst) => {
          return quat.fromMat(mat, dst);
        }, expected, mat);
      }
    });

    it('should fromEuler', () => {
      const tests = [
         { args: [0, 0, 0, 'xyz'], expected: [0, 0, 0, 1], },
         { args: [Math.PI, 0, 0, 'xyz'], expected: [1, 0, 0, 0], },
         { args: [0, Math.PI, 0, 'xyz'], expected: [0, 1, 0, 0], },
         { args: [0, 0, Math.PI, 'xyz'], expected: [0, 0, 1, 0], },
         { args: [Math.PI, Math.PI, 0, 'xyz'], expected: [0, 0, 1, 0], },
         { args: [Math.PI, Math.PI, 0, 'yxz'], expected: [0, 0, -1, 0], },
         { args: [0, Math.PI, Math.PI, 'xyz'], expected: [1, 0, 0, 0], },
         { args: [0, Math.PI, Math.PI, 'xzy'], expected: [-1, 0, 0, 0], },
         { args: [Math.PI, 0, Math.PI, 'xyz'], expected: [0, -1, 0, 0], },
         { args: [Math.PI, 0, Math.PI, 'zyx'], expected: [0, 1, 0, 0], },
         { args: [Math.PI, 0, Math.PI, 'zxy'], expected: [0, 1, 0, 0], },
         { args: [0.1, Math.PI, 0, 'zyx'], expected: [0, 0.9987502694129944, -0.04997916892170906, 0 ]},
      ];
      for (const {args, expected} of tests) {
        testQuatWithAndWithoutDest((...args) => {
          return quat.fromEuler(...args);
        }, expected, ...args);
      }
    });

    it('should rotationTo', () => {
      const tests = [
        { args: [quat.fromEuler(Math.PI / 2, 0, 0, 'xyz'), quat.fromEuler(0, Math.PI, 0, 'xyz')], expected: [0, 0, 0.5773502588272095, 0.8164966106414795], },
        { args: [quat.fromEuler(0, Math.PI / 2, 0, 'xyz'), quat.fromEuler(0, Math.PI, 0, 'xyz')], expected: [0, 0, 0, 1], },
        { args: [quat.fromEuler(0, Math.PI / 2, 0, 'xyz'), quat.fromEuler(0, 0, Math.PI, 'xyz')], expected: [0.5773502588272095, 0, 0, 0.8164966106414795], },
        { args: [quat.fromEuler(0, 0, Math.PI / 2, 'zyx'), quat.fromEuler(0.1, Math.PI, 0, 'zyx')], expected: [-0.5907140970230103, 0, 0, 0.8068809509277344], },
      ];
      for (const {args, expected} of tests) {
        testQuatWithAndWithoutDest((...args) => {
          return quat.rotationTo(...args);
        }, expected, ...args);
      }
    });

    it('should sqlerp', () => {
      const a = quat.fromEuler(Math.PI / 2, 0, 0, 'xyz');
      const b = quat.fromEuler(0, Math.PI / 2, 0, 'xyz');
      const c = quat.fromEuler(0, 0, Math.PI / 2, 'xyz');
      const d = quat.fromEuler(Math.PI, 0, 0, 'xyz');
      const tests = [
        { args: [a, b, c, d, 0], expected: a },
        { args: [a, b, c, d, 1], expected: d },
        { args: [a, b, c, d, 0.25], expected: [0.5946745811867614, 0.2612930755130939, 0.095639903470758, 0.7542818306464518] },
        { args: [a, b, c, d, 0.5], expected: [0.5702395788501929, 0.25198018251105747, 0.25198018251105747, 0.7401613323837869] },
        { args: [a, b, c, d, 0.75], expected: [0.7683175218769692, 0.10832581796559188, 0.29595163845345446, 0.5571053135948666] },
      ];
      for (const {args, expected} of tests) {
        testQuatWithAndWithoutDest((...args) => {
          return quat.sqlerp(...args);
        }, expected, ...args);
      }
    });

  });
}

describe('quat', () => {

  check(quatn, Array);
  check(quat, Float32Array);
  check(quatd, Float64Array);

});

