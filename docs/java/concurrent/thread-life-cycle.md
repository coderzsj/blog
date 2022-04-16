---
title: 线程生命周期 
category: 线程 
tag:
 - 线程生命周期
---

# 线程生命周期

本文对线程的生命周期有清楚的认识，并且明白不同状态之间是如何转换的，以及对java线程状态枚举类解读。

## 线程生命周期，五大状态转换分析

## 一、线程生命周期

一个完整的线程生命周期，要经过 新建(new)、就绪(Runnable)、运行(Running)、阻塞(Blocked)和死亡(Dead)5 种状态。

![线程生命周期](./image/1-1.png)

### 1.new 阶段

New 阶段就是你 new Thread()创建线程对象时候的阶段。

是创建了一个 Therad 对象

只有当我们真正把线程启动起来的时候，此时才会在 JVM 进程

我们 new 了一个 Thread 对象之后就需要调用 Thread.start()来启动线程，此时线程会从 new 阶段转换到 Runnable 阶段。

线程流程图-new_to_runnable：

![](./image/1-2.png)

### 2. Runnable 阶段

只有调用`Thread.start()方`法才能使线程从 new 阶段转换到 Runnable 阶段。

当然我们从字面意思也可以知道此时线程是处于可执行转状态而不是真正的执行中状态了，此时的线程只能等 CPU 翻牌子，翻到了他才能真正的跑起来。

```java
package Java.lang.Thread.State;

public enum State {
    /**
     * 尚未启动的线程的线程状态。还没有start的线程状态
     */
    NEW,

    // 可运行线程的线程状态。处于可运行状态的线程正在 Java 虚拟机中执行，但它可能正在等待来自操作系统的其他资源，例如处理器。
    RUNNABLE,

    // 线程阻塞等待监视器锁的线程状态。处于阻塞状态的线程正在等待监视器锁进入同步块方法或调用后重新进入同步块方法
    BLOCKED,

    /**
     * 等待线程的线程状态。由于调用以下方法之一，线程处于等待状态：
     * <ul>
     *   <li>{@link Object#wait() Object.wait} with no timeout</li>
     *   <li>{@link #join() Thread.join} with no timeout</li>
     *   <li>{@link LockSupport#park() LockSupport.park}</li>
     * </ul>
     *
     * <p>处于等待状态的线程形成一个特定的动作。
     *
     * 例如，在一个对象上调用了 <tt>Object.wait()<tt> 的线程正在等待另一个线程调用 <tt>Object.notify()<tt> 或 <tt>Object.notifyAll()< tt> 在那个物体上。已调用 <tt>Thread.join()<tt> 的线程正在等待指定线程终止。
     */
    WAITING,

    /**
     * 具有指定等待时间的等待线程的线程状态。由于以指定的正等待时间调用以下方法之一，线程处于定时等待状态：
     * <ul>
     *   <li>{@link #sleep Thread.sleep}</li>
     *   <li>{@link Object#wait(long) Object.wait} with timeout</li>
     *   <li>{@link #join(long) Thread.join} with timeout</li>
     *   <li>{@link LockSupport#parkNanos LockSupport.parkNanos}</li>
     *   <li>{@link LockSupport#parkUntil LockSupport.parkUntil}</li>
     * </ul>
     */
    TIMED_WAITING,

    /**
     * 已终止线程的线程状态。线程已完成执行。
     */
    TERMINATED;
}
```

### 3.Running 阶段

这个阶段的线程已经获取到了**CPU 调度执行权**，也就是说处于运行中状态了。

在该阶段中，线程可以向前或者向后发生转换：

- 由于CPU的调度器轮询导致该线程放弃执行，就会进入Runnable阶段。
- 线程主动调用yield，放弃CPU执行权，就会进入Runnable阶段(这种方式并不是百分百生效的，在CPU资源不紧张的时候不会生效)。
- 调用sleep、wait方法，进入Blocked阶段(这里讲的Blocked阶段和线程的Blocked状态需要区分开，这边讲的是一个比较广义的Blocked的阶段)
- 进行某个阻塞的IO操作而进入Blocked阶段
- 为了获取某个锁资源而加入到该锁到阻塞队列中而进入Blocked阶段
- 线程执行完成或者调用stop方法或者判断某个逻辑标识，直接进入Terminated阶段

### wait
