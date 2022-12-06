<h2 style="text-align: center;">talking about React.js生命周期</h2>

## react16 之后的生命周期

![react生命周期](/blog/assets/img/reactLife.png)

- React 从 v16.3 开始废弃 componentWillMount componentWillReceiveProps componentWillUpdate 三个钩子函数，原因：因为 React Fiber Reconciliation 这个过程有可能暂停然后继续执行，所以挂载和更新之前的生命周期钩子就有可能不执行或者多次执行

## 各生命周期

1. constructor:

- 来初始化函数内部 state
- 为 事件处理函数 绑定实例

2. getDerivedStateFromProps:

- 用法：static getDerivedStateFromProps(nextProps, prevState)
- 可以比较 props 和 state 来加一些限制条件，防止无用的 state 更新

3. render: 渲染 DOM
4. componentDidMount: DOM 挂载完毕调用，可以用来发送请求等
5. shouldComponentUpdate：

- 用法：shouldComponentUpdate(nextProps, nextState)
- 包含两个参数，第一个是即将更新的 props 值，第二个是即将跟新后的 state 值，可以根据更新前后的 props 或 state 来比较加一些限制条件，决定是否更新，进行性能优化

6. getSnapshotBeforeUpdate：获取 DOM 真正更新前的信息，例如滚动位置
7. componentDidUpdate：

- 用法：componentDidUpdate(prevProps, prevState, snapshot)，包含三个参数，第一个是上一次 props 值。 第二个是上一次 state 值。如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），第三个是“snapshot” 参数传递

8. componentWillUnmount：将被卸载时调用

## useEffect

1. useEffect：

- useEffect 是来解决类组件 某些执行代码被分散在不同的生命周期函数中 的问题。
- componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
- 运行时机：
  · useEffect 必然会在 render 的时候执行一次，其他的运行时机取决于以下情况  
  · 有没有第二个参数。useEffect hook 接受两个参数，第一个是要执行的代码，第二个是一个数组，指定一组依赖的变量，其中任何一个变量发生变化时，此 effect 都会重新执行一次。  
  · 有没有返回值。 useEffect 的执行代码中可以返回一个函数，在每一次新的 render 进行前或者组件 unmount 之时，都会执行此函数，进行清理工作。

2. useLayoutEffect(特定场景的优化):
   和 useEffect 的区别：

- useEffect 是异步执行的，而 useLayoutEffect 是同步执行的。
- useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，**和 componentDidMount 等价**。
  总结：
- 优先使用 useEffect，因为它是异步执行的，不会阻塞渲染
- 会影响到渲染的操作尽量放到 useLayoutEffect 中去，避免出现闪烁问题(比如在钩子中修改 DOM)
- useLayoutEffect 和 componentDidMount 是等价的，会同步调用，阻塞渲染
  <!-- - 在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致。 -->
