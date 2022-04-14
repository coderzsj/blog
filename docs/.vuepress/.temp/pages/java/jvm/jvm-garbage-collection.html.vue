<template><p>::: 关于Java垃圾回收的简介</p>
<p>（1）Java内存运行时区域的各个部分，其中程序计数器、虚拟机栈、本地方法栈三个区域随线程而生，随线程尔灭；栈中的栈帧随着方法的进入和退出而有条不紊的执行着出栈和入栈操作。</p>
<p>（2）每一个栈帧中分配多少内存基本上是在类结构确定下来时就已知的，因此这几个区域的内存和回收都具确定性，</p>
<p>如果垃圾不被回收，内存迟早会被消耗空，因为我们在不断的分配内存空间而不进行回收，除非内存无限大，我们可以任性的分配儿不回收。在这几个区域内不需要过多考虑回收的问题，因为方法结束或线程结束时，内存自然就跟随着回收了。</p>
<p>（3）而Java堆和方法区则不一样，一个接口中的多个实现类需要的内存可能不一样，一个方法中的多个分支需要的内存也可能不一样，我们只有在程序处于运行期间时才能知道会创建哪些对象，这部分内存的分配和回收都是动态的，垃圾收集器所关注的是这部分内存。</p>
<p>:::</p>
<h2 id="gc执行的机制" tabindex="-1"><a class="header-anchor" href="#gc执行的机制" aria-hidden="true">#</a> GC执行的机制</h2>
<h3 id="minor-gc-young-gc" tabindex="-1"><a class="header-anchor" href="#minor-gc-young-gc" aria-hidden="true">#</a> Minor GC(young GC)</h3>
<p>一般情况下，当新对象生成，并且在Eden申请空间失败时，就会触发Minor GC，对Eden区域进行GC，清除非存活对象，并且把尚且存活的对象移动到Survivor区。然后整理Survivor的两个区。</p>
<p>这种方式的GC是对年轻代的Eden区进行，不会影响到年老代。</p>
<p>因为大部分对象都是从Eden区开始的，同时Eden区不会分配的很大，所以Eden区的GC会频繁进行。因而，一般在这里需要使用速度快、效率高的算法，使Eden去能尽快空闲出来。</p>
<h3 id="full-gc" tabindex="-1"><a class="header-anchor" href="#full-gc" aria-hidden="true">#</a> Full GC</h3>
<p>对整个堆进行整理，包括 <code>Young</code>、<code>Tenured</code> 和 <code>Perm</code>。Full GC 因为需要对整个堆进行回收，所以比Minor GC要慢，因此应该尽可能减少Full GC的次数。在对JVM调优的过程中，很大一部分工作就是对于FullGC的调节。有如下原因可能导致Full GC：</p>
<ol>
<li>年老代（Tenured）被写满</li>
<li>持久代（Perm）被写满</li>
<li>System.gc()被显示调用</li>
<li>上一次GC之后Heap的各域分配策略动态变化</li>
</ol>
<h2 id="判断哪些对象可以回收" tabindex="-1"><a class="header-anchor" href="#判断哪些对象可以回收" aria-hidden="true">#</a> 判断哪些对象可以回收</h2>
<p>所谓“要回收的垃圾”无非就是那些不可能再被任何途径使用的对象。那么如何找到这些对象？</p>
<h3 id="引用计数法" tabindex="-1"><a class="header-anchor" href="#引用计数法" aria-hidden="true">#</a> 引用计数法</h3>
<p>当一个对象被引用时，就当引用对象的值加一，当值为 0 时，就表示该对象不被引用，可以被垃圾收集器回收。</p>
<p>这个引用计数法听起来不错，但是有一个弊端，循环引用时，两个对象的计数都为 1，导致两个对象都无法被释放。</p>
<h3 id="可达性分析算法" tabindex="-1"><a class="header-anchor" href="#可达性分析算法" aria-hidden="true">#</a> 可达性分析算法</h3>
<p>这个算法的基本思想是通过一系列称为“GC Roots”的对象作为起始点，从这些节点向下搜索，搜索所走过的路径称为引用链，当一个对象到 GC Roots 没有任何引用链(即 GC Roots 到对象不可达)时，则证明此对象是不可用的。</p>
<p>那么问题又来了，如何选取 GCRoots 对象呢？在 Java 语言中，可以作为 GCRoots 的对象包括下面几种：</p>
<p>虚拟机栈(栈帧中的本地变量表)中引用的对象。
方法区中类静态属性引用的对象
方法区中常量引用的对象
本地方法栈中 JNI(即一般说的 Native 方法)引用的对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">T</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>对于以上代码，可以使用如下命令将堆内存信息转储成一个文件，然后使用 idea Memory Analyzer 工具进行分析。</p>
<p>使用步骤：</p>
<ol>
<li>使用 jps 命令，查看程序的进程
使用 jmap -dump:format=b,live,file=1.bin 16104 命令转储文件</li>
</ol>
<ul>
<li><code>dump</code>：转储文件</li>
<li><code>format</code> =b：二进制文件</li>
<li><code>file</code>：文件名</li>
<li><code>16104</code>：进程的 ID</li>
</ul>
<ol start="3">
<li>打开 Eclipse Memory Analyzer 对 1.bin 文件进行分析。</li>
</ol>
<p>分析的 gc root，找到了 ArrayList 对象，然后将 list 置为 null，再次转储，那么 list 对象就会被回收。</p>
<h3 id="四种引用" tabindex="-1"><a class="header-anchor" href="#四种引用" aria-hidden="true">#</a> 四种引用</h3>
<ol>
<li>强引用:
只有所有 GC Roots 对象都不通过【强引用】引用该对象，该对象才能被垃圾回收</li>
<li>软引用(SoftReference):
仅有软引用引用该对象时，在垃圾回收后，内存仍不足时会再次出发垃圾回收，回收软引用对象
可以配合引用队列来释放软引用自身</li>
<li>弱引用(WeakReference):
仅有弱引用引用该对象时，在垃圾回收时，无论内存是否充足，都会回收弱引用对象,可以配合引用队列来释放弱引用自身</li>
<li>虚引用(PhantomReference):
必须配合引用队列使用，主要配合 ByteBuffer 使用，被引用对象回收时，会将虚引用入队，
由 Reference Handler 线程调用虚引用相关方法释放直接内存</li>
<li>终结器引用(FinalReference)
无需手动编码，但其内部配合引用队列使用，在垃圾回收时，终结器引用入队(被引用对象暂时没有被回收)，再由 Finalizer 线程通过终结器引用找到被引用对象并调用它的 finalize 方法，第二次 GC 时才能回收被引用对象。</li>
</ol>
<h2 id="垃圾回收算法" tabindex="-1"><a class="header-anchor" href="#垃圾回收算法" aria-hidden="true">#</a> 垃圾回收算法</h2>
<h3 id="标记清除算法-引用计数算法" tabindex="-1"><a class="header-anchor" href="#标记清除算法-引用计数算法" aria-hidden="true">#</a> 标记清除算法（引用计数算法）</h3>
<p>它很难解决对象之间的相互循环引用的问题。</p>
<p>例如：</p>
<p>对象objA和ObjB都有字段instance，赋值令</p>
<p>标记-清除算法分为两个阶段：标记阶段和清除阶段。</p>
<p>标记阶段的任务是标记出所有需要被回收的对象，清除阶段就是回收被标记的对象所占用的空间。</p>
<p><a href="./img/2-1.png"></a></p>
<p>这种回收算法会产生大量不连续的内存碎片，当要频繁分配一个大对象时，jvm在新生代中找不到足够大的连续的内存块，会导致jvm频繁进行内存回收(目前有机制，对大对象，直接分配到老年代中)</p>
<p>优点</p>
<p>利用率百分之百</p>
<p>缺点</p>
<p>标记和清除的效率都不高（比对复制算法）</p>
<p>会产生大量的不连续的内存碎片</p>
<h3 id="复制算法" tabindex="-1"><a class="header-anchor" href="#复制算法" aria-hidden="true">#</a> 复制算法</h3>
<p>复制算法将可用内存按容量划分为两个大小相等的块，每次只使用其中的一块。</p>
<p>当这一块的内存用完了，就将还存活着的对象复制到另外一块内存中，然后把这块内存一次清理掉。这样做的效率比较高，也避免了内存碎片。但是这样内存的可使用空间减半，内存利用率低。内存空间的浪费</p>
<p><a href="./img/2-2.png"></a></p>
<p>这种算法虽然实现简单，运行高效且不容易产生内存碎片，但是却对内存空间的使用做出了高昂的代价，因为能够使用的内存缩减到原来的一半。很显然，Copying 算法的效率跟存活对象的数目多少有很大的关系，如果存活对象很多，那么 Copying 算法的效率将会大大降低。</p>
<h3 id="标记-整理算法-压缩法" tabindex="-1"><a class="header-anchor" href="#标记-整理算法-压缩法" aria-hidden="true">#</a> 标记-整理算法(压缩法)</h3>
<p>为了解决 Copying 算法的缺陷，充分利用内存空间，提出了 Mark-Compact 算法。该算法标记阶段和 Mark-Sweep 一样，但是在完成标记之后，它不是直接清理可回收对象，而是将存活对象都向一端移动，然后清理掉端边界以外的内存。具体过程如下图所示：</p>
<p><a href="./img/2-3.png"></a></p>
<h3 id="分代收集算法" tabindex="-1"><a class="header-anchor" href="#分代收集算法" aria-hidden="true">#</a> 分代收集算法</h3>
<p>当前商业虚拟机都采用这种算法。首先根据对象存活周期的不同将内存分为几块即新生代、老年代，然后根据不同年代的特点，采用不同的收集算法。</p>
<p>新生代: 每次垃圾收集都能发现大批对象已死, 只有少量存活。因此选用复制算法, 只需要付出少量存活对象的复制成本就可以完成。但是实际中并不是按照 1：1 的比例来划分新生代的空间的，一般来说是将新生代划分为一块较大的 <code>Eden</code> 空间和两块较小的 <code>Survivor</code> 空间，每次使用 <code>Eden</code> 空间和其中的一块 <code>Survivor</code> 空间，当进行回收时，将 <code>Eden</code> 和 <code>Survivor</code> 中还存活的对象复制到另一块 <code>Survivor</code> 空间中，然后清理掉 <code>Eden</code> 和刚才使用过的 <code>Survivor</code> 空间。</p>
<p>老年代: 是每次垃圾收集时只有少量对象需要被回收，一般使用的是标记-整理算法(压缩法)。</p>
<h2 id="典型的垃圾收集器" tabindex="-1"><a class="header-anchor" href="#典型的垃圾收集器" aria-hidden="true">#</a> 典型的垃圾收集器</h2>
<h2 id="serial-收集器" tabindex="-1"><a class="header-anchor" href="#serial-收集器" aria-hidden="true">#</a> Serial 收集器</h2>
<p>Serial 收集器是最基本的、发展历史最悠久的收集器</p>
<p>特点：单线程、简单高效（与其他收集器的单线程相比），采用复制算法。对于限定单个 CPU 的环境来说，Serial 收集器由于没有线程交互的开销，专心做垃圾收集自然可以获得最高的单线程收集效率。收集器进行垃圾回收时，必须暂停其他所有的工作线程，直到它结束（Stop The World）！</p>
<h3 id="parnew-收集器" tabindex="-1"><a class="header-anchor" href="#parnew-收集器" aria-hidden="true">#</a> ParNew 收集器</h3>
<p>ParNew 收集器其实就是 Serial 收集器的多线程版本</p>
<p>特点：多线程、ParNew 收集器默认开启的收集线程数与CPU的数量相同，在 CPU 非常多的环境中，可以使用 -XX:ParallelGCThreads 参数来限制垃圾收集的线程数。和 Serial 收集器一样存在 Stop The World 问题</p>
<h3 id="cms-收集器" tabindex="-1"><a class="header-anchor" href="#cms-收集器" aria-hidden="true">#</a> CMS 收集器</h3>
<p><code>Concurrent Mark Sweep</code>，一种以获取最短回收停顿时间为目标的<strong>老年代收集器</strong></p>
<p>特点：基于标记-清除算法实现。并发收集、低停顿，但是会产生内存碎片</p>
<p>应用场景：适用于注重服务的响应速度，希望系统停顿时间最短，给用户带来更好的体验等场景下。</p>
<p>如 web 程序、b/s 服务</p>
<p>CMS 收集器的运行过程分为下列4步：</p>
<ul>
<li>初始标记：标记 GC Roots 能直接到的对象。速度很快但是仍存在 Stop The World 问题。</li>
<li>并发标记：进行 GC Roots Tracing 的过程，找出存活对象且用户线程可并发执行。</li>
<li>重新标记：为了修正并发标记期间因用户程序继续运行而导致标记产生变动的那一部分对象的标记记录。仍然存在 Stop The World 问题</li>
<li>并发清除：对标记的对象进行清除回收，清除的过程中，可能任然会有新的垃圾产生，这些垃圾就叫浮动垃圾，如果当用户需要存入一个很大的对象时，新生代放不下去，老年代由于浮动垃圾过多，就会退化为 serial Old 收集器，将老年代垃圾进行标记-整理，当然这也是很耗费时间的！</li>
</ul>
<p>CMS 收集器的内存回收过程是与用户线程一起并发执行的，可以搭配 ParNew 收集器（多线程，新生代，复制算法）与 Serial Old 收集器（单线程，老年代，标记-整理算法）使用。</p>
<h2 id="g1-收集器-待续。。。" tabindex="-1"><a class="header-anchor" href="#g1-收集器-待续。。。" aria-hidden="true">#</a> G1 收集器（待续。。。）</h2>
<p>适用场景：</p>
<ul>
<li>同时注重吞吐量和低延迟（响应时间）</li>
<li>超大堆内存（内存大的），会将堆内存划分为多个大小相等的区域，区域可能是Eden，也有可能是Survivor，也有可能是Old，另外Region中还有一类特殊的Humongous区域，专门用来存储大对象。</li>
<li>整体上是标记-整理算法，两个区域之间是复制算法</li>
</ul>
<p>G1的运行过程与CMS大体一致，分为以下四个步骤：</p>
<ul>
<li>初始标记(Initial Marking)：仅仅只是标记一下GC Roots能直接关联到的对象，并且修改TAMS指针的值，让下一阶段用户线程并发运行时，能正确地在可用的Region中分配新对象。这个阶段需要停顿线程，但耗时很短，而且是借用进行Minor GC的时候同步完成的，所以G1收集器在这个阶段实际并没有额外的停顿。</li>
<li>并发标记( Concurrent Marking)：从GC Root开始对堆中对象进行可达性分析，递归扫描整个堆里的对象图，找出要回收的对象，这阶段耗时较长，但可与用户程序并发执行。当对象图扫
描完成以后，并发时有引用变动的对象会产生漏标问题，G1中会使用SATB(snapshot-at-the-beginning)算法来解决，后面会详细介绍。</li>
<li>最终标记(Final Marking)：对用户线程做一个短暂的暂停，用于处理并发标记阶段仍遗留下来的最后那少量的SATB记录(漏标对象)。</li>
<li>筛选回收(Live Data Counting and Evacuation)：负责更新Region的统计数据，对各个Region的回收价值和成本进行排序，根据用户所期望的停顿时间来制定回收计划，可以自由选择任意多个Region构成回收集，然后把决定回收的那一部分Region的存活对象复制到空的Region中，再清理掉整个旧Region的全部空间。这里的操作涉及存活对象的移动，是必须暂停用户线程，由多个收集器线程并行完成的。</li>
</ul>
<p>TAMS是什么？</p>
<p>要达到GC与用户线程并发运行，必须要解决回收过程中新对象的分配，所以G1为每一个Region区域设计了两个名为TAMS（Top at Mark Start）的指针，从Region区域划出一部分空间用于记录并发回收过程中的新对象。这样的对象认为它们是存活的，不纳入垃圾回收范围。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>-XX:+UseG1GC
-XX:G1HeapRegionSize<span class="token operator">=</span>size
-XX:MaxGCPauseMillis<span class="token operator">=</span>time
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Young Collection：对新生代垃圾收集</p>
<p>Young Collection + Concurrent Mark：如果老年代内存到达一定的阈值了，新生代垃圾收集同时会执行一些并发的标记。</p>
<p>Mixed Collection：会对新生代 + 老年代 + 幸存区等进行混合收集，然后收集结束，会重新进入新生代收集。</p>
<p>Young Collection</p>
<p>新生代存在 STW：</p>
<p>分代是按对象的生命周期划分，分区则是将堆空间划分连续几个不同小区间，每一个小区间独立回收，可以控制一次回收多少个小区间，方便控制 GC 产生的停顿时间！</p>
<p>E：eden，S：幸存区，O：老年代</p>
<p>新生代收集会产生 STW ！</p>
<p><a href="./img/20210210122339138.gif"></a></p>
<p>Young Collection + CM</p>
<p>在 Young GC 时会进行 GC Root 的初始化标记</p>
<p>老年代占用堆空间比例达到阈值时，进行并发标记（不会STW），由下面的 JVM 参数决定 -XX:InitiatingHeapOccupancyPercent=percent （默认45%）</p>
<p><a href="./img/20210210122601873.png"></a></p>
<p>Mixed Collection</p>
<p>会对 E S O 进行全面的回收</p>
<p>最终标记会 STW</p>
<p>拷贝存活会 STW</p>
<p>-XX:MaxGCPauseMills=xxms 用于指定最长的停顿时间！</p>
<p>问：为什么有的老年代被拷贝了，有的没拷贝？</p>
<p>因为指定了最大停顿时间，如果对所有老年代都进行回收，耗时可能过高。为了保证时间不超过设定的停顿时间，会回收最有价值的老年代（回收后，能够得到更多内存）</p>
<p><a href="./img/20210210144216170.png"></a></p>
<p>Full GC</p>
<p>G1 在老年代内存不足时（老年代所占内存超过阈值）</p>
<p>如果垃圾产生速度慢于垃圾回收速度，不会触发 Full GC，还是并发地进行清理</p>
<p>如果垃圾产生速度快于垃圾回收速度，便会触发 Full GC，然后退化成 serial Old 收集器串行的收集，就会导致停顿的时候长。</p>
<h2 id="tiaoyou新生代" tabindex="-1"><a class="header-anchor" href="#tiaoyou新生代" aria-hidden="true">#</a> tiaoyou新生代</h2>
<p>新生代的特点</p>
<p>所有的 new 操作分配内存都是非常廉价的</p>
<p>TLAB thread-lcoal allocation buffer</p>
<p>死亡对象回收零代价</p>
<p>大部分对象用过即死（朝生夕死）</p>
<p>Minor GC 所用时间远小于 Full GC</p>
<p>新生代内存越大越好么？ 不是</p>
<p>新生代内存太小：频繁触发 Minor GC ，会 STW ，会使得吞吐量下降</p>
<p>新生代内存太大：老年代内存占比有所降低，会更频繁地触发 Full GC。而且触发 Minor GC 时，清理新生代所花费的时间会更长</p>
<p>新生代内存设置为内容纳[并发量*(请求-响应)]的数据为宜</p>
<p>幸存区需要能够保存 当前活跃对象+需要晋升的对象</p>
<p>晋升阈值配置得当，让长时间存活的对象尽快晋升</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>-XX:MaxTenuringThreshold<span class="token operator">=</span>threshold
-XX:+PrintTenuringDistrubution
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="tiaoyou老年代" tabindex="-1"><a class="header-anchor" href="#tiaoyou老年代" aria-hidden="true">#</a> tiaoyou老年代</h2>
<p>以 CMS 为例：CMS 的老年代内存越大越好</p>
<p>先尝试不做调优，如果没有 Full G，否者先尝试调优新生代。</p>
<p>观察发现 Full GC 时老年代内存占用，将老年代内存预设调大 1/4 ~ 1/3</p>
<p><code>-XX:CMSInitiatingOccupancyFraction=percent</code></p>
<p><a href="https://blog.csdn.net/weixin_50280576/article/details/113775575" target="_blank" rel="noopener noreferrer">csdn<ExternalLinkIcon/></a></p>
</template>
