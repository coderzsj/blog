---
title: 线程通信的方式
category: 进程与线程
---

## Java 线程的通信方式

通信的目的是为了更好的协作，线程无论是`交替`式执行，还是`接力`式执行，都需要进行通信告知。

代码二相对于代码一的效率问题，其实是为了解决1%几率的问题，而使用了一个100%出现的防护盾。那有一个优化的思路，就是把100%出现的防护盾，也改为1%的几率出现，使之只出现在可能会导致多个实例出现的地方。

代码如下：

```java
class Singleton {
    private volatile Singleton singleton;
    
    private Singleton(){}

    public Singleton getSingleton() {
        if (singleton = null){
            synchronized (singleton.class){
                if (singleton = null){
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```

这段代码看起来有点复杂，注意其中有两次if(instance==null)的判断，这个叫做『双重检查 Double-Check』。

- 第一个 if(instance==null)，其实是为了解决代码二中的效率问题，只有instance为null的时候，才进入synchronized的代码段大大减少了几率。
- 第二个if(instance==null)，则是跟代码二一样，是为了防止可能出现多个实例的情况。

## 使用 volatile 保证可见性 synchronized

Volatile 有两大特性，一是可见性(让线程之间进行通信)，二是有序性，禁止指令重排序

所有 volatile 修饰的变量一旦被某个线程更改，必须立即刷新到主内存
所有 volatile 修饰的变量在使用之前必须重新读取主内存的值

## 等待/通知机制 是基于 wait 和 notify 方法来实现的

在一个线程内调用该线程锁对象的 wait 方法，线程将进入等待队列进行等待直到被通知或者被唤醒。

因为调用 wait 方法时，必须要先释放锁，如果没有持有锁将会抛出异常。

## join 方式

Join 可以理解成是线程合并，当在一个线程调用另一个线程的 join 方法时，当前线程阻塞等待被调用 join 方法的线程执行完毕才能继续执行，所以 join 的好处能够保证线程的执行顺序，但是如果调用线程的 join 方法其实已经失去了并行的意义，虽然存在多个线程，但是本质上还是串行的，join 实现其实也是基于 wait/notify(等待通知机制)。

## threadLocal 方式

ThreadLocal使用场合主要解决多线程中数据因并发产生不一致问题。

每个线程的中并发访问的数据提供一个副本，通过访问副本来运行业务，这样的结果是耗费了内存，单大大减少了线程同步所带来性能消耗，也减少了线程并发控制的复杂度。

ThreadLocal不能使用原子类型，只能使用Object类型。ThreadLocal的使用比synchronized要简单得多。

实现每一个线程都有自己的共享变量,绑定自己的值,cpu 下一次轮询，还能获取自己上次的状态。

ThreadLocal 方式的线程通信，不像以上三种方式是多个线程之间的通信，它更像是一个线程内部的通信，将当前线程和一个 map 绑定，在当前线程内可以任意存取数据，减省了方法调用间参数的传递。
