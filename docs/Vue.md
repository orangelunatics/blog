## Vue常见问题
1、nextTick(返回promise)  
由于dom(数据)的更新是异步的(类比setState)，Vue的this.$nextTick方法是将执行逻辑放在dom更新之后执行，可以拿到最新的dom/数据，再比如created钩子中dom还未挂载，那么也可以用这个方法来实现操作dom。