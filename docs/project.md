## 项目实践

### 论文与专利

1、[与前端相关的深度学习论文](https://herasu.github.io/2019/10/30/%E4%B8%80%E7%A7%8D%E5%BF%AB%E9%80%9F%E3%80%81%E4%B8%8D%E5%8C%BA%E5%88%86%E6%A0%BC%E5%BC%8F%E7%9A%84%E6%A3%80%E6%B5%8B%E6%81%B6%E6%84%8FWeb%E5%86%85%E5%AE%B9%E7%9A%84%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95/)  
包括其他的文章也不错  
2、2022 年 1 月投了一篇深度学习的中文核心，一个月修改后录用  
刘之航, 钟玉华. 基于 CNN-BiLSTM 的可解释性轴承故障诊断[J]. 组合机床与自动化加工技术, 2022.  
3、2022.5 投了一篇国内会议  
刘之航, 钟玉华, 李巍华, 陈祝云. 基于改进梯度权重类激活映射的一维卷积可解释性研究[C]. ~, 2022.  
4、2021.12 发明专利录用 深度学习可解释性

### 日常项目

1、three.js 开发跳一跳微信小游戏

<ul>
  <!-- <li>6.10字節三面 面試官是Vue-element-admin作者</li> -->
  <!-- <li>6.13短暫地看了pro git；開始Vue3+Koa的後台管理系統開發</li> -->
  <!-- <li>抽時間做一個tf.js的CNN demo</li> -->
  <!-- <li>Fiber</li> 
  <li>hooks + composition</li>
  <li>Vue3 + vite</li>
  <li>webpack</li>
  <li>node项目</li>
  <li>miniApp + show + dev</li> -->
  <li>继续vx小游戏的开发实践——跳一跳。vx小游戏特点：借助小程序平台、轻量级。较多使用3.js，原生的webgl开发效率低、没有封装</li>
  <li>了解webGL渲染管线</li>
  <li>vx小游戏的优点：微信平台流量大、轻量级(不用单独安装app)、随项目深入理解webGL+可视化的内容、微信底层对小游戏进行了性能优化(哪些优化？)</li>
  <li>three.js封装了webGL，相当于Vue之于JS。webGL:提供使浏览器具有产生3D场景能力的接口(调用GPU)</li>
</ul>

[着色器语法：GLSL ES，是一种类 C 语言](https://chenpipi.cn/post/shader-quickstart-glsles-1/)  
[WebGLProgram](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLProgram)

```js
/**
 * webGL的一个Demo
 * 上下文、创建程序、创建着色器、给程序添加着色器、连接程序与上下文
 */
// 获取画布
const canvas = document.getElementById("myCanvas");
// 获取3d上下文(webgl)
const gl = canvas.getContext("webgl");
// 创建程序
const program = gl.createProgram();

const createShader = (gl, sourceCode, type) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);
  return shader;
};
// 创建顶点着色器和片元着色器
// var vertexShader, fragmentShader;
const vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER);
// 添加着色器
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
// 连接webgl上下文和程序program
gl.linkProgram(program);
gl.useProgram(program);
gl.program = program;
```

### 开发效率工具

tabnine 和 copilot

### 开发流程

1、后端开发：  
理解需求、关键功能技术评审、设计表结构、设计接口文档、接口功能实现、接口联调自测提测  
2、mock  
地址前缀: http://localhost:3000/api

### 软考高项

考试题型：  
<b>(注意练字)</b>

<ul>
  <li>综合知识：75道选择题(涂卡)，包括IT知识、项目管理知识、时事新闻、运筹学、英语题</li> 
  <li>案例分析：3道题*25分，问答(理论)题和计算题，前者包括找错、改错、选择、填空、判断、默写；后者包括画图、计算、默写</li>
  <li>论文：二选一(不要背范文)，背景500字、过渡200字、过程1200字、结尾300字，一共2k-2k5b字，背景、过渡和结尾这三部分都是要提前背好的，过程部分也要背一部分，所以到考场只要发挥5-600字</li>
</ul>

<!-- 4.28 第一章 信息化与信息系统 -->
