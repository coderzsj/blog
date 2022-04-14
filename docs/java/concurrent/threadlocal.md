---
title: 本地线程 
category: 锁机制 
tag:
 - ThreadLocal

---

## ThreadLocal

### 概念

类ThreadLocal主要解决的就是每个线程绑定自己的值，可以将ThreadLocal类比喻成全局存放数据的盒子，盒子中可以存储每个线程的私有变量。

首先，它是一个数据结构，有点像 HashMap，可以保存"key : value"键值对，但是一个 ThreadLocal 只能保存一个，并且各个线程的数据互不干扰。

```java
ThreadLocal<String> localName=new ThreadLocal();localName.set("zs");String name=localName.get();
```

在线程 1 中初始化了一个 ThreadLocal 对象 localName，并通过 set 方法，保存了一个值 zs，同时在线程 1 中通过 localName.get()可以拿到之前设置的值，但是如果在线程 2 中，拿到的将是一个 null。

这是为什么，如何实现？不过之前也说了，ThreadLocal 保证了各个线程的数据互不干扰。

看看 set(T value)和 get()方法的源码

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

Thread 线程类中存在 ThreadLoalMap 的对象，它也是一个类似 HashMap 的数据结构，但是在 ThreadLocal 中，并没实现 Map 接口。

在 ThreadLoalMap 中，也是初始化一个大小 16 的 Entry 数组，Entry 对象用来保存每一个 key-value 键值对，只不过这里的 key 永远都是 ThreadLocal 对象，通过 ThreadLocal 对象的 set 方法，结果把 ThreadLocal 对象自己当做 key，放进了 ThreadLoalMap 中。

### Entry 是继承 WeakReference

ThreadLoalMap 的 Entry 是继承 WeakReference 这里需要注意的是，

ThreadLoalMap 的 Entry 是继承 WeakReference，和 HashMap 很大的区别是，Entry 中没有 next 字段，所以就不存在链表的情况了。
