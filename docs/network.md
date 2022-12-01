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
[一种通信协议](http://www.52im.net/forum.php?mod=viewthread&tid=332)，初次认识是因为可以跨域。后续补充。  
[掘金](https://juejin.cn/post/6844903544978407431#heading-12)
websocket 协议名字不一样 ws+wss，端口号和 http/s 一致，最大的优点是双向通信，可以服务端推送实时性更强、更好的二进制支持、较少的控制开销  
还有支持扩展。ws 协议定义了扩展，用户可以扩展协议，或者实现自定义的子协议。（比如支持自定义压缩算法等）  
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

PUT: 创建或者替换目标资源：用户的账户二维码只和用户关联，而且是一一对应的关系，此时这个 api 就可以用 PUT，因为每次调用它，都将刷新用户账户二维码；再比如防止重复提交订单。  
POST 方法 发送数据给服务器，也是可以更新或者创建资源：举个例子，在我们的支付系统中，一个 api 的功能是创建收款金额二维码，它和金额相关，每个用户可以有多个二维码，如果连续调用则会创建新的二维码，这个时候就用 POST  
put 和 post 区别: put 幂等、post 不幂等  
GET 和 POST 速度的区别：get 发送一个 tcp 数据包，post 发送两个 tcp 数据包

## Ajax 请求

1、xhr：① 原生、② 封装 xhr 的 jQ、③ 封装 xhr 的 axios。后两者都是基于 promise 的链式调用，但都是第三方的模块。  
2、fetch：原生的并且基于 promise，关注分离的设计模式(可以先看服务器是否连接上，然后再处理数据，也就是说并不是直接给数据)。缺点：兼容性差(ie 全系列都不行)。

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
补充：xhr.readyState:  
0: xhr 被创建，尚未调用 open() 方法。  
1：open() 方法已经被调用。可以通过 setRequestHeader() 方法来设置请求的头部， 可以调用 send() 方法来发起请求。  
2：send() 方法已经被调用，响应头也已经被接收。  
3：下载中，响应体部分正在被接收。  
4：数据传输已经彻底完成或失败。

## XSS

[详细](https://segmentfault.com/a/1190000016551188)  
1、对于转义、过滤，除了尖括号，还有 href 和 src 属性里的 javascript:进行过滤  
2、反射型和 DOM 型都是攻击者构造具有恶意代码的 url，区别是：反射型是请求 url 后，服务端将恶意代码取出，拼接成 html 后返回，前端再自动执行。  
DOM 型是后端返回后，前端取出恶意代码并执行。

## CSRF

1.referer 2.验证码 3.token  
补充：响应头 set-cookie 里的 samesite 属性，设置 lax 和 strict 都能防御 CSRF 攻击。默认为 lax。区别如下：  
lax：Cookies 允许与顶级导航一起发送，并将与第三方网站发起的 GET 请求一起发送。这是浏览器中的默认值。  
strict：Cookies 只会在第一方上下文中发送，不会与第三方网站发起的请求一起发送。  
none：Cookie 将在所有上下文中发送，即允许跨站发送。  
[第一方与第三方 cookie](https://cloud.tencent.com/developer/article/1888131)

## 跨站与跨域

[详细](https://alexzhong22c.github.io/2020/05/22/cross-origin-cross-site/)

## SYN Cookie

SYN FLOOD 是一种 DDOS(拒绝服务攻击)  
攻击者伪造 SYN 请求(攻击报文)建立连接，占用服务器资源  
SYN Cookie 同时也能实现 Fast Open  
SYN Cookie 技术可以让服务器在收到客户端的 SYN 报文时，不分配资源保存客户端信息，而是将这些信息保存在 SYN+ACK 的初始序号和时间戳中。对正常的连接，这些信息会随着 ACK 报文被带回来。

## 前端鉴权

[详细](https://mp.weixin.qq.com/s/rwp9sXi4Y8Ht0UbA6z4hSg)  
[掘金](https://juejin.cn/post/6845166891393089544)  
[cookie 与 samesite](https://github.com/mqyqingfeng/Blog/issues/157)  
简单 token 的组成： uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）  
安全性：token > session > cookie  
cookie 重要的属性：name=value、domain、path、maxAge、expires、secure、httpOnly、samesite  
**SameSite**(声明该 Cookie 是否仅限于第一方或者同一站点上下文。) 可以有下面三种值：  
Strict 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。  
Lax 允许部分第三方请求携带 Cookie  
None 无论是否跨站都会发送 Cookie

## 性能优化

[Yahoo](https://juejin.cn/post/6844903657318645767#comment)  
1、js：async defer、减少 dom 操作：减少重排重绘  
2、css: 选择器避免嵌套  
3、img: cdn、webp、base64、sprite，图片懒加载，预加载。  
4、网站的静态资源使用独立的域名：① 避免域名污染。 当浏览器向服务器请求一个静态资源时,会先发送同域名下的 cookie，服务器对于这些 cookie 不会做任何处理。因此它们只是在毫无意义的消耗带宽。所以你应该确保对于静态内容的请求是无 coockie 的请求。② 提高并发的 tcp 连接数量，每个域名下持久连接数是 6 个。③ 动静分离有利于 CDN  
5、减少 http 请求，base64，雪碧图等  
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
3、为什么 max-age 优先级高：expires 是绝对时间，依赖于计算机时钟的正确设置，不靠谱。所以采用相对时间。  
4、pragma 只有一个属性：Pragma: no-cache  
解释：与 Cache-Control: no-cache 效果一致。强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证。  
二、ETag 的强弱验证器  
弱验证器以/W 开头，表明内容发生了不那么重要的改变的时候，仍然可以用协商缓存

## 代理

正向代理：代理端代理的是客户端。如：VPN  
反向代理：代理端代理的是服务端。如：Nginx(nginx 代理跨域，实质和 CORS 跨域原理一样，通过配置文件设置请求响应头 Access-Control-Allow-Origin...等字段)  
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
2. 请求 header 是 accept、accept-language、content-language、content-type 并且值为这三个：application/x-www-form-urlencoded(窗体数据被编码为名称/值对。这是标准的编码格式)、multipart/form-data(窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分)、text/plain(窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符)

其他为非简单请求，要先进行预检(preflight、使用 OPTIONS 方法),"预检"请求的头信息包括两个特殊字段:

1. Access-Control-Request-Method 必选
2. Access-Control-Request-Headers 必选

## options method

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

证书=公钥+签名+申请者与颁发者信息，CA 证书中公钥合法性验证：

- 证书包含以下信息：申请者公钥、申请者的组织信息和个人信息、签发机构 CA 的信息、有效时间、证书序列号等信息的明文，同时包含一个签名；
- 签名的产生算法：首先，使用散列函数计算公开的明文信息的信息摘要，然后，采用 CA 的私钥对信息摘要进行加密，密文即签名；
- 客户端 C 向服务器 S 发出请求时，S 返回证书文件；
- 客户端 C 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA 的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即公钥合法；

## 长连接方案

1. 长轮询
