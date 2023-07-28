## 1 npm install 方式

- --save-dev，会在 devDependencies 里面添加依赖
- -D，会在 devDependencies 里面添加依赖
- --save，会在 dependencies 里面添加依赖
- -S，会在 dependencies 里面添加依赖

> Note：npm5 之后，如没有添加后缀，则默认安装 dependencies

## 2 安装 nodejs

- [http://nodejs.cn/download/](http://nodejs.cn/download/)

- node_global node_cache 目录修改及其环境变量修改

### 2.1 修改 npm 源

```shell
npm config get registry
npm config set registry [https://registry.npm.taobao.org/](https://registry.npm.taobao.org/)
```

### 2.2 使用 cnpm

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 3 初始化 react 项目

### 3.1 初始化

```shell
npx create-react-app {name}
```

### 3.2 暴露 react 项目配置文件

```shell
npm run eject
```

### 3.3 安装 axios

```shell
npm install axios --save
```

### 3.4 安装组件库

```shell
npm install antd –save
```

### 3.5 安装 moment

```shell
npm install moment
```

### 3.6 安装 scss、sass

```shell
npm install sass-loader --save-dev
npm i node-sass –save
//默认已有 sass-loader
npm i node-sass
```

### 3.7 安装 less

```shell
npm install less less-loader –save-dev
// 需要配置webpack
```

### 3.8 安装 `react`-router-dom

```shell
npm install react-router-dom -save
```

### 3.9 安装 jquery

```shell
npm install jquery --save
import $ from 'jquery'
```

### 3.10 安装 react-loadable

```shell
npm i react-loadable
```

### 3.11 安装 echarts

```shell
npm install echarts –save
```

### 3.12 安装 js-export-excel

```shell
npm install js-export-excel --save
```

### 3.13 配置绝对路径

```js
// 需要 eject 配置
npm run eject
在 config/webpack.config.js 中配置
alias: {
    …...
    '@': path.resolve(\_\_dirname, '../src'),
},
// 或者直接修改
node_modules\react-scripts\config\webpack.config.js
```

### 3.14 引入 antd 样式

```shell
/\* 引入 antd 样式 \*/
@import 'antd/dist/antd.css';
```

## 4 运行 react 项目

```shell
npm run start
npm run build
```

## 5 vscode 优化

### 5.1 添加对于 jsx 的支持 tab 补全

```shell
setting->add language->add item->javascript, javascriptreact
setting->trigger->Emment: Trigger Expansion On Tab
```

### 5.2 安装 react 插件

```shell
ES7+ React/Reduc…
rcc -> react class component
rfc -> react function component
```

## 6 react 要点

### 6.1 state 完整格式

```js
construct(props) {
    super(props)

    this.state={

    }
}
```

### 6.2 jsx 使用方法的方式

```js
() => this.foo()
this.foo.bind(this)
this.foo() 自执行
```

### 6.3 函数式组件

```js
export default App = () => {};
// 无生命周期
// 无 this
// 无 state
```

### 6.4 Hooks

//（必须要在函数式组件的最顶层）

- #### (1) useState

```js
const [foo, setFoo] = useState("aaa");
```

- #### useEffect

```js
// like ComponentDidMount and watch all parameter update
useEffect(() => {});

// only watch parameter foo update
// use [] when don't want to watch any parameter
useEffect(() => {}, [foo]);

// simulate beforeDestroyed and process trash collection
useEffect(() => {
  return () => {
    console.log("destroy period");
  };
});
```

- #### (2) useContext

// useContext 可以帮助我们跨越组件层级直接传递变量，实现数据共享。Context 的作用就是对它所包含的组件树提供全局共享数据的一种技术

```js
// in grand father module
import { createContext } from 'react'
export const FooContext = createContext()

return (
    <Context.Provider value={ 这里放要传递的数据 }>
        需要接收数据的后代组件
    <Context.Provider />
)
```

```js
// in grand son module
import { FooContext } from "";

const 函数组件 = () => {
  const 公共数据 = useContext(Context); // 这里的公共数据就是根组件 value 的值
  return 函数组件的内容;
};
```

- #### (3) memo

// 使用 memo 包裹子组件 则父组件视图更新时子组件`不会随之更新`

// 仅当包裹的子组件 return 的是静态元素时有效

```js
memo(() => {});
```

- #### (4) useCallback

// setFoo(newValue) 使用新值覆盖初始值

// setFoo((foo) => foo+1) 不断使用新值覆盖旧值

// 使用后者的方式能够既缓存子组件又更新子组件的状态

```js
useCallback(() => {}, []);
```

- #### (5) 开发者自定义 hooks

### 6.5 父子互传

#### (1) 父传子

props

#### (2) 子传父

父组件中将方法传入子组件

子组件的调用 props 中传入的方法传参

#### (3) context 跨级组件传值

```js
import {createContext} from 'react';

// create context space Provider and Consumer
const FooContext = createContext();
// in top module
<FooContent.Provider value={{foo, setFoo}} >
    <Father />
<FooContent.Provider>
```

```js
// in father module
const Father = () => <Child>
```

```js
// in son module
<FooContent.Consumer>
    {({foo, setFoo}) => {console.log(foo}}
<FooContent.Consumer >
```

### 6.6 受控组件和不受控组件（仅限表单元素）

受控组件的 value 通过 state/useState 控制

不受控组件可以给元素添加 ref，通过 ref/useRef 控制

### 6.7 Redux

#### (1) 流程图

![架构](https://i.imgur.com/IfDeyZ0.gif)

> View ：负责显示逻辑，与 MVC 中的 View 类似。它相应用户的操作（点击、输入等事件），生成 Action，通过 Dispatcher 进行派发。

> Actions：用户通过 View 触发的操作被封装成的对象。它必须包含一个`type`字段。Action 会经由 Dispatcher 派发给 Reducer。使用统一的"type"字段来标识 Action 的类型，并确保唯一性，通常使用 `FOO_BAR` 的方式命名。

> Dispatcher：Redux 框架提供的 Action 派发器。当一个动作被分发时，Redux 会将该动作传递给对应的 Reducer 函数。。

> Store：应用程序的状态容器，通常以树状结构的形式存在。一个 View 中的一个组件通常与 Store 中的某个节点对应。当 Store 中的状态发生变化时，Redux 框架能够高效地`只更新与变化数据相关的 View` 组件，从而提高应用程序的性能。Store 的更新只能通过触发 Action 来实现，这种方式使状态的变化变得可预测，易于理解和维护。

> Reducer：类似于 map-reduce 中的归纳器，它是一个纯函数，用于响应处理 Action。根据动作的类型，Reducer 会对接收到的状态进行相应的处理，然后返回一个新的状态。

#### (2) 实际使用

```js
// 仓库创建 store/index.js
import reducer form './reducer.js';
import {createStore} from 'redux';

const store = createStore(reducer);
export default store;
```

```js
// 创建初始状态和Reducer 并导出函数 store/reducer.js
const defaultState = {
  counter: 1,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};
```

```js
// 根组件中使用Redux提供的Provider组件包装整个App
import React from "react";
import { Provider } from "react-redux";
import Counter from "./Counter";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default App;
```

```js
// 使用Redux存储
import React from "react";
import { connect } from "react-redux";

const Counter = (props) => {
  const { counter, increment, decrement } = props;

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
  };
};
// 使用connect函数，将Counter组件与Redux存储连接起来
// 指定了从存储中获取状态的mapStateToProps函数以及分发Action的mapDispatchToProps函数。
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
