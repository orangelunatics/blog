## 手写JS数组原型方法
### some
```javascript
Array.prototype.some = function(fn, thisArg) {
  if (typeof fn !== 'function' || !Array.isArray(this)) throw new Error('')
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i, this)) return true
  }
  return false;
}
```
### every
思路同上 