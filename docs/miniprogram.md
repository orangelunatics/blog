## H5 与小程序有什么不同

简单来说：运行平台(小程序在部分 App 中)、开发成本(API 各厂不统一&小程序 API 不够丰富)、发布时间(H5 随时更新/小程序需要审核)，但 H5 要考虑不同浏览器的兼容性  
从技术上来说：  
1、渲染方式：程序一般是通过 Native 原生渲染的，但是小程序同时也支持 web 渲染，如果使用 web 渲染的方式，我们需要初始化一个 webview 组件，然后在 webview 中加载 h5 页面；  
注：小程序下，native 方式通常情况下性能要优于 web 方式。  
2、底层设计：小程序特有的双线程设计。h5 下我们所有资源通常都会打到一个 bundle.js 文件里（不考虑分包加载），而小程序编译后的结果会有两个 bundle，index.js 封装的是小程序项目的 view 层，以及 index.worker.js 封装的是项目的业务逻辑，在运行时，会有两条线程来分别处理这两个 bundle，一个是主渲染线程，它负责加载并渲染 index.js 里的内容，另外一个是 Service Worker 线程，它负责执行 index.worker.js 里封装的业务逻辑，这里面会有很多对底层 api 调用。