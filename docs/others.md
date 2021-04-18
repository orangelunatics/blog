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
  
### 8.