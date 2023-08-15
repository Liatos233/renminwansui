#### 图解

##### vue2 生命周期

![vue2生命周期](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/695886110ed7476781fa021829dcc513~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

##### vue3 生命周期

![vue3生命周期](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)

##### Vue2 到 Vue3 生命周期变化

![Vue2 到 Vue3 生命周期变化](https://imgur.com/TEduOpn.png)

#### 父组件和子组件生命周期的执行顺序

```bash
Father beforecreate
Father created
  Son beforecreate
  Son created
  Son mounted
Father mounted

Father beforeUpdate
  Son beforeUpdate
  Son updated
Father updated

Father beforeDestroy
  Son beforeDestroy
  Son destoryed
Father destoryed
```
