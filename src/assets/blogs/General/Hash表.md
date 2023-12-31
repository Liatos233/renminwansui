### 哈希表（Hash Table），

- 一种用于`快速存储和检索数据`的数据结构
- 基于键（Key）和值（Value）之间的映射关系，通过哈希函数将键映射到散列表的特定位置（哈希函数）
- 平均情况下，在 `O(1)`时间内完成查找、插入和删除数据；如果出现哈希冲突则会导致性能下降
- 优秀的哈希函数应该`尽可能均匀地`将键映射到不同的索引，以减少哈希冲突的概率
- 解决哈希冲突的方法：
  1. 链式哈希：使用数组和链表存储具有多个同哈希值的键值对
  2. 开放寻址：当发生冲突时，寻找其他可用位置
