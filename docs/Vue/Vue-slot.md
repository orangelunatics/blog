<h2 style="text-align: center;">talking about 插槽</h2>

注：在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的 attribute。

### 为什么发明/使用 slot

- 复用性
- 更优雅

### 默认插槽 slot (v2.6 之前)

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
