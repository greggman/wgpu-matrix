import {mat3, mat4, utils} from '../../dist/2.x/wgpu-matrix.module.js';

import {
  assertEqual,
  assertFalsy,
  assertIsArray,
  assertInstanceOf,
  assertStrictEqual,
  assertStrictNotEqual,
  assertTruthy,
} from '../assert.js';
import {describe, it, before} from '../mocha-support.js';

function assertMat3Equal(a, b) {
  if (!mat3.equals(a, b)) {
    throw new Error(`${a} !== ${b}`);
  }
}

function check(Type) {
  describe('using ' + Type, () => {
    const m = [
       0,  1,  2,  0,
       4,  5,  6,  0,
       8,  9, 10,  0,
    ];

    before(function () {
      mat3.setDefaultType(Type);
    });

    function testM3WithoutDest(func, expected) {
      const d = func();
      assertMat3Equal(d, expected);
    }

    function testM3WithDest(func, expected) {
      expected = new Float32Array(expected);
      const d = new Float32Array(12);
      const c = func(d);
      assertStrictEqual(c, d);
      assertMat3Equal(c, expected);
    }

    function testM3WithAndWithoutDest(func, expected) {
      if (Type === Float32Array) {
        expected = new Float32Array(expected);
      }
      testM3WithoutDest(func, expected);
      testM3WithDest(func, expected);
    }

    function testV2WithoutDest(func, expected) {
      const d = func();
      assertEqual(d, expected);
    }

    function testV2WithDest(func, expected) {
      const d = new Float32Array(2);
      const c = func(d);
      assertStrictEqual(c, d);
      assertEqual(c, expected);
    }

    function testV2WithAndWithoutDest(func, expected) {
      expected = new Float32Array(expected);
      testV2WithoutDest(func, expected);
      testV2WithDest(func, expected);
    }

    it('should create', () => {
      const tests = [
        {e: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], args: []},
        {e: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], args: [1]},
        {e: [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], args: [1, 2]},
        {e: [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0], args: [1, 2, 3]},
        {e: [1, 2, 3, 0, 4, 0, 0, 0, 0, 0, 0], args: [1, 2, 3, 4]},
        {e: [1, 2, 3, 0, 4, 5, 0, 0, 0, 0, 0], args: [1, 2, 3, 4, 5]},
        {e: [1, 2, 3, 0, 4, 5, 6, 0, 0, 0, 0], args: [1, 2, 3, 4, 5, 6]},
        {e: [1, 2, 3, 0, 4, 5, 6, 0, 7, 0, 0], args: [1, 2, 3, 4, 5, 6, 7]},
        {e: [1, 2, 3, 0, 4, 5, 6, 0, 7, 8, 0], args: [1, 2, 3, 4, 5, 6, 7, 8]},
        {e: [1, 2, 3, 0, 4, 5, 6, 0, 7, 8, 9], args: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
      ];
      for (const {e, args} of tests) {
        const expected = mat3.clone(e);
        const m = mat3.create(...args);
        assertMat3Equal(m, expected);
      }
    });

    it('should negate', () => {
      const expected = [
        -0,  -1,  -2,  -3,
        -4,  -5,  -6,  -7,
        -8,  -9, -10, -11,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.negate(m, dst);
      }, expected);
    });

    it('should copy', () => {
      const expected = m;
      testM3WithAndWithoutDest((dst) => {
        const result = mat3.copy(m, dst);
        assertStrictNotEqual(result, m);
        return result;
      }, expected);
    });

    it('should equals approximately', () => {
      const genAlmostEqualMat = i => new Array(12).fill(0).map((_, ndx) => ndx + (ndx === i ? 0 : utils.EPSILON * 0.5));
      const genNotAlmostEqualMat = i => new Array(12).fill(0).map((_, ndx) => ndx + (ndx === i ? 0 : 1.0001));

      for (let i = 0; i < 9; ++i) {
        assertTruthy(mat3.equalsApproximately(
          mat3.clone(genAlmostEqualMat(-1)),
          mat3.clone(genAlmostEqualMat(i + (i / 3 | 0)))),
          `${i}`);
        assertFalsy(mat3.equalsApproximately(
          mat3.clone(genNotAlmostEqualMat(-1)),
          mat3.clone(genNotAlmostEqualMat(i + (i / 3 | 0)))),
          `${i}`);
      }
    });

    it('should equals', () => {
      const genNotEqualMat = i => new Array(12).fill(0).map((_, ndx) => ndx + (ndx === i ? 0 : 1.0001));
      for (let i = 0; i < 9; ++i) {
        assertTruthy(mat3.equals(
          mat3.clone(genNotEqualMat(i + (i / 3 | 0))),
          mat3.clone(genNotEqualMat(i + (i / 3 | 0)))),
          `${i}`);
        assertFalsy(mat3.equals(
          mat3.clone(genNotEqualMat(-1)),
          mat3.clone(genNotEqualMat(i + (i / 3 | 0)))),
          `${i}`);
      }
    });

    it('should clone', () => {
      const expected = m;
      testM3WithAndWithoutDest((dst) => {
        const result = mat3.clone(m, dst);
        assertStrictNotEqual(result, m);
        return result;
      }, expected);
    });

    it('should make identity', () => {
      const expected = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.identity(dst);
      }, expected);
    });

    it('should transpose', () => {
      const expected = [
        0, 4, 8, 12,
        1, 5, 9, 13,
        2, 6, 10, 14,
        3, 7, 11, 15,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.transpose(m, dst);
      }, expected);
    });

    function testMultiply(fn) {
      const m2 = [
        4, 5, 6, 0,
        1, 2, 3, 0,
        9, 10, 11, 0,
      ];
      const expected = [
        m2[0 * 4 + 0] * m[0 * 4 + 0] + m2[0 * 4 + 1] * m[1 * 4 + 0] + m2[0 * 4 + 2] * m[2 * 4 + 0],
        m2[0 * 4 + 0] * m[0 * 4 + 1] + m2[0 * 4 + 1] * m[1 * 4 + 1] + m2[0 * 4 + 2] * m[2 * 4 + 1],
        m2[0 * 4 + 0] * m[0 * 4 + 2] + m2[0 * 4 + 1] * m[1 * 4 + 2] + m2[0 * 4 + 2] * m[2 * 4 + 2],
        m2[0 * 4 + 0] * m[0 * 4 + 3] + m2[0 * 4 + 1] * m[1 * 4 + 3] + m2[0 * 4 + 2] * m[2 * 4 + 3],
        m2[1 * 4 + 0] * m[0 * 4 + 0] + m2[1 * 4 + 1] * m[1 * 4 + 0] + m2[1 * 4 + 2] * m[2 * 4 + 0],
        m2[1 * 4 + 0] * m[0 * 4 + 1] + m2[1 * 4 + 1] * m[1 * 4 + 1] + m2[1 * 4 + 2] * m[2 * 4 + 1],
        m2[1 * 4 + 0] * m[0 * 4 + 2] + m2[1 * 4 + 1] * m[1 * 4 + 2] + m2[1 * 4 + 2] * m[2 * 4 + 2],
        m2[1 * 4 + 0] * m[0 * 4 + 3] + m2[1 * 4 + 1] * m[1 * 4 + 3] + m2[1 * 4 + 2] * m[2 * 4 + 3],
        m2[2 * 4 + 0] * m[0 * 4 + 0] + m2[2 * 4 + 1] * m[1 * 4 + 0] + m2[2 * 4 + 2] * m[2 * 4 + 0],
        m2[2 * 4 + 0] * m[0 * 4 + 1] + m2[2 * 4 + 1] * m[1 * 4 + 1] + m2[2 * 4 + 2] * m[2 * 4 + 1],
        m2[2 * 4 + 0] * m[0 * 4 + 2] + m2[2 * 4 + 1] * m[1 * 4 + 2] + m2[2 * 4 + 2] * m[2 * 4 + 2],
        m2[2 * 4 + 0] * m[0 * 4 + 3] + m2[2 * 4 + 1] * m[1 * 4 + 3] + m2[2 * 4 + 2] * m[2 * 4 + 3],
      ];
      testM3WithAndWithoutDest((dst) => {
        return fn(m, m2, dst);
      }, expected);
    }

    it('should multiply', () => {
     testMultiply(mat3.multiply);
    });

    it('should mul', () => {
     testMultiply(mat3.mul);
    });

    function testInverse(fn) {
      const m = [
        2, 1, 3, 0,
        1, 2, 1, 0,
        3, 1, 2, 0,
      ];
      const expected = [
        -0.375,
        -0.125,
        0.625,
        -0,
        -0.125,
        0.625,
        -0.125,
        -0,
        0.625,
        -0.125,
        -0.375,
        -0,
        -1.625,
        -1.875,
        0.375,
        1,
      ];
      testM3WithAndWithoutDest((dst) => {
        return fn(m, dst);
      }, expected);
    }

    it('should inverse', () => {
     testInverse(mat3.inverse);
    });

    it('should invert', () => {
     testInverse(mat3.invert);
    });

    it('should compute determinant', () => {
      function det(m) {
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];

        return m00 * (m11 * m22 - m21 * m12) -
               m10 * (m01 * m22 - m21 * m02) +
               m20 * (m01 * m12 - m11 * m02);
      }

      [
        [
          2, 1, 3, 0,
          1, 2, 1, 0,
          3, 1, 2, 0,
        ],
        [
          2, 0, 0, 0,
          0, 3, 0, 0,
          0, 0, 4, 0,
        ],
      ].forEach(v => {
        const m = mat3.clone(v);
        assertEqual(mat3.determinant(m), det(m));
      });
    });

    it('should set translation', () => {
      const expected = [
        0,  1,  2, 0,
        4,  5,  6, 0,
       11, 22,  1, 1,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.setTranslation(m, [11, 22], dst);
      }, expected);
    });

    it('should get translation', () => {
      const expected = [8, 9];
      testV2WithAndWithoutDest((dst) => {
        return mat3.getTranslation(m, dst);
      }, expected);
    });

    it('should get axis', () => {
      [
        [0, 1],
        [4, 5],
      ].forEach((expected, ndx) => {
        testV2WithAndWithoutDest((dst) => {
          return mat3.getAxis(m, ndx, dst);
        }, expected);
      });
    });

    it('should set axis', () => {
      [
        [
          11, 22,  2,  0,
           4,  5,  6,  0,
           8,  9, 10,  0,
        ],
        [
           0,  1,  2,  0,
          11, 22,  6,  0,
           8,  9, 10,  0,
        ],
      ].forEach((expected, ndx) => {
        testM3WithAndWithoutDest((dst) => {
          return mat3.setAxis(m, [11, 22], ndx, dst);
        }, expected);
      });
    });

    it('should get scaling', () => {
      const m = [
        1, 2, 3, 0,
        5, 6, 7, 0,
        9, 10, 11, 0,
      ];
      const expected = [
        Math.sqrt(1 * 1 + 2 * 2),
        Math.sqrt(5 * 5 + 6 * 6),
      ];
      testV2WithAndWithoutDest((dst) => {
        return mat3.getScaling(m, dst);
      }, expected);
    });

    it('should make translation matrix', () => {
      const expected = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        2, 3, 1, 0,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.translation([2, 3], dst);
      }, expected);
    });

    it('should translate', () => {
      const expected = [
        0,  1,  2,  0,
        4,  5,  6,  0,
        8 + 0 * 2 + 4 * 3,
        9 + 1 * 2 + 5 * 3,
        10 + 2 * 2 + 6 * 3, 0,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.translate(m, [2, 3], dst);
      }, expected);
    });

    it('should make rotation matrix', () => {
      const angle = 1.23;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const expected = [
         c, s, 0, 0,
        -s, c, 0, 0,
         0, 0, 1, 0,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.rotation(angle, dst);
      }, expected);
    });

    it('should rotate', () => {
      const angle = 1.23;
      // switch to Array type to keep precision high for expected
      const oldType = mat3.setDefaultType(Array);
      const expected = mat3.multiply(m, mat3.rotation(angle));
      mat3.setDefaultType(oldType);

      testM3WithAndWithoutDest((dst) => {
        return mat3.rotate(m, angle, dst);
      }, expected);
    });

    it('should make scaling matrix', () => {
      const expected = [
        2, 0, 0, 0,
        0, 3, 0, 0,
        0, 0, 1, 0,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.scaling([2, 3], dst);
      }, expected);
    });

    it('should scale', () => {
      const expected = [
         0,  2,  4,  0,
        12, 15, 18,  0,
         8,  9, 10,  0,
      ];
      testM3WithAndWithoutDest((dst) => {
        return mat3.scale(m, [2, 3], dst);
      }, expected);
    });

    it('should make a mat3 from mat4', () => {
      const expected = [
        1, 2, 3, 0,
        5, 6, 7, 0,
        9, 10, 11, 0,
      ];
      testM3WithAndWithoutDest((dst) => {
        const m4 = mat4.create(
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, 15, 16);
        return mat3.fromMat4(m4, dst);
      }, expected);
    });
  });
}

describe('mat3', () => {

  it('should set default type', () => {
    mat3.setDefaultType(Array);
    let d = mat3.identity();
    assertIsArray(d);
    mat3.setDefaultType(Float32Array);
    d = mat3.identity();
    assertInstanceOf(d, Float32Array);
  });

  check(Array);
  check(Float32Array);
  check(Float64Array);
});

