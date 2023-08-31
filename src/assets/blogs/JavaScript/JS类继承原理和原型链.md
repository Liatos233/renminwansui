#### 概述

- 在 JavaScript 中，类继承的原理是基于原型链的机制。每个对象都有一个内部属性`[[Prototype]]`（可以通过`__proto__`访问），它指向该对象的构造函数的显式原型对象。

- 原型对象本身也是一个对象，它有自己的`[[Prototype]]`，形成了一个链式结构，即原型链。原型链的顶端是`Object.prototype`，它是所有对象的默认原型。

#### 类继承实现

```javascript
// 1. 定义父类（构造函数）
function Animal(name) {
  this.name = name;
}
// 2. 在父类的原型上定义方法
Animal.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

// 3. 定义子类（构造函数）
function Dog(name, breed) {
  // 父类属性的继承 类似于 super()
  Animal.call(this, name);
  // 子类自己的属性
  this.breed = breed;
}

// 4. 建立原型链关系
Dog.prototype = Object.create(Animal.prototype); // Dog.prototype.__proto__ = Animal.prototype; //同样可以，但是存在兼容性问题
Dog.prototype.constructor = Dog; // 修复子类的constructor指向

// 5. 在子类的原型上定义自己的方法
Dog.prototype.bark = function () {
  console.log("Woof!");
};

// 6. 创建子类实例
let myDog = new Dog("Max", "Labrador");
myDog.sayName(); // My name is Max
myDog.bark(); // Woof!
```

#### 显式原型和隐式原型

##### 显式原型

- 每个函数（构造函数或普通函数）都有一个属性 `prototype`
- 定义函数时自动添加

##### 隐式原型

- 创建的每个对象实例都有一个内部属性 `__proto__`
- 对象实例化时自动添加 指向它的构造函数的显式原型

Note：

1. 函数的显式原型指向的对象默认式空 Object 实例对象
2. Object 的原型对象是原型链的尽头
3. 读取对象的属性值时：自动到原型链中查找
4. 设置对象的属性值时：不会查找原型链，如果没有则直接添加

#### 实现一个 instanceof

```js
// 传入两个参数为：对象实例、构造函数
function myInstanceOf(obj, constructor) {
  // 检查参数是否是函数（构造函数）
  if (typeof constructor !== "function") {
    throw new Error("Right-hand side of instanceof is not callable");
  }

  // 判断 obj 是否为 constructor 的实例
  let prototype = constructor.prototype;
  while (obj !== null) {
    // 找到了对应原型
    if (obj === prototype) {
      return true;
    }
    // 继续在原型链上寻找原型
    obj = obj.__proto__;
  }
  // 没有找到对应原型
  return false;
}

let foo = { bar: 0 };
console.log(myInstanceOf(foo, Object)); // true
console.log(myInstanceOf(foo, Array)); // false
```
