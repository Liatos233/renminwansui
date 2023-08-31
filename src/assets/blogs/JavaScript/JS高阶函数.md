### Reflect

- 之前就存在非标准的实现，ES6 中被标准化成了一个全局对象
- 提供了一整套反射能力 API(`静态方法`),这些方法与 Object 对象的`命令式方式`方法相对应,允许你使用`函数调用方式`操作对象

#### 1 **Reflect.get(target, propertyKey, receiver)**

> 类似于 target[propertyKey],用于获取对象身上的某个属性的值。

#### 2 **Reflect.set(target, propertyKey, value, receiver)**

> 类似于 target[propertyKey] = value,用于设置对象身上的某个属性的值。

#### 3 **Reflect.has(target, propertyKey)**

> 类似于 propertyKey in target,用于判断一个对象是否存在某个属性。

#### 4 **Reflect.deleteProperty(target, propertyKey)**

> 类似于 delete target[propertyKey],用于删除对象的属性。

#### 5 **Reflect.construct(target, args)**

> 类似于 new target(...args),用于调用构造函数创建实例对象。

#### 6 **Reflect.getPrototypeOf(target)**

> 类似于 Object.getPrototypeOf(),用于获取对象的原型。

#### 7 **Reflect.setPrototypeOf(target, prototype)**

> 类似于 Object.setPrototypeOf(),用于设置对象的原型。

#### 8 **Reflect.apply(func, thisArg, args)**

> 类似于 func.apply(),用于调用一个函数。

9 **Reflect.defineProperty(target, propertyKey, attributes)**

> 类似于 Object.defineProperty(),用于定义对象的属性。

### Proxy

- 之前就存在非标准的实现，ES6 中被标准化成了一个全局对象
- 创建一个`对象的代理`，用于`监听对象的相关操作`
- 目标对象内部的 this 会自动改变为 Proxy 代理对象

#### 1 拦截属性访问

```js
let obj = { a: 0 };
let p = new Proxy(obj, {
  get: function (obj, key) {
    // 对属性访问的拦截逻辑
    return 0;
  },
});
console.log(p["a"]); // 0
```

#### 2 拦截函数调用

```js
let add = function (a, b) {
  return a + b;
};
let p = new Proxy(add, {
  // thisArg为被代理函数的this上下文
  apply: function (fn, thisArg, args) {
    // 对函数调用的拦截逻辑
    const start = performance.now();
    const result = fn.apply(thisArg, args);
    const end = performance.now();
    console.log(`Function took ${end - start} milliseconds to execute`);
    return result;
  },
});
const sum = timedAdd(3, 5); // Function took 0.04500000670552206 milliseconds to execute
console.log(`Result: ${sum}`); // Result: 8
```

#### 3 验证属性设置

```js
let validator = {
  set: function (obj, prop, value) {
    // 对属性设置的验证
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("Age must be an integer");
      }
    }

    obj[prop] = value;
  },
};
let target = {}; // 创建一个空对象作为目标对象
let p = new Proxy(target, validator);
p.age = 30; // 设置age属性为整数，不会触发验证
p.age = "25"; // 设置age属性为非整数，会触发验证并抛出错误
```

#### 4 处理函数构造

```js
function Person(name) {
  this.name = name;
}
let p = new Proxy(Person, {
  construct: function (target, args) {
    // 对构造函数的处理逻辑
    return new target(...args);
  },
});
```

### 柯里化

- 一种将多参数函数转换为一系列单参数函数的技术，使得函数可以逐步传递参数并返回新函数，直到所有参数都被传递完毕，最终得到最终结果

```js
function curry(fn) {
  // 返回一个新函数
  return function curried(...args) {
    // 当前的参数传递完了 则直接返回原函数
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      // 只传了部分参数 则返回新的柯里化函数 传入已有的参数和新参数
      return function (...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    }
  };
}

// 使用柯里化函数
function add(a, b, c) {
  return a + b + c;
}
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2, 3)); // 6
```
