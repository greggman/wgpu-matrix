import { BaseArgType } from "./types";
/**
 * A JavaScript array with 2 values, a Float32Array with 2 values, or a Float64Array with 2 values.
 */
export type Vec2Arg = BaseArgType;
/**
 * A specific concrete 2 element vector.
 */
export type Vec2Type<T extends Vec2Arg> = T;
