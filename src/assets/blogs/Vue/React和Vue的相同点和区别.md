### 相同点

1. 组件化的思想
2. Vitural DOM
3. 数据驱动

### 区别

| 要点        | Vue                                            | React                                           |
| ----------- | ---------------------------------------------- | ----------------------------------------------- |
| 学习曲线    | 渐进式、声明式语法                             | JSX                                             |
| 适用场景    | 快速小型原型开发                               | 大型、复杂、高自定义项目                        |
| 组件化      | 单文件单组件                                   | 样式分离                                        |
| 数据流      | 双向数据流                                     | 单向数据流                                      |
| 状态管理    | Vuex(Action、Mutation、State)、Pinia           | Redux(Action、Reducer、State)                   |
| 组件通信    | props/emit、provide/inject、event bus(emit/on) | props/回调函数、provider/consumer、context      |
| 组件嵌套    | slot                                           | props.children                                  |
| Css 隔离    | scoped、module                                 | module、CSS-in-JS                               |
| 路由        | Vue-router                                     | React-router                                    |
| Diff 算法   | 双指针从两头往中间遍历，边对比边调用 Patch     | 单指针从左往右遍历形成 Effect List 最后统一更新 |
| native 方案 | weex                                           | React Native                                    |
