---
title: autowire
icon: zidong-02
category: spring
time: 2021-10-21
tag:
  - spring
  - transaction
---

## boot flow

## 自动装配流程

里面有一个 main 方法运行了一个 run()方法，在 run 方法中必须要传入一个被@SpringBootApplication 注解的类。

@SpringBootApplication
SpringBoot 应用标注在某个类上说明这个类是 SpringBoot 的主配置类，SpringBoot 就会运行这个类的 main 方法来启动 SpringBoot 项目。

那@SpringBootApplication 注解到底是什么呢，点进去看看：

发现@@SpringBootApplication 是一个组合注解。

## @SpringBootConfiguration

先看看@SpringBootConfiguration 注解：
