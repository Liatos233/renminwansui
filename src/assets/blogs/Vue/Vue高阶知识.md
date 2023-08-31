## 1 keep-alive

- 用于在组件树中`缓存已渲染的组件实例`，以便在切换组件时保留它们的状态
- 原理：在 created 函数调用时将需要缓存的 VNode 节点保存在 `this.cache` 中，在 render 时，从 this.cache 中取出之前缓存的 VNode 实例进行渲染
- 利用 `LRU(Least recently used)` 算法淘汰数据

```vue
<template>
  <div>
    <keep-alive>
      <my-component v-if="showComponent" />
    </keep-alive>
    <keep-alive :include="['ComponentA']">
      <router-view />
    </keep-alive>
  </div>
</template>
```

- 每次切换组件的显示与隐藏时，状态会被保留，不会重新创建
- 进入和离开缓存的组件是触发特定的生命周期钩子函数：`activated 和 deactivated`（服务端渲染不会触发）
- `include` 和 `exclude` 属性控制哪些组件需要被缓存或排除在缓存之外，`max` 控制缓存组件的最大值

## 2 响应式系统

### 简述

- vue 初始化时会用 Object.defineProperty()给 data 中每一个属性添加 getter 和 setter，然后创建 dep 进行依赖收集，创建 watcher 进行派发更新，最后通过 diff 算法对比新老 vnode 差异，通过 patch 即时更新 DOM

### Vue.nextTick()

- 下次 DOM 更新循环结束之后执行延迟回调，`Promise > MutationObserver > setImmediate > setTimeout`

### computed

- 本质是一个惰性求值的观察者 computed watcher，内部通过 this.dirty 属性标记是否需要重新计算
- 当依赖变化时，通过 this.dep.subs.length 判断是否有订阅者，如果有则重新计算，值变化则重新渲染；如果没有，则把 this.dirty 置为 true，直到之后出现订阅者，重新计算

### watch

- 相对于 computed，watch 没有缓存性
- 当监听到某些数据变化时，执行回调
- 使用 deep 进行对象深度监听

### diff

- 只对比父节点相同的新旧子节点（VNode），
- 循环从两边向中间收拢，时间复杂度 O(n)

### key

- 精确定位 VNode
- 避免列表渲染的错位、表单数据混乱共享等问题
- 利于保持组件的独立性和隔离性

### 代码实现

```js 处理响应式
function defineReactive(target, key, value, enumerable) {
  // 折中处理后, this 就是 Vue 实例
  let that = this;

  // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
  if (typeof value === "object" && value != null && !Array.isArray(value)) {
    // 是非数组的引用类型
    reactify(value); // 递归
  }

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get() {
      console.log(`读取 ${key} 属性`); // 额外
      return value;
    },
    set(newVal) {
      console.log(`设置 ${key} 属性为: ${newVal}`); // 额外

      value = reactify(newVal);
    },
  });
}
```

```js 将对象 o 响应式化
function reactify(o, vm) {
  let keys = Object.keys(o);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]; // 属性名
    let value = o[key];
    if (Array.isArray(value)) {
      // 数组
      value.__proto__ = array_methods; // 数组就响应式了
      for (let j = 0; j < value.length; j++) {
        reactify(value[j], vm); // 递归
      }
    } else {
      // 对象或值类型
      defineReactive.call(vm, o, key, value, true);
    }
  }
}
```

## 3 触发页面重新渲染的事件

- `响应式数据的变化`：通过 data、ref 定义的响应式数据发生变化时
- `计算属性的变化`：当计算属性的依赖发生变化时，计算属性会重新求值时
- `Watcher 监听器`：通过 watch 选项或 watch API 创建的 Watcher 监听器可以监听指定的数据变化，并在变化发生时触发回调函数
- `使用 v-if、v-show`：当使用 v-if 或 v-show 指令判断的结果变化时
- `父子组件间通信`：当父组件向子组件传递属性（props）发生变化时，子组件可能会触发重新渲染
- `使用 $forceUpdate 方法`：调用组件实例的 $forceUpdate 方法会强制组件重新渲染
- `使用 $nextTick 方法`：调用组件实例的 $nextTick 方法可以在 DOM 更新之后执行回调函数，这时组件已经重新渲染
