# wgpu-matrix

[![NPM Package][npm]][npm-url]

Fast 3d math library for webgpu

* [Docs](https://wgpu-matrix.org/docs)
* [Repo](https://github.com/greggman/wgpu-matrix)
* [Tests](https://wgpu-matrix.org/test/)

## Why another 3d math library?

* Most other 3D math libraries are designed for WebGL, not WebGPU
  * WebGPU uses clip space Z 0 to 1, vs WebGL -1 to 1. So `ortho`, `perspective`, `frustum` are different
  * WebGPU mat3s are 12 floats (padded), WebGL they're 9.
* Many other 3D math libraries are overly verbose
  * compare

    ```js
    // wgpu-matrix
    const t = mat4.translation([x, y, z]);
    const p = mat4.perspective(fov, aspect, near, far);
    const r = mat4.rotationX(rad);
    ```

    ```js
    // gl-matrix
    const t = mat4.create();
    mat4.fromTranslation(t, [x, y, z]);

    const p = mat4.create();
    mat4.perspective(p, fov, aspect, near, far);

    const r = mat4.create();
    mat4.fromXRotation(r, rad);
    ```

    note that if you want to pre-create matrices you can still do this in wgpu-matrix

    ```js
    const t = mat4.create();
    mat4.translation([x, y, z], t);

    const p = mat4.create();
    mat4.perspective(fov, aspect, near, far, p);

    const r = mat4.create();
    mat4.rotationX(rad, r);
    ```

## Usage

```js
import {
  vec3,
  mat4,
} from 'https://wgpu-matrix.org/dist/3.x/wgpu-matrix.module.js';

const fov = 60 * Math.PI / 180
const aspect = width / height;
const near = 0.1;
const far = 1000;
const perspective = mat4.perspective(fov, aspect, near, far);

const eye = [3, 5, 10];
const target = [0, 4, 0];
const up = [0, 1, 0];
const view = mat4.lookAt(eye, target, up);
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
const m = mat4.create();            // m = new mat4
mat4.identity(m);                   // m = identity
mat4.translate(m, [1, 2, 3], m);    // m *= translation([1, 2, 3])
mat4.rotateX(m, Math.PI * 0.5, m);  // m *= rotationX(Math.PI * 0.5)
mat4.scale(m, [1, 2, 3], m);        // m *= scaling([1, 2, 3])
```

There is also the minified version

```js
import {
  vec3,
  mat4,
} from 'https://wgpu-matrix.org/dist/3.x/wgpu-matrix.module.min.js';

// ... etc ...
```

and a UMD version

```html
<script src="https://wgpu-matrix.org/dist/3.x/wgpu-matrix.js"></script>
<script>
const { mat4, vec3 } = wgpuMatrix;
const m = mat4.identity();
...
</script>
```

or UDM min version

```html
<script src="https://wgpu-matrix.org/dist/3.x/wgpu-matrix.min.js"></script>
...
```

or via npm

```sh
npm install --save wgpu-matrix
```

then using a build process

```js
import {vec3, mat3} from 'wgpu-matrix';

// ... etc ...
```

[Example](https://codesandbox.io/s/cocky-bogdan-bwq5x?file=/src/index.js)

## Download

* [zip](https://github.com/greggman/wgpu-matrix/zipball/main)
* [tar](https://github.com/greggman/wgpu-matrix/tarball/main)
* [github](https://github.com/greggman/wgpu-matrix)

## Notes

[`mat4.perspective`](https://wgpu-matrix.org/docs/functions/mat4.perspective.html),
[`mat4.ortho`](https://wgpu-matrix.org/docs/functions/mat4.ortho.html), and
[`mat4.frustum`](https://wgpu-matrix.org/docs/functions/mat4.frustum.html)
all return matrices with Z clip space from 0 to 1 (unlike most WebGL matrix libraries which return -1 to 1)

[`mat4.create`](https://wgpu-matrix.org/docs/functions/mat4.create.html) makes an all zero matrix if passed no parameters.
If you want an identity matrix call `mat4.identity`

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

```
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
If you don't supply it, a new one (vector, matrix) will be created
for you.

```js
// convenient usage

const persp = mat4.perspective(fov, aspect, near, far);
const camera = mat4.lookAt(eye, target, up);
const view = mat4.inverse(camera);
```

```js
// performant usage

// at init time
const persp = mat4.create();
const camera = mat4.create();
const view = mat4.create();

// at usage time
mat4.perspective(fov, aspect, near, far, persp);
mat4.lookAt(eye, target, up, camera);
mat4.inverse(camera, view);
```

For me, most of the stuff I do in WebGPU, the supposed performance I might lose
from using the convenient style is so small as to be unmeasurable. I'd prefer to
stay convenient and then, if and only if I find a performance issue, then I
might bother to switch to the performant style.

As the saying goes [*premature optimization is the root of all evil.*](https://softwareengineering.stackexchange.com/questions/80084/is-premature-optimization-really-the-root-of-all-evil) 😉

## Migration

### 2.x -> 3.x

In JavaScript there should be no difference in the API except for the removable of `setDefaultType`.

In TypeScript, 3.x should mostly be type compatible with 2.x. 
3.x is an attempt to fix the casting that was necessary in 2.x.

```js
// 2.x
device.queue.writeData(buffer, 0, mat4.identity() as Float32Array);  // sadness! 😭

// 3.x
device.queue.writeData(buffer, 0, mat4.identity());  // Yay! 🎉
```

In TypeScript the differences are as follows

#### Functions have a default type but return what is passed to them as the dst.

In 3.x each function has a default type but if you pass it
a destination it returns the type of the destination

```ts
mat4.identity()                       // returns Float32Array
mat4.identity(new Float32Array(16));  // returns Float32Array
mat4.identity(new Float64Array(16));  // returns Float32Array
mat4.identity(new Array(16));         // returns number[]
```

### Types are specific

```ts
const a: Mat4 = ...;    // a = Float32Array
const b: Mat4d = ...;   // b = Float64Array
const c: Mat4n = ...;   // c = number[]
```

This is means code like this

```ts
const position: Mat4 = [10, 20, 30];
```

No longer works because `Mat4` is a `Float32Array`.

**BUT, functions take any of the normal types as an argument just like they used to**

```js
const position = [10, 20, 30];          // number[]
const target = vec3.create(1, 2, 3);    // Float32Array
const up = new Float64Array([0, 1, 0]); // Float64Array

// Works fine, even those types are different, just like 2.x did
const view = mat4.lookAt(position, target, up);  // Float32Array
```

If you really want types for each concrete type there's

* `Float32Array` types: `Mat3`, `Mat4`, `Quat`, `Vec2`, `Vec3`, `Vec4`
* `Float64Array` types: `Mat3d`, `Mat4d`, `Quatd`, `Vec2d`, `Vec3d`, `Vec4d`,
* `number[]` types: `Mat3n`, `Mat4n`, `Quatn`, `Vec2n`, `Vec3n`, `Vec4n`

### There are 3 sets of functions, each one returning a different default

```ts
mat4.identity()   // returns Float32Array
mat4d.identity()  // returns Float64Array
mat4n.identity()  // returns number[]
```

Similarly there's `mat3d`, `mat3n`, `quatd`, `quatn`,
`vec2d`, `vec2n`, `vec3d`, `vec3n`, `vec4d`, `vec4n`.

**Note: that in general you're unlikely to need any of these. Just use the
same ones you were using in 2.x**

### 1.x -> 2.x

* [`mat4.lookAt`](https://wgpu-matrix.org/docs/functions/mat4.lookAt.html) 
  changed from a "camera matrix" to a "view matrix" (same as gluLookAt). 
  If you want a matrix that orients an something in world space see
  [`mat4.aim`](https://wgpu-matrix.org/docs/functions/mat4.frustum.html).
  Sorry about this change but people are used to lookAt making a a view matrix
  and it seemed prudent to make this change now and save more people from
  frustration going forward.

## Development

```sh
git clone https://github.com/greggman/wgpu-matrix.git
cd wgpu-matrix
npm i
npm run build
npm test
```

You can run tests in the browser by starting a local server

```sh
npx servez
```

Now go to wherever your server serves pages. In the case of `servez` that's
probably [http://localhost:8080/test/](http://localhost:8080/test/).

By default the tests test the minified version. To test the source use `src=true`
as in [http://localhost:8080/test/?src=true](http://localhost:8080/test/src=true).

To limit which tests are run use `grep=<regex>`. For example
[http://localhost:8080/test/?src=true&grep=mat3.*?translate](http://localhost:8080/test/src=true&grep=mat3.*?translate)
runs only tests with `mat3` followed by `translate` in the name of test.

## License

[MIT](LICENSE.md)


[npm]: https://img.shields.io/npm/v/wgpu-matrix
[npm-url]: https://www.npmjs.com/package/wgpu-matrix
