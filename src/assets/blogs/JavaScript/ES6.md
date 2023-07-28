## 1.简介

ECMAScript 标准 + JavaScript 实现

ES6 泛指 5.1 之后的下一代标准，涵盖了 ES2015、ES2016、ES2017…

Babel 转码器：ES6-\>ES5（需要根目录配置）.babelrc 文件）

各浏览器对 ES6 的兼容性：[https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)

## 2.const and let

var 的问题：

变量提升：可以先使用再声明，声明之前为 undefined

let：使用前声明，有作用域

暂时性死区（TDZ）：只要块级作用域内存在 let 命令，它所声明的变量就"绑定"（binding）这个区域，不再受外部的影响

const：只读常量，对于引用类型，被引用的地址不变（但实际指向的地址处的内容是可以改变的）

ES6 声明变量的六种方法：var、function、let、const、import、class

## 3.解构赋值

按照一定模式从数组或对象中提取值，然后对变量进行赋值（先提取，再赋值）

### 3.1.数组解构

```js
let [c, d, ...e] = [1, 2, 3, 4]; //e=[3,4]
```

Note：事实上，只要某种数据结构具有 Iterator 接口（如 Generator 函数），都可以采用数组形式的解构赋值

Note：可以设置默认值，只有当一个数组成员严格等于 undefined，默认值才会生效。

### 3.2.字符串解构

```js
// 其中 String 也被视为类数组
let [a, b] = "abcd"; // a = a; b = b
```

### 3.3.对象解构

```js
let { foo } = { foo: 1, bar: 2 }; // foo = 1
// 重新命名（后面那个才是新变量）
let { foo: newFoo } = { foo: 1, bar: 2 }; // newFoo = 1
```

Note：如果要将一个已经声明的变量用于解构赋值，必须非常小心，因为 JavaScript 引擎会将{x}理解成一个代码块

Note：因为数组也是特殊的对象，所以数据也可以做对象解构

### 3.4.数值和布尔值解构

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let { toString: s } = 123;
s === Number.prototype.toString; // true
```

### 3.5.变量交换

```js
[x, y] = [y, x];
```

### 3.6.函数返回值的解构

```js
const [a, b, c] = foo(); // 数组 需要有序
const { b, a, c } = foo(); // 对象 可以乱序
```

## 4.顶层对象的属性

ES5 之中，顶层对象的属性与全局变量是等价的，因为属性动态变化，所以变量未声明错误编译时不能发现；不利于模块化编程

ES6 之后，一方面规定，为了保持兼容性，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。

JavaScript 运行在不同的环境中，相应的顶层对象不统一；

```js
Browser -\> window/self

Web Worker -\> self

Node -\> global
```

ES2020 在语言标准的层面，引入 globalThis 作为顶层对象，均指向全局环境下的 this

## 5.字符串拓展

### 5.1.字符串的 Unicode 表示

```js
"\uD842\uDFB7" or "\u{20BB7}" // "𠮷"
```

### 5.2.字符串的遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被 for...of 循环遍历。

```js
for (let codePoint of "foo") {
  console.log(codePoint);
  // f o o
}
```

### 5.3.模板字符串

```js
let val = "world";
let res = `hello ${val}`;
// ${}中可以放入任意 js 表达式 甚至函数
```

### 5.4.标签模板

标签模板其实不是模板，而是函数调用的一种特殊形式。"标签"指的就是函数，紧跟在后面的模板字符串就是它的参数

```js
tag`Hello ${ a + b } world ${ a * b }`;

// 等同于 参数为：模板字符串数组＋参数

tag(['Hello ', ' world ', ''], 15, 50);

// Note："标签模板"的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容

// Note：arguments 是一个对应于传递给函数的参数的类数组对象。

let sender = '\<script\>alert("abc")\</script\>'

let message = SaferHTML`\<p\>${sender} has sent you a message.\</p\>`;
console.log(message)

function SaferHTML(templateData) {

  let s = templateData[0];
  console.log(arguments)

  for (let i = 1; i \< arguments.length; i++) {
    let arg = String(arguments[i]);
    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
    .replace(/\</g, "&lt;")
    .replace(/\>/g, "&gt;");
    // Don't escape special characters in the template.
    s += templateData[i];
  }

  return s;
}
```

### 5.5.标签模板的限制

ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回 undefined，而不是报错，并且从 raw 属性上面可以得到原始字符串。但是对于非标签模板，仍然报错。

```js
function tag(strs) {
  strs[0] === undefined;
  strs.raw[0] === "\\unicode and \\u{55}";
}

tag`\unicode and \u{55}`;

let bad = `bad escape sequence: \unicode`; // 报错
```
