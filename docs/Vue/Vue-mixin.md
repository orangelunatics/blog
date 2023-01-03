<h2 style="text-align: center;">talking about mixin</h2>

- 在 Vue3 中，复用代码的方式有：组件、组合式函数、自定义指令等。其实在 Vue2 中，还有个很常用的方式————混入(mixin），和组件内的数据组合到一起使用
- 在混入时，如果出现 mixin 和组件里共有的 data 和 methods，则以组件为准；(合并为对象，以组件的为准)
- 如果都有某个生命周期函数，则都执行，并且 mixin 中定义的先执行(合并为数组，都执行)

## 局部混入

```vue
<!-- 组件 -->
<script>
import mixin1 from './mixin1.js';
import mixin2 from './mixin2.js';
export default {
  name: 'Student',
  mixins: [mixin1, mixin2],
};
</script>
```

```js
// mixin.js文件
// 和vue组件的js部分写法一致，可以有data、methods、生命周期等等
export default {
  methods: {
    showName() {
      console.log(this.msg);
    },
  },
  mounted() {
    console.log(1);
  },
};
```

补充：Vue 组件里的 name 属性的作用

- 用于 Vue devtools
- 用于递归组件

## 全局引入

- 在入口文件 main.js 中使用 Vue.mixin(xxx)注册
