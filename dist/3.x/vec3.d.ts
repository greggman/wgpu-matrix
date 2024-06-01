import { BaseArgType } from "./types";
/**
 * A JavaScript array with 3 values, a Float32Array with 3 values, or a Float64Array with 3 values.
 */
export type Vec3Arg = BaseArgType;
/**
 * A specific concrete 3 element vector.
 */
export type Vec3Type<T extends Vec3Arg> = T;
