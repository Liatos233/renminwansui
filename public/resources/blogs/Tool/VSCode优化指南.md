## 1 常用快捷键

### 1.1 立即重命名

选中变量按 <kbd>F2</kbd>

### 1.2 横向滚动

按住 <kbd>Shift</kbd> 滑动鼠标滚轮

### 1.3 快速搜索文件并跳转

<kbd>ctrl</kbd> + <kbd>p</kbd>

### 1.4 添加多处光标

<kbd>alt</kbd> + <kbd>鼠标左键</kbd>

### 1.5 选择相同开始和结束的区域

<kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>鼠标选择</kbd>

### 1.6 将当前行或者选中的区域上移/下移一行

<kbd>alt</kbd> + <kbd>上键或下键</kbd>

## 2 根目录显示优化

```json
"explorer.experimental.fileNesting.enabled": true,
"explorer.experimental.fileNesting.expand": false,
"explorer.experimental.fileNesting.patterns": {
    // Append as many as you want
    // The keys are the parents and the values are the nested files.
    "package.json": ".gitignore, .parcelrc, .prettierc ...",
    "README.md": "CHANGELOG.md, LICENCE"
}
```

## 3 双引号彩色化

```json
"editor.bracketPairColorization.enabled": true,
"editor.guides.bracketPairs":"active",
```

## 4 自动导入

```json
"javascript.suggest.autoImports": true,
"javascript.updateImportsOnFileMove.enabled": "always",
"typescript.suggest.autoImports": true,
"typescript.updateImportsOnFileMove.enabled": "always"
```

## 5 自动关闭和重命名 HTML 标签

```json
"editor.linkedEditing": true,
"html.autoClosingTags": true,
"javascript.autoClosingTags": true,
"typescript.autoClosingTags": true,
```

## 6 定义可折叠的代码段

```js
//#region Description
function foo() {}
//#endregion
```
