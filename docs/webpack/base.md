## webpack 基础

### webpack 构建流程

1. 初始化参数
2. 开始编译
3. 确定入口
4. 编译模块
5. 输出资源

### loader 和 plugin

1. 常见的 loader

- url-loader: 设置阈值，大于这个值的交给 file-loader 处理，小于这个值的对文件进行**base64 转换**
- file-loader: 一般用来处理图片和字体，把这些文件输出到一个文件夹中，代码中通过相对路径去引用文件
- img-loader: 加载并**压缩图片**
- ts-loader: ts 转换为 js
- babel-loader: 转译，比如 ES6 转换为 ES5。原理是将 ES6 代码编译为 AST，再将 AST 转化为新的 AST，再将新的 AST 转化为 ES5 代码
- sass-loader: sass/scss 转化为 css
- css-loader: 加载并压缩 css
- postcss-loader: postcss 是 css 的后处理器，比如给 css 代码添加浏览器前缀如-webkit-等
- eslint-loader: 通过 ESLint 检查 JavaScript 代码
- vue-loader：加载 Vue.js 单文件组件

2. 常见的 plugin

- html-webpack-plugin: webpack 打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中 —— **HTML**
- uglifyjs-webpack-plugin：压缩 JS，不支持 ES6 压缩(webpack4 之前) —— **JS**
- terser-webpack-plugin: 支持压缩 ES6 (Webpack4) —— **JS**
- mini-css-extract-plugin: 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。 —— **CSS**
- split-chunks-plugin: 进行 code-split
- webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积(从而进行优化，比如用类似功能的小体积 npm 包优化大体积 npm 包，dayjs 替换 momentjs)
- hot-module-plugin: 处理热更新
- dll-plugin

### source map

- 将打包后的代码映射回源代码，方便调试

### 热更新 HMR

- 简单说就是在开发时改变文件内容，不需要刷新浏览器但能自动更新

1. 浏览器和 webpack-dev-server(WDS)之间维护了一个 websocket
2. 本地资源变化时，WDS 主动向浏览器推送更新(构建时的 hash 值)
3. 客户端对比本次和上次的差异
4. 客户端对比差异后向 WDS 发起 ajax 请求获取更改的内容，返回的是一个包含了所有要更新的模块的 hash 值的 json 文件(获取更新列表)
5. 通过 JSONP 请求获取最新的模块代码
6. 对比新旧模块决定是否更新，如果更新则同时更新模块间的依赖引用关系

### 文件指纹

- 文件指纹是打包后输出的文件的**文件名后缀**(hash 值)，优点是充分利用缓存，有三种

1. 整个项目的 hash: 只要项目文件有修改，整个项目构建的 hash 值就会更改
2. chunkHash: 和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
3. contentHash: 和文件内容有关，不同内容不同 hash

- js 文件在配置文件 output 的 filename 设置，css 在 minicss-extract-plugin 设置

### 优化 webpack 构建速度

1. 使用高版本 webpack 和 node
2. 多进程/线程构建：thread-loader、child-process
3. 多进程并行压缩代码: terser-webpack-plugin 开启 parallel 参数
4. 图片压缩 image-laoder
5. 设置合理的代码分割(基础包、公共脚本分离等)
6. 缩小打包作用域，确定 loader 的作用范围
7. html-webpack-**externals**-plugin，将基础库从 cdn 引入，**不打包**
8. dll-plugin: 静态资源(不改动的资源)通过 dll 动态链接，**不重复打包**
9. 缓存：babel-loader 开启缓存、terser-webpack-plugin 开启缓存
10. tree-shaking
