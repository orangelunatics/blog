## 浏览器 + 网络

## 输入 url 后的过程

先主要讲一下 js、css、dom 的[阻塞问题](https://www.cnblogs.com/caizhenbo/p/6679478.html)。  
此外还要注意查询 ip 时先查询本地 hosts 文件，以及最后的**格栅化**。

1、dom 解析时，遇见 script 标签会阻塞 dom 的解析及渲染(执行或者下载并执行 js，这取决于内联还是外联)。解决办法：defer 和 async(从下载和执行两个角度对比)。所以 js 标签放在底部。[defer 与 async](https://zh.javascript.info/script-async-defer)  
![对比图](/blog/assets/img/defer&async.png)

2、network 里的蓝色线就是 domContentLoaded 事件触发的时间，红色线是 load 事件触发的时间，前者需要分情况，但总归都是 dom 解析完成时触发，即页面出现内容，可以拿到节点。load 需要所有资源都加载完成后触发，包括图片。

3、css 的加载不阻塞 dom 解析，但是阻塞 dom 渲染，从两个树并行解析和浏览器性能优化角度可以分析。此外，css 加载还会阻塞 js 的执行，js 加载也会阻塞 css 解析和渲染。

4、css 放在 head 标签中的目的：如果放在 body 底部，会二次渲染，影响性能和用户体验。

## Web Worker

**作用**：H5 的 API，创建 Worker 线程，在主线程执行任务的同时，Worker 线程也可以在后台执行它自己的任务，互不干扰。可以把高延迟、花费大量时间的运算，分给 Worker 线程，最后再把结果返回给主线程就可以了，因为时间花费多的任务被 Web Worker 承担了，主线程就会很流畅了。**比如浏览器中 JS 与 UI 共用一个线程，JS 的大量计算有可能会阻塞 UI 渲染**。  
**场景**：当我们有些任务需要花费大量的时间，进行复杂的运算，就会导致页面卡死，可能用户点击页面需要很长的时间才能响应，因为前面的任务还未完成，后面的任务只能排队等待。对用户来说，这样的体验无疑是糟糕的。  
**使用**：

```javascript
// 主线程使用new命令调用Worker()构造函数创建一个Worker线程
// Worker构造函数接收参数为脚本文件路径
var worker = new Worker('xxxxx.js');

// 主线成指定监听函数监听Worker线程的返回消息
worker.onmessage = function(event) {
  console.log(event.data);
}; // data为Worker发来的数据

// 由于主线程与Worker线程存在通信限制,不再同一个上下文中,所以只能通过消息完成
worker.postMessage('hello world');

// 当使用完成后，如果不需要再使用可以在主线程中关闭Worker
worker.terminate();
// Worker也可以关闭自身,在Worker的脚本中执行
self.close();
```

**缺点**：  
文件限制：Worker 接受的脚本必须来自于网络，不能是本地。  
通信限制：两个线程不在一个上下文环境中，不能直接通信，要依赖消息队列即 postMessage 方法。  
DOM 限制：Worker 线程无法获取主线程所在的网页的 DOM。  
跨域限制：Worker 接收的脚本必须和主线程的脚本文件同源。  
此外：虽然 Worker 可以处理复杂 js，但 Worker 本身以及与主线程的通信也是需要开销的，需要权衡。  
[补充](https://yrq110.me/post/front-end/introduction-to-web-worker/)

## Web Socket

[为什么用这个](https://mp.weixin.qq.com/s/QBHMbSWSd4KU7TByRq2RRw)  
[一种通信协议](http://www.52im.net/forum.php?mod=viewthread&tid=332)，  
[掘金](https://juejin.cn/post/6844903544978407431#heading-12)
websocket 协议名字不一样 ws+wss，端口号和 http/s 一致，最大的优点是双向通信，可以服务端推送实时性更强、更好的二进制支持、较少的控制开销。还有支持扩展。ws 协议定义了扩展，用户可以扩展协议，或者实现自定义的子协议。（比如支持自定义压缩算法等）。也不受同源策略限制  
1、客户端发起升级协议请求 connection + update + Sec-WebSocket-Key  
2、服务端返回同意升级的响应 connection + update + Sec-WebSocket-Accept  
3、“Sec-WebSocket-Accept”头的值，返回给客户端。客户端收到这个之后，就会将通信协议 upgrade 到 websocket 协议  
4、开始以数据帧的格式进行客户端、服务端数据的交换  
5、用心跳实现连接的长时间保持  
前端定时发送心跳消息 ping，后端收到 ping 类型的消息，立马返回 pong 消息，告知前端连接正常。  
如果一定时间没收到 pong 消息，就说明连接不正常，前端便会执行重连。  
6、Sec-WebSocket-Key/Accept 的作用：提供基础的防护，保障 websocket 正确连接

## HTTP 状态码

101：协议升级。始终由客户端发起，并且服务器可能接受或拒绝切换到新协议。客户端可使用常用的协议(如 HTTP / 1.1)发起请求，请求说明需要切换到 HTTP/2 或甚至到 WebSocket。有请求头和响应头如 update: websocket  
204：服务端成功处理了请求，而不返回资源，页面也不更新。常用于只需要客户端向服务端进行发送数据。  
205：与 204 类似，不同的地方在于：要求客户端重置文档视图。常用于接受了用户的表单输入后，立即重置表单，以便进行下一次输入。  
206：客户端进行范围请求。比如迅雷下载将大文件分成多个文件同时下载，需要有 range 请求头描述范围。  
301：永久重定向。  
302：临时重定向。  
他们都会跳转到重定向的 url，响应头都有 location 字段，表示最新的 url。  
区别：  
①、301 表示网页永久性地转移到另一个 url。302 是临时性地转移。  
②、302 可能发生[url 劫持](https://github.com/chenyongyang/blog/issues/43)(302 保留原来的 url，如果定向的 url 过于复杂，则会显示之前的 url，但是网页内容是定向的网页内容，发生劫持)，并且很多时候被搜索引擎认为作弊，会导致降权。  
③、301 会将域名的权重转移到新 url，从而增加新 url 的权重。302 不会转移权重。  
④、使用场景：301 适用于想更换域名，告诉搜索引需要对新的域名进行收录。302 适用于网站故障、维护、更新等情况。  
502：bad gateway 连接超时，服务器压力大  
401：客户端的访问未经授权

## HTTP method

- PUT: 创建或者替换目标资源：用户的账户二维码只和用户关联，而且是一一对应的关系，此时这个 api 就可以用 PUT，因为每次调用它，都将刷新用户账户二维码；再比如防止重复提交订单。
- POST 方法 发送数据给服务器，也是可以更新或者创建资源：举个例子，在我们的支付系统中，一个 api 的功能是创建收款金额二维码，它和金额相关，每个用户可以有多个二维码，如果连续调用则会创建新的二维码，这个时候就用 POST
- put 和 post 区别: put 幂等(调用一次与连续调用多次是等价的,防止重复提交)、post 不幂等(将一个订单重复提交多次)
- GET 和 POST 区别：

1. get 获取数据，post 上传数据
2. get 发送一个 tcp 数据包，post 发送两个 tcp 数据包(先发送 header，再发送数据)，所以 get 会快一些
3. get 幂等，post 不幂等
4. get 没有请求体
5. get 数据在 url 中，有长度限制且不安全，post 数据在请求体中，没限制且安全

- HEAD 方法：返回和 GET 方法同样的响应头，但没有响应体
- OPTIONS 方法：返回获取该资源时支持的 HTTP 方法；CORS 非简单请求判断是否支持跨域(服务器所返回的 Access-Control-Allow-Methods 首部字段将所有允许的请求方法告知客户端)

## Ajax 请求

1、xhr：① 原生、② 封装 xhr 的 jQ、③ 封装 xhr 的 axios。后两者都是基于 promise 的链式调用，但都是第三方的模块。  
2、fetch：原生的并且基于 promise，关注分离的设计模式(可以先看服务器是否连接上，然后再处理数据，也就是说并不是直接给数据)。缺点：兼容性差(ie 全系列都不行)。

- fetch 只对网络请求报错，对 400，500 都当做成功的请求，需要封装去处理
- fetch 默认不会带 cookie，需要添加配置项 credentials
- fetch 的跨域设置较简单，配置中设置 mode: no-cors 即可

```js
//使用async和await的版本，更加简洁，同步表示异步。注意response.json()返回的是promise实例
//外部需要配合async使用
try {
  const response = await fetch(`/api1/search/users2?q=${keyWord}`);
  const data = await response.json();
  console.log(data);
  PubSub.publish('atguigu', { isLoading: false, users: data.items });
} catch (error) {
  console.log('请求出错', error);
  PubSub.publish('atguigu', { isLoading: false, err: error.message });
}
```

## UDP 与 TCP

## headers

1、Access-Control-Allow-Credentials(和 cookie 有关): 响应头表示是否可以将对请求的响应暴露给页面。返回 true 则可以，其他值均不可以。  
2、host: 请求头指明了请求将要发送到的服务器主机名和端口号。  
3、referer：表明请求来源的地址，包括协议域名端口、路径参数。常用于防范 csrf(比如恶意网站里的一个表单)。  
4、origin：同上，但只包括协议域名端口。常用于跨域 cors。  
5、Connection：决定当前的事务完成后，是否会关闭网络连接。如果该值是“keep-alive”，网络连接就是持久的，不会关闭，使得对同一个服务器的请求可以继续在该连接上完成。还如 Connection:Upgrade。  
6、Content-type：post 或 put 方法设置数据类型  
发送 json 格式数据：xhr.setRequestHeader("Content-type","application/json; charset=utf-8");  
发送表单数据：xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");  
发送纯文本：xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");  
发送 html 文本：xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");  
其余还有 image/gif ; image/jpeg; image/png  
7、Content-Encoding: gzip(nginx 中配置)  
补充：xhr.readyState:  
0: xhr 被创建，尚未调用 open() 方法。  
1：open() 方法已经被调用。可以通过 setRequestHeader() 方法来设置请求的头部， 可以调用 send() 方法来发起请求。  
2：send() 方法已经被调用，响应头也已经被接收。  
3：下载中，响应体部分正在被接收。  
4：数据传输已经彻底完成或失败。

## XSS

### 恶意脚本的危害

1. document.cookie 拿到 cookie 后模拟登录(用 xhr 或者 fetch 通过 cors 发送给攻击者的服务器)
2. 监听键盘事件拿到银行卡信息
3. 修改 dom 伪造假的登录窗口，欺骗用户名和密码
4. 页面内生成广告，影响用户体验

### 脚本注入方式

1. 存储型 XSS 攻击

- a.黑客先将恶意代码提交到网站数据库(所以是存储型),b.用户请求包含恶意代码的页面,c.被 xss 攻击

2. 反射型 XSS 攻击

- a.用户点击 qq 群或邮件的恶意链接,b.web 服务器收到请求后又将恶意代码反射给了浏览器端(服务器不需要存储恶意代码)

3. DOM 型 XSS 攻击

- 在 web 资源传输过程或用户使用页面的过程中修改 web 页面的数据(与 web 服务器无关)。可能通过 wifi 路由器或本地恶意软件劫持从而实现的

### 阻止 XSS

存储型和反射型都和 web 服务器有关，因此属于服务器漏洞。而 DOM 型 XSS 攻击都是在浏览器端完成，因此属于前端安全漏洞

1. 服务端对关键字符进行过滤或转义
2. 利用 CSP 策略，限制其他域的脚本加载
3. 给 cookie 设置 HttpOnly
4. 针对存储型和反射型攻击，由于他们都是把恶意代码拼接到 html 中并返回给客户端，因此可以改为纯前端渲染，比如使用 Vue 和 React 框架
5. 针对 DOM 型攻击，要避免使用 innerHTML 等写法，因为可能会执行内部的 script
6. 还可以限制输入的文本长度
7. 重要操作设置验证码

## CSRF

### 原因

利用用户的登录状态，通过第三方站点危害用户信息安全，与 xss 不同的是，csrf 不需要将恶意代码注入到网页中，仅仅利用服务器漏洞和用户的登录态进行攻击，因此三个必要条件是：

1. 目标站点有 csrf 漏洞
2. 此时有目标站点的用户登录态
3. 用户打开一个第三方站点，比如黑客网站

注意：黑客无法通过 csrf 攻击获取用户页面数据，因此主要防护手段是提升服务器的安全性

### 防范

1. 设置 cookie 的 samesite 属性为 strict(禁止所有第三方 cookie)或者 lax(允许点击链接或 get 表单的第三方 cookie 发送)
2. 设置 origin 或 referer 请求头。其中 origin 不包含路径，referer 包含路径，服务器判断的优先级是先判断 origin
3. 设置 csrf token，可以放在请求 header 中，由于同源策略的限制，第三方站点拿不到存储在前端的 token 值，因此服务端认为这次请求无效(也可以 cookie 和 header 都有 csrf token，服务端比较是否一致从而验证)

## 跨站与跨域

[详细](https://alexzhong22c.github.io/2020/05/22/cross-origin-cross-site/)

## SYN Cookie

SYN FLOOD 是一种 DDOS(拒绝服务攻击)  
攻击者伪造 SYN 请求(攻击报文)建立连接，占用服务器资源  
SYN Cookie 同时也能实现 Fast Open  
SYN Cookie 技术可以让服务器在收到客户端的 SYN 报文时，不分配资源保存客户端信息，而是将这些信息保存在 SYN+ACK 的初始序号和时间戳中。对正常的连接，这些信息会随着 ACK 报文被带回来。

## 前端鉴权

鉴权的原因是 HTTP 无状态！
[详细](https://mp.weixin.qq.com/s/rwp9sXi4Y8Ht0UbA6z4hSg)  
[掘金](https://juejin.cn/post/6845166891393089544)  
[cookie 与 samesite](https://github.com/mqyqingfeng/Blog/issues/157)

- session：种在 cookie 上(sessionId)、数据存在服务端
- token: 通常基于 base64，或增加加密算法防篡改，jwt 是一种成熟的编码方案。只需要校验 token 的有效性，因此不需要在服务端存数据。客户端把 token 存哪都行、数据存在 token 里；一般两种用法：放在 cookie 里(容易 CSRF)、放在 Authorization(header)，但是存的时候也可以存在 storage 里
- 简单 token 的组成： uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）
- session 和 token 区别：「客户端种在 cookie 里/种在其他地方；服务端存数据/不存」
  1. 存 cookie 里的问题：~~脱离浏览器则不行~~容易引发 csrf 问题；cookie 自动带上，每个同域名下的请求都有，造成流量的浪费，比如静态资源不需要鉴权，因此静态资源可以用其他域名
  2. 服务端存数据(session 方案)：因为服务端通常是集群，请求要经过负载均衡，流量不一定打到哪个机器上，因此要存在 Redis 或普通数据库中。而 token 方案不需要存数据，因此不需要考虑数据的分布式存储问题，降低了硬件成本，降低查库带来的延迟。
- 单点登录：
  1. 同父域名的单点，设置 domain 即可共享 cookie
  2. 不同域名的单点：一次登录，全线通用，通常由独立的单点登录(SSO) 系统记录登录状态、下发 ticket，各业务系统配合存储和认证 ticket

安全性：token > session > cookie  
cookie 重要的属性：name=value、domain、path、maxAge、expires、secure、httpOnly、samesite  
**SameSite**(声明该 Cookie 是否仅限于第一方或者同一站点上下文。) 可以有下面三种值：  
Strict 仅允许第一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。  
Lax 允许第三方 get 请求携带 Cookie 和同站(第一方)请求携带 cookie  
None 无论是否跨站都会发送 Cookie

## 性能优化

![Yahoo](/blog/assets/img/optimize.webp)  
1、js：async defer，减少 dom 操作(减少重排重绘)，避免使用行内事件  
2、css: 选择器避免嵌套过多层，link 替代@import，样式写在 head 里  
3、img: cdn、webp、base64、sprite，雪碧图，图片懒加载，预加载，图片设置 alt 属性  
4、网站的静态资源使用独立的域名：① 避免域名污染。 当浏览器向服务器请求一个静态资源时,会先发送同域名下的 cookie，服务器对于这些 cookie 不会做任何处理。因此它们只是在毫无意义的消耗带宽。所以你应该确保对于静态内容的请求是无 coockie 的请求。② 并发 tcp 连接数量有限，每个域名下持久连接数是 6 个(http1)。③ 动静分离有利于 CDN  
5、减少 http 请求，升级 http2(各种好处)，服务端启用 gzip，配置 Etag 协商缓存  
注：Base64 是以编码的形式嵌入到页面，而不是外部载入，所以可以减少 http 请求(前提：图片很小，如果大图片则转码后体积更大得不偿失)  
6、ssr 服务端渲染，首屏时间快  
7、节流防抖  
8、包的大小：  
第三方库用 cdn 引入，external-plugin；  
compression-webpack-plugin 开启 gzip 压缩；  
terser-webpack-plugin 压缩 js；  
split-Chunks-plugin 分包([code split](https://webpack.docschina.org/guides/code-splitting/)),把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级  
dll-plugin 把复用性较高的第三方模块打包到动态链接库中，在不升级这些库的情况下，动态库不需要重新打包，每次构建只重新打包业务代码

## 应用层与传输层

HTTP 是属于应用层的协议，最终的数据传输还是要通过传输层（比如常见的 TCP、UDP）传输。HTTP/1.1 和 HTTP/2 的传输是通过 TCP，HTTP/3 是通过 QUIC（基于 UDP）传输。  
不管是 TCP 还是 QUIC，实际上都是通过 byte[] 字节流的方式在网络上传输的。在应用层 HTTP 通过编码（encode）把文件、图片、JSON 等转换成 byte[]，经过传输层（TCP、UDP）传给目标地址。然后目标地址接收到 byte[] 数据后，再解码（decode）成对应的对象。

## 缓存相关补充

一、强缓存：max-age 和 expires 和 pragma  
1、max-age 是 cache-control(强缓存)header 中的一个 key，其他两个都是单独的 key。  
注：cookie 里既有 max-age 也有 expires  
2、优先级问题：从高到低  
3、为什么 max-age 优先级高：expires 是绝对时间，依赖于计算机时钟的正确设置(可能前后端时间不一致)，不靠谱。所以采用相对时间。  
4、pragma 只有一个属性：Pragma: no-cache  
解释：与 Cache-Control: no-cache 效果一致。强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证。  
二、ETag 的强弱验证器  
弱验证器以/W 开头，表明内容发生了不那么重要的改变的时候，仍然可以用协商缓存

## 代理

正向代理：代理端代理的是客户端。如：VPN  
反向代理：代理端代理的是服务端。如：Nginx(解决跨域实质和 CORS 跨域原理一样，通过配置文件设置请求响应头 Access-Control-Allow-Origin...等字段)  
Nginx 解决跨域：
客户端的域名为 client.com，服务器的域名为 server.com

```js
server {
  listen  80;
  server_name  client.com;
  location /api {
    proxy_pass server.com;
  }
}
```

Nginx 服务器的域名也为 client.com，当请求某个接口时，Nginx 进行代理转发，请求真实的服务器域名，拿到响应返回给客户端。
[其他的跨域方法](https://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html#m1)

## JSONP

- 利用 script 标签(本质是 src 可跨域)的 get 请求执行回调进行跨域，缺点：只能 get、不像 cors 会在浏览器报错、安全性差。基本不怎么用了...
- 请求 jsonp 之前就定义好回调函数 cb，后端返回的是调用 cb 函数的 js 代码(json padding)，浏览器加载这段代码后立即执行

```js
const jsonp = (url, data, callback = 'callback') => {
  let str = url.indexOf('?') === -1 ? '?' : '&';
  for (const key in data) {
    str += `${key}=${data[key]}&`;
  }
  url = url + str + 'callback=callback';

  const jsonpScript = document.createElement('script');
  jsonpScript.src = url;
  document.body.appendChild(jsonpScript);

  return new Promise((resolve, reject) => {
    window[callback] = (res) => {
      try {
        resolve(res);
      } catch (e) {
        reject(e);
      } finally {
        jsonpScrip.parentNode.removeChild(script);
      }
    };
  });
};
jsonp('xx.com', { x: 'xx' }).then((res) => {
  console.log(res);
});
```

## CORS

请求头添加 origin 表明来源，服务器根据这个值，决定是否同意这次请求(响应头 Access-Control-Allow-Origin)。  
简单请求满足两个要求：

1. 请求方法为 get、post、head
2. 请求 header 除了被用户代理自动设置的 header 之外(connection\[keep-alive\],user-agent 等)，只能是这些： accept(告知服务器本次请求的资源类型)、accept-language、content-language、content-type 并且值为这三个：application/x-www-form-urlencoded(常见于表单，窗体数据被编码为名称/值对。这是标准的编码格式)、multipart/form-data(常见于表单，窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分)、text/plain(窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符)

- 其他为非简单请求，要先进行预检(preflight、使用 OPTIONS 方法),"预检"请求的头信息包括两个特殊字段:

1. Access-Control-**Request**-Method 必选，告知服务器本次的请求方法
2. Access-Control-**Request**-Headers 必选，告知服务器本次的请求头
3. 响应头为：Access-Control-**Allow**-Methods

### options method

1. 检测服务器所支持的请求方法
2. cors 预检

## iframe

1. 展示广告(样式隔离之类的优势)
2. 解决跨域，包括和 document.domain、location.hash、window.name、postMessage 搭配使用
3. 形成沙箱，比如 figma 插件是 iframe 和 postMessage 结合使用实现的
4. 用来实现长连接(ws 出现之前)

<!-- ## 二维码登录流程

1. 一般用轮询的方式，[流程如下](https://cloud.tencent.com/developer/article/1893465)：
   ![qrcode](/blog/assets/img/qrcode.png) -->

## HTTPS

证书=公钥+签名+申请者与颁发者信息，CA 证书中公钥合法性验证，关键词：签名，摘要，证书

- 证书包含以下信息：申请者公钥、申请者的组织信息和个人信息、签发机构 CA 的信息、有效时间、证书序列号等信息的明文，同时包含一个签名；
- 签名的产生算法：首先，使用散列函数计算公开的明文信息的信息摘要，然后，采用 CA 的私钥对信息摘要进行加密，密文即签名；
- 客户端 C 向服务器 S 发出请求时，S 返回证书文件；
- 客户端 C 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA 的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即公钥合法；

## Chrome 开发者工具

持续补充中

### network timing

单个资源的生命周期，配合 performance.timing 使用

1. Queueing（队列）：排队的时间花费。可能由于该请求被渲染引擎认为是优先级比较低的资源（图片）、服务器不可用、超过浏览器并发请求的最大连接数（在 HTTP1 中 Chrome 的最大并发连接数是 6-8），解决方法：多个子域名提供服务资源，将资源拆分到多个子域中，均匀分配。HTTP2 之后由于没有并发限制因此这个方法不适用
2. Stalled（阻塞，卡顿）：Queueing 完成后，准备发出请求 ——> 实际发出请求消耗的时间。浏览器准备要发出这个请求，但由于一些情况不能发出请求指令，例如此刻没有可复用的 TCP 链接
3. Proxy negotiation：与代理服务器连接的时间花费
4. DNS Lookup(DNS 查找)
5. Initial connection(初始化连接): TCP 三次握手
6. Request sent：发送 HTTP 请求的时间（从第一个字节发出前到最后一个字节发出后的时间
7. TTFB(Time To First Byte)：发送请求完毕到接收请求的第一个字节的时间 影响因素：线路、服务器距离、后台服务性能，MySQL 查询等
8. Content Download：资源下载时间 影响因素：资源大小、是否使用缓存

### performance 指标

![performance](/blog/assets/img/perform.awebp)
常见指标：

1. FP（First Paint），首次绘制：这个指标用于记录页面第一次**绘制像素**的时间。
2. FCP（First Contentful Paint），首次内容绘制：这个指标用于记录页面**首次绘制文本、图片**、非空白 Canvas 或 SVG 的时间。注意：**FP 一定小于 FCP**
3. LCP（Largest Contentful Paint），最大内容绘制：在渲染过程这个最大内容可能改变，并且重要程度大于 FP 和 FCP
4. TTI（Time to Interactive），首次可交互时间：条件如下

- 从 FCP 指标后开始计算
- 持续 5 秒内无**长任务（执行时间超过 50 ms）**且无两个以上正在进行中的 GET 请求
- 往前回溯至 5 秒前的最后一个长任务结束的时间

5. FID（First Input Delay）,首次输入延迟: ，记录在 FCP 和 TTI 之间用户首次与页面交互时响应的延迟。
6. TBT（Total Blocking Time）,总阻塞时间
7. CLS（Cumulative Layout Shift），累计位移偏移

三大核心指标：LCP、FID、CLS  
获取指标：

1. lighthouse
2. 其他库(API 计算)

## HTTP2 与 HTTP3

[手册](https://tsejx.github.io/javascript-guidebook/computer-networks/http/http2/)
