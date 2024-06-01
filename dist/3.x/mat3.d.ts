import { BaseArgType } from "./types";
/**
 * A JavaScript array with 12 values, a Float32Array with 12 values, or a Float64Array with 12 values.
 */
export type Mat3Arg = BaseArgType;
/**
 * A specific concrete 3x3 element vector.
 */
export type Mat3Type<T extends Mat3Arg> = T;
