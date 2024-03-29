---
title: dubbo知识点总结
icon: dubbo
---

## Dubbo

## 协议

Dubbo:单一长连接和NIO异步通讯，适合大并发小数据量的服务调用，以及消费者远大于提供者。传输协议`TCP`，异步，`Hessian`序列化;

Rmi:采用JDK标准的rmi协议实现，传输参数和返回参数对象需要实现Serializable接口，使用java标准序列化机制，使用阻塞式短连接，传输数据包大小混合，消费者和提供者个数差不多，可传文件，传输协议TCP。多个短连接，TCP协议传输，同步传输，适用常规的远程服务调用和rmi互操作。在依赖低版本的Common-Collections包，java序列化存在安全漏洞;

Webservice:基于WebService的远程调用协议，集成CXF实现，提供和原生WebService的互操作。多个短连接，基于HTTP传输，同步传输，适用系统集成和跨语言调用;

Http:基于Http表单提交的远程调用协议，使用Spring的HttpInvoke实现。多个短连接，传输协议HTTP，传入参数大小混合，提供者个数多于消费者，需要给应用程序和浏览器JS调用;

Hessian:集成Hessian服务，基于HTTP通讯，采用Servlet暴露服务，Dubbo内嵌Jetty作为服务器时默认实现，提供与Hession服务互操作。多个短连接，同步HTTP传输，Hessian序列化，传入参数较大，提供者大于消费者，提供者压力较大，可传文件;

Memcache:基于memcached实现的RPC协议

Redis:基于redis实现的RPC协议

## Dubbo 超时时间

遵循靠近原则：

1. 方法配置 > 接口类 > 全局配置  
2. 消费者 > 提供者

优先级为：消费者`Method` > 提供者`method` > 消费者`Reference` > 提供者`Service` > 消费者全局配置`provider` > 提供者全局配置`consumer`。

Dubbo 超时时间设置有两种方式:

官方推荐在提供者端设置超时时间，因为服务提供者比消费者更清楚自己提供的服务特性。

服务消费者端设置超时时间，如果在消费者端设置了超时时间，以消费者端为主，即优先级更高。

因为服务调用方设置超时时间控制性更灵活。如果消费方超时，服务端线程不会定制，会产生警告。

## 注册中心

Zookeeper 注册中心:

基于分布式协调系统 Zookeeper 实现，采用 Zookeeper 的 watch 机制实现数据变更;

## Dubbo 和 Spring Cloud

Dubbo 是 SOA 时代的产物，它的关注点主要在于服务的调用，流 量分发、流量监控和熔断。而 Spring Cloud 诞生于微服务架构时 代，考虑的是微服务治理的方方面面，另外由于依托了 Spirng、 Spirng Boot 的优势之上，两个框架在开始目标就不一致，Dubbo 定位服务治理、

Spirng Cloud 是一个生态。

最大的区别:Dubbo 底层是使用 `Netty` 这样的 `NIO` 框架，是基于 TCP 协议传输的，配合以 Hession 序列化完成 RPC 通信。

## 负载均衡策略

Dubbo提供了4中负载均衡策略

### ① Random LoadBalance（随机均衡算法）

随机，按权重设置随机概率。

在一个截面上碰撞的概率高，但调用量越大分布越均匀，而且按概率使用权重后也比较均匀，有利于动态调整提供者权重。

### ② RoundRobin LoadBalance（权重轮询均衡算法）

轮询，按公约后的权重设置轮询比率。

存在慢的提供者累积请求的问题，比如：第二台机器很慢，但没挂，当请求调用第二台时就卡在那里，久而久之，所有请求都卡在第二台机器上。

Round Robin轮询算法，是按照公约后的权重设置轮询比率，即权重轮询算法（Weighted Round-Robin），它是基于轮询算法改进而来的

轮询调度算法的原理是：每一次把来自用户的请求轮流分配给内部中的服务器。如从1开始，一直到N（其中N是内部服务器的总个数），然后重新开始循环。

该算法的优点：

简洁，无需记录当前所有连接的状态，所以它是一种无状态调度。

缺点：

轮询调度算法假设所有服务器的处理性能都相同，不关心每台服务器的当前连接数和相应速度。当请求服务间隔时间变化比较大时，轮询调度算法容易导致服务器间的负载不平衡。

### ③ LeastAction LoadBalance（最少活跃调用数均衡算法）

最少活跃调用数，相同活跃数的随机，活跃数指调用前后计数差。

使慢的提供者收到更少请求，因为越慢的提供者的调用前后技术差会越大。

### ④ ConsistentHash LoadBalance（一致性Hash均衡算法）

一致性hash，相同参数的请求总是发送到同一提供者

当某一台提供者挂时，原本发往该提供者的请求，基于虚拟节点，平摊到其他提供者，不会引起剧烈变动弄。

一致性hash算法可以解决服务提供者的增加、移除及挂掉时的情况，能尽可能小的改变已存在key的映射关系，尽可能的满足单调性的要求。

一致性hash通过构建虚拟节点，能尽可能避免分配失衡，具有很好的平衡性。

以下示例假设对象（Object）就相当于Client发的请求，cache相当于服务提供者。

环形hash空间

考虑通常的hash算法都是将value映射到一个32位的key值，也即是0~2^32-1次方的数值空间。可以将这个空间想象成一个首（0）尾(2^32-1)相接的圆环，如：

::: info 总结

一致性hash，相同参数的请求总是发送到同一提供者

当某一台提供者挂时，原本发往该提供者的请求，基于虚拟节点，平摊到其他提供者，不会引起剧烈变动弄。

一致性hash算法可以解决服务提供者的增加、移除及挂掉时的情况，能尽可能小的改变已存在key的映射关系，尽可能的满足单调性的要求。

一致性hash通过构建虚拟节点，能尽可能避免分配失衡，具有很好的平衡性。

以下示例假设对象（Object）就相当于Client发的请求，cache相当于服务提供者。

环形hash空间

考虑通常的hash算法都是将value映射到一个32位的key值，也即是0~2^32-1次方的数值空间。可以将这个空间想象成一个首（0）尾(2^32-1)相接的圆环，如：

:::
