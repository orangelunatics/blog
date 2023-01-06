## others

## git

[pro git 文档](https://gitee.com/progit/3-Git-%E5%88%86%E6%94%AF.html#3.5-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)  
1、git pull  
用于从远程获取代码并合并本地的版本。  
git pull 其实就是 git fetch 和 git merge FETCH_HEAD 的简写。  
2、git stash  
把当前分支的更改暂存到缓冲区。实际开发很常用，比如正在写需求，群里突然说之前有个 bug 需要改...  
改好之后，就可以 pop 出来，再清除缓存的记录即可。  
3、rebase 衍合与 merge 合并区别：  
merge: git 自动找到最佳的位置生成新的结点进行合并，git 分支仍然为两条，git 流程不清晰  
rebase: 根据当前分支 1 后续的历次提交对象，生成一系列文件补丁，然后以基底分支（也就是主干分支 master）最后一个提交对象为新的出发点，逐个应用之前准备好的补丁文件，最后会生成一个新的合并提交对象，从而改写当前分支 1 的提交历史，使它成为 master 分支的直接下游，优点：git 流程清晰  
注：  
· rebase 不是复制之前的 feature commit，而是产生新的 commit hash 值  
· rebase 还经常用来合并 commit~  
4、git pull --rebase：用于多人开发同一分支  
5、git log --oneline: git log 的简洁版本  
6、git log --graph --oneline --decorate：看 graph 图  
7、git add 的各种区别

- git add . **当前目录**下的所有变更
- git add --all/-A (gaa) **当前项目**的所有变更
- git add -u 不包括新增文件
- git add \* **当前目录**下的所有变更，不包括.开头文件

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
[其他](https://www.cnblogs.com/luowen075/p/10362540.html)

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

## ESLint 与 Prettier

前者是代码格式检查+js 文件的部分格式化、后者专注于格式化且不局限于 js 文件, 搭配使用  
[详细](https://www.cnblogs.com/guangzan/p/14057876.html)

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
注意：浏览器端想直接用 import, 记得在引入 script 标签的时候加上 type='module'

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
①CommonJS 模块输出的是一个值的拷贝(有缓存)，ES6 模块输出的是值的引用。  
②CommonJS 模块是运行时加载(动态加载)，ES6 模块是编译时(解析时)加载(静态加载，且效率高)，所以 import 命令有变量提升(这种行为的本质是，import 命令是编译阶段执行的，在代码运行之前)。
③ 对于简单类型和复杂类型的问题：[详细](https://github.com/YvetteLau/Step-By-Step/issues/43#issuecomment-509229722)  
commonjs 虽然是拷贝，但复杂对象是浅拷贝，修改源数据会影响引入后的数据; esm 虽然是引用，但对于默认导出而言，源文件(导出的文件)里修改简单类型的数据时，并不会影响引入后的数据，可以想成 赋值给 default 之后，只读引用与 default 关联，此时基础类型的变量的任何修改都与 default 无关

## 操作系统

### 死锁

1. 互斥条件：一个资源每次只能被一个进程使用。
2. 请求与保持条件：一个进程因请求资源而阻塞时，对已获得的资源保持不放。
3. 不剥夺条件:进程已获得的资源，在末使用完之前，不能强行剥夺。
4. 循环等待条件:若干进程之间形成一种头尾相接的循环等待资源关系。

### 进程间通信方式

进程（Linux）间的通信方式有：  
1、管道  
2、消息队列  
3、共享内存  
4、信号量  
5、Socket

## 设计模式

1、工厂模式  
2、发布订阅模式与观察者模式 [example](https://juejin.cn/post/6847902215571505166#comment)  
发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。  
观察者模式是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的。  
3、单例模式  
4、职责链模式  
5、[MVC 模式](https://www.runoob.com/design-pattern/design-pattern-tutorial.html)  
6、代理模式、装饰模式等, [详细](https://juejin.cn/post/6844904190947360781#comment)

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
import jg from './judge.js';

const a = jg();
console.log(a);
const b = jg();
console.log(a === b);
```

## 计算机基础

1、二进制表示  
① 正负数用补码来表示，正数的补码就是原码；负数的补码是正数的原码的反码再加 1。也适用(n & 1) === 0 来看奇偶。  
② 二进制转十进制是求幂，十进制转二进制是求余数再反过来拼接到一起。

2、Base64 编码规则

## 正则表达式

1、匹配手机号

```js
const tel = /^1[3-9][0-9]{9}$/; //{9}表示前面的表达式出现9次
```

2、\w 与\W  
小写\w：匹配包括下划线的任何单词字符。类似但不等价于“[A-Za-z0-9_]”，这里的"单词"字符使用 Unicode 字符集。  
大写\W：匹配任何非单词字符。等价于“[^a-za-z0-9_]”。

## CDN 内容分发网络

[详细](https://www.zhihu.com/question/320489602/answer/683562496)
CNAME 就是域名的别名；CDN 主要用来存储静态资源；
由域名服务器和多个代理服务器组成，优势：  
1、距离最近的服务器(CDN 节点)进行响应 降低页面响应时间  
2、前端性能优化，实际项目里的静态资源比如图片就存储在 cdn 上  
3、cdn 不仅可以缓存资源，并且某个服务器瘫痪，可以有其他服务器进行响应  
4、域名不能和源站一致：用户访问加速域名的网站资源，当 CDN 节点上没有缓存对应的内容时，CDN 节点会回到源站获取，然后再返回给用户。如果源站域名与加速域名一致，将会造成访问请求反复解析到 CDN 节点，导致 CDN 节点无法回源拉取请求内容。其次减少了 静态资源 cookie 的发送  
[CNAME](https://www.cnblogs.com/tinywan/p/6207336.html)

## 代码规范

1、if else 多个 return 是多余的  
2、const 优先  
3、三个等号
