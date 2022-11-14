## Node.js

### Node.js 简介

Node.js 保持了 JS 在浏览器中**单线程**的特点。  
单线程的**优点**：没有线程死锁、没有线程切换上下文带来的性能上的开销。  
单线程的**缺点**：无法利用多核 CPU、错误会引起整个应用退出(鲁棒性差)、大量计算占用 CPU 导致无法继续调用异步 IO(类似于浏览器中的 UI 线程与 JS 线程的相互阻塞)

<!-- ## 作用 -->

<!-- 单独作为后端/作为中间层 -->

<!-- [补充 1](https://zhuanlan.zhihu.com/p/51160124)   -->
<!-- [补充 2](https://www.weipxiu.com/3679.html)   -->
<!-- [补充3](https://blog.csdn.net/brokenkay/article/details/112711241?utm_term=node%E4%B8%AD%E9%97%B4%E5%B1%82%E4%BC%98%E7%82%B9&utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~sobaiduweb~default-6-112711241&spm=3001.4430) -->

### Koa 洋葱模型

- 常用中间件：koa-router、cookie、koa-session、数据库 mysql 等
- 洋葱模式实现的核心：koa-compose 方法
- 使用中间件：

```js
let Koa = require('../src/application');
let app = new Koa();

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(6);
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(5);
});

app.use(async (ctx, next) => {
  console.log(3);
  ctx.body = 'hello world';
  console.log(4);
});

app.listen(3000, () => {
  console.log('listenning on 3000');
});
```

1. use 方法中将中间件方法 push 到中间件数组中

```js
use(fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
  if (isGeneratorFunction(fn)) {
    fn = convert(fn);
  }
  this.middleware.push(fn);
  return this;
}
```

2. compose 方法中构造了一个 dispatch 方法，调用 dispatch(0)，从第 0 个中间件方法开始执行，并且传入 ctx 和 next 方法，其中 next 方法返回的是 dispatch(i + 1)，也就是进行递归调用，由于 app.use 里存在 await next()，因此所有的中间件方法中都先执行 next 调用前的逻辑，当最后一个中间件的 next 之前逻辑执行好之后，才能再从最后一个中间件向第一个中间件执行 next 后面的逻辑，从而实现洋葱模型。核心代码如下：

```js
function compose(middlewares) {
  // koa 核心代码
  const dispatch = (i) => {
    if (i === middlewares.length) return Promise.resolve();
    return Promise.resolve(
      middlewares[i](() => {
        dispatch(i + 1); // 当用户调用next时会取出下一个继续执行
      }),
    );
  };
  return dispatch(0);
}
```

### 事件循环

每轮事件循环中微任务队列的优先级高于宏任务队列  
requestAnimationFrame 回调在下次重绘前执行

- 宏任务：
  | | 浏览器 | Node |
  | ---- | ---- | ---- |
  | I/O | ✅ | ✅ |
  | UI 交互事件 | ✅ | ❌ |
  | setTimeout | ✅ | ✅ |
  | setInterval | ✅ | ✅ |
  | setImmediate | ❌ | ✅ |
  | MessageChannel | | |
  requestAnimationFrame 执行时机在宏任务和微任务之间

- 微任务：

# 浏览器 Node

|                            | 浏览器 | Node |
| -------------------------- | ------ | ---- |
| process.nextTick           | ❌     | ✅   |
| MutationObserver           | ✅     | ❌   |
| Promise.then catch finally | ✅     | ✅   |

执行顺序：同步任务 > 微任务 > requestAnimationFrame > DOM 渲染 > 宏任务
