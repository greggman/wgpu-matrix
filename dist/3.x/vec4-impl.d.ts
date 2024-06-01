import { Vec4Arg, Vec4Type } from './vec4';
import { Mat4Arg } from './mat4';
import { BaseArgType } from './types';
export { Vec4Arg, Vec4Type };
type Vec4Ctor<T extends Vec4Arg = Float32Array> = new (n: number) => T;
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
export declare function getAPI<T extends Mat4Arg = Float32Array>(Ctor: Vec4Ctor<T>): {
    create: (x?: number | undefined, y?: number | undefined, z?: number | undefined, w?: number | undefined) => T;
    fromValues: (x?: number | undefined, y?: number | undefined, z?: number | undefined, w?: number | undefined) => T;
    set: <T_1 extends BaseArgType = T>(x: number, y: number, z: number, w: number, dst?: T_1 | undefined) => T_1;
    ceil: <T_2 extends BaseArgType = T>(v: BaseArgType, dst?: T_2 | undefined) => T_2;
    floor: <T_3 extends BaseArgType = T>(v: BaseArgType, dst?: T_3 | undefined) => T_3;
    round: <T_4 extends BaseArgType = T>(v: BaseArgType, dst?: T_4 | undefined) => T_4;
    clamp: <T_5 extends BaseArgType = T>(v: BaseArgType, min?: number, max?: number, dst?: T_5 | undefined) => T_5;
    add: <T_6 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_6 | undefined) => T_6;
    addScaled: <T_7 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, scale: number, dst?: T_7 | undefined) => T_7;
    subtract: <T_8 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_8 | undefined) => T_8;
    sub: <T_8 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_8 | undefined) => T_8;
    equalsApproximately: (a: BaseArgType, b: BaseArgType) => boolean;
    equals: (a: BaseArgType, b: BaseArgType) => boolean;
    lerp: <T_9 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, t: number, dst?: T_9 | undefined) => T_9;
    lerpV: <T_10 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, t: BaseArgType, dst?: T_10 | undefined) => T_10;
    max: <T_11 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_11 | undefined) => T_11;
    min: <T_12 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_12 | undefined) => T_12;
    mulScalar: <T_13 extends BaseArgType = T>(v: BaseArgType, k: number, dst?: T_13 | undefined) => T_13;
    scale: <T_13 extends BaseArgType = T>(v: BaseArgType, k: number, dst?: T_13 | undefined) => T_13;
    divScalar: <T_14 extends BaseArgType = T>(v: BaseArgType, k: number, dst?: T_14 | undefined) => T_14;
    inverse: <T_15 extends BaseArgType = T>(v: BaseArgType, dst?: T_15 | undefined) => T_15;
    invert: <T_15 extends BaseArgType = T>(v: BaseArgType, dst?: T_15 | undefined) => T_15;
    dot: (a: BaseArgType, b: BaseArgType) => number;
    length: (v: BaseArgType) => number;
    len: (v: BaseArgType) => number;
    lengthSq: (v: BaseArgType) => number;
    lenSq: (v: BaseArgType) => number;
    distance: (a: BaseArgType, b: BaseArgType) => number;
    dist: (a: BaseArgType, b: BaseArgType) => number;
    distanceSq: (a: BaseArgType, b: BaseArgType) => number;
    distSq: (a: BaseArgType, b: BaseArgType) => number;
    normalize: <T_16 extends BaseArgType = T>(v: BaseArgType, dst?: T_16 | undefined) => T_16;
    negate: <T_17 extends BaseArgType = T>(v: BaseArgType, dst?: T_17 | undefined) => T_17;
    copy: <T_18 extends BaseArgType = T>(v: BaseArgType, dst?: T_18 | undefined) => T_18;
    clone: <T_18 extends BaseArgType = T>(v: BaseArgType, dst?: T_18 | undefined) => T_18;
    multiply: <T_19 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_19 | undefined) => T_19;
    mul: <T_19 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_19 | undefined) => T_19;
    divide: <T_20 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_20 | undefined) => T_20;
    div: <T_20 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_20 | undefined) => T_20;
    zero: <T_21 extends BaseArgType = T>(dst?: T_21 | undefined) => T_21;
    transformMat4: <T_22 extends BaseArgType = T>(v: BaseArgType, m: BaseArgType, dst?: T_22 | undefined) => T_22;
    setLength: <T_23 extends BaseArgType = T>(a: BaseArgType, len: number, dst?: T_23 | undefined) => T_23;
    truncate: <T_24 extends BaseArgType = T>(a: BaseArgType, maxLen: number, dst?: T_24 | undefined) => T_24;
    midpoint: <T_25 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_25 | undefined) => T_25;
};
