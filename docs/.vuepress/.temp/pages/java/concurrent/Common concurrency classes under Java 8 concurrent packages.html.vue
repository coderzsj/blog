<template><p>Java 8并发包下常见的并发类</p>
<h2 id="阻塞队列" tabindex="-1"><a class="header-anchor" href="#阻塞队列" aria-hidden="true">#</a> 阻塞队列：</h2>
<p><code>BlockingQueue</code>：阻塞队列接口</p>
<p><code>BlockingDeque</code>：双端阻塞队列接口</p>
<p><code>ArrayBlockingQueue</code>：阻塞队列，数组实现</p>
<p><code>LinkedBlockingDeque</code>：阻塞双端队列，链表实现</p>
<p><code>LinkedBlockingQueue</code>：阻塞队列，链表实现</p>
<p><code>DelayQueue</code>：阻塞队列，并且元素是 Delay 的子类，保证元素在达到一定时间后才可以取得到</p>
<p><code>PriorityBlockingQueue</code>：优先级阻塞队列</p>
<p><code>SynchronousQueue</code>：同步队列，但是队列长度为 0，生产者放入队列的操作会被阻塞，直到消费者过来取，所以这个队列根本不需要空间存放元素；有点像一个独木桥，一次只能一人通过，还不能在桥上停留</p>
<h2 id="非阻塞队列" tabindex="-1"><a class="header-anchor" href="#非阻塞队列" aria-hidden="true">#</a> 非阻塞队列：</h2>
<p><code>ConcurrentLinkedDeque</code>：非阻塞双端队列，链表实现</p>
<p><code>ConcurrentLinkedQueue</code>：非阻塞队列，链表实现</p>
<h2 id="转移队列" tabindex="-1"><a class="header-anchor" href="#转移队列" aria-hidden="true">#</a> 转移队列：</h2>
<p><code>TransferQueue</code>：转移队列接口，生产者要等消费者消费的队列，生产者尝试把元素直接转移给消费者</p>
<p><code>LinkedTransferQueue</code>：转移队列的链表实现，它比 SynchronousQueue 更快</p>
<h2 id="其它容器" tabindex="-1"><a class="header-anchor" href="#其它容器" aria-hidden="true">#</a> 其它容器：</h2>
<p><code>ConcurrentMap</code>：并发 Map 的接口，定义了 putIfAbsent(k,v)、remove(k,v)、replace(k,oldV,newV)、replace(k,v) 这四个并发场景下特定的方法</p>
<p><code>ConcurrentHashMap</code>：并发 HashMap</p>
<p><code>ConcurrentNavigableMap</code>：NavigableMap 的实现类，返回最接近的一个元素</p>
<p><code>ConcurrentSkipListMap</code>：它也是 NavigableMap 的实现类(要求元素之间可以比较)，同时它比 ConcurrentHashMap 更加 scalable——ConcurrentHashMap 并不保证它的操作时间，并且你可以自己来调整它的 load factor；但是 ConcurrentSkipListMap 可以保证 O(log n) 的性能，同时不能自己来调整它的并发参数，只有你确实需要快速的遍历操作，并且可以承受额外的插入开销的时候，才去使用它</p>
<p><code>ConcurrentSkipListSet</code>：和上面类似，只不过 map 变成了 set</p>
<p><code>CopyOnWriteArrayList</code>：copy-on-write 模式的 array list，每当需要插入元素，不在原 list 上操作，而是会新建立一个 list，适合读远远大于写并且写时间并苛刻的场景</p>
<p><code>CopyOnWriteArraySet</code>：和上面类似，list 变成 set 而已</p>
<h2 id="同步设备" tabindex="-1"><a class="header-anchor" href="#同步设备" aria-hidden="true">#</a> 同步设备</h2>
<p>这些类大部分都是帮助做线程之间同步的，简单描述，就像是提供了一个篱笆，线程执行到这个篱笆的时候都得等一等，等到条件满足以后再往后走。</p>
<p><code>CountDownLatch</code>：一个线程调用 await 方法以后，会阻塞地等待计数器被调用 countDown 直到变成 0，功能上和下面的 CyclicBarrier 有点像</p>
<p><code>CyclicBarrier</code>：也是计数等待，只不过它是利用 await 方法本身来实现计数器“+1” 的操作，一旦计数器上显示的数字达到 Barrier 可以打破的界限，就会抛出 BrokenBarrierException，线程就可以继续往下执行；请参见我写过的这篇文章 《同步、异步转化和任务执行》中的 Barrier 模式</p>
<p><code>Semaphore</code>：功能上很简单，acquire() 和 release() 两个方法，一个尝试获取许可，一个释放许可，Semaphore 构造方法提供了传入一个表示该信号量所具备的许可数量。</p>
<p><code>Exchanger</code>：这个类的实例就像是两列飞驰的火车(线程)之间开了一个神奇的小窗口，通过小窗口(exchange 方法)可以让两列火车安全地交换数据。</p>
<p><code>Phaser</code>：功能上和第 1、2 个差不多，但是可以重用，且更加灵活，稍微有点复杂(CountDownLatch 是不断-1，CyclicBarrier 是不断+1，而 Phaser 定义了两个概念，phase 和 party)，我在下面画了张图，希望能够帮助理解：</p>
<p>一个是 phase，表示当前在哪一个阶段，每碰到一次 barrier 就会触发 advance 操作(触发前调用 onAdvance 方法)，一旦越过这道 barrier 就会触发 phase+1，这很容易理解； 另一个是 party，很多文章说它就是线程数，但是其实这并不准确，它更像一个用于判断 advance 是否被允许发生的计数器： 任何时候都有一个 party 的总数，即注册(registered)的 party 数，它可以在 Phaser 构造器里指定，也可以任意时刻调用方法动态增减； 每一个 party 都有 unarrived 和 arrived 两种状态，可以通过调用 arriveXXX 方法使得它从 unarrived 变成 arrived； 每一个线程到达 barrier 后会等待(调用 arriveAndAwaitAdvance 方法)，一旦所有 party 都到达(即 arrived 的 party 数量等于 registered 的数量)，就会触发 advance 操作，同时 barrier 被打破，线程继续向下执行，party 重新变为 unarrived 状态，重新等待所有 party 的到达； 在绝大多数情况下一个线程就只负责操控一个 party 的到达，因此很多文章说 party 指的就是线程，但是这是不准确的，因为一个线程完全可以操控多个 party，只要它执行多次的 arrive 方法。</p>
<h2 id="原子对象" tabindex="-1"><a class="header-anchor" href="#原子对象" aria-hidden="true">#</a> 原子对象</h2>
<p>这些对象都的行为在不使用同步的情况下保证了原子性。值得一提的有两点：</p>
<p>weakCompareAndSet 方法：compareAndSet 方法很明确，但是这个是啥？根据 JSR 规范，调用 weakCompareAndSet 时并不能保证 happen-before 的一致性，因此允许存在重排序指令等等虚拟机优化导致这个操作失败(较弱的原子更新操作)，但是从 Java 源代码看，它的实现其实和 compareAndSet 是一模一样的；</p>
<p>lazySet 方法：延时设置变量值，这个等价于 set 方法，但是由于字段是 volatile 类型的，因此次字段的修改会比普通字段(非 volatile 字段)有稍微的性能损耗，所以如果不需要立即读取设置的新值，那么此方法就很有用。</p>
<p>AtomicBoolean.class</p>
<p>AtomicInteger.class</p>
<p>AtomicIntegerArray.class</p>
<p>AtomicIntegerFieldUpdater.class</p>
<p>AtomicLong.class</p>
<p>AtomicLongArray.class</p>
<p>AtomicLongFieldUpdater.class</p>
<p>AtomicMarkableReference.class，它是用来高效表述 Object-boolean 这样的对象标志位数据结构的，一个对象引用+一个 bit 标志位</p>
<p>AtomicReference.class</p>
<p>AtomicReferenceArray.class</p>
<p>AtomicReferenceFieldUpdater.class</p>
<p>AtomicStampedReference.class，它和前面的 AtomicMarkableReference 类似，但是它是用来高效表述 Object-int 这样的“ 对象+版本号” 数据结构，特别用于解决 ABA 问题(ABA 问题这篇文章里面也有介绍)</p>
<h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h2>
<p>AbstractOwnableSynchronizer.class，这三个 AbstractXXXSynchronizer 都是为了创建锁和相关的同步器而提供的基础，锁，还有前面提到的同步设备都借用了它们的实现逻辑</p>
<p>AbstractQueuedLongSynchronizer.class，AbstractOwnableSynchronizer 的子类，所有的同步状态都是用 long 变量来维护的，而不是 int，在需要 64 位的属性来表示状态的时候会很有用</p>
<p>AbstractQueuedSynchronizer.class，为实现依赖于先进先出队列的阻塞锁和相关同步器(信号量、事件等等)提供的一个框架，它依靠 int 值来表示状态</p>
<p>Lock.class，Lock 比 synchronized 关键字更灵活，而且在吞吐量大的时候效率更高，根据 JSR-133 的定义，它 happens-before 的语义和 synchronized 关键字效果是一模一样的，它唯一的缺点似乎是缺乏了从 lock 到 finally 块中 unlock 这样容易遗漏的固定使用搭配的约束，除了 lock 和 unlock 方法以外，还有这样两个值得注意的方法：</p>
<p>lockInterruptibly：如果当前线程没有被中断，就获取锁；否则抛出 InterruptedException，并且清除中断</p>
<p>tryLock，只在锁空闲的时候才获取这个锁，否则返回 false，所以它不会 block 代码的执行</p>
<p>ReadWriteLock.class，读写锁，读写分开，读锁是共享锁，写锁是独占锁；对于读-写都要保证严格的实时性和同步性的情况，并且读频率远远大过写，使用读写锁会比普通互斥锁有更好的性能。</p>
<p>ReentrantLock.class，可重入锁(lock 行为可以嵌套，但是需要和 unlock 行为一一对应)，有几点需要注意：</p>
<p>构造器支持传入一个表示是否是公平锁的 boolean 参数，公平锁保证一个阻塞的线程最终能够获得锁，因为是有序的，所以总是可以按照请求的顺序获得锁；不公平锁意味着后请求锁的线程可能在其前面排列的休眠线程恢复前拿到锁，这样就有可能提高并发的性能</p>
<p>还提供了一些监视锁状态的方法，比如 isFair、isLocked、hasWaiters、getQueueLength 等等</p>
<p>ReentrantReadWriteLock.class，可重入读写锁</p>
<p>Condition.class，使用锁的 newCondition 方法可以返回一个该锁的 Condition 对象，如果说锁对象是取代和增强了 synchronized 关键字的功能的话，那么 Condition 则是对象 wait/notify/notifyAll 方法的替代。在下面这个例子中，lock 生成了两个 condition，一个表示不满，一个表示不空：</p>
<p>还有三个月就三年工作经验了。</p>
<p>T型人才</p>
</template>
