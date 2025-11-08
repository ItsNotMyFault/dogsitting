type IsFunction<T> = T extends (...args: any[]) => any ? true : false;
type IsArray<T> = T extends Array<any> ? true : false;
type IsPlainObject<T> = T extends object
  ? IsFunction<T> extends true
    ? false
    : IsArray<T> extends true
      ? false
      : true
  : false;

type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: IsFunction<T[K]> extends true
    ? never
    : IsPlainObject<T[K]> extends true
      ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
      : T[K] extends Array<infer U>
        ? U extends object
          ? `${K}` | `${K}.${keyof U & string}`
          : `${K}`
        : `${K}`;
}[keyof T & (string | number)];

export type { NestedKeyOf };
