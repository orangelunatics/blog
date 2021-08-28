## Vue 源码

[Vue](https://vue-js.com/learn-vue/start/#_1-%E5%89%8D%E8%A8%80)

## Vue 常见问题

1、nextTick(返回 promise)  
由于 dom(数据)的更新是异步的(类比 setState)，Vue 的 this.\$nextTick 方法是将执行逻辑放在 dom 更新之后执行，可以拿到最新的 dom/数据，再比如 created 钩子中 dom 还未挂载，那么也可以用这个方法来实现操作 dom。  
2、[Vue 模板编译过程](https://juejin.cn/post/6863241580753616903#heading-12)  
3、[keep-alive 缓存组件的原理](https://segmentfault.com/a/1190000022248237)  
4、[前端路由](https://juejin.cn/post/6844903890278694919#heading-4)

## 响应式原理

Observer 类会通过递归的方式把一个对象的所有属性都转化成可观测对象  
依赖管理器 Dep 类  
数据变化时，我们不直接去通知依赖更新，而是通知依赖对应的 Watch 实例，由 Watcher 实例去通知真正的视图。
不足:  
1.虽然我们通过 Object.defineProperty 方法实现了对 object 数据的可观测，但是这个方法仅仅只能观测到 object 数据的取值及设置值，当我们向 object 数据里添加一对新的 key/value 或删除一对已有的 key/value 时，它是无法观测到的，导致当我们对 object 数据添加或删除值时，无法通知依赖，无法驱动视图进行响应式更新。  
2.通过数组下标修改数组中的数据  
3.通过修改数组长度清空(改变)数组
解决:  
Vue 增加了两个全局 API:Vue.set 和 Vue.delete,更进一步:Proxy

## 路由懒加载(按需加载)

非懒加载：

```js
const List = () => import("@/components/list.vue");
const router = new VueRouter({
  routes: [{ path: "/list", component: List }],
});
```

懒加载方式一：使用 import 方法，切换相应的 path 时调用组件

```js
const List = () => import("@/components/list.vue");
const router = new VueRouter({
  routes: [{ path: "/list", component: List }],
});
```
