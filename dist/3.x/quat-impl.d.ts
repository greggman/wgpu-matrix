import { QuatArg, QuatType } from './quat';
import { Mat3Arg } from './mat3.js';
import { Mat4Arg } from './mat4.js';
import { Vec3Arg } from './vec3.js';
import { BaseArgType } from './types';
export { QuatArg, QuatType };
type QuatCtor<T extends QuatArg = Float32Array> = new (n: number) => T;
export type RotationOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx';
/**
 * Generates am typed API for Qud
 * */
declare function getAPIImpl<QuatType extends QuatArg = Float32Array>(Ctor: QuatCtor<QuatType>): {
    create: (x?: number, y?: number, z?: number, w?: number) => QuatType;
    fromValues: (x?: number, y?: number, z?: number, w?: number) => QuatType;
    set: <T extends QuatArg = QuatType>(x: number, y: number, z: number, w: number, dst?: T) => T;
    fromAxisAngle: <T extends QuatArg = QuatType>(axis: Vec3Arg, angleInRadians: number, dst?: T) => T;
    toAxisAngle: <T extends Vec3Arg = QuatType>(q: QuatArg, dst?: T) => {
        angle: number;
        axis: T;
    };
    angle: (a: QuatArg, b: QuatArg) => number;
    multiply: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) => T;
    mul: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) => T;
    rotateX: <T extends QuatArg = QuatType>(q: QuatArg, angleInRadians: number, dst?: T) => T;
    rotateY: <T extends QuatArg = QuatType>(q: QuatArg, angleInRadians: number, dst?: T) => T;
    rotateZ: <T extends QuatArg = QuatType>(q: QuatArg, angleInRadians: number, dst?: T) => T;
    slerp: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, t: number, dst?: T) => T;
    inverse: <T extends QuatArg = QuatType>(q: QuatArg, dst?: T) => T;
    conjugate: <T extends QuatArg = QuatType>(q: QuatArg, dst?: T) => T;
    fromMat: <T extends QuatArg = QuatType>(m: Mat3Arg | Mat4Arg, dst?: T) => T;
    fromEuler: <T extends QuatArg = QuatType>(xAngleInRadians: number, yAngleInRadians: number, zAngleInRadians: number, order: RotationOrder, dst?: T) => T;
    copy: <T extends QuatArg = QuatType>(q: QuatArg, dst?: T) => T;
    clone: <T extends QuatArg = QuatType>(q: QuatArg, dst?: T) => T;
    add: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) => T;
    subtract: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) => T;
    sub: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, dst?: T) => T;
    mulScalar: <T extends QuatArg = QuatType>(v: QuatArg, k: number, dst?: T) => T;
    scale: <T extends QuatArg = QuatType>(v: QuatArg, k: number, dst?: T) => T;
    divScalar: <T extends QuatArg = QuatType>(v: QuatArg, k: number, dst?: T) => T;
    dot: (a: QuatArg, b: QuatArg) => number;
    lerp: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, t: number, dst?: T) => T;
    length: (v: QuatArg) => number;
    len: (v: QuatArg) => number;
    lengthSq: (v: QuatArg) => number;
    lenSq: (v: QuatArg) => number;
    normalize: <T extends QuatArg = QuatType>(v: QuatArg, dst?: T) => T;
    equalsApproximately: (a: QuatArg, b: QuatArg) => boolean;
    equals: (a: QuatArg, b: QuatArg) => boolean;
    identity: <T extends QuatArg = QuatType>(dst?: T) => T;
    rotationTo: <T extends QuatArg = QuatType>(aUnit: Vec3Arg, bUnit: Vec3Arg, dst?: T) => T;
    sqlerp: <T extends QuatArg = QuatType>(a: QuatArg, b: QuatArg, c: QuatArg, d: QuatArg, t: number, dst?: T) => T;
};
type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;
/**
 *
 * Quat4 math functions.
 *
 * Almost all functions take an optional `newDst` argument. If it is not passed in the
 * functions will create a new `Quat4`. In other words you can do this
 *
 *     const v = quat4.cross(v1, v2);  // Creates a new Quat4 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = quat4.create();
 *     quat4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     quat4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
export declare function getAPI<T extends QuatArg = Float32Array>(Ctor: QuatCtor<T>): API<T>;
