#### 概述

- HTTP 请求头部字段，用于指示请求中的数据类型

#### 类型

##### 1 application/x-www-form-urlencoded：

- 默认值，常用于发送表单数据请求主体会被编码为 key1=value1&key2=value2 的形式，以 & 符号分隔键值对

##### 1 multipart/form-data：

- 用于上传文件或二进制数据这个类型通常用于表单上传文件，请求主体的格式会稍有不同，以边界标识分隔不同部分

##### 1 application/json：

- 用于发送 JSON 数据请求主体中的数据应该是 JSON 格式的字符串

##### 1 text/plain：

- 用于发送纯文本数据

##### 1 application/xml：

- 用于发送 XML 数据
