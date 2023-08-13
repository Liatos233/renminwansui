1. 响应性系统重写
   从`选项式 API 变成 组合式 API` ，将相关的逻辑组织在一起，而不是将其按功能分离。
   Proxy 替代了 Object.defineProperty 来实现响应式系统，解决了无法监听数组变化、对象新添加属性变化的问题

2. 生命周期函数
   新增 asnyc 异步钩子、onRenderTracked 和 onRenderTriggered 钩子等

```js
beforeCreate+created -> setup;
beforeDestroy -> beforeUnmount;
destroyed -> unmounted;
```

3. Teleport 组件
   Vue.js 3 引入了 Teleport 组件，它可以将组件的内容渲染到 DOM 中的其他位置，这对于创建模态框、弹出菜单等非常有用。

4. Fragments
   Vue.js 3 允许使用 Fragments 来返回多个根级元素，而不需要包装在一个额外的父级元素中。

5. TypeScript 支持
   Vue.js 3 集成了 TypeScript，使得开发者可以在开发过程中使用静态类型检查，减少类型相关的错误。

6. v-model 改进
   在 Vue.js 3 中，v-model 支持自定义双向绑定的实现，使得开发者可以更好地控制组件与父组件之间的数据交互。同一组件可以同时设置多个 v-model 新增，开发者可以自定义 v-model 修饰符

7. Diff 算法改进
   静态标记：将静态节点（不会变化的节点）在编译阶段标记出来，并提前创建，减少运行时开销
   动态属性提升：编译时会将动态属性（如 v-bind、v-on）提升为常量，以减少运行时的属性检查
   缓存：事件侦听器缓存、事件处理函数缓存
