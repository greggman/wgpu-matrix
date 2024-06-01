import { BaseArgType } from "./types";
/**
 * A JavaScript array with 4 values, a Float32Array with 4 values, or a Float64Array with 4 values.
 */
export type Vec4Arg = BaseArgType;
/**
 * A specific concrete 4 element vector.
 */
export type Vec4Type<T extends Vec4Arg> = T;
