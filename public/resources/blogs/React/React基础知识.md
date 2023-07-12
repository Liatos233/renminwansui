# 1 npm install 方式

- --save-dev，会在 devDependencies 里面添加依赖
- -D，会在 devDependencies 里面添加依赖
- --save，会在 dependencies 里面添加依赖
- -S，会在 dependencies 里面添加依赖

> Note：npm5 之后，如没有添加后缀，则默认安装 dependencies

# 2 安装 nodejs

- [http://nodejs.cn/download/](http://nodejs.cn/download/)

- node_global node_cache 目录修改及其环境变量修改

## 2.1 修改 npm 源

```shell
npm config get registry
npm config set registry [https://registry.npm.taobao.org/](https://registry.npm.taobao.org/)
```

## 2.2 使用 cnpm

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

# 3 初始化 react 项目

## 3.1 初始化

```shell
npx create-react-app {name}
```

## 3.2 暴露 react 项目配置文件

```shell
npm run eject
```

## 3.3 安装 axios

```shell
npm install axios --save
```

## 3.4 安装组件库

```shell
npm install antd –save
```

## 3.5 安装 moment

```shell
npm install moment
```

## 3.6 安装 scss、sass

```shell
npm install sass-loader --save-dev
npm i node-sass –save
//默认已有 sass-loader
npm i node-sass
```



## 3.7 安装 less

npm install less less-loader –save-dev

需要配置

## 3.8 安装 `react`-router-dom

npm install react-router-dom -save

## 3.9 安装 jquery

npm install jquery --save

import $ from 'jquery'

## 3.10 安装 react-loadable

npm i react-loadable

## 3.11 安装 echarts

npm install echarts –save

## 3.12 安装 js-export-excel

npm install js-export-excel --save

## 3.13 配置绝对路径

需要 eject 配置

npm run eject

在 config/webpack.config.js 中配置

alias: {

…...

'@': path.resolve(\_\_dirname, '../src'),

},

或者直接修改

node_modules\react-scripts\config\webpack.config.js

## 3.14 引入 antd 样式

/\* 引入 antd 样式 \*/

@import 'antd/dist/antd.css';

# 4 运行 react 项目

npm run start

npm run build

# 5 vscode 优化

## 5.1 添加对于 jsx 的支持 tab 补全

setting-\>add language-\>add item-\>javascript, javascriptreact

setting-\>trigger-\>Emment: Trigger Expansion On Tab

## 5.2 安装 react 插件

ES7+ React/Reduc…

rcc -\> react class component

rfc -\> react function component

# 6 react 要点

## 6.1 state 完整格式

construct(props) {
super(props)

this.state={

}

}

1.

## 6.2 jsx 使用方法的方式

() =\> this.foo()

this.foo.bind(this)

this.foo() 自执行

1.

## 6.3 函数式组件

export default App = () =\> {}

无生命周期

无 this

无 state

## 6.4 Hooks

（必须要在函数式组件的最顶层）

- #### useState

const [foo, setFoo] = useState("aaa")

- #### useEffect

// like ComponentDidMount and watch all parameter update

useEffect(() =\> {

})

// only watch parameter foo update

// use [] when don't want to watch any parameter

useEffect(() =\> {

}, [foo])

// simulate beforeDestroyed and process trash collection

useEffect(() =\> {

return () =\> {

console.log("destroy period")

}

})

- #### useContext

useContext 可以帮助我们跨越组件层级直接传递变量，实现数据共享。Context 的作用就是对它所包含的组件树提供全局共享数据的一种技术

// in grand father module

import { createContext } from 'react'

export const FooContext = createContext()

return (

\<Context.Provider value={ 这里放要传递的数据 }\>

需要接收数据的后代组件

\</Provider\>

)

// in grand son module

import { FooContext } from "";

const 函数组件 = () =\> {

const 公共数据 = useContext(Context) // 这里的公共数据就是根组件 value 的值

return ( 函数组件的内容 )

}

- #### memo

// 使用 memo 包裹子组件 则父组件视图更新时子组件不会随之更新

// 仅当包裹的子组件 return 的是静态元素时有效

memo(() =\> {})

- #### useCallback

// setFoo(newValue) 使用新值覆盖初始值

// setFoo((foo) =\> foo+1) 不断使用新值覆盖旧值

// 使用后者的方式能够既缓存子组件又更新子组件的状态

useCallback(() =\> {}, [])

- ### 开发者自定义 hooks

1

## 父子互传

    1.

### 父传子

props

    1.

### 子传父

父组件中将方法传入子组件 子组件的 props 中调用

    1.

### context 跨级组件传值

import {createContext} from 'react';

// create context space Provider and Consumer

const FooContext = createContext();

// in top module

\<FooContent.Provider value={{foo, setFoo}} \>

\<Father /\>

\<FooContent.Provider\>

// in father module

const Father = () =\> \<Child\>

// in son module

\<FooContent.Consumer\>

{({foo, setFoo}) =\> {console.log(foo}}

\<FooContent.Consumer \>

1.

## 受控组件和不受控组件（仅限表单元素）

受控组件的 value 通过 state/useState 控制

不受控组件可以给元素添加 ref，通过 ref/useRef 控制

1.

## Redux

    1.

### 设计架构

#### ![](RackMultipart20230712-1-1wnxmw_html_df87399998adbf95.png)

    1.

### 实际使用

// 仓库的入口文件

store/index.js

import reducer form './reducer.js';

// createStore -\> configureStore

import {createStore} from 'redux';

const store = createStore(reducer);

export default store;

// 创建初始状态 并导出函数

store/reducer.js

const defaultState = {

num: 1

}

export default (state=defaultState, action) =\> {

// 因为异步问题 所以需要深拷贝再返回（有待考证）

let newState = JSON.parse(JSON.stringify(state))

switch(action.type){

case "addNum": newState.num++;break;

default: break;

}

return newState;

}

// 顶级组件放在提供器中

import {Provider} from 'react-redux'

import store from './store'

\<Provider store={store}\>

\<App/\>

\</Provider\>

// 通过连接器取状态

function AppFoo(props）{

return（

\<div\>

\<h2\>数字为{props.num}\</h2\>

\<button onclick={() =\> props.addNum()}\>累加\</button\>

\</div\>

)

// 将 reducer 中的 state 映射成 props

const mapStateToProps =(state)=\> {

return {

num: state.num

}

}

// 将 reducer 中的 action 映射成 props

const mapDispatchToProps =(dispatch)=\> {

return {

addNum() {

// 这里是将 action 传入 reducer 中,还可以传参 value

const action = {type: "addNum", value: 2}

dispatch(action)

}

}

}

// (state 映射，dispatch 映射）(当前组件名称）

export default connect(mapStateToProps)(AppFoo)
