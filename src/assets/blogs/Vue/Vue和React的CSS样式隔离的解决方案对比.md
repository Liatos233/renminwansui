### Vue 解决方案

#### 1 scope 标签

- 限制了样式的作用域，使其只对当前组件生效，阻止上层样式传递到下层
- 借助 `postcss-modules` 插件实现
- Vue 组件编译时，会将样式名转换成`className[data-v-67e6b31f]`的格式
- 不需要修改 template，使用更为简便
- 深度作用：如果需要某个样式作用更深，影响到子组件，可以使用 `>>>` 或者 `/deep/` 操作符

#### 2 module 标签

- CSS 样式与组件进行模块化绑定
- 使用 `postcss-modules` 或 `css-loader` 插件中的 modules 选项
- 会将样式名转换成`fileName_className_3b0wc`的格式
- 需要使用`$sytle.className`的方式在 template 中定义 className
- 由于命名规则，更适合于大型项目下快速查找定位
- 可以导出定义的变量，将变量归入$style 中，并能直接传入子组件中，控制更为灵活

### React 解决方案

#### 1 CSS Modules

- 使用 `css-loader` 插件中来启用 CSS Modules
- 使用`{styles.className}`在 html 中定义样式
- 编译后样式会被转换成`className--rHyPQc`的格式

#### 2 CSS-in-JS

- 将组件的样式直接嵌入到 JavaScript 中
- 例如使用`styled-components`库

#### 3 Tailwind CSS
