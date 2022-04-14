---
title: springboot自动装配原理
icon: zidong-02
category: spring
date: 2021-10-21
tag:
  - springboot
  - transaction
---

# 自动装配流程

里面有一个`main`方法运行了一个`run()`方法，在`run`方法中必须要传入一个被`@SpringBootApplication`注解的类。

`@SpringBootApplication`应用标注在某个类上说明这个类是SpringBoot的主配置类，`SpringBoot`就会运行这个类的`main`方法来启动 SpringBoot 项目。

那`@SpringBootApplication`注解到底是什么呢，点进去看看：

发现`@SpringBootApplication`是一个组合注解。

## @SpringBootConfiguration

先看看@SpringBootConfiguration注解：

## 05、条件注解

默认情况，假设没有条件注解，那么发生什么？因为如果bean指定@Configuration和@Bean是必须一定加载ioc容器中去的.

思考一个问题：springboot的starter机制中提供了100~200个配置类，这么的多配置类，我们不可能全不让ioc容器加载，因为项目可能之用到了redis，mybatis ，那么另外100多个，应该不要加载才行。所以条件注解就专门来做过滤使用。满足配置就加载，不满足的就忽略。
