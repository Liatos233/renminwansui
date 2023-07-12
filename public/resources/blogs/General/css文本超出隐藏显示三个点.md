一、单行文本

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

二、多行文本

```css
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
line-clamp: 3;
-webkit-box-orient: vertical;
```
