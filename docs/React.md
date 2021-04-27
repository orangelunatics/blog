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
1、JS与HTML的混合写法，创建虚拟DOM更简洁快速(语法糖)。原生JS用React.creactElement创建虚拟DOM需要嵌套，太繁琐。(babel翻译之后其实就是用的React.creactElement)  
2、使用Babel将JSX转化为JS。  
3、通过打印虚拟DOM可以发现虚拟DOM对象的键值对比真实DOM的少(真实DOM可以通过打断点查看)，因为创建虚拟DOM只需要添加必要的键值对。  
4、给React的DOM传数组数据，会自动遍历，而对象不行。  
5、JSX的语法规则：  
&nbsp;&nbsp;①.定义虚拟DOM时，不要写引号。  
&nbsp;&nbsp;②.标签中混入**JS表达式**时要用{}。注意：表达式而不是语句  
&nbsp;&nbsp;③.样式的类名指定不要用class，要用className。  
&nbsp;&nbsp;④.内联样式，要用style={ {key:value} }的形式去写。  
&nbsp;&nbsp;⑤.只有一个根标签（弄个div在外面包裹）  
&nbsp;&nbsp;⑥.标签必须闭合  
&nbsp;&nbsp;⑦.标签首字母  
&nbsp;&nbsp;&nbsp;&nbsp;a.若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。  
&nbsp;&nbsp;&nbsp;&nbsp;b.若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。  
6、表达式和语句的区别：表达式会返回值  
表达式：a、a + b、demo(1)、arr.map(cb)、function fn() {}  
语句：if、switch、for、while  
7、模块(化)与组件(化)的概念  
组件化比模块化的范畴更大。  
模块化：一般情况，一个模块就指一个js文件。目的是让代码简洁有逻辑，可以复用js。  
组件化：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)。目的和模块化类似。  
8、React开发者工具  
F12可以查看组件  
9、React中定义组件  
①函数式组件(适用于简单组件的定义)  
```javascript
//1.创建函数式组件
function MyComponent(){
  console.log(this); //此处的this是undefined而不是window，因为babel编译后开启了严格模式
  return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))//注意首字母大写
/* 
  执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
      1.React解析组件标签，找到了MyComponent组件。
      2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
*/
```
②类式组件(适用于复杂组件的定义)  
先复习一下类的基本概念：  
I.类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写。  
II.如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的。  
III.类中所定义的方法，都放在了类的原型对象上，供实例去使用。  
```javascript
//1.创建类式组件
class MyComponent extends React.Component {
  render(){
    //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
    //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
    console.log('render中的this:',this);
    return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
  }
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
/* 
  执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
      1.React解析组件标签，找到了MyComponent组件。
      2.发现组件是使用类定义的，随后new出来该类的实例(react内部实现，我们看不到)，并通过该实例调用到原型上的render方法。
      3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
*/
```