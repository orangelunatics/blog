## others

## git

1、git pull  
用于从远程获取代码并合并本地的版本。  
git pull 其实就是 git fetch 和 git merge FETCH_HEAD 的简写。  
2、git stash  
把当前分支的更改暂存到缓冲区。实际开发很常用，比如正在写需求，群里突然说之前有个 bug 需要改...  
改好之后，就可以 pop 出来，再清除缓存的记录即可。

## npm

[千锋 node 文档](https://lurongtao.gitee.io/felixbooks-gp19-node.js/basics/01-Node.js%E5%9F%BA%E7%A1%80.html)  
1、npm 与 npx 区别：  
对于 node_modules 中安装的模块，全局中没有安装，这时不能使用 npm，而 npx 会优先寻找当前项目的 node_modules，如果没有，会自动安装

2、nvm

3、npm  
Node Package Manager node.js 的包管理工具 包就是模块

4、npm 命令简写  
npm install 和 npm i 是一样  
--save 和 -S 是一样  
--save-dev 和 -D 是一样的  
-S, --save 安装包信息将加入到 dependencies（生产阶段的依赖,也就是项目运行时的依赖，就是程序上线后仍然需要依赖, 开发和生产都需要）  
-D, --save-dev 安装包信息将加入到 devDependencies（开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作业的）

5、package-lock.json  
作用：锁定版本+显示模块的依赖关系  
不同环境拉取同一个项目的依赖保证了版本的一致性。

6、npm i --production  
作用：只安装 dependencies 即生产环境下的包的 node_modules 而不安装 devDependencies 即开发环境下的包

7、npm view 模块名字 versions  
查看包的所有版本 然后想更换版本可直接输入 npm i jquery@3.5.1 -S

8.版本号前面的^ eg:"stylus": "^0.54.8",  
node package 的版本号解析：0.54.8  
① 主版本号(大更新)major:0, 次版本号(添加功能)minor:54, 补丁(修 bug)patch: 8  
②^表示在进行包的安装 npm install 或升级时 npm update，只锁定主版本号，次版本号和补丁号升级为主版本号下的最新值  
③~表示锁定主版本号和次版本号，patch 取最新  
④ 如果前面不加符号，则安装时锁定所有版本  
⑤ 不写版本号而是以\*代替，则是安装最新版本  
⑥ 对于 node_modules 安装时出错，可以清楚缓存 npm cache clean --force

9、node 模块  
① 内置模块：path、http、fs 等 模块有自身的方法  
② 第三方模块：jq、react、vue、express、axios 等  
③ 自定义模块：代码见本地 新练习 code-node-custom，步骤 npm init -y 生成 package.json, 还需要一个 js 文件用来写逻辑, 注意 js 文件名字要和 package.json 中的 main 字段的名字一致, 用来向外暴露 js 逻辑(这里需要模块化的知识如 commonJS), 比如要引用 lodash,则需要引入这个包；下一步是发布包  
步骤：npm adduser(注意切换到 npm 源)、npm publish  
出错原因可能是包重名或邮箱未验证

10、npm 源  
查看源： npm config get registry  
切换源： npm config set registry url

## 模块化规范

### 优点

1、避免命名冲突  
2、更好地分离，按需加载  
3、复用性高  
4、维护性好

### 分类(发展史)

1、单例模式(设计模式)  
利用立即执行函数和闭包，将对象暴露出来，供其他地方使用。缺点：项目复杂之后，JS 的导入关系也极其复杂。  
2、AMD 规范(requireJS)  
专用于浏览器端，异步加载模块。缺点：依赖前置，非按需加载。  
暴露模块：define 方法  
引入模块：require 方法  
3、CommonJS  
在服务器端，模块的加载是运行时同步加载的(服务端读取快)；在浏览器端(不能直接在浏览器端执行，这是缺点)，模块需要提前编译打包处理(因为浏览器不认识 CommonJS 语法如 require)，优点：不用依赖前置，用的时候再导入即可。  
暴露模块：module.exports = value / exports.xxx = value。暴露的本质是 exports 对象。第一种暴露是把 value 赋给了 exports 对象，第二种是添加属性。  
引入模块：① 内置模块(如 url、http)或第三方模块直接 require(模块名字)② 自定义模块要 require(模块文件相对路径)  
browserify  
4、CMD 规范(seaJS)(淘系)  
基于 CommonJS，使其能用于浏览器端，异步加载模块。(按需加载)  
5、ES6(应用最广泛,浏览器和服务器通用的模块解决方案)  
浏览器端开启 ES6Module，script 标签需要加上 type="module",并且需要基于 HTTP/HTTPS 等标准 Web 协议访问页面。  
使用 Babel 将 ES6 转化为浏览器可识别的 ES5，但还包含 require 语法，所以还需要 browserify(babel 还可以将 jsx 转化为 js)  
暴露模块：export ① 分别暴露 ② 统一暴露 ③ 默认暴露  
引入模块：import ① 通用方式 import \* as xx from 'path' ② 解构赋值 ③ 简便形式 import xx from '路径'只能用于默认暴露的情况。  
缺点：由于 import 是静态执行，所以不能使用表达式和变量这些只有在运行时才能得到结果的语法结构。

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

6、ES6 模块与 CommonJS 模块的差异  
①CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。  
②CommonJS 模块是运行时加载(动态加载)，ES6 模块是编译时加载(静态加载，且效率高)，所以 import 命令有变量提升(这种行为的本质是，import 命令是编译阶段执行的，在代码运行之前)。

## 操作系统

### 死锁

[1、对于教材里死锁定义的补充](https://www.zhihu.com/question/263380756)

## 设计模式

### 职责链模式

[12. 整数转罗马数字](https://leetcode-cn.com/problems/integer-to-roman/)  
从这道题的官解和普通解之间的对比，可以更好地理解职责链模式，该模式可以解决面条式代码。

### 单例模式

保证系统中，应用该模式的类一个类只有一个实例，即一个类只有一个对象实例

```js
// 文件1
class F {}

function judge() {
  let f = null;
  return () => {
    if (!f) {
      f = new F();
    }
    return f;
  };
}
export default judge();

// 文件2
import jg from "./judge.js";

const a = jg();
console.log(a);
const b = jg();
console.log(a === b);
```

## 计算机基础

1、二进制表示  
① 正负数用补码来表示，正数的补码就是原码；负数的补码是正数的原码的反码再加 1。也适用(n & 1) === 0 来看奇偶。  
② 二进制转十进制是求幂，十进制转二进制是求余数再反过来拼接到一起。

## 正则表达式

1、匹配手机号

```js
const tel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
<<<<<<< HEAD
```  
2、\w与\W  
小写\w：匹配包括下划线的任何单词字符。等价于“[A-Za-z0-9_]”。  
大写\W：匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。  
=======
```

2、\w 与\W  
小写\w：匹配包括下划线的任何单词字符。类似但不等价于“[A-Za-z0-9_]”，这里的"单词"字符使用 Unicode 字符集。  
大写\W：匹配任何非单词字符。等价于“[^a-za-z0-9_]”。

## CDN

内容分发网络，优势：  
1、距离最近的服务器进行相应 降低页面响应时间  
2、前端性能优化，实际项目里的静态资源比如图片就存储在 cdn 上  
3、cdn 不仅可以缓存资源，并且某个服务器瘫痪，可以有其他服务器进行响应  
4、域名不能和源站一致：用户访问加速域名的网站资源，当 CDN 节点上没有缓存对应的内容时，CDN 节点会回到源站获取，然后再返回给用户。如果源站域名与加速域名一致，将会造成访问请求反复解析到 CDN 节点，导致 CDN 节点无法回源拉取请求内容。

## 懒加载/无限滚动

已知有三种实现方法，但原理都是相同的，即判断待加载图片的盒子是否出现在视口中。
法一：利用 offset、client、scroll 等属性

```js
window.scroll = () => {if (document.documentElement.scrollTop + document.documentElement.clientHeight > div.) loadImg(div)}
```

法二：Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。

```js
// 大概思路
// 返回值是个对象
const obj = div.getBoundingClientRect();
// if (obj.top < window.innerHeight)
window.scroll = () => {
  if (obj.top < document.documentElement.clientHeight) loadImg(div);
};
```

法三：new intersectionObserver() 自带了节流效果 利用 intersectionRatio > 0 来懒加载
>>>>>>> 9a4e5430e0a79d78c2b3e52205f025cde7097a08
