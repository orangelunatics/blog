## JavaScript & TypeScript
## 手写JS数组原型方法
### map
```javascript
Array.prototype.map = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×')
  const newArr = []
  for (let i = 0; i < this.length; i++) {
    newArr[i] = fn.call(thisArg, arr[i], i, this)
  }
  return newArr
}
```
### find
```javascript
Array.prototype.find = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×')
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i, this)) return this[i]
  }
  return undefined;
}
```
### some
```javascript
Array.prototype.some = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×')
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i, this)) return true
  }
  return false;
}
```
### every
思路同上
### filter
```javascript
Array.prototype.filter = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('×')
  const newArr = []
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, arr[i], i, this)) newArr.push(arr[i])
  }
  return newArr
}
```
### reduce
```javascript
Array.prototype.reduce = function(fn, start) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('')
  let result = start ? start : this.splice(0, 1)[0]; //没有初始值的时候缩短遍历次数
  for (let i = 0; i < this.length; i++) {
    result = fn(result, this[i], i, this);
  }
  return result;
};
```  
从MDN的表格可以看出  
reduce是这样的,如果第二个参数也就是初始值如果不给的话,那么遍历的次数就是数组的长度-1  
而且第一遍历是从第二项开始,也就是索引1开始 默认索引0的回调结果就是 索引0 的值  
如果给了redece的第二个参数是数组的长度,并且cb的第一个参数一开始就是reduce的第二个参数  
  
## JS动画
早期用定时器实现，更好的办法是使用requesttAnimationFrame(cb)，是H5的API。  
主要思想：让执行cb的频率和屏幕刷新率保持一致，而不是通过定时器的时间进行控制，这样不会丢帧。  
此外，可以利用此API的特性进行**节流**。  
  
## JS六种异步方案
[参考](https://juejin.cn/post/6844903760280420366)
  
## 函数
1、普通函数执行时发生了什么？  
①形成一个全新的私有上下文EC，有一个私有变量对象AO(?)  
②初始作用域链、初始this、初始arguments、形参赋值、变量提升。  
③代码执行。  
④出栈释放和不释放(闭包)。  
  
2、箭头函数执行：  
①形成一个全新的私有上下文EC，有一个私有变量对象AO  
②初始作用域链、形参赋值、变量提升。  
③代码执行。  
④出栈释放和不释放(闭包)。  
区别：写法、this、arguments、没有prototype(不允许被new)  
箭头函数的this指向所在上下文的this，或者说父级的this  
  
3、类数组(如arguments)变成数组：  
①、扩展运算符  
②、Array.from(arguments)  
③、Array.prototype.slice.call(arguments)  
其实这样也行: [].slice.call(arguments)  
原因从slice源码可以看出，利用了arguments可以索引。  
```javascript
Array.prototype.slice = function(start, end) {
  if (!Array.isArray(this) || !start) throw new Error('×')
  const arr = [];
  if (end < 0 && Math.abs(end) < this.length) end = this.length - Math.abs(end)；
  if (end > this.length || end === undefined) end = this.length;
  for (let i = start; i < end; i++) {
    arr.push(this[i]);
  }
  return arr;
}
```
其实类数组就是鸭子类型，既然数组可以，那么让类数组也可以，也就是借用。比如[].forEach.call(argumets,...)  
  
4、各种循环(for、while、forEach、for of、for in)  
性能由快到慢(v8)：for ≈ while > forEach ≈ for of > for in(要遍历原型链)  
    
5、块级作用域练习题  
~~块级上下文产生的原因：在除了函数和对象的大括号中，出现let、const、function则会产生块级上下文。~~  
```javascript
{
  function foo() {}
  foo = 1;
}
console.log(foo);//输出foo函数体
// 函数具有特殊性，全局中会进行foo的声明所以不报错，
// 而在块级作用域内，进行了foo的声明和定义。从而改变了全局的foo。如果在前面log，则会undefined。  
```    
  
6、闭包(较规范的定义)  
在JavaScript中，根据词法作⽤域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调⽤一个外部函数返回⼀个内部函数后，即使该外部函数已经执⾏结束了，但是内部函数引⽤外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。⽐如外部函数是foo，那么这些变量的集合就称为foo函数的闭包。  
   
## 栈堆问题
1、为什么引用类型数据的值存放在堆中  
引用数据类型占据空间大、大小不固定，如果存储在栈中，将影响程序的运行性能。   

## TypeScript
1、TS是以JS为基础构建的语言，是JS的超集(相当于JS pro)，扩展了JS并添加了类型，可以在任何支持JS的平台中执行。但TS不能被JS解析器直接执行，需要编译为JS(利用tsc)。    
2、why studying?  
JS是动态语言(不声明变量类型)，虽然灵活，但不容易找错误的代码位置。  
3、特点  
①类型声明：变量、函数参数、返回值  
4、unknown与any：any范围更广，和不写是一样的，也可以赋给其他任意的值，unknown不可以。  
5、interface接口: 定义对象、函数的结构。类似的还有type。    
6、enum枚举：比如常数枚举，存储一组常量。  
7、泛型：理解成占位符，暂时不定义类型，使用的时候再定义，可以用来做泛型函数。  
  
## 纯函数
一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)  
必须遵守以下一些约束：  
1)不得改写参数数据  
2)不会产生任何副作用，例如网络请求，输入和输出设备  
3)不能调用Date.now()或者Math.random()等不纯的方法    
补充：redux的reducer函数必须是一个纯函数  

## WebAssembly
运用JIT技术之后，JS的运行速度已经变得很快，而WebAssembly可以使其更快。  
  
## Serverless  
  
## Symbol
```js
// 1、symbol是简单类型，并且不能new
// 2、通过symbol(key)创建两个symbol不相等
Symbol(1) == Symbol(1) // false
Symbol(1) === Symbol(1) // false
// 3、解决问题2，并且可创建全局的symbol
Symbol.for(1) == Symbol.for(1) // true
Symbol.for(1) === Symbol.for(1) // true
// 4、根据全局注册symbol表里的symbol找到原始值
const a = Symbol.for(1);
Symbol.keyFor(a) // 类型强制转换返回string类型 '1'， 如果上面是[]则返回''
```  
  
## JSON
主要探讨JSON.stringify。[详细](https://juejin.cn/post/6844904016212672519#heading-26)  
1、对于**undefined**、**任意的函数**以及**symbol**三个特殊的值分别作为**对象属性的值**、**数组元素**、**单独的值**时的不同返回结果。  
①undefined、任意的函数以及 symbol 作为对象属性值时，JSON.stringify() 跳过(忽略)对它们进行序列化(不输出)  
②undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null  
③undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时都会返回 undefined
④布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。  
⑤new Date().toJSON()："2021-08-09T14:25:17.008Z"，和toString()稍微不一样。  
  
## tips  
**1、空字符串的索引**
```javascript
const str = '123'
console.log(str.indexOf(''));//0
```  
  
**2、[substr、substring、slice的区别](https://www.cnblogs.com/echolun/p/7646025.html)**  
  
**3、Math.max()和min()的细节**  
Math.max()如果不接受参数则返回-Infinity，同理Math.min()返回Infinity，如果接受的参数不能转化为数字或者接受NaN，则返回NaN。另外关于map：  
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
**异或：**二进制相同位结果为0，不同位结果为1，即不进位相加。eg:a^b = c, a^b^b = a, 即 c^b=a 同理 c^a =b;五月份力扣每日一题多次出现异或运算。  
  
**5、私有方法与静态方法**  
[参考1](https://juejin.cn/post/6844904164913315853) [参考2](https://www.cnblogs.com/huangshikun/p/6509822.html)  
ES5的Person.name这种静态属性相当于ES6迭代static关键字  
  
**6、ECMAScript**  
+ 1995年，网景工程师Brendan Eich(布兰登·艾奇)花了10天时间设计了JavaScript语言，1996年微软发布了JScript，同时拉开了Navigator和Internet Explorer浏览器大战的序幕（到2002年IE完胜，占据全世界96%的市场份额）  
+ 为了让各大浏览器统一编程规范，1997年6月ECMA（欧洲计算机制造联合会）以JavaScript语言为基础制定了ECMAScript标准规范ECMA-262，从此浏览器厂商都是按照这个规范来开发自己的浏览器产品；  
+ 1999年12月ES3发布，到2011年6月ES5发布（2007年的ES4夭折：改动太大），ES3占据了10年历程，也是JS语言的基础。2015年6月ES6发布（但是由于之后规定每年发布一个新的版本，所以后改名ES2015），2016年6月对2015版本增强的2016版本发布，此后相继有ES2017、ES2018…  
----------  
* ES2015(ES6)：let/const、解构赋值、数组/对象等方法扩展、Symbol、Set/Map、Proxy、Reflect、Promise、Iterator(for of)、Generator、Class、ES6Module...  
* ES2016(ES7)：Array.prototype.includes、指数运算符(a**b)...  
* ES2017(ES8)：async/await、Promise.prototype.finally、Object.values/entries/getOwnPropertyDescriptors、字符串填充 padStart和padEnd、SharedArrayBuffer共享内存、Atomic原子操作...  
* ES2018(ES9)：对象的拓展运算符、正则表达式上的一些升级、异步遍历器...  
* ES2019(ES10)：String.prototype.trimStart/trimEnd、Object.fromEntries、Array.prototype.flat/flatMap、catch的参数改为可选、Symbol.description、JSON Superset超集、stringify加强格式转化、Array.prototype.sort更加稳定、Function.prototype.toString重新修订...  
* ES2020(ES11)：String.prototype.matchAll、import() 、BigInt、Promise.allSettled、globalThis、可选链、空值合并运算符、export * as ns from “mod”、for-in机制完善...  
* ES2021(ES12)：String.prototype.replaceAll、Promise.any、WeakRefs、??=、||=、&&=、Numeric separators(数字分隔符)..  
  
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
&nbsp;&nbsp; • 标准普通对象  Object  
&nbsp;&nbsp; • 标准特殊对象  Array、RegExp、Date、Error...  
&nbsp;&nbsp; • 函数对象 Function  
&nbsp;&nbsp; • 非标准特殊对象 Number、String、Boolean...  
::: tip 提示
扩展：数据类型转换规则、数据类型检测、二进制的处理(进制转换)、堆栈内存及底层处理机制、装箱(拆箱)等等  
:::  
  
**8、push和unshift细节**  
返回的是数组的新的长度  
    
**9、arr.map(parseInt)**
问题出在map方法接受的回调的参数的默认问题，cb的第二个参数为索引，索引又变成了parseInt的第二个参数，则产生进制问题，如['1', '2', '3'].map(parseInt) => [1, NaN, NaN]。  
  
**10、for循环的特殊用法**
[14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)  
```js
// 题解 部分代码
let j = 0;
for (;j < Math.min(res.length, strs[i].length); j++) {
  if (res[j] !== strs[i][j]) {
    break;
  }
}
res = res.slice(0, j);
```
  
**11、对象的连续解构赋值+重命名**
```js
const obj = {a: {b: 1}}
const {a: {b: data}} = obj
//相当于将b变量重命名为data
console.log(data) //1
// 注意：连续解构赋值 只能拿到最后的变量，如果打印a，则报错
```
  
**12、VOG GO EC(G)**  
VOG全局变量对象\GO全局对象\EC(G)全局执行上下文  
EC(G)下有VOG VOG里有GO(?) 生成的 有的放在VOG 有的GO  
<!-- GeekPDF09:块级作⽤域就是通过词法环境的栈结构来
实现的，⽽变量提升是通过变量环境来实现，通过这两者的结合，JavaScript引擎也就同时⽀持了变量提升
和块级作⽤域了。 -->
全局上下文的var function 存在于GO 、全局上下文的let const存在于VOG  
~~函数在存储的时候 堆中存储分为三部分~~