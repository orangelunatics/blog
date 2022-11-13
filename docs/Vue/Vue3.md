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

## 新 API(部分)

- setup

1. 不能写 async setup
2. 不要和 Vue2 的 data、metheods、computed 等 api 混用

- ref 方法

1. 需要引入：import { ref } from 'vue';
2. 原来的\$refs 对象仍可以使用

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

- reactive
