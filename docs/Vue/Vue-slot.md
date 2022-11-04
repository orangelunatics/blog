<h2 style="text-align: center;">talking about 插槽</h2>
- 注：在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的 attribute。

## why slot

- 复用性、更优雅
- 让父组件可以向子组件指定位置插入 html 结构，也是组件间通信的一种方式

## all kind of slots

### 默认插槽 slot

直接上代码

- 目的：写三个功能(布局)类似的模块，分别展示文字、图片和视频
- 注意：原本组件是单标签，现在变为双边签，内部放置插入内容；样式可以在父组件写也可以在子组件写；子组件 slot 元素之间存放默认值

```vue
<!-- 父组件 -->
<template>
  <div>
    <Category title="food">
      <img src="xx/food.png" alt="#" />
    </Category>
    <Category title="game">
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </Category>
    <Category title="film">
      <video controls src="xx/food.mp4"></video>
    </Category>
  </div>
</template>
<!-- 子组件 -->
<template>
  <div>
    <div>{{ title }}</div>
    <slot>这里放置默认值</slot>
  </div>
</template>
```

### 具名插槽

- 使用原因：写多个插槽对应不同模块

```vue
<!-- v2.6之前写法： -->
<!-- 父组件 -->
<template>
  <Category title="film">
    <img slot="center" src="xx/Forrest Gump.png" alt="#" />
    <a slot="footer" href="xx/douban.com"></a>
    <!-- 注意 插槽内容可以写多个(追加) 例如： -->
    <a slot="footer" href="xx/douban.com"></a>
    <a slot="footer" href="xx/douban.com"></a>
    <a slot="footer" href="xx/douban.com"></a>
  </Category>
  <!-- 上面的写法和下面是等价的 -->
  <Category title="film">
    <template slot="center">
      <img src="xx/Forrest Gump.png" alt="#" />
    </template>
    <template slot="footer">
      <a href="xx/douban.com"></a>
    </template>
  </Category>
</template>
<!-- 子组件 -->
<template>
  <div>
    <div>{{ title }}</div>
    <slot name="center">default one !!!!</slot>
    <slot name="footer">default two !!!!</slot>
  </div>
</template>
```

- 注意到，等价写法 template slot="center" 在 v2.6 提出了最新写法：
- 需要注意的是，v-slot 只能写在 template 标签上

```vue
<!-- 具名插槽最新写法： -->
<!-- 父组件 -->
<template>
  <Category title="film">
    <template v-slot:center>
      <img src="xx/Forrest Gump.png" alt="#" />
    </template>
    <template v-slot:footer>
      <a href="xx/douban.com"></a>
    </template>
  </Category>
</template>
```

### 作用域插槽

- 数据(data)放在子组件里，结构由使用者(父组件)决定
- 子组件的 slot 传值又传回给了使用者
- 使用者(父组件)使用的时候必须包一层&lt;template scope=""&gt;
- 用途：数据在子组件中时使用作用域插槽

```vue
<!-- 父组件 -->
<template>
  <Category>
    <template scope="xxx">
      <!-- 或者结构赋值：<template scope="{games}"> -->
      <!-- xxx是对象，包括子组件插槽反向传递的所有数据 -->
      <h3>{{ xxx.title }}</h3>
      <ul>
        <li v-for="(item, index) in xxx.games" :key="index">{{ item }}</li>
      </ul>
    </template>
  </Category>
</template>
<!-- 子组件 -->
<slot :games="games" :title="title">默认内容</slot>
<script>
export default {
  data() {
    return {
      games: ['lol', 'dnf', 'cf'],
      title: 'tencent games',
    };
  },
};
</script>
```

- &lt;template scope="xxx"&gt; 等价于 &lt;template slot-scope="xxx"&gt; 用哪个都可以 (都是 v2.6 之前的语法，v3 就不能用了)
- v2.6 开始的新 API 是 &lt;template v-slot="xxx"&gt;，注意在具名插槽里是冒号而这里是等于
- 很多时候匿名插槽或具名插槽与作用域插槽一起用：&lt;template v-slot:default="slotProps"&gt; 或 &lt;template v-slot:other="otherSlotProps"&gt;
