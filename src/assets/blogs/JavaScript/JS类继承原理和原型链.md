#### 概述

- 在 JavaScript 中，类继承的原理是基于原型链的机制。每个对象都有一个内部属性`[[Prototype]]`（可以通过`__proto__`访问），它指向该对象的原型对象（也称为原型）。

- 原型对象本身也是一个对象，它有自己的`[[Prototype]]`，形成了一个链式结构，即原型链。原型链的顶端是`Object.prototype`，它是所有对象的默认原型。

- 当访问一个对象的属性或方法时，JavaScript 引擎首先在对象本身查找，如果找不到，则会沿着原型链向上查找，直到找到对应的属性或方法或者到达原型链的顶端（即`Object.prototype`）。这样就实现了属性和方法的继承。

#### 类继承实现

1. 定义父类（构造函数）：通过一个函数来定义父类，该函数作为类的构造函数。父类的属性和方法可以在构造函数内部使用`this`关键字定义。
2. 定义子类（构造函数）：通过一个函数来定义子类，同样作为类的构造函数。子类通常会调用父类的构造函数来继承父类的属性，使用`ParentClass.call(this, ...args)`来实现属性继承。
3. 建立原型链：使用`ChildClass.prototype = Object.create(ParentClass.prototype)`将子类的原型对象指向父类的实例，建立原型链关系。这样子类就可以继承父类原型上的属性和方法。
4. 定义子类自己的方法：在子类的原型上定义子类自己的方法，这些方法只在子类实例上可用，不影响父类和其他子类的实例。

```javascript
// 1. 定义父类
function Animal(name) {
  this.name = name;
}
// 2. 在父类的原型上定义方法
Animal.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

// 3. 定义子类
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 4. 建立原型链关系
Dog.prototype = Object.create(Animal.prototype);
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
