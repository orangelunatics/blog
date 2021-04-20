## React
### why：  
优势(Vue也具有)
1、效率。原生JS操作DOM繁琐，效率低(DOM-API操作UI)  
2、性能。原生JS直接操作DOM，浏览器进行大量重排和重绘  
3、复用性。原生JS没有组件化编码方案，代码复用率低  
  
### 特点  
1、采用组件化模式、声明式编码，提高开发效率及组件复用率  
2、在RN中可以用React语法进行移动端开发 ☆  
3、使用虚拟DOM(内存中) + 优秀的Diffing算法，尽量减少与真实DOM的交互

### JSX  
1、JS与HTML的混合写法，创建虚拟DOM更简洁快速。原生JS用React.creactElement创建虚拟DOM需要嵌套，太繁琐。  
2、使用Babel将JSX转化为JS。  
3、通过打印虚拟DOM可以发现虚拟DOM对象的键值对比真实DOM的少(真实DOM可以通过打断点查看)，因为创建虚拟DOM只需要添加必要的键值对。  
4、给React的DOM传数组数据，会自动遍历，而对象不行。  
5、JSX的语法规则：  
&nbsp;&nbsp;①.定义虚拟DOM时，不要写引号。  
&nbsp;&nbsp;②.标签中混入JS表达式时要用{}。注意：表达式而不是语句  
&nbsp;&nbsp;③.样式的类名指定不要用class，要用className。  
&nbsp;&nbsp;④.内联样式，要用style={ {key:value} }的形式去写。  
&nbsp;&nbsp;⑤.只有一个根标签（弄个div在外面包裹）  
&nbsp;&nbsp;⑥.标签必须闭合  
&nbsp;&nbsp;⑦.标签首字母  
&nbsp;&nbsp;&nbsp;&nbsp;a.若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。  
&nbsp;&nbsp;&nbsp;&nbsp;b.若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。  