<h2 style="text-align: center;">talking about Vue.js/devtools</h2>
各框架都有自身的devtools，有助于开发调试。正式环境一般会隐藏devtools，但也有办法调出。

### Vue 项目

- 复制到控制台执行后，重启控制台即可。

```js
var Vue, walker, node;
walker = document.createTreeWalker(document.body, 1);
while ((node = walker.nextNode())) {
  if (node.__vue__) {
    Vue = node.__vue__.$options._base;
    if (!Vue.config.devtools) {
      Vue.config.devtools = true;
      if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
        console.log('==> vue devtools now is enabled');
      }
    }
    break;
  }
}
```

### Nuxt 项目

- 复制到控制台执行后，重启控制台即可。

```js
const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
const Vue = $('#__nuxt').__vue__.constructor;
Vue.config.devtools = true;
devtools.emit('init', Vue);
```
