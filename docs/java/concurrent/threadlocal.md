---
title: ThreadLocal的介绍与使用
category: 锁机制 
tag:
 - ThreadLocal
---

## 1、ThreadLocal简介

我们已经知道了变量值的共享可以使用public static变量的形式，所有的线程都使用同一个被public static修饰的变量。

那么如果我们想实现每一个线程都有自己的共享变量该如何解决哪？JDK提供的ThreadLocal正是为了解决这样的问题的。

类ThreadLocal主要解决的就是每个线程绑定自己的值，可以将ThreadLocal类比喻成全局存放数据的盒子，盒子中可以存储每个线程的私有变量。

首先，它是一个数据结构，有点像 HashMap，可以保存"key : value"键值对，但是一个 ThreadLocal 只能保存一个，并且各个线程的数据互不干扰。

## 2、ThreadLocal实例

```java
class T{
    void m(){
        ThreadLocal<String> tl = new ThreadLocal<String>();
        tl.set("hello");
        System.out.println(tl.get());
    }
}
```

在线程1中初始化了一个ThreadLocal对象tl，并通过set方法，保存了一个值zs，同时在线程1中通过tl.get()可以拿到之前设置的值，但是如果在线程2中，拿到的将是一个null。

可以，看出虽然多个线程对同一个变量进行访问，但是由于threadLocal变量由ThreadLocal 修饰，则不同的线程访问的就是该线程设置的值，这里也就体现出来ThreadLocal的作用。

当使用ThreadLocal维护变量时，ThreadLocal为每个使用该变量的线程提供独立的变量副本，所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。

## 3、ThreadLocal源码中set(T value)和get()等方法的实现

```java
public class T {
    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
    }

    public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                T result = (T) e.value;
                return result;
            }
        }
        return setInitialValue();
    }

    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }
}
```

## 4、ThreadLocal与synchronized同步机制的比较

在同步机制中，通过对象的锁机制保证同一时间只有一个线程访问变量。这时该变量是多个线程共享的，使用同步机制要求程序缜密地分析什么时候对变量进行读写，什么时候需要锁定某个对象，什么时候释放对象锁等繁杂的问题，程序设计和编写难度相对较大。

ThreadLocal是线程局部变量，是一种多线程间并发访问变量的解决方案。和synchronized等加锁的方式不同，ThreadLocal完全不提供锁，而使用以空间换时间的方式，为每个线程提供变量的独立副本，以保证线程的安全。

Thread线程类中存在ThreadLoalMap的对象，它也是一个类似HashMap的数据结构，但是在ThreadLocal中，并没实现Map接口。

在ThreadLoalMap中，也是初始化一个大小16的Entry数组，Entry对象用来保存每一个key-value键值对，只不过这里的key永远都是ThreadLocal对象，通过ThreadLocal对象的set方法，结果把ThreadLocal对象自己当做key，放进了ThreadLoalMap中。

## 5、Entry 是继承 WeakReference

这里需要注意的是，ThreadLoalMap的Entry是继承`WeakReference`，和HashMap很大的区别是，Entry中没有next字段，所以就不存在链表的情况了。
