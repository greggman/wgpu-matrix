import { BaseArgType } from "./types";
/**
 * A JavaScript array with 16 values, a Float32Array with 16 values, or a Float64Array with 16 values.
 */
export type Mat4Arg = BaseArgType;
/**
 * A specific concrete 4x4 Matrix Type
 */
export type Mat4Type<T extends Mat4Arg> = T;
