#### BFC 概述

- Block fomatting context = block-level box + Formatting Context
- 定义独立的渲染区域，决定子元素如何布局，以及与其他元素的关系和作用

##### 生成条件

1. 根元素 `<html>`
2. 设置了 float
3. overflow 的值为 hidden、scroll、auto 等
4. position 的值为 absolute 或 fixed
5. display 的值为 inline-block、table-cell、table-caption
6. 表格单元格(元素的 display: table-cell，HTML 表格单元格默认属性)
7. display 为 flex 或者 inline-flex 元素
8. display 为 grid 或者 inline-grid 元素

##### 约束规则

1. 内部 box 垂直放置
2. 两个相邻 Box 的 margin 会发生重叠（塌陷）以最大的为准
3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此
4. BFC 的区域不会与 float 的元素区域重叠
5. 计算 BFC 的高度时，浮动子元素也参与计算
6. 页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

##### 应用

- 防止 margin 重叠（塌陷）
- 清除内部浮动（`对应约束规则 4`）
- 自适应两栏布局（适用于 float 布局）（`对应约束规则 4`）

#### IFC 概述

- Inline fomatting context = inline-level box + Formatting Context

##### 布局规则

1. 高度由其包含行内元素中最高的实际高度计算而来
2. IFC 中的 line box 一般左右都贴紧整个 IFC，但是会因为 float 元素而扰乱 float . 元素会位于 IFC 与与 line box 之间，使得 line box 宽度缩短
3. 同个 ifc 下的多个 line box 高度会不同
4. 水平的 margin、padding、border 有效，垂直无效不能指定宽高
5. 行框的高度由行高来决定

##### 应用

- 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过 text-align 则可以使其水平居中
- 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align:middle，其他行内元素则可以在此父元素下垂直居中
