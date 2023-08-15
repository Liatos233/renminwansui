#### 1 debounce 防抖函数

- 在某个延迟时间之后才执行函数，如果在这个延迟时间内再次触发函数，会重新计时延迟
- 应用场景：
  > - 搜索框搜索输入
  > - 手机号、邮箱验证输入检测
  > - 窗口大小 resize

```js
function debounce(func, interval) {
  let timer = null;

  return function (...args) {
    // timer不为null表明需要重新计时
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

#### 2 throttle 节流函数

- 按照一定的时间间隔执行函数，不会频繁触发
- 应用场景：
  > - 滚动加载，加载更多或滚到底部监听
  > - 搜索框，搜索联想功能
  > - 按钮点击事件

```js 时间戳写法
function throttle(func, interval) {
  let lastTime = Date.now();

  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastTime >= interval) {
      func.apply(this, args);
      lastTime = Date.now();
    }
  };
}
```

```js 定时器写法
function throttled(fn, interval) {
  let timer = null;
  return function (...args) {
    // timer为null表明在前interval的时间内没有执行过 则可以执行一次
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, interval);
    }
  };
}
```

#### 3 图示

![图示](https://static.vue-js.com/a2c81b50-8787-11eb-ab90-d9ae814b240d.png)
