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

3. 流程: 有空再补充~

## 派发更新

问：派发更新主要做什么事情？  
答：派发更新就是当响应式数据发生变动的时候，通知所有订阅了这个数据变化的 Watcher(既 Dep 依赖)执行 update。对于 render watcher 渲染 Watcher 而言，update 就是触发组件重新进行渲染；对于 computed watcher 计算属性 Watcher 而言，update 就是对计算属性重新求值；对于 user watcher 用户自定义 Watcher 而言，update 就是调用用户提供的回调函数。

#

### Object

添加和删除属性无法监听，需要 vm.$set和vm.$delete

1. set 原理：对新增的属性再次执行 defineReactive()进行响应式绑定，再通过 dep.notify()向依赖进行通知 **也属于派发更新**
2. delete 原理：delete 属性后用 dep.notify()通知依赖 **也属于派发更新**

### Array

1. 通过索引修改、新增、删除以及修改长度也无法监听，可以使用 set 或 delete，二者内部使用了 splice。因此也可以直接使用 splice。特别地，对于修改长度，要直接使用 splice 进行响应式
2. <span style="color:red">实际上，defineProperty 也可以对数组进行数据劫持，但为什么不呢?</span>本质上就是性能的取舍。对于在原有数组上的修改读取没有问题，push 和 pop 是操作尾部的，O(1)复杂度，问题不大。但'shift', 'unshift', 'splice', 'sort', 'reverse'，这些大概率会触发数组索引的移动或变动，触发很多次的 get 和 set。

### 计算属性 watcher 和侦听器 watcher

watcher 有三种：组件 watcher(render watcher)、计算属性 watcher、侦听器 watcher

1. computed watcher

计算属性的缓存(惰性求值)是根据 watcher 的 dirty 属性来判断，dirty 为 true 时，需要重新计算，然后再将 dirty 置为 false，之后再次读取计算属性时就不再重复计算，除非计算属性依赖的数据发生了变化

2. 用户注册的普通 watcher api(侦听器)  
   和 vm.\$watch 原理相同

- immediate 属性：new 一个 watcher 之后如果发现设置了 immediate 属性则立即执行回调
- deep 属性：递归遍历所有子属性，触发他们收集依赖的功能，从而实现深度监听

## Vue3

### 响应式

- 通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
- 通过 Reflect（反射）: 对源对象的属性进行操作。

```js
new Proxy(data, {
  // 拦截读取属性值
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  // 拦截设置属性值或添加新属性
  set(target, prop, value) {
    return Reflect.set(target, prop, value);
  },
  // 拦截删除属性
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop);
  },
});
proxy.name = 'ivan';
```

### Proxy：

- 缺点：

1. Proxy 的问题是兼容性较差(不支持 IE)，由于 ES5 的限制，Proxy 功能特性无法用 ES5 的语法写出来，也就是没有 polyfill，不过 IE 已经挂了。
2. 对于数组的响应式实现没什么优化

- 优点：

1. 抹平了对象和数组的实现上的差异
2. 能够监听新增属性和删除属性
3. proxy 代理的是对象，因此不需要遍历属性，但深层的对象仍需深度遍历。而 difineProperty 需要递归遍历所有属性，实际监听的是属性而不是对象
4. 使用了懒递归的方式。vue2 使用的是强制递归的方式对嵌套中的对象进行监听。而 vue3 是在读取对象内部的嵌套的对象时，才会为其建立代理
5. 能够监听 set 和 map、weakset 和 weakmap

### Reflect：

是 window 的内置对象，用来操作源对象。和直接操作源对象相比的优势是：

1. 不会因为报错而中断正常的代码逻辑执行(源码中常见，平常开发基本不使用)
2. set 返回布尔值，能判断是否执行成功
3. 和 proxy 的 handler 完全一致，天然适合搭配使用
4. 发生继承时可以明确调用主体

```js
let miaoMiao = {
  _name: '疫苗',
  get name() {
    return this._name;
  },
};
let miaoXy = new Proxy(miaoMiao, {
  get(target, prop, receiver) {
    return target[prop];
  },
});

let kexingMiao = {
  __proto__: miaoXy,
  _name: '科兴疫苗',
};

// 结果是疫苗  不符合预期
console.log(kexingMiao.name);

// 更改为：
let miaoMiao = {
  _name: '疫苗',
  get name() {
    return this._name;
  },
};
let miaoXy = new Proxy(miaoMiao, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
    // 也可以简写为 Reflect.get(...arguments)
  },
});

let kexingMiao = {
  __proto__: miaoXy,
  _name: '科兴疫苗',
};

// 结果是科兴疫苗
console.log(kexingMiao.name);
```

### reactive 对比 ref

- 从定义数据角度对比：

1. ref 用来定义：基本类型数据。(一般可以用对象封装一层，从而使用 reactive)
2. reactive 用来定义：对象（或数组）类型数据。
3. 备注：ref 也可以用来定义对象（或数组）类型数据, 它内部会自动通过 reactive 转为代理对象。区别是是否需要.value

- 从原理角度对比：

1. ref 定义基本类型时通过 Object.defineProperty()的 get 与 set 来实现响应式（数据劫持）
2. reactive 通过使用 Proxy 来实现响应式（数据劫持）, 并通过 Reflect 操作源对象内部的数据

- 从使用角度对比：

1. ref 定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value
2. reactive 定义的数据：操作数据与读取数据：均不需要.value。
