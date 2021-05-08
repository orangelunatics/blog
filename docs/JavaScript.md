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
  
## tips  
1、空字符串的索引
```javascript
const str = '123'
console.log(str.indexOf(''));//0
```  
  
2、[substr、substring、slice的区别](https://www.cnblogs.com/echolun/p/7646025.html)  
  
3、Math.max()如果不接受参数则返回-Infinity，同理Math.min()返回Infinity，如果接受的参数不能转化为数字或者接受NaN，则返回NaN。另外关于map：  
```javascript
const m = new Map();
console.log(...m.entries());//空的迭代器对象用拓展运算符不打印,注意是不打印而不是打印空字符串

Number('0')
0
Number('')
0
Number()
0
```
[参考资料](https://leetcode-cn.com/problems/brick-wall/)  
  
4、位运算  
**异或：**二进制相同位结果为0，不同位结果为1。eg:a^b = c, a^b^b = a, 即 c^b=a 同理 c^a =b