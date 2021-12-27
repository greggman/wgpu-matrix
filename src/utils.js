/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * @module utils
 */


export let EPSILON = 0.000001;

/**
 * Set the value for EPSILON for various checks
 * @param {number} v Value to use for EPSILON.
 * @returns {number} previous value of EPSILON;
 */
export function setEpsilon(v) {
  const old = EPSILON;
  EPSILON = v;
  return old;
}

/**
 * Convert degrees to radians
 * @param {number} degrees Angle in degrees
 * @returns {number} angle converted to radians
 */
export function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Convert radians to degrees
 * @param {number} radians Angle in radians
 * @returns {number} angle converted to degrees
 */
export function radToDeg(radians) {
  return radians * 180 / Math.PI;
}

/**
 * Lerps between a and b via t
 * @param {number} a starting value
 * @param {number} b ending value
 * @param {number} t value where 0 = a and 1 = b
 * @returns {number} a + (b - a) * t
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Compute the opposite of lerp. Given a and b and a value between
 * a and b returns a value between 0 and 1. 0 if a, 1 if b.
 * Note: no clamping is done.
 * @param {number} a start value
 * @param {number} b end value
 * @param {number} v value between a and b
 * @returns {number} (v - a) / (b - a)
 */
export function inverseLerp(a, b, v) {
  const d = b - a;
  return (Math.abs(b - a) < EPSILON)
     ? a
     : (v - a) / d;
}

/**
 * Compute the euclidean modulo
 *
 * ```
 * // table for n / 3
 * -5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5   <- n
 * ------------------------------------
 * -2  -1  -0  -2  -1   0,  1,  2,  0,  1,  2   <- n % 3
 *  1   2   0   1   2   0,  1,  2,  0,  1,  2   <- euclideanModule(n, 3)
 * ```
 *
 * @param {number} n dividend
 * @param {number} m divisor
 * @returns {number} the euclidean modulo of n / m
 */
export function euclideanModulo(n, m) {
  return ((n % m) + m) % m;
}