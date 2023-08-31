#### 1 NaN

- 这个特殊的 Number 与所有其他值都不相等，包括它自己
- 唯一能判断 NaN 的方法是通过 isNaN()函数

```js
NaN === NaN; // false
isNaN(NaN); // true
```

#### 2 浮点数比较

- 要注意浮点数的相等比较
- 要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：

```js
1 / 3 === 1 - 2 / 3; // false
Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true
```

#### 3 strict 模式

- 变量必须先声明后使用
- 禁止删除变量、函数或函数的参数
- 禁止使用保留字作为变量名（如 eval、arguments 等）
- 函数内部的 this 可能为 undefined，而不是默认绑定到全局对象。
- 禁止给只读属性赋值
- 函数的参数名称不能重复
- 禁止使用 with 语句

```js
// es5新增
"use strict";
```

#### 4 区别是 Array 还是 Object

- ~~typeof~~ // 不可行 都是 object
  - typeof 数组/正则/对象/null(历史错误) 都为 object
  - typeof 函数 为 function
- Array.isArray()
- instanceof 检查是否属于特定类或构造函数的运算符

```js
[] instanceof Array; // true
{} instanceof Object; // true
(/\d+/g) instanceof RegExp; // true
```

- constructor 访问对象的构造函数

```js
foo.constructor; // Array()/Object()/Data()/RegExp()/Function()...
```

#### 5 函数

##### 函数申明和函数表达式

1. 函数声明(Function Declaration)

> 函数声明会提升(hoisting)到当前作用域的顶部，`可在函数声明之前调用`

```js
function foo(a, b) {}
```

2. 函数表达式(Function Expression)

> 将`匿名函数`赋值给一个变量或常量来创建，`函数表达式在运行到达它所在的代码行时才会被赋值和创建`

```js
const bar = function (a, b) {};
```

##### IIFE (Immediately Invoked Function Expression) 立即执行函数

- 立即调用，创建一个独立的作用域，可以防止变量的污染和冲突，并且用于隔离代码，防止对全局命名空间的影响。
- es6 之前常结合闭包来封装模块

```js
(function (name) {
  console.log("Hello, " + name + "!");
})("World");
```

##### 闭包

1. 函数 A 将函数 B 返回出来
2. 调用返回出来的函数 B

- 用于模块化、缓存、封装私有属性、防止全局变量污染等操作
- 不再需要时，需要将引用置为 null，避免内存泄漏

#### 6 运算

##### i++和++i

- `y = x++` 后置递增运算符 x 先赋值给 y，然后再加一
- `y = ++x` 前置递增运算符 x 先加一，然后再赋值给 y

##### % 取模

- 取模运算的结果符号只与左边值的符号有关

```js
let x = 7 % 3; // 1
let y = 7 % -3; // 1
let z = -7 % 3; // -1
```

##### +

- 不存在字符串时，均视为数字类型（bool 视为 0 或者 1、null 视为 0、undefined 视为 NaN）
- 存在字符串时，均视为字符串类型（true、false、undefined、null、NaN 视为自身的字符串）

##### -

- 不会触发字符串拼接行为
- 尝试将非数字类型转数字类型计算，如果失败则返回 NaN

##### ,

- 从左到右，逐个执行每个表达式，然后返回最后一个表达式的值。

```js
let a = 1,
  b = 2,
  c = 3;
let num = (1, 2); // 2
let newArr = arr.map((item) => (item.push(0), item));
```

##### void

- 指定要计算一个表达式但是不返回值

```js
void 0; // undefined
```

- href="javascript:void(0)" 表示一个死链接

```js
<a href="javascript:void(0)" rel="nofollow">
  死链接
</a>
```

#### 7 比较

##### `==`的比较规则

1. 两端类型相同，比较值
2. 两端存在 NaN，返回 false
3. undefined 和 null 只有与自身比较，或者互相比较时，才会返回 true

```js
undefined == undefined; // true
null == null; // true
undefined == null; // true
```

4. 两端都是原始类型，转换成数字比较

```js
true == 1; // true
"true" == 1; // false 相当于NaN == 1
```

5. 一端是原始类型，一端是对象类型，把对象转换成原始类型后进入

> - 对象如何转原始类型：
>
> 1. 如果对象拥有[Symbol.toPrimitive]方法则调用，返回原始值或者抛出异常
> 2. 调用对象的 valueof 方法，返回原始值或者进入下一步
> 3. 调用对象的 tostring 方法，返回原始值或者抛出异常

#### 8

-
