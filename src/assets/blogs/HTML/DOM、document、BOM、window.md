#### DOM(Document Object Model)

- 为了操作文档出现的 API

#### document

- document 是 DOM 中的一个顶级对象，代表整个文档
- 常用属性如下
  - document.documentElement 获取 html 元素
  - document.body
  - document.title
  - document.location
  - document.cookie
- 常用 API 如下

  - document.write()
  - document.getElementBy\*\*\*()
  - document.querySelector()/querySelectorAll()
  - document.addEventListener()/removeEventListener() 添加/移除事件句柄

- `element` 的常用属性如下

  - element.innerHTML/innerText
  - element.attributes
  - element.style
  - element.childNodes/children
  - element.classList/className/id
  - element.clientTop/clientLeft/clientWidth/clientHeight 可视宽高
  - element.scrollTop/scrollLeft/scrollWidth/scrollHeight （包括带滚动条的隐蔽的地方）的宽高
  - element.firstChild/lastChild/nextSibling/previousSibling/parentNode

- `element` 的常用方法如下
  - element.setAttribute()/getAttribute()
  - element.appendChild()/insertBefore()
  - element.cloneNode()
  - document.addEventListener()/removeEventListener() 添加/移除事件句柄

#### BOM(Browser Object Model)

- 为了操作浏览器出现的 API

#### window

- window 是 BOM 中的一个顶级对象，代表浏览器的窗口或标签页
- 下辖有 `navigator location history screen` 等
- 常用属性如下
  - window.innerWidth/innerHeight 窗口文档显示区宽高
  - window.outerWidth/outerHeight 窗口外部宽高 包括工具条与滚动条
  - window.localStorage/sessionStorage
  - window.screenLeft/screenTop/screenX/screenY 相对于对于屏幕窗口的坐标
- 常用 API 如下
  - window.alert()/confirm()/prompt()
  - window.atob()/btoa() 解码编码 base64
  - window.setTimeout()/setInterval()
  - window.close()/open()/blur()/focus()
  - window.moveBy()/moveTo()/scrollBy()/scrollTo()
  - window.postMessage()
