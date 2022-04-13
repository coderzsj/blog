---
title: synchronized
category: concurrent
time: 2022-01-28
tag:
  - concurrent
  - synchronized
---

## 可见性

### 概念

可见性是指一个线程对共享变量进行修改，另一个线程先立即获取到修改后的最新值。

### 可见性演示

一个线程根据 `boolean` 类型的标记 flag， while 循环，另一个线程改变这个 flag 变量的值，另一个线程并不会停止循环。

多个线程都会访问的数据，我们称为线程的共享数据

```java
/**
演示:
一个线程对共享变量的修改,另一个线程不能立即得到最新值
*/
public class Test01Visibility {

// 共享数据
private static boolean run = true;

public static void main(String[] args) throws InterruptedException {
    Thread t1 = new Thread(() -> {
        while (run) {
        }
    });
    t1.start();
    Thread.sleep(1000);
    Thread t2 = new Thread(() -> {
        run = false;
        System.out.println("时间到，线程2设置为false");
    });
    t2.start();
    }
}
```

::: tip 总结

并发编程时，会出现可见性问题，当一个线程对共享变量进行了修改，另外的线程并没有立即看到修改 后的最新值。Synchronized volatile 可解决

:::

## 原子性

### 概念

在一次或多次操作中，要么所有的操作都执行并且不会受其他因素干扰而中断，要么所有的操作都不执行。

### 演示

```java
/**
案例演示:5个线程各执行1000次 i++;
*/
public class Test02Atomicity {
    private static int number = 0;
    public static void main(String[] args) throws InterruptedException {
    Runnable increment = () -> {
        for (int i = 0; i < 1000; i++) {
            number++;
        }
    };
    ArrayList<Thread> ts = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
        Thread t = new Thread(increment);
        t.start();
        ts.add(t);
    }
    for (Thread t : ts) {
        t.join();
     }
    System.out.println("number = " + number);
    }
}
```

使用 javap 反汇编 class 文件，得到下面的字节码指令：

![](./img/1-2-1.png)

其中，对于 number++ 而言(number 为静态变量)，实际会产生如下的 JVM 字节码指令：由此可见 number++是由多条语句组成，以上多条指令在一个线程的情况下是不会出问题的，但是在多 线程情况下就可能会出现问题。比如一个线程在执行 13: iadd 时，另一个线程又执行 9: getstatic。会导 致两次 number++，实际上只加了 1。

::: tip 总结

并发编程时，会出现原子性问题，当一个线程对共享变量操作到一半时，另外的线程也有可能来操作共享变量，干扰了前一个线程的操作。

:::

## 有序性

- [ ] 学习什么是有序性问题

### 有序性概念

有序性(Ordering)：是指程序中代码的执行顺序，Java 在编译时和运行时会对代码进行优化，会导致 程序最终的执行顺序不一定就是我们编写代码时的顺序。

### 有序性演示

```java
public static void main(String[] args) {
    int a = 10;
    int b = 20;
}
```

Jcstress 是 java 并发压测工具。<https://wiki.openjdk.java.net/display/CodeTools/jcstress> 修改 pom 文件，添加依赖：

```xml
<dependency>
    <groupId>org.openjdk.jcstress</groupId>
    <artifactId>jcstress-core</artifactId>
    <version>${jcstress.version}</version>
</dependency>
```

```bash
9: getstatic #12 // Field number:I
12: iconst_1
13: iadd
14: putstatic #12 // Field number:I
代码
Test03Orderliness.java
```

```java
package com.itheima.concurrent_problem;
import org.openjdk.jcstress.annotations.*;
import org.openjdk.jcstress.infra.results.I_Result;

@JCStressTest
@Outcome(id = {"1","4"}， expect = Expect.ACCEPTABLE， desc = "ok")
@Outcome(id = "0"， expect = Expect.ACCEPTABLE_INTERESTING， desc = "danger")
@State
public class Test03Orderliness {
    int num = 0;
    boolean ready = false;
    // 线程一执行的代码
    @Actor
    public void actor1(I_Result r) {
        if(ready) {
            r.r1 = num + num;
        } else {
            r.r1 = 1;
        }
    }
    // 线程2执行的代码
    @Actor
    public void actor2(I_Result r) {
        num = 2;
        ready = true;
    }
}
```

I_Result 是一个对象，有一个属性r1用来保存结果，在多线程情况下可能出现几种结果？
 
情况 1：线程1先执行 actor1，这时 ready = false，所以进入 else 分支结果为 1。

情况 2：线程2执行到actor2，执行了 num = 2;和 ready = true，线程 1 执行，这回进入 if 分支，结果为 4。

情况 3：线程2先执行actor2，只执行num=2；但没来得及执行 ready = true，线程 1 执行，还是进入Else分支，结果为1。

还有一种结果 0。

运行测试：

```shell script
mvn clean install
java -jar target/jcstress.jar
```

::: tip 总结

程序代码在执行过程中的先后顺序，由于 Java 在编译期以及运行期的优化，导致了代码的执行顺序未必就是开发者编写代码时的顺序。

:::

# 二、Java 内存模型(JMM)

在介绍 Java 内存模型之前，先来看一下到底什么是计算机内存模型。

- [ ] 计算机的主要组成
- [ ] 学习缓存的作用

### 计算机结构简介

冯诺依曼，提出计算机由五大组成部分，输入设备，输出设备存储器，控制器，运算器。

![](./img/2-1-1.png)

### CPU

中央处理器，是计算机的控制和运    
的核心，我们的程序最终都会变成指令 让 CPU 
去执行，处理程序中 的数据。

### 内存

我们的程序都是在内存中运行的，内存会保存程序运行时的数据，供 CPU 处理。

### 缓存

CPU的运算速度和内存的访问速度相差比较大。这就导致 CPU 每次操作内存都要耗费很多等待时间。内
存的读写速度成为了计算机运行的瓶颈。于是就有了在 CPU 和主内存之间增加缓存的设计。最靠近 CPU
的缓存称为 L1，然后依次是 L2，L3 和主内存，CPU 缓存模型如图下图所示。

![](./img/2-1-4.png)

CPU Cache 分成了三个级别: L1， L2， L3。级别越小越接近 CPU，速度也更快，同时也代表着容量越
小。

1. L1 是最接近 CPU 的，它容量最小，例如 32K，速度最快，每个核上都有一个 L1 Cache。
2. L2 Cache 更大一些，例如 256K，速度要慢一些，一般情况下每个核上都有一个独立的 L2 Cache。
3. L3 Cache 是三级缓存中最大的一级，例如 12MB，同时也是缓存中最慢的一级，在同一个 CPU 插槽
   之间的核共享一个 L3 Cache。

![](./img/2-1-5.png)

Cache 的出现是为了解决CPU直接访问内存效率低下问题的，

程序在运行的过程中，CPU 接收到指令后，它会最先向CPU中的一级缓存(L1 Cache)去寻找相关的数据，如果命中缓存，CPU 进行计算时就 可以直接对 CPU Cache 中的数据进行读取和写人，

当运算结束之后，再将 CPUCache 中的最新数据刷新 到主内存当中，CPU 通过直接访问 Cache 的方式替代直接访问主存的方式极大地提高了 CPU 的吞吐能 力。 

但是由于一级缓存(L1 Cache)容量较小，所以不可能每次都命中。

这时 CPU 会继续向下一级的二级缓存(L2 Cache)寻找，同样的道理，当所需要的数据在二级缓存中也没有的话，会继续转向 L3 Cache、内存(主存)和硬盘。

::: tip 总结

计算机的主要组成CPU，内存，输入设备，输出设备。

:::

## Java 内存模型

- [ ] 学习 Java 内存模型的概念和作用

### 概念

Java Memory Molde (Java 内存模型/JMM)，千万不要和 Java 内存结构混淆

关于“Java 内存模型”的权威解释，请参考 <https://download.oracle.com/otn-pub/jcp/memory_model1.0-pfd-spec-oth-JSpec/memory_model-1_0-pfd-spec.PDF>。

Java 内存模型，是 Java 虚拟机规范中所定义的一种内存模型，Java 内存模型是标准化的，屏蔽掉了底层
不同计算机的区别。

Java 内存模型是一套规范，描述了 Java 程序中各种变量(线程共享变量)的访问规则，以及在 JVM 中将变量
存储到内存和从内存中读取变量这样的底层细节，具体如下。

- 主内存
  主内存是所有线程都共享的，都能访问的。所有的共享变量都存储于主内存。
- 工作内存
  每一个线程有自己的工作内存，工作内存只存储该线程对共享变量的副本。线程对变量的所有的操 作(读，取)都必须在工作内存中完成，而不能直接读写主内存中的变量，不同线程之间也不能直接 访问对方工作内存中的变量。

![](./img/2-2-1.png)

### 作用

Java 内存模型是一套在多线程读写共享数据时，对共享数据的可见性、有序性、和原子性的规则和保障。

Synchronized,volatile

### CPU 缓存，内存与 JMM的关系

通过对前面的 CPU 硬件内存架构、Java 内存模型以及 Java 多线程的实现原理的了解，我们应该已经意识到，多线程的执行最终都会映射到硬件处理器上进行执行。

但 Java 内存模型和硬件内存架构并不完全一致。

对于硬件内存来说只有寄存器、缓存内存、主内存的概 念，并没有工作内存和主内存之分，也就是说 Java 内存模型对内存的划分对硬件内存并没有任何影响， 因为 JMM 只是一种抽象的概念，是一组规则，不管是工作内存的数据还是主内存的数据，对于计算机硬 件来说都会存储在计算机主内存中，当然也有可能存储到 CPU 缓存或者寄存器中，因此总体上来说， Java 内存模型和计算机硬件内存架构是一个相互交叉的关系，是一种抽象概念划分与真实物理硬件的交 叉。

**JMM 内存模型与 CPU 硬件内存架构的关系：**

![](./img/2-2-2.png)

::: tip 总结

Java 内存模型是一套规范，描述了 Java 程序中各种变量(线程共享变量)的访问规则，以及在 JVM 中将变量
存储到内存和从内存中读取变量这样的底层细节，Java 内存模型是对共享数据的可见性、有序性、和原
子性的规则和保障。

:::

## 主内存与工作内存之间的交互

- [ ] 了解主内存与工作内存之间的数据交互过程

![](./img/2-3-1.png)

Java 内存模型中定义了以下 8 种操作来完成，主内存与工作内存之间具体的交互协议，即一个变量如何
从主内存拷贝到工作内存、如何从工作内存同步回主内存之类的实现细节，虚拟机实现时必须保证下面
提及的每一种操作都是原子的、不可再分的。

对应如下的流程图：

![](./img/2-3-2.png)

注意:

1. 如果对一个变量执行 lock 操作，将会清空工作内存中此变量的值
2. 对一个变量执行 unlock 操作之前，必须先把此变量同步到主内存中

::: tip 总结

主内存与工作内存之间的数据交互过程

:::

```text
lock -> read -> load -> use -> assign -> store -> write -> unlock
```

# 三、synchronized 保证三大特性

Synchronized 能够保证在同一时刻最多只有一个线程执行该段代码，以达到保证并发安全的效果。

```java
synchronized (锁对象) {
    // 受保护资源;
}
```

## synchronized 与原子性

- [ ] 学习使用 synchronized 保证原子性的原理

### 案例演示

案例演示:5 个线程各执行 1000 次 i++;

```java
package com.itheima.demo02_concurrent_problem;
import java.util.ArrayList;
/**
案例演示:5个线程各执行1000次 i++;
*/
public class Test01Atomicity {
    private static int number = 0;
    public static void main(String[] args) throws InterruptedException {
    Runnable increment = new Runnable() {
        @Override
        public void run() {
            for (int i = 0; i < 1000; i++) {
             synchronized (Test01Atomicity.class) {
                 number++;
                }
             }  
        }
    };
    ArrayList<Thread> ts = new ArrayList<>();
    for (int i = 0; i < 50; i++) {
        Thread t = new Thread(increment);
        t.start();
        ts.add(t);
    }
    for (Thread t : ts) {
          t.join();
    }
    System.out.println("number = " + number);
    }
}

for (int i = 0; i < 1000; i++) {
    synchronized (Test01Atomicity.class) {
    number++;
}

```

### 保证原子性的原理

对 number++;增加同步代码块后，保证同一时间只有一个线程操作 number++;。就不会出现安全问题。

::: tip 总结

Synchronized 保证原子性的原理，synchronized 保证只有一个线程拿到锁，能够进入同步代码块。

:::

## synchronized 与可见性

- [ ] 学习使用 synchronized 保证可见性的原理

### 保证可见性

案例演示：

一个线程根据 boolean 类型的标记 flag， while 循环，另一个线程改变这个 flag 变量的值，另
一个线程并不会停止循环。

```java

package com.itheima.demo02_concurrent_problem;
public class Test01Visibility {
    // 多个线程都会访问的数据，我们称为线程的共享数据
    private static boolean run = true;
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            while (run) {
                // 增加对象共享数据的打印，println是同步方法
                System.out.println("run = " + run);
            }
        });
        t1.start();
        Thread.sleep(1000);
        Thread t2 = new Thread(() -> {
            run = false;
            System.out.println("时间到，线程2设置为false");
        });
        t2.start();
    }
}
```

### 保证可见性的原理

![](./img/3-2-1.png)

::: tip 总结

Synchronized 保证可见性的原理，执行 synchronized 时，会对应 lock 原子操作会刷新工作内存中共享变
量的值

:::

## synchronized 与有序性

- [ ] 学习使用 synchronized 保证有序性的原理

### 为什么要重排序

为了提高程序的执行效率，编译器和 CPU 会对程序中代码进行重排序。

### as-if-serial 语义

As-if-serial 语义的意思是：不管编译器和 CPU 如何重排序，必须保证在单线程情况下程序的结果是正确 的。

以下数据有依赖关系，不能重排序。

写后读：

`int a = 1; int b = a;`

写后写：

`int a = 1; int a = 2;`

读后写：

`int a = 1; int b = a; int a = 2;`

编译器和处理器不会对存在数据依赖关系的操作做重排序，因为这种重排序会改变执行结果。但是，如
果操作之间不存在数据依赖关系，这些操作就可能被编译器和处理器重排序。

`int a = 1; int b = 2; int c = a + b;`

上面 3 个操作的数据依赖关系如图所示：

1574136281215

如上图所示 a 和 c 之间存在数据依赖关系，同时 b 和 c 之间也存在数据依赖关系。因此在最终执行的指令序
列中，c 不能被重排序到 a 和 b 的前面。但 a 和 b 之间没有数据依赖关系，编译器和处理器可以重排序 a 和 b
之间的执行顺序。下图是该程序的两种执行顺序。

1574136462820

```shell script
可以这样：

int a = 1;
int b = 2;
int c = a + b;

也可以重排序这样：

int b = 2;
int a = 1;
int c = a + b;
```

### 案例演示

```java
package com.itheima.concurrent_problem;

import org.openjdk.jcstress.annotations.*;
import org.openjdk.jcstress.infra.results.I_Result;

@JCStressTest
@Outcome(id = {"1"， "4"}， expect = Expect.ACCEPTABLE， desc = "ok")
@Outcome(id = "0"， expect = Expect.ACCEPTABLE_INTERESTING， desc = "danger")
@State
public class Test03Ordering {
    int num = 0;
    boolean ready = false;
    // 线程一执行的代码
    @Actor
    public void actor1(I_Result r) {
        if(ready) {
            r.r1 = num + num;
        } else {
            r.r1 = 1;
        }
    }
    // 线程2执行的代码
    @Actor
    public void actor2(I_Result r) {
        num = 2;
        ready = true;
    }
}
```

### 保证有序性的原理

Synchronized 后，虽然进行了重排序，保证只有一个线程会进入同步代码块，也能保证有序性。

::: tip 总结

Synchronized 保证有序性的原理，我们加 synchronized 后，依然会发生重排序，只不过，我们有同步
代码块，可以保证只有一个线程执行同步代码中的代码。保证有序性。

:::

# 四、synchronized 的特性

- [ ] 了解什么是可重入

- [ ] 了解可重入的原理

### 可重入特性

一个线程可以多次执行 synchronized,重复获取同一把锁。

```java

package com.itheima.demo03_synchronized_nature;
/*
可重入特性
指的是同一个线程获得锁之后，可以直接再次获取该锁。
*/
public class Demo01 {
    public static void main(String[] args) {
        Runnable sellTicket = new Runnable() {
        @Override
        public void run() {
            synchronized (Demo01.class) {
                System.out.println("我是run");
                test01();
            }
        }
        public void test01() {
            synchronized (Demo01.class) {
                System.out.println("我是test01");
            }
          }
        };
        new Thread(sellTicket).start();
        new Thread(sellTicket).start();
    }
}
```

### 可重入的好处

1. 可以避免死锁
2. 可以让我们更好的来封装代码

### 可重入原理

Synchronized 的锁对象中有一个计数器(recursions 变量)会记录线程获得几次锁.

::: tip 总结

Synchronized 是可重入锁，内部锁对象中会有一个计数器记录线程获取几次锁啦，在执行完同步代码块
时，计数器的数量会-1，知道计数器的数量为 0，就释放这个锁。

:::

## 不可中断特性

- [ ] 学习 synchronized 不可中断特性
- [ ] 学习 Lock 的可中断特性

### 概念

一个线程获得锁后，另一个线程想要获得锁，必须处于阻塞或等待状态，如果第一个线程不释放锁，第 二个线程会一直阻塞或等待，不可被中断。

### 不可中断演示演示

Synchronized 是不可中断，处于阻塞状态的线程会一直等待锁。

:::: code-group

::: code-group-item synchronized

```java

package com.itheima.demo03_synchronized_nature;
/*
2.在Runnable定义同步代码块
3.先开启一个线程来执行同步代码块,保证不退出同步代码块
4.后开启一个线程来执行同步代码块(阻塞状态)
5.停止第二个线程
*/
public class Demo02_Uninterruptible {
    private static Object obj = new Object();
    public static void main(String[] args) throws InterruptedException {
// 1.定义一个Runnable
        Runnable run = () -> {
// 2.在Runnable定义同步代码块
            synchronized (obj) {
                String name = Thread.currentThread().getName();
                System.out.println(name + "进入同步代码块");
// 保证不退出同步代码块
                try {
                    Thread.sleep(888888);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
// 3.先开启一个线程来执行同步代码块
        Thread t1 = new Thread(run);
        t1.start();
        Thread.sleep(1000);
// 4.后开启一个线程来执行同步代码块(阻塞状态)
        Thread t2 = new Thread(run);
        t2.start();
// 5.停止第二个线程
        System.out.println("停止线程前");
        t2.interrupt();
        System.out.println("停止线程后");
        System.out.println(t1.getState());
        System.out.println(t2.getState());
    }
}
```

:::

::: code-group-item ReentrantLock

```java
package com.itheima.demo03_synchronized_nature;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/*
public class Demo03_Interruptible {
private static Lock lock = new ReentrantLock();
public static void main(String[] args) throws InterruptedException {
// test01();
test02();
}
// 演示Lock可中断
public static void test02() throws InterruptedException {
Runnable run = () -> {
String name = Thread.currentThread().getName();
boolean b = false;
try {
b = lock.tryLock(3, TimeUnit.SECONDS);
if (b) {
System.out.println(name + "获得锁,进入锁执行");
Thread.sleep(88888);
} else {
System.out.println(name + "在指定时间没有得到锁做其他操作");
}
} catch (InterruptedException e) {
e.printStackTrace();
} finally {
if (b) {
lock.unlock();
System.out.println(name + "释放锁");
}
}
};
Thread t1 = new Thread(run);
t1.start();
Thread.sleep(1000);
Thread t2 = new Thread(run);
t2.start();
// System.out.println("停止t2线程前");
// t2.interrupt();
// System.out.println("停止t2线程后");
//
// Thread.sleep(1000);
// System.out.println(t1.getState());
// System.out.println(t2.getState());
}
// 演示Lock不可中断
public static void test01() throws InterruptedException {
Runnable run = () -> {
String name = Thread.currentThread().getName();
try {
lock.lock();
System.out.println(name + "获得锁,进入锁执行");
Thread.sleep(88888);
} catch (InterruptedException e) {
    e.printStackTrace();
    } finally {
    lock.unlock();
    System.out.println(name + "释放锁");
    }
    };
    Thread t1 = new Thread(run);
    t1.start();
    Thread.sleep(1000);
    Thread t2 = new Thread(run);
    t2.start();
    System.out.println("停止t2线程前");
    t2.interrupt();
    System.out.println("停止t2线程后");
    Thread.sleep(1000);
    System.out.println(t1.getState());
    System.out.println(t2.getState());
    }
    }
```

:::

::::


::: tip 总结

不可中断是指，当一个线程获得锁后，另一个线程一直处于阻塞或等待状态，前一个线程不释放锁，后一个线程会一直阻塞或等待，不可被中断。

- Synchronized 属于不可被中断
- Lock 的 lock 方法是不可中断的
- Lock 的 tryLock 方法是可中断的

:::



# 五、synchronized 原理

## javap 反汇编

通过 javap 反汇编学习 synchronized 的原理

我们编写一个简单的 synchronized 代码，如下：

```java
package com.itheima.demo04_synchronized_monitor;
public class Demo01 {
    private static Object obj = new Object();
    public static void main(String[] args) {
        synchronized (obj) {
            System.out.println("1");
        }
    }
    public synchronized void test() {
        System.out.println("a");
    }
}
```

我们要看 synchronized 的原理，但是 synchronized 是一个关键字，看不到源码。我们可以将 class 文件
进行反汇编。

JDK 自带的一个工具： javap ，对字节码进行反汇编，查看字节码指令。

在 DOS 命令行输入：

反汇编后的效果如下：

Javap -p -v -c

```text
`C:\Users\13666\IdeaProjects\HeiMa\Synchronized\target\classes\com\itheima\demo04 _synchronized_monitor\Increment.class`
```

```text

public static void main(java.lang.String[]);
        descriptor: ([Ljava/lang/String;)V
        flags: ACC_PUBLIC, ACC_STATIC
        Code:
        stack=2, locals=4, args_size=1
        0: iconst_0
        1: istore_1
        2: getstatic #2 // Field obj:Ljava/lang/Object;
        5: dup
        6: astore_2
        7: monitorenter
        8: iinc 1, 1
        11: aload_2
        12: monitorexit
        13: goto 21
        16: astore_3
        17: aload_2
        18: monitorexit
        19: aload_3
        20: athrow
        21: return
        Exception table:
        from to target type
        8 13 16 any
        16 19 16 any
        LineNumberTable:
        line 8: 0
        line 9: 2
        line 10: 8
        line 11: 11
        line 12: 21
        LocalVariableTable:
        Start Length Slot Name Signature
        0 22 0 args [Ljava/lang/String;
        2 20 1 number I
        StackMapTable: number_of_entries = 2
        frame_type = 255 /* full_frame */
        offset_delta = 16
        locals = [ class "[Ljava/lang/String;", int, class java/lang/Object ]
        stack = [ class java/lang/Throwable ]
        frame_type = 250 /* chop */
        offset_delta = 4
public synchronized void test();
        descriptor: ()V
        flags: ACC_PUBLIC, ACC_SYNCHRONIZED
        Code:
        stack=2, locals=1, args_size=1
        0: getstatic #3 // Field
        java/lang/System.out:Ljava/io/PrintStream;
        3: ldc #4 // String a
        5: invokevirtual #5 // Method
        java/io/PrintStream.println:(Ljava/lang/String;)V
        8: return
        LineNumberTable:
        line 15: 0
        line 16: 8
        LocalVariableTable:
        Start Length Slot Name Signature
        0 9 0 this
        Lcom/itheima/demo04_synchronized_monitor/Demo01;
```

}

![](./img/5-1-1.png)

### monitorenter

首先我们来看一下 JVM 规范中对于 monitorenter 的描述：

<https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.monitorenter>

> Each object is associated with a monitor. A monitor is locked if and only if it has an owner.
> The thread that executes monitorenter attempts to gain ownership of the monitor
> associated with objectref， as follows: • If the entry count of the monitor associated with
> objectref is zero， the thread enters the monitor and sets its entry count to one. The thread
> is then the owner of the monitor. • If the thread already owns the monitor associated with
> objectref， it reenters the monitor， incrementing its entry count. • If another thread
> already owns the monitor associated with objectref， the thread blocks until the monitor’s
> entry count is zero， then tries again to gain ownership.

翻译过来： 每一个对象都会和一个监视器 monitor 关联。

监视器被占用时会被锁住，其他线程无法来获 取该 monitor。 

当 JVM 执行某个线程的某个方法内部的 monitorenter 时，它会尝试去获取当前对象对应 的 monitor 的所有权。其过程如下：

1. 若 monior 的进入数为 0，线程可以进入 monitor，并将 monitor 的进入数置为 1。当前线程成为 monitor 的 owner(所有者)
2. 若线程已拥有 monitor 的所有权，允许它重入 monitor，则进入 monitor 的进入数加 1
3. 若其他线程已经占有 monitor 的所有权，那么当前尝试获取 monitor 的所有权的线程会被阻塞，直 到 monitor 的进入数变为 0，才能重新尝试获取 monitor 的所有权。

::: info Monitorenter 小结

Synchronized 的锁对象会关联一个 monitor,这个 monitor 不是我们主动创建的,是 JVM 的线程执行到这个
同步代码块,发现锁对象没有 monitor 就会创建 monitor,monitor 内部有两个重要的成员变量 owner:拥有
这把锁的线程,recursions 会记录线程拥有锁的次数,当一个线程拥有 monitor 后其他线程只能等待

:::

### monitorexit

首先我们来看一下 JVM 规范中对于 monitorexit 的描述：

<https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.monitorexit>

> The thread that executes monitorexit must be the owner of the monitor associated with the
> instance referenced by objectref. The thread decrements the entry count of the monitor
> associated with objectref. If as a result the value of the entry count is zero， the thread
> exits the monitor and is no longer its owner. Other threads that are blocking to enter the
> monitor are allowed to attempt to do so.

翻译过来：

1. 能执行 monitorexit 指令的线程一定是拥有当前对象的 monitor 的所有权的线程。
2. 执行 monitorexit 时会将 monitor 的进入数减 1。当 monitor 的进入数减为 0 时，当前线程退出
   monitor，不再拥有 monitor 的所有权，此时其他被这个 monitor 阻塞的线程可以尝试去获取这个
   monitor 的所有权
   monitorexit 释放锁。

Monitorexit 插入在方法结束处和异常处，JVM 保证每个 monitorenter 必须有对应的 monitorexit。

问题 synchroznied 出现异常会释放锁吗?

会释放锁

### 同步方法

<https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.11.10>

可以看到同步方法在反汇编后，会增加 ACC_SYNCHRONIZED 修饰。会隐式调用 monitorenter 和
monitorexit。在执行同步方法前会调用 monitorenter，在执行完同步方法后会调用 monitorexit。

::: tip 总结

通过 javap 反汇编我们看到 synchronized 使用编程了 monitorentor 和 monitorexit 两个指令。

每个锁对象都会关联一个 monitor(监视器,它才是真正的锁对象),它内部有两个重要的成员变量： 

- owner 会保存获得锁的线程,
- recursions 会保存线程获得锁的次数,

当执行到 monitorexit 时,recursions 会-1,当计数器减到 0 时这个线程就会释放锁。

:::

### 问题：synchronized 与 Lock 的区别

1. synchronized 是关键字，而 Lock 是一个接口。
2. synchronized 会自动释放锁，而 Lock 必须手动释放锁。
3. synchronized 是不可中断的，Lock 可以中断也可以不中断。
4. 通过 Lock 可以知道线程有没有拿到锁，而 synchronized 不能。
5. synchronized 能锁住方法和代码块，而 Lock 只能锁住代码块。
6. Lock 可以使用读锁提高多线程读效率。
7. synchronized 是非公平锁，ReentrantLock 可以控制是否是公平锁。

## 深入 JVM 源码

通过 JVM 源码分析 synchronized 的原理

### JVM 源码下载

<http://openjdk.java.net/> --> Mercurial --> jdk8 --> hotspot --> zip

### IDE(Clion )下载

<https://www.jetbrains.com/>

### monitor 监视器锁

可以看出无论是 synchronized 代码块还是 synchronized 方法，其线程安全的语义实现最终依赖一个叫 monitor 的东西，那么这个神秘的东西是什么呢？下面让我们来详细介绍一下。

在 HotSpot 虚拟机中，monitor 是由 ObjectMonitor 实现的。其源码是用 c++来实现的，位于 HotSpot 虚 拟机源码 ObjectMonitor.hpp 文件中(src/share/vm/runtime/objectMonitor.hpp)。ObjectMonitor 主 要数据结构如下：

```C
ObjectMonitor() {
_header = NULL;
_count = 0;
_waiters = 0，
_recursions = 0; // 线程的重入次数
_object = NULL; // 存储该monitor的对象
_owner = NULL; // 标识拥有该monitor的线程
_WaitSet = NULL; // 处于wait状态的线程，会被加入到_WaitSet
_WaitSetLock = 0 ;
_Responsible = NULL;
_succ = NULL;
_cxq = NULL; // 多线程竞争锁时的单向列表
FreeNext = NULL;
_EntryList = NULL; // 处于等待锁block状态的线程，会被加入到该列表
_SpinFreq = 0;
_SpinClock = 0;
OwnerIsThread = 0;
}
```

1. \_owner：初始时为 NULL。当有线程占有该 monitor 时，owner 标记为该线程的唯一标识。当线程
   释放 monitor 时，owner 又恢复为 NULL。owner 是一个临界资源，JVM 是通过 CAS 操作来保证其线
   程安全的。
2. \_cxq：竞争队列，所有请求锁的线程首先会被放在这个队列中(单向链接)。\_cxq 是一个临界资
   源，JVM 通过 CAS 原子指令来修改\_cxq 队列。修改前\_cxq 的旧值填入了 Node.js 的 next 字段，\_cxq 指
   向新值(新线程)。因此\_cxq 是一个后进先出的 stack(栈)。
3. \_EntryList：\_cxq 队列中有资格成为候选资源的线程会被移动到该队列中。
4. \_WaitSet：因为调用 wait 方法而被阻塞的线程会被放在该队列中。

每一个 Java 对象都可以与一个监视器 monitor 关联，我们可以把它理解成为一把锁，当一个线程想要执
行一段被 synchronized 圈起来的同步方法或者代码块时，该线程得先获取到 synchronized 修饰的对象
对应的 monitor。

我们的 Java 代码里不会显示地去创造这么一个 monitor 对象，我们也无需创建，事实上可以这么理解：
monitor 并不是随着对象创建而创建的。我们是通过 synchronized 修饰符告诉 JVM 需要为我们的某个对
象创建关联的 monitor 对象。每个线程都存在两个 ObjectMonitor 对象列表，分别为 free 和 used 列表。
同时 JVM 中也维护着 global locklist。当线程需要 ObjectMonitor 对象时，首先从线程自身的 free 表中申
请，若存在则使用，若不存在则从 global list 中申请。

ObjectMonitor 的数据结构中包含：\_owner、\_WaitSet 和\_EntryList，它们之间的关系转换可以用下图
表示：

![](./img/5-2-1.png)

### monitor 竞争

1. 执行 monitorenter 时，会调用 InterpreterRuntime.cpp
   (位于：src/share/vm/interpreter/interpreterRuntime.cpp) 的 InterpreterRuntime::monitorenter 函
   数。具体代码可参见 HotSpot 源码。

```C
IRT_ENTRY_NO_ASYNC(void， InterpreterRuntime::monitorenter(JavaThread* thread，
BasicObjectLock* elem)) #ifdef ASSERT thread->last_frame().interpreter_frame_verify_monitor(elem); #endif
if (PrintBiasedLockingStatistics) {
Atomic::inc(BiasedLocking::slow_path_entry_count_addr());
}
Handle h_obj(thread， elem->obj());
assert(Universe::heap()->is_in_reserved_or_null(h_obj())，
"must be NULL or an object");
if (UseBiasedLocking) {
// Retry fast entry if bias is revoked to avoid unnecessary inflation
ObjectSynchronizer::fast_enter(h_obj， elem->lock()， true， CHECK);
} else {
ObjectSynchronizer::slow_enter(h_obj， elem->lock()， CHECK);
}
assert(Universe::heap()->is_in_reserved_or_null(elem->obj())，
"must be NULL or an object");
```

2.对于重量级锁，monitorenter 函数中会调用 ObjectSynchronizer::slow_enter

3.最终调用 ObjectMonitor::enter(位于：src/share/vm/runtime/objectMonitor.cpp)，源码如下：

```C
void ATTR ObjectMonitor::enter(TRAPS) {
// The following code is ordered to check the most common cases first
// and to reduce RTS->RTO cache line upgrades on SPARC and IA32 processors.
Thread * const Self = THREAD ;
void * cur ;
// 通过CAS操作尝试把monitor的_owner字段设置为当前线程
cur = Atomic::cmpxchg_ptr (Self， &_owner， NULL) ;
if (cur == NULL) {
// Either ASSERT _recursions == 0 or explicitly set _recursions = 0.
assert (_recursions == 0 ， "invariant") ;
assert (_owner == Self， "invariant") ;
// CONSIDER: set or assert OwnerIsThread == 1
return ;
}
// 线程重入，recursions++
if (cur == Self) {
// TODO-FIXME: check for integer overflow! BUGID 6557169.
_recursions ++ ;
return ;
}
// 如果当前线程是第一次进入该monitor，设置_recursions为1，_owner为当前线程
if (Self->is_lock_owned ((address)cur)) {
assert (_recursions == 0， "internal state error");
_recursions = 1 ;
// Commute owner from a thread-specific on-stack BasicLockObject address to
// a full-fledged "Thread *".
_owner = Self ;
OwnerIsThread = 1 ;
return ;
}
// 省略一些代码
for (;;) {
jt->set_suspend_equivalent();
// cleared by handle_special_suspend_equivalent_condition()
// or java_suspend_self()
// 如果获取锁失败，则等待锁的释放；
EnterI (THREAD) ;
if (!ExitSuspendEquivalent(jt)) break ;
//
// We have acquired the contended monitor， but while we were
// waiting another thread suspended us. We don't want to enter
// the monitor while suspended because that would surprise the
// thread that suspended us.
//
_recursions = 0 ;
_succ = NULL ;
exit (false， Self) ;
jt->java_suspend_self();
}
Self->set_current_pending_monitor(NULL);
}
```

此处省略锁的自旋优化等操作，统一放在后面 synchronzied 优化中说。
以上代码的具体流程概括如下：

1. 通过 CAS 尝试把 monitor 的 owner 字段设置为当前线程。
2. 如果设置之前的 owner 指向当前线程，说明当前线程再次进入 monitor，即重入锁，执行
   recursions ++ ，记录重入的次数。
3. 如果当前线程是第一次进入该 monitor，设置 recursions 为 1，\_owner 为当前线程，该线程成功获
   得锁并返回。
4. 如果获取锁失败，则等待锁的释放。

### monitor 等待

竞争失败等待调用的是 ObjectMonitor 对象的 EnterI 方法（位于：
src/share/vm/runtime/objectMonitor.cpp），源码如下所示：

```C
void ATTR ObjectMonitor::EnterI (TRAPS) {
Thread * Self = THREAD ;
// Try the lock - TATAS
if (TryLock (Self) > 0) {
assert (_succ != Self , "invariant") ;
assert (_owner == Self , "invariant") ;
assert (_Responsible != Self , "invariant") ;
return ;
}
if (TrySpin (Self) > 0) {
assert (_owner == Self , "invariant") ;
assert (_succ != Self , "invariant") ;
assert (_Responsible != Self , "invariant") ;
return ;
}
// 省略部分代码
// 当前线程被封装成ObjectWaiter对象node，状态设置成ObjectWaiter::TS_CXQ；
ObjectWaiter node(Self) ;
Self->_ParkEvent->reset() ;
node._prev = (ObjectWaiter *) 0xBAD ;
node.TState = ObjectWaiter::TS_CXQ ;
// 通过CAS把node节点push到_cxq列表中
ObjectWaiter * nxt ;
for (;;) {
node._next = nxt = _cxq ;
if (Atomic::cmpxchg_ptr (&node， &_cxq， nxt) == nxt) break ;
// Interference - the CAS failed because _cxq changed. Just retry.
// As an optional optimization we retry the lock.
if (TryLock (Self) > 0) {
assert (_succ != Self ， "invariant") ;
assert (_owner == Self ， "invariant") ;
assert (_Responsible != Self ， "invariant") ;
return ;
}
}
// 省略部分代码
for (;;) {
// 线程在被挂起前做一下挣扎，看能不能获取到锁
if (TryLock (Self) > 0) break ;
assert (_owner != Self， "invariant") ;
if ((SyncFlags & 2) && _Responsible == NULL) {
Atomic::cmpxchg_ptr (Self， &_Responsible， NULL) ;
}

// 通过park将当前线程挂起，等待被唤醒
Self->_ParkEvent->park() ;
}
if (TryLock(Self) > 0) break ;
// 省略部分代码
}
// 省略部分代码
}
```

当该线程被唤醒时，会从挂起的点继续执行，通过 ObjectMonitor::TryLock 尝试获取锁，TryLock 方
法实现如下：

```C
    int ObjectMonitor::

    TryLock(Thread *Self) {
        for (; ; ) {
            void *own = _owner;
            if (own != NULL) return 0;
            if (Atomic::cmpxchg_ptr (Self， &_owner，NULL) ==NULL){
// Either guarantee _recursions == 0 or set _recursions = 0.
                assert (_recursions == 0，"invariant");
                assert (_owner == Self，"invariant");
// CONSIDER: set or assert that OwnerIsThread == 1
                return 1;
    }
}
```

以上代码的具体流程概括如下：

1. 当前线程被封装成 ObjectWaiter 对象 node，状态设置成 ObjectWaiter::TS_CXQ。
2. 在 for 循环中，通过 CAS 把 Node.js 节点 push 到\_cxq 列表中，同一时刻可能有多个线程把自己的 node
   节点 push 到\_cxq 列表中。
3. Node.js 节点 push 到\_cxq 列表之后，通过自旋尝试获取锁，如果还是没有获取到锁，则通过 park 将当
   前线程挂起，等待被唤醒。
4. 当该线程被唤醒时，会从挂起的点继续执行，通过 ObjectMonitor::TryLock 尝试获取锁。

### monitor 释放

当某个持有锁的线程执行完同步代码块时，会进行锁的释放，给其它线程机会执行同步代码，在
HotSpot 中，通过退出 monitor 的方式实现锁的释放，并通知被阻塞的线程，具体实现位于
ObjectMonitor 的 exit 方法中。(位于：src/share/vm/runtime/objectMonitor.cpp)，源码如下所
示：

```C
void ATTR ObjectMonitor::exit(bool not_suspended， TRAPS) {
void ATTR ObjectMonitor::exit(bool not_suspended， TRAPS) {
        Thread * Self = THREAD ;
// 省略部分代码
        if (_recursions != 0) {
        _recursions--; // this is simple recursive enter
        TEVENT (Inflated exit - recursive) ;
        return ;
        }
// 省略部分代码
        ObjectWaiter * w = NULL ;
        int QMode = Knob_QMode ;
// qmode = 2：直接绕过EntryList队列，从cxq队列中获取线程用于竞争锁
        if (QMode == 2 && _cxq != NULL) {
        w = _cxq ;
        assert (w != NULL， "invariant") ;
        assert (w->TState == ObjectWaiter::TS_CXQ， "Invariant") ;
        ExitEpilog (Self， w) ;
        return ;
        }
// qmode =3：cxq队列插入EntryList尾部；
        if (QMode == 3 && _cxq != NULL) {
        w = _cxq ;
        for (;;) {
        assert (w != NULL， "Invariant") ;
        ObjectWaiter * u = (ObjectWaiter *) Atomic::cmpxchg_ptr (NULL，
        &_cxq， w) ;
        if (u == w) break ;
        w = u ;
        }
        assert (w != NULL ， "invariant") ;
        ObjectWaiter * q = NULL ;
        ObjectWaiter * p ;
        for (p = w ; p != NULL ; p = p->_next) {
        guarantee (p->TState == ObjectWaiter::TS_CXQ， "Invariant") ;
        p->TState = ObjectWaiter::TS_ENTER ;
        p->_prev = q ;
        q = p ;
        }
        ObjectWaiter * Tail ;
        for (Tail = _EntryList ; Tail != NULL && Tail->_next != NULL ; Tail =
        Tail->_next) ;
        if (Tail == NULL) {
        _EntryList = w ;
        } else {
        Tail->_next = w ;
        w->_prev = Tail ;
        }
        }
// qmode =4：cxq队列插入到_EntryList头部
        if (QMode == 4 && _cxq != NULL) {
        w = _cxq ;
        for (;;) {
        assert (w != NULL， "Invariant") ;
        ObjectWaiter * u = (ObjectWaiter *) Atomic::cmpxchg_ptr (NULL，
        &_cxq， w) ;
        if (u == w) break ;
        w = u ;
        }
        assert (w != NULL ， "invariant") ;
        ObjectWaiter * q = NULL ;
        ObjectWaiter * p ;
        for (p = w ; p != NULL ; p = p->_next) {
        guarantee (p->TState == ObjectWaiter::TS_CXQ， "Invariant") ;
        p->TState = ObjectWaiter::TS_ENTER ;
        p->_prev = q ;
        q = p ;
        }
        if (_EntryList != NULL) {
        q->_next = _EntryList ;
        _EntryList->_prev = q ;
        }
        _EntryList = w ;
        }
        w = _EntryList ;
        if (w != NULL) {
        assert (w->TState == ObjectWaiter::TS_ENTER， "invariant") ;
        ExitEpilog (Self， w) ;
        return ;
        }
        w = _cxq ;
        if (w == NULL) continue ;
        for (;;) {
        assert (w != NULL， "Invariant") ;
        ObjectWaiter * u = (ObjectWaiter *) Atomic::cmpxchg_ptr (NULL， &_cxq，
        w) ;
        if (u == w) break ;
        w = u ;
        }
        TEVENT (Inflated exit - drain cxq into EntryList) ;
        assert (w != NULL ， "invariant") ;
        assert (_EntryList == NULL ， "invariant") ;
        if (QMode == 1) {
// QMode == 1 : drain cxq to EntryList， reversing order
// We also reverse the order of the list.
        ObjectWaiter * s = NULL ;
        ObjectWaiter * t = w ;
        ObjectWaiter * u = NULL ;
        while (t != NULL) {
        guarantee (t->TState == ObjectWaiter::TS_CXQ， "invariant") ;
        t->TState = ObjectWaiter::TS_ENTER ;
        u = t->_next ;
        t->_prev = u ;
        t->_next = s ;
        s = t;
        t = u ;
        }
        _EntryList = s ;
        assert (s != NULL， "invariant") ;
```

1. 退出同步代码块时会让\_recursions 减 1，当\_recursions 的值减为 0 时，说明线程释放了锁。
2. 根据不同的策略(由 QMode 指定)，从 cxq 或 EntryList 中获取头节点，通过
   ObjectMonitor::ExitEpilog 方法唤醒该节点封装的线程，唤醒操作最终由 unpark 完成，实现
   如下：

```C
} else {
// QMode == 0 or QMode == 2
_EntryList = w ;
ObjectWaiter * q = NULL ;
ObjectWaiter * p ;
for (p = w ; p != NULL ; p = p->_next) {
guarantee (p->TState == ObjectWaiter::TS_CXQ， "Invariant") ;
p->TState = ObjectWaiter::TS_ENTER ;
p->_prev = q ;
q = p ;
}
}
if (_succ != NULL) continue;
w = _EntryList ;
if (w != NULL) {
guarantee (w->TState == ObjectWaiter::TS_ENTER， "invariant") ;
ExitEpilog (Self， w) ;
return ;
}
}
}
void ObjectMonitor::ExitEpilog (Thread * Self， ObjectWaiter * Wakee) {
assert (_owner == Self， "invariant") ;
_succ = Knob_SuccEnabled ? Wakee->_thread : NULL ;
ParkEvent * Trigger = Wakee->_event ;
Wakee = NULL ;
// Drop the lock
OrderAccess::release_store_ptr (&_owner， NULL) ;
OrderAccess::fence() ; // ST _owner vs LD in
unpark()
if (SafepointSynchronize::do_call_back()) {
TEVENT (unpark before SAFEPOINT) ;
}
DTRACE_MONITOR_PROBE(contended__exit， this， object()， Self);
Trigger->unpark() ; // 唤醒之前被pack()挂起的线程.
// Maintain stats and report events to JVMTI
if (ObjectMonitor::_sync_Parks != NULL) {
ObjectMonitor::_sync_Parks->inc() ;
}
}
```

被唤醒的线程，会回到 void ATTR ObjectMonitor::EnterI (TRAPS) 的第 600 行，继续执行 monitor
的竞争。

```C
// park self
if (_Responsible == Self || (SyncFlags & 1)) {
TEVENT (Inflated enter - park TIMED) ;
Self->_ParkEvent->park ((jlong) RecheckInterval) ;
// Increase the RecheckInterval， but clamp the value.
RecheckInterval *= 8 ;
if (RecheckInterval > 1000) RecheckInterval = 1000 ;
} else {
TEVENT (Inflated enter - park UNTIMED) ;
// The lock had been free momentarily， but we lost the race to the lock.
// Interference -- the CAS failed.
// We can either return -1 or retry.
// Retry doesn't make as much sense because the lock was just acquired.
if (true) return -1 ;
}
}
```

### monitor 是重量级锁

可以看到 ObjectMonitor 的函数调用中会涉及到 Atomic::cmpxchg_ptr，Atomic::inc_ptr 等内核函数， 执行同步代码块，没有竞争到锁的对象会 park()被挂起，竞争到锁的线程会 unpark()唤醒。

这个时候就 会存在操作系统用户态和内核态的转换，这种切换会消耗大量的系统资源。

所以 synchronized 是 Java 语 言中是一个重量级(Heavyweight)的操作。

#### 用户态和和内核态

用户态和和内核态是什么东西呢？要想了解用户态和内核态还需要先了解一下 Linux 系统的体系架构：

![](./img/5-2-2.png)

从上图可以看出，Linux 操作系统的体系架构分为：用户空间(应用程序的活动空间)和内核。

内核：本质上可以理解为一种软件，控制计算机的硬件资源，并提供上层应用程序运行的环境。

用户空间：上层应用程序活动的空间。应用程序的执行必须依托于内核提供的资源，包括 CPU 资源、存
储资源、I/O 资源等。

系统调用：为了使上层应用能够访问到这些资源，内核必须为上层应用提供访问的接口：即系统调用。

所有进程初始都运行于用户空间，此时即为用户运行状态(简称：用户态)；但是当它调用系统调用执
行某些操作时，例如 I/O 调用，此时需要陷入内核中运行，我们就称进程处于内核运行态（或简称为内
核态）。 系统调用的过程可以简单理解为：

1. 用户态程序将一些数据值放在寄存器中， 或者使用参数创建一个堆栈， 以此表明需要操作系统提
   供的服务。
2. 用户态程序执行系统调用。
3. CPU 切换到内核态，并跳到位于内存指定位置的指令。
4. 系统调用处理器(system call handler)会读取程序放入内存的数据参数，并执行程序请求的服务。
5. 系统调用完成后，操作系统会重置 CPU 为用户态并返回系统调用的结果。

由此可见用户态切换至内核态需要传递许多变量，同时内核还需要保护好用户态在切换时的一些寄存器
值、变量等，以备内核态切换回用户态。这种切换就带来了大量的系统资源消耗，这就是在
synchronized 未优化之前，效率低的原因。

# 六、JDK6 synchronized 优化

## CAS

- [ ] 学习 CAS 的作用
- [ ] 学习 CAS 的原理

### 概念

CAS 的全成是： Compare And Swap(比较相同再交换)。是现代 CPU 广泛支持的一种对内存中的共享数
据进行操作的一种特殊指令。

CAS 的作用：CAS 可以将比较和交换转换为原子操作，这个原子操作直接由 CPU 保证。CAS 可以保证共 享变量赋值时的原子操作。

CAS 操作依赖 3 个值：内存中的值 V，旧的预估值 X，要修改的新值 B，如果旧 的预估值 X 等于内存中的值 V，就将新的值 B 保存到内存中。

### CAS 和 volatile 实现无锁并发

```java
package com.itheima.demo05_cas;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;
public class Demo01 {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger atomicInteger = new AtomicInteger();
        Runnable mr = () -> {
            for (int i = 0; i < 1000; i++) {
                atomicInteger.incrementAndGet();
            }
        };
        ArrayList<Thread> ts = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Thread t = new Thread(mr);
            t.start();
            ts.add(t);
        }
        for (Thread t : ts) {
            t.join();
        }
        System.out.println("number = " + atomicInteger.get());
    }
}
```

### CAS 原理

通过刚才 AtomicInteger 的源码我们可以看到，Unsafe 类提供了原子操作。

#### Unsafe 类介绍

Unsafe 类使 Java 拥有了像 C 语言的指针一样操作内存空间的能力，同时也带来了指针的问题。过度的使
用 Unsafe 类会使得出错的几率变大，因此 Java 官方并不建议使用的，官方文档也几乎没有。Unsafe 对
象不能直接调用，只能通过反射获得。

![](./img/6-1-1.png)

#### Unsafe 实现 CAS

![](./img/6-1-2.png)

#### 乐观锁和悲观锁

**悲观锁**从悲观的角度出发：

总是假设最坏的情况，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这 样别人想拿这个数据就会阻塞。因此 synchronized 我们也将其称之为悲观锁。JDK 中的 ReentrantLock 也是一种悲观锁。性能较差！

**乐观锁**从乐观的角度出发:

总是假设最好的情况，每次去拿数据的时候都认为别人不会修改，就算改了也没关系，再重试即可。所 以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去修改这个数据，如何没有人修改则更 新，如果有人修改则重试。

CAS 这种机制我们也可以将其称之为乐观锁。综合性能较好！

> CAS 获取共享变量时，为了保证该变量的可见性，需要使用 volatile 修饰。结合 CAS 和 volatile 可以
> 实现无锁并发，适用于竞争不激烈、多核 CPU 的场景下。

1. 因为没有使用 synchronized，所以线程不会陷入阻塞，这是效率提升的因素之一。
2. 但如果竞争激烈，可以想到重试必然频繁发生，反而效率会受影响。

::: tip 总结

CAS 的作用： Compare And Swap，CAS 可以将比较和交换转换为原子操作，这个原子操作直接由处理 器保证。

CAS 的原理： CAS 需要 3 个值:内存地址 V，旧的预期值 A，要修改的新值 B，如果内存地址 V 和旧的预期值 A 相等就修改内存地址值为 B

:::

## synchronized 锁升级过程

高效并发是从 JDK 5 到 JDK 6 的一个重要改进，HotSpot 虛拟机开发团队在这个版本上花费了大量的精力 去实现各种锁优化技术，包括偏向锁( Biased Locking )、轻量级锁( Lightweight Locking )和如适应性 自旋(Adaptive Spinning)、锁消除( Lock Elimination)、锁粗化( Lock Coarsening )等，这些技术都是为 了在线程之间更高效地共享数据，以及解决竞争问题，从而提高程序的执行效率。

无锁--》偏向锁--》轻量级锁–》重量级锁

## Java 对象的布局

学习 Java 对象的布局

术语参考: <http://openjdk.java.net/groups/hotspot/docs/HotSpotGlossary.HTML>

在 JVM 中，对象在内存中的布局分为三块区域：对象头、实例数据和对齐填充。如下图所示：

![](./img/6-3-1.png)

### 对象头

当一个线程尝试访问 synchronized 修饰的代码块时，它首先要获得锁，那么这个锁到底存在哪里呢？

是 存在锁对象的对象头中的。

HotSpot 采用 instanceOopDesc 和 arrayOopDesc 来描述对象头，arrayOopDesc 对象用来描述数组类
型。InstanceOopDesc 的定义的在 Hotspot 源码的 instanceOop.hpp 文件中，另外，arrayOopDesc
的定义对应 arrayOop.hpp 。

```C
class instanceOopDesc : public oopDesc {
public:
// aligned header size.
static int header_size() { return sizeof(instanceOopDesc)/HeapWordSize; }
// If compressed, the offset of the fields of the instance may not be aligned.
static int base_offset_in_bytes() {
// offset computation code breaks if UseCompressedClassPointers
// only is true
        return (UseCompressedOops && UseCompressedClassPointers) ?
        klass_gap_offset_in_bytes() :
        sizeof(instanceOopDesc);
        }
static bool contains_field_offset(int offset, int nonstatic_field_size) {
        int base_in_bytes = base_offset_in_bytes();
        return (offset >= base_in_bytes &&
        (offset-base_in_bytes) < nonstatic_field_size * heapOopSize);
        }
        };
```

从 instanceOopDesc 代码中可以看到 instanceOopDesc 继承自 oopDesc，oopDesc 的定义载 Hotspot
源码中的 oop.hpp 文件中。

```C
class oopDesc {
    friend class VMStructs;
    private:
    volatile markOop _mark;
    union _metadata {
        Klass* _klass;
        narrowKlass _compressed_klass;
    } _metadata;
// Fast access to barrier set. Must be initialized.
    static BarrierSet* _bs;
// 省略其他代码
};
```

![](./img/6-3-2.png)

在普通实例对象中，oopDesc 的定义包含两个成员，分别是 _mark 和 _metadata

_mark 表示对象标记、属于 markOop 类型，也就是接下来要讲解的 Mark World，它记录了对象和锁有
关的信息

_metadata 表示类元信息，类元信息存储的是对象指向它的类元数据(Klass)的首地址，其中 Klass 表示
普通指针、 _compressed_klass 表示压缩类指针。

::: info 小结

对象头由两部分组成，一部分用于存储自身的运行时数据，称之为 Mark Word，另外一部分是类型指
针，及对象指向它的类元数据的指针。

:::

#### Mark Word

Mark Word 用于存储对象自身的运行时数据，如哈希码(HashCode)、GC 分代年龄、锁状态标志、 线程持有的锁、偏向线程 ID、偏向时间戳等等，占用内存大小与虚拟机位长一致。Mark Word 对应的类 型是 markOop 。源码位于 markOop.hpp 中。

```C
// Bit-format of an object header (most significant first, big endian layout
below):
//
// 32 bits:
// --------
// hash:25 ------------>| age:4 biased_lock:1 lock:2 (normal
object)
// JavaThread*:23 epoch:2 age:4 biased_lock:1 lock:2 (biased
object)
// size:32 ------------------------------------------>| (CMS free
block)
// PromotedObject*:29 ---------->| promo_bits:3 ----->| (CMS
promoted object)
//
// 64 bits:
// --------
// unused:25 hash:31 -->| unused:1 age:4 biased_lock:1 lock:2 (normal
object)
// JavaThread*:54 epoch:2 unused:1 age:4 biased_lock:1 lock:2 (biased
object)
// PromotedObject*:61 --------------------->| promo_bits:3 ----->| (CMS
promoted object)
// size:64 ----------------------------------------------------->| (CMS free
block)
// [JavaThread* | epoch | age | 1 | 01] lock is biased toward given
thread
// [0 | epoch | age | 1 | 01] lock is anonymously biased
//
// - the two lock bits are used to describe three states: locked/unlocked and
monitor.
//
// [ptr | 00] locked ptr points to real header on
stack
// [header | 0 | 01] unlocked regular object header
// [ptr | 10] monitor inflated lock (header is wapped
out)
// [ptr | 11] marked used by markSweep to mark an
object
// not valid at any other time
```

![](./img/6-3-3.png)

在 64 位虚拟机下，Mark Word 是 64bit 大小的，其存储结构如下：

![](./img/6-3-4.png)

在 32 位虚拟机下，Mark Word 是 32bit 大小的，其存储结构如下：

![](./img/6-3-5.png)

#### klass pointer

这一部分用于存储对象的类型指针，该指针指向它的类元数据，JVM 通过这个指针确定对象是哪个类的 实例。

该指针的位长度为 JVM 的一个字大小，即 32 位的 JVM 为 32 位，64 位的 JVM 为 64 位。 

如果应用的对 象过多，使用 64 位的指针将浪费大量内存，统计而言，64 位的 JVM 将会比 32 位的 JVM 多耗费 50%的内 存。为了节约内存可以使用选项 -XX:+UseCompressedOops 开启指针压缩，其中，oop 即 ordinary object pointer 普通对象指针。开启该选项后，下列指针将压缩至 32 位：

1. 每个 Class 的属性指针(即静态变量)
2. 每个对象的属性指针(即对象变量)
3. 普通对象数组的每个元素指针

当然，也不是所有的指针都会压缩，一些特殊类型的指针 JVM 不会优化，比如指向 PermGen 的 Class 对 象指针(JDK8 中指向元空间的 Class 对象指针)、本地变量、堆栈元素、入参、返回值和 NULL 指针等。 对象头 = Mark Word + 类型指针(未开启指针压缩的情况下)

在 32 位系统中，Mark Word = 4 bytes，类型指针 = 4bytes，对象头 = 8 bytes = 64 bits；
在 64 位系统中，Mark Word = 8 bytes，类型指针 = 8bytes，对象头 = 16 bytes = 128bits；

### 实例数据

就是类中定义的成员变量。

### 对齐填充

对齐填充并不是必然存在的，也没有什么特别的意义，他仅仅起着占位符的作用。

由于HotSpot-VM的自动内存管理系统要求对象起始地址必须是8字节的整数倍，换句话说，就是对象的大小必须是8字节的整数倍。而对象头正好是8字节的倍数，因此，当对象实例数据部分没有对齐时，就需要通过对齐填充来补全。

### 查看 Java 对象布局

```xml
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.9</version>
</dependency>
```

::: tip 总结

Java 对象由 3 部分组成，对象头，实例数据，对齐数据

对象头分成两部分：Mark World + Klass pointer

:::

## 偏向锁

学习偏向锁的原理和好处

### 什么是偏向锁

偏向锁是 JDK 6 中的重要引进，因为 HotSpot 作者经过研究实践发现，在大多数情况下，锁不仅不存在多 线程竞争，而且总是由同一线程多次获得，为了让线程获得锁的代价更低，引进了偏向锁。

偏向锁的“偏”，就是偏心的“偏”、偏袒的“偏”，它的意思是这个锁会偏向于第一个获得它的线程，会在对 象头存储锁偏向的线程 ID，以后该线程进入和退出同步块时只需要检查是否为偏向锁、锁标志位以及 ThreadID 即可。

![](./img/6-4-1.png)

不过一旦出现多个线程竞争时必须撤销偏向锁，所以撤销偏向锁消耗的性能必须小于之前节省下来的 CAS 原子操作的性能消耗，不然就得不偿失了。

### 偏向锁原理

当线程第一次访问同步块并获取锁时，偏向锁处理流程如下：

> 1. 虚拟机将会把对象头中的标志位设为“01”，即偏向模式。
> 2. 同时使用 CAS 操作把获取到这个锁的线程的 ID 记录在对象的 Mark Word 之中 ，如果 CAS 操作成功，持有偏向锁的线程以后每次进入这个锁相关的同步块时，虚拟机都可以不再进行任何同步操作，偏向锁的效率高。

![](./img/6-4-2.png)

持有偏向锁的线程以后每次进入这个锁相关的同步块时，虚拟机都可以不再进行任何同步操作，偏向锁 的效率高。

### 偏向锁的撤销

1. 偏向锁的撤销动作必须等待全局安全点
2. 暂停拥有偏向锁的线程，判断锁对象是否处于被锁定状态
3. 撤销偏向锁，恢复到无锁(标志位为 01)或轻量级锁(标志位为 00)的状态

偏向锁在 Java 6 之后是默认启用的，但在应用程序启动几秒钟之后才激活，可以使用 -

`XX:BiasedLockingStartupDelay=0` 参数关闭延迟，如果确定应用程序中所有锁通常情况下处于竞争 状态，可以通过 `XX:-UseBiasedLocking=false` 参数关闭偏向锁。

### 偏向锁好处

偏向锁是在只有一个线程执行同步块时进一步提高性能，适用于一个线程反复获得同一锁的情况。偏向 锁可以提高带有同步但无竞争的程序性能。

它同样是一个带有效益权衡性质的优化，也就是说，它并不一定总是对程序运行有利，如果程序中大多 数的锁总是被多个不同的线程访问比如线程池，那偏向模式就是多余的。

在 JDK5 中偏向锁默认是关闭的，而到了 JDK6 中偏向锁已经默认开启。

但在应用程序启动几秒钟之后才 激活，可以使用 `-XX:BiasedLockingStartupDelay=0` 参数关闭延迟，如果确定应用程序中所有锁通常 情况下处于竞争状态，可以通过 `XX:-UseBiasedLocking=false` 参数关闭偏向锁。

::: tip 总结

偏向锁的原理是什么?
偏向锁的好处是什么?

:::

## 轻量级锁

学习轻量级锁的原理和好处

### 什么是轻量级锁

轻量级锁是 JDK 6 之中加入的新型锁机制，它名字中的“轻量级”是相对于使用 monitor 的传统锁而言的， 因此传统的锁机制就称为“重量级”锁。

首先需要强调一点的是，轻量级锁并不是用来代替重量级锁的。 

引入轻量级锁的目的：在多线程交替执行同步块的情况下，尽量避免重量级锁引起的性能消耗，但是如 果多个线程在同一时刻进入临界区，会导致轻量级锁膨胀升级重量级锁，所以轻量级锁的出现并非是要 替代重量级锁。

### 轻量级锁原理

当关闭偏向锁功能或者多个线程竞争偏向锁导致偏向锁升级为轻量级锁，则会尝试获取轻量级锁，其步 骤如下： 

获取锁 当锁对象第一次被线程获取的时候，虚拟机将会把对象头中的标志位设为“01”，即偏向模式。同时使用 CAS 操 作把获取到这个锁的线程的 ID 记录在对象的 Mark Word 之中 ，如果 CAS 操作成功，持有偏向锁的线程以后每 次进入这个锁相关的同步块时，虚拟机都可以不再进行任何同步操作，偏向锁的效率高。 

偏向锁是在只有一个线程执行同步块时进一步提高性能，适用于一个线程反复获得同一锁的情况。

偏向锁可以 提高带有同步但无竞争的程序性能。

1. 判断当前对象是否处于无锁状态(hashcode、0、01)，如果是，则 JVM 首先将在当前线程的栈帧
   中建立一个名为锁记录(Lock Record)的空间，用于存储锁对象目前的 Mark Word 的拷贝（官方
   把这份拷贝加了一个 Displaced 前缀，即 Displaced Mark Word），将对象的 Mark Word 复制到栈
   帧中的 Lock Record 中，将 Lock Reocrd 中的 owner 指向当前对象。
2. JVM 利用 CAS 操作尝试将对象的 Mark Word 更新为指向 Lock Record 的指针，如果成功表示竞争到
   锁，则将锁标志位变成 00，执行同步操作。
3. 如果失败则判断当前对象的 Mark Word 是否指向当前线程的栈帧，如果是则表示当前线程已经持
   有当前对象的锁，则直接执行同步代码块；否则只能说明该锁对象已经被其他线程抢占了，这时轻
   量级锁需要膨胀为重量级锁，锁标志位变成 10，后面等待的线程将会进入阻塞状态。

![](./img/6-5-1.png)

![](./img/6-5-2.png)

### 轻量级锁的释放

轻量级锁的释放也是通过 CAS 操作来进行的，主要步骤如下：

> 1. 取出在获取轻量级锁保存在 Displaced Mark Word 中的数据。
> 2. 用 CAS 操作将取出的数据替换当前对象的 Mark Word 中，如果成功，则说明释放锁成功。
> 3. 如果 CAS 操作替换失败，说明有其他线程尝试获取该锁，则需要将轻量级锁需要膨胀升级为重量级
>    锁。

对于轻量级锁，其性能提升的依据是“对于绝大部分的锁，在整个生命周期内都是不会存在竞争的”，如 果打破这个依据则除了互斥的开销外，还有额外的 CAS 操作，因此在有多线程竞争的情况下，轻量级锁 比重量级锁更慢。

### 轻量级锁好处

在多线程交替执行同步块的情况下，可以避免重量级锁引起的性能消耗。

::: tip 总结

轻量级锁的原理是什么？

将对象的 Mark Word 复制到栈帧中的 Lock Recod 中。Mark Word 更新为指向 Lock Record 的指针。

轻量级锁好处是什么？

在多线程交替执行同步块的情况下，可以避免重量级锁引起的性能消耗。

:::

## 自旋锁

学习自旋锁原理

### 自旋锁原理

```java
synchronized (Demo01.class) {
...
System.out.println("aaa");
}
```

前面我们讨论 monitor 实现锁的时候，知道 monitor 会阻塞和唤醒线程，线程的阻塞和唤醒需要 CPU 从 用户态转为核心态，频繁的阻塞和唤醒对 CPU 来说是一件负担很重的工作，这些操作给系统的并发性能 带来了很大的压力。

同时，虚拟机的开发团队也注意到在许多应用上，共享数据的锁定状态只会持续很 短的一段时间，为了这段时间阻塞和唤醒线程并不值得。如果物理机器有一个以上的处理器，能让两个 或以上的线程同时并行执行，我们就可以让后面请求锁的那个线程“稍等一下”，但不放弃处理器的执行 时间，看看持有锁的线程是否很快就会释放锁。

为了让线程等待，我们只需让线程执行一个忙循环(自 旋) , 这项技术就是所谓的自旋锁。

自旋锁在 JDK 1.4.2 中就已经引入 ，只不过默认是关闭的，可以使用-XX:+UseSpinning 参数来开启，在 JDK 6 中 就已经改为默认开启了。

自旋等待不能代替阻塞，且先不说对处理器数量的要求，自旋等待本 身虽然避免了线程切换的开销，但它是要占用处理器时间的，因此，如果锁被占用的时间很短，自旋等 待的效果就会非常好，反之，如果锁被占用的时间很长。

那么自旋的线程只会白白消耗处理器资源，而 不会做任何有用的工作，反而会带来性 能上的浪费。

因此，自旋等待的时间必须要有一定的限度，如果 自旋超过了限定的次数仍然没有成功获得锁，就应当使用传统的方式去挂起线程了。

自旋次数的默认值 是 10 次，用户可以使用参数-XX : PreBlockSpin 来更改。

### 适应性自旋锁

在 JDK 6 中引入了自适应的自旋锁。自适应意味着自旋的时间不再固定了，而是由前一次在同一个锁上
的自旋时间及锁的拥有者的状态来决定。如果在同一个锁对象上，自旋等待刚刚成功获得过锁，并且持
有锁的线程正在运行中，那么虚拟机就会认为这次自旋也很有可能再次成功，进而它将允许自旋等待持
续相对更长的时间，比如 100 次循环。另外，如果对于某个锁，自旋很少成功获得过，那在以后要获取
这个锁时将可能省略掉自旋过程，以避免浪费处理器资源。有了自适应自旋，随着程序运行和性能监控
信息的不断完善，虚拟机对程序锁的状况预测就会越来越准确，虛拟机就会变得越来越“聪明”了。

## 锁消除

锁消除是指虚拟机即时编译器(JIT)在运行时，对一些代码上要求同步，但是被检测到不可能存在共享 数据竞争的锁进行消除。

锁消除的主要判定依据来源于逃逸分析的数据支持，如果判断在一段代码中， 堆上的所有数据都不会逃逸出去从而被其他线程访问到，那就可以把它们当做栈上数据对待，认为它们 是线程私有的，同步加锁自然就无须进行。

变量是否逃逸，对于虚拟机来说需要使用数据流分析来确 定，但是程序员自己应该是很清楚的，怎么会在明知道不存在数据争用的情况下要求同步呢?

实际上有 许多同步措施并不是程序员自己加入的，同步的代码在 Java 程序中的普遍程度也许超过了大部分读者的 想象。

下面这段非常简单的代码仅仅是输出 3 个字符串相加的结果，无论是源码字面上还是程序语义上 都没有同步。

```java
public class Demo01 {
    public static void main(String[] args) {
        contactString("aa", "bb", "cc");
    }

    public static String contactString(String s1, String s2, String s3) {
        return new StringBuffer().append(s1).append(s2).append(s3).toString();
    }
}
```

StringBuffer 的 append ( ) 是一个同步方法，锁就是 this 也就是(new StringBuilder())。

虚拟机发现它的 动态作用域被限制在 concatString( )方法内部。

也就是说, new StringBuilder()对象的引用永远不会“逃 逸”到 concatString ( )方法之外，其他线程无法访问到它，因此，虽然这里有锁，但是可以被安全地消除 掉，在即时编译之后，这段代码就会忽略掉所有的同步而直接执行了。

## 锁粗化

学习锁粗化的原理

原则上，我们在编写代码的时候，总是推荐将同步块的作用范围限制得尽量小，只在共享数据的实际作 用域中才进行同步，这样是为了使得需要同步的操作数量尽可能变小，如果存在锁竞争，那等待锁的线 程也能尽快拿到锁。

大部分情况下，上面的原则都是正确的，但是如果一系列的连续操作都对同一个对 象反复加锁和解锁，甚至加锁操作是出现在循环体中的，那即使没有线程竞争，频繁地进行互斥同步操 作也会导致不必要的性能损耗。

```java
public class Demo01 {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 100; i++) {
            sb.append("aa");
        }
        System.out.println(sb.toString());
    }
}
```

::: tip 总结

什么是锁粗化？

JVM 会探测到一连串细小的操作都使用同一个对象加锁，将同步代码块的范围放大，放到这串操作的外面，这样只需要加一次锁即可。

:::

## 平时写代码如何对 synchronized 优化

### 减少 synchronized 的范围

同步代码块中尽量短，减少同步代码块中代码的执行时间，减少锁的竞争。

```java
    synchronized (Demo01.class) {
        System.out.println("aaa");
    }
```

### 降低 synchronized 锁的粒度

将一个锁拆分为多个锁提高并发度

```java
Hashtable hs = new Hashtable();
hs.put("aa", "bb");
hs.put("xx", "yy");

```

![](./img/6-9-1.png)

![](./img/6-9-2.png)

![](./img/6-9-3.png)

LinkedBlockingQueue 入队和出队使用不同的锁，相对于读写只有一个锁效率要高

![](./img/6-9-4.png)

### 读写分离

**读取时不加锁，写入和删除时加锁**

ConcurrentHashMap，CopyOnWriteArrayList 和 ConyOnWriteSet