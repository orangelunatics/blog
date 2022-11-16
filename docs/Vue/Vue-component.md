<h2 style="text-align: center;">talking about 自定义组件</h2>

## Vue.component

- 获取或注册全局组件，一般用来定义项目里频繁使用的组件，注册到全局无需每个地方 import
- 全局组件

```js
// .vue文件
// 略

// 统一管理 global.js
import a from './a.vue';
import b from './b.vue';

export default {
  install(Vue) {
    Vue.component(a, 'a'); // 全局组件a
    Vue.component(b, 'b'); // 全局组件a
  },
};

// 入口文件.js
import components from './global.js';

Vue.use(components); // 触发install
```

## Vue.extend

与 Vue.component 区别是，extend 一般用于定义动态组件(this.xx()调用、编程式组件)，比如模态框

### 弹窗组件

```vue
<template>
  <div id="confirm" v-if="flag">
    <div class="contents">
      <div class="content-top">{{ text.title }}</div>
      <div class="content-center">{{ text.msg }}</div>
      <div class="content-bottom">
        <button @click="ok" class="left">{{ text.btn.ok }}</button>
        <button @click="no" class="right">{{ text.btn.no }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      text: {
        title: '标题',
        msg: '这是一个弹出框组件',
        btn: {
          ok: '确定',
          no: '取消',
        },
      },
    };
  },
  methods: {
    ok() {
      // this.flag = false;  这里不写也可以
      // FIXME:但是必须声明ok和no这两个方法  原因？
    },
    no() {
      // this.flag = false;
    },
  },
};
</script>

<style scoped>
#confirm {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
.contents {
  width: 250px;
  height: 180px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -90px;
  margin-left: -125px;
}
.content-top {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
}
.content-center {
  width: 90%;
  height: 80px;
  margin: 5px auto;
}
.content-bottom {
  width: 85%;
  height: 40px;
  margin: 0 auto;
  /* border:1px solid red; */
  position: relative;
}
.left {
  position: absolute;
  left: 0;
  width: 40%;
}
.right {
  position: absolute;
  right: 0;
  width: 40%;
}
</style>
```

### 构造器逻辑

```js
import Vue from 'vue';
import Confirm from './confirm.vue';

let confirmStructor = Vue.extend(Confirm); //返回一个实例创建的构造器，但实例构造器需要进行挂载到页面中

let theConfirm = function(text) {
  return new Promise((resolve, reject) => {
    //返回一个promise，进行异步操作，成功时返回，失败时返回
    let confirmDom = new confirmStructor({
      el: document.createElement('div'),
    });
    //此时的confirmDom通俗讲就是相当于是整个组件对象，通过对象调用属性的方法来进行组件中数据的使用
    document.body.appendChild(confirmDom.$el);

    //此时进行创建组件的逻辑处理
    confirmDom.text = text; //将需要传入的文本内容传给组件实例
    confirmDom.ok = () => {
      resolve();
      document.body.removeChild(confirmDom.$el);
      confirmDom.flag = false;
    };
    confirmDom.no = () => {
      reject();
      document.body.removeChild(confirmDom.$el);
      confirmDom.flag = false;
    };
  });
};

//将逻辑函数进行导出和暴露
export default theConfirm;
```

### 挂载到原型

```js
// main.js
import theConfirm from './confirm.js';

Vue.prototype.$confirm = theConfirm;
```

### 页面使用

```js
//最后将此组件的逻辑函数添加到vue的原型中去，使之能进行全局调用和直接调用，当调用时，就是执行逻辑函数中的内容
this.$confirm({
  title: '标题',
  msg: '内容',
  btn: {
    ok: '确定',
    no: '取消',
  },
})
  .then(() => {
    console.log('ok');
  })
  .catch(() => {
    console.log('no');
  });
```

![toast](/blog/assets/img/toast.png)
