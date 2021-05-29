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
  
### 面向组件编程
1、模块(化)与组件(化)的概念  
组件化比模块化的范畴更大。  
模块化：一般情况，一个模块就指一个js文件。目的是让代码简洁有逻辑，可以复用js。  
组件化：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)。目的和模块化类似。  
2、React开发者工具  
F12可以查看组件  
3、React中定义组件的两种方式  
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
  
### 类组件实例的三大核心属性
**1、state(状态)**  
①注意回调函数的this指向问题。  
场景：render方法中的return的标签里写的绑定事件及回调，this指向为undefined。  
原因：实例的方法赋值给了回调，变成了直接调用，所以this不再指向实例对象。  
②状态不能直接修改，必须通过setState(该方法接受对象类型)进行更新，且更新是一种合并，不是替换。  
③可以简写：  
首先可以不写constructor构造函数(构造器)，state状态一开始写死的，而且ES6的class允许将死数据比如this.age = 18写在构造函数外边，这时不用写this。  
其次对于自定义方法，改写成赋值语句+箭头函数的形式，这样一来，有两个变化，第一点是该方法变成实例对象自身的方法，而不是挂载到原型对象上，第二点是箭头函数的this取决于外层作用域也就是类，而类中的this是实例对象，这样就不用再用bind修改this指向了。  
④实际开发中，基本不写构造器。    
```html
<script type="text/babel">
  //1.创建组件 
  class Weather extends React.Component{ 
    //初始化状态 
    state = {isHot:false,wind:'微风'} 
    render() { 
      const {isHot,wind} = this.state 
      return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    } 
    //自定义方法————要用赋值语句的形式+箭头函数 
    changeWeather = ()=>{ 
      const isHot = this.state.isHot 
      this.setState({isHot:!isHot}) 
    } 
  } 
  //2.渲染组件到页面 
  ReactDOM.render(<Weather/>,document.getElementById('test'))
</script>
```  
  
**2、props(标签属性)**  
①类组件：  
```javascript
//1、传Number类型的数据,用大括号包裹
ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
// 2、对props的数据类型进行限制(在类外部写该逻辑，相当于静态属性)
Person.propTypes = {
  name:PropTypes.string.isRequired, //限制name必传，且为字符串
  sex:PropTypes.string,//限制sex为字符串
  age:PropTypes.number,//限制age为数值
  speak:PropTypes.func,//限制speak为函数
  // 注意函数是func
}
// 3、对props的部门props设置默认值(在类外部写该逻辑，相当于静态属性)
Person.defaultProps = {
  // 默认的意思是,如果不传该属性,就采用默认的值
  sex:'男',//sex默认值为男
  age:18 //age默认值为18
}
```    
  
②类组件简写：  
注意：使用了static，就要将静态属性写在类的内部。
```javascript
class Person extends React.Component{
  constructor(props){
    //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
    // console.log(props);
    super(props)
    // console.log('30',this);//实例
    console.log('constructor',this.props);
    console.log('constructor',props);
    // 如果构造器里不用this.props 则可以不写构造器
  }

  //对标签属性进行类型、必要性的限制
  static propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
  }

  //指定默认标签属性值
  static defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
  }
  
  render(){
    // console.log(this);
    const {name,age,sex} = this.props
    //props是只读的
    //this.props.name = 'jack' //此行代码会报错，因为props是只读的
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age+1}</li>
      </ul>
    )
  }
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```
  
③函数式组件使用props：  
**注：函数式组件不可以(除了hooks)使用state和refs，但是可以使用props。**   
```javascript
//创建组件
function Person (props){
  const {name,age,sex} = props
  return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
}
// 思考一下：为什么静态属性放在函数外面？
// 其实是因为，如果写在函数体内，想挂载到函数对象上，必须先调用函数。而写在函数体外，则不需要这样。  
Person.propTypes = {
  name:PropTypes.string.isRequired, //限制name必传，且为字符串
  sex:PropTypes.string,//限制sex为字符串
  age:PropTypes.number,//限制age为数值
}

//指定默认标签属性值
Person.defaultProps = {
  sex:'男',//sex默认值为男
  age:18 //age默认值为18
}
console.log(Person);
//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```  
  
**3、refs**  
①字符串形式(不推荐使用，效率低(why))：  
```js
<input ref="input1" type="text" placeholder="点击按钮提示数据"/>
console.log(this.refs)//{input1: input}
```  
②回调函数形式：  
```js
<input ref={c => this.input1 = c} type="text" placeholder="点击按钮提示数据"/>
//c代表currentNode，react自动执行这个回调函数，传的参数为当前真实的DOM(当前ref所处的节点)
//此处的this代表实例对象
//和形式字符串不同的是，字符串形式是将节点存在refs，
//而回调形式是新建了input1(自定义的)属性，存放节点，而不是放在refs对象中

//下面是jsx的注释写法
{/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
```
注意：由于上面的代码放在render方法中，首次渲染的时候，执行一次，c是input节点。之后每次重新渲染的时候，该cb会执行两次。  
:::tip 注意
关于回调 refs 的说明
如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数(也就是说写成原型上的方法，重新渲染即更改DOM时，不再调用cb)的方式可以避免上述问题，但是大多数情况下它是无关紧要的。  
以后写成内联就可以。
:::
③create Ref API形式(最推荐)：  
```js
myRef = React.createRef()
showData = ()=>{
  alert(this.myRef.current.value);
  console.log(this);
}
render(){
  return(
    <div>
      <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
      <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
    </div>
  )
}
//将input节点存放在了实例的myRef属性中，this.myRef => {current: input}
//并且每个createRef只能存放一个节点，后续如果使用同一个createRef会替换之前的
//缺点：用几个节点，就得创建几次createRef
```
④总结refs  
尽量避免字符串形式；尽量使用createRef形式；回调形式(内联或者原型都可)较麻烦(create多次用其实也较麻烦)。  
  
## React生命周期  
  
## create-react-app脚手架
正式项目(生产环境)里就要用脚手架。create-react-app是Facebook推出的基于react+webpack+es6+eslint的脚手架，能够快速创建项目，更好地实现模块化、组件化和工程化(即自动化)。  
### 脚手架文件介绍
1、public是静态资源文件夹  
其中的index.html是容器(主页面)，就是document.getElementById('test')，并且只有这一个html文件，也就是SPA-single page application应用、 %PUBLIC_URL%代表public文件夹路径、 manifest.json文件用于应用加壳、robots.txt用于(防范)爬虫
2、src是源码文件夹  
App.js是根组件(约定俗成组件的首字母都是大写的)、App.css是根组件的样式、App.test.js是测试文件(基本不用)、index.js是入口文件、reportWebVitals.js用于记录页面性能、setupTests.js用于组件测试和单元测试  
3、执行顺序  
从index.js进入，当执行ReactDOM.render方法时，根据document.getElementById('root')找到public文件夹里的index.html文件，同时根据<App/>找到App.js组件。这三个是最重要的，其他都是附属。  