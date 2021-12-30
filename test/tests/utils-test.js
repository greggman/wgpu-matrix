/* global utils */

import {
  assertEqual,
} from '../assert.js';
import {describe, it} from '../mocha-support.js';

describe('utils', () => {

  it('converts degToRad', () => {
    assertEqual(utils.degToRad(0), 0);
    assertEqual(utils.degToRad(90), Math.PI * 0.5);
    assertEqual(utils.degToRad(180), Math.PI);
    assertEqual(utils.degToRad(360), Math.PI * 2);
    assertEqual(utils.degToRad(720), Math.PI * 4);
    assertEqual(utils.degToRad(-720), Math.PI * -4);
  });

  it('converts radToDeg', () => {
    assertEqual(utils.radToDeg(0), 0);
    assertEqual(utils.radToDeg(Math.PI * 0.5), 90);
    assertEqual(utils.radToDeg(Math.PI), 180);
    assertEqual(utils.radToDeg(Math.PI * 2), 360);
    assertEqual(utils.radToDeg(Math.PI * 4), 720);
    assertEqual(utils.radToDeg(Math.PI * -4), -720);
  });

  it('computes euclideanModulo', () => {
    let expected = 1;
    for (let i = -5; i <= 5; ++i) {
      assertEqual(utils.euclideanModulo(i, 3), expected);
      expected = (expected + 1) % 3;
    }
  });

  it('lerps', () => {
    assertEqual(utils.lerp( 10,  20, 0.5),  15);
    assertEqual(utils.lerp(-10, -20, 0.5), -15);
    assertEqual(utils.lerp( 10,  20, 1.5),  25);
    assertEqual(utils.lerp( 10,  20, -.5),   5);
  });

  it('inverse lerps', () => {
    assertEqual(utils.inverseLerp( 10,  20,  15),  0.5);
    assertEqual(utils.inverseLerp(-10, -20, -15),  0.5);
    assertEqual(utils.inverseLerp( 10,  20,  25),  1.5);
    assertEqual(utils.inverseLerp( 10,  20,   5),  -.5);
  });
});