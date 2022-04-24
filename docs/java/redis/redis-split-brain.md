---
title: redis脑裂
category: redis
---

## 什么是redis脑裂

下面我们解释一下什么是redis脑裂：

关于reids集群会由于网络等原因出现脑裂的情况，所谓的集群脑裂就是，

由于redis master节点和redis salve节点和sentinel处于不同的网络分区，使得sentinel没有能够心跳感知到master，所以通过选举的方式提升了一个salve为master，这样就存在了两个master，就像大脑分裂了一样，这样会导致客户端还在old master那里写入数据，新节点无法同步数据，当网络恢复后，sentinel会将old master降为salve，这时再从新master同步数据，这会导致大量数据丢失。

CAP定理中的P指的就是网络分区 ，当不同节点分布在不同的子网络中时，在内部子网络正常的情况下，由于某些原因导致这些子节点之间出现网络不通的情况，导致整个系统环境被切分成若干个独立的区域，就形成了网络分区，然后就需要在C(一致性)，A(可用性)之间做权衡了。

