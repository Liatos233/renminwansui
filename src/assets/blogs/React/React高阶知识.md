## 1 React Hooks 钩子函数

### 1.1 Hooks 分类

#### 1.1.1 自变量型 Hooks

##### (1) useState

- 定义自变量
- 每次渲染时都会重新创建新的状态

```js
let [x， setX] = useState(0);
```

##### (2) useReducer

- 进阶版的 useState，使用 redux 的理念将多个 state 合并成一个，通过动作类型来更新状态

##### (3) useRef

- 提供更为灵活的变量操作
- 用于`操作 DOM 元素`和`持久性数据`
- 多次渲染值保持不变，也不会触发组件的重新渲染

```js
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);

return <input ref={inputRef} />;
```

##### (4) useContext

- 跨层级的参数传递

```js
// in grand father module
import { createContext } from 'react'
export const FooContext = createContext()

<Context.Provider value={ 这里放要传递的数据 }>
   需要接收数据的后代组件
<Context.Provider />
```

```js
// in grand son module
import { FooContext } from "";

const 函数组件 = () => {
  const 公共数据 = useContext(Context); // 这里的公共数据就是根组件 value 的值
  return 函数组件的内容;
};
```

#### 1.1.2 因变量型 Hooks

##### (1) useMemo

- 缓存一个值类型的因变量
- 避免重复计算开销，仅当依赖项改变时才再次计算
- 使用 memo 包裹子组件 则父组件视图更新时子组件`不会随之更新`

```js
const y = useMemo(() => x * 2， [x]);
```

##### (2) useCallback

- 缓存一个函数类型的因变量
- 避免额外的渲染开销，避免子组件重新渲染

```js
const changeX = useCallback(() => setX(x * 2)， [x]);
```

##### (3) useEffect

- 定义有副作用的因变量
- 在 DOM 渲染完成后异步执行。它不会阻塞浏览器的绘制，可以用于处理较长时间的副作用操作
- 如果依赖数组不为空，则当其中任意一个值变化时，会触发 useEffect 重新执行
- 如果依赖数组为空，则只会在组件挂载和卸载时执行 useEffect
- 出现多个 useEffect 时，会按照`申明顺序`形成 effect 链表`依次执行`
- 常用于`修改全局状态`、`DOM 操作`、 `读写本地存储`、`发出网络请求`等

```js
useEffect(() => {
  document.title = x;
}， [x]);
```

##### (4) useLayoutEffect

- 在 DOM 渲染之前同步执行，可能阻塞渲染，可以避免闪烁
- 等价于 componentDidMount
- 常用于`操作 dom`，如`测量元素尺寸`、`计算布局`等

#### 1.1.3 其他 Hooks

##### (1)

### 1.2 Hooks 使用规则

#### 不在循环和条件语句中使用

- 循环或条件语句中调用，每次渲染时的调用顺序可能会改变，这会导致状态混乱
- 条件语句可能会因条件的改变导致 Hooks 在渲染时被跳过
- 循环中的 Hooks 可能会导致无限循环

#### 确保在顶层使用

- 确保调用顺序在每次渲染时都一致
- 避免在函数嵌套作用域里面被重复调用

#### 受控组件和不受控组件（仅限表单元素）

- 受控组件的 value 通过 state/useState 控制
- 不受控组件可以给元素添加 ref，通过 ref/useRef 控制

## 2 非 Hooks 的其他方法

1. useParams
   - 来自 react-router,返回路由参数的键/值对对象。
2. useRouteMatch
   - 来自 react-router,可以访问当前<Route>的 match 对象。
3. useFetch
   - 一些库提供的自定义 Hook,用于数据请求。
4. useAsync
   - 管理异步请求状态的自定义 Hook。
5. useEvent
   - 绑定事件监听的自定义 Hook。
6. useEnsuredForwardedRef 和 useSyncExternalStore
   - React 18 提供的两个新 API。
7. useContext
   - 跨越组件层级数据共享。
8. useSelector
   - 在 Redux 中获取 store state 的 Hook。
9. useDispatch
   - 在 Redux 中 dispatch actions 的 Hook。

## 3 React Fiber

### 3.1 概述

- React 16 中新的协调算法，被称为 Fiber Reconciler
- 主要目标：增量渲染，更好更平滑地渲染 UI 动画和手势，以及用户互动的响应性

### 3.2 关键概念

1. Fiber 节点（Fiber Node）： 每个组件都会对应一个 Fiber 节点，它代表了组件的实例以及与之相关的信息。Fiber 节点构成了一个 Fiber 树，类似于 虚拟 DOM 树
2. 协调（Reconciliation）：两个 DOM 树 diff 的算法
3. 调度（Scheduling）： 基于时间或者优先级的工作调度。requestIdleCallback(lowPriorityWork)和 requestAnimationFrame(animationWork)
4. 增量渲染（Incremental Rendering）： 将渲染工作分解为多个步骤，浏览器可在每个步骤之间执行其他任务，从而减少渲染过程对主线程的阻塞时间

## 触发页面重新渲染的事件

- `State 的变化`：当通过 useState、useReducer 改变组件的状态时
- `Props 的变化`： 父组件传递给子组件的属性（props）发生变化时
- `Context 的变化`： useContext 连接到的上下文中的数据发生变化时
- `使用 forceUpdate 方法`： 触发组件强制重新渲染
- `使用 useEffect/useLayoutEffect`： 调用副作用函数时
- `调用 render 方法`：在父组件重新渲染时，会调用其所有子组件的 render 方法- `使用 React Router`：路由切换时，当前组件会被卸载并重新挂载，触发重新渲染
- `使用 React.lazy 和 Suspense`：组件会在加载完成后重新渲染
