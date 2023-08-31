#### 概述

- JavaScript 事件委托也称为`事件代理`。它利用`事件冒泡`的特性，将事件处理程序绑定到一个父元素上，以处理其子元素触发的事件。通过事件委托，我们可以避免给每个子元素都绑定事件处理程序，从而减少内存占用和提高性能。

  > `事件冒泡`：当子元素上触发了一个事件（如点击事件），该事件会向上冒泡，直到到达其`父元素或更外层的祖先元素`。

- 事件委托的优势：
  - 适用于动态添加或删除子元素的情况，因为无论子元素何时添加或删除，只要它们是元素的子元素，它们就会自动继承相同的事件处理逻辑。
  - 在大型的页面或应用中，可以减少事件处理程序的数量，简化代码结构，并提高性能。

```html
<!-- 可以在`<ul>`元素上绑定一个点击事件处理程序，来处理所有子元素的点击事件： -->
<ul id="myList">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
  const ulElement = document.getElementById("myList");

  ulElement.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      // 在这里处理点击事件，event.target 是被点击的 <li> 元素
      console.log("Clicked item:", event.target.textContent);
    }
  });
</script>
```
