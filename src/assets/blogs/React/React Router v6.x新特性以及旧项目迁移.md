## 1 更新

```shell
npm install react-router@6 react-router-dom@6
```

## 2 Switch 更改为 Routes

```js
// v5
<Switch>
    <Route exact path="/"><Home /></Route>
    <Route path="/profile"><Profile /></Route>
</Switch>

// v6
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="profile/*" element={<Profile />} />
</Routes>
```

## 3 Route 变更

// component/render 被 element 替代

```js
import Profile from './Profile';

// v5
<Route path=":userId" component={Profile} />
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// v6
<Route path=":userId" element={<Profile />} />
<Route path=":userId" element={<Profile animate={true} />} />
```

## 4 嵌套路由的变更

- 路径层次更清晰 Redirect 组件的废弃
- 添加 Outlet：相当于 vue 的 router-view 组件 用于显示子路由页面
- 有嵌套路由的 path 需要加 /\*

```js
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LayoutIndex from "../layout";
import Home from "../pages/home/index";
import Test1 from "../pages/test1";

const RouterFun = () => {
  return (
    <Router>
      {/* 使用lazy异步加载组件后，需要配合使用Suspense组件包裹。fallback可以为loading，为异步包裹的内容 */}
      {/* 需要该组件路由才能显示 */}
      <Routes>
        <Route path="/*" element={<LayoutIndex />}>
          <Route path="index/*" element={<Home />}>
            <Route path="test1" element={<Test1 />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterFun;
```

```js
// LayoutIndex.tsx
import { Outlet } from "react-router-dom";
import Head from "./head/index"; //* 引入头部
import Footer from "./footer/index"; //* 引入底部

const LayoutIndex = () => {
  return (
    <div id="layout-index" className="layout-index common-width-100vw">
      <Head />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutIndex;
```

```js
// Home.tsx
import { Outlet } from "react-router-dom";

const HomeIndex = () => {
  return (
    <div>
      <Outlet />
      首页
    </div>
  );
};

export default HomeIndex;
```

```js
// Test.tsx
const Test = () => {
  return <div>Test1</div>;
};
export default Test;
```

## 5 index 属性

// 如果存在多级路由，需要一个首页，或者默认页面。则可以使用 index
让我们改造一下上面的例子。

```js
// Home.jsx
import { Routes, Route } from "react-router-dom";
import Test1 from "../test1";
import Test from "../test";
const HomeIndex = () => {
  return (
    <div>
      <Routes>
        {/* 默认显示Test组件 */}
        <Route index element={<Test />}></Route>
        <Route path="test1" element={<Test1 />}></Route>
      </Routes>
      首页
    </div>
  );
};

export default HomeIndex;
```

## 6 useRoutes

// Outlet 的 Hook 实现。

```js
// router.config.js;
import {
  HashRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import LayoutIndex from "../layout";
import Home from "../pages/home";
import Test1 from "../pages/test1";

const RouterConfig = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <LayoutIndex />,
      children: [
        {
          path: "index/*",
          element: <Home />,
          children: [
            {
              path: "test1",
              element: <Test1 />,
            },
          ],
        },
      ],
    },
  ]);
  return element;
};

export default RouterConfig;
```

```js
// router.js
import { HashRouter as Router } from "react-router-dom";
import RouterConfig from "./router.config";
const RouterFun = () => {
  return (
    <Router>
      <RouterConfig />
    </Router>
  );
};

export default RouterFun;
```
