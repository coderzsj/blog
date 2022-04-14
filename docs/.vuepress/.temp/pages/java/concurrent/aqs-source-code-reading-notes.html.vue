<template><h1 id="aqs" tabindex="-1"><a class="header-anchor" href="#aqs" aria-hidden="true">#</a> AQS</h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>AbstractQueuedSynchronizer，是 JDK 提供的一个同步框架，内部维护着 FIFO 双向队列，即 CLH 同步队列。</p>
<p>AQS 依赖它来完成同步状态的管理(voliate 修饰的 state，用于标志是否持有锁)。如果获取同步状态 state 失败时，会将当前线程及等待信息等构建成一个 Node，将 Node.js 放到 FIFO 队列里，同时阻塞当前线程，当线程将同步状态 state 释放时，会把 FIFO 队列中的首节的唤醒，使其获取同步状态 state。</p>
<p>很多 JUC 包下的锁都是基于 AQS 实现的</p>
<p>如下脑图：</p>
<p><img src="@source/java/concurrent/image/aqs-2.png" alt=""></p>
<h2 id="node-js-内部类" tabindex="-1"><a class="header-anchor" href="#node-js-内部类" aria-hidden="true">#</a> Node.js 内部类</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/** 共享节点 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> SHARED <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 独占节点 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> EXCLUSIVE <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 因为超时或者中断，节点会被设置成取消状态，被取消的节点不会参与到竞争中，会一直是取消
            状态不会改变 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> CANCELLED <span class="token operator">=</span>  <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 后继节点处于等待状态，如果当前节点释放了同步状态或者被取消，会通知后继节点，使其得以
            运行 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> SIGNAL    <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 节点在等待条件队列中，节点线程等待在condition上，当其他线程对condition调用了signal
            后，该节点将会从等待队列中进入同步队列中，获取同步状态 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> CONDITION <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 下一次共享式同步状态获取会无条件的传播下去
         */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> PROPAGATE <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 等待状态 */</span>
        <span class="token keyword">volatile</span> <span class="token keyword">int</span> waitStatus<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 前驱节点 */</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Node</span> prev<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 后继节点 */</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Node</span> next<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** 获取同步状态的线程 */</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Thread</span> thread<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 下一个条件队列等待节点
         */</span>
        <span class="token class-name">Node</span> nextWaiter<span class="token punctuation">;</span>

        <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">isShared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> nextWaiter <span class="token operator">==</span> SHARED<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">final</span> <span class="token class-name">Node</span> <span class="token function">predecessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NullPointerException</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> p <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token keyword">return</span> p<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// </span>
            <span class="token class-name">Used</span> <span class="token keyword">to</span> <span class="token namespace">establish</span> initial head or SHARED markesr
            dsfjsdl
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> thread<span class="token punctuation">,</span> <span class="token class-name">Node</span> mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>     <span class="token comment">// Used by addWaiter</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>nextWaiter <span class="token operator">=</span> mode<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>thread <span class="token operator">=</span> thread<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> thread<span class="token punctuation">,</span> <span class="token keyword">int</span> waitStatus<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Used by Condition</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>waitStatus <span class="token operator">=</span> waitStatus<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>thread <span class="token operator">=</span> thread<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><h2 id="fifo-结构图" tabindex="-1"><a class="header-anchor" href="#fifo-结构图" aria-hidden="true">#</a> FIFO 结构图</h2>
<p><img src="@source/java/concurrent/image/aqs-1.png" alt=""></p>
<h2 id="独占式同步状态过程" tabindex="-1"><a class="header-anchor" href="#独占式同步状态过程" aria-hidden="true">#</a> 独占式同步状态过程</h2>
<h3 id="acquire" tabindex="-1"><a class="header-anchor" href="#acquire" aria-hidden="true">#</a> acquire</h3>
<p>独占式获取同步状态</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>public final void acquire(int arg) {
    if (!tryAcquire(arg) &amp;&amp; acquireQueued(addWaiter(Node.EXCLUSIVE), arg)) {
        selfInterrupt();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="tryacquire" tabindex="-1"><a class="header-anchor" href="#tryacquire" aria-hidden="true">#</a> tryAcquire</h3>
<p>尝试去获取锁，获取成功返回 true，否则返回 false。该方法由继承 AQS 的子类自己实现。采用了模板方法设计模式。</p>
<p>如：ReentrantLock 的 Sync 内部类，Sync 的子类：NonfairSync 和 FairSync</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>protected boolean tryAcquire(int arg) {
     throw new UnsupportedOperationException();
 }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="addwaiter" tabindex="-1"><a class="header-anchor" href="#addwaiter" aria-hidden="true">#</a> addWaiter</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>private Node addWaiter(Node mode) {
       // 新建Node节点
       Node node = new Node(Thread.currentThread(), mode);
       // 尝试快速添加尾结点
       Node pred = tail;
       if (pred != null) {
           node.prev = pred;
           // CAS方式设置尾结点
           if (compareAndSetTail(pred, node)) {
               pred.next = node;
               return node;
           }
       }
       // 如果上面添加失败，这里循环尝试添加，直到添加成功为止
       enq(node);
       return node;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="enq" tabindex="-1"><a class="header-anchor" href="#enq" aria-hidden="true">#</a> enq</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>    private Node enq(final Node node) {
        // 一直for循环，直到插入Node成功为止
        for (;;) {
            Node t = tail;
            if (t == null) {
                // CAS设置首节点
                if (compareAndSetHead(new Node()))
                    tail = head;
            } else {
                node.prev = t;
                // CAS设置尾结点
                if (compareAndSetTail(t, node)) {
                    t.next = node;
                    return t;
                }
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="acquirequeued" tabindex="-1"><a class="header-anchor" href="#acquirequeued" aria-hidden="true">#</a> acquireQueued</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> final boolean acquireQueued(final Node node, int arg) {
        // 操作是否成功标志
        boolean failed = true;
        try {
            // 线程中断标志
            boolean interrupted = false;
            // 不断的自旋循环
            for (;;) {
                // 当前节点的prev节点
                final Node p = node.predecessor();
                // 判断prev是否是头结点 &amp;&amp; 是否获取到同步状态
                if (p == head &amp;&amp; tryAcquire(arg)) {
                    // 以上条件成立，将当前节点设置成头结点
                    setHead(node);
                    // 将prev节点移除队列中
                    p.next = null; // help GC
                    failed = false;
                    return interrupted;
                }
                // 自旋过程中，判断当前线程是否需要阻塞 &amp;&amp; 阻塞当前线程并且检验线程中断状态
                if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;
                    parkAndCheckInterrupt())
                    interrupted = true;
            }
        } finally {
            if (failed)
                // 取消获取同步状态
                cancelAcquire(node);
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="shouldparkafterfailedacquire" tabindex="-1"><a class="header-anchor" href="#shouldparkafterfailedacquire" aria-hidden="true">#</a> shouldParkAfterFailedAcquire</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
        // 拿到当前节点的prev节点的等待状态
        int ws = pred.waitStatus;

        if (ws == Node.SIGNAL)
            /*
             * 如果prev的status是signal，表示当prev释放了同步状态或者取消了，会通知当前节
             * 点，所以当前节点可以安心的阻塞了（相当睡觉会有人叫醒他）
             */
            return true;
        if (ws > 0) {
            /*
             * status > 0，表示为取消状态，需要将取消状态的节点从队列中移除
             * 直到找到一个状态不是取消的节点为止
             */
            do {
                node.prev = pred = pred.prev;
            } while (pred.waitStatus > 0);
            pred.next = node;
        } else {
            /*
             * 除了以上情况，通过CAS将prev的status设置成signal
             */
            compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
        }
        return false;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="parkandcheckinterrupt" tabindex="-1"><a class="header-anchor" href="#parkandcheckinterrupt" aria-hidden="true">#</a> parkAndCheckInterrupt</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>private final boolean parkAndCheckInterrupt() {
    // 阻塞当前线程
    LockSupport.park(this);
    // 返回当前线程的中断状态
    return Thread.interrupted();
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Sun.misc.Unsafe</p>
<p>甲 不动，乙类 可改
医师服务费 其他</p>
<p>参考文献：
<a href="https://mp.weixin.qq.com/s/PdB_1-C2FGl91vN3SM5ZVg" target="_blank" rel="noopener noreferrer">2 万月薪必会知识：AQS<ExternalLinkIcon/></a></p>
</template>
