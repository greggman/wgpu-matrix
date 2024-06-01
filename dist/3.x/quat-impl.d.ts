import { QuatArg, QuatType } from './quat';
import { BaseArgType } from './types';
export { QuatArg, QuatType };
type QuatCtor<T extends QuatArg = Float32Array> = new (n: number) => T;
export type RotationOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx';
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
export declare function getAPI<T extends QuatArg = Float32Array>(Ctor: QuatCtor<T>): {
    create: (x?: number | undefined, y?: number | undefined, z?: number | undefined, w?: number | undefined) => T;
    fromValues: (x?: number | undefined, y?: number | undefined, z?: number | undefined, w?: number | undefined) => T;
    set: <T_1 extends BaseArgType = T>(x: number, y: number, z: number, w: number, dst?: T_1 | undefined) => T_1;
    fromAxisAngle: <T_2 extends BaseArgType = T>(axis: BaseArgType, angleInRadians: number, dst?: T_2 | undefined) => T_2;
    toAxisAngle: <T_3 extends BaseArgType = T>(q: BaseArgType, dst?: T_3 | undefined) => {
        angle: number;
        axis: T_3;
    };
    angle: (a: BaseArgType, b: BaseArgType) => number;
    multiply: <T_4 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_4 | undefined) => T_4;
    mul: <T_4 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_4 | undefined) => T_4;
    rotateX: <T_5 extends BaseArgType = T>(q: BaseArgType, angleInRadians: number, dst?: T_5 | undefined) => T_5;
    rotateY: <T_6 extends BaseArgType = T>(q: BaseArgType, angleInRadians: number, dst?: T_6 | undefined) => T_6;
    rotateZ: <T_7 extends BaseArgType = T>(q: BaseArgType, angleInRadians: number, dst?: T_7 | undefined) => T_7;
    slerp: <T_8 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, t: number, dst?: T_8 | undefined) => T_8;
    inverse: <T_9 extends BaseArgType = T>(q: BaseArgType, dst?: T_9 | undefined) => T_9;
    conjugate: <T_10 extends BaseArgType = T>(q: BaseArgType, dst?: T_10 | undefined) => T_10;
    fromMat: <T_11 extends BaseArgType = T>(m: BaseArgType, dst?: T_11 | undefined) => T_11;
    fromEuler: <T_12 extends BaseArgType = T>(xAngleInRadians: number, yAngleInRadians: number, zAngleInRadians: number, order: RotationOrder, dst?: T_12 | undefined) => T_12;
    copy: <T_13 extends BaseArgType = T>(q: BaseArgType, dst?: T_13 | undefined) => T_13;
    clone: <T_13 extends BaseArgType = T>(q: BaseArgType, dst?: T_13 | undefined) => T_13;
    add: <T_14 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_14 | undefined) => T_14;
    subtract: <T_15 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_15 | undefined) => T_15;
    sub: <T_15 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, dst?: T_15 | undefined) => T_15;
    mulScalar: <T_16 extends BaseArgType = T>(v: BaseArgType, k: number, dst?: T_16 | undefined) => T_16;
    scale: <T_16 extends BaseArgType = T>(v: BaseArgType, k: number, dst?: T_16 | undefined) => T_16;
    divScalar: <T_17 extends BaseArgType = T>(v: BaseArgType, k: number, dst?: T_17 | undefined) => T_17;
    dot: (a: BaseArgType, b: BaseArgType) => number;
    lerp: <T_18 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, t: number, dst?: T_18 | undefined) => T_18;
    length: (v: BaseArgType) => number;
    len: (v: BaseArgType) => number;
    lengthSq: (v: BaseArgType) => number;
    lenSq: (v: BaseArgType) => number;
    normalize: <T_19 extends BaseArgType = T>(v: BaseArgType, dst?: T_19 | undefined) => T_19;
    equalsApproximately: (a: BaseArgType, b: BaseArgType) => boolean;
    equals: (a: BaseArgType, b: BaseArgType) => boolean;
    identity: <T_20 extends BaseArgType = T>(dst?: T_20 | undefined) => T_20;
    rotationTo: <T_21 extends BaseArgType = T>(aUnit: BaseArgType, bUnit: BaseArgType, dst?: T_21 | undefined) => T_21;
    sqlerp: <T_22 extends BaseArgType = T>(a: BaseArgType, b: BaseArgType, c: BaseArgType, d: BaseArgType, t: number, dst?: T_22 | undefined) => T_22;
};
