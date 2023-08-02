#### 1 html 和 htm

- 由于早期 windows 文件拓展名长度限制，html 缩短为 htm，二者无区别

#### 2 HTML 与 XHTML

- XHTML（Extensible）语法要求更为严格
- XHTML 标签必须小写、闭合
- XHTML 必须有一个根元素

#### 3 `<hr>` 标签

- （Horizontal Rule） 用于显示一条水平线

#### 4 HTML 空格和换行

- 所有连续的空格或空行都会被算作一个空格
- 被包围在 `<pre>` 标签 元素中的文本（不能是块级元素）通常会保留空格和换行符。而文本也会呈现为等宽字体

#### 5 `<bdo>` 标签

- bidi 覆盖（Bi-Directional Override）用来覆盖默认的文本方向
- dir="ltr"/"rtl"

#### 6 `<abbr>` 标签

- abbreviation 用来表示一个缩写词或者首字母缩略

```html
<abbr title="World Health Organization">WHO</abbr>
```

#### 7 `<a>` 标签

- 可用于在当前页面链接到指定位置

```html
<!-- 链接 -->
<a href="#C4">查看章节 4</a>
<!-- 链接指定位置 -->
<h2><a id="C4">章节 4</a></h2>
```

#### 8 图像

- 可以使用 `<map>` 和 `<area>` 定义图像地图和可点击区域

#### 9 字符实体

```html
&entity_name;
&#entity_number;

<!-- 不间断空格 -->
&nbsp;
```

#### 10 Cookie

- 由服务器发送给浏览器的一个小型文本文件
- 浏览器在随后的请求中会将该文件作为头信息附加到服务器发送的请求中。
- 跟踪用户的会话状态、记录用户的偏好设置等
- 几 KB 到几 MB

```js
// 设置 Cookie
document.cookie =
  "username=John Doe; expires=Thu, 31 Dec 2023 23:59:59 GMT; path=/";
// 获取 Cookie
const cookies = document.cookie;
console.log(cookies);
// 删除 Cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
```

#### 11 HTML5

##### canvas

- 基于位图，逐像素渲染
- 适用于密集图像、动态效果绘制

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

##### svg

- 基于矢量图，使用 xml 描述，所有节点被视为对象，支持事件处理
- 适用于低复杂度、可伸缩交互图形，如图标

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

##### MathML

- 是一种基于 XML（标准通用标记语言的子集）的标准，用来在互联网上书写数学符号和公式的置标语言。

```html
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <msup><mi>a</mi><mn>2</mn></msup>
    <mo>+</mo>
    <msup><mi>b</mi><mn>2</mn></msup>
    <mo>=</mo>
    <msup><mi>c</mi><mn>2</mn></msup>
  </mrow>
</math>
```

##### 拖放（Drag 和 Drop）

```html
ondragstart="" ondragover="" ondrop=""
```

##### Video 和 Audio

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
</video>
<audio controls>
  <source src="horse.ogg" type="audio/ogg" />
  <source src="horse.mp3" type="audio/mpeg" />
</audio>
```

##### 语义化标签

![语义化标签](https://www.runoob.com/wp-content/uploads/2013/07/html5-layout.jpg)

##### web 本地存储

![sessionStorage和localStorage作用域](https://www.runoob.com/wp-content/uploads/2019/04/3793073884-56950753e65db_articlex.png)

- 大小限制 5 - 10MB

```js
setItem(key, value);
getItem(ket);
removeItem(key);
clear();
key(index); // index由添加顺序决定 删除中间的后面会相应补位
```

##### IndexedDB

##### Web Workers

- 在浏览器中运行的后台线程，可以执行长时间运行的任务而不会阻塞主线程
- 应用于 复杂计算、图像处理、数据加密、websocket 等
- worker 线程中使用 portMessage 与主线程通信

```js
function startWorker() {
  if (typeof Worker !== "undefined") {
    if (typeof w == "undefined") {
      w = new Worker("demo_workers.js");
    }
    w.onmessage = function (event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML =
      "抱歉，你的浏览器不支持 Web Workers...";
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}
```

##### 服务器发送事件(Server-Sent Events)

- 基于 HTTP/HTTPS 的单向通信
- 应用于 即时通讯、日志监控、推送通知、消息通道 等

##### WebSocket

- 在单个 TCP 连接上进行全双工通讯的协议
- 应用于 即时通讯、在线游戏、协作编辑、实时视频和音频流传输、消息通道 等
