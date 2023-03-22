(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{483:function(t,a,s){"use strict";s.r(a);var n=s(23),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{staticStyle:{"text-align":"center"}},[t._v("talking about Vue.js reactive")]),t._v(" "),s("h2",{attrs:{id:"vue2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue2"}},[t._v("#")]),t._v(" Vue2")]),t._v(" "),s("p",[t._v("数据劫持(Object.defineProperty)和发布订阅模式")]),t._v(" "),s("ol",[s("li",[t._v("类：")])]),t._v(" "),s("ul",[s("li",[t._v("Observer: 这里的主要工作是递归地监听对象上的所有属性(调用 defineReactive 方法进行响应式绑定，绑定过程是用 defineProperty 的 get 和 set 进行数据劫持)")]),t._v(" "),s("li",[t._v("Watcher: 观察者(依赖)，当监听的数据值修改时，执行响应的回调函数或触发视图更新(update 方法)")]),t._v(" "),s("li",[t._v("Dep: 链接 Observer 和 Watcher 的桥梁，每一个 Observer 对应一个 Dep，它内部维护一个数组，保存与该 Observer 相关的 Watcher(append 方法收集依赖，notify 方法通知每一个依赖)")])]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("方法:")])]),t._v(" "),s("ul",[s("li",[t._v("object.defineProperty(在 defineReactive 中执行)")]),t._v(" "),s("li",[t._v("defineReactive")])]),t._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[t._v("流程: 有空再补充~")])]),t._v(" "),s("h2",{attrs:{id:"派发更新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#派发更新"}},[t._v("#")]),t._v(" 派发更新")]),t._v(" "),s("p",[t._v("问：派发更新主要做什么事情？"),s("br"),t._v("\n答：派发更新就是当响应式数据发生变动的时候，通知所有订阅了这个数据变化的 Watcher(既 Dep 依赖)执行 update。对于 render watcher 渲染 Watcher 而言，update 就是触发组件重新进行渲染；对于 computed watcher 计算属性 Watcher 而言，update 就是对计算属性重新求值；对于 user watcher 用户自定义 Watcher 而言，update 就是调用用户提供的回调函数。")]),t._v(" "),s("h3",{attrs:{id:"object"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#object"}},[t._v("#")]),t._v(" Object")]),t._v(" "),s("p",[t._v("添加和删除属性无法监听，需要 vm.$set和vm.$delete")]),t._v(" "),s("ol",[s("li",[t._v("set 原理：对新增的属性再次执行 defineReactive()进行响应式绑定，再通过 dep.notify()向依赖进行通知 "),s("strong",[t._v("也属于派发更新")])]),t._v(" "),s("li",[t._v("delete 原理：delete 属性后用 dep.notify()通知依赖 "),s("strong",[t._v("也属于派发更新")])])]),t._v(" "),s("h3",{attrs:{id:"array"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#array"}},[t._v("#")]),t._v(" Array")]),t._v(" "),s("ol",[s("li",[t._v("通过索引修改、新增、删除以及修改长度也无法监听，可以使用 set 或 delete，二者内部使用了 splice。因此也可以直接使用 splice。特别地，对于修改长度，要直接使用 splice 进行响应式")]),t._v(" "),s("li",[s("span",{staticStyle:{color:"red"}},[t._v("实际上，defineProperty 也可以对数组进行数据劫持，但为什么不呢?")]),t._v("本质上就是性能的取舍。对于在原有数组上的修改读取没有问题，push 和 pop 是操作尾部的，O(1)复杂度，问题不大。但'shift', 'unshift', 'splice', 'sort', 'reverse'，这些大概率会触发数组索引的移动或变动，触发很多次的 get 和 set。")])]),t._v(" "),s("h3",{attrs:{id:"计算属性-watcher-和侦听器-watcher"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算属性-watcher-和侦听器-watcher"}},[t._v("#")]),t._v(" 计算属性 watcher 和侦听器 watcher")]),t._v(" "),s("p",[t._v("watcher 有三种：组件 watcher(render watcher)、计算属性 watcher、侦听器 watcher")]),t._v(" "),s("ol",[s("li",[t._v("computed watcher")])]),t._v(" "),s("p",[t._v("计算属性的缓存(惰性求值)是根据 watcher 的 dirty 属性来判断，dirty 为 true 时，需要重新计算，然后再将 dirty 置为 false，之后再次读取计算属性时就不再重复计算，除非计算属性依赖的数据发生了变化")]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("用户注册的普通 watcher api(侦听器)"),s("br"),t._v("\n和 vm.$watch 原理相同")])]),t._v(" "),s("ul",[s("li",[t._v("immediate 属性：new 一个 watcher 之后如果发现设置了 immediate 属性则立即执行回调")]),t._v(" "),s("li",[t._v("deep 属性：递归遍历所有子属性，触发他们收集依赖的功能，从而实现深度监听")])]),t._v(" "),s("h2",{attrs:{id:"vue3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue3"}},[t._v("#")]),t._v(" Vue3")]),t._v(" "),s("h3",{attrs:{id:"响应式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#响应式"}},[t._v("#")]),t._v(" 响应式")]),t._v(" "),s("ul",[s("li",[t._v("通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。")]),t._v(" "),s("li",[t._v("通过 Reflect（反射）: 对源对象的属性进行操作。")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Proxy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拦截读取属性值")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Reflect"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拦截设置属性值或添加新属性")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Reflect"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拦截删除属性")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("deleteProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Reflect"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("deleteProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nproxy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ivan'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"proxy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#proxy"}},[t._v("#")]),t._v(" Proxy：")]),t._v(" "),s("ul",[s("li",[t._v("缺点：")])]),t._v(" "),s("ol",[s("li",[t._v("Proxy 的问题是兼容性较差(不支持 IE)，由于 ES5 的限制，Proxy 功能特性无法用 ES5 的语法写出来，也就是没有 polyfill，不过 IE 已经挂了。")]),t._v(" "),s("li",[t._v("对于数组的响应式实现没什么优化")])]),t._v(" "),s("ul",[s("li",[t._v("优点：")])]),t._v(" "),s("ol",[s("li",[t._v("抹平了对象和数组的实现上的差异")]),t._v(" "),s("li",[t._v("能够监听新增属性和删除属性")]),t._v(" "),s("li",[t._v("proxy 代理的是对象，因此不需要遍历属性，但深层的对象仍需深度遍历。而 difineProperty 需要递归遍历所有属性，实际监听的是属性而不是对象")]),t._v(" "),s("li",[t._v("使用了懒递归的方式。vue2 使用的是强制递归的方式对嵌套中的对象进行监听。而 vue3 是在读取对象内部的嵌套的对象时，才会为其建立代理")]),t._v(" "),s("li",[t._v("能够监听 set 和 map、weakset 和 weakmap")])]),t._v(" "),s("h3",{attrs:{id:"reflect"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reflect"}},[t._v("#")]),t._v(" Reflect：")]),t._v(" "),s("p",[t._v("是 window 的内置对象，用来操作源对象。和直接操作源对象相比的优势是：")]),t._v(" "),s("ol",[s("li",[t._v("不会因为报错而中断正常的代码逻辑执行(源码中常见，平常开发基本不使用)")]),t._v(" "),s("li",[t._v("set 返回布尔值，能判断是否执行成功")]),t._v(" "),s("li",[t._v("和 proxy 的 handler 完全一致，天然适合搭配使用")]),t._v(" "),s("li",[t._v("发生继承时可以明确调用主体")]),t._v(" "),s("li",[t._v("以 Reflect.get(target, key, receiver)为例，第三个参数为调用 get 时的 this 指向，receiver 设置为代理对象(p = new Proxy()中的 p)，这样可以将 this 指向代理对象，从而建立响应式的联系(和第四点类似)")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" miaoMiao "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  _name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'疫苗'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" miaoXy "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Proxy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("miaoMiao"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" receiver"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" kexingMiao "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  __proto__"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" miaoXy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  _name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'科兴疫苗'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 结果是疫苗  不符合预期")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("kexingMiao"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 更改为：")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" miaoMiao "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  _name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'疫苗'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" miaoXy "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Proxy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("miaoMiao"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" receiver"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Reflect"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" receiver"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 也可以简写为 Reflect.get(...arguments)")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" kexingMiao "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  __proto__"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" miaoXy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  _name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'科兴疫苗'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 结果是科兴疫苗")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("kexingMiao"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"reactive-对比-ref"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reactive-对比-ref"}},[t._v("#")]),t._v(" reactive 对比 ref")]),t._v(" "),s("ul",[s("li",[t._v("从定义数据角度对比：")])]),t._v(" "),s("ol",[s("li",[t._v("ref 用来定义：基本类型数据。(一般可以用对象封装一层，从而使用 reactive)")]),t._v(" "),s("li",[t._v("reactive 用来定义：对象（或数组）类型数据。")]),t._v(" "),s("li",[t._v("备注：ref 也可以用来定义对象（或数组）类型数据, 它内部会自动通过 reactive 转为代理对象。区别是是否需要.value")])]),t._v(" "),s("ul",[s("li",[t._v("从原理角度对比：")])]),t._v(" "),s("ol",[s("li",[t._v("ref 定义基本类型时通过 Object.defineProperty()的 get 与 set 来实现响应式（数据劫持）")]),t._v(" "),s("li",[t._v("reactive 通过使用 Proxy 来实现响应式（数据劫持）, 并通过 Reflect 操作源对象内部的数据")])]),t._v(" "),s("ul",[s("li",[t._v("从使用角度对比：")])]),t._v(" "),s("ol",[s("li",[t._v("ref 定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value")]),t._v(" "),s("li",[t._v("reactive 定义的数据：操作数据与读取数据：均不需要.value。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);