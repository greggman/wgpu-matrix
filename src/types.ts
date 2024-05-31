/**
 * The types you can pass to most functions that take an
 * array of numbers.
 */
export type BaseArgType = Float32Array | Float64Array | number[];

function wrapConstructor<T extends new(...args: any[]) => any>(
  OriginalConstructor: T,
  modifier: (instance: InstanceType<T>) => void
): T {
  return class extends OriginalConstructor {
    constructor(...args: any[]) {
      super(...args);
      modifier(this as InstanceType<T>);
    }
  } as T; // Type assertion is necessary here
}

export const ZeroArray = wrapConstructor(Array<number>, a => a.fill(0));

