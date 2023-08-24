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

## 7 插件

1. Volar

- vue 开发必备

2. Auto Import

- 自动识别导入依赖

3. ChatGPT GPT-4

- ChatGPT 支持

4. Code Translate

- 代码 hover 翻译

5. Codeium

- AI 代码生成解释注释重构

6. ES7+ React/Redux

- React 开发必备

7. Eslint

- 代码规范约束

8. file-jump

- ctrl 单击文件跳转

9. Git Graph

- git 提交记录路径可视化

10. IntelliCode

- AI 代码编写辅助

11. Material Icon Theme

- Material 风格主题

12. Prettier

- 代码风格统一

13. Pretty TypeScript Errors

- 更易读的 ts 错误

14. Tabnine

- AI 工具

15. Path Intellisense

- 路径补全

16. Image preview

- 图片预览

17. Color Identifiers

- Syntax highlighter that gives each identifier a different color

18. Code Spell Checker

- A basic spell checker that works well with code and documents.

19. Anyrule

- 常用正则大全

20. regex previewer

- 正则校验测试
