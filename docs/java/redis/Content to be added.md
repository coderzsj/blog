---
title: redislock
category: redis
tag:
  - redis lock
---

### redis 分布式锁依赖于 redis，如果 redis 宕机则锁失效。如何解决？

可以做搭建主从集群，做数据备份。

但如果搭建主从集群做数据备份时，进程 A 获取锁，master 还没有把数据备份到 slave，master 宕机，slave 升级为 master，此时原来锁失效，其它进程也可以获取锁，出现安全问题。如何解决？

关于这个问题，Redis 官网给出了解决方案，使用 RedLock 思路可以解决：

在 Redis 的分布式环境中，我们假设有 N 个 Redis master。

这些节点完全互相独立，不存在主从复制或者其他集群协调机制。

之前我们已经描述了在 Redis 单实例下怎么安全地获取和释放锁。

我们确保将在每（N)个实例上使用此方法获取和释放锁。

在这个样例中，我们假设有 5 个 Redis master 节点，这是一个比较合理的设置，所以我们需要在 5 台机器上面或者 5 台虚拟机上面运行这些实例，

这样保证他们不会同时都宕掉。

为了取到锁，客户端应该执行以下操作:

1、获取当前 Unix 时间，以毫秒为单位。

2、依次尝试从 N 个实例，使用相同的 key 和随机值获取锁。在步骤 2，当向 Redis 设置锁时,客户端应该设置一个网络连接和响应超时时间，这个超时时间应该小于锁的失效时间。例如你的锁自动失效时间为 10 秒，则超时时间应该在 5-50 毫秒之间。这样可以避免服务器端 Redis 已经挂掉的情况下，客户端还在死死地等待响应结果。如果服务器端没有在规定时间内响应，客户端应该尽快尝试另外一个 Redis 实例。

3、客户端使用当前时间减去开始获取锁时间(步骤 1 记录的时间)就得到获取锁使用的时间。当且仅当从大多数(这里是 3 个节点)的 Redis 节点都取到锁，并且使用的时间小于锁失效时间时，锁才算获取成功。

5、如果取到了锁，key 的真正有效时间等于有效时间减去获取锁所使用的时间(步骤 3 计算的结果)。
6、如果因为某些原因，获取锁失败（*没有*在至少 N/2+1 个 Redis 实例取到锁或者取锁时间已经超过了有效时间），客户端应该在所有的 Redis 实例上进行解锁(即便某些 Redis 实例根本就没有加锁成功)。