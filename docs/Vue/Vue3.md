<h2 style="text-align: center;">talking about Vue3</h2>
  
## 入口文件
- 在Vue3中的入口文件中，挂载方式为：  
```js
// Vue2引入的是Vue构造函数 需要new ；
// Vue3引入的是一个名为createApp的工厂函数
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
createApp(App).mount('#app'); // 创建 vm 层并挂载到#app 容器中
```

## setup

- 不能写 async setup，不要和 Vue2 的 data、metheods、computed 等 api 混用；一个组件里写多个 setup 则只执行最后一个。
- 执行时机：在 beforeCreate 之前执行一次，this 是 undefined
- 参数：

1. props：值为对象，包含组件外部传递过来，且组件内部声明接收了的属性。
2. context：上下文对象
   2.1 attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 this.\$attrs。  
   2.2 slots: 收到的插槽内容, 相当于 this.$slots。  
   2.3 emit: 分发自定义事件的函数, 相当于 this.$emit。

## ref

- 需要引入：import { ref } from 'vue';
- 作用：定义一个响应式的数据，接收的数据可以是：基本类型、也可以是对象类型。JS 读取需要.value，模板里读取不需要.value
- 基本类型的数据：响应式依然是靠 Object.defineProperty()的 get 与 set 完成的。
- 对象类型的数据：内部 “ 求助 ” 了 Vue3.0 中的一个新函数—— reactive 函数。
- 原来的\$refs 对象仍可以使用

```vue
<template>
  <!-- 注意  模板中不需要.value -->
  <h2>姓名：{{ name }}</h2>
  <h2>岗位：{{ job.type }}</h2>
  <h2>薪水：{{ job.money }}</h2>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    // data
    let name = ref('navi'); // ref返回的是响应式的实例对象  value是字符串navi
    let job = ref({
      type: 'fe',
      money: '30k',
    });

    // methods
    function changeInfo() {
      name.value = 'ivan';
      job.value.type = 'be'; // 对象类型也需要.value  但内部的属性不需要再.value
    }

    // return
    return {
      name,
      changeInfo,
    };
  },
};
</script>
```

## reactive

- 定义响应式的数据，只能是引用对象，读取不需要.value
- 返回一个代理对象（Proxy 的实例对象，简称 proxy 对象）
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

## 生命周期

- Vue3.0 中可以继续使用 Vue2.x 中的生命周期钩子，但有有两个被更名：

1. beforeDestroy 改名为 beforeUnmount
2. destroyed 改名为 unmounted

- Vue3.0 也提供了 Composition API(就是**在 setup 里面写**) 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下：

1. beforeCreate===>setup() 不用写 beforeCreate，变化较大
2. created=======>setup() 同上
3. beforeMount ===>onBeforeMount
4. mounted=======>onMounted
5. beforeUpdate===>onBeforeUpdate
6. updated =======>onUpdated
7. beforeUnmount ==>onBeforeUnmount
8. unmounted =====>onUnmounted
   使用：

```js
import {onBeforeMount} from 'vue';
setup() {
  onBeforeMount(() => {

  })
}
```

## 自定义 hook

- 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。
- 类似于 vue2.x 中的 mixin。
- 自定义 hook 的优势: **复用代码**, 让 setup 中的逻辑更清楚易懂。

```js
// usePoint.js  显示鼠标位置的hook
import { onBeforeMount, onBeforeUnmount } from 'vue';

export default function() {
  const point = reactive({
    x: 0,
    y: 0,
  });
  const savePoint = (e) => {
    point.x = e.pageX;
    point.y = e.pageY;
  };
  onBeforeMount(() => {
    window.addEventListener('click', savePoint);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint);
  });

  return point;
}

// demo.vue
import { usePoint } from './usePoint'
setup() {
  let point = usePoint();
  return {point}
}
```

## composition API

- 包括 setup、ref、reactive、computed、watch、生命周期、toRef 等等
- toRef、toRefs:

1. 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。**使用深层对象的属性时更便捷**
2. 语法：const name = toRef(person,'name')
3. 应用: 要将响应式对象中的某个属性单独提供给外部使用时。
4. 扩展：toRefs 与 toRef 功能一致，但可以批量创建多个 ref 对象，语法：toRefs(person)

```js
return {
  ...toRefs(person),
  name: toRef(person.'name'),
};
```

- 其它 Composition API：shallowReactive 与 shallowRef、readonly 与 shallowReadonly、toRaw 与 markRaw、customRef、provide 与 inject

## 其它 Composition API

### shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
- 什么时候使用?

1. 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。 **性能优化**
2. 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

### readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据(尤其是这个数据是来自与其他组件时)被修改时。

### toRaw 与 markRaw (raw: 原始、未加工)

- toRaw：

1. 作用：将一个由 reactive 生成的响应式对象转为普通对象。(不支持 ref 定义的响应式数据)
2. 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

- markRaw：

1. 作用：标记一个对象，使其永远不会再成为响应式对象。
2. 应用场景:
   有些值不应被设置为响应式的，例如复杂的第三方类库等。  
   当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。 **性能优化**

### customRef

作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

### 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
- isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
- isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

## Options API 与 Composition API 对比

- 不同功能的逻辑是分散的
- ![options](/blog/assets/img/optionsAPI.gif)
- 借助 hooks，我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。
- ![compositions](/blog/assets/img/compositionAPI.gif)

## Fragment

- 在 Vue2 中: 组件必须有一个根标签
- 在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## Teleport

- 能够将我们的组件 html 结构移动到指定位置

```html
<teleport to="body">
  <div v-if="isShow" class="mask">
    <div class="dialog">
      <h3>我是一个弹窗</h3>
      <button @click="isShow = false">关闭弹窗</button>
    </div>
  </div>
</teleport>
```

## Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验(实际开发时需要权衡，比如核心功能直接加载、周边功能异步加载)
- 使用步骤：

1. 异步引入组件

```js
import { defineAsyncComponent } from 'vue';
const Child = defineAsyncComponent(() => import('./components/Child.vue'));
```

2. 使用 Suspense 包裹组件，并配置好 default 与 fallback

```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <Child />
      </template>
      <template v-slot:fallback>
        <h3>加载中.....</h3>
      </template>
    </Suspense>
  </div>
</template>
```
