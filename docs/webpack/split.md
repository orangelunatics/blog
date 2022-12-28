## webpack 分包

### 什么是 Webpack

为方便非前端人员看懂本文，先谈谈 Webpack 是什么。简单来说，Webpack 是一种打包工具，用于代码的压缩、混淆、编译等等。而在 Webpack 的配置文件中，有两个非常重要的选项：Loader 和 Plugin。由于 Webpack 只认识 .js 和 .json 两种文件，因此 Loader 担任翻译官这一角色，用于资源转译(如.less, .jsx)，而 Plugin 用于监听 Webpack 生命周期广播出事件，从而改变打包结果，也就是能够拓展 Webpack 的功能。这篇文章的主题则是配置文件的另一个选项 optimization 中的 splitChunks 字段。

### 为什么要分包

由于 Webpack 会按照设置的入口文件 entry 来寻找模块间的依赖关系，如果只设置了单入口，理论上来说最终的打包结果是一个单独的包，但在大型项目中，这样做对前端性能和用户体验的影响是巨大的，主要有两个缺点：

- **等待时间漫长**：客户端必须等到整个项目全部加载好之后才能运行，极其缓慢。
- **缓存难以命中**：更改某处的代码后，需要重新获取所有资源，没有利用好浏览器的缓存机制。

因此在打包过程中需要拆分代码，从而提升用户体验。Webpack 本身具有默认的分包规则，打包过程本质上就是由 module 到 chunk 的过程，这一过程的核心是 Webpack 的 seal 阶段，最终生成的 chunk 类型有三种：

- 同一入口触达到的模块，称为 **initial chunk**
- 异步模块，如 ES6 的动态引入 import()，称为 **async chunk**
- entry.runtime 组成的 chunk，称为 **runtime chunk**

在 Webpack3 之前就是采用这种默认策略，最大的问题就是不能解决**重复依赖**，也就是说多个入口中引入了同种依赖，会被重复打包，极其影响性能。因此在 Webpack3 中引入了 CommonChunkPlugin 来解决这一问题，而 CommonChunkPlugin 的缺陷在于无法判断公共依赖是父 chunk 还是子 chunk，从而会导致其他问题。

### 什么是 SplitChunksPlugin

从 Webpack4 开始，引入了一个内置的 Plugin ：SplitChunksPlugin，实现了更加智能与全面的分包策略。在 Webpack 的配置文件中位置如下：

```js
module.exports = {
  entry: ['file1.js','file2.js'],
  output: {...},
  module: {...},
  plugins: [...],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
```

上文提到 Plugin 是通过监听 Webpack 事件从而实现相应的功能，本文使用[Webpack4 源码](https://github.com/webpack/webpack/tree/webpack-4)进行分析，从 webpack/lib/optimize/SplitChunksPlugin.js 文件中可以看到，该 Plugin 订阅了 optimizeChunksAdvanced 钩子（文件的第 352 行开始）：

```js
// SplitChunksPlugin.js
apply(compiler) {
  compiler.hooks.thisCompilation.tap("SplitChunksPlugin", compilation => {
    let alreadyOptimized = false;
    compilation.hooks.unseal.tap("SplitChunksPlugin", () => {
      alreadyOptimized = false;
    });
    compilation.hooks.optimizeChunksAdvanced.tap(
      "SplitChunksPlugin",
      chunks => {
	    //  ...
	   }
    )
  })
}
```

而在 lib/Compilation.js 文件中，compilation.seal 方法定义了一系列钩子（文件的 1283 行开始）：

```js
// Compilation.js
seal() {
	// ...
	this.hooks.optimizeChunksAdvanced.call(this.chunks, this.chunkGroups)
	// ...
}
```

没错，就是采用了发布订阅模式，上述两个代码块将 Webpack 与 Plugin 进行连接，因此，在 Webpack 的 seal 阶段，SplitChunksPlugin 可以对默认分包规则所生成的 chunk 做进一步的优化。

## SplitChunksPlugin 的分包优化

### 配置项

从官方文档中可以看到 optimization.splitChunks 的[v5 默认配置](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunkschunks)或[v4 默认配置](https://v4.webpack.docschina.org/plugins/split-chunks-plugin/#splitchunkscachegroups)，这里以 v4 为例：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

选择其中几个配置项进行说明：

- enforceSizeThreshold：超过 enforceSizeThreshold 字节数的 chunk 会被**强制分包**，忽略配置中的其他尺寸限制。
- chunks：默认为 async ，即只对 async chunk 起作用。设置为 initial 则只对 initial chunk 生效。还可以设置为**all**，这是实际项目中最常用的，使 splitChunksPlugin 同时作用于 initial chunk 和 async chunk。
- minChunks：被不同的 chunk 所**引用的次数**，这里的 chunk 包括 initial chunk 和 async chunk。举个例子，如果 minChunks = 2，则当某个模块被至少两个 chunk 引用时，这个模块才会被单独打包。
- minSize：超过 minSize 字节的 chunk 才会被分包，否则该 module 合并回原来的 chunk 中。
- maxSize：超过 maxSize 字节的 chunk 会**继续尝试**分包
- maxInitialRequest/maxAsyncRequests：**限制分包数量**。设置 initial chunk/async chunk 的最大并行请求数，请求数指的是主 chunk（指自身，不包括 async chunk）加子同步 chunk（不包括 async chunk）。
- cacheGroups：缓存组，为 test 或 type 字段匹配到的文件制订专用的分包规则，并且优先级大于全局规则。这一项是配置的重点。

### 源码解读

上文说过即使不设置 optimization.splitChunks ，也是有默认配置的，看源码可以发现文件位于 lib/WebpackOptionsDefaulter.js：

```js
// WebpackOptionsDefaulter.js
// ...
this.set('optimization.splitChunks.chunks', 'async');
this.set('optimization.splitChunks.minSize', 'make', (options) => {
  return isProductionLikeMode(options) ? 30000 : 10000;
});
this.set('optimization.splitChunks.minChunks', 1);
this.set('optimization.splitChunks.maxAsyncRequests', 'make', (options) => {
  return isProductionLikeMode(options) ? 5 : Infinity;
});
this.set('optimization.splitChunks.automaticNameDelimiter', '~');
this.set('optimization.splitChunks.automaticNameMaxLength', 109);
this.set('optimization.splitChunks.maxInitialRequests', 'make', (options) => {
  return isProductionLikeMode(options) ? 3 : Infinity;
});
this.set('optimization.splitChunks.name', true);
this.set('optimization.splitChunks.cacheGroups', {});
this.set('optimization.splitChunks.cacheGroups.default', {
  automaticNamePrefix: '',
  reuseExistingChunk: true,
  minChunks: 2,
  priority: -20,
});
this.set('optimization.splitChunks.cacheGroups.vendors', {
  automaticNamePrefix: 'vendors',
  test: /[\\/]node_modules[\\/]/,
  priority: -10,
});
// ...
```

可以看出，与官方文档里的默认配置是完全吻合的。<div></div>
接下来要从 splitChunksPlugin 源码中找到对应的各配置项及**优先级**，理解 **splitChunksPlugin 的总体流程**：

```js
// lib/optimize/SplitChunksPlugin.js
for (const module of compilation.modules) {
  // 这一步遍历module并获取对应的cacheGroups
  let cacheGroups = this.options.getCacheGroups(module);
  if (!Array.isArray(cacheGroups) || cacheGroups.length === 0) {
    continue;
  }

  //...

  let cacheGroupIndex = 0;
  for (const cacheGroupSource of cacheGroups) {
    //遍历cacheGroups，优先选择cacheGroups中配置项，没有则取全局配置
    const minSize =
      cacheGroupSource.minSize !== undefined
        ? cacheGroupSource.minSize
        : cacheGroupSource.enforce
        ? 0
        : this.options.minSize;
    const enforceSizeThreshold =
      cacheGroupSource.enforceSizeThreshold !== undefined
        ? cacheGroupSource.enforceSizeThreshold
        : cacheGroupSource.enforce
        ? 0
        : this.options.enforceSizeThreshold;
    const cacheGroup = {
      // ...
      minSize,
      minSizeForMaxSize: cacheGroupSource.minSize !== undefined ? cacheGroupSource.minSize : this.options.minSize,
      enforceSizeThreshold,
      maxSize:
        cacheGroupSource.maxSize !== undefined
          ? cacheGroupSource.maxSize
          : cacheGroupSource.enforce
          ? 0
          : this.options.maxSize,
      minChunks:
        cacheGroupSource.minChunks !== undefined
          ? cacheGroupSource.minChunks
          : cacheGroupSource.enforce
          ? 1
          : this.options.minChunks,
      // ...
    };
    // 遍历包含同一module的chunk集合
    for (const chunkCombination of combs) {
      // 判断是否命中minChunks规则
      if (chunkCombination.size < cacheGroup.minChunks) continue;
      // 命中minChunks规则的设置为selectedChunks
      const { chunks: selectedChunks, key: selectedChunksKey } = getSelectedChunks(
        chunkCombination,
        cacheGroup.chunksFilter, // 判断chunks是all、initial或async
      );
      // 向chunksInfoMap中添加代码分割信息
      addModuleToChunksInfoMap(cacheGroup, cacheGroupIndex, selectedChunks, selectedChunksKey, module);
    }
    cacheGroupIndex++;
  }
}
```

该部分代码总结：<div></div>

1. 外部 for 循环遍历 module，内部 for 循环遍历 cacheGroups，并且 cacheGroups 优先级大于全局配置，从而初始化 cacheGroups 的值。
2. 判断 chunk 的被引用次数是否命中 cacheGroup.minChunks。
3. 判断 chunks 类型是 all、initial 还是 async。
4. 得到 selectedChunks 并存入 chunksInfoMap。

接下来开始遍历 chunksInfoMap，将不符合 minSize 规则的 chunk 从 chunksInfoMap 中剔除：

```js
for (const pair of chunksInfoMap) {
  const info = pair[1];
  if (info.cacheGroup._validateSize && info.size < info.cacheGroup.minSize) {
    chunksInfoMap.delete(pair[0]);
  }
}
```

遍历 chunksInfoMap，根据 compareEntries 方法找到优先级最大的 chunk：

```js
let bestEntryKey;
let bestEntry;
for (const pair of chunksInfoMap) {
  const key = pair[0];
  const info = pair[1];
  if (bestEntry === undefined) {
    bestEntry = info;
    bestEntryKey = key;
  } else if (compareEntries(bestEntry, info) < 0) {
    // compareEntries 方法里包含很多规则
    // 如优先级cacheGroup.priority、关联的chunk数chunks.size等
    // 具体可以看源码中的compareEntries函数
    bestEntry = info;
    bestEntryKey = key;
  }
}
```

然后根据 maxInitialRequests 或 maxAsyncRequests 规则处理去重后的 selectedChunks( usedChunks )：

```js
const usedChunks = new Set(selectedChunks);

if (
  !enforced &&
  (Number.isFinite(item.cacheGroup.maxInitialRequests) || Number.isFinite(item.cacheGroup.maxAsyncRequests))
) {
  for (const chunk of usedChunks) {
    // 根据chunk类型选择maxInitialRequests或maxAsyncRequests
    const maxRequests = chunk.isOnlyInitial()
      ? item.cacheGroup.maxInitialRequests
      : chunk.canBeInitial()
      ? Math.min(item.cacheGroup.maxInitialRequests, item.cacheGroup.maxAsyncRequests)
      : item.cacheGroup.maxAsyncRequests;
    if (isFinite(maxRequests) && getRequests(chunk) >= maxRequests) {
      usedChunks.delete(chunk);
    }
  }
}
```

最后不断更新 chunksInfoMap，直到 chunksInfoMap 为空时，退出循环，结束 SplitChunks。

### 源码总结

经过对 SplitChunksPlugin 的源码分析可知，其大概流程可以总结为：

1. 遍历所有模块 module，内部再遍历所有 cacheGroup，当符合 cacheGroup 规则时，根据 cacheGroup 和 全局配置来初始化 cacheGroup。
2. 判断 chunk 是否满足 minChunks，满足则继续下一步骤。
3. 判断 chunks 规则是 all、initial 或 async，符合规则的 chunk 继续下一步骤。
4. 将得到的 split chunks ( selectedChunks )存入 chunksInfoMap。
5. 遍历 chunksInfoMap，判断 minSize 是否符合规则。
6. 遍历 chunksInfoMap，根据 compareEntries 策略优先生成 chunk。
7. 遍历 usedChunks，判断 chunk 是否满足 maxInitialRequests 和 maxAsyncRequests 规则。
8. 创建新的 chunk 或复用现有的 chunk，不断更新 chunksInfoMap。
9. 结束 SplitChunks。

## 结束语

比较常用的 SplitChunksPlugin 分包策略有：

- 全局的 chunks 设置为 all，这样对 initial chunk 和 async chunk 都有效。
- 第三方库单独分包，比如项目框架 Vue、React，状态管理工具 Vuex、Redux、MobX 等。

```js
splitChunks: {
  chunks: 'all',
  cacheGroups: {
    dll: {
      test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|mobx|mobx-react|mobx-react-dom|antd)/,
      minChunks: 1,
      priority: 2,
      name: 'dll', // 打包后的文件名为dll
    },
	// ...
  }
}
```

- 路由懒加载（异步加载），如 ES6 的 import() 语法。

```
{
  path: '/login', // 路由路径
  name: '登录页', // 菜单名称
  component: lazy(() => import('@/pages/Login')), // 懒加载路由组件
},
```

使用 WebpackBundleAnalyzer 进行打包可视化分析，图 1 是使用默认分包规则，图 2 设置了全局的 chunks = all，并且设置了一些第三方库单独分包。
可以看出，第三方库被单独打包到了 dll 文件中，减小了主包体积的同时，也充分利用了浏览器的缓存策略，从而提升项目性能。
![图1](https://km.woa.com/gkm/api/img/cos-file-url?url=https%3A%2F%2Fkm-pro-1258638997.cos.ap-guangzhou.myqcloud.com%2Ffiles%2Fphotos%2Fpictures%2F202209%2F1663035306-2628-631fe7aa402ea-75649.png&is_redirect=1)

<div style="margin: 0 auto; width: 30px">图 1</div>

![图2](https://km.woa.com/gkm/api/img/cos-file-url?url=https%3A%2F%2Fkm-pro-1258638997.cos.ap-guangzhou.myqcloud.com%2Ffiles%2Fphotos%2Fpictures%2F202209%2F1663035506-3667-631fe8725989b-509520.png&is_redirect=1)

<div style="margin: 0 auto; width: 30px">图 2</div>

### 思考

最后思考一个问题，分包是越多越好吗？
首先要肯定的是，如果不拆分代码，打包成一个文件会导致响应速度很慢，也没有很好地利用浏览器缓存机制。而如果分包的颗粒度过于细化，虽然好处是缓存粒度也更细化，但也导致首次 HTTP 请求数过多，影响性能。因此需要结合自己的项目具体分析，比如如果使用了 HTTP2，那么其具有的多路复用和 headers 压缩能力也许可以忽略掉 HTTP 请求过多这一缺点。
