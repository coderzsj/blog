---
title: Java设计模式--单例模式！
category: 设计模式
tag: 单例模式
---

在介绍单例模式之前，我们先了解一下，什么是设计模式？

## 设计模式（Design Pattern）：

是一套被反复使用，多数人知晓的，经过分类编目的，代码设计经验的总结。

目的：使用设计模式是为了可重用性代码，让代码更容易被他人理解，保证代码可靠性。

本文将会用到的关键词：

单例：Singleton

实例：instance

同步：synchronized

类装载器：ClassLoader

## 单例模式：

单例，顾名思义就是只能有一个、不能再出现第二个。就如同地球上没有两片一模一样的树叶一样。

在这里就是说：一个类只能有一个实例，并且整个项目系统都能访问该实例。

单例模式共分为两大类：

- 懒汉模式：实例在第一次使用时创建
- 饿汉模式：实例在类装载时创建

单例模式UML图：

![单例模式UML图：](./assets/20220414/singleton-design-1649949735164.png)

## 饿汉模式：

按照定义我们可以写出一个基本代码：

```java
public class Singleton {
    private Singleton() {}
    // 由于不能使用构造方法创建实力，所以需要在类的内部创建该类的唯一实力，使用STATIC修饰singleton，在外界可以通过类名调用该实例子， 类名.成员变量
    private static Singleton singleton = new Singleton(); // 1
    
    // 如果使用private修饰，则不能在外部访问，只能在类内部访问
    private static Singleton instance = new Singleton(); // 2
    public static Singleton getInstance() {
        return instance;
    }
}
```

对于饿汉模式来说，这种写法已经很‘perfect’了，唯一的缺点就是，由于instance的初始化是在类加载时进行的，类加载是由ClassLoader来实现的，如果初始化太早，就会造成资源浪费。

当然，如果所需的单例占用的资源很少，并且也不依赖于其他数据，那么这种实现方式也是很好的。

类装载的时机：

- new一个对象时
- 使用反射创建它的实例时
- 子类被加载时，如果父类还没有加载，就先加载父类
- JVM启动时执行主类 会先被加载

## 懒汉模式：

懒汉模式的代码如下

每次获取instance之前先进行判断，如果instance为空就new一个出来，否则就直接返回已存在的instance。

这种写法在单线程的时候是没问题的。但是，当有多个线程一起工作的时候，如果有两个线程同时运行到 if (instance == null)，都判断为null（第一个线程判断为空之后，并没有继续向下执行，当第二个线程判断的时候instance依然为空），最终两个线程就各自会创建一个实例出来。这样就破环了单例模式 实例的唯一性

加上synchronized关键字之后，getInstance方法就会锁上了。如果有两个线程（T1、T2）同时执行到这个方法时，会有其中一个线程T1获得同步锁，得以继续执行，而另一个线程T2则需要等待，当第T1执行完毕getInstance之后（完成了null判断、对象创建、获得返回值之后），T2线程才会执行执行。

所以这段代码也就避免了代码一中，可能出现因为多线程导致多个实例的情况。但是，这种写法也有一个问题：给getInstance方法加锁，虽然避免了可能会出现的多个实例问题，但是会强制除T1之外的所有线程等待，实际上会对程序的执行效率造成负面影响。

## 双重检查（Double-Check）

代码二相对于代码一的效率问题，其实是为了解决1%几率的问题，而使用了一个100%出现的防护盾。那有一个优化的思路，就是把100%出现的防护盾，也改为1%的几率出现，使之只出现在可能会导致多个实例出现的地方。

代码如下：

这段代码看起来有点复杂，注意其中有两次if(instance==null)的判断，这个叫做『双重检查 Double-Check』。

- 第一个 if(instance==null)，其实是为了解决代码二中的效率问题，只有instance为null的时候，才进入synchronized的代码段大大减少了几率。
- 第二个if(instance==null)，则是跟代码二一样，是为了防止可能出现多个实例的情况。

这段代码看起来已经完美无瑕了。当然，只是『看起来』，还是有小概率出现问题的。想要充分理解需要先弄清楚以下几个概念：原子操作、指令重排。

原子操作：

简单来说，原子操作（atomic）就是不可分割的操作，在计算机中，就是指不会因为线程调度被打断的操作。比如，简单的赋值是一个原子操作：

了解了原子操作和指令重排的概念之后，我们再继续看代码三的问题。

主要在于singleton = new Singleton()这句，这并非是一个原子操作，事实上在 JVM 中这句话大概做了下面 3 件事情。
1. 给 singleton 分配内存
2. 调用 Singleton 的构造函数来初始化成员变量，形成实例
3. 将singleton对象指向分配的内存空间（执行完这步 singleton才是非 null了）

在JVM的即时编译器中存在指令重排序的优化

volatile关键字的一个作用是禁止指令重排，把instance声明为volatile之后，对它的写操作就会有一个内存屏障，这样，在它的赋值完成之前，就不用会调用读操作。

注意：volatile阻止的不是singleton = new Singleton()这句话内部[1-2-3]的指令重排，而是保证了在一个写操作（[1-2-3]）完成之前，不会调用读操作（if (instance == null)）。

其它方法

## 静态内部类

```java
public class Singleton {
    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    private Singleton() {}

    public static final Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}

```
这种写法的巧妙之处在于：对于内部类SingletonHolder，它是一个饿汉式的单例实现，在SingletonHolder初始化的时候会由ClassLoader来保证同步，使INSTANCE是一个真单例。

同时，由于SingletonHolder是一个内部类，只在外部类的Singleton的getInstance()中被使用，所以它被加载的时机也就是在getInstance()方法第一次被调用的时候。

它利用了ClassLoader来保证了同步，同时又能让开发者控制类加载的时机。从内部看是一个饿汉式的单例，但是从外部看来，又的确是懒汉式的实现

## 枚举：

```java
public enum Singleton {
    INSTANCE;
    public void whateverMethod() {
        // ...
    }
} // 使用Singleton.INSTANCE.whateverMethod()调用方法

```
是不是很简单？而且因为自动序列化机制，保证了线程的绝对安全。三个词概括该方式：简单、高效、安全

这种写法在功能上与共有域方法相近，但是它更简洁，无偿地提供了序列化机制，绝对防止对此实例化，即使是在面对复杂的序列化或者反射攻击的时候。虽然这中方法还没有广泛采用，但是单元素的枚举类型已经成为实现Singleton的最佳方法。
