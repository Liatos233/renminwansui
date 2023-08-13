## 概述

- TypeScript 是由 Microsoft 开发的一门静态类型的语言

## 类型系统

- 类型推断
- any、unknown(更安全的 any， 需要类型缩小) (顶层类型)
- never (底层类型)
- boolean、string、number、bigint、symbol、object、undefined、null
- Object(原始类型值、对象、数组、函数都是合法的 Object)
- object(只包含对象、数组和函数)
- | 和 &
- `type 用于定义类型别名，能表示非对象类型，不可继承、interface 用于定义接口，只能表示对象类型，支持继承`
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
