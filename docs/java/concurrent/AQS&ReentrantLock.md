---
title: brief-analysis-of-queue-synchronizer-aqs-and-reentrantlock-lock-principles
category: concurrent
tag:
- concurrent
---

## Java多线程编程-（14）-Java 中的队列同步器AQS和ReentrantLock锁原理简要分析

### 一、Lock接口

在上一篇文章中：Java多线程编程-（5 ）-使用Lock对象实现同步以及线程间通信介绍了如何使用Lock实现和synchronized关键字类似的同步功能，只是Lock在使用时需要显式地获取和释放锁，synchronized实现的隐式的获取所和释放锁。

虽然Lock它缺少了（通过synchronized块或者方法所提供的）隐式获取释放锁的便捷性，但是却拥有了锁获取与释放的可操作性、可中断的获取锁以及超时获取锁等多种synchronized关键字所不具备的同步特性，何以见得，举个简单的实例：

假设我们需要先获得锁A，然后在获取锁B，当锁B获得后，释放锁A同时获取锁C，当锁C获得后，在释放B同时获得锁D。。。是不是已经被绕晕了，很显然如果使用synchronized实现的话，不但其过程复杂难以控制，并且稍微出错可以说是一种灾难性的后果。

Lock接口提供的 synchronized 关键字不具备的主要特性

|特性|描述|
|:--: | --- |
``| 尝试非阻塞地获取锁 | 当前线程尝试获取锁，如果这一时刻锁没有被其他线程获取锁，则成功获取并持有锁 |
| 能被中断地获取锁 | 与synchronized
 不同，获取锁的线程能够响应中断，当获取到锁的线程被中断时，中断异常将会被抛出，同时锁会被释放 |

而关于Lock接口的使用，也在上一篇的内容中详细的介绍了关系Lock接口的使用案例。下边几张图显示了Lock相关类在Java 8 concurrent并发包下的大致位置和关系。

1、Java 8中 `locks` 包下的类：