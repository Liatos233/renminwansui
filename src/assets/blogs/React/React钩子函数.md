### Hooks 分类

#### 1 自变量型 Hooks

##### 1.1 useState

- 定义自变量
- 每次渲染时都会重新创建新的状态

```js
let [x， setX] = useState(0);
```

##### 1.2 useReducer

- 进阶版的 useState，使用 redux 的理念将多个 state 合并成一个，通过动作类型来更新状态

##### 1.3 useContext

- 跨层级的参数传递

#### 2 因变量型 Hooks

##### 2.1 useMemo

- 缓存一个值类型的因变量
- 避免重复计算开销，仅当依赖项改变时才再次计算

```js
const y = useMemo(() => x * 2， [x]);
```

##### 2.2 useCallback

- 缓存一个函数类型的因变量
- 避免额外的渲染开销，避免子组件重新渲染

```js
const changeX = useCallback(() => setX(x * 2)， [x]);
```

##### 2.3 useEffect

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

##### 2.4 useLayoutEffect

- 在 DOM 渲染之前同步执行，可能阻塞渲染，可以避免闪烁
- 等价于 componentDidMount
- 常用于`操作 dom`，如`测量元素尺寸`、`计算布局`等

#### useRef

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

### Hooks 使用规则

#### 不在循环和条件语句中使用

- 循环或条件语句中调用，每次渲染时的调用顺序可能会改变，这会导致状态混乱
- 条件语句可能会因条件的改变导致 Hooks 在渲染时被跳过
- 循环中的 Hooks 可能会导致无限循环

#### 确保在顶层使用

- 确保调用顺序在每次渲染时都一致
- 避免在函数嵌套作用域里面被重复调用
