# Java 基础知识

## 1 数据类型

![Imgur](https://i.imgur.com/W5M0Muf.png)

## 2 数组声明的三种方式：

- 数据类型[] 数组名 = new 数据类型[长度];
- 数据类型[] 数组名 = {数据,数据,…,数据};
- 数据类型[] 数组名 = new 数据类型长度[] {数据,数据,…,数据};

## 3 对象与类：

类是对象的概括或者抽象，对象是类的实例化

### 3.1 类的声明

[修饰符] class 类名{

//类的声明部分

[成员变量]

[成员方法]

}

### 3.2 成员变量的声明：

[修饰符] 数据类型 变量名 [= 初始值];

成员方法的声明：

[修饰符] 返回值的类型 方法名([数据类型 参数名,……]){

//方法体，该方法完成的功能代码

}

### 3.3 构造器的声明：

[修饰符] 构造器名【同类名】([数据类型 参数名,……]){

//构造器完成的功能代码

}

### 3.4 重载

方法的重载 OverLoading: 同一个类中定义了多个方法名相同而参数不同的方法

重载在同一个类中，方法名相同，参数不同（参数的个数、顺序、类型不同）

### 3.5 this 的两种使用方法

如果发生局部变量和成员变量命名冲突时，可以通过 this.成员变量名的方式区分成员变量和局部变量。

一个构造方法中需要调用本类的另一个构造方法，可以通过 this()的方式调用，但 this()必须要书写在第一行。

## 4 Static 关键字

静态变量 ：使用 static 修饰的成员变量叫做静态变量，静态变量和非静态变量的区别是：静态变量被所有的对象所共享，在内存中只有一个副本，它当且仅当在类初次加载时会被初始化。而非静态变量是对象所拥有的，在创建对象的时候被初始化，存在多个副本，各个对象拥有的副本互不影响。static 成员变量的初始化顺序按照定义的顺序进行初始化。

静态方法 ： 使用 static 修饰的成员方法叫做静态方法，静态方法可以不依赖于任何对象进行访问（对于静态方法来说，是没有 this 的），由于这个特性，在静态方法中不能访问类的非静态成员变量和非静态成员方法，因为非静态成员方法/变量都是必须依赖具体的对象才能够被调用。

静态内部类（ static 修饰类的话只能修饰内部类）：静态内部类与非静态内部类之间存在一个最大的区别: 非静态内部类在编译完成之后会隐含地保存着一个引用，该引用是指向创建它的外围类，但是静态内部类却没有。没有这个引用就意味着：1. 它的创建是不需要依赖外围类的创建。2. 它不能使用任何外围类的非 static 成员变量和方法。

静态代码块 ：是一个以 static 为前导的代码块，一般用于为类的工作做一些初始化工作，如初始化一些静态变量。一个类中可以有许多静态初始化块，并且它们可以出现在类体的任何地方。运行时系统会保证静态初始化块会按照它们在源代码中出现的顺序被调用

static 块可以用来优化程序性能：因为它只会在类加载的时候执行一次

## 5 super 关键字

super 代表的是父类对象

使用方式：

super.属性名、super.方法名();

用于在子类中调用父类被隐藏的同名实例变量

super([参数列表])

用于在子类的构造方法中调用父类的构造方法

每一个子类的构造方法在没有显示调用 super() 系统都会提供一个默认的 super() ， super() 必须是构造器的第一条语句\*\*

## 6 final 关键字

修饰类 ：类不能继承，final 类中的所有成员方法都会被隐式的指定为 final 方法；

修饰变量 ：该变量为常量，如果是基本数据类型的变量，则其数值一旦在初始化之后便不能更改；如果是引用类型的变量，则在对其初始化之后便不能让其指向另一个对象；

修饰方法 ：方法不能重写，以防任何继承类修改它的含义

## 7 三大特性

### 7.1 封装

封装指隐藏对象的状态信息（属性），不允许外部对象直接访问对象的内部信息（private 实现）。但是可以提供一些可以被外界访问的方法来操作属性。

将类中成员变量 private，提供 public 的 get 和 set 方法来控制属性的存取动作，以保证对私有属性操作的安全性

### 7.2 继承

多个类中存在相同属性和行为时，将这些内容抽取到单独一个类中，那么多个类无需再定义这些属性和行为，只要继承单独的那个类即可。多个类可以称为子类，单独这个类称为父类或者超类。

[修饰符] class 子类名 extends 父类名{

类体部分

}

继承是使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的属性或方法（对父类进行扩展），也可以拥有父类的属性和方法，并且通过自己的方法再次实现父类的方法（重写）。通过使用继承，可以快速地创建新的类，可以提高代码的重用，程序的可维护性，节省大量创建新类的时间 ，提高我们的开发效率

Java 只支持单继承，不支持多继承。一个类只能有一个父类，不可以有多个父类。Java 支持多层继承(继承体系)。Java 继承了父类非私有的成员变量和成员方法，但是请注意：子类是无法继承父类的构造方法的

方法的重写 ：子类从父类继承的某个实例方法无法满足子类的功能需要时，需要在子类中对该实例方法进行重新实现，这样的过程称为重写，也叫做覆写、覆盖。

方法重写的前提：继承，子类的修饰符大于等于父类，方法名、参数列表、返回值类型必须相同

### 7.3 多态

多态的前提：继承、重写、向上转型

多态可以提高代码的可重用性，降低模块之间的耦合度

## 8 抽象类

Java 中可以定义没有方法体的方法，该方法的具体实现由子类完成，该方法称为抽象方法，包含抽象方法的类就是抽象类。

抽象类的声明 ：

[修饰符] abstract class 类名 [extends 父类名]{

类体

}

抽象方法的声明 ：

[修饰符] abstract 返回值类型 方法名([参数列表]);

抽象类中可以没有抽象方法，但是一旦某个有抽象方法，那么这个类必须被声明为抽象类。

抽象类的使用 ：因为抽象类不是一个具体的类，所以无法实例化，但是抽象类可以用于声明变量。抽象类可以被继承，在子类中实现抽象类的所有抽象方法，以达到抽象类的具体化

## 9 接口

申明 ：

[修饰符] interface 接口名 {

[常量];

[抽象方法];

}

实现 ：

[修饰符] class 类名 [extends 父类名] [implements 接口 1,接口 2,……]{

类体部分

}

一个类可以实现多个接口，从而解决了 Java 单继承的缺点
