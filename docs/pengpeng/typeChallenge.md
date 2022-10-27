# TypeScript Challenge

[TypeScript 体操类型训练](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md)

## Easy Type

## Middle Type

### 1.获取函数返回类型

#### extends

1. 接口继承

```js
interface T1 {
  name: string;
}

interface T2 {
  age: number;
}

interface T3 extends T1, T2 {
  sex: number;
}

const t3: T3 = {
  name: "xiaoming",
  age: 17,
  sex: 1,
};
```

T3 使用 extends 的方式多重继承了 T1 和 T2 的属性

2. 条件判断

```js
interface Animal {
  eat(): void;
}

interface Dog extends Animal {
  bit(): void;
}
// A的类型为string
type A = Dog extends Animal ? string : number
const a: A = 'i am string'
```

extends 用来条件判断的语法和 js 的三元表达式类似，那么判断条件的逻辑是什么？
如果 extends 前面的类型能够赋值给 extends 后面的类型，也就是前者的类型是后者类型的子集，那么则判断为 true。Dog 是 Animal 的子类，父类比子类的限制更少，能满足子类，则一定能满足父类，因此 Dog 类型的值可以赋值给 Animal 类型的。

#### Infer

推导泛型参数。
infer 可以在 extends 的条件语句中推断待推断的类型。
可以通过一个例子去认识 infer。

```js
type numberPromise = Promise<number>
type n = numberPromise extend Promise<infer P> ? P : never; // number

```

在 Promise 输入了 number 获得一个新的类型 numberPromise，那么 infer 就可以通过已知的类型和获得这个类型的泛型来反推出泛型参数。
值得注意的是，infer 仅仅是做推导，而非映射。

怎么获得函数参数的类型？

```js
type getParamsType<T> = T extends (a: infer P, b: infer P) => void ? P : never
type ParamsType = getParamsType<(a: string, b: number) => void>  // string & number
```

T 为 getParamsType 的入参类型，根据 extends 的条件判断，如果 T 这个类型值为 extends 右侧方法的子类型，则我们就可以根据右侧方法中的 infer 占位来推导这个占位的类型
但这个例子里 infer 并不在泛型内，为什么可以使用 infer 来推导类型呢？我们可以改写一下

```js
type F<T> = (a: T, b: T) => void;
type getParamsType<T> = T extends F<infer P> ? P : never
```

infer P 填入 T 处，infer 就可以推导泛型的类型了

回到这道题，如何手写出 MyRetureType

```js
type MyReturnType<T> = T extends (...args: any[]) => infer P ? P : any

// 改写
type F<T> = (...args: any[]) => T;
type MyReturnType<T> = T extends F<infer P> ? P : any
```

## Hard Type
