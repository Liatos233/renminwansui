### 遍历数组

#### for 循环

- 使用最传统的 for 循环可以遍历数组或类数组对象。

```js
const array = [1, 2, 3, 4, 5];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

#### while 循环

- 可以利用 while 循环进行遍历，需要手动维护索引或条件。

```js
const array = [1, 2, 3, 4, 5];
let i = 0;
while (i < array.length) {
  console.log(array[i]);
  i++;
}
```

#### for...of 循环

- 用于遍历可迭代对象（如数组、字符串、Set、Map 等）的值。

```js
const array = [1, 2, 3, 4, 5];
for (const element of array) {
  console.log(element);
}
```

#### forEach() 方法

- 数组的 forEach 方法可以遍历数组，对每个元素执行指定的回调函数。

```js
const array = [1, 2, 3, 4, 5];
array.forEach((element) => {
  console.log(element);
});
```

### 遍历对象

#### for...in 循环

- 用于遍历对象的可枚举属性（包括原型链上的属性）。

```js
const obj = { a: 1, b: 2, c: 3 };
for (const key,index in obj) {
  console.log(key, obj[key]);
}
```

#### Object.keys() 方法

- 可以遍历对象的键（属性名），返回一个由键组成的数组。

```js
const obj = { a: 1, b: 2, c: 3 };
const keys = Object.keys(obj);
for (const key of keys) {
  console.log(key, obj[key]);
}
```

#### Object.values() 方法

- 可以遍历对象的值，返回一个由值组成的数组。

```js
const obj = { a: 1, b: 2, c: 3 };
const values = Object.values(obj);
for (const value of values) {
  console.log(value);
}
```

#### Object.entries() 方法

- 可以遍历对象的键值对，返回一个由键值对组成的数组。

```js
const obj = { a: 1, b: 2, c: 3 };
const entries = Object.entries(obj);
for (const [key, value] of entries) {
  console.log(key, value);
}
```

#### 迭代器（Iterator）

- 通过调用对象的 Symbol.iterator 方法获得迭代器，可以使用 for...of 或 while 遍历可迭代对象。

```js
const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator]();
let next = iterator.next();
while (!next.done) {
  console.log(next.value);
  next = iterator.next();
}
```
