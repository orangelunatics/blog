## 浏览器 + 网络
## 输入url后的过程
先主要讲一下js、css、dom的[阻塞问题](https://www.cnblogs.com/caizhenbo/p/6679478.html)。  
此外还要注意查询ip时先查询本地hosts文件，以及最后的**格栅化**。  
  
1、dom解析时，遇见script标签会阻塞dom的解析及渲染(执行或者下载并执行js，这取决于内联还是外联)。解决办法：defer和async(从下载和执行两个角度对比)。所以js标签放在底部。  
![对比图](/blog/assets/img/defer&async.png)  
  
2、network里的蓝色线就是domContentLoaded事件触发的时间，红色线是load事件触发的时间，前者需要分情况，但总归都是dom解析完成时触发，即页面出现内容，可以拿到节点。load需要所有资源都加载完成后触发，包括图片。  
  
3、css的加载不阻塞dom解析，但是阻塞dom渲染，从两个树并行解析和浏览器性能优化角度可以分析。此外，css加载还会阻塞js的执行，js加载也会阻塞css解析和渲染。  
  
4、css放在head标签中的目的：如果放在body底部，会二次渲染，影响性能和用户体验。  
  
## Web Worker
**作用**：H5的API，创建Worker线程，在主线程执行任务的同时，Worker 线程也可以在后台执行它自己的任务，互不干扰。可以把高延迟、花费大量时间的运算，分给 Worker 线程，最后再把结果返回给主线程就可以了，因为时间花费多的任务被 Web Worker 承担了，主线程就会很流畅了。**比如浏览器中JS与UI共用一个线程，JS的大量计算有可能会阻塞UI渲染**。  
**场景**：当我们有些任务需要花费大量的时间，进行复杂的运算，就会导致页面卡死，可能用户点击页面需要很长的时间才能响应，因为前面的任务还未完成，后面的任务只能排队等待。对用户来说，这样的体验无疑是糟糕的。  
**使用**：  
```javascript
// 主线程使用new命令调用Worker()构造函数创建一个Worker线程
// Worker构造函数接收参数为脚本文件路径
var worker = new Worker('xxxxx.js')

// 主线成指定监听函数监听Worker线程的返回消息
worker.onmessage = function (event) {console.log(event.data)}// data为Worker发来的数据

// 由于主线程与Worker线程存在通信限制,不再同一个上下文中,所以只能通过消息完成
worker.postMessage("hello world")

// 当使用完成后，如果不需要再使用可以在主线程中关闭Worker
worker.terminate()
// Worker也可以关闭自身,在Worker的脚本中执行
self.close()

```
**缺点**：  
文件限制：Worker接受的脚本必须来自于网络，不能是本地。  
通信限制：两个线程不在一个上下文环境中，不能直接通信，要依赖消息队列即postMessage方法。  
DOM限制：Worker线程无法获取主线程所在的网页的DOM。  
跨域限制：Worker接收的脚本必须和主线程的脚本文件同源。  
此外：虽然Worker可以处理复杂js，但Worker本身以及与主线程的通信也是需要开销的，需要权衡。  
[补充](https://yrq110.me/post/front-end/introduction-to-web-worker/)  
  
## Web Socket  
[一种通信协议](http://www.52im.net/forum.php?mod=viewthread&tid=332)，初次认识是因为可以跨域。后续补充。
  
## 301与302
301：永久重定向。  
302：临时重定向。  
他们都会跳转到重定向的url，响应头都有location字段，表示最新的url。  
区别：  
①、301表示网页永久性地转移到另一个url。302是临时性地转移。  
②、302可能发生[url劫持](https://github.com/chenyongyang/blog/issues/43)(302保留原来的url，如果定向的url过于复杂，则会显示之前的url，但是网页内容是定向的网页内容，发生劫持)，并且很多时候被搜索引擎认为作弊，会导致降权。    
③、301会将域名的权重转移到新url，从而增加新url的权重。302不会转移权重。  
④、使用场景：301适用于想更换域名，告诉搜索引需要对新的域名进行收录。302适用于网站故障、维护、更新等情况。