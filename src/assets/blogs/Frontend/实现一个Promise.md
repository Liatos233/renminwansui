#### 实现流程

```js
class MyPromise {
  // 构造器
  constructor(executor) {
    this.state = "pending"; // 初始状态为 pending
    this.value = undefined; // 保存 promise 的值
    this.onResolvedCallbacks = []; // 存储成功回调
    this.onRejectedCallbacks = []; // 存储失败回调

    // 成功的执行回调
    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled"; // 改变状态为 fulfilled
        this.value = value; // 保存值

        // 执行所有成功回调
        this.onResolvedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    };

    // 失败的执行回调
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected"; // 改变状态为 rejected
        this.value = reason; // 保存失败原因

        // 执行所有失败回调
        this.onRejectedCallbacks.forEach((callback) => {
          callback(reason);
        });
      }
    };

    // 执行传入的执行器函数
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then链式回调方法
  then(onResolved, onRejected) {
    // 创建一个新的 Promise 并返回
    const newPromise = new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        try {
          const result = onResolved(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }

      if (this.state === "rejected") {
        try {
          const result = onRejected(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }

      if (this.state === "pending") {
        // 将回调添加到队列中
        this.onResolvedCallbacks.push((value) => {
          try {
            const result = onResolved(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedCallbacks.push((reason) => {
          try {
            const result = onRejected(reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return newPromise;
  }
}

// 示例使用
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success");
    // reject('Failure');
  }, 1000);
});

promise
  .then((value) => {
    console.log("Resolved:", value);
    return "New Value";
  })
  .then((newValue) => {
    console.log("Chained Resolved:", newValue);
  })
  .catch((reason) => {
    console.log("Rejected:", reason);
  });
```

#### 构造函数方法

##### all()

- 将多个 Promise 实例包装成一个新的 Promise 实例
- 全部变成 fullfilled，才返回 fulfilled
- 只要有一个变成 rejected，则返回 rejected

##### race()

- 将多个 Promise 实例包装成一个新的 Promise 实例
- 只要之中有一个实例率先改变状态，则返回相同的状态

##### allSettled()

- 将多个 Promise 实例包装成一个新的 Promise 实例
- 只有等到所有这些参数实例都返回结果，不管是 fulfilled 还是 rejected，包装实例才会结束

##### resolve()

- 将现有对象转为 Promise 对象
- 如果参数是 Promise 实例，则原封不动返回；如果参数是 thenable 对象，则转化为 Promise 对象并立即执行 then()方法；否则返回 resolved 状态的 Promise 对象

```js
let p = Promise.resolve("foo");
// 等价于
let p = new Promise((resolve) => resolve("foo"));
```

##### reject()

- 返回一个 Promise 实例，该实例的状态为 rejected

```js
const p = Promise.reject("err");
// 等同于
const p = new Promise((resolve, reject) => reject("err"));
```
