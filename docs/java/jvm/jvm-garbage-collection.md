---
title: jvm-gc
category: jvm
date: 2021-02-01
tag:
  - jvm
  - optimization
---

## 关于Java垃圾回收的简介

1. Java内存运行时区域的各个部分，其中程序计数器、虚拟机栈、本地方法栈三个区域随线程而生，随线程而灭；栈中的栈帧随着方法的进入和退出而有条不紊的执行着出栈和入栈操作。
2. 每一个栈帧中分配多少内存基本上是在类结构确定下来时就已知的，因此这几个区域的内存和回收都具确定性，如果垃圾不被回收，内存迟早会被消耗空，因为我们在不断的分配内存空间而不进行回收，除非内存无限大，我们可以任性的分配儿不回收。在这几个区域内不需要过多考虑回收的问题，因为方法结束或线程结束时，内存自然就跟随着回收了。
3. 而Java堆和方法区则不一样，一个接口中的多个实现类需要的内存可能不一样，一个方法中的多个分支需要的内存也可能不一样，我们只有在程序处于运行期间时才能知道会创建哪些对象，这部分内存的分配和回收都是动态的，垃圾收集器所关注的是这部分内存。

### Minor GC(young GC)

一般情况下，当新对象生成，并且在Eden申请空间失败时，就会触发Minor GC，对Eden区域进行GC，清除非存活对象，并且把尚且存活的对象移动到Survivor区。然后整理Survivor的两个区。

这种方式的GC是对年轻代的Eden区进行，不会影响到年老代。

因为大部分对象都是从Eden区开始的，同时Eden区不会分配的很大，所以Eden区的GC会频繁进行。因而，一般在这里需要使用速度快、效率高的算法，使Eden去能尽快空闲出来。

### Full GC

对整个堆进行整理，包括 `Young`、`Tenured` 和 `Perm`。Full GC 因为需要对整个堆进行回收，所以比Minor GC要慢，因此应该尽可能减少Full GC的次数。在对JVM调优的过程中，很大一部分工作就是对于FullGC的调节。有如下原因可能导致Full GC：

1. 年老代（`Tenured`）被写满
2. 持久代（`Perm`）被写满
3. `System.gc()`被显示调用
4. 上一次GC之后Heap的各域分配策略动态变化

## 判断哪些对象可以回收

所谓“要回收的垃圾”无非就是那些不可能再被任何途径使用的对象。那么如何找到这些对象？

### 引用计数法

当一个对象被引用时，就当引用对象的值加一，当值为0时，就表示该对象不被引用，可以被垃圾收集器回收。

这个引用计数法听起来不错，但是有一个弊端，循环引用时，两个对象的计数都为1，导致两个对象都无法被释放。

### 可达性分析算法

这个算法的基本思想是通过一系列称为“GCRoots”的对象作为起始点，从这些节点向下搜索，搜索所走过的路径称为引用链，当一个对象到GCRoots没有任何引用链(即GCRoots到对象不可达)时，则证明此对象是不可用的。

那么问题又来了，如何选取GCRoots对象呢？在Java语言中，可以作为GCRoots的对象包括下面几种：

- 虚拟机栈(栈帧中的本地变量表)中引用的对象。
- 方法区中类静态属性引用的对象
- 方法区中常量引用的对象
- 本地方法栈中JNI(即一般说的Native方法)引用的对象，JNI是Java Native Interface的缩写

```java
class T{
    public static void main(String[] args) throws IOException {
        ArrayList<Object> list = new ArrayList<>();
        list.add("a");
        list.add("b");
        list.add(1);
        System.out.println(1);
        System.in.read();
        list = null;
        System.out.println(2);
        System.in.read();
        System.out.println("end");
    }
}
```

对于以上代码，可以使用如下命令将堆内存信息转储成一个文件，然后使用 idea Memory Analyzer 工具进行分析。

使用步骤：

1. 使用 jps 命令，查看程序的进程
使用 jmap -dump:format=b,live,file=1.bin 16104 命令转储文件

- `dump`：转储文件
- `format` =b：二进制文件
- `file`：文件名
- `16104`：进程的 ID

3. 打开 Eclipse Memory Analyzer 对 1.bin 文件进行分析。

分析的 gc root，找到了 ArrayList 对象，然后将 list 置为 null，再次转储，那么 list 对象就会被回收。

### 四种引用

1. 强引用: 只有所有`GC Roots`对象都不通过【强引用】引用该对象，该对象才能被垃圾回收；
2. 软引用(`SoftReference`): 仅有软引用引用该对象时，在垃圾回收后，内存仍不足时会再次出发垃圾回收，回收软引用对象，可以配合引用队列来释放软引用自身；
3. 弱引用(`WeakReference`): 仅有弱引用引用该对象时，在垃圾回收时，无论内存是否充足，都会回收弱引用对象,可以配合引用队列来释放弱引用自身；
4. 虚引用(`PhantomReference`): 必须配合引用队列使用，主要配合`ByteBuffer`使用，被引用对象回收时，会将虚引用入队，由`Reference Handler`线程调用虚引用相关方法释放直接内存
5. 终结器引用(`FinalReference`)： 无需手动编码，但其内部配合引用队列使用，在垃圾回收时，终结器引用入队(被引用对象暂时没有被回收)，再由Finalizer线程通过终结器引用找到被引用对象并调用它的finalize方法，第二次GC时才能回收被引用对象。

## 垃圾回收算法

### 标记清除算法（引用计数算法）

它很难解决对象之间的相互循环引用的问题。

例如：对象objA和ObjB都有字段instance，赋值令标记-清除算法分为两个阶段：标记阶段和清除阶段。

标记阶段的任务是标记出所有需要被回收的对象，清除阶段就是回收被标记的对象所占用的空间。

[标记清除算法](./img/2-1.png)

这种回收算法会产生大量不连续的内存碎片，当要频繁分配一个大对象时，jvm在新生代中找不到足够大的连续的内存块，会导致jvm频繁进行内存回收(目前有机制，对大对象，直接分配到老年代中)

优点：利用率百分之百

缺点：标记和清除的效率都不高（比对复制算法），会产生大量的不连续的内存碎片；

### 复制算法

复制算法将可用内存按容量划分为两个大小相等的块，每次只使用其中的一块。

当这一块的内存用完了，就将还存活着的对象复制到另外一块内存中，然后把这块内存一次清理掉。这样做的效率比较高，也避免了内存碎片。但是这样内存的可使用空间减半，内存利用率低。内存空间的浪费

[复制算法](./img/2-2.png)

这种算法虽然实现简单，运行高效且不容易产生内存碎片，但是却对内存空间的使用做出了高昂的代价，因为能够使用的内存缩减到原来的一半。很显然，Copying 算法的效率跟存活对象的数目多少有很大的关系，如果存活对象很多，那么 Copying 算法的效率将会大大降低。

### 标记-整理算法(压缩法)

为了解决 `Copying` 算法的缺陷，充分利用内存空间，提出了 `Mark-Compact` 算法。该算法标记阶段和 `Mark-Sweep` 一样，但是在完成标记之后，它不是直接清理可回收对象，而是将存活对象都向一端移动，然后清理掉端边界以外的内存。具体过程如下图所示：

[压缩法](./img/2-3.png)

### 分代收集算法

当前商业虚拟机都采用这种算法。首先根据对象存活周期的不同将内存分为几块即新生代、老年代，然后根据不同年代的特点，采用不同的收集算法。

新生代: 每次垃圾收集都能发现大批对象已死, 只有少量存活。因此选用复制算法, 只需要付出少量存活对象的复制成本就可以完成。但是实际中并不是按照 1：1 的比例来划分新生代的空间的，一般来说是将新生代划分为一块较大的 `Eden` 空间和两块较小的 `Survivor` 空间，每次使用 `Eden` 空间和其中的一块 `Survivor` 空间，当进行回收时，将 `Eden` 和 `Survivor` 中还存活的对象复制到另一块 `Survivor` 空间中，然后清理掉 `Eden` 和刚才使用过的 `Survivor` 空间。

老年代: 是每次垃圾收集时只有少量对象需要被回收，一般使用的是标记-整理算法(压缩法)。

## 典型的垃圾收集器

## Serial 收集器

Serial 收集器是最基本的、发展历史最悠久的收集器

特点：单线程、简单高效（与其他收集器的单线程相比），采用复制算法。对于限定单个 CPU 的环境来说，Serial 收集器由于没有线程交互的开销，专心做垃圾收集自然可以获得最高的单线程收集效率。收集器进行垃圾回收时，必须暂停其他所有的工作线程，直到它结束（Stop The World）！

### ParNew 收集器

ParNew 收集器其实就是 Serial 收集器的多线程版本

特点：多线程、ParNew 收集器默认开启的收集线程数与CPU的数量相同，在 CPU 非常多的环境中，可以使用 -XX:ParallelGCThreads 参数来限制垃圾收集的线程数。和 Serial 收集器一样存在 Stop The World 问题

### CMS 收集器

`Concurrent Mark Sweep`，一种以获取最短回收停顿时间为目标的老年代收集器

特点：基于标记-清除算法实现。并发收集、低停顿，但是会产生内存碎片。

应用场景：适用于注重服务的响应速度，希望系统停顿时间最短，给用户带来更好的体验等场景下。

如 web 程序、b/s 服务

CMS 收集器的运行过程分为下列4步：

- 初始标记：标记GC-Roots能直接到的对象。速度很快但是仍存在STW问题。
- 并发标记：进行GC-Roots-Tracing的过程，找出存活对象且用户线程可并发执行。
- 重新标记：为了修正并发标记期间因用户程序继续运行而导致标记产生变动的那一部分对象的标记记录。仍然存在STW问题
- 并发清除：对标记的对象进行清除回收，清除的过程中，可能任然会有新的垃圾产生，这些垃圾就叫浮动垃圾，如果当用户需要存入一个很大的对象时，新生代放不下去，老年代由于浮动垃圾过多，就会退化为serialOld收集器，将老年代垃圾进行标记-整理，当然这也是很耗费时间的！

CMS 收集器的内存回收过程是与用户线程一起并发执行的，可以搭配 ParNew 收集器（多线程，新生代，复制算法）与 Serial Old 收集器（单线程，老年代，标记-整理算法）使用。

## G1 收集器

适用场景：

- 同时注重吞吐量和低延迟（响应时间）
- 超大堆内存（内存大的），会将堆内存划分为多个大小相等的区域，区域可能是Eden，也有可能是Survivor，也有可能是Old，另外Region中还有一类特殊的Humongous区域，专门用来存储大对象。
- 整体上是标记-整理算法，两个区域之间是复制算法

G1的运行过程与CMS大体一致，分为以下四个步骤：

- 初始标记(Initial Marking)：仅仅只是标记一下GC Roots能直接关联到的对象，并且修改TAMS指针的值，让下一阶段用户线程并发运行时，能正确地在可用的Region中分配新对象。这个阶段需要停顿线程，但耗时很短，而且是借用进行Minor GC的时候同步完成的，所以G1收集器在这个阶段实际并没有额外的停顿。
- 并发标记( Concurrent Marking)：从GC Root开始对堆中对象进行可达性分析，递归扫描整个堆里的对象图，找出要回收的对象，这阶段耗时较长，但可与用户程序并发执行。当对象图扫
描完成以后，并发时有引用变动的对象会产生漏标问题，G1中会使用SATB(snapshot-at-the-beginning)算法来解决，后面会详细介绍。
- 最终标记(Final Marking)：对用户线程做一个短暂的暂停，用于处理并发标记阶段仍遗留下来的最后那少量的SATB记录(漏标对象)。
- 筛选回收(Live Data Counting and Evacuation)：负责更新Region的统计数据，对各个Region的回收价值和成本进行排序，根据用户所期望的停顿时间来制定回收计划，可以自由选择任意多个Region构成回收集，然后把决定回收的那一部分Region的存活对象复制到空的Region中，再清理掉整个旧Region的全部空间。这里的操作涉及存活对象的移动，是必须暂停用户线程，由多个收集器线程并行完成的。

TAMS是什么？

要达到GC与用户线程并发运行，必须要解决回收过程中新对象的分配，所以G1为每一个Region区域设计了两个名为TAMS（Top at Mark Start）的指针，从Region区域划出一部分空间用于记录并发回收过程中的新对象。这样的对象认为它们是存活的，不纳入垃圾回收范围。

```bash
-XX:+UseG1GC
-XX:G1HeapRegionSize=size
-XX:MaxGCPauseMillis=time
```

Young Collection：对新生代垃圾收集

Young Collection + Concurrent Mark：如果老年代内存到达一定的阈值了，新生代垃圾收集同时会执行一些并发的标记。

Mixed Collection：会对新生代 + 老年代 + 幸存区等进行混合收集，然后收集结束，会重新进入新生代收集。

Young Collection

新生代存在 STW：

分代是按对象的生命周期划分，分区则是将堆空间划分连续几个不同小区间，每一个小区间独立回收，可以控制一次回收多少个小区间，方便控制 GC 产生的停顿时间！

E：eden，S：幸存区，O：老年代

新生代收集会产生STW！

[](./img/20210210122339138.gif)

Young Collection + CM

在 Young GC 时会进行 GC Root 的初始化标记

老年代占用堆空间比例达到阈值时，进行并发标记（不会STW），由下面的 JVM 参数决定 -XX:InitiatingHeapOccupancyPercent=percent （默认45%）

[](./img/20210210122601873.png)

Mixed Collection

会对 E S O 进行全面的回收

最终标记会STW

拷贝存活会STW

-XX:MaxGCPauseMills=xxms 用于指定最长的停顿时间！

问：为什么有的老年代被拷贝了，有的没拷贝？

因为指定了最大停顿时间，如果对所有老年代都进行回收，耗时可能过高。为了保证时间不超过设定的停顿时间，会回收最有价值的老年代（回收后，能够得到更多内存）

[](./img/20210210144216170.png)

Full GC

G1 在老年代内存不足时（老年代所占内存超过阈值）

如果垃圾产生速度慢于垃圾回收速度，不会触发 Full GC，还是并发地进行清理

如果垃圾产生速度快于垃圾回收速度，便会触发 Full GC，然后退化成 serial Old 收集器串行的收集，就会导致停顿的时候长。

## 新生代调优

新生代的特点所有的new操作分配内存都是非常廉价的

TLAB thread-local allocation buffer

死亡对象回收零代价

大部分对象用过即死（朝生夕死）

MinorGC所用时间远小于FullGC

新生代内存越大越好么？不是

新生代内存太小：频繁触发MinorGC，会`STW`，会使得吞吐量下降

新生代内存太大：老年代内存占比有所降低，会更频繁地触发FullGC。而且触发MinorGC时，清理新生代所花费的时间会更长

新生代内存设置为内容纳[并发量*(请求-响应)]的数据为宜

幸存区需要能够保存，当前活跃对象+需要晋升的对象

晋升阈值配置得当，让长时间存活的对象尽快晋升

```bash
-XX:MaxTenuringThreshold=threshold
-XX:+PrintTenuringDistrubution
```

## 老年代调优

以CMS为例：CMS的老年代内存越大越好

先尝试不做调优，如果没有FullGC，否者先尝试调优新生代。

观察发现FullGC时老年代内存占用，将老年代内存预设调大1/4~1/3

`-XX:CMSInitiatingOccupancyFraction=percent`

[JVM 学习笔记（二）垃圾回收](https://blog.csdn.net/weixin_50280576/article/details/113775575)


- `GC`：表示进行了一次Minor GC，即从年轻代空间(包括 Eden 和 Survivor 区域)回收内存
- Allocation Failure：在年轻代中没有足够的空间能够存储新的数据
- `Full GC` (Ergonomics)：表示进行了一次Full GC，即清理整个堆空间(包含年轻代和老年代)
- `PSYoungGen`: 1024K->1024K(1536K)：垃圾回收器是Paralle Scavenge，年轻代区GC前->GC后该区域已使用量，后面的1536表示该区域总量
- `ParOldGen`: 4032K->4032K(4096K)：老年代区，GC前->GC后该区域已使用量，后面的4096表示该区域总量
5056K->5056K(5632K)：GC前 -> GC后Java堆的使用量，后面的5632表示Java堆总量
- `Metaspace`: 3117K->3117K(1056768K)：JDK8中取消了永久代，新增了一个叫元空间(Metaspace)的区域，对应的还是JVM规范中的方法区(主要存放一些`class`和元数据的信息)，该数据表示该区GC前后使用量
