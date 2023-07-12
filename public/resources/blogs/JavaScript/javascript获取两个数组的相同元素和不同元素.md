#### 1、获取两个数组的不同元素

```jsx
function getDiff(arr1, arr2) {
  return arr1
    .concat(arr2)
    .filter((item, index, arr) => arr.indexOf(item) === arr.lastIndexOf(item));
}
```

#### 2、获取两个数组的相同元素

```jsx
function getSame(arr1, arr2) {
  return [...new Set(arr1)].filter((item) => arr2.includes(item));
}
```
