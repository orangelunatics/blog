## Node.js

参考书籍：深入浅出 Node.js 朴灵  
npm 笔记相关在 others 里。

## Node.js 简介

Node.js 保持了 JS 在浏览器中**单线程**的特点。  
单线程的**优点**：没有线程死锁、没有线程切换上下文带来的性能上的开销。  
单线程的**缺点**：无法利用多核 CPU、错误会引起整个应用退出(鲁棒性差)、大量计算占用 CPU 导致无法继续调用异步 IO(类似于浏览器中的 UI 线程与 JS 线程的相互阻塞)

## 作用

单独作为后端/作为中间层

<!-- [补充 1](https://zhuanlan.zhihu.com/p/51160124)   -->
<!-- [补充 2](https://www.weipxiu.com/3679.html)   -->
<!-- [补充3](https://blog.csdn.net/brokenkay/article/details/112711241?utm_term=node%E4%B8%AD%E9%97%B4%E5%B1%82%E4%BC%98%E7%82%B9&utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~sobaiduweb~default-6-112711241&spm=3001.4430) -->

## Koa 洋葱模型

## 事件循环

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
