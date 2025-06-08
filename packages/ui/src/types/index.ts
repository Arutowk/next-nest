export type NonNullObject<O extends Record<string, unknown>> = {
  [K in keyof O]: NonNullable<O[K]>;
};

// 获取所有类型为 T | null 的键
type NullableKeys<T> = {
  [K in keyof T]: T[K] extends infer U | null
    ? null extends T[K]
      ? K
      : never
    : never;
}[keyof T];

// 将指定键转换为可选属性
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 主转换类型
export type TransformNullableToOptional<T> =
  MakeOptional<T, NullableKeys<T>> extends infer O
    ? { [K in keyof O]: O[K] extends infer U | null ? U : O[K] }
    : never;
