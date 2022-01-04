/**
 * <p>3x3 Matrix math math functions.</p>
 * <p>Almost all functions take an optional <code>dst</code> argument. If it is not passed in the<br>
 * functions will create a new matrix. In other words you can do this</p>
 * <pre><code>const mat = mat3.translation([1, 2, 3]);  // Creates a new translation matrix
 * </code></pre>
 * <p>or</p>
 * <pre><code>const mat = mat3.create();
 * mat3.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 * </code></pre>
 * <p>The first style is often easier but depending on where it's used it generates garbage where<br>
 * as there is almost never allocation with the second style.</p>
 * <p>It is always save to pass any matrix as the destination. So for example</p>
 * <pre><code>const mat = mat3.identity();
 * const trans = mat3.translation([1, 2, 3]);
 * mat3.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.</code></pre>
 */
declare module "mat3" {
    /**
     * <p>A JavaScript array with 12 values, a Float32Array with 12 values, or a Float64Array with 12 values.<br>
     * When created by the library will create the default type which is <code>Float32Array</code><br>
     * but can be set by calling {@link mat3.setDefaultType}.</p>
     * <p><code>mat3</code> uses the space of 12 elements</p>
     * <pre class="prettyprint source lang-js"><code>// a mat3
     * [
     *   xx, xy, xz, ?
     *   yx, yy, yz, ?
     *   zx, zy, zz, ?
     * ]
     * </code></pre>
     */
    type Mat3 = number[] | Float32Array | Float64Array;
    /**
     * <p>Sets the type this library creates for a Mat3</p>
     * @param ctor - <p>the constructor for the type. Either <code>Float32Array</code>, 'Float64Array', or <code>Array</code></p>
     * @returns <p>previous constructor for Mat3</p>
     */
    function setDefaultType(ctor: constructor): constructor;
    /**
     * <p>Create a Mat3 from values</p>
     * <p>Note: Since passing in a raw JavaScript array<br>
     * is valid in all circumstances, if you want to<br>
     * force a JavaScript array into a Mat3's specified type<br>
     * it would be faster to use</p>
     * <pre class="prettyprint source"><code>const m = mat3.clone(someJSArray);
     * </code></pre>
     * <p>Note: a consequence of the implementation is if your Mat3Type = <code>Array</code><br>
     * instead of <code>Float32Array</code> or <code>Float64Array</code> then any values you<br>
     * don't pass in will be undefined. Usually this is not an issue since<br>
     * (a) using <code>Array</code> is rare and (b) using <code>mat3.create</code> is usually used<br>
     * to create a Mat3 to be filled out as in</p>
     * <pre class="prettyprint source"><code>const m = mat3.create();
     * mat3.perspective(fov, aspect, near, far, m);
     * </code></pre>
     * @param [v0] - <p>value for element 0</p>
     * @param [v1] - <p>value for element 1</p>
     * @param [v2] - <p>value for element 2</p>
     * @param [v3] - <p>value for element 3</p>
     * @param [v4] - <p>value for element 4</p>
     * @param [v5] - <p>value for element 5</p>
     * @param [v6] - <p>value for element 6</p>
     * @param [v7] - <p>value for element 7</p>
     * @param [v8] - <p>value for element 8</p>
     * @returns <p>created from values.</p>
     */
    function create(v0?: number, v1?: number, v2?: number, v3?: number, v4?: number, v5?: number, v6?: number, v7?: number, v8?: number): Mat3;
    /**
     * <p>Negates a matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>-m.</p>
     */
    function negate(m: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Copies a matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>The matrix. If not passed a new one is created.</p>
     * @returns <p>A copy of m.</p>
     */
    function copy(m: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Copies a matrix (same as copy)</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>The matrix. If not passed a new one is created.</p>
     * @returns <p>A copy of m.</p>
     */
    function clone(m: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Check if 2 matrices are approximately equal</p>
     * @param a - <p>Operand matrix.</p>
     * @param b - <p>Operand matrix.</p>
     * @returns <p>true if matrices are approximately equal</p>
     */
    function equalsApproximately(a: Mat3, b: Mat3): boolean;
    /**
     * <p>Check if 2 matrices are exactly equal</p>
     * @param a - <p>Operand matrix.</p>
     * @param b - <p>Operand matrix.</p>
     * @returns <p>true if matrices are exactly equal</p>
     */
    function equals(a: Mat3, b: Mat3): boolean;
    /**
     * <p>Creates an n-by-n identity matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>An n-by-n identity matrix.</p>
     */
    function identity(dst?: Mat3): Mat3;
    /**
     * <p>Takes the transpose of a matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The transpose of m.</p>
     */
    function transpose(m: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Computes the inverse of a 3-by-3 matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The inverse of m.</p>
     */
    function inverse(m: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Compute the determinant of a matrix</p>
     * @param m - <p>the matrix</p>
     * @returns <p>the determinant</p>
     */
    function determinant(m: Mat3): number;
    /**
     * <p>Computes the inverse of a 3-by-3 matrix. (same as inverse)</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The inverse of m.</p>
     */
    function invert(m: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Multiplies two 3-by-3 matrices with a on the left and b on the right</p>
     * @param a - <p>The matrix on the left.</p>
     * @param b - <p>The matrix on the right.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The matrix product of a and b.</p>
     */
    function multiply(a: Mat3, b: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Multiplies two 3-by-3 matrices with a on the left and b on the right (same as multiply)</p>
     * @param a - <p>The matrix on the left.</p>
     * @param b - <p>The matrix on the right.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The matrix product of a and b.</p>
     */
    function mul(a: Mat3, b: Mat3, dst?: Mat3): Mat3;
    /**
     * <p>Sets the translation component of a 3-by-3 matrix to the given<br>
     * vector.</p>
     * @param a - <p>The matrix.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The matrix with translation set.</p>
     */
    function setTranslation(a: Mat3, v: Vec2, dst?: Mat3): Mat3;
    /**
     * <p>Returns the translation component of a 3-by-3 matrix as a vector with 3<br>
     * entries.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>vector to hold result. If not passed a new one is created.</p>
     * @returns <p>The translation component of m.</p>
     */
    function getTranslation(m: Mat3, dst?: Vec2): Vec2;
    /**
     * <p>Returns an axis of a 3x3 matrix as a vector with 2 entries</p>
     * @param m - <p>The matrix.</p>
     * @param axis - <p>The axis 0 = x, 1 = y,</p>
     * @returns <p>The axis component of m.</p>
     */
    function getAxis(m: Mat3, axis: number): Vec2;
    /**
     * <p>Sets an axis of a 3x3 matrix as a vector with 2 entries</p>
     * @param m - <p>The matrix.</p>
     * @param v - <p>the axis vector</p>
     * @param axis - <p>The axis  0 = x, 1 = y;</p>
     * @param [dst] - <p>The matrix to set. If not passed a new one is created.</p>
     * @returns <p>The matrix with axis set.</p>
     */
    function setAxis(m: Mat3, v: Vec2, axis: number, dst?: Mat3): Mat3;
    /**
     * <p>Returns the scaling component of the matrix</p>
     * @param m - <p>The Matrix</p>
     * @param [dst] - <p>The vector to set. If not passed a new one is created.</p>
     */
    function getScaling(m: Mat3, dst?: Vec2): void;
    /**
     * <p>Creates a 3-by-3 matrix which translates by the given vector v.</p>
     * @param v - <p>The vector by which to translate.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The translation matrix.</p>
     */
    function translation(v: Vec2, dst?: Mat3): Mat3;
    /**
     * <p>Translates the given 3-by-3 matrix by the given vector v.</p>
     * @param m - <p>The matrix.</p>
     * @param v - <p>The vector by which to translate.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The translated matrix.</p>
     */
    function translate(m: Mat3, v: Vec2, dst?: Mat3): Mat3;
    /**
     * <p>Creates a 3-by-3 matrix which rotates  by the given angle.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotation matrix.</p>
     */
    function rotation(angleInRadians: number, dst?: Mat3): Mat3;
    /**
     * <p>Rotates the given 3-by-3 matrix  by the given angle.</p>
     * @param m - <p>The matrix.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotated matrix.</p>
     */
    function rotate(m: Mat3, angleInRadians: number, dst?: Mat3): Mat3;
    /**
     * <p>Creates a 3-by-3 matrix which scales in each dimension by an amount given by<br>
     * the corresponding entry in the given vector; assumes the vector has three<br>
     * entries.</p>
     * @param v - <p>A vector of<br>
     * 2 entries specifying the factor by which to scale in each dimension.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The scaling matrix.</p>
     */
    function scaling(v: Vec2, dst?: Mat3): Mat3;
    /**
     * <p>Scales the given 3-by-3 matrix in each dimension by an amount<br>
     * given by the corresponding entry in the given vector; assumes the vector has<br>
     * three entries.</p>
     * @param m - <p>The matrix to be modified.</p>
     * @param v - <p>A vector of 2 entries specifying the<br>
     * factor by which to scale in each dimension.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The scaled matrix.</p>
     */
    function scale(m: Mat3, v: Vec2, dst?: Mat3): Mat3;
}

/**
 * <p>4x4 Matrix math math functions.</p>
 * <p>Almost all functions take an optional <code>dst</code> argument. If it is not passed in the<br>
 * functions will create a new matrix. In other words you can do this</p>
 * <pre><code>const mat = mat4.translation([1, 2, 3]);  // Creates a new translation matrix
 * </code></pre>
 * <p>or</p>
 * <pre><code>const mat = mat4.create();
 * mat4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 * </code></pre>
 * <p>The first style is often easier but depending on where it's used it generates garbage where<br>
 * as there is almost never allocation with the second style.</p>
 * <p>It is always save to pass any matrix as the destination. So for example</p>
 * <pre><code>const mat = mat4.identity();
 * const trans = mat4.translation([1, 2, 3]);
 * mat4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.</code></pre>
 */
declare module "mat4" {
    /**
     * <p>A JavaScript array with 16 values, a Float32Array with 16 values, or a Float64Array with 16 values.<br>
     * When created by the library will create the default type which is <code>Float32Array</code><br>
     * but can be set by calling {@link mat4.setDefaultType}.</p>
     */
    type Mat4 = number[] | Float32Array | Float64Array;
    /**
     * <p>Sets the type this library creates for a Mat4</p>
     * @param ctor - <p>the constructor for the type. Either <code>Float32Array</code>, 'Float64Array', or <code>Array</code></p>
     * @returns <p>previous constructor for Mat4</p>
     */
    function setDefaultType(ctor: constructor): constructor;
    /**
     * <p>Create a Mat4 from values</p>
     * <p>Note: Since passing in a raw JavaScript array<br>
     * is valid in all circumstances, if you want to<br>
     * force a JavaScript array into a Mat4's specified type<br>
     * it would be faster to use</p>
     * <pre class="prettyprint source"><code>const m = mat4.clone(someJSArray);
     * </code></pre>
     * <p>Note: a consequence of the implementation is if your Mat4Type = <code>Array</code><br>
     * instead of <code>Float32Array</code> or <code>Float64Array</code> then any values you<br>
     * don't pass in will be undefined. Usually this is not an issue since<br>
     * (a) using <code>Array</code> is rare and (b) using <code>mat4.create</code> is usually used<br>
     * to create a Mat4 to be filled out as in</p>
     * <pre class="prettyprint source"><code>const m = mat4.create();
     * mat4.perspective(fov, aspect, near, far, m);
     * </code></pre>
     * @param [v0] - <p>value for element 0</p>
     * @param [v1] - <p>value for element 1</p>
     * @param [v2] - <p>value for element 2</p>
     * @param [v3] - <p>value for element 3</p>
     * @param [v4] - <p>value for element 4</p>
     * @param [v5] - <p>value for element 5</p>
     * @param [v6] - <p>value for element 6</p>
     * @param [v7] - <p>value for element 7</p>
     * @param [v8] - <p>value for element 8</p>
     * @param [v9] - <p>value for element 9</p>
     * @param [v10] - <p>value for element 10</p>
     * @param [v11] - <p>value for element 11</p>
     * @param [v12] - <p>value for element 12</p>
     * @param [v13] - <p>value for element 13</p>
     * @param [v14] - <p>value for element 14</p>
     * @param [v15] - <p>value for element 15</p>
     * @returns <p>created from values.</p>
     */
    function create(v0?: number, v1?: number, v2?: number, v3?: number, v4?: number, v5?: number, v6?: number, v7?: number, v8?: number, v9?: number, v10?: number, v11?: number, v12?: number, v13?: number, v14?: number, v15?: number): Mat4;
    /**
     * <p>Negates a matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>-m.</p>
     */
    function negate(m: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Copies a matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>The matrix. If not passed a new one is created.</p>
     * @returns <p>A copy of m.</p>
     */
    function copy(m: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Copies a matrix (same as copy)</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>The matrix. If not passed a new one is created.</p>
     * @returns <p>A copy of m.</p>
     */
    function clone(m: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Check if 2 matrices are approximately equal</p>
     * @param a - <p>Operand matrix.</p>
     * @param b - <p>Operand matrix.</p>
     * @returns <p>true if matrices are approximately equal</p>
     */
    function equalsApproximately(a: Mat4, b: Mat4): boolean;
    /**
     * <p>Check if 2 matrices are exactly equal</p>
     * @param a - <p>Operand matrix.</p>
     * @param b - <p>Operand matrix.</p>
     * @returns <p>true if matrices are exactly equal</p>
     */
    function equals(a: Mat4, b: Mat4): boolean;
    /**
     * <p>Creates an n-by-n identity matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>An n-by-n identity matrix.</p>
     */
    function identity(dst?: Mat4): Mat4;
    /**
     * <p>Takes the transpose of a matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The transpose of m.</p>
     */
    function transpose(m: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Computes the inverse of a 4-by-4 matrix.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The inverse of m.</p>
     */
    function inverse(m: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Compute the determinant of a matrix</p>
     * @param m - <p>the matrix</p>
     * @returns <p>the determinant</p>
     */
    function determinant(m: Mat4): number;
    /**
     * <p>Computes the inverse of a 4-by-4 matrix. (same as inverse)</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The inverse of m.</p>
     */
    function invert(m: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Multiplies two 4-by-4 matrices with a on the left and b on the right</p>
     * @param a - <p>The matrix on the left.</p>
     * @param b - <p>The matrix on the right.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The matrix product of a and b.</p>
     */
    function multiply(a: Mat4, b: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Multiplies two 4-by-4 matrices with a on the left and b on the right (same as multiply)</p>
     * @param a - <p>The matrix on the left.</p>
     * @param b - <p>The matrix on the right.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The matrix product of a and b.</p>
     */
    function mul(a: Mat4, b: Mat4, dst?: Mat4): Mat4;
    /**
     * <p>Sets the translation component of a 4-by-4 matrix to the given<br>
     * vector.</p>
     * @param a - <p>The matrix.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The matrix with translation set.</p>
     */
    function setTranslation(a: Mat4, v: Vec3, dst?: Mat4): Mat4;
    /**
     * <p>Returns the translation component of a 4-by-4 matrix as a vector with 3<br>
     * entries.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>vector to hold result. If not passed a new one is created.</p>
     * @returns <p>The translation component of m.</p>
     */
    function getTranslation(m: Mat4, dst?: Vec3): Vec3;
    /**
     * <p>Returns an axis of a 4x4 matrix as a vector with 3 entries</p>
     * @param m - <p>The matrix.</p>
     * @param axis - <p>The axis 0 = x, 1 = y, 2 = z;</p>
     * @returns <p>The axis component of m.</p>
     */
    function getAxis(m: Mat4, axis: number): Vec3;
    /**
     * <p>Sets an axis of a 4x4 matrix as a vector with 3 entries</p>
     * @param m - <p>The matrix.</p>
     * @param v - <p>the axis vector</p>
     * @param axis - <p>The axis  0 = x, 1 = y, 2 = z;</p>
     * @param [dst] - <p>The matrix to set. If not passed a new one is created.</p>
     * @returns <p>The matrix with axis set.</p>
     */
    function setAxis(m: Mat4, v: Vec3, axis: number, dst?: Mat4): Mat4;
    /**
     * <p>Returns the scaling component of the matrix</p>
     * @param m - <p>The Matrix</p>
     * @param [dst] - <p>The vector to set. If not passed a new one is created.</p>
     */
    function getScaling(m: Mat4, dst?: Vec3): void;
    /**
     * <p>Computes a 4-by-4 perspective transformation matrix given the angular height<br>
     * of the frustum, the aspect ratio, and the near and far clipping planes.  The<br>
     * arguments define a frustum extending in the negative z direction.  The given<br>
     * angle is the vertical angle of the frustum, and the horizontal angle is<br>
     * determined to produce the given aspect ratio.  The arguments near and far are<br>
     * the distances to the near and far clipping planes.  Note that near and far<br>
     * are not z coordinates, but rather they are distances along the negative<br>
     * z-axis.  The matrix generated sends the viewing frustum to the unit box.<br>
     * We assume a unit box extending from -1 to 1 in the x and y dimensions and<br>
     * from 0 to 1 in the z dimension.</p>
     * @param fieldOfViewYInRadians - <p>The camera angle from top to bottom (in radians).</p>
     * @param aspect - <p>The aspect ratio width / height.</p>
     * @param zNear - <p>The depth (negative z coordinate)<br>
     * of the near clipping plane.</p>
     * @param zFar - <p>The depth (negative z coordinate)<br>
     * of the far clipping plane.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The perspective matrix.</p>
     */
    function perspective(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number, dst?: Mat4): Mat4;
    /**
     * <p>Computes a 4-by-4 orthogonal transformation matrix that transforms from<br>
     * the given the left, right, bottom, and top dimensions to -1 +1 in x, and y<br>
     * and 0 to +1 in z.</p>
     * @param left - <p>Left side of the near clipping plane viewport.</p>
     * @param right - <p>Right side of the near clipping plane viewport.</p>
     * @param bottom - <p>Bottom of the near clipping plane viewport.</p>
     * @param top - <p>Top of the near clipping plane viewport.</p>
     * @param near - <p>The depth (negative z coordinate)<br>
     * of the near clipping plane.</p>
     * @param far - <p>The depth (negative z coordinate)<br>
     * of the far clipping plane.</p>
     * @param [dst] - <p>Output matrix. If not passed a new one is created.</p>
     * @returns <p>The perspective matrix.</p>
     */
    function ortho(left: number, right: number, bottom: number, top: number, near: number, far: number, dst?: Mat4): Mat4;
    /**
     * <p>Computes a 4-by-4 perspective transformation matrix given the left, right,<br>
     * top, bottom, near and far clipping planes. The arguments define a frustum<br>
     * extending in the negative z direction. The arguments near and far are the<br>
     * distances to the near and far clipping planes. Note that near and far are not<br>
     * z coordinates, but rather they are distances along the negative z-axis. The<br>
     * matrix generated sends the viewing frustum to the unit box. We assume a unit<br>
     * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z<br>
     * dimension.</p>
     * @param left - <p>The x coordinate of the left plane of the box.</p>
     * @param right - <p>The x coordinate of the right plane of the box.</p>
     * @param bottom - <p>The y coordinate of the bottom plane of the box.</p>
     * @param top - <p>The y coordinate of the right plane of the box.</p>
     * @param near - <p>The negative z coordinate of the near plane of the box.</p>
     * @param far - <p>The negative z coordinate of the far plane of the box.</p>
     * @param [dst] - <p>Output matrix. If not passed a new one is created.</p>
     * @returns <p>The perspective projection matrix.</p>
     */
    function frustum(left: number, right: number, bottom: number, top: number, near: number, far: number, dst?: Mat4): Mat4;
    /**
     * <p>Computes a 4-by-4 look-at transformation.</p>
     * <p>This is a matrix which positions the camera itself. If you want<br>
     * a view matrix (a matrix which moves things in front of the camera)<br>
     * take the inverse of this.</p>
     * @param eye - <p>The position of the eye.</p>
     * @param target - <p>The position meant to be viewed.</p>
     * @param up - <p>A vector pointing up.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The look-at matrix.</p>
     */
    function lookAt(eye: Vec3, target: Vec3, up: Vec3, dst?: Mat4): Mat4;
    /**
     * <p>Creates a 4-by-4 matrix which translates by the given vector v.</p>
     * @param v - <p>The vector by<br>
     * which to translate.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The translation matrix.</p>
     */
    function translation(v: Vec3, dst?: Mat4): Mat4;
    /**
     * <p>Translates the given 4-by-4 matrix by the given vector v.</p>
     * @param m - <p>The matrix.</p>
     * @param v - <p>The vector by<br>
     * which to translate.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The translated matrix.</p>
     */
    function translate(m: Mat4, v: Vec3, dst?: Mat4): Mat4;
    /**
     * <p>Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotation matrix.</p>
     */
    function rotationX(angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Rotates the given 4-by-4 matrix around the x-axis by the given<br>
     * angle.</p>
     * @param m - <p>The matrix.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotated matrix.</p>
     */
    function rotateX(m: Mat4, angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotation matrix.</p>
     */
    function rotationY(angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Rotates the given 4-by-4 matrix around the y-axis by the given<br>
     * angle.</p>
     * @param m - <p>The matrix.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotated matrix.</p>
     */
    function rotateY(m: Mat4, angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotation matrix.</p>
     */
    function rotationZ(angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Rotates the given 4-by-4 matrix around the z-axis by the given<br>
     * angle.</p>
     * @param m - <p>The matrix.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotated matrix.</p>
     */
    function rotateZ(m: Mat4, angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Creates a 4-by-4 matrix which rotates around the given axis by the given<br>
     * angle.</p>
     * @param axis - <p>The axis<br>
     * about which to rotate.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>A matrix which rotates angle radians<br>
     * around the axis.</p>
     */
    function axisRotation(axis: Vec3, angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Creates a 4-by-4 matrix which rotates around the given axis by the given<br>
     * angle. (same as axisRotation)</p>
     * @param axis - <p>The axis<br>
     * about which to rotate.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>A matrix which rotates angle radians<br>
     * around the axis.</p>
     */
    function rotation(axis: Vec3, angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Rotates the given 4-by-4 matrix around the given axis by the<br>
     * given angle.</p>
     * @param m - <p>The matrix.</p>
     * @param axis - <p>The axis<br>
     * about which to rotate.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotated matrix.</p>
     */
    function axisRotate(m: Mat4, axis: Vec3, angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Rotates the given 4-by-4 matrix around the given axis by the<br>
     * given angle. (same as rotate)</p>
     * @param m - <p>The matrix.</p>
     * @param axis - <p>The axis<br>
     * about which to rotate.</p>
     * @param angleInRadians - <p>The angle by which to rotate (in radians).</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The rotated matrix.</p>
     */
    function rotate(m: Mat4, axis: Vec3, angleInRadians: number, dst?: Mat4): Mat4;
    /**
     * <p>Creates a 4-by-4 matrix which scales in each dimension by an amount given by<br>
     * the corresponding entry in the given vector; assumes the vector has three<br>
     * entries.</p>
     * @param v - <p>A vector of<br>
     * three entries specifying the factor by which to scale in each dimension.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The scaling matrix.</p>
     */
    function scaling(v: Vec3, dst?: Mat4): Mat4;
    /**
     * <p>Scales the given 4-by-4 matrix in each dimension by an amount<br>
     * given by the corresponding entry in the given vector; assumes the vector has<br>
     * three entries.</p>
     * @param m - <p>The matrix to be modified.</p>
     * @param v - <p>A vector of three entries specifying the<br>
     * factor by which to scale in each dimension.</p>
     * @param [dst] - <p>matrix to hold result. If not passed a new one is created.</p>
     * @returns <p>The scaled matrix.</p>
     */
    function scale(m: Mat4, v: Vec3, dst?: Mat4): Mat4;
}

declare module "utils" {
    /**
     * <p>Set the value for EPSILON for various checks</p>
     * @param v - <p>Value to use for EPSILON.</p>
     * @returns <p>previous value of EPSILON;</p>
     */
    function setEpsilon(v: number): number;
    /**
     * <p>Convert degrees to radians</p>
     * @param degrees - <p>Angle in degrees</p>
     * @returns <p>angle converted to radians</p>
     */
    function degToRad(degrees: number): number;
    /**
     * <p>Convert radians to degrees</p>
     * @param radians - <p>Angle in radians</p>
     * @returns <p>angle converted to degrees</p>
     */
    function radToDeg(radians: number): number;
    /**
     * <p>Lerps between a and b via t</p>
     * @param a - <p>starting value</p>
     * @param b - <p>ending value</p>
     * @param t - <p>value where 0 = a and 1 = b</p>
     * @returns <p>a + (b - a) * t</p>
     */
    function lerp(a: number, b: number, t: number): number;
    /**
     * <p>Compute the opposite of lerp. Given a and b and a value between<br>
     * a and b returns a value between 0 and 1. 0 if a, 1 if b.<br>
     * Note: no clamping is done.</p>
     * @param a - <p>start value</p>
     * @param b - <p>end value</p>
     * @param v - <p>value between a and b</p>
     * @returns <p>(v - a) / (b - a)</p>
     */
    function inverseLerp(a: number, b: number, v: number): number;
    /**
     * <p>Compute the euclidean modulo</p>
     * <pre class="prettyprint source"><code>// table for n / 3
     * -5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5   &lt;- n
     * ------------------------------------
     * -2  -1  -0  -2  -1   0,  1,  2,  0,  1,  2   &lt;- n % 3
     *  1   2   0   1   2   0,  1,  2,  0,  1,  2   &lt;- euclideanModule(n, 3)
     * </code></pre>
     * @param n - <p>dividend</p>
     * @param m - <p>divisor</p>
     * @returns <p>the euclidean modulo of n / m</p>
     */
    function euclideanModulo(n: number, m: number): number;
}

/**
 * <p>Vec2 math functions.</p>
 * <p>Almost all functions take an optional <code>dst</code> argument. If it is not passed in the<br>
 * functions will create a new Vec2. In other words you can do this</p>
 * <pre><code>const v = vec2.cross(v1, v2);  // Creates a new Vec2 with the cross product of v1 x v2.
 * </code></pre>
 * <p>or</p>
 * <pre><code>const v = vec2.create();
 * vec2.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 * </code></pre>
 * <p>The first style is often easier but depending on where it's used it generates garbage where<br>
 * as there is almost never allocation with the second style.</p>
 * <p>It is always safe to pass any vector as the destination. So for example</p>
 * <pre><code>vec2.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1</code></pre>
 */
declare module "vec2" {
    /**
     * <p>A JavaScript array with 2 values, Float32Array with 2 values, or a Float64Array with 2 values.<br>
     * When created by the library will create the default type which is <code>Float32Array</code><br>
     * but can be set by calling {@link vec2.setDefaultType}.</p>
     */
    type Vec2 = number[] | Float32Array | Float64Array;
    /**
     * <p>Sets the type this library creates for a Vec2</p>
     * @param ctor - <p>the constructor for the type. Either <code>Float32Array</code>, 'Float64Array', or <code>Array</code></p>
     * @returns <p>previous constructor for Vec2</p>
     */
    function setDefaultType(ctor: constructor): constructor;
    /**
     * <p>Creates a Vec2; may be called with x, y, z to set initial values.</p>
     * <p>Note: Since passing in a raw JavaScript array<br>
     * is valid in all circumstances, if you want to<br>
     * force a JavaScript array into a Vec2's specified type<br>
     * it would be faster to use</p>
     * <pre class="prettyprint source"><code>const v = vec2.clone(someJSArray);
     * </code></pre>
     * <p>Note: a consequence of the implementation is if your Vec2Type = <code>Array</code><br>
     * instead of <code>Float32Array</code> or <code>Float64Array</code> then any values you<br>
     * don't pass in will be undefined. Usually this is not an issue since<br>
     * (a) using <code>Array</code> is rare and (b) using <code>vec2.create</code> is usually used<br>
     * to create a Vec2 to be filled out as in</p>
     * <pre class="prettyprint source"><code>const sum = vec2.create();
     * vec2.add(v1, v2, sum);
     * </code></pre>
     * @param [x] - <p>Initial x value.</p>
     * @param [y] - <p>Initial y value.</p>
     * @returns <p>the created vector</p>
     */
    function create(x?: number, y?: number): Vec2;
    /**
     * <p>Creates a Vec2; may be called with x, y, z to set initial values. (same as create)</p>
     * @param [x] - <p>Initial x value.</p>
     * @param [y] - <p>Initial y value.</p>
     * @returns <p>the created vector</p>
     */
    function fromValues(x?: number, y?: number): Vec2;
    /**
     * <p>Applies Math.ceil to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the ceil of each element of v.</p>
     */
    function ceil(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Applies Math.floor to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the floor of each element of v.</p>
     */
    function floor(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Applies Math.round to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the round of each element of v.</p>
     */
    function round(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Clamp each element of vector between min and max</p>
     * @param v - <p>Operand vector.</p>
     * @param [max] - <p>Min value, default 0</p>
     * @param [min] - <p>Max value, default 1</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that the clamped value of each element of v.</p>
     */
    function clamp(v: Vec2, max?: number, min?: number, dst?: Vec2): Vec2;
    /**
     * <p>Adds two vectors; assumes a and b have the same dimension.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the sum of a and b.</p>
     */
    function add(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param scale - <p>Amount to scale b</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the sum of a + b * scale.</p>
     */
    function addScaled(a: Vec2, b: Vec2, scale: number, dst?: Vec2): Vec2;
    /**
     * <p>Returns the angle in radians between two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>The angle in radians between the 2 vectors.</p>
     */
    function angle(a: Vec2, b: Vec2): number;
    /**
     * <p>Subtracts two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the difference of a and b.</p>
     */
    function subtract(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Subtracts two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the difference of a and b.</p>
     */
    function sub(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Check if 2 vectors are approximately equal</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>true if vectors are approximately equal</p>
     */
    function equalsApproximately(a: Vec2, b: Vec2): boolean;
    /**
     * <p>Check if 2 vectors are exactly equal</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>true if vectors are exactly equal</p>
     */
    function equals(a: Vec2, b: Vec2): boolean;
    /**
     * <p>Performs linear interpolation on two vectors.<br>
     * Given vectors a and b and interpolation coefficient t, returns<br>
     * a + t * (b - a).</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param t - <p>Interpolation coefficient.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The linear interpolated result.</p>
     */
    function lerp(a: Vec2, b: Vec2, t: number, dst?: Vec2): Vec2;
    /**
     * <p>Performs linear interpolation on two vectors.<br>
     * Given vectors a and b and interpolation coefficient vector t, returns<br>
     * a + t * (b - a).</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param t - <p>Interpolation coefficients vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>the linear interpolated result.</p>
     */
    function lerpV(a: Vec2, b: Vec2, t: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Return max values of two vectors.<br>
     * Given vectors a and b returns<br>
     * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The max components vector.</p>
     */
    function max(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Return min values of two vectors.<br>
     * Given vectors a and b returns<br>
     * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The min components vector.</p>
     */
    function min(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Multiplies a vector by a scalar.</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function mulScalar(v: Vec2, k: number, dst?: Vec2): Vec2;
    /**
     * <p>Multiplies a vector by a scalar. (same as mulScalar)</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function scale(v: Vec2, k: number, dst?: Vec2): Vec2;
    /**
     * <p>Divides a vector by a scalar.</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function divScalar(v: Vec2, k: number, dst?: Vec2): Vec2;
    /**
     * <p>Inverse a vector.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The inverted vector.</p>
     */
    function inverse(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Invert a vector. (same as inverse)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The inverted vector.</p>
     */
    function invert(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Computes the cross product of two vectors; assumes both vectors have<br>
     * three entries.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of a cross b.</p>
     */
    function cross(a: Vec2, b: Vec2, dst?: Vec3): Vec3;
    /**
     * <p>Computes the dot product of two vectors; assumes both vectors have<br>
     * three entries.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>dot product</p>
     */
    function dot(a: Vec2, b: Vec2): number;
    /**
     * <p>Computes the length of vector</p>
     * @param v - <p>vector.</p>
     * @returns <p>length of vector.</p>
     */
    function length(v: Vec2): number;
    /**
     * <p>Computes the length of vector (same as length)</p>
     * @param v - <p>vector.</p>
     * @returns <p>length of vector.</p>
     */
    function len(v: Vec2): number;
    /**
     * <p>Computes the square of the length of vector</p>
     * @param v - <p>vector.</p>
     * @returns <p>square of the length of vector.</p>
     */
    function lengthSq(v: Vec2): number;
    /**
     * <p>Computes the square of the length of vector (same as lengthSq)</p>
     * @param v - <p>vector.</p>
     * @returns <p>square of the length of vector.</p>
     */
    function lenSq(v: Vec2): number;
    /**
     * <p>Computes the distance between 2 points</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>distance between a and b</p>
     */
    function distance(a: Vec2, b: Vec2): number;
    /**
     * <p>Computes the distance between 2 points (same as distance)</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>distance between a and b</p>
     */
    function dist(a: Vec2, b: Vec2): number;
    /**
     * <p>Computes the square of the distance between 2 points</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>square of the distance between a and b</p>
     */
    function distanceSq(a: Vec2, b: Vec2): number;
    /**
     * <p>Computes the square of the distance between 2 points (same as distanceSq)</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>square of the distance between a and b</p>
     */
    function distSq(a: Vec2, b: Vec2): number;
    /**
     * <p>Divides a vector by its Euclidean length and returns the quotient.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The normalized vector.</p>
     */
    function normalize(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Negates a vector.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>-v.</p>
     */
    function negate(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Copies a vector. (same as clone)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A copy of v.</p>
     */
    function copy(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Clones a vector. (same as copy)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A copy of v.</p>
     */
    function clone(v: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Multiplies a vector by another vector (component-wise); assumes a and<br>
     * b have the same length.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of products of entries of a and b.</p>
     */
    function multiply(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Multiplies a vector by another vector (component-wise); assumes a and<br>
     * b have the same length. (same as mul)</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of products of entries of a and b.</p>
     */
    function mul(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Divides a vector by another vector (component-wise); assumes a and<br>
     * b have the same length.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of quotients of entries of a and b.</p>
     */
    function divide(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Divides a vector by another vector (component-wise); assumes a and<br>
     * b have the same length. (same as divide)</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of quotients of entries of a and b.</p>
     */
    function div(a: Vec2, b: Vec2, dst?: Vec2): Vec2;
    /**
     * <p>Creates a random unit vector * scale</p>
     * @param scale - <p>Default 1</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The random vector.</p>
     */
    function random(scale: number, dst?: Vec2): Vec2;
    /**
     * <p>Zero's a vector</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The zeroed vector.</p>
     */
    function zero(dst?: Vec2): Vec2;
    /**
     * <p>transform Vec2 by 4x4 matrix</p>
     * @param v - <p>the vector</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>optional Vec2 to store result. If not passed a new one is created.</p>
     * @returns <p>the transformed vector</p>
     */
    function transformMat4(v: Vec2, m: Mat4, dst?: Vec2): Vec2;
    /**
     * <p>Transforms vec4 by 3x3 matrix</p>
     * @param v - <p>the vector</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>optional Vec2 to store result. If not passed a new one is created.</p>
     * @returns <p>the transformed vector</p>
     */
    function transformMat3(v: Vec2, m: Mat3, dst?: Vec2): Vec2;
    /**
     * <p>Transforms vec4 by 3x3 matrix</p>
     * @param v - <p>the vector</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>optional Vec2 to store result. If not passed a new one is created.</p>
     * @returns <p>the transformed vector</p>
     */
    function transformMat2(v: Vec2, m: Mat2, dst?: Vec2): Vec2;
}

/**
 * <p>Vec3 math functions.</p>
 * <p>Almost all functions take an optional <code>dst</code> argument. If it is not passed in the<br>
 * functions will create a new <code>Vec3</code>. In other words you can do this</p>
 * <pre><code>const v = vec3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
 * </code></pre>
 * <p>or</p>
 * <pre><code>const v = vec3.create();
 * vec3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 * </code></pre>
 * <p>The first style is often easier but depending on where it's used it generates garbage where<br>
 * as there is almost never allocation with the second style.</p>
 * <p>It is always safe to pass any vector as the destination. So for example</p>
 * <pre><code>vec3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1</code></pre>
 */
declare module "vec3" {
    /**
     * <p>A JavaScript array with 3 values, Float32Array with 3 values, or a Float64Array with 3 values.<br>
     * When created by the library will create the default type which is <code>Float32Array</code><br>
     * but can be set by calling {@link vec3.setDefaultType}.</p>
     */
    type Vec3 = number[] | Float32Array | Float64Array;
    /**
     * <p>Sets the type this library creates for a Vec3</p>
     * @param ctor - <p>the constructor for the type. Either <code>Float32Array</code>, 'Float64Array', or <code>Array</code></p>
     * @returns <p>previous constructor for Vec3</p>
     */
    function setDefaultType(ctor: constructor): constructor;
    /**
     * <p>Creates a vec3; may be called with x, y, z to set initial values.</p>
     * @param [x] - <p>Initial x value.</p>
     * @param [y] - <p>Initial y value.</p>
     * @param [z] - <p>Initial z value.</p>
     * @returns <p>the created vector</p>
     */
    function create(x?: number, y?: number, z?: number): Vec3;
    /**
     * <p>Creates a vec3; may be called with x, y, z to set initial values. (same as create)</p>
     * @param [x] - <p>Initial x value.</p>
     * @param [y] - <p>Initial y value.</p>
     * @param [z] - <p>Initial z value.</p>
     * @returns <p>the created vector</p>
     */
    function fromValues(x?: number, y?: number, z?: number): Vec3;
    /**
     * <p>Applies Math.ceil to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the ceil of each element of v.</p>
     */
    function ceil(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Applies Math.floor to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the floor of each element of v.</p>
     */
    function floor(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Applies Math.round to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the round of each element of v.</p>
     */
    function round(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Clamp each element of vector between min and max</p>
     * @param v - <p>Operand vector.</p>
     * @param [max] - <p>Min value, default 0</p>
     * @param [min] - <p>Max value, default 1</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that the clamped value of each element of v.</p>
     */
    function clamp(v: Vec3, max?: number, min?: number, dst?: Vec3): Vec3;
    /**
     * <p>Adds two vectors; assumes a and b have the same dimension.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the sum of a and b.</p>
     */
    function add(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param scale - <p>Amount to scale b</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the sum of a + b * scale.</p>
     */
    function addScaled(a: Vec3, b: Vec3, scale: number, dst?: Vec3): Vec3;
    /**
     * <p>Returns the angle in radians between two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>The angle in radians between the 2 vectors.</p>
     */
    function angle(a: Vec3, b: Vec3): number;
    /**
     * <p>Subtracts two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the difference of a and b.</p>
     */
    function subtract(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Subtracts two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the difference of a and b.</p>
     */
    function sub(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Check if 2 vectors are approximately equal</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>true if vectors are approximately equal</p>
     */
    function equalsApproximately(a: Vec3, b: Vec3): boolean;
    /**
     * <p>Check if 2 vectors are exactly equal</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>true if vectors are exactly equal</p>
     */
    function equals(a: Vec3, b: Vec3): boolean;
    /**
     * <p>Performs linear interpolation on two vectors.<br>
     * Given vectors a and b and interpolation coefficient t, returns<br>
     * a + t * (b - a).</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param t - <p>Interpolation coefficient.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The linear interpolated result.</p>
     */
    function lerp(a: Vec3, b: Vec3, t: number, dst?: Vec3): Vec3;
    /**
     * <p>Performs linear interpolation on two vectors.<br>
     * Given vectors a and b and interpolation coefficient vector t, returns<br>
     * a + t * (b - a).</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param t - <p>Interpolation coefficients vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>the linear interpolated result.</p>
     */
    function lerpV(a: Vec3, b: Vec3, t: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Return max values of two vectors.<br>
     * Given vectors a and b returns<br>
     * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The max components vector.</p>
     */
    function max(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Return min values of two vectors.<br>
     * Given vectors a and b returns<br>
     * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The min components vector.</p>
     */
    function min(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Multiplies a vector by a scalar.</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function mulScalar(v: Vec3, k: number, dst?: Vec3): Vec3;
    /**
     * <p>Multiplies a vector by a scalar. (same as mulScalar)</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function scale(v: Vec3, k: number, dst?: Vec3): Vec3;
    /**
     * <p>Divides a vector by a scalar.</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function divScalar(v: Vec3, k: number, dst?: Vec3): Vec3;
    /**
     * <p>Inverse a vector.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The inverted vector.</p>
     */
    function inverse(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Invert a vector. (same as inverse)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The inverted vector.</p>
     */
    function invert(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Computes the cross product of two vectors; assumes both vectors have<br>
     * three entries.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of a cross b.</p>
     */
    function cross(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Computes the dot product of two vectors; assumes both vectors have<br>
     * three entries.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>dot product</p>
     */
    function dot(a: Vec3, b: Vec3): number;
    /**
     * <p>Computes the length of vector</p>
     * @param v - <p>vector.</p>
     * @returns <p>length of vector.</p>
     */
    function length(v: Vec3): number;
    /**
     * <p>Computes the length of vector (same as length)</p>
     * @param v - <p>vector.</p>
     * @returns <p>length of vector.</p>
     */
    function len(v: Vec3): number;
    /**
     * <p>Computes the square of the length of vector</p>
     * @param v - <p>vector.</p>
     * @returns <p>square of the length of vector.</p>
     */
    function lengthSq(v: Vec3): number;
    /**
     * <p>Computes the square of the length of vector (same as lengthSq)</p>
     * @param v - <p>vector.</p>
     * @returns <p>square of the length of vector.</p>
     */
    function lenSq(v: Vec3): number;
    /**
     * <p>Computes the distance between 2 points</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>distance between a and b</p>
     */
    function distance(a: Vec3, b: Vec3): number;
    /**
     * <p>Computes the distance between 2 points (same as distance)</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>distance between a and b</p>
     */
    function dist(a: Vec3, b: Vec3): number;
    /**
     * <p>Computes the square of the distance between 2 points</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>square of the distance between a and b</p>
     */
    function distanceSq(a: Vec3, b: Vec3): number;
    /**
     * <p>Computes the square of the distance between 2 points (same as distanceSq)</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>square of the distance between a and b</p>
     */
    function distSq(a: Vec3, b: Vec3): number;
    /**
     * <p>Divides a vector by its Euclidean length and returns the quotient.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The normalized vector.</p>
     */
    function normalize(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Negates a vector.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>-v.</p>
     */
    function negate(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Copies a vector. (same as clone)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A copy of v.</p>
     */
    function copy(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Clones a vector. (same as copy)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A copy of v.</p>
     */
    function clone(v: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Multiplies a vector by another vector (component-wise); assumes a and<br>
     * b have the same length.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of products of entries of a and b.</p>
     */
    function multiply(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Multiplies a vector by another vector (component-wise); assumes a and<br>
     * b have the same length. (same as mul)</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of products of entries of a and b.</p>
     */
    function mul(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Divides a vector by another vector (component-wise); assumes a and<br>
     * b have the same length.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of quotients of entries of a and b.</p>
     */
    function divide(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Divides a vector by another vector (component-wise); assumes a and<br>
     * b have the same length. (same as divide)</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of quotients of entries of a and b.</p>
     */
    function div(a: Vec3, b: Vec3, dst?: Vec3): Vec3;
    /**
     * <p>Creates a random vector</p>
     * @param scale - <p>Default 1</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The random vector.</p>
     */
    function random(scale: number, dst?: Vec3): Vec3;
    /**
     * <p>Zero's a vector</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The zeroed vector.</p>
     */
    function zero(dst?: Vec3): Vec3;
    /**
     * <p>transform vec3 by 4x4 matrix</p>
     * @param v - <p>the vector</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>optional vec3 to store result. If not passed a new one is created.</p>
     * @returns <p>the transformed vector</p>
     */
    function transformMat4(v: Vec3, m: Mat4, dst?: Vec3): Vec3;
    /**
     * <p>Transform vec4 by upper 3x3 matrix inside 4x4 matrix.</p>
     * @param v - <p>The direction.</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>optional Vec3 to store result. If not passed a new one is created.</p>
     * @returns <p>The transformed vector.</p>
     */
    function transformMat4Upper3x3(v: Vec3, m: Mat4, dst?: Vec3): Vec3;
    /**
     * <p>Transforms vec4 by 3x3 matrix</p>
     * @param v - <p>the vector</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>optional vec3 to store result. If not passed a new one is created.</p>
     * @returns <p>the transformed vector</p>
     */
    function transformMat3(v: Vec3, m: Mat3, dst?: Vec3): Vec3;
}

/**
 * <p>Vec4 math functions.</p>
 * <p>Almost all functions take an optional <code>dst</code> argument. If it is not passed in the<br>
 * functions will create a new <code>Vec4</code>. In other words you can do this</p>
 * <pre><code>const v = vec4.cross(v1, v2);  // Creates a new Vec4 with the cross product of v1 x v2.
 * </code></pre>
 * <p>or</p>
 * <pre><code>const v = vec4.create();
 * vec4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 * </code></pre>
 * <p>The first style is often easier but depending on where it's used it generates garbage where<br>
 * as there is almost never allocation with the second style.</p>
 * <p>It is always safe to pass any vector as the destination. So for example</p>
 * <pre><code>vec4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1</code></pre>
 */
declare module "vec4" {
    /**
     * <p>A JavaScript array with 4 values, Float32Array with 4 values, or a Float64Array with 4 values.<br>
     * When created by the library will create the default type which is <code>Float32Array</code><br>
     * but can be set by calling {@link vec4.setDefaultType}.</p>
     */
    type Vec4 = number[] | Float32Array | Float64Array;
    /**
     * <p>Sets the type this library creates for a Vec4</p>
     * @param ctor - <p>the constructor for the type. Either <code>Float32Array</code>, 'Float64Array', or <code>Array</code></p>
     * @returns <p>previous constructor for Vec4</p>
     */
    function setDefaultType(ctor: constructor): constructor;
    /**
     * <p>Creates a vec4; may be called with x, y, z to set initial values.</p>
     * @param [x] - <p>Initial x value.</p>
     * @param [y] - <p>Initial y value.</p>
     * @param [z] - <p>Initial z value.</p>
     * @param [w] - <p>Initial w value.</p>
     * @returns <p>the created vector</p>
     */
    function create(x?: number, y?: number, z?: number, w?: number): Vec4;
    /**
     * <p>Creates a vec4; may be called with x, y, z to set initial values. (same as create)</p>
     * @param [x] - <p>Initial x value.</p>
     * @param [y] - <p>Initial y value.</p>
     * @param [z] - <p>Initial z value.</p>
     * @param [z] - <p>Initial w value.</p>
     * @returns <p>the created vector</p>
     */
    function fromValues(x?: number, y?: number, z?: number, z?: number): Vec4;
    /**
     * <p>Applies Math.ceil to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the ceil of each element of v.</p>
     */
    function ceil(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Applies Math.floor to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the floor of each element of v.</p>
     */
    function floor(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Applies Math.round to each element of vector</p>
     * @param v - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the round of each element of v.</p>
     */
    function round(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Clamp each element of vector between min and max</p>
     * @param v - <p>Operand vector.</p>
     * @param [max] - <p>Min value, default 0</p>
     * @param [min] - <p>Max value, default 1</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that the clamped value of each element of v.</p>
     */
    function clamp(v: Vec4, max?: number, min?: number, dst?: Vec4): Vec4;
    /**
     * <p>Adds two vectors; assumes a and b have the same dimension.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the sum of a and b.</p>
     */
    function add(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param scale - <p>Amount to scale b</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the sum of a + b * scale.</p>
     */
    function addScaled(a: Vec4, b: Vec4, scale: number, dst?: Vec4): Vec4;
    /**
     * <p>Subtracts two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the difference of a and b.</p>
     */
    function subtract(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Subtracts two vectors.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A vector that is the difference of a and b.</p>
     */
    function sub(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Check if 2 vectors are approximately equal</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>true if vectors are approximately equal</p>
     */
    function equalsApproximately(a: Vec4, b: Vec4): boolean;
    /**
     * <p>Check if 2 vectors are exactly equal</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>true if vectors are exactly equal</p>
     */
    function equals(a: Vec4, b: Vec4): boolean;
    /**
     * <p>Performs linear interpolation on two vectors.<br>
     * Given vectors a and b and interpolation coefficient t, returns<br>
     * a + t * (b - a).</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param t - <p>Interpolation coefficient.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The linear interpolated result.</p>
     */
    function lerp(a: Vec4, b: Vec4, t: number, dst?: Vec4): Vec4;
    /**
     * <p>Performs linear interpolation on two vectors.<br>
     * Given vectors a and b and interpolation coefficient vector t, returns<br>
     * a + t * (b - a).</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param t - <p>Interpolation coefficients vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>the linear interpolated result.</p>
     */
    function lerpV(a: Vec4, b: Vec4, t: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Return max values of two vectors.<br>
     * Given vectors a and b returns<br>
     * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The max components vector.</p>
     */
    function max(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Return min values of two vectors.<br>
     * Given vectors a and b returns<br>
     * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The min components vector.</p>
     */
    function min(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Multiplies a vector by a scalar.</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function mulScalar(v: Vec4, k: number, dst?: Vec4): Vec4;
    /**
     * <p>Multiplies a vector by a scalar. (same as mulScalar)</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function scale(v: Vec4, k: number, dst?: Vec4): Vec4;
    /**
     * <p>Divides a vector by a scalar.</p>
     * @param v - <p>The vector.</p>
     * @param k - <p>The scalar.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The scaled vector.</p>
     */
    function divScalar(v: Vec4, k: number, dst?: Vec4): Vec4;
    /**
     * <p>Inverse a vector.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The inverted vector.</p>
     */
    function inverse(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Invert a vector. (same as inverse)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The inverted vector.</p>
     */
    function invert(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Computes the dot product of two vectors; assumes both vectors have<br>
     * three entries.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @returns <p>dot product</p>
     */
    function dot(a: Vec4, b: Vec4): number;
    /**
     * <p>Computes the length of vector</p>
     * @param v - <p>vector.</p>
     * @returns <p>length of vector.</p>
     */
    function length(v: Vec4): number;
    /**
     * <p>Computes the length of vector (same as length)</p>
     * @param v - <p>vector.</p>
     * @returns <p>length of vector.</p>
     */
    function len(v: Vec4): number;
    /**
     * <p>Computes the square of the length of vector</p>
     * @param v - <p>vector.</p>
     * @returns <p>square of the length of vector.</p>
     */
    function lengthSq(v: Vec4): number;
    /**
     * <p>Computes the square of the length of vector (same as lengthSq)</p>
     * @param v - <p>vector.</p>
     * @returns <p>square of the length of vector.</p>
     */
    function lenSq(v: Vec4): number;
    /**
     * <p>Computes the distance between 2 points</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>distance between a and b</p>
     */
    function distance(a: Vec4, b: Vec4): number;
    /**
     * <p>Computes the distance between 2 points (same as distance)</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>distance between a and b</p>
     */
    function dist(a: Vec4, b: Vec4): number;
    /**
     * <p>Computes the square of the distance between 2 points</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>square of the distance between a and b</p>
     */
    function distanceSq(a: Vec4, b: Vec4): number;
    /**
     * <p>Computes the square of the distance between 2 points (same as distanceSq)</p>
     * @param a - <p>vector.</p>
     * @param b - <p>vector.</p>
     * @returns <p>square of the distance between a and b</p>
     */
    function distSq(a: Vec4, b: Vec4): number;
    /**
     * <p>Divides a vector by its Euclidean length and returns the quotient.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The normalized vector.</p>
     */
    function normalize(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Negates a vector.</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>-v.</p>
     */
    function negate(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Copies a vector. (same as clone)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A copy of v.</p>
     */
    function copy(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Clones a vector. (same as copy)</p>
     * @param v - <p>The vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>A copy of v.</p>
     */
    function clone(v: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Multiplies a vector by another vector (component-wise); assumes a and<br>
     * b have the same length.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of products of entries of a and b.</p>
     */
    function multiply(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Multiplies a vector by another vector (component-wise); assumes a and<br>
     * b have the same length. (same as mul)</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of products of entries of a and b.</p>
     */
    function mul(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Divides a vector by another vector (component-wise); assumes a and<br>
     * b have the same length.</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of quotients of entries of a and b.</p>
     */
    function divide(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Divides a vector by another vector (component-wise); assumes a and<br>
     * b have the same length. (same as divide)</p>
     * @param a - <p>Operand vector.</p>
     * @param b - <p>Operand vector.</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The vector of quotients of entries of a and b.</p>
     */
    function div(a: Vec4, b: Vec4, dst?: Vec4): Vec4;
    /**
     * <p>Zero's a vector</p>
     * @param [dst] - <p>vector to hold result. If not new one is created.</p>
     * @returns <p>The zeroed vector.</p>
     */
    function zero(dst?: Vec4): Vec4;
    /**
     * <p>transform vec4 by 4x4 matrix</p>
     * @param v - <p>the vector</p>
     * @param m - <p>The matrix.</p>
     * @param [dst] - <p>optional vec4 to store result. If not passed a new one is created.</p>
     * @returns <p>the transformed vector</p>
     */
    function transformMat4(v: Vec4, m: Mat4, dst?: Vec4): Vec4;
}

/**
 * <p>Sets the type this library creates for all types</p>
 * @param ctor - <p>the constructor for the type. Either <code>Float32Array</code>, 'Float64Array', or <code>Array</code></p>
 */
declare function setDefaultType(ctor: constructor): void;

