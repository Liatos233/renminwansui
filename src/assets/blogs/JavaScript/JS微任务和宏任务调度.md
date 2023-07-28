在 JavaScript 中，任务分为微任务（microtask）和宏任务（macrotask），它们是异步编程中的两种不同类型的任务调度机制。都是在`主线程执行当前任务之后执行`。

> 微任务（microtask）是一个比较小的任务单元，在 ES6 中引入的 `Promise 和 MutationObserver` 都属于微任务。微任务会在当前任务执行完毕后立即执行，而不需要等待其他任务。微任务的执行时机是在主线程的任务队列被清空之前，也就是下一个宏任务执行之前。换句话说，`微任务具有更高的优先级`，因为它们会在浏览器进行渲染之前执行，这对于一些需要尽快执行的任务很有用。

> 宏任务（macrotask）代表较大的任务单元，通常是由浏览器提供的异步 API 触发的，比如 `setTimeout、setInterval、 requestAnimationframe和 XHR` 请求等。这些任务会被添加到`事件队列`（event queue）中，在主线程空闲时执行。宏任务的执行顺序是按照任务被添加到事件队列中的顺序来执行的。

```javascript
console.log("Script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
Promise.resolve().then(function () {
  console.log("Promise");
});
console.log('Script end');
输出结果是：
Script start
Script end
Promise
setTimeout
```
