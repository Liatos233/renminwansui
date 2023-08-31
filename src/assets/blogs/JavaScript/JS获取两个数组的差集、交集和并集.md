#### 1 获取两个数组的`差集`

```js
function getDifference(arr1, arr2) {
  return arr1
    .concat(arr2)
    .filter((item, index, arr) => arr.indexOf(item) === arr.lastIndexOf(item));
}
```

#### 2 获取两个数组的`交集`

```js
function getIntersection(arr1, arr2) {
  return [...new Set(arr1)].filter((item) => arr2.includes(item));
}
```

#### 3 获取两个数组的`并集`

```js
function getUnion(a, b) {
  return Array.from(new Set([...a, ...b]));
}
```
