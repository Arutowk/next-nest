export type NonNullObject<O extends Record<string, unknown>> = {
  [K in keyof O]: NonNullable<O[K]>;
};
