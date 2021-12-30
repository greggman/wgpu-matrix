# wgpu-matrix

Fast 3d math library for webgpu

* [Docs](https://wgpu-matrix.org/docs)
* [Repo](https://github.com/greggman/wgpu-matrix)

## Usage

```js
import {
  vec3,
  mat4,
} from 'https://wgpu-matrix.org/dist/0.x/wgpu-matrix.module.js';

const fov = 60 * Math.PI / 180
const aspect = width / height;
const near = 0.1;
const far = 1000;
const perspective = mat4.perspective(fov, aspect, near, far);

const eye = [3, 5, 10];
const target = [0, 4, 0];
const up = [0, 1, 0];
const camera = mat4.lookAt(eye, target, up);

const view = mat4.inverse(camera);
```

Note: for translation, rotation, and scaling there are 2 versions
of each function. One generates a translation, rotation, or scaling matrix.
The other translates, rotates, or scales a matrix.

```js
const t = mat4.translation([1, 2, 3]);    // a translation matrix
const r = mat4.rotationX(Math.PI * 0.5);  // a rotation matrix
const s = mat4.scaling([1, 2, 3]);        // a scaling matrix
```

```js
const m = mat4.identity();
const t = mat4.translate(m, [1, 2, 3]);    // m * translation([1, 2, 3])
const r = mat4.rotateX(m, Math.PI * 0.5);  // m * rotationX(Math.PI * 0.5)
const s = mat4.scale(m, [1, 2, 3]);        // m * scaling([1, 2, 3])
```

Functions take an optional destination to hold the result.

```js
const m = mat4.identity();
mat4.translate(m, [1, 2, 3], m);    // m = m * translation([1, 2, 3])
mat4.rotateX(m, Math.PI * 0.5, m);  // m = m * rotationX(Math.PI * 0.5)
mat4.scale(m, [1, 2, 3], m);        // m = m * scaling([1, 2, 3])
```

or via npm

```
npm install --save wgpu-matrix
```

then using a build process

```
import {vec3, mat3} from 'wgpu-matrix';

... etc ...
```

[Example](https://codesandbox.io/s/cocky-bogdan-bwq5x?file=/src/index.js)

## Download

* [zip](https://github.com/greggman/wgpu-matrix/zipball/main)
* [tar](https://github.com/greggman/wgpu-matrix/tarball/main)
* [github](https://github.com/greggman/wgpu-matrix)

## Notes

[`mat4.perspective`](https://wgpu-matrix.org/docs/module-mat4.html#.perspective),
[`mat4.ortho`](https://wgpu-matrix.org/docs/module-mat4.html#.ortho), and
[`mat4.frustum`](https://wgpu-matrix.org/docs/module-mat4.html#.frustum)
all return matrices with Z clip space from 0 to 1 (unlike most WebGL matrix libraries which return -1 to 1)

[`mat4.lookAt`](https://wgpu-matrix.org/docs/module-mat4.html#.lookAt)
returns a matrix that makes an object look down the -Z axis. If you want
a view matrix take its inverse.

## Important!

`mat3` uses the space of 12 elements

```js
// a mat3
[
  xx, xy, xz, ?
  yx, yy, yz, ?
  zx, zy, zz, ?
]
```

This is because WebGPU requires mat3s to be in this format and since
this library is for WebGPU it makes sense to match so you can manipulate
mat3s in TypeArrays directly.

`vec3` in this library uses 3 floats per but be aware that an array of
`vec3` in a Uniform Block or other structure in WGSL, each vec3 is
padded to 4 floats! In other words, if you declare

```wgsl
struct Foo {
  bar: vec3<f32>[3];
};
```

then bar[0] is at byte offset 0, bar[1] at byte offset 16, bar[2] at byte offset 32.

See [the WGSL spec on alignment and size](https://www.w3.org/TR/WGSL/#alignment-and-size).

## Columns vs Rows

WebGPU follows the same conventions as OpenGL, Vulkan, Metal for matrices. Some people call this "column major". The issue is the columns of
a traditional "math" matrix are stored as rows when declaring a matrix in code.

```js
[
  x1, x2, x3, x4,  // <- column 0
  y1, y2, y3, y4,  // <- column 1
  z1, z2, z3, z4,  // <- column 2
  w1, w2, w3, w4,  // <- column 3
]
```

To put it another way, the translation vector is in elements 12, 13, 14

```js
[
  xx, xy, xz, 0,  // <- x-axis
  yx, yy, yz, 0,  // <- y-axis
  zx, zy, zz, 0,  // <- z-axis
  tx, ty, tz, 1,  // <- translation
]
```

This issue has confused programmers since at least the early 90s 😌

## Performance vs Convenience

Most functions take an optional destination as the last argument.
If you don't supply it a new one (vector, matrix) will be created
for you.

```js
// convenient usage

const persp = mat4.perspective(fov, aspect, near, far);
const camera = mat4.target(eye, target, up);
const view = mat4.inverse(camera);
```

```js
// performant usage

const persp = mat4.create();
const camera = mat4.create();
const view = mat4.create();

mat4.perspective(fov, aspect, near, far, persp);
mat4.target(eye, target, up, camera);
mat4.inverse(camera, view);
```

For me, most of the stuff I do in WebGPU, the supposed performance I might lose
from using the convenient style is so small as to be unmeasurable. I'd prefer to
stay convenient and then, if and only if I find a performance issue, then I
might bother to switch to the performant style.

As the saying goes [*premature optimization is the root of all evil.*](https://softwareengineering.stackexchange.com/questions/80084/is-premature-optimization-really-the-root-of-all-evil) 😉

