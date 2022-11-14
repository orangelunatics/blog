<h2 style="text-align: center;">talking about Vue.js reactive</h2>

## Vue2

数据劫持(Object.defineProperty)和发布订阅模式

1. 类：

- Observer: 这里的主要工作是递归地监听对象上的所有属性(调用 defineReactive 方法进行响应式绑定，绑定过程是用 defineProperty 的 get 和 set 进行数据劫持)
- Watcher: 观察者(依赖)，当监听的数据值修改时，执行响应的回调函数或触发视图更新(update 方法)
- Dep: 链接 Observer 和 Watcher 的桥梁，每一个 Observer 对应一个 Dep，它内部维护一个数组，保存与该 Observer 相关的 Watcher(append 方法收集依赖，notify 方法通知每一个依赖)

2. 方法:

- object.defineProperty(在 defineReactive 中执行)
- defineReactive

3. 流程:

### Object

添加和删除属性无法监听，需要 vm.$set和vm.$delete

1. set 原理：对新增的属性再次执行 defineReactive()进行响应式绑定，再通过 dep.notify()向依赖进行通知
2. delete 原理：delete 属性后用 dep.notify()通知依赖

### Array

通过索引修改、新增、删除以及修改长度也无法监听，可以使用 set 或 delete，二者内部使用了 splice。因此也可以直接使用 splice。  
特别地，对于修改长度，要直接使用 splice 进行响应式

### 计算属性 watcher 和侦听器 watcher

watcher 有三种：组件 watcher(render watcher)、计算属性 watcher、侦听器 watcher

1. computed watcher

计算属性的缓存(惰性求值)是根据 watcher 的 dirty 属性来判断，dirty 为 true 时，需要重新计算，然后再将 dirty 置为 false，之后再次读取计算属性时就不再重复计算，除非计算属性依赖的数据发生了变化

2. 用户注册的普通 watcher api(侦听器)  
   和 vm.\$watch 原理相同

- immediate 属性：new 一个 watcher 之后如果发现设置了 immediate 属性则立即执行回调
- deep 属性：递归遍历所有子属性，触发他们收集依赖的功能，从而实现深度监听

## Vue3
