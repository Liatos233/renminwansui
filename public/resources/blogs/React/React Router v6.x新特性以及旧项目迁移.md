1\. 更新语句

```js
npm install react-router@6 react-router-dom@6
复制代码
```

2\. Switch 更改为 Routes

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
复制代码
```

3\. Route 的新特性变更

component/render 被 element 替代

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
复制代码
```

4\. 嵌套路由的变更

具体变化有以下：

- 已更改为接受子路由。
- 比和更简单的匹配规则。
- 路径层次更清晰 最直观的变更即是 Redirect 组件的废弃  
  嵌套路由的实现方式

1\. outlet 实现 相当于 vue 的 router-view 组件 用于显示子路由页面 \

- 用法/注意的地方

  1.  如果要实现嵌套路由的话，那么需要有一个 Layout 组件和 Outlet 组件，布局和显示。

  - Layout 组件，即布局组件。里面有 Outlet 组件用于显示子组件，可在里面放置侧边栏/路由链接等内容，自己编写。 = Outlet 组件，router 官方组件，相当于 vue 的 router-view 组件。嵌套的页面会挂载在 Outlet 组件上。

  1.  如果要依靠 Outlet 实现嵌套路由的话，那么可以实现所有路由都放在 router.js，只需要在对应页面增加 Outlet 的方式。
  2.  如果有嵌套路由的 path 需要加/\* 实现方案:  
      router.js

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
复制代码;
```

LayoutIndex.tsx

```js
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
复制代码;
```

Home.tsx

```js
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
复制代码;
```

Test.tsx

```js
const Test = () => {
  return <div>Test1</div>;
};
export default Test;
复制代码;
```

上面例子在 router.js 中直接将嵌套路由给写了出来，然后只用保证页面有可以显示下级路由的 Outlet 即可。  
即 LayoutIndex 中有显示 Home 组件的 Outlet，Home 组件中有显示 Test1 组件的 Outlet

2\. 下方页面嵌套 Route 显示

这种写过 v5.x 版本的朋友应该了解。即不使用 Outlet，Route 本身即是一个 Layout。让我们改造一下上面的例子来实现 router.js

```js
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LayoutIndex from "../layout";

const RouterFun = () => {
  return (
    <Router>
      {/* 使用lazy异步加载组件后，需要配合使用Suspense组件包裹。fallback可以为loading，为异步包裹的内容 */}
      {/* 需要该组件路由才能显示 */}
      <Routes>
        <Route path="/*" element={<LayoutIndex />}></Route>
      </Routes>
    </Router>
  );
};

export default RouterFun;
复制代码;
```

LayoutIndex.tsx

```js
import { Routes, Route } from "react-router-dom";
import Head from "./head/index"; //* 引入头部
import Footer from "./footer/index"; //* 引入底部
import Home from "../pages/home/index";

const LayoutIndex = () => {
  return (
    <div id="layout-index" className="layout-index common-width-100vw">
      <Head />
      <Routes>
        <Route path="index/*" element={<Home />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default LayoutIndex;
复制代码;
```

Home.tsx

```js
import { Routes, Route } from "react-router-dom";
import Test1 from "../test1";
const HomeIndex = () => {
  return (
    <div>
      <Routes>
        <Route path="test1" element={<Test1 />}></Route>
      </Routes>
      首页
    </div>
  );
};

export default HomeIndex;
复制代码;
```

test1.jsx

```js
const Test = () => {
  return <div>Test1</div>;
};
export default Test;
复制代码;
```

这种方式无非就是将 Outlet 换成了 Route 来使用。但是我并不推荐这种方式，因为这种方式并不能将所有路由以一种路由树的方式展现。而 useRoutes 的出现代替了之前 router.config.js 的存在。  
而如果在使用这种方式的话，可以尝试着使用一下 Route 的 index 设置为主路由，如果设置为主路由的话则不能有 children

属性

如果我们在多级路由的情况，需要一个首页，或者默认页面。那么 index 属性将会帮到你。  
让我们改造一下上面的例子。  
Home.jsx

```js
import { Routes, Route } from "react-router-dom";
import Test1 from "../test1";
import Test from "../test";
const HomeIndex = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Test />}></Route>
        <Route path="test1" element={<Test1 />}></Route>
      </Routes>
      首页
    </div>
  );
};

export default HomeIndex;
复制代码;
```

我们在 Home 页面里加了个默认路由，在我们刚进入这个页面时将会显示 Test 组件。

useRoutes

我们可以通过 useRoutes 的方式来生成一个路由树，其实这种方式类似于我们上面写的 Outlet 的方式。只是使用 Hook 的方式来实现而已。  
我们现在来改造一下上面的例子  
注意:

1.  Route 和 Outlet 其实是一个概念，可以当成同一个东西来使用，甚至在页面中同事引入这两个组件，会出现页面出现挂载在两个元素的情况
2.  通过 useRoutes 生成的 element 还是需要挂载在 Router 组件下 router.config.js

```js
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
复制代码;
```

router.js

```js
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
复制代码;
```

layout 等组件和 Outlet 的引用一致  
Home.tsx

```js
import { Routes, Route, Outlet } from "react-router-dom";
import Test from "../test";
const HomeIndex = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Test />}></Route>
      </Routes>
      <Outlet />
      首页
    </div>
  );
};

export default HomeIndex;
复制代码;
```

总结

1.  修改 package.json 中包的版本，记得删掉重新下载 npm 包。
2.  修改 Switch 组件为 Routes 组件。
3.  router.config.js 的修改，可以参考嵌套路由的两种方式，也可以参考 useRouter 的实现。
