import { Vec4Arg, Vec4Type } from './vec4';
import { Mat4Arg } from './mat4';
import { BaseArgType } from './types';
export { Vec4Arg, Vec4Type };
type Vec4Ctor<T extends Vec4Arg = Float32Array> = new (n: number) => T;
/**
 * Generates am typed API for Vec4
 * */
declare function getAPIImpl<VecType extends Vec4Arg = Float32Array>(Ctor: Vec4Ctor<VecType>): {
    create: (x?: number, y?: number, z?: number, w?: number) => VecType;
    fromValues: (x?: number, y?: number, z?: number, w?: number) => VecType;
    set: <T extends Vec4Arg = VecType>(x: number, y: number, z: number, w: number, dst?: T) => T;
    ceil: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    floor: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    round: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    clamp: <T extends Vec4Arg = VecType>(v: Vec4Arg, min?: number, max?: number, dst?: T) => T;
    add: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    addScaled: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, scale: number, dst?: T) => T;
    subtract: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    sub: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    equalsApproximately: (a: Vec4Arg, b: Vec4Arg) => boolean;
    equals: (a: Vec4Arg, b: Vec4Arg) => boolean;
    lerp: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, t: number, dst?: T) => T;
    lerpV: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, t: Vec4Arg, dst?: T) => T;
    max: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    min: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    mulScalar: <T extends Vec4Arg = VecType>(v: Vec4Arg, k: number, dst?: T) => T;
    scale: <T extends Vec4Arg = VecType>(v: Vec4Arg, k: number, dst?: T) => T;
    divScalar: <T extends Vec4Arg = VecType>(v: Vec4Arg, k: number, dst?: T) => T;
    inverse: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    invert: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    dot: (a: Vec4Arg, b: Vec4Arg) => number;
    length: (v: Vec4Arg) => number;
    len: (v: Vec4Arg) => number;
    lengthSq: (v: Vec4Arg) => number;
    lenSq: (v: Vec4Arg) => number;
    distance: (a: Vec4Arg, b: Vec4Arg) => number;
    dist: (a: Vec4Arg, b: Vec4Arg) => number;
    distanceSq: (a: Vec4Arg, b: Vec4Arg) => number;
    distSq: (a: Vec4Arg, b: Vec4Arg) => number;
    normalize: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    negate: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    copy: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    clone: <T extends Vec4Arg = VecType>(v: Vec4Arg, dst?: T) => T;
    multiply: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    mul: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    divide: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    div: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
    zero: <T extends Vec4Arg = VecType>(dst?: T) => T;
    transformMat4: <T extends Vec4Arg = VecType>(v: Vec4Arg, m: Mat4Arg, dst?: T) => T;
    setLength: <T extends Vec4Arg = VecType>(a: Vec4Arg, len: number, dst?: T) => T;
    truncate: <T extends Vec4Arg = VecType>(a: Vec4Arg, maxLen: number, dst?: T) => T;
    midpoint: <T extends Vec4Arg = VecType>(a: Vec4Arg, b: Vec4Arg, dst?: T) => T;
};
type API<T extends BaseArgType = Float32Array> = ReturnType<typeof getAPIImpl<T>>;
/**
 *
 * Vec4 math functions.
 *
 * Almost all functions take an optional `newDst` argument. If it is not passed in the
 * functions will create a new `Vec4`. In other words you can do this
 *
 *     const v = vec4.cross(v1, v2);  // Creates a new Vec4 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = vec4.create();
 *     vec4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     vec4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
export declare function getAPI<T extends Mat4Arg = Float32Array>(Ctor: Vec4Ctor<T>): API<T>;
