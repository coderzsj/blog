---
title: spring-cloud生产者集群版构建
---

需要换成生产者的服务名称就行了，如下图：

你看得见爱在满红殆尽的燃烧着吗

1. 注册中心：`eureka`(属于Netflix,2.x版本不在开源，1.x版本让在更新)
2. 服务调用：`ribbon`(属于Netflix,停止更新，已经彻底被移除）、spring `Loadbalancer`(属于Spring Cloud官方,目前的默认方案)
3. 服务降级：`hystrix`(属于Netflix,停止更新，已经彻底被移除）
4. 路由网关：`zuul`(属于Netflix,停止更新，已经彻底被移除）、gateway(属于spring Cloud官方, 推荐方案)

找一套更好的解决方案势在必行，也就引出了我们本章的主角：spring cloud alibaba

> 阿里巴巴作为业界的互联网大厂，给出了一套微服务开发的一站式解决方案。此项目包含开发分布式应用服务的必需组件，方便开发者通过spring cloud编程模型轻松使用这些组件来开发分布式应用服务。
> 依托spring cloud alibaba,您只需要添加一些注解和少量配置，就可以将spring cloud 应用接入阿里分布式应用解决方案，通过阿里中渐渐迅速搭建分布式应用系统。

目前spring cloud alibaba提供了如下功能：

1. 服务限流降级：支持WebServlet、WebFlux、OpenFeign、RestTemplate、dubbo限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降低Metrics监控。
2. 服务注册与发现：适配spring cloud服务注册与发现标准，默认集成了Ribbon的支持；
3. 分布式配置管理：支持分布式系统中的外部化配置，配置更改时自动刷新。
4. RPC服务：扩展RestTemplate、OpenFeign、dubbo等RPC客户端
5. 消息驱动能力：基于RabbitMQ、RocketMQ、Kafka等消息驱动能力，支持消息队列、消息事件、消息订阅等能力。
6. 分布式事务：使用了@GlobalTransactional注解，高效并且对业务零侵入地解决了分布式事务的问题。
7. 阿里云对象存储：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。
8. 分布式任务调度：提供秒级、精准、高可靠、高可用的定时（基于CRON表达式）任务调度服务。同时提供分布式的任务执行模型，如网络任务。网络任务支持海量子任务均匀分配到所有worker（shceduler-client)上执行。
9. 阿里云短信服务：覆盖全球的短信服务，友好、搞笑、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。
