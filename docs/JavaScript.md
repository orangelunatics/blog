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

### reduce

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
Promise.all = (promiseArr) => {
  if (typeof promiseArr[Symbol.iterator] !== 'function') throw new Error('not iterator');
  return new Promise((resolve, reject) => {
    const arr = [];
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i]).then(
        (res) => {
          arr[i] = res;
          if (i + 1 === promiseArr.length) resolve(arr);
        },
        (err) => reject(err),
      );
    }
  });
};
// 4、Promise.race

// 5、Promise.allSettled
```

### Promise 构造函数

## JS 动画

早期用定时器实现，更好的办法是使用 requesttAnimationFrame(cb)，是 H5 的 API。  
主要思想：让执行 cb 的频率和屏幕刷新率保持一致，而不是通过定时器的时间进行控制，这样不会丢帧。  
此外，可以利用此 API 的特性进行**节流**。

## JS 六种异步方案

[参考 1](https://juejin.cn/post/6844903760280420366)  
[参考 2](https://zhuanlan.zhihu.com/p/19750470?columnSlug=thefrontendperiodicals)

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
**注：唯一的原生类数组（array-like）对象是 Strings**，也就是说字符串也是类数组

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

## 栈堆问题

1、为什么引用类型数据的值存放在堆中  
引用数据类型占据空间大、大小不固定，如果存储在栈中，将影响程序的运行性能。

## TypeScript

1、TS 是以 JS 为基础构建的语言，是 JS 的超集(相当于 JS pro)，扩展了 JS 并添加了类型，可以在任何支持 JS 的平台中执行。但 TS 不能被 JS 解析器直接执行，需要编译为 JS(利用 tsc)。  
2、why studying?  
JS 是动态语言(不声明变量类型)，虽然灵活，但不容易找错误的代码位置。  
3、特点  
① 类型声明：变量、函数参数、返回值  
4、unknown 与 any：any 范围更广，和不写是一样的，也可以赋给其他任意的值，unknown 不可以。  
5、interface 接口: 定义对象、函数的结构。类似的还有 type。  
6、enum 枚举：比如常数枚举，存储一组常量。  
7、泛型：理解成占位符，暂时不定义类型，使用的时候再定义，可以用来做泛型函数。

## 纯函数

一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)  
必须遵守以下一些约束：  
1)不得改写参数数据  
2)不会产生任何副作用，例如网络请求，输入和输出设备  
3)不能调用 Date.now()或者 Math.random()等不纯的方法  
补充：redux 的 reducer 函数必须是一个纯函数

## WebAssembly

运用 JIT 技术之后，JS 的运行速度已经变得很快，而 WebAssembly 可以使其更快。  
本身.wasm 格式文件就是二进制字节码，不用像 js 一样从 AST 转换，所以运行更快，并且体积小，可移植能力强(多种语言都可以编译成 wasm 文件)

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

## 实现科里化

```js
const myCurry = (fn) => {
  return function curry(...args1) {
    if (fn.length <= args1.length) {
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

2. setInterval 的问题，也是时间的误差，事件循环的问题：如果你的代码逻辑执行时间可能比定时器时间间隔要长，建议你使用递归调用了 setTimeout() 的具名函数。例如，使用 setInterval() 以 5 秒的间隔轮询服务器，可能因网络延迟、服务器无响应以及许多其它的问题而导致请求无法在分配的时间内完成。但 setTimeout 也有误差，所以也要解决

```js
(function loop() {
  setTimeout(function() {
    // Your logic here

    loop();
  }, delay);
})();
```

3. requestAnimationFrame：回调函数会在浏览器重绘之前调用，利用了浏览器刷新率即重绘频率这一特性进行动画的绘制，比 setInterval 更好(setInterval 或 Timeout 需要考量时间的大小，容易掉帧)。为了提高性能和电池寿命，因此在大多数浏览器里，当 requestAnimationFrame() 运行在后台标签页或者隐藏的 iframe 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。
4. requestIdleCallback：requestAnimationFrame 会在每次屏幕刷新的时候被调用，而 requestIdleCallback 则会在每次屏幕刷新时，判断当前帧是否还有多余的时间，如果有，则会调用回调，实现一些页面性能方面的的优化

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
      // 其他 补充
      return obj;
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
parseInt 和 Number 的区别(抛砖引玉一下)：  
1、Number 对于非字符串可以强制类型转换，比如 Number([1]) === 1  
2、Number('11x') => NaN, parseInt('11x') === 11, 忽略后面非数字的部分  
3、parseInt 第二个参数是指定以什么进制去解析第一个参数 string(返回十进制)，如果省略该参数或其值为 0 则是十进制，小于 2 大于 36 都是 NaN，比如 parseInt(3,2), 3 不是一个二进制，所以解析不了，返回 NaN  
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

全局上下文的 var function 存在于 GO 、全局上下文的 let const 存在于 VOG  
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
- no var 赋值的变量作用于全局作用域，var 作用于函数作用域

**22、WeakMap 和 WeakSet 与 Map 和 Set 的区别**

- WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名,值任意；WeakSet 的值只能是对象
- 引用(避免内存泄漏)：WeakMap 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行
- 没有遍历的方法比如 forEach，也没有 size 属性，因为不知道什么时候就被垃圾回收了
