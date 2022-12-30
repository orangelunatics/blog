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
- 让组件在 props 变化时更新 state。
  <!-- - 可以比较 props 和 state 来加一些限制条件，防止无用的 state 更新(性能优化) -->

3. render: 渲染 DOM
4. componentDidMount: DOM 挂载完毕调用，可以用来发送请求等
5. shouldComponentUpdate：

- 用法：shouldComponentUpdate(nextProps, nextState)
- 包含两个参数，第一个是即将更新的 props 值，第二个是即将跟新后的 state 值，可以根据更新前后的 props 或 state 来比较加一些限制条件，决定是否更新，进行性能优化

6. getSnapshotBeforeUpdate：获取 DOM 真正更新前的信息，例如滚动位置
7. componentDidUpdate：

- 用法：componentDidUpdate(prevProps, prevState, snapshot)，包含三个参数，第一个是上一次 props 值。 第二个是上一次 state 值。如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），第三个是“snapshot” 参数传递

8. componentWillUnmount：将被卸载时调用
