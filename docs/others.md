## others
## git
## node
[千锋node](https://lurongtao.gitee.io/felixbooks-gp19-node.js/basics/01-Node.js%E5%9F%BA%E7%A1%80.html)
### 1.npm与npx区别：  
对于node_modules中安装的模块，全局中没有安装，这时不能使用npm，而npx会优先寻找当前项目的node_modules，如果没有，会自动安装  
  
### 2.nvm  

### 3.npm  
Node Package Manager node.js的包管理工具 包就是模块  
  
### 4.npm命令简写   
npm install 和 npm i 是一样  
--save 和 -S 是一样  
--save-dev 和 -D 是一样的  
-S, --save 安装包信息将加入到dependencies（生产阶段的依赖,也就是项目运行时的依赖，就是程序上线后仍然需要依赖）  
-D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作业的）  
  
### 5.package-lock.json  
作用：锁定版本+显示模块的依赖关系  
  
### 6.npm i --production  
作用：只安装dependencies即生产环境下的包的node_modules  而不安装devDependencies即开发环境下的包  
  
### 7.npm view 模块名字 versions  
查看包的所有版本  然后想更换版本可直接输入 npm i jquery@3.5.1 -S  
  
### 8.版本号前面的^  eg:"stylus": "^0.54.8",  
node package的版本号解析：0.54.8  
①主版本号(大更新)major:0, 次版本号(添加功能)minor:54, 补丁(修bug)patch: 8  
②^表示在进行包的安装npm install或升级时npm update，只锁定主版本号，次版本号和补丁号升级为主版本号下的最新值  
③~表示锁定主版本号和次版本号，patch取最新  
④如果前面不加符号，则安装时锁定所有版本  
⑤不写版本号而是以*代替，则是安装最新版本  
⑥对于node_modules安装时出错，可以清楚缓存npm cache clean --force  
  
### 9.node模块  
①内置模块：path、http、fs等  模块有自身的方法  
②第三方模块：jq、react、vue、express、axios等  
③自定义模块：代码见本地 新练习code-node-custom，步骤npm init -y生成package.json, 还需要一个js文件用来写逻辑, 注意js文件名字要和package.json中的main字段的名字一致, 用来向外暴露js逻辑(这里需要模块化的知识如commonJS), 比如要引用lodash,则需要引入这个包；下一步是发布包  
步骤：npm adduser(注意切换到npm源)、npm publish  
出错原因可能是包重名或邮箱未验证  
  
### 10.npm源  
查看源： npm config get registry  
切换源： npm config set registry url

## 模块化规范
### 优点
1、避免命名冲突  
2、更好地分离，按需加载  
3、复用性高  
4、维护性好  
  
### 分类
1、CommonJS  
在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理(因为浏览器不认识CommonJS语法如require)  
暴露模块：module.exports = value / exports.xxx = value。暴露的本质是exports对象。第一种暴露是把value赋给了exports对象，第二种是添加属性。  
引入模块：①内置模块(如url、http)或第三方模块直接require(模块名字)②自定义模块要require(模块文件相对路径)  
browserify  
2、AMD(requireJS)  
专用于浏览器端，异步加载模块。  
暴露模块：define方法  
引入模块：require方法  
3、CMD(seaJS)  
专用于浏览器端，异步加载模块。(按需加载)  
4、ES6(应用最广泛)  
使用Babel将ES6转化为浏览器可识别的ES5，但还包含require语法，所以还需要browserify(babel还可以将jsx转化为js)  
暴露模块：export ①分别暴露 ②统一暴露 ③默认暴露  
引入模块：import ①通用方式import * as xx from 'path' ②解构赋值 ③简便形式import xx from '路径'只能用于默认暴露的情况。    
