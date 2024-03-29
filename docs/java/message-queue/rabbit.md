---
title: RabbitMQ知识点总结
category: 消息中间件
tag:
  - RabbitMQ
---

# RabbitMQ

[参考](https://blog.csdn.net/m0_48795607/article/details/116064045?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164991493616781685330068%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164991493616781685330068&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-116064045.142^v7^control,157^v4^control&utm_term=RabbitMQ+%E9%9D%A2%E8%AF%95&spm=1018.2226.3001.4187)

## 如何避免消息堆积？

消息堆积问题产生的原因往往是因为消息发送的速度超过了消费者消息处理的速度。

### 解决方案

无外乎以下三点：

- 提高消费者处理速度
- 增加更多消费者
- 增加队列消息存储上限

### 1、提高消费者处理速度

消费者处理速度是由业务代码决定的，所以我们能做的事情包括：

- 尽可能优化业务代码，提高业务性能
- 接收到消息后，开启线程池，并发处理多个消息

优点：成本低，改改代码即可

缺点：开启线程池会带来额外的性能开销，对于高频、低时延的任务不合适。推荐任务执行周期较长的业务。

### 2、增加更多消费者

一个队列绑定多个消费者，共同争抢任务，自然可以提供消息处理的速度。

优点：能用钱解决的问题都不是问题。实现简单粗暴

缺点：问题是没有钱。成本太高

### 3、增加队列消息存储上限

在 RabbitMQ 的 1.8 版本后，加入了新的队列模式：Lazy Queue

这种队列不会将消息保存在内存中，而是在收到消息后直接写入磁盘中，理论上没有存储上限。可以解决消息堆积问题。

优点：磁盘存储更安全；存储无上限；避免内存存储带来问题，性能更稳定；

缺点：磁盘存储受到 IO 性能的限制，消息时效性不如内存模式，但影响不大。

## RabbitMQ 如何保证消息的有序性？

`RabbitMQ`是队列存储，天然具备先进先出的特点，只要消息的发送是有序的，那么理论上接收也是有序的。不过当一个队列绑定了多个消费者时，可能出现消息轮询投递给消费者的情况，而消费者的处理顺序就无法保证了。

### 解决方案

因此，要保证消息的有序性，需要做的下面几点：

- 保证消息发送的有序性
- 保证一组有序的消息都发送到同一个队列
- 保证一个队列只包含一个消费者

## 如何防止 MQ 消息被重复消费？

### 概念

消息重复消费的原因多种多样，不可避免。所以只能从消费者端入手，只要能保证消息处理的幂等性就可以确保消息不被重复消费。

### 解决方案

而幂等性的保证又有很多方案：

- 给每一条消息都添加一个唯一 id，在本地记录消息表及消息状态，处理消息时基于数据库表的 ID 唯一性做判断
- 同样是记录消息表，利用消息状态字段实现基于乐观锁的判断，保证幂等
- 基于业务本身的幂等性。比如根据 ID 的删除、查询业务天生幂等；新增、修改等业务可以考虑基于数据库 ID 唯一性、或者乐观锁机制确保幂等。本质与消息表方案类似。

## 如何保证 RabbitMQ 的高可用？

### 概念

要实现 RabbitMQ 的高可用无外乎下面两点：

### 解决方案

- 做好交换机、队列、消息的持久化
- 搭建 RabbitMQ 的镜像集群，做好主从备份。当然也可以使用仲裁队列代替镜像集群。

## 使用 MQ 可以解决那些问题？

RabbitMQ 能解决的问题很多，例如：

- 解耦合：将几个业务关联的微服务调用修改为基于 MQ 的异步通知，可以解除微服务之间的业务耦合。同时还提高了业务性能。
- 流量削峰：将突发的业务请求放入 MQ 中，作为缓冲区。后端的业务根据自己的处理能力从 MQ 中获取消息，逐个处理任务。流量曲线变的平滑很多
- 延迟队列：基于 RabbitMQ 的死信队列或者 DelayExchange 插件，可以实现消息发送后，延迟接收的效果。

业务模块中使用的 RabbitMQ

kafka 是以吞吐量高而闻名，不过其数据稳定性一般，而且无法`保证消息有序性`。我们公司的日志收集也有使用，

阿里巴巴的 RocketMQ 基于 Kafka 的原理，弥补了 Kafka 的缺点，继承了其高吞吐的优势，其客户端目前以 Java 为主。

RabbitMQ 基于面向并发的语言 Erlang 开发，吞吐量不如 Kafka，消息可靠性较好，并且消息延迟极低，集群搭建比较方便。

支持多种协议，并且有各种语言的客户端，比较灵活。

Spring 对 RabbitMQ 的支持也比较好，使用起来比较方便

综合考虑并发需求以及稳定性需求，RabbitMQ 和 kafka

## RabbitMQ 如何确保消息的不丢失

RabbitMQ 针对消息传递过程中可能发生问题的各个地方，给出了针对性的解决方案：

### 生产者发送消息时可能因为网络问题导致消息没有到达交换机

RabbitMQ 提供了 publisher confirm 机制

生产者发送消息后，可以编写 ConfirmCallback 函数

消息成功到达交换机后，RabbitMQ 会调用 ConfirmCallback 通知消息的发送者，返回 ACK

消息如果未到达交换机，RabbitMQ 也会调用 ConfirmCallback 通知消息的发送者，返回 NACK

消息超时未发送成功也会抛出异常

消息到达交换机后，如果未能到达队列，也会导致消息丢失：

RabbitMQ 提供了 publisher return 机制

生产者可以定义 ReturnCallback 函数

消息到达交换机，未到达队列，RabbitMQ 会调用 ReturnCallback 通知发送者，告知失败原因

### 消息到达队列后，MQ 宕机也可能导致丢失消息

RabbitMQ 提供了持久化功能，集群的主从备份功能

消息持久化，RabbitMQ 会将交换机、队列、消息持久化到磁盘，宕机重启可以恢复消息

镜像集群，仲裁队列，都可以提供主从备份功能，主节点宕机，从节点会自动切换为主，数据依然在

> 仲裁队列概念()
>
> 开启第一个应用是消息发布者，第二个应用是消息的订阅者，第三个应用将在时间到时关闭 RabbitMQ 节点，模拟故障宕机。
>
> 开启消息发布，会看到发布者正在发布，订阅者正在订阅。消息从仲裁队列按顺序到达。然后关闭 RabbitMQ 三个节点中一个，但是处理过程中没有暂停，并且 Spring Boot 应用程序保持按顺序发送和接收数据。仲裁队列有了新的领导者，并且三个集群成员中只有两个处于联机状态。
>
> 再次启动已停止的节点，发现它迅速重新加入群集并再次开始参与仲裁队列。

### 消息投递给消费者后，如果消费者处理不当，也可能导致消息丢失

SpringAMQP 基于 RabbitMQ 提供了消费者确认机制、消费者重试机制，消费者失败处理策略：

1、消费者的确认机制：

消费者处理消息成功，未出现异常时，Spring 返回 ACK 给 RabbitMQ，消息才被移除

消费者处理消息失败，抛出异常，宕机，Spring 返回 NACK 或者不返回结果，消息不被异常

2、消费者重试机制：

默认情况下，消费者处理失败时，消息会再次回到 MQ 队列，然后投递给其它消费者。Spring 提供的消费者重试机制，则是在处理失败后不返回 NACK，而是直接在消费者本地重试。多次重试都失败后，则按照消费者失败处理策略来处理消息。避免了消息频繁入队带来的额外压力。

3、消费者失败策略：

当消费者多次本地重试失败时，消息默认会丢弃。

Spring 提供了 Republish 策略，在多次重试都失败，耗尽重试次数后，将消息重新投递给指定的异常交换机，并且会携带上异常栈信息，帮助定位问题。
