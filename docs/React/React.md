## React

### why：

优势(Vue 也具有)
1、效率。原生 JS 操作 DOM 繁琐，效率低(DOM-API 操作 UI)  
2、性能。原生 JS 直接操作 DOM，浏览器进行大量重排和重绘  
3、复用性。原生 JS 没有组件化编码方案，代码复用率低

### 特点

1、采用组件化模式、声明式编码，提高开发效率及组件复用率  
2、在 RN 中可以用 React 语法进行移动端开发 ☆  
3、使用虚拟 DOM(内存中) + 优秀的 Diffing 算法，尽量减少与真实 DOM 的交互

### JSX

1、JS 与 HTML 的混合写法，创建虚拟 DOM 更简洁快速(语法糖)。原生 JS 用 React.creactElement 创建虚拟 DOM 需要嵌套，太繁琐。(babel 翻译之后其实就是用的 React.creactElement),但由于本质是 JS，是动态的，难以做静态分析，因此需要 fiber 来提升性能，而 Vue 是用模板来做静态分析的  
2、使用 Babel 将 JSX 转化为 JS。  
3、通过打印虚拟 DOM 可以发现虚拟 DOM 对象的键值对比真实 DOM 的少(真实 DOM 可以通过打断点查看)，因为创建虚拟 DOM 只需要添加必要的键值对。  
4、给 React 的 DOM 传数组数据，会自动遍历，而对象不行。  
5、JSX 的语法规则：  
&nbsp;&nbsp;①.定义虚拟 DOM 时，不要写引号。  
&nbsp;&nbsp;②.标签中混入**JS 表达式**时要用{}。注意：表达式而不是语句  
&nbsp;&nbsp;③.样式的类名指定不要用 class，要用 className。  
&nbsp;&nbsp;④.内联样式，要用 style={ {key:value} }的形式去写。  
&nbsp;&nbsp;⑤.只有一个根标签（弄个 div 在外面包裹）  
&nbsp;&nbsp;⑥.标签必须闭合  
&nbsp;&nbsp;⑦.标签首字母  
&nbsp;&nbsp;&nbsp;&nbsp;a.若小写字母开头，则将该标签转为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错。  
&nbsp;&nbsp;&nbsp;&nbsp;b.若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错。  
6、表达式和语句的区别：表达式会返回值  
表达式：a、a + b、demo(1)、arr.map(cb)、function fn() {} 、三元
语句：if、switch、for、while

### 面向组件编程

1、模块(化)与组件(化)的概念  
组件化比模块化的范畴更大。  
模块化：一般情况，一个模块就指一个 js 文件。目的是让代码简洁有逻辑，可以复用 js。  
组件化：用来实现局部功能效果的代码和资源的集合(html/css/js/image 等等)。目的和模块化类似。  
2、React 开发者工具  
F12 可以查看组件  
3、React 中定义组件的两种方式  
① 函数式组件(适用于简单组件的定义)

```javascript
//1.创建函数式组件
function MyComponent() {
  console.log(this); //此处的this是undefined而不是window，因为babel编译后开启了严格模式
  return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>;
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById('test')); //注意首字母大写
/* 
  执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
      1.React解析组件标签，找到了MyComponent组件。
      2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
*/
```

② 类式组件(适用于复杂组件的定义)  
先复习一下类的基本概念：  
I.类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写。  
II.如果 A 类继承了 B 类，且 A 类中写了构造器，那么 A 类构造器中的 super 是必须要调用的。  
III.类中所定义的方法，都放在了类的原型对象上，供实例去使用。

```javascript
//1.创建类式组件
class MyComponent extends React.Component {
  render() {
    //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
    //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
    console.log('render中的this:', this);
    return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>;
  }
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById('test'));
/* 
  执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
      1.React解析组件标签，找到了MyComponent组件。
      2.发现组件是使用类定义的，随后new出来该类的实例(react内部实现，我们看不到)，并通过该实例调用到原型上的render方法。
      3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
*/
```

### 类组件实例的三大核心属性

**1、state(状态)**  
① 注意回调函数的 this 指向问题。  
场景：render 方法中的 return 的标签里写的绑定事件及回调，this 指向为 undefined。  
原因：实例的方法赋值给了回调，变成了直接调用，所以 this 不再指向实例对象。  
② 状态不能直接修改，必须通过 setState(该方法接受对象类型)进行更新，且更新是一种合并，不是替换。  
③ 可以简写：  
首先可以不写 constructor 构造函数(构造器)，state 状态一开始写死的，而且 ES6 的 class 允许将死数据比如 this.age = 18 写在构造函数外边，这时不用写 this。  
其次对于自定义方法，改写成赋值语句+箭头函数的形式，这样一来，有两个变化，第一点是该方法变成实例对象自身的方法，而不是挂载到原型对象上，第二点是箭头函数的 this 取决于外层作用域也就是类，而类中的 this 是实例对象，这样就不用再用 bind 修改 this 指向了。  
④ 实际开发中，基本不写构造器。

```html
<script type="text/babel">
  //1.创建组件
  class Weather extends React.Component {
    //初始化状态
    state = { isHot: false, wind: '微风' };
    render() {
      const { isHot, wind } = this.state;
      return (
        <h1 onClick={this.changeWeather}>
          今天天气很{isHot ? '炎热' : '凉爽'}，{wind}
        </h1>
      );
    }
    //自定义方法————要用赋值语句的形式+箭头函数
    changeWeather = () => {
      const isHot = this.state.isHot;
      this.setState({ isHot: !isHot });
    };
  }
  //2.渲染组件到页面
  ReactDOM.render(<Weather />, document.getElementById('test'));
</script>
```

**2、props(标签属性)**  
① 类组件：

```javascript
//1、传Number类型的数据,用大括号包裹
ReactDOM.render(<Person name="jerry" age={19} sex="男" />, document.getElementById('test1'));
// 2、对props的数据类型进行限制(在类外部写该逻辑，相当于静态属性)
Person.propTypes = {
  name: PropTypes.string.isRequired, //限制name必传，且为字符串
  sex: PropTypes.string, //限制sex为字符串
  age: PropTypes.number, //限制age为数值
  speak: PropTypes.func, //限制speak为函数
  // 注意函数是func
};
// 3、对props的部门props设置默认值(在类外部写该逻辑，相当于静态属性)
Person.defaultProps = {
  // 默认的意思是,如果不传该属性,就采用默认的值
  sex: '男', //sex默认值为男
  age: 18, //age默认值为18
};
```

② 类组件简写：  
注意：使用了 static，就要将静态属性写在类的内部。

```javascript
class Person extends React.Component {
  constructor(props) {
    //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
    // console.log(props);
    super(props);
    // console.log('30',this);//实例
    console.log('constructor', this.props);
    console.log('constructor', props);
    // 如果构造器里不用this.props 则可以不写构造器
  }

  //对标签属性进行类型、必要性的限制
  static propTypes = {
    name: PropTypes.string.isRequired, //限制name必传，且为字符串
    sex: PropTypes.string, //限制sex为字符串
    age: PropTypes.number, //限制age为数值
  };

  //指定默认标签属性值
  static defaultProps = {
    sex: '男', //sex默认值为男
    age: 18, //age默认值为18
  };

  render() {
    // console.log(this);
    const { name, age, sex } = this.props;
    //props是只读的
    //this.props.name = 'jack' //此行代码会报错，因为props是只读的
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age + 1}</li>
      </ul>
    );
  }
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry" />, document.getElementById('test1'));
```

③ 函数式组件使用 props：  
**注：函数式组件不可以(除了 hooks)使用 state 和 refs 和生命周期钩子(本质是没有 this)，但是可以使用 props。**

```javascript
//创建组件
function Person(props) {
  const { name, age, sex } = props;
  return (
    <ul>
      <li>姓名：{name}</li>
      <li>性别：{sex}</li>
      <li>年龄：{age}</li>
    </ul>
  );
}
// 思考一下：为什么静态属性放在函数外面？
// 其实是因为，如果写在函数体内，想挂载到函数对象上，必须先调用函数。而写在函数体外，则不需要这样。
Person.propTypes = {
  name: PropTypes.string.isRequired, //限制name必传，且为字符串
  sex: PropTypes.string, //限制sex为字符串
  age: PropTypes.number, //限制age为数值
};

//指定默认标签属性值
Person.defaultProps = {
  sex: '男', //sex默认值为男
  age: 18, //age默认值为18
};
console.log(Person);
//渲染组件到页面
ReactDOM.render(<Person name="jerry" />, document.getElementById('test1'));
```

**3、refs**  
① 字符串形式(不推荐使用，效率低(why))：

```js
<input ref="input1" type="text" placeholder="点击按钮提示数据" />;
console.log(this.refs); //{input1: input}
```

② 回调函数形式：

```js
<input ref={(c) => (this.input1 = c)} type="text" placeholder="点击按钮提示数据" />;
//c代表currentNode，react自动执行这个回调函数，传的参数为当前真实的DOM(当前ref所处的节点)
//此处的this代表实例对象
//和形式字符串不同的是，字符串形式是将节点存在refs，
//而回调形式是新建了input1(自定义的)属性，存放节点，而不是放在refs对象中

//下面是jsx的注释写法
{
  /*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/
}
```

注意：由于上面的代码放在 render 方法中，首次渲染的时候，执行一次，c 是 input 节点。之后每次重新渲染的时候，该 cb 会执行两次。  
:::tip 注意
关于回调 refs 的说明
如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数(也就是说写成原型上的方法，重新渲染即更改 DOM 时，不再调用 cb)的方式可以避免上述问题，但是大多数情况下它是无关紧要的。  
以后写成内联就可以。
:::
③create Ref API 形式(最推荐)：

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

④ 总结 refs  
尽量避免字符串形式；尽量使用 createRef 形式；回调形式(内联或者原型都可)较麻烦(create 多次用其实也较麻烦)。

## React 生命周期

## create-react-app 脚手架

正式项目(生产环境)里就要用脚手架。create-react-app 是 Facebook 推出的基于 react+webpack+es6+eslint 的脚手架，能够快速创建项目，更好地实现模块化、组件化和工程化(即自动化)。

### 脚手架文件介绍

1、public 是静态资源文件夹  
其中的 index.html 是容器(主页面)，就是 document.getElementById('test')，并且只有这一个 html 文件，也就是 SPA-single page application 应用、 %PUBLIC_URL%代表 public 文件夹路径、 manifest.json 文件用于应用加壳、robots.txt 用于(防范)爬虫
2、src 是源码文件夹  
App.js 是根组件(约定俗成组件的首字母都是大写的)、App.css 是根组件的样式、App.test.js 是测试文件(基本不用)、index.js 是入口文件、reportWebVitals.js 用于记录页面性能、setupTests.js 用于组件测试和单元测试  
3、执行顺序  
从 index.js 进入，当执行 ReactDOM.render 方法时，根据 document.getElementById('root')找到 public 文件夹里的 index.html 文件，同时根据<App/>找到 App.js 组件。这三个是最重要的，其他都是附属。

## React 前端路由

### 路由的基本使用

1.明确好界面中的导航区、展示区  
2.导航区的 a 标签改为 Link 标签

```js
<Link to="/xxxxx">Demo</Link>
```

3.展示区写 Route 标签进行路径的匹配

```js
<Route path="/xxxx" component={Demo} />
```

4.index.js 的 App 外部包裹 BrowserRouter 或 HashRouter 标签  
5.hash 路由无需服务端配置(因为#后面的不会发送给服务器), history 需要服务端配置

## React 实践

1、多层三元表达式(jsx 不能写 if 语句)

```js
render() {
  const {users,isFirst,isLoading,err} = this.state
  return (
    <div className="row">
      {
        isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
        isLoading ? <h2>Loading......</h2> :
        err ? <h2 style={{color:'red'}}>{err}</h2> :
        users.map((userObj)=>{
          return (
            <div key={userObj.id} className="card">
              <a rel="noreferrer" href={userObj.html_url} target="_blank">
                <img alt="head_portrait" src={userObj.avatar_url} style={{width:'100px'}}/>
              </a>
              <p className="card-text">{userObj.login}</p>
            </div>
          )
        })
      }
    </div>
  )
}
```

2、PubSub 发布订阅：适用于任何组件间的通信。  
[使用方式](https://github.com/mroderick/PubSubJS)  
3、路由组件和一般组件的区别。  
1.写法不同：

```js
// 一般组件：
<Demo/>
// 路由组件：
<Route path="/demo" component={Demo}/>
```

2.存放位置不同：一般组件：components ; 路由组件：pages  
3.接收到的 props 不同：  
一般组件：写组件标签时传递了什么，就能收到什么  
路由组件：接收到三个固定的属性  
**history:**  
&nbsp;&nbsp;go: ƒ go(n)  
&nbsp;&nbsp;goBack: ƒ goBack()  
&nbsp;&nbsp;goForward: ƒ goForward()  
&nbsp;&nbsp;push: ƒ push(path, state)  
&nbsp;&nbsp;replace: ƒ replace(path, state)  
**location:**  
&nbsp;&nbsp;pathname: "/about"  
&nbsp;&nbsp;search: ""  
&nbsp;&nbsp;state: undefined  
**match:**  
&nbsp;&nbsp;params: {}  
&nbsp;&nbsp;path: "/about"  
&nbsp;&nbsp;url: "/about"

## Redux(与 Vuex 作用类似)

Action Creators 这一步可以不要、Reducers 不仅可以加工状态还可以初始化状态，初始化的时候 previous 就是 undefined、接触纯函数这个概念
补充：父组件 render 子组件一定执行 render 反之并不是 解决效率问题：PureComponent
actioncreator 用来 生成 action 对象 不用自己写 action 对象了
constantjs 文件用来定义 type 变量，防止写错单词，并且可以统一管理 type，统一修改

## 自定义一个 Hooks

自定义 hooks 都是基于原始的几个 hooks：

```js
// 定义：
import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, []);
  return;
};

export default useTitle;

// 使用：
import useTitle from './useTitle';

const fish = () => {
  useTitle('a few fish');

  return <div>home</div>;
};

// 进阶：如何写一个防抖/节流hooks
// https://juejin.cn/post/6844904074433789959#heading-6
```

## React 常见问题

1、setState 异步/同步

- 异步：在 React 合成事件和生命周期中。同步：原生事件和定时器中。(class)
- 本质上是同步的，是其**批处理机制**(合成事件和生命周期中)造成了一种异步的假象: 无论调用多少次 setState，都不会立即执行更新。而是将要更新的 state 存入'\_pendingStateQuene',将要更新的组件存入'dirtyComponent';当根组件 didMount 后，批处理机制更新为 false。此时再取出'\_pendingStateQuene'和'dirtyComponent'中的 state 和组件进行合并更新；

2、useEffect 的 return 不仅在组件销毁时执行，也会在下一次 useEffect 执行前执行(但在渲染之后，也就是函数组件重新执行一遍之后)。  
3、React 每次渲染的 props 和 state 是互相独立的，实际上，每次渲染后 React 是把最新的 state 赋给当前的组件，可以用定时器证明此结论。解决办法：利用 useRef。  
4、ref 在所有 render 中都保持着唯一的引用，因此所有的对 ref 的赋值或者取值拿到的都是一个最终的状态，而不会存在隔离。这也是为什么 ref 需要是一个对象，从通过 current 属性才能拿到 dom 或者值。而不能一个简单类型的值。  
5、定时器的 setState 同步 对函数组件的 useEffect 不适用。  
6、useCallback useMemo。类似于计算属性，前者缓存函数，后者可以缓存任意类型数据。每次渲染就不必重新定义。
7、React 规定我们必须把 hooks 写在函数的最外层，不能写在 if else 等条件语句当中，来确保 hooks 的执行顺序一致。  
8、useEffect 依赖对象的问题。[解决](https://delaprada.com/2021/03/13/React-useEffect-Hook%E7%9A%84%E5%AF%B9%E8%B1%A1-%E6%95%B0%E7%BB%84%E4%BE%9D%E8%B5%96/)

## React 动态组件

```jsx
const SevenSign = ({ signWater = [], canSignin, clickToday }: TasksProps) => {

  // {renderList()}
  const renderList = () => {
    return (
      <>
        {signWater.map((water, index) => {
          const { icon } = water;
          return (
            <div className={s.water} key={index}>
              <img
                className={s.waterImg}
                onClick={() => {
                  clickToday(index);
                }}
                src={icon}
                alt=""
              />
              <div className={s.waterWord}>{`${index + 1}天`}</div>
            </div>
          );
        })}
      </>
    );
  };

  // {renderBtn()}
  const renderBtn = () => {
    return (
      <div
        className={s.waterBtn}
        onClick={() => {
          ...
        }}
      >
        {canSignin ? "签到" : "运势"}
      </div>
    );
  };

  return (
    <div className={s.signBox}>
      <div className={s.signHint}>
        <div>
          <img
            className={s.littleIcon}
            src="xxx.png"
            alt=""
          />
        </div>
        <div className={s.signWord}>{"连续签到得能量"}</div>
      </div>
      <div className={s.waterBox}>
        {renderList()}
        {renderBtn()}
      </div>
    </div>
  );
};

export default SevenSign;
```

## 重新修改复杂类型

```js
const signinClick = (signState: boolean, todayIcon: string) => {
  if (signState) {
    setSignWater(
      signWater.map((item, index): SignWater => {
        if (index + 1 === continuous) {
          return { ...item, icon: todayIcon };
        }
        return item;
      }),
    );
  }
};
```

## (非)受控组件

以表单的 input 为例：  
1、非受控组件：想获得 input 的 value 就要根据真实的 dom 去获得  
2、受控组件: 将 input 绑定了 change 事件, 实时的将 value 存到了组件的 state 中, 实现了 Vue 中的 v-model 效果, 并且绑定了事件, 就可以在回调的逻辑中对用户的输入进行相应的处理(比如大小写转换、过滤等)

## React 合成事件

优点：

- 最大程度上解决了 IE 等浏览器的不兼容问题
- 事件绑定到 Document 上，减少事件绑定的开销。
- React 通过对象池的形式管理合成事件对象的创建和销毁，减少了垃圾的生成和新对象内存的分配，提高了性能。
- 事件合成，即事件自定义，React 可以更加自由的定义事件，比如表单的一些 onChange 事件。
- 抽象跨平台事件机制，这点和 VirtualDOM 的意义相似。
- React 打算干预事件的分发，不同类型的事件有不同的优先级，比如高优先级的事件可以中断渲染，让用户代码可以及时响应用户交互。

<!-- 从三个问题发现 React 的(合成)事件与 DOM 的原生事件不同：
1、阻止冒泡失效(因为合成事件注册到了 document)
2、onChange(和 input 事件一样)和原生的 onchange(失去焦点)执行条件不同
3、原生事件的回调执行时间早于同一元素的合成事件(因为合成事件注册到了 document)
三阶段: 事件注册、合成、派发
[详细](https://segmentfault.com/a/1190000015142568) -->

## 状态更新

- 数据改变，触发 re-render，和 Vue 的响应式是不同的，也就是说：在 react 中，组件的状态是不能被修改的(Immutable)，setState 没有修改原来那块内存中的变量，而是去新开辟一块内存
- 调用 setState 方法后，会自顶向下重新渲染组件，自顶向下的含义是，该组件以及它的子组件全部需要渲染，所以当一个数据改变，react 的组件渲染是很消耗性能的——父组件的状态更新了，所有的子组件得跟着一起渲染，它不能像 vue 一样，精确到当前组件的粒度
- 由于 react 和 vue 的响应式实现原理不同，数据更新时，第一步中 react 组件会渲染出一棵更大的虚拟 dom 树。

## diff

- react 的 简单 diff 本质:
  React 每次更新时，会将新的 ReactElement（即 React.createElement() 的返回值）与旧的 fiber 树作对比，比较出它们的差异后，构建出新的 fiber 树，因此多节点的 diff 实际上是用 fiber（旧子节点）和 ReactElement 数组（新子节点）进行对比。

- 为什么不用双端 diff:
  由于双端 diff 需要向前查找节点，但每个 fiber 节点上都没有反向指针，即前一个 fiber 通过 sibling 属性指向后一个 fiber，只能从前往后遍历，而不能反过来，因此该算法无法通过双端搜索来进行优化。React 想看下现在用这种方式能走多远，如果这种方式不理想，以后再考虑实现双端 diff。React 认为对于列表反转和需要进行双端搜索的场景是少见的，所以在这一版的实现中，先不对 bad case 做额外的优化。

## fiber 时间分片

### why(性能)

- react15 中，React 会递归比对 VirtualDOM 树，找出需要变动的节点，然后同步更新它们, 一气呵成，也就是说任务分配由 react 控制而不是浏览器，例如 diff 过程如果很耗时，浏览器就得一直等待(JS 线程与 GUI 渲染线程互斥)，因此在特殊情况会产生动画丢帧卡顿等现象。这个过程 React 称为 Reconcilation(中文可以译为协调)
- 递归过程相当于函数调用栈的执行，缺点是不能中断，也难以恢复，只能从头开始(效率低)。中断指的是交给浏览器做其他高优先级的任务(比如交互事件等)

### 过程

- 改用单向链表实现, return 是父节点的引用，sibling 兄弟节点的引用，child 第一个子节点的引用
- 有三个引用，为什么说是单向链表？child、return 是用来构建“树”，“sibling”用来构建同级元素的“单向”链表，通过遍历这个“单向”链表来 dom diff。将虚拟 dom 连接，使得组件更新的流程可以被中断恢复；它把组件渲染的工作分片，到时会主动让出主线程，也就是说将任务的控制权交给浏览器，而 react 需要向浏览器申请时间进行后续的 diff 等操作，这样就不会阻塞浏览器的渲染。
- ![对比图](/blog/assets/img/react.png)

### 结果

- 快速响应用户操作和输入，提升用户交互体验
- 让动画更加流畅，通过调度，可以让应用保持高帧率
- 利用好 I/O 操作空闲期或者 CPU 空闲期，进行一些预渲染。 比如离屏(offscreen)不可见的内容，优先级最低，可以让 React 等到 CPU 空闲时才去渲染这部分内容。这和浏览器的 preload 等预加载技术差不多。
- 用 Suspense 降低加载状态(load state)的优先级，减少闪屏。比如数据很快返回时，可以不必显示加载状态，而是直接显示出来，避免闪屏；如果超时没有返回才显示加载状态。
- 但是它肯定不是完美的，因为浏览器无法实现抢占式调度，无法阻止开发者做傻事的，开发者可以随心所欲，想挖多大的坑，就挖多大的坑。因此该做的优化还需要做: 纯组件、虚表、简化组件、缓存...

### 为什么 Vue 不需要 fiber

- Vue 是基于 template 和 watcher 的组件级更新，把每个更新任务分割得足够小，不需要使用到 Fiber 架构，将任务进行更细粒度的拆分
- React 是不管在哪里调用 setState，都是从根节点开始更新的，更新任务还是很大，需要使用到 Fiber 将大任务分割为多个小任务，可以中断和恢复，不阻塞主进程执行高优先级的任务
