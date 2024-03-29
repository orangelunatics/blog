## Vue 基础

<!-- [Vue](https://vue-js.com/learn-vue/start/#_1-%E5%89%8D%E8%A8%80)   -->
<!-- [响应式原理](https://juejin.cn/post/6857669921166491662) -->

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
const List = () => import('@/components/list.vue');
const router = new VueRouter({
  routes: [{ path: '/list', component: List }],
});
```

## v-if 和 v-show

## data 必须为函数

如果是对象，那么多个组件指向同一个对象，修改一个会导致全部都修改。
[例子](https://www.dazhuanlan.com/ren2012r4/topics/1192478)
如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响;  
而 new Vue 的实例(根组件)，是不会被复用的，因此不存在引用对象的问题。[例子](https://www.cnblogs.com/lovekunkun/p/12144596.html)

## Vue 生命周期函数/钩子

四个阶段：初始化、模板编译、挂载、卸载
钩子(hooks): 在特定的动作发生时触发自定义脚本，这个功能就叫钩子 hooks

1. new Vue(): 执行\_init 函数，初始化一些属性：如 initLifecycle、initEvents、initRender，然后执行 beforeCreate
2. 调用 beforeCreate()钩子, 之后初始化 inject、state 包括 props、methods、data、computed、watch，然后执行 created
3. 调用 created()钩子，所以在 created 能拿到 data 等数据，created 之后，~~调用 \$mount() 把组件挂载到 dom 上, 然后~~对模板进行编译，编译过程: 生成抽象语法树 AST，优化 AST+标记静态节点(因为静态节点不更新,能够优化性能)，根据 AST 生成 render 函数, 然后执行 beforeMount
4. 调用 beforeMount 钩子之后，vm.\_update(vm.\_render(), hydrating)，render 方法生成 vnode、而 update 方法会对 vnode 进行 patch，挂载到真实 dom 上，因为是首次，不需要进行新旧节点的 diff(vm.\_render 用来生成虚拟 dom、执行 dom-diff、更新真实 dom。)
5. 调用 mounted 钩子之后，组件就已经挂载到真实 dom 上，所以可以拿到 dom
6. beforeUpdate 和 updated 的过程,进行 diff
7. beforeDestroy 和 destroyed 之间进行组件的销毁操作，比如将自身从父组件中移除、取消依赖追踪、移除所有事件监听器等

## Vue2 和 Vue3 区别

1. 响应式原理改为 proxy
2. diff 优化：最长递增子序列
   <!-- patchFlag：给动态节点加上标记，动态节点类似于：{{ msg }}，编译解析过程中会给动态节点添加标记。这样做有利于 diff 算法在对比 dom 树的时候，省去对比静态节点，直接对比有标记的动态节点。 -->
3. 生命周期更改：beforeCreate 和 created 被 setup 替换、beforeDestroy 替换为 beforeUnmount、destroyed 替换为 unmounted(更加语义化)
4. 采用 Fragment: template 可以写多个根元素
5. 更好的 Tree-Shaking  
   MDN：Tree shaking 是一个通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code) 行为的术语。
6. 更好的支持 TS  
   总结：更小(tree-shaking)、更快(改用 proxy, 两个优点：性能好无需递归遍历; 不用为数组单独重写原型方法)、维护性高(monorepo 结构)、VDOM Diff 重构(标记静态节点(不需比较)、静态标记?、事件缓存?)、composition API、
7. 应用层上最重要的是 composition API

## Vue 常见问题

1. nextTick  
   由于 dom(数据)的更新是异步的(类比 setState)，Vue 的 this.\$nextTick 方法是将执行逻辑放在 dom 更新之后执行，可以拿到最新的 dom/数据，再比如 created 钩子中 dom 还未挂载，那么也可以用这个方法来实现操作 dom。
2. [Vue 模板编译过程](https://juejin.cn/post/6863241580753616903#heading-12)
3. [keep-alive 缓存组件的原理](https://segmentfault.com/a/1190000022248237)

- 首次渲染(执行正常的生命周期钩子和 activated)的时候，除了再 <keep-alive /> 中建立缓存，设置 vnode.data.keepAlive 为 true，其他的过程和普通组件一样。
- 命中缓存进行渲染时，不执行其他钩子，只执行 activated，并且对缓存的组件进行 patch，进行更新。
- 初始进入和离开 created ---> mounted ---> activated --> deactivated, 后续进入和离开 activated --> deactivated

4. [前端路由](https://juejin.cn/post/6844903890278694919#heading-4)
5. Vue 项目的执行顺序： index.html(模板) => main.js(入口文件) => App.vue(根组件)

## Vue 与 React 对比

[详细](https://juejin.cn/post/6844904158093377549#heading-2)

1. 响应式：  
   Vue: 2 里是 defineProperty 和发布订阅模式、3 是 proxy  
   React：react 通过 setState 主动触发数据变化。
2. diff：  
    相同点：同层级 On、唯一 key
   Vue 采用双端指针(找到同一 key 的节点，移动即可，复用)，找到新旧节点的位置，边移动指针边对比边更新  
    React 是从头开始比对 node，从而去新增、删除或移动节点(没有采用双端指针)  
    **传统的 diff**：遍历第一棵树，在第一棵树的遍历中再去遍历第二颗树，找出各个节点 diff 出的结果并记录到一个数组中，这里头操作的时间复杂度是 O(n^2)
   遍历 diff 记录的数组，并对第一棵树的 diff 位置做增删改操作，时间复杂度 O(n)
3. 事件  
   React 采用合成事件，所有事件都冒泡到顶层 document 监听，然后在这里合成事件下发
4. 核心思想不同  
   Vue 推崇渐进式开发(灵活易用，只需要使用核心的响应式和 diff 即可开发)、template(静态模板)、三部分分离  
   React 推崇函数式开发(hooks)、jsx(动态，更多的是写 js，复杂的 js 逻辑，更适合复杂的 js 逻辑)

## Vue 样式问题

1. vue 动态创建的元素的类要单独写一个 style 标签里
2. [修改第三方组件样式](https://www.cnblogs.com/youhong/p/11637695.html)

## 表单输入绑定

用 v-model 指令在表单 input、textarea 及 select 元素上创建双向数据绑定

- text 和 textarea 元素使用 value property 和 input 事件 (文本框，用 input 是因为让其实时触发)
- checkbox 和 radio 使用 checked property 和 change 事件 (选择框)
- select 下拉框将 value 作为 prop 并将 change 作为事件(下拉框)

补充：change 事件在**失焦**并且内容变化时才触发回调，input 事件是实时触发

## 理解虚拟 DOM

所有 html 结构，都可以用 js dom 来构造，而且能将构造的步骤封装起来，做到「数据-dom 结构」的映射。缓存初始数据，新数据进来时，与旧数据对比，找到差异，根据差异本身的性质进行 dom 操作；无差异，则不作为。dom 本身在 js 中就是一种数据结构，console.dir(document.body)，在控制台可以看到 body 的数据结构。然而，dom 相关的数据丰富而且复杂，**我们其实只关心少数元素的少数属性**。建立一个 javascript plain object，非常轻量，用它保存我们真正关心的与 dom 相关的少数数据；对它进行操作，然后对比操作前后的差异，再根据映射关系去操作真正的 dom，无疑能提高性能。

## 单向数据流和双向绑定

1. 单向数据流：比如父子传值，有利于状态管理，可维护性高
2. 双向绑定：一般用于 UI 组件，v-model

## Vue 组件间通信

1. 父子组件通信：props、emit、refs、children、parent、slot
2. 爷孙组件通信：v-on="listeners"、v-bind="attrs"、provide 和 inject(祖先组件通过 provide 提供数组，后代组件 inject 消费)
3. 跨组件通信：eventbus(发布订阅)、vuex

## 前端路由

以 vue 为例，称为 vue-router，单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面，要做到：

- 可以监听到 url 的变化，展示不同内容
- 改变 url 且不让浏览器像服务器发送请求

### hash 模式

- 修改#后面的锚点值(location.hash)
- 通过 window.onhashchange 的方式，来监听 hash 的改变，借此实现无刷新跳转的功能
- 切换 hash 时不进行请求

### history 模式

- 利用了 HTML5 History Interface 中新增的 history.pushState() 和 history.replaceState() 方法,分别可以添加和修改历史记录条目。这些方法通常与 window.onpopstate 配合使用。 history.pushState() 和 history.replaceState() 可以**改变 url 同时，不会刷新页面**
- 对于单页应用的 history 模式而言，url 的改变只能由下面四种方式引起：

1. 点击浏览器的前进或后退按钮
2. 点击 a 标签
3. 在 JS 代码中触发 history.pushState 函数
4. 在 JS 代码中触发 history.replaceState 函数

- 给不同的 path 注册对应的回调(加载视图)，切换视图时利用 pushState 和 replaceState 切换 url，触发回调展示不同视图；对于前进后退，利用 popstate 事件监听这些行为，切换不同的视图。
- 缺点 1：需要注意，在修改 url 后，虽然页面并不会刷新，但我们在手动刷新，或通过 url 直接进入应用的时候， 服务端是无法识别这个 url 的，因为我们是单页应用，只有一个 html 文件，服务端在处理其他路径的 url 的时候，就会出现 404 的情况。所以，如果要应用 history 模式，需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回单页应用的 html 文件。(**也就是说需要服务端做好 url 适配**)
- 缺点 2：兼容性
- 优点：pushState 和 replaceState 设置的 url 可以是任意同源的 url；新的 url 和原来的 url 一样，也可以添加到历史记录栈中，而 hash 模式对于两个相同的 hash 值不行

## Vue 过滤器(Vue3 已废弃)

## Vue 指令修饰符

## Vue 自定义指令

<!-- ## Nuxt.js

- 在服务端支持的 vue 生命周期只有 beforeCreate/created -->
