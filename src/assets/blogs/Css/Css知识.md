#### 1 样式优先级

1. !important 优先级最高，无论其位置在哪里
2. 内联样式(Embedded styles)：即直接在 HTML 元素的 style 属性中定义的样式
3. 内部样式(Internal styles)：即在 HTML 中使用 `<style>` 标签定义的样式，通常位于 `<head>` 部分
4. 外部样式表（External stylesheets）：单独的 .css 文件中定义的样式

- 最后定义的样式将覆盖先前的样式
- 继承的样式优先级低于前述规则
- 内联样式 - id 选择器 - 类选择器 = 伪类选择器 = 属性选择器 - 标签选择器 = 伪元素选择器

#### 2 伪类和伪元素

##### 伪类 Pseudo Class

- 用于对处于特定状态的元素进行选择
- `:`开头
  - :hover - 鼠标悬停在元素上时应用样式
  - :active - 元素被点击并保持激活状态时应用样式
  - :focus - 元素获得焦点时应用样式（通常用于表单元素）
  - :checked - 应用于被选中的复选框或单选按钮
  - :nth-child(n) - 选择在其父元素中为第 n 个子元素的元素（n 可以是数字、关键词或表达式）

##### 伪元素 Pseudo Element

- 用于在元素的特定部分上应用样式，比如在元素的内容前面或后面插入一些额外的样式
- `::`开头
  - ::before - 在元素内容之前插入样式
  - ::after - 在元素内容之后插入样式
  - ::first-line - 应用于元素的第一行文本
  - ::first-letter - 应用于元素的第一个字母

#### 3 斜体

```css
.text1 {
  /* 使用文字的斜体 采用默认值 */
  font-style: italic;
}
.text2 {
  /* 使没有斜体属性的文字倾斜 可自定义 */
  font-style: oblique;
  font-style: oblique 5deg;
}
```

#### 4 链接

- `LVHA` 推荐按照该顺序编写链接样式
  - a:link - 正常，未访问过的链接
  - a:visited - 用户已访问过的链接
  - a:hover - 当用户鼠标放在链接上时
  - a:active - 链接被点击的那一刻

#### 5 样式编写顺序

- `LVHA` 推荐按照该顺序编写样式

  - L（Layout）：布局选择器，用于设置盒模型、位置和布局相关的属性这包括设置宽度、高度、边距、内边距、浮动、定位等
  - V（Visualization）：这些样式用于设置元素的外观、颜色、字体样式、边框等视觉效果
  - H（Hierarchy）：这些样式用于设置元素之间的层级关系，例如层级 z-index 等
  - A（Animation）：这些样式用于添加元素的动画效果，例如过渡 transition、变换 transform、关键帧动画 @keyframes 等

#### 6 列表

```css
ul.a {
  list-style-type: circle;
}
ul.b {
  list-style-type: square;
}
ol.c {
  list-style-type: upper-roman;
}
ol.d {
  list-style-type: lower-alpha;
}
```

- list-style-image 将图像设置为列表项标志
- list-style-position 设置列表中列表项标志的位置

#### 7 轮廓（outline）

- 绘制于元素周围的一条线，位于 margin 外围
- `不占空间`

#### 8 定位（Position）

- static（静态定位）：默认值按照正常的文档流进行布局，不会受到 top、right、bottom、left 等影响
- relative（相对定位）：相对定位使元素相对于其正常位置进行定位通过使用 top、right、bottom、left 等可将元素相对于其原始位置进行偏移，`但它原本所占的空间不会改变`
- absolute（绝对定位）：绝对定位使元素脱离文档流，相对于其最近的`具有定位属性（非 static）的父元素`进行定位
- fixed（固定定位）：固定定位使元素脱离文档流，并相对于浏览器窗口进行定位，即使页面滚动，元素位置也保持不变
- sticky（粘性定位）：跨越特定阈值前为 relative，之后为 fixed（需要指定 top、right、bottom、left）

**包含块**

1. 根元素（很多场景下可以看成是<html>）被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小
2. 对于其他元素，如果该元素的 position 是 relative 或者 static，则“包含块”由其最近的块容器祖先盒的 content box 边界形成
3. 如果元素 position:absolute，则“包含块”由最近的 position 不为 static 的祖先元素建立
4. 如果元素 position:fixed，则“包含块”是“初始包含块”

#### 9 组合选择符

- ' ' 后代组合器（Descendant combinator）
- '>' 直接子代组合器（Child combinator）
- '+' 紧邻兄弟组合器（Adjacent sibling combinator）
- '~' 一般兄弟组合器（General sibling combinator）

#### 10 属性可继承性

- 常见的`可继承`属性：

  - font 系列属性（如 font-family、font-size、font-weight 等）
  - color：文本颜色
  - text 系列属性（如 text-align、text-decoration 等）
  - line-height：行高
  - list-style 系列属性（如 list-style-type、list-style-position 等）
  - opacity：透明度（不包括 rgba 和 hsla 中的 alpha 值）

- 常见的`不可继承`属性：

  - margin 系列属性（如 margin-top、margin-right 等）
  - padding 系列属性（如 padding-top、padding-right 等）
  - border 系列属性（如 border-width、border-color 等）
  - background 系列属性（如 background-color、background-image 等）
  - width 和 height：宽度和高度
  - display：显示方式
  - position：定位方式
  - float：浮动方式
  - z-index：层叠顺序
  - transform：变换

#### 11 单位

##### em 和 rem

1. em 是相对于父元素字体大小的单位
2. rem 是相对于根元素（html）字体大小的单位 通常情况下默认为 16px

#### 13 颜色

##### rgb 和 hsl

1. RGB（Red Green Blue）
2. HSL（Hue Saturation Lightness）：色相、饱和度和亮度

- 色相（Hue） 0° 是红色，120° 是绿色，240° 是蓝色
- 饱和度（Saturation）表示颜色的饱和度，0% 表示灰度色，100% 表示纯彩色-
- 亮度（Lightness）表示颜色的明暗程度，0% 是黑色，100% 是白色

#### 14 媒体查询

```css
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
}
```

#### 15 css 文本超出隐藏显示三个点

1. 行文本

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

2. 多行文本

```css
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
line-clamp: 3;
-webkit-box-orient: vertical;
```

#### 16 Content-Type

- HTTP 请求头部字段，用于指示请求中的数据类型

##### application/x-www-form-urlencoded：

- 默认值，常用于发送表单数据请求主体会被编码为 key1=value1&key2=value2 的形式，以 & 符号分隔键值对

##### multipart/form-data：

- 用于上传文件或二进制数据这个类型通常用于表单上传文件，请求主体的格式会稍有不同，以边界标识分隔不同部分

##### application/json：

- 用于发送 JSON 数据请求主体中的数据应该是 JSON 格式的字符串

##### text/plain：

- 用于发送纯文本数据

##### application/xml：

- 用于发送 XML 数据

#### 17 CSS3

##### box-shadow

- h-shadow v-shadow blur spread color inset
- 水平阴影位置（required） 垂直阴影位置（required） 模糊距离 阴影大小 阴影颜色 从外层的阴影（开始时）改变阴影内侧阴影

##### border-radius

- 当 border-radius 的值设置为百分比时，参考基准是元素的宽度或高度中较小的那个
- 如果两个相邻角的半径之和超过了相应盒子边的长度，那么浏览器要重新计算，以保证两者不会重合

##### 渐变

- 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
- 径向渐变（Radial Gradients）- 由它们的中心定义

##### transform 转换

- 对元素进行移动（translate）、缩放（scale）、旋转（rotate）、倾斜（skew）等操作

##### transition 过渡

- 用于实现元素在状态改变时的过渡效果

```css
transition: property duration timing-function delay;
```

- property：all、width、height、color、transform...
- duration：持续时间，s、ms
- timing-function：时间函数(optional)linear（线性变化）、- ease（慢进快出，默认值）、ease-in（慢进）、ease-out（快- 出）等
- delay：开始前的延迟时间(optional)，s、ms

##### animation 动画

- 关键帧动画

```css
animation: name duration timing-function delay iteration-count direction
  fill-mode play-state;
```

```css
div {
  animation: myAnimation 5s linear 2s infinite alternate;
}
@keyframes myAnimation {
  from {
    background: red;
  }
  to {
    background: yellow;
  }
}
```

##### 多列

- column-count 属性指定了需要分割的列数

##### resize

- 规定用户可以通过拉伸元素尺寸来显示溢出隐藏的内容效果类似 `<textarea></textarea>` 文本域标签

##### grid

- 基于网格的布局系统，带有行和列

```css
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 50px 100px;
justify-content: space-evenly;
align-content: center;
```

##### aspect-ratio

- 指定一个元素的宽高比

```css
/* padding-top  比较Hack的方式 */
.container {
  width: 100%;
  padding-top: 56.25%;
}

/* aspect-ratio */
.container {
  width: 100%;
  aspect-ratio: 16 / 9;
}
```

##### object-fit

- 指定 Block 中的元素的填充模式
  - cover：背景图像覆盖整个 Block 并保持宽高比
  - contain：背景图像完全填充 Block 并保持宽高比且添加黑边
  - fill：背景图像完全填充 Block 并可以拉伸

##### z-index

![z-index](https://imgur.com/Fo401py.png)
