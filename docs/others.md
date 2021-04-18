## others
## git
## npm
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
  
### 10.npm切换源  
查看源： npm config get registry  
切换源： npm config set registry url