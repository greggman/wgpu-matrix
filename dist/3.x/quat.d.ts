import { BaseArgType } from "./types";
/**
 * A JavaScript array with 4 values, a Float32Array with 4 values, or a Float64Array with 4 values.
 */
export type QuatArg = BaseArgType;
/**
 * A specific concrete 4x4 Matrix Type
 */
export type QuatType<T extends QuatArg> = T;
