#### 1 使用 log 代替 console.log

```js
const log = console.log.bind(console);
//const log = \_ => {}
```

#### 2 位运算

- `判断一个整数 x 的奇偶性`

```js
// 因为 1 的二进制表示为 0001, 当一个整数与 1 进行与运算时，只有最低位的值参与运算
x & 1 = 1 (奇数) ， x & 1 = 0 (偶数)
```

- `计算 2 ^ n`：

```js
const mod2 = 1 << n;
```

- `求一个浮点数 x 的整数部分`

```js
x = ~~x;
```

#### 3 数据结构

- 链表
  见 list.js
- 矩阵（二维数组）
  见 matrix.js
- 二叉树
  见 binaryTree.js
- 二分查找
  见 dichotomouSearch.js

#### 4 大数

JavaScript 只能精确表达 `Number.MIN_SAFE_INTEGER(-2^53+1)` ~ `Number.MAX_SAFE_INTEGER(2^53-1)` 的值
( 1 位用于表示符号位（正负号），11 位用于表示指数部分，剩下的 52 位用于表示尾数（即小数部分）)

##### BigInt

- 表示方式： 123456789n
- BigInt 类型的整数在理论上只受内存限制，可以表示无限大的整数。
- BigInt 只能与 BigInt 做运算， Number 进行计算需要先通过 BigInt() 做转换。
- 支持运算符 `+、*、-、**、%`
- 支持 `/` 但是会向上取整
