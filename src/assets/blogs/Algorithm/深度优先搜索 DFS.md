### 思想

- 一种用于遍历或搜索树或图的算法。`尽可能深`地搜索树的分支。当结点 v 的所在边都己被探寻过，搜索将`回溯`到发现结点 v 的那条边的起始结点

### 固定格式

```js
function dfs(node) {
  // 如果节点为空或已访问过，直接返回
  if (!node || node.visited) {
    return;
  }
  // 标记当前节点为已访问
  node.visited = true;
  // 处理当前节点，例如打印当前节点值
  console.log(node.val);
  // 遍历当前节点的邻居节点
  for (let neighbor of node.neighbors) {
    // 递归调用DFS，处理邻居节点
    dfs(neighbor);
  }
}
```
