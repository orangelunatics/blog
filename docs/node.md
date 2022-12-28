## Node.js

### Node.js 简介

- Node.js 保持了 JS 在浏览器中**单线程**的特点。
- 单线程的**优点**：没有线程死锁、没有线程切换上下文带来的性能上的开销。
- 单线程的**缺点**：无法利用多核 CPU、错误会引起整个应用退出(鲁棒性差)、大量计算占用 CPU 导致无法继续调用异步 IO(类似于浏览器中的 UI 线程与 JS 线程的相互 阻塞)
- 1、“I/O”密集型应用；2、中间层；3、RPC 服务；4、BFF 应用；5、Serverless；6、微服务

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

|                            | 浏览器 | Node |
| -------------------------- | ------ | ---- |
| process.nextTick           | ❌     | ✅   |
| MutationObserver           | ✅     | ❌   |
| Promise.then catch finally | ✅     | ✅   |

- 执行顺序：script 宏任务(同步任务) > 微任务 > requestAnimationFrame > DOM 渲染 > 宏任务 > requestIdleCallback [进一步理解](https://zhuanlan.zhihu.com/p/142742003)
- 浏览器在每一轮 Event Loop 事件循环中不一定会去重新渲染屏幕，会根据浏览器刷新率以及页面性能或是否后台运行等因素判断的，浏览器的每一帧是比较固定的，会尽量保持 60Hz 的刷新率运行，每一帧中间可能会进行多轮事件循环。
- Node 和浏览器的事件循环区别：  
  在浏览器中，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。(Node11 开始有所改变)

### 多线程与多进程

1. 多线程模块：worker_threads。

- 线程是 CPU 调度的最小单位，使用多线程能够充分利用 CPU 的多核特性，在每一个核心中执行一个线程，**多线程并发执行，提高 CPU 的利用率**，适合用于计算密集型任务。

2. 多进程模块：child_process 和 cluster。

- 子进程崩溃不影响主进程的稳定性，能够增加系统的鲁棒性。
- node.js 是单线程的，如果某一个操作需要消耗大量资源和时间，会导致程序整体性能下降。可以创建子进程，让子进程去跑那些费时费力的操作，而主线程继续做别的。子进程间可以共享内存，通过互相通信来完成数据的交换。
- 多进程缺点：进程切换时开销很大

### this 指向

最外层的 this 并不是全局对象 global。而是 module.exports
