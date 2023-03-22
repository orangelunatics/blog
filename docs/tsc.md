## TypeScript Chanllenge

### 中等题
1. Pick
```ts
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}
```
2. Omit
```ts
type MyOmit<T, K> = {
  [key in keyof T as key extends K ? never : key]: T[key]
}
```
3. ReturnType
```ts
type MyReturnType<T extends Function> = T extends (...args: any) => infer R ? R : never
```
4. Readonly
```ts
// readonly泛型
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key]
}
// 指定属性
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>
```