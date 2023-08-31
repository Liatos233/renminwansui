## 概述

- TypeScript 是由 Microsoft 开发的一门静态类型的语言

## 类型系统

- 类型推断
- 类型断言 `<Type>value` or `value as Type`
- any、unknown(更安全的 any， 需要类型缩小) (顶层类型)
- never (底层类型)
- boolean、string、number、bigint、symbol、object、undefined、null
- Object(原始类型值、对象、数组、函数都是合法的 Object)
- object(只包含对象、数组和函数)
- | 和 &
- type 和 interface：
  > type 用于`定义类型别名`，`不能重复声明(会报错)`，`能表示非对象类型`，`不可继承`
  > interface `用于定义接口`，`可以重复申明(会合并)`，`只能表示对象类型`，`支持继承`
- Symbol 用于定义唯一标识符

```ts
let x: symbol = Symbol();
const y: unique symbol = Symbol(); // 单个具体值
```

## 数组和元组

```ts
const arr: readonly number[] = [1, 2, 3]; // 不允许变动数组成员
let arr: Array<number> = [1, 2, 3];

const s: [string, string, ...number[]] = ["a", "b", 1, 2];
```

## 函数

```ts
function add(a: number, b: number): number {
  return a + b;
}
const add(a: string, b: string): string {
  return a + b;
}
```

- void (没有返回值)
- never (肯定不会返回值) 抛出错误、无限执行
- 函数重载

## 对象

```ts
interface Person {
  name: string;
}
```

## 类

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

- extends 用于继承
- implements 用于实现 表示当前类满足这些外部类型条件的限制
- 修饰类变量和方法的关键字：public、private(已被 es6 的`#`替代)、protected、static
- 修饰类的关键字：abstract(不能实例化)

## 泛型

```ts
// 函数的泛型写法
function fn<T>(args: T): T {}
const fn: <T> (args: T): T = {}

// 接口的泛型写法
interface Box<Type> {
  contents: Type;
}

// 类的泛型写法
class Pair<K, V> {
  key: K;
  value: V;
}

// 数组的泛型写法
let arr:Array<number> = [1, 2, 3]
let arr:number[] = [1, 2, 3] // 其实是上面写法的简写形式
```

## 枚举 Enum

- 适用于成员的值不重要，名字更重要，增加代码可读性和可维护性

```ts
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}
// 编译后会变成一个对象
// 系统会默认从零开始逐一递增为每个成员赋值 也可以显式赋值数值、字符串
// 同名 Enum 会进行合并
```

## 命名空间 namespace

- 用于建立一个容器，内部的所有变量和函数都必须在该容器中使用

```ts
namespace Utils {
  function isString(value: any) {
    return typeof value === "string";
  }

  // 如果要在命名空间以外使用内部成员 则使用export导出
  export function log(msg: string) {
    console.log(msg);
  }
  // 也可以使用import导入外部成员
  import isNumber = NumUtils.isNumber;

  // 正确
  isString("yes");
}
Utils.isString("no"); // 报错
// 编译后变成自执行函数(IIFE) 导出的内部成员作为属性添加到对象中
```

## 装饰器

- 用于为函数（function）或者类（class）添加特定行为
- 装饰器函数要么不返回值，要么返回一个新对象取代所修饰的目标对象

```js
// 装饰器函数
function simpleDecorator(value: any, context: any) {
  console.log(`hi, this is ${context.kind} ${context.name}`);
  return value;
}

@simpleDecorator
class A {} // "hi, this is class A"
```

## declare

- 用来告诉编译器，某个外部类型是存在的，可以在当前文件中使用

## [模块名].d.ts 类型申明文件

- 单独使用的模块的所有外部接口的类型定义

```ts
/// <reference path="node.d.ts"/>
// 告诉编译器在编译时需要包括的文件，常用来声明当前脚本依赖的类型文件
```

## 运算符

### keyof

- 接受一个对象类型作为参数，返回该对象的所有键名组成的联合类型

```ts
type MyObj = {
  foo: number;
  bar: string;
};
type Keys = keyof MyObj; // 'foo'|'bar'

type KeyT = keyof any; // string | number | symbol
```

### in

- 遍历取出联合类型中的每一个成员类型

```ts
type U = "a" | "b" | "c";

type Foo = {
  [Prop in U]: number;
};
// 等同于
type Foo = {
  a: number;
  b: number;
  c: number;
};
```

### []

- 用于取出对象键的类型

```ts
type Person = {
  foo: number;
  bar: string;
};
type Foo = Person["foo"]; // number
```

### extends ? :

- 根据当前类型是否符合某种条件，返回不同的类型

```ts
type T = 1 extends number ? true : false;
```

### infer

- 定义泛型里面推断出来的类型参数，而不是外部传入的类型参数

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

### is

- 描述返回值属于 true 还是 false

```ts
function isCat(a: any): a is Cat {
  return a.name === "kitty";
}
let x: Cat | Dog;
isCat(x); // true
```

### satisfies

- 用来检测某个值是否符合指定类型

### 内置类型工具

- Partial<T>： 将类型 T 中的所有属性变为可选

- Required<T>： 将类型 T 中的所有属性变为必选

- Readonly<T>： 将类型 T 中的所有属性变为只读

- Record<K, T>： 创建一个包含属性 K 和对应值类型为 T 的对象类型

- Pick<T, K>： 从类型 T 中选择一些属性，生成新的类型

- Omit<T, K>： 从类型 T 中排除一些属性，生成新的类型

- Exclude<T, U>： 从类型 T 中排除可以赋值给类型 U 的部分

- Extract<T, U>： 从类型 T 中提取可以赋值给类型 U 的部分

- NonNullable<T>： 从类型 T 中排除 null 和 undefined

- ReturnType<T>： 获取函数类型 T 的返回值类型

- InstanceType<T>： 获取构造函数类型 T 的实例类型

- Parameters<T>： 获取函数类型 T 的参数类型列表

- ConstructorParameters<T>： 获取构造函数类型 T 的参数类型列表

- ThisParameterType<T>： 获取函数类型 T 中 this 参数的类型

- OmitThisParameter<T>： 从函数类型 T 中排除 this 参数

- ThisType<T>： 提供一个指示 this 类型的标识符

- Mapped Types： 使用映射类型，可以基于现有类型创建新类型

- Awaited<T>：用来取出 Promise 的返回值类型
