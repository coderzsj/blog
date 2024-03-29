---
title: b-tree和b+tree的详细解释
icon: tree
category: 数据结构
  - mysql
---

## B树、B+树详解

B-树是一种多路自平衡的搜索树（B树是一颗多路平衡查找树），它类似普通的平衡二叉树，不同的一点是B-树允许每个节点有更多的子节点。下图是 B-树的简化图.

[](./img/b树.png)

B-树有如下特点:

1. 所有键值分布在整颗树中（索引值和具体data都在每个节点里）；
2. 任何一个关键字出现且只出现在一个结点中；
3. 搜索有可能在非叶子结点结束（最好情况O(1)就能找到数据）；
4. 在关键字全集内做一次查找,性能逼近二分查找

B-树是一类树，包括B-树、B+树、B*树等，是一棵自平衡的搜索树，它类似普通的平衡二叉树，不同的一点是B-树允许每个节点有更多的子节点。

B-树是专门为外部存储器设计的，如磁盘，它对于读取和写入大块数据有良好的性能，所以一般被用在文件系统及数据库中。

定义只需要知道B-树允许每个节点有更多的子节点即可（多叉树）。子节点数量一般在上千，具体数量依赖外部存储器的特性。

### 出现背景

先来看看为什么会出现B-树这类数据结构。

传统用来搜索的平衡二叉树有很多，如 AVL 树，红黑树等。这些树在一般情况下查询性能非常好，但当数据非常大的时候它们就无能为力了。

原因当数据量非常大时，内存不够用，大部分数据只能存放在磁盘上，只有需要的数据才加载到内存中。一般而言内存访问的时间约为 50 ns，而磁盘在 10 ms 左右。速度相差了近 5 个数量级，磁盘读取时间远远超过了数据在内存中比较的时间。

这说明程序大部分时间会阻塞在磁盘IO上。那么我们如何提高程序性能？

减少磁盘 IO 次数，像 AVL 树，红黑树这类平衡二叉树从设计上无法“迎合”磁盘。

::: info

在磁盘中组织查找结构，从任何一个结点指向其他结点都有可能读取一次磁盘数据，再将数据写入内存进行比较。频繁的磁盘IO操作，效率是很低下的(机械运动比电子运动要慢不知道多少)。显而易见，所有的二叉树的查找结构在磁盘中都是低效的。

:::

## B+树

B+树 是 B-树的一种变体，在 磁盘查找结构中，B + 树更适合文件系统的磁盘存储结构。

B-树 是 平衡多路查找树，所有结点 中 都 包含了 待查关键字的有效信息 (比如文件磁盘指针)。每 个 结点 若有 n 个关键字，则有n+1个指向其他结点的指针。

### B+树特征

1. 有m个子树的中间节点包含有m个元素（B树中是k-1个元素），每个元素不保存数据，只用来索引；
2. 所有的叶子结点中包含了全部关键字的信息，及指向含有这些关键字记录的指针，且叶子结点本身依关键字的大小自小而大的顺序链接。 (而B 树的叶子节点并没有包括全部需要查找的信息)；
3. 所有的非叶子结点可以看成是索引部分，结点中仅含有其子树根结点中最大（或最小）关键字。 (而B 树的非终节点也包含需要查找的有效信息)；

### 为什么说B+树比B树更适合数据库索引？

1. 磁盘读写代价更低，在相同数量的待查数据下，B+树查找过程中需要调用的磁盘IO操作要少于普通B-树。由于B+树所在的磁盘存储背景下，因此B+树的查找性能要好于B-树。
2. B+树的查找效率更加稳定，因为所有叶子结点都处于同一层中，而且查找所有关键字都必须走完从根结点到叶子结点的全部历程。因此同一颗B+树中，任何关键字的查找比较次数都是一样的。而B树就不一定了，可能查找到某一个非终结点就结束了。
3. B+树便于范围查询（数据库的常态），B树在提高了IO性能的同时并没有解决元素遍历的我效率低下的问题，正是为了解决这个问题，B+树应用而生。B+树只需要去遍历叶子节点就可以实现整棵树的遍历。而且在数据库中基于范围的查询是非常频繁的，而B树不支持这样的操作或者说效率太低；

插入删除对比：B+树与B-树在插入删除操作中的效率是差不多的。

::: info 总体评价
在应用背景下，特别是文件结构存储中。B+树的应用要更多，其效率也要比B-树好。

B树的范围查找用的是中序遍历，而B+树用的是在链表上遍历；
:::

参考

[漫画：什么是B+树？](https://zhuanlan.zhihu.com/p/54102723)
