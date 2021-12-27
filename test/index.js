/* global mocha */
import './tests/mat3-test.js';
import './tests/mat4-test.js';
import './tests/vec2-test.js';
import './tests/vec3-test.js';
import './tests/vec4-test.js';
import './tests/utils-test.js';
import './tests/wgpu-matrix-test.js';

const settings = Object.fromEntries(new URLSearchParams(window.location.search).entries());
if (settings.reporter) {
  mocha.reporter(settings.reporter);
}
if (settings.grep) {
  mocha.grep(new RegExp(settings.grep, 'i'), false);
}

mocha.run((failures) => {
  window.testsPromiseInfo.resolve(failures);
});
