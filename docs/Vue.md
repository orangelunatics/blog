## Vue 源码

[Vue](https://vue-js.com/learn-vue/start/#_1-%E5%89%8D%E8%A8%80)

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

[三种](https://www.cnblogs.com/smzd/p/8665676.html)  
非懒加载：

<!-- ```js
const List = () => import("@/components/list.vue");
const router = new VueRouter({
  routes: [{ path: "/list", component: List }],
});
``` -->

懒加载方式一：使用 import 方法，切换相应的 path 时调用组件

```js
const List = () => import("@/components/list.vue");
const router = new VueRouter({
  routes: [{ path: "/list", component: List }],
});
```

## v-if 和 v-show

## data 必须为函数

如果是对象，那么多个组件指向同一个对象，修改一个会导致全部都修改。
[例子](https://www.dazhuanlan.com/ren2012r4/topics/1192478)
如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响;  
而 new Vue 的实例(根组件)，是不会被复用的，因此不存在引用对象的问题。[例子](https://www.cnblogs.com/lovekunkun/p/12144596.html)

## Vue 生命周期

1、new Vue(): 执行\_init 函数，初始化一些属性：如 initLifecycle、initEvents、initRender，然后执行 beforeCreate  
2、调用 beforeCreate()钩子, 之后初始化 inject、state 包括 props、methods、data、computed、watch，然后执行 created  
3、调用 created()钩子，所以在 created 能拿到 data 等数据，created 之后，调用 \$mount() 把组件挂载到 dom 上, 然后对模板进行编译，编译过程: 生成抽象语法树 AST，优化 AST+标记静态节点(因为静态节点不更新,能够优化性能)，根据 AST 生成 render 函数, 然后执行 beforeMount  
4、调用 beforeMount 钩子之后，vm.\_update(vm.\_render(), hydrating)，render 方法生成 vnode、而 update 方法会对 vnode 进行 patch，挂载到真实 dom 上，因为是首次，不需要进行新旧节点的 diff  
5、调用 mounted 钩子之后，组件就已经挂载到真实 dom 上，所以可以拿到 dom  
6、beforeUpdate 和 updated 的过程类似  
7、beforeDestroy 和 destroyed 之间进行组件的销毁操作，比如进行清除父子关系、watcher 关闭等逻辑

## Vue2 和 Vue3 区别

1、响应式原理改为 proxy  
2、diff 优化：patchFlag：给动态节点加上标记，动态节点类似于：{{ msg }}，编译解析过程中会给动态节点添加标记。这样做有利于 diff 算法在对比 dom 树的时候，省去对比静态节点，直接对比有标记的动态节点。  
3、生命周期更改：beforeCreate 和 created 被 setup 替换、beforeDestroy 替换为 beforeUnmount、destroyed 替换为 unmounted(更加语义化)  
4、采用 Fragment: template 可以写多个根元素  
5、更好的 Tree-Shaking  
MDN：Tree shaking 是一个通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code) 行为的术语。  
6、更好的支持 TS

## Vue 常见问题

1、nextTick(返回 promise)  
由于 dom(数据)的更新是异步的(类比 setState)，Vue 的 this.\$nextTick 方法是将执行逻辑放在 dom 更新之后执行，可以拿到最新的 dom/数据，再比如 created 钩子中 dom 还未挂载，那么也可以用这个方法来实现操作 dom。  
2、[Vue 模板编译过程](https://juejin.cn/post/6863241580753616903#heading-12)  
3、[keep-alive 缓存组件的原理](https://segmentfault.com/a/1190000022248237)  
① 首次渲染(执行正常的生命周期钩子和 activated)的时候，除了再 <keep-alive> 中建立缓存，设置 vnode.data.keepAlive 为 true，其他的过程和普通组件一样。  
② 命中缓存进行渲染时，不执行其他钩子，只执行 activated，并且对缓存的组件进行 patch，进行更新。  
4、[前端路由](https://juejin.cn/post/6844903890278694919#heading-4)

## Vue 与 React 对比

[详细](https://juejin.cn/post/6844904158093377549#heading-2)  
1、响应式：  
Vue: 2 里是 defineProperty 和发布订阅模式、3 是 proxy  
React：react 通过 setState 主动触发数据变化。
2、diff：  
相同点：同层级 On、唯一 key
Vue 采用双端指针(找到同一 key 的节点，移动即可，复用)，找到新旧节点的位置，边移动指针边对比边更新  
React 是从头开始比对 node，从而去新增、删除或移动节点(没有采用双端指针)  
3、事件  
React 采用合成事件，所有事件都冒泡到顶层 document 监听，然后在这里合成事件下发  
4、核心思想不同  
Vue 推崇渐进式开发(灵活易用，只需要使用核心的响应式和 diff 即可开发)、template(静态模板)、三部分分离  
React 推崇函数式开发(hooks)、jsx(动态，更多的是写 js，复杂的 js 逻辑，更适合复杂的 js 逻辑)

## 记录用户浏览时间

[详细](https://zhuanlan.zhihu.com/p/166402090) + 掘金也有类似  
1、多页面应用：进入、刷新和关闭：onload 和 beforeunload；页面跳转也是前两个；前进后退：onpageshow 和 onpagehide 事件记录时长。  
2、单页面应用：进入、刷新和关闭：onload 和 beforeunload；页面跳转和前进后退：history 路由用 onload 和 onpopstate + pushState + replaceState ，hash 路由用 onload 和 onhashchange。其中 history 里跳转是 pushState + replaceState，前进后退是 popstate。
