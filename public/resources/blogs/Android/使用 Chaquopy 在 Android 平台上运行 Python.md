# 1 简介

Chaquopy 是一个用于在 Android 应用程序中集成 Python 的开源工具。它提供了一个桥接层，将 Python 解释器嵌入到 Android 应用的 Java 代码中，并允许在应用程序中直接运行 Python 代码。

# 2 Chaquopy 的工作原理

## 2.1 集成

Chaquopy 使用 Gradle 插件来集成到 Android 应用项目中。

## 2.2 构建

当应用程序被构建时，Chaquopy 将 Python 代码和所需的 Python 解释器打包到 APK 中。这样，应用程序可以在运行时执行 Python 代码。

## 2.3 桥接

Chaquopy 提供了一个 Java 和 Python 之间的桥接层，使得在 Java 代码中调用 Python 代码成为可能。
使用了 JNI（Java Native Interface）来实现 Java 与 Python 之间的桥接。
https://chaquo.com/chaquopy/doc/current/index.html

> - Chaquopy 在 Java 层定义了与 Python 解释器交互的 JNI 接口。
> - 在运行时，当 Java 代码需要调用 Python 代码时，JNI 接口允许 Java 代码通过 JNI 方法调用向 Python 解释器发送请求。
> - JNI 接口将请求传递给嵌入的 Python 解释器。
> - Python 解释器执行相应的 Python 代码，并将结果返回给 JNI 接口。
> - JNI 接口将结果传递回 Java 代码，以便进行进一步处理和使用。

## 2.4 运行时

当应用程序在设备上运行时，Chaquopy 在运行时启动 Python 解释器，并通过桥接层将 Java 和 Python 之间的交互传递。这样，Python 代码可以在 Android 应用程序中执行，并与其他组件进行交互。

# 3 配置依赖

## 3.1 工程根目录下的 build.gradle

```java
buildscript {
  repositories {
    maven { url 'https://maven.aliyun.com/repository/public/' }
    google()
    maven { url "https://chaquo.com/maven" }
  }
  dependencies {
    classpath 'com.android.tools.build:gradle:7.0.3'
    classpath "com.chaquo.python:gradle:12.0.0"

    // NOTE: Do not place your application dependencies here; they belong
    // in the individual module build.gradle files
  }
}

allprojects {
  repositories {
    maven { url 'https://maven.aliyun.com/repository/public/' }
    google()
    maven { url 'https://www.jitpack.io' }
  }
}
```

## 3.2 app 模块下的 build.gradle

```java
plugins {
  id 'com.android.application'
  // 应用chaquopy插件
  id 'com.chaquo.python'
}
android {
  defaultConfig {
    ...
    // 第三方库的引入
    python {
      // Python路径
      buildPython "C:\\AAAAplications\\Anaconda\\python.exe"
      pip {
        install "pandas"
        install "xlrd==1.2.0"
        install "re101"
        install "tensorflow"
        install "matplotlib"
        install "numpy"
        install "sklearn"
      }
    }
    ...
  }
}
```

### 3.3 配置完成后，同步 gradle

# 4 编写代码

## 4.1 在 app/src/main/python 目录下编写 python 代码

```python hello.py
from java import jclass

def greet(name):
  print("--- hello,%s ---"% name)

def greet(name):
  print("--- hello,%s ---" % name)

def add(a,b):
  return a + b

def sub(count,a=0,b=0,c=0):
  return count - a - b -c

def get_list(a,b,c,d):
  return [a,b,c,d]

def print_list(data):
  print(type(data))

# 遍历Java的ArrayList对象
for i in range(data.size()):
  print(data.get(i))

# python 调用 Java 类
def get_java_bean():
  JavaBean = jclass("org.hello.JavaBean")
  jb = JavaBean("python")
  jb.setData("json")
  jb.setData("xml")
  jb.setData("xhtml")
  return jb
```

## 4.2 Java 代码 调用 Python

```java
package org.hello;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.chaquo.python.Kwarg;
import com.chaquo.python.PyObject;
import com.chaquo.python.android.AndroidPlatform;
import com.chaquo.python.Python;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
  static final String TAG = "PythonOnAndroid";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    initPython();
    callPythonCode();
  }

  // 初始化 Python 环境
  void initPython() {
    if (!Python.isStarted()) {
      Python.start(newAndroidPlatform(this));
    }
  }

  // 调用 python 代码
  void callPythonCode() {
    Python py = Python.getInstance();
    // 调用 hello.py 模块中的 greet 函数，并传一个参数
    // 等价用法： py.getModule("hello").get("greet").call("Android");
    py.getModule("hello").callAttr("greet", "Android");

    // 调用 python 内建函数 help() ，输出了帮助信息
    py.getBuiltins().get("help").call();
    PyObject obj1 = py.getModule("hello").callAttr("add", 2,3);
    // 将Python返回值换为Java中的Integer类型
    Integer sum = obj1.toJava(Integer.class);
    Log.d(TAG,"add = "+sum.toString());

    // 调用python函数，命名式传参，等同 sub(10,b=1,c=3)
    PyObject obj2 = py.getModule("hello").callAttr("sub", 10,new Kwarg("b", 1),
    new Kwarg("c", 3));
    Integer result = obj2.toJava(Integer.class);
    Log.d(TAG,"sub = "+result.toString());

    // 调用Python函数，将返回的Python中的list转为Java的list
    PyObject obj3 = py.getModule("hello").callAttr("get_list", 10,"xx",5.6,'c
    ');
    List<PyObject> pyList = obj3.asList();
    Log.d(TAG,"get_list = "+pyList.toString());

    // 将Java的ArrayList对象传入Python中使用
    List<PyObject> params = new ArrayList<PyObject>();
    params.add(PyObject.fromJava("alex"));
    params.add(PyObject.fromJava("bruce"));
    py.getModule("hello").callAttr("print_list", params);

    // Python中调用Java类
    PyObject obj4 = py.getModule("hello").callAttr("get_java_bean");
    JavaBean data = obj4.toJava(JavaBean.class);
    data.print();
  }
}
```

## 4.2 Java 代码 Python 返调 Java 类

```java
package org.hello;

import android.util.Log;
import java.util.ArrayList;
import java.util.List;

public class JavaBean {
  private String name;
  private List<String> data;

  public JavaBean(String n) {
    this.name = n;
    data = new ArrayList<String>();
  }

  public void setData(String el) {
    this.data.add(el);
  }

  public void print() {
    for (String it : data) {
      Log.d("Java Bean - " + this.name, it);
    }
  }
}
```
