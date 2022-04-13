---
title: 4-reference-types 
category: concurrent 
tag:
  - concurrent
---

# 四种引用类型

## 强引用

强引用是使用最普遍的引用。如果一个对象具有强引用，那垃圾收集器绝不会回收它。

但是如果这个`strong-reference`是全局变量时，就需要在不用这个对象时赋值为`null`，因为强引用不会被垃圾回收。

例如：`ArrayList`的 `Clear`方法：

在`ArrayList`类中定义了一个`elementData`数组，在调用clear方法清空数组时，每个数组元素被赋值为null。不同于`elementData=null`，强引用仍然存在，避免在后续调用`add()`等方法添加元素时进行内存的重新分配。使用如`clear()`方法内存数组中存放的引用类型进行内存释放特别适用，这样就可以及时释放内存。

```java
class ArrayList<E> {
    public void clear() {
        modCount++;
        // clear to let 垃圾收集器 do its work
        for (int i = 0; i < size; i++)
            elementData[i] = null;
        size = 0;
    }
}
```

## 2. 软引用

SoftReference的主要特点就是在当内存不够的时候，垃圾收集器会回收软引用所引用的对象。

在内存敏感的项目中将某些数据设置成SoftReference可以避免内存的溢出。

## 3. 弱引用（weakReference）

当一个对象仅被弱引用指向, 而没有任何其他强引用指向的时候, 如果这时垃圾收集器运行, 那么这个对象就会被回收，不论当前的内存空间是否足够，这个对象都会被回收。引用队列注册引用的对象，在适当的可达的改变被监听

## 4. PhantomReference 虚引用

虚引用顾名思义，就是形同虚设。

如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾收集器回收。

与其他几种引用都不同，虚引用并不会决定对象的生命周期。

### 应用场景

虚引用主要用来跟踪对象被垃圾收集器回收的活动。

如果程序发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取必要的行动。
