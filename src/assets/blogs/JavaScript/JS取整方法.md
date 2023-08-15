1. Math.round(): 四舍五入

```js
const num = 7.8;
const roundedNum = Math.round(num);
console.log(roundedNum); // 8
```

2. Math.ceil(): 向上取整

```js
const num = 7.8;
const ceiledNum = Math.ceil(num);
console.log(ceiledNum); // 8
```

3. Math.floor(): 向下取整

```js
const num = 7.8;
const flooredNum = Math.floor(num);
console.log(flooredNum); // 7
```

4. toFixed(小数位数): 数字小数位截取并转化为 `string`

```js
const num = 3.14159;
const fixedNum = num.toFixed(2);
console.log(fixedNum); // "3.14"
```

5. toPrecision(): 一个数字转换为具有固定有效位数的字符串

```js
const num1 = 1234;
const num2 = 0.001234;

const precisionNum1 = num1.toPrecision(3);
const precisionNum2 = num2.toPrecision(3);

console.log(precisionNum1); // "1.23e+3"
console.log(precisionNum2); // "0.00123"
```
