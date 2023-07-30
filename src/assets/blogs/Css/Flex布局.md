## flex

### 容器 Container

1. `flex-direction` 主轴方向
   > row、row-reverse、column、column-reverse
2. `flex-wrap` 是否换行
   > nowrap、warp、wrap-reverse
3. `flex-flow` flex-direction flex-wrap 的简写
   > row nowrap
4. `justify-content` 项目在主轴上的对齐方式
   > flex-start、flex-end、center 、space-between、space-around
5. `align-items` 项目在交叉轴上的对齐方式
   > stretch、flex-start、flex-end、center、baseline（项目的第一行文字的基线对齐）
6. `align-content` 多根轴线的对齐方式
   > stretch、flex-start、flex-end、center 、space-between、space-around

### 项目 Item

1. `order` 数值越小，排列越靠前
   > 0
2. `flex-grow` 项目的放大比例，默认为 0 不放大
   > 0
3. `flex-shrink` 项目的缩小比例，默认为 1 将缩小
   > 1
4. `flex-basis` 项目占据的固定主轴空间（main size）
   > auto（子元素初始大小由其内容决定）、xpx（子元素的初始大小）、x%（子元素相对于父容器的百分比）
   > min-width > || max-width > width > Content Size
5. `flex` flex-grow flex-shrink? flex-basis?的简写
   > - auto (1 1 auto)
   > - none (0 0 auto)
   > - 1 (1 1 0%)
   > - 0 (0 0 0%)
   >   | flex:1 | flex:auto |
   >   | ------ | ------ |
   >   | 不管内容多少，一般都是平分空间，空间大小都一致 | 是根据内容的大小来分，不是平的（除非内容都是一样，才平分） |
6. `align-self` 可覆盖 align-items 属性
   > auto（继承父默认值）、stretch（没有父默认值则为此）、flex-start、flex-end、center、baseline

![felx](https://imgur.com/LO33kBH.jpg)
