## 手写 JS 数组原型方法

### map

```javascript
Array.prototype.map = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×');
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr[i] = fn.call(thisArg, arr[i], i, this);
  }
  return newArr;
};
```

### find

```javascript
Array.prototype.find = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×');
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i, this)) return this[i];
  }
  return undefined;
};
```

### some

如果用一个空数组进行测试，在任何情况下它返回的都是 false。

```javascript
Array.prototype.some = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×');
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i, this)) return true;
  }
  return false;
};
```

### every

若收到一个空数组，此方法在一切情况下都会返回 true。  
思路同上

### filter

```javascript
Array.prototype.filter = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×');
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, arr[i], i, this)) newArr.push(arr[i]);
  }
  return newArr;
};
```

### reduce/reduceRight(从右往左)

```javascript
Array.prototype.reduce = function(fn, start) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('');
  let result = start ? start : this.splice(0, 1)[0]; //没有初始值的时候缩短遍历次数
  for (let i = 0; i < this.length; i++) {
    result = fn(result, this[i], i, this);
  }
  return result;
};
```

从 MDN 的表格可以看出  
reduce 是这样的,如果第二个参数也就是初始值如果不给的话,那么遍历的次数就是数组的长度-1  
而且第一遍历是从第二项开始,也就是索引 1 开始 默认索引 0 的回调结果就是 索引 0 的值  
如果给了 redece 的第二个参数是数组的长度,并且 cb 的第一个参数一开始就是 reduce 的第二个参数

## Promise

### 构造函数方法

```js
// 1、Promise.resolve
Promise.resolve = (val) => {
  return new Promise((resolve, reject) => {
    if (val instanceof Promise) {
      val.then(
        (res) => resolve(res),
        (err) => reject(err),
      );
    } else resolve(val);
  });
};
// 2、Promise.reject
Promise.reject = (val) => {
  return new Promise((resolve, reject) => {
    reject(val);
  });
};
// 3、Promise.all
Promise.all = (iterable) => {
  if (typeof iterable[Symbol.iterator] !== 'function') throw new Error('not iterator');
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) resolve([]);
    const arr = [];
    let count = 0;
    for (let i = 0; i < iterable.length; i++) {
      Promise.resolve(iterable[i]).then(
        (res) => {
          count++;
          arr[i] = res;
          if (count === iterable.length) resolve(arr);
        },
        (err) => reject(err),
      );
    }
  });
};
// 4、Promise.race
Promise.race = function(iterable) {
  if (typeof iterable[Symbol.iterator] !== 'function') throw new TypeError('');
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < iterable.length; i++) {
      Promise.resolve(iterable[i]).then(resolve, reject);
    }
  });
};

// 5、Promise.allSettled
Promise.allSettled = (iterable) => {
  if (typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError();
  }
  return new Promise((resolve, reject) => {
    const res = []; // 结果数组
    let count = 0;
    // forEach的话 则对类数组不可以用  改为for比较好  但对set map又不可以用
    iterable.forEach((item, index) => {
      // Promise.resolve可以接受成功的或者失败的promise并返回成功或失败 ！！
      Promise.resolve(item).then(
        (value) => {
          count++;
          res[index] = {
            status: 'fulfilled',
            value,
          };
          if (count === iterable.length) resolve(res);
        },
        (reason) => {
          count++;
          res[index] = {
            status: 'rejected',
            reason,
          };
          if (count === iterable.length) resolve(res);
        },
      );
    });
  });
};
```

### Promise 构造函数

## JS 动画

早期用定时器实现，更好的办法是使用 requesttAnimationFrame(cb)，是 H5 的 API。  
主要思想：让执行 cb 的频率和屏幕刷新率保持一致，而不是通过定时器的时间进行控制，这样不会丢帧。  
此外，可以利用此 API 的特性进行**节流**。

<!-- ## JS 六种异步方案

[参考 1](https://juejin.cn/post/6844903760280420366)
[参考 2](https://zhuanlan.zhihu.com/p/19750470?columnSlug=thefrontendperiodicals) -->

## 函数

1、普通函数执行时发生了什么？  
① 形成一个全新的私有上下文 EC，有一个私有变量对象 AO(?)  
② 初始作用域链、初始 this、初始 arguments、形参赋值、变量提升。  
③ 代码执行。  
④ 出栈释放和不释放(闭包)。

2、箭头函数执行：  
① 形成一个全新的私有上下文 EC，有一个私有变量对象 AO  
② 初始作用域链、形参赋值、变量提升。  
③ 代码执行。  
④ 出栈释放和不释放(闭包)。  
区别：写法、this、arguments、没有 prototype(不允许被 new)  
箭头函数的 this 指向所在上下文的 this，或者说父级的 this

3、类数组(如 arguments)变成数组：  
①、扩展运算符  
②、Array.from(arguments)  
③、Array.prototype.slice.call(arguments)  
其实这样也行: [].slice.call(arguments)  
原因从 slice 源码可以看出，利用了 arguments 可以索引。  
类数组（array-like）有: Strings 字符串对象、Nodelist、arguments(所有实参，有 callee 属性指向该函数)、typedArray(webgl 使用，一个 TypedArray 对象描述了底层二进制数据缓冲区的类数组视图)  
arguments 对应所有实参，args 是没有形参对应的实参，fn.length 是形参个数

```js
Array.from('abc');
// ["a", "b", "c"]
```

```javascript
const slice = (arr, begin, end) => {
  if (begin < 0) {
    begin = arr.length + begin;
  } else if (begin === undefined) {
    begin = 0;
  } else if (begin >= arr.length) {
    return [];
  }
  if (end < 0) {
    end = arr.length + end;
  } else if (end === undefined || end > arr.length) {
    end = arr.length;
  }
  const newArr = [];
  for (let i = begin; i < end; i++) {
    newArr[i - begin] = arr[i];
  }
  return newArr;
};
const assertEqual = (arr1, arr2) => {
  return arr1.toString() === arr2.toString();
};
```

其实类数组就是鸭子类型，既然数组可以，那么让类数组也可以，也就是借用。比如[].forEach.call(argumets,...)

4、各种循环(for、while、forEach、for of、for in)  
性能由快到慢(v8)：for ≈ while > forEach ≈ for of > for in(要遍历原型链)

5、块级作用域练习题  
~~块级上下文产生的原因：在除了函数和对象的大括号中，出现 let、const、function 则会产生块级上下文。~~

```javascript
{
  function foo() {}
  foo = 1;
}
console.log(foo); //输出foo函数体
// 函数具有特殊性，全局中会进行foo的声明所以不报错，
// 而在块级作用域内，进行了foo的声明和定义。从而改变了全局的foo。如果在前面log，则会undefined。
```

6、闭包(较规范的定义)  
在 JavaScript 中，根据词法作⽤域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调⽤一个外部函数返回⼀个内部函数后，即使该外部函数已经执⾏结束了，但是内部函数引⽤外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。⽐如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。

```js
function f1() {
  var n = 999;

  function f2() {
    return n;
  }

  return f2;
}

var result = f1();

console.log(result()); // 999
```

## 栈堆问题

本质是时间和空间的交换问题

- 引用数据类型占据空间大、大小不固定，如果存储在栈中，将影响程序的运行性能。

## TypeScript

1、TS 是以 JS 为基础构建的语言，是 JS 的超集(相当于 JS pro)，扩展了 JS 并添加了类型，可以在任何支持 JS 的平台中执行。但 TS 不能被 JS 解析器直接执行，需要编译为 JS(利用 tsc)。  
2、why studying?  
JS 是动态语言(不声明变量类型)，虽然灵活，但不容易找错误的代码位置。  
3、特点  
① 类型声明：变量、函数参数、返回值  
4、unknown 与 any：any 范围更广，和不写是一样的，也可以赋给其他任意的值，unknown 不可以。  
5、interface 接口: 定义对象、函数的结构。类似的还有 type。[区别](https://github.com/SunshowerC/blog/issues/7)  
6、enum 枚举：比如常数枚举，存储一组常量。

## 纯函数

一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)  
必须遵守以下一些约束：  
1)不得改写参数数据  
2)不会产生任何副作用，例如网络请求，输入和输出设备  
3)不能调用 Date.now()或者 Math.random()等不纯的方法  
补充：redux 的 reducer 函数必须是一个纯函数

## V8 JIT

### 编译器和解释器

- 编译型语言在程序执行前，需要经过编译器的编译过程，并且在编译之后会保留机器能读懂的二进制文件，之后每次运行程序时直接运行二进制文件，不需要重新编译，比如 C++、go 等
- 解释性语言在每次运行时都需要解释器对程序进行动态解释和执行(边解释边执行)，比如 python、js 等
- V8 执行 JS 代码的过程:

1. 将源代码经过词法分析和语法分析生成抽象语法树 AST 和执行上下文，其中词法分析指的是将源码拆分成一个个 token，语法分析就是解析成 AST
2. 解释器根据 AST 生成字节码，并且逐行解释执行字节码(生成机器码)。最开始是没有字节码这个过程，但由于直接生成机器码占用的内存太大，因此引入了字节码

### JIT

- 解释器在执行字节码的过程中如果发现热点代码(多次执行的代码)，那么 V8 中的编译器就会**直接**将字节码转化为机器码并**保存起来**，后续的代码执行过程中直接执行机器码就行，更加高效，省去了字节码**逐行翻译**为机器码这一过程。相当于 V8 字节码结合了解释器和编译器。

- 运用 JIT 技术之后，JS 的运行速度已经变得很快，而 WebAssembly 可以使其更快。本身.wasm 格式文件就是二进制字节码，不用像 JS 一样从 AST 转换为字节码，所以运行更快，并且体积小，可移植能力强(多种语言都可以编译成 wasm 文件)

## Serverless

## Symbol

```js
// 1、symbol是简单类型，并且不能new
// 2、通过symbol(key)创建两个symbol不相等
Symbol(1) == Symbol(1); // false
Symbol(1) === Symbol(1); // false
// 3、解决问题2，并且可创建全局的symbol
Symbol.for(1) == Symbol.for(1); // true
Symbol.for(1) === Symbol.for(1); // true
// 4、根据全局注册symbol表里的symbol找到原始值
const a = Symbol.for(1);
Symbol.keyFor(a); // 类型强制转换返回string类型 '1'， 如果上面是[]则返回''
```

## JSON

主要探讨 JSON.stringify。[详细](https://juejin.cn/post/6844904016212672519#heading-26)  
1、对于**undefined**、**任意的函数**以及**Symbol**三个特殊的值分别作为**对象属性的值**、**数组元素**、**单独的值**时的不同返回结果。  
①undefined、任意的函数以及 Symbol 作为对象属性值时，JSON.stringify() 跳过(忽略)对它们进行序列化(不输出)  
②undefined、任意的函数以及 Symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null  
③undefined、任意的函数以及 Symbol 被 JSON.stringify() 作为单独的值进行序列化时都会返回 undefined  
④ 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。  
⑤new Date().toJSON()："2021-08-09T14:25:17.008Z"，和 toString()稍微不一样。  
⑥NaN 和 Infinity 格式的数值及 null 都会被当做 null

```js
JSON.stringify({ a: NaN });
// ('{"a":null}');
JSON.stringify([NaN]);
// ('[null]');
JSON.stringify(NaN);
// ('null');
```

## 实现科里化

```js
const myCurry = (fn) => {
  return function curry(...args1) {
    if (fn.length <= args1.length) {
      // fn.length是形参个数
      return fn(...args1);
    }
    return (...args2) => curry(...args1, ...args2);
  };
};
```

## 遍历属性

1. for in 自身和原型链 可枚举, 不包括 symbol
2. Object.keys() 自身 可枚举, 不包括 symbol
3. Object.getOwnPropertyNames() 自身可枚举+不可枚举 不包括 symbol
4. obj.prototype.hasOwnProperty() 判断属性：自身可枚举+不可枚举 包括 symbol
5. Reflect.ownKeys 方法返回一个由目标对象**自身**的属性键组成的数组。它的返回值等同于 Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。
6. obj.propertyIsEnumerable(key)判断是否可枚举，比如数组的 length 是不可枚举

## forEach 和 map 不能通过 return、continue、break 提前退出

可以通过 some 和 every

```js
const arr = [1, 2, 3, 4, 5];
// continue:
arr.some(function(item) {
  if (item === 2) {
    return false;
  }
  console.log(item);
});
// 或 只用return
arr.forEach(function(item) {
  if (item === 2) {
    return false;
  }
  console.log(item);
});

// break:
arr.every(function(item) {
  console.log(item);
  return item !== 3;
});
```

## sort

1、Chrome70 之前，长度 10 以下，是插入排序，10 以上是快排。  
2、Chrome70 之后，是归并排序结合了插入排序。  
拓展：[判断单调数组](https://leetcode-cn.com/problems/monotonic-array/),官解法一用了 every，可以借鉴。  
猿辅导三面：不仅判断单调，还要分辨升降。

```js
const judge = (arr) => {
  let rise = true;
  let dec = true;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] >= arr[i + 1]) {
      rise = false;
    }
    if (arr[i] <= arr[i + 1]) {
      dec = false;
    }
  }
  if (!rise && !dec) return 0;
  if (rise && !dec) return 1;
  return -1;
};
```

## JSDoc

补充常用语法

## 定时器

1. setTimeout(fn, 0)设计为 4ms 的原因：setTimeout 4ms 是历史设计问题，当年设计成 0ms 或 1ms 的时候，导致耗电量增大和浏览器崩溃等问题，后来控制在 4ms。

- 需要同时满足嵌套层级超过 5 层，timeout 小于 4ms，才会设置 4ms
- 不同浏览器的设计不同
- "其原因在于如果浏览器允许 0ms，会导致 JavaScript 引擎过度循环，也就是说如果浏览器架构是单进程的，那么可能网站很容易无响应。因为浏览器本身也是建立在 event loop 之上的，如果速度很慢的 JavaScript engine 通过 0ms timer 不断安排唤醒系统，那么 event loop 就会被阻塞。那么此时用户会面对什么情况呢？同时遇到 CPU spinning 和基本挂起的浏览器，想想就让人崩溃。"

2. setInterval 的问题，也是时间的误差，事件循环的问题：如果你的代码逻辑执行时间可能比定时器时间间隔要长(导致定时器代码连续执行，没有达到定时器效果)，建议你使用递归调用了 setTimeout() 的具名函数。例如，使用 setInterval() 以 5 秒的间隔轮询服务器，可能因网络延迟、服务器无响应以及许多其它的问题而导致请求无法在分配的时间内完成。但 setTimeout 也有误差，所以也要解决

```js
(function loop() {
  setTimeout(function() {
    // Your logic here

    loop();
  }, delay);
})();
```

3. requestAnimationFrame：回调函数会在浏览器重绘之前调用，利用了浏览器刷新率即重绘频率这一特性进行动画的绘制，比 setInterval 更好(setInterval 或 Timeout 需要考量时间的大小，容易掉帧)。为了提高性能和电池寿命，因此在大多数浏览器里，当 requestAnimationFrame() 运行在后台标签页或者隐藏的 iframe 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。
4. requestIdleCallback：requestAnimationFrame 会在每次屏幕刷新的时候被调用，而 requestIdleCallback 则会在每次屏幕刷新时(也是 每 16ms 调用)，判断当前帧是否还有多余的时间，如果有，则会调用回调，实现一些页面性能方面的的优化(**react fiber 使用了类似该 api 的 polyfill**)

## 深拷贝

考虑循环引用和 Symbol，不考虑函数

```js
const getType = (obj) => {
  const val = Object.prototype.toString.call(obj);
  const type = /\[object (.*)\]/.exec(val)[1]; // 第一个小括号匹配到的
  return type;
};

const iteratorObject = (obj, res, m) => {
  // 自身的可枚举 不可枚举和 symbol属性
  Reflect.ownKeys(obj).forEach((key) => {
    // 移除不可枚举
    if (obj.propertyIsEnumerable(key)) {
      res[key] = deepClone(obj[key], m);
    }
  });
};

/**
 * @param {object}  obj
 * @returns {object} res
 */
const deepClone = (obj, wm = new WeakMap()) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (wm.has(obj)) return wm.get(obj); // 解决循环引用
  let res;
  const type = getType(obj);
  switch (type) {
    case 'Set': // 可以再补充weakmap ws之类的
      res = new Set();
      wm.set(obj, res);
      obj.forEach((value) => res.add(deepClone(value, wm)));
      break;
    case 'Map':
      res = new Map();
      wm.set(obj, res);
      obj.forEach((value, key) => res.set(key, deepClone(value, wm)));
      break;
    case 'Date':
      res = new Date(obj);
      break;
    case 'RegExp':
      res = new RegExp(obj.source, obj.flags);
      break;
    case 'Array':
      res = [];
      wm.set(obj, res);
      iteratorObject(obj, res, wm);
      break;
    case 'Object':
      res = {};
      wm.set(obj, res);
      iteratorObject(obj, res, wm);
      break;
    default:
      break;
    // 其他 补充
    // return obj;
  }
  return res;
};

const arr = [1, 2, [3]];
const darr = deepClone(arr);
darr[0] = 5;
console.log(arr); //[ 1, 2, [ 3 ] ]
console.log(darr); //[ 5, 2, [ 3 ] ]

const obj = { a: 1 };
const dobj = deepClone(obj);
dobj.a = 5;
console.log(obj); //{ a: 1 }
console.log(dobj); //{ a: 5 }

const s1 = new Set([1, 2, 3]);
const s2 = deepClone(s1);
s2.add(4);
console.log(s1); //Set(3) { 1, 2, 3 }
console.log(s2); //Set(4) { 1, 2, 3, 4 }
```

## 显式绑定 call、apply、bind

1. bind，修改指向但不直接执行，可以分批传参
   <!-- bind: https://mp.weixin.qq.com/s/istdqF_k0hbXmaWUivtf9A -->

- 手写源码

```js
Function.prototype.bind2 = function(context, ...args1) {
  if (typeof this !== 'function') throw new TypeError();
  const self = this;
  // 这里不用箭头函数是因为可能fn是构造函数 要实例化
  const fn = function(...args2) {
    // 记得要return 因为函数要有返回值
    return self.apply(this instanceof self ? this : context, [...args1, ...args2]);
  };
  const newFn = function() {};
  newFn.prototype = self.prototype;
  fn.prototype = new newFn(); // 为了继承function原型
  return fn;
};

var name = 'Jack';
var Yve = {
  name: 'Yvette',
};
function person(age, job, gender) {
  console.log(this.name, age, job, gender);
}
person(22, 'engineer', 'female');
// Jack 22 engineer female
var bindYve = person.bind2(Yve, 22, 'engineer');
bindYve('female');
// Yvette 22 engineer female
```

- bind 注意事项：bind 多次后执行，函数 this 还是指向第一次 bind 的对象

```js
var x = 1;
var bar = function() {
  console.log(this.x);
};

var obj1 = { x: 1 };
var obj2 = { x: 2 };
var obj3 = { x: 3 };
var func = bar.bind(obj1);
func(); // 1

func = bar.bind(obj1).bind(obj2);
func(); // 1

func = bar
  .bind(obj1)
  .bind(obj2)
  .bind(obj3);
func(); // 1
```

2. call & apply
   call 接受上下文和参数列表，apply 接受上下文和数组(或类数组)

```js
// apply只需要把...args改成args
Function.prototype.call2 = function(context, ...args) {
  // 剩余参数不用和箭头函数一起;
  if (typeof this !== 'function') throw new TypeError(); // 错误处理
  context = context ?? window; // 非严格模式下 undefined或null 会包装为window
  if (typeof context !== 'object' || context === null) context = Object(context); // 简单类型 包装为对象
  const key = Symbol(); // 防止重名
  context[key] = this; // context是对象
  const result = context[key](...args); // 执行时隐式绑定为context
  delete context[key]; // 删除symbol key
  return result;
};
```

## new 操作符

步骤：创建对象并改变原型对象，修改 this 指向，执行函数，返回的是引用类型则返回这个引用类型数据，否则返回实例

```js
const myNew = function(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  if (typeof result !== 'object' || result === null) {
    return obj;
  }
  return result;
};
```

## 同域跨页面通信

1. sw+postMessage
2. localStorage + 监听 storage 事件
3. indexedDB(容量大、异步、同源策略)

## 处理所有 async 的错误

1. 事件监听

```js
window.addEventListener('unhandledrejection', function(event) {
  event.reason; //获取到catch的err的原因(内容) 与控制台报错一致
  event.promise; //获取到未处理的promise对象
});
```

2. 封装一层 promise
   <!-- (async () => {
     const [err, res] = await to(request.get('/xxx'));
     if (err) {
       handle error
       return;
     }
       handle bussiness
   })() -->

```js
export const handler = (promise) => {
  return promise.then((res) => [undefined, res]).catch((err) => [err, undefined]); // err是有值的情况
};
```

3. 手写个 babel 插件处理
   思路：寻找每个 await，然后再加上对应的 try catch

## 长连接(持久连接)

1. 常规轮询与长轮询

- 常规轮询：每 n 秒请求一次，缺点是开销大，浪费服务端资源
- 长轮询：服务器在有消息之前不会关闭连接(服务端)，进入 pending 状态，消息出现时进行响应，缺点是编写复杂
- 缺点：每个消息都是一个单独的请求，并带有 header，身份验证开销等(cookie 等)，开销大，性能不好，因此要采用 websocket 或 server sent events 等

2. ws 的优势：

- 没有跨域限制
- 长连接：数据可以作为“数据包”在两个方向上传递(双向)，而无需中断连接也无需额外的 HTTP 请求，开销小
- 由于 ws 始终保持连接，因此不需要 cookie，需要 cookie 的时候可以主动发送，开销小

## 可迭代属性(迭代器对象)

- 迭代器对象与类数组没有任何关系
- 例如 new Map()/Set().keys()/values()/entries()

```js
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.entries();

console.log(Array.from(iterator1));
// expected output:  Array [Array ["0", "foo"], Array [1, "bar"]]

// console.log(iterator1.next().value);
// expected output: [1, "bar"]

const iterator1 = map1.keys();

console.log(iterator1.next().value);
// expected output: "0"

console.log(iterator1.next());
// expected output: Object { value: 1, done: false }
console.log(iterator1.next());
// expected output: {value: undefined, done: true}
```

## JS 脚本的延迟加载

1. defer

- 不会阻塞页面
- 脚本要等到 DOM 解析完毕，但在 DOMContentLoaded 事件之前执行
- 具有 defer 特性的脚本保持其相对顺序，就像常规脚本一样

2. async

- 也不会阻塞页面
- DOMContentLoaded 和异步脚本不会彼此等待(与 defer 不同)
- 其他脚本不会等待 async 脚本加载完成，同样，async 脚本也不会等待其他脚本。(比如两个 async 脚本谁先加载完谁执行)

## window 和 document

1. window 对象表示浏览器中打开的窗口，如果有 iframe 则还有 iframe 的 window
2. document 对象表示 html 文档，包括文档中的所有元素，是 window 对象的一部分

## tips

**1、空字符串的索引**

```javascript
const str = '123';
console.log(str.indexOf('')); //0
```

**2、[substr、substring、slice 的区别](https://www.cnblogs.com/echolun/p/7646025.html)**

**3、Math.max()和 min()的坑**  
Math.max()如果不接受参数则返回-Infinity，同理 Math.min()返回 Infinity，如果接受的参数不能转化为数字或者接受 NaN，则返回 NaN。另外关于 map：

```javascript
const m = new Map();
console.log(...m.entries());//空的迭代器对象用拓展运算符不打印,注意是不打印而不是打印空字符串

Number('0')
0
Number('')
0
Number()
0

Math.max([100],1) => 100  //内部是调用了Number()的过程
```

[参考资料](https://leetcode-cn.com/problems/brick-wall/)

**4、位运算**  
**异或：**二进制相同位结果为 0，不同位结果为 1，即不进位相加。eg:a^b = c, a^b^b = a, 即 c^b=a 同理 c^a =b;五月份力扣每日一题多次出现异或运算。

**5、私有方法与静态方法**  
[参考 1](https://juejin.cn/post/6844904164913315853) [参考 2](https://www.cnblogs.com/huangshikun/p/6509822.html)  
ES5 的 Person.name 这种静态属性相当于 ES6 迭代 static 关键字

**6、ECMAScript**

- 1995 年，网景工程师 Brendan Eich(布兰登·艾奇)花了 10 天时间设计了 JavaScript 语言，1996 年微软发布了 JScript，同时拉开了 Navigator 和 Internet Explorer 浏览器大战的序幕（到 2002 年 IE 完胜，占据全世界 96%的市场份额）
- 为了让各大浏览器统一编程规范，1997 年 6 月 ECMA（欧洲计算机制造联合会）以 JavaScript 语言为基础制定了 ECMAScript 标准规范 ECMA-262，从此浏览器厂商都是按照这个规范来开发自己的浏览器产品；
- 1999 年 12 月 ES3 发布，到 2011 年 6 月 ES5 发布（2007 年的 ES4 夭折：改动太大），ES3 占据了 10 年历程，也是 JS 语言的基础。2015 年 6 月 ES6 发布（但是由于之后规定每年发布一个新的版本，所以后改名 ES2015），2016 年 6 月对 2015 版本增强的 2016 版本发布，此后相继有 ES2017、ES2018…

---

- ES2015(ES6)：let/const、解构赋值、数组/对象等方法扩展、Symbol、Set/Map、Proxy、Reflect、Promise、Iterator(for of)、Generator、Class、ES6Module...
- ES2016(ES7)：Array.prototype.includes、指数运算符(a\*\*b)...
- ES2017(ES8)：async/await、Promise.prototype.finally、Object.values/entries/getOwnPropertyDescriptors、字符串填充 padStart 和 padEnd、SharedArrayBuffer 共享内存、Atomic 原子操作...
- ES2018(ES9)：对象的拓展运算符、正则表达式上的一些升级、异步遍历器...
- ES2019(ES10)：String.prototype.trimStart/trimEnd、Object.fromEntries、Array.prototype.flat/flatMap、catch 的参数改为可选、Symbol.description、JSON Superset 超集、stringify 加强格式转化、Array.prototype.sort 更加稳定、Function.prototype.toString 重新修订...
- ES2020(ES11)：String.prototype.matchAll、import() 、BigInt、Promise.allSettled、globalThis、可选链、空值合并运算符、export \* as ns from “mod”、for-in 机制完善...
- ES2021(ES12)：String.prototype.replaceAll、Promise.any、WeakRefs、??=、||=、&&=、Numeric separators(数字分隔符)..

**7、数据类型分类**  
原始值类型「primitive values」：基本数据类型、值类型  
&nbsp;&nbsp; • number  
&nbsp;&nbsp; • string  
&nbsp;&nbsp; • boolean  
&nbsp;&nbsp; • null  
&nbsp;&nbsp; • undefined  
&nbsp;&nbsp; • symbol  
&nbsp;&nbsp; • bigint  
对象类型「object」：引用数据类型  
&nbsp;&nbsp; • 标准普通对象 Object  
&nbsp;&nbsp; • 标准特殊对象 Array、RegExp、Date、Error...  
&nbsp;&nbsp; • 函数对象 Function  
&nbsp;&nbsp; • 非标准特殊对象 Number、String、Boolean...  
::: tip 提示
扩展：数据类型转换规则、数据类型检测、二进制的处理(进制转换)、堆栈内存及底层处理机制、装箱(拆箱)等等  
:::

**8、push 和 unshift 细节**  
返回的是数组的新的长度

**9、arr.map(parseInt)**
问题出在 map 方法接受的回调的参数的默认问题，cb 的第二个参数为索引，索引又变成了 parseInt 的第二个参数，则产生进制问题，如['1', '2', '3'].map(parseInt) => [1, NaN, NaN]。  
parseInt 和 Number 的区别：  
1、Number 对于非字符串可以强制类型转换，比如 Number([1]) === 1  
2、Number('11x') => NaN, parseInt('11x') === 11, 忽略后面非数字的部分  
3、parseInt 第二个参数是指定以什么进制去解析第一个参数 string(返回十进制)，如果省略该参数或其值为 0 则是十进制(取决于浏览器)，小于 2 大于 36 都是 NaN，比如 parseInt(3,2), 3 不是一个二进制，所以解析不了，返回 NaN  
4、parseInt 是其他进制转化为十进制、toString 是十进制转化为其他进制

**10、for 循环的特殊用法**
[14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

```js
// 题解 部分代码
let j = 0;
for (; j < Math.min(res.length, strs[i].length); j++) {
  if (res[j] !== strs[i][j]) {
    break;
  }
}
res = res.slice(0, j);
```

**11、对象的连续解构赋值+重命名**

```js
const obj = { a: { b: 1 } };
const {
  a: { b: data },
} = obj;
//相当于将b变量重命名为data
console.log(data); //1
// 注意：连续解构赋值 只能拿到最后的变量，如果打印a，则报错
```

**12、VOG GO EC(G)**  
VOG 全局变量对象\GO 全局对象\EC(G)全局执行上下文  
EC(G)下有 VOG VOG 里有 GO(?) 生成的 有的放在 VOG 有的 GO

<!-- GeekPDF09:块级作⽤域就是通过词法环境的栈结构来
实现的，⽽变量提升是通过变量环境来实现，通过这两者的结合，JavaScript引擎也就同时⽀持了变量提升
和块级作⽤域了。 -->

全局上下文的 var function 存在于 GO 、全局上下文的 let const 存在于 VOG(script 作用域)  
~~函数在存储的时候 堆中存储分为三部分~~

**13、Object.prototype.toString.call(各种类型对象)**

1、可以用来判断数组等对象："[object Array]"  
2、1 和 new Number(1)都是"[object Number]"

**14、变量提升**  
1、let 的「创建」过程被提升了，但是初始化没有提升。  
2、var 的「创建」和「初始化」都被提升了。  
3、function 的「创建」「初始化」和「赋值」都被提升了。  
[可以看看](https://www.jianshu.com/p/0f49c88cf169)

**15、for in**  
字符串也能 for in 输出索引

**16、V8 性能好的原因**  
1、JIT 字节码(hot) => 机器码  
2、内嵌缓存(和上面类似)  
3、更精确的垃圾回收机制

**17、函数简写的思考**

```js
const obj = {
  get() {
    console.log(typeof get);
  },
};

obj.get(); // undefined  (0824 in CAINiAO)
```

**18、类中的方法默认开启了严格模式**  
**19、箭头函数的严格模式与非严格模式的行为一致**  
**20、async+forEach 的问题**  
由于 async 和 await 放在了循环内部，所以表现为并行，改成外部 async，内部 for 循环，就可以间隔 x 秒打印相应数据  
**21、var 和 no var 的区别**

- no var 赋值的变量可以用 delete 删除 window 上的属性
- 在函数中声明时，no var 赋值的变量作用于全局作用域，var 作用于函数(局部 local 作用域)作用域

**22、WeakMap 和 WeakSet 与 Map 和 Set 的区别**

- WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名,值任意；WeakSet 的值只能是对象(不能是 null)
- 引用(避免内存泄漏)：WeakMap 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行
- 没有遍历的方法比如 forEach，也没有 size 属性，因为不知道什么时候就被垃圾回收了

**23、Number.EPSILON 值为 2^-52**  
**24、sessionStorage 的问题**：多窗口之间 sessionStorage 不可以共享状态，但是在某些特定场景下新开的同源页面会复制之前页面的 sessionStorage，注意是复制新开时的状态而不是共享，比如 A 页面中 window.open(与 A 同源的 B 页面)或 点击 a 标签

- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- 在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文， 这点和 session cookies 的运行方式不同。
- 打开多个相同的 URL 的 Tabs 页面，会创建各自的  sessionStorage。
- 关闭对应浏览器标签或窗口，会清除对应的  sessionStorage。

**25、创建 26 个英文字母数组**：

```js
const arr = [];
for (let i = 65; i < 91; i++) {
  arr.push(String.fromCharCode(i)); // i是ascii码
}
console.log(arr);
65 -> A   97 -> a
```

**26、强弱类型/动静态**：强弱的区分是是否能进行隐式转化，比如相加是否报错；动静的区分是运行时是否能改变变量类型，因此 python 是强类型，JS 是弱类型，二者都是动态语言。  
**27、Object 的属性是按照数字升序(如果属性是非负整数时)，Map 按照插入顺序**

- 因此，如果强烈依赖插入顺序，那么 Map 可以保证这一点。
- 注意，Map 或 Set 的插入顺序是按照第一次插入而定的，后续更新的只会更改值。

```js
const map1 = new Map();

map1.set('b', 1);
map1.set('a', 2);
map1.set('b', 3);
console.log(map1); // Map(2) {'b' => 3, 'a' => 2}
```

**28、作用域**: node 中有模块作用域，const 和 let 在全局中声明会形成 script 作用域，并不是全局(global)作用域  
**29、代码块{}**: 加法运算，{}放在前时，被认为是代码块，忽略掉

1. {} + [] = 0
2. [] + {} = '[object Object]'
3. {} + '' = 0 , 相当于+''
4. {} + {} = '[object Object][object object]', 这个是特例
5. [] + [] = ''

**30、Object.freeze()冻结**

```js
// 可以由 const 声明的特征而联想到，复杂类型可以修改内容 Object.freeze()  浅冻结 对象和数组
// 冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性（数据属性），以及不能修改已有属性的值。
// 已有属性的访问器属性也不能修改  getter setter Object.defineProperty
// 非严格模式 不报错 但是添加修改删除属性无效
// 严格模式抛出 类型错误
var obj = {
  prop: function() {},
  foo: 'bar',
};

Object.freeze(obj);

function fail() {
  // 'use strict'
  obj.foo = 'sparky'; // throws a TypeError
  delete obj.quaxxor; // 返回true，因为quaxxor属性从来未被添加
  obj.sparky = 'arf'; // throws a TypeError
}
fail(); //严格模式报throw type类型错误

// 注意 freeze方法对值为对象的数据并不能冻结
// 深冻结实现：
const deepFreeze = function(obj) {
  const arr = Object.getOwnPropertyNames(obj); //自身所有属性包括可枚举和不可枚举 或者用Reflect.ownKeys(obj)包括symbol
  // 遍历每一项，如果value是复杂类型则继续冻结
  for (const k of arr) {
    if (typeof obj[k] === 'object' && obj[k] !== null) deepFreeze(obj[k]);
  }
  return Object.freeze(obj);
};
console.log(Object.getOwnPropertyNames([1, 2, 3]));
//  ["0", "1", "2", "length"] 自身可枚举和不可枚举的属性
```
