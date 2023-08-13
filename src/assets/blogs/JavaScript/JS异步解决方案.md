#### 场景

- 定时任务： setTimeout、setInterval
- 网络请求：ajax
- io 操作：nodejs 操作数据库
- 事件监听：addEventListener

#### 1 回调函数（原始）

- 回调地狱问题

```js
ajax({
  url: "#",
  type: GET,
  success: function (e) {
    // 回调函数里就是对请求结果的处理
  },
});
```

#### 2 Promise

- 链式调用
- 生命周期：pending -> fullfilled / rejected

```js
const myPromise = new Promise((resolve, reject) => {
  // 异步操作，比如从服务器获取数据
  const data = fetchDataFromServer();

  if (data) {
    resolve(data); // 异步操作成功，将数据传递给后续处理
  } else {
    reject("Error fetching data"); // 异步操作失败，传递错误信息
  }
});

myPromise
  .then((result) => {
    console.log("Data received:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Promise结束");
  });
```

#### 3 Iterator 和 Generator

```js
// 生成器 可以在需要的时候暂停和恢复执行
function* fetchData() {
  const data = yield fetchDataFromServer(); // yield 暂停函数的执行，并将值返回给调用方
  console.log("Data received:", data);
}

const generator = fetchData();
const data = generator.next();
```

#### 4 async / await

- 通过同步代码达到异步的效果
- 使用 try/catch 块可以轻松捕获和处理异步操作中的错误

```js
async function fetchData() {
  try {
    const data1 = await fetchData1();
    console.log("Data received:", data1);
    const data2 = await fetchData2(); // 等待上一步完成后开始执行
    console.log("Data received:", data2);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
```
