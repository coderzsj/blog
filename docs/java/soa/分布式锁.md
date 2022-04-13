# 为什么分布式要有分布式锁！

目前网上大部分的基于ZOOKEEPER，和REDIS的分布式锁的文章都不够全面。要么就是特意避开集群的情况，要么就是考虑不全，堵着看着还是一脸迷茫。坦白说，这种老题材，很难写出新创意，博主内心战战兢兢，如履薄冰，文中有什么不严谨之处，欢迎批评。

博主的这篇文章，不上代码，只讲分析。

1、在REDIS方面，有开源REDISSION的JAR包供你使用。
2、在ZOOKEEPER方面，有开源的CURATOR的JAR包供你使用。

因为已经有开源JAR供你使用，没有必要去自己封装一个，大家出门百度一个API即可，不需要再罗列一堆实现代码。

需要说明的是，Google有一个名为CHUBBY的粗粒度分布式锁的服务，然而，Google chubb并不是开源的，我们只能通过其论文和其他相关的文档中了解具体的细节。值得庆幸的是，YAHOO！借鉴CHUBBY的设计思想开发了ZOOKEEPER，并将其开源，因此本文不讨论CHUBBY。至于TAIR，是阿里开源的一个分布式KV存储方案。我们在工作中基本上REDIS是用的比较多，讨论TAIR所实现的分布式锁，不具有代表性。

因此，主要分析的还是REDIS和ZOOKEEPER所实现的分布式锁。

文档的目录结构如下：

1、为什么使用分布式锁
2、单机情形比较。
3、集群情形比较；
4、锁的其它特性比较；

为什么使用分布式锁？

使用分布式锁的目的，无外乎就是保证同一时间只有一个客户端可以对共享资源进行操作。

但是MARTIN指出，根据锁的用途还可以细分为以下两类：

1、允许多个客户端操作共享资源

这种情况下，对共享资源的操作一定是幂等性操作，无论你操作多少次都不会出现不同结果。在这里使用锁，无外乎就是避免重复操作共享资源从而提高效率。

2、 只允许一个客户端操作共享资源

这种情况下，对共享资源的操作一般是非幂等性操作。在这种情况下，如果出现多个客户端操作共享资源，就可能意味着数据不一致，数据丢失。

## 第一回合，单机情形比较

1、redis

先说加锁，根据REDIS官网文档的描述，是所有下面的命令加锁：

```bash
set resource_name my_random_value NX PX 30000
```

- my_random_value是由客户端生成的一个随机字符串，相当于客户端持有锁的标志
- NX表示只有当resource_name对应的KEY值不存在的时候才能SET成功，相当于只有第一个请求的客户端才能获得锁
- PX 30000表示这个锁有一个三十秒的自动过期时间。

至于解锁，为了防止客户端A获得的锁被客户端B释放，采用下面的LUA脚本来释放锁

```java
if redis.call("get",KEY[1] == ARGV[1] then
        return redis.call("del",KEYS[1])
    )
else
    return 0
end
```

在执行这段LUA脚本的时候，KEYS[1]的值为resource_name，ARGV[1]的值为my_random_value。原理就是先获取所对应的VALUE值，保证和客户端穿进去的my_random_value值相等，这样就能避免自己的所被其他人释放。另外，采取LUA脚本操作保证了原子性。

过期时间如果设置。如果客户端在操作共享资源的过程中，因为长期阻塞的原因，导致锁过期，那么接下来访问共享资源就不安全。

可是，有的人会说

>那可以在客户端操作完共享资源后，判断锁是否依然归该客户端所有，如果依然归客户端所有，则提交资源，释放锁。若不归客户端所有，则不提交资源。
> 

这么做，只能降低多个客户端操作共享资源发生的概率，并不能解决问题

## 第二回合，集群情形比较：

我们在生产中，一般都是用集群情形，所以第一回合讨论的单机情形。算是给大家热热身。

1、Redis

为了Redis的高可用，一般都会给REDIS的节点挂一个SLAVE，然后采用哨兵模式进行主备切换。但由于REDIS的主从复制是异步的，这可能会出现在数据同步过程中，master宕机，slave来不及同步数据就被选为MASTER，从而数据丢失。具体流程如下所示：

1. 客户端A从MASTER获取了锁。
2. MASTER宕机了，存储锁的KEY还没有来得及同步到SLAVE上。
3. SLAVE升级为MASTER。
4. 客户端B从新的MASTER获取到了对应的同一个资源的锁

为了应对这个情形，REDIS的作者antirez提出了REDLOCK算法，步骤如下：

假设我们有N个MASTER节点

1. 获取当前时间（单位是毫秒）。
2. 轮流用相同的KEY和随机值在N个节点上清求索，在这一步里，客户端在每个master上请求锁时，会有一个和总得锁释放时间相比小得多的超时时间。比如如果锁自动释放时间是十秒钟，那每个节点所请求的超时时间可能是5~50毫秒的范围，这个可以防止一个客户端在某个宕掉的MASTER节点上阻塞过长时间，如果一个MASTER节点不可用了，我们应该尽快尝试下一个MASTER节点。
3. 客户端计算第二步中获取锁所花的时间，只有当客户端在大多数MASTER节点上成功获取了锁（在这里是三个），而且总共消耗的时间不超过锁释放时间，这个锁就认为是获取成功了。


## Redis 实现分布式锁

分布式锁要满足的条件：

- 多进程互斥：同一时刻，只有一个进程可以获取锁
- 保证锁可以释放：任务结束或出现异常，锁一定要释放，避免死锁
- 阻塞锁(可选)：获取锁失败时可否重试
- 重入锁(可选)：获取锁的代码递归调用时，依然可以获取锁

### 最基本的分布式锁

利用 Redis 的 setnx 命令，这个命令的特征时如果多次执行，只有第一次执行会成功，可以实现`互斥`的效果。为了保证服务宕机时也可以释放锁，同时需要利用 expire 命令给锁设置一个有效期

```
setnx lock thread-01 # 尝试获取锁
expire lock 10 # 设置有效期
```

### 释放锁的时候，保证持有锁的线程释放锁

在锁中存储当前进程和线程标识，释放锁时对锁的标识判断，如果是自己的则删除，不是则放弃操作。

但是这两步操作要保证原子性，需要通过 Lua 脚本来实现。

```
if redis.call("get",KEYS[1]) == ARGV[1] then
    redis.call("del",KEYS[1])
end
```

### 可重入分布式锁

如果有重入的需求，则除了在锁中记录进程标识，还要记录重试次数，流程如下：

下面我们假设锁的 key 为“`lock`”，hashKey 是当前线程的 id：“`threadId`”，锁自动释放时间假设为 20

获取锁的步骤：

- 1、判断 lock 是否存在 `EXISTS lock`
    - 存在，说明有人获取锁了，下面判断是不是自己的锁
    - 判断当前线程 ID 作为 hashKey 是否存在：`HEXISTS lock threadId`
    - 不存在，说明锁已经有了，且不是自己获取的，锁获取失败，end
    - 存在，说明是自己获取的锁，重入次数+1：`HINCRBY lock threadId 1`，去到步骤 3
- 2、不存在，说明可以获取锁，`HSET key threadId 1`
- 3、设置锁自动释放时间，`EXPIRE lock 20`

释放锁的步骤：

- 1、判断当前线程 ID 作为 hashKey 是否存在：`HEXISTS lock threadId`
    - 不存在，说明锁已经失效，不用管了
    - 存在，说明锁还在，重入次数减 1：`HINCRBY lock threadId -1`，获取新的重入次数
- 2、判断重入次数是否为 0：
    - 为 0，说明锁全部释放，删除 key：`DEL lock`
    - 大于 0，说明锁还在使用，重置有效时间：`EXPIRE lock 20`

对应的 Lua 脚本如下：

首先是获取锁：

```lua
local key = KEYS[1]; -- 锁的key
local threadId = ARGV[1]; -- 线程唯一标识
local releaseTime = ARGV[2]; -- 锁的自动释放时间

if(redis.call('exists', key) == 0) then -- 判断是否存在
 redis.call('hset', key, threadId, '1'); -- 不存在, 获取锁
 redis.call('expire', key, releaseTime); -- 设置有效期
 return 1; -- 返回结果
end;

if(redis.call('hexists', key, threadId) == 1) then -- 锁已经存在，判断threadId是否是自己
 redis.call('hincrby', key, threadId, '1'); -- 不存在, 获取锁，重入次数+1
 redis.call('expire', key, releaseTime); -- 设置有效期
 return 1; -- 返回结果
end;
return 0; -- 代码走到这里,说明获取锁的不是自己，获取锁失败
```

然后是释放锁：

```lua
local key = KEYS[1]; -- 锁的key
local threadId = ARGV[1]; -- 线程唯一标识
local releaseTime = ARGV[2]; -- 锁的自动释放时间

if (redis.call('HEXISTS', key, threadId) == 0) then -- 判断当前锁是否还是被自己持有
    return nil; -- 如果已经不是自己，则直接返回
end;
local count = redis.call('HINCRBY', key, threadId, -1); -- 是自己的锁，则重入次数-1

if (count > 0) then -- 判断是否重入次数是否已经为0
    redis.call('EXPIRE', key, releaseTime); -- 大于0说明不能释放锁，重置有效期然后返回
    return nil;
else
    redis.call('DEL', key); -- 等于0说明可以释放锁，直接删除
    return nil;
end;
```


