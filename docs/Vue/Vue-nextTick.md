<h2 style="text-align: center;">talking about Vue.js nextTick</h2>
Vue.js 提供了 2 种调用 nextTick 的方式，一种是全局 API Vue.nextTick，一种是实例上的方法 vm.$nextTick，无论我们使用哪一种，最后都是调用 next-tick.js 中实现的 nextTick 方法。

## nextTick

### how

```js
// for example
this.openid = 'zbc';
await this.$nextTick(); // 或者把回调放到()中
// cb
```

- cb 将会在 DOM 下次更新之后执行

### why

更新数据后，需要对新 DOM 进行操作，但获取不到更新后的 DOM，因为 DOM 更新是异步的。
我理解为什么把 nextTick 设计成微任务，因为想更快地插队从而执行回调(微任务优先级更高)

### 原理

对 cb 进行封装，在不同版本采取不同策略

- 2.0-2.4: promise => MutationObserver => setTimeout
- 2.5: setImmediate => MessageChannel => Promise => setTimeout
- 2.6: promise => MutationObserver => setImmediate => setTimeout (setImmediate 在浏览器端只支持 IE，约等于 setTimeout(fn,0))
  ![基本渲染场景](/blog/assets/img/nexttick.jpeg)

那么问题来了，为什么 2.5 要优先封装成宏任务，2.6 为什么又改回去？

- 2.5 封装成宏任务的原因: 由于 microTask 的执行优先级非常高，在某些场景之下它甚至要比事件冒泡还要快，就会导致一些诡异的问题。
- 2.6 又改回去的原因：在某些重绘的场景中，会造成页面闪烁。我理解是因为宏任务要晚于 DOM 渲染，因此会出现闪烁。
