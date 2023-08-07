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
"use strict";
```

#### 4 区别是 Array 还是 Object

- ~~typeof~~ // 不可行 都是 object
  - typeof 数组/正则/对象/null(历史错误) 都为 object
- Array.isArray()
- instanceof 检查是否属于特定类或构造函数的运算符

```js
[] instanceof Array; // true
{} instanceof Object; // true
(/\d+/g) instanceof RegExp; // true
```

- constructor 访问对象的构造函数

```js
foo.constructor; // Array/Object/Data/RegExp/...
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

####

https://www.runoob.com/js/js-events.html
