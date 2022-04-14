<template><h1 id="thread" tabindex="-1"><a class="header-anchor" href="#thread" aria-hidden="true">#</a> thread</h1>
<h1 id="线程生命周期-五大状态转换分析" tabindex="-1"><a class="header-anchor" href="#线程生命周期-五大状态转换分析" aria-hidden="true">#</a> 线程生命周期，五大状态转换分析</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>本章学习完成，你将会对线程的生命周期有清楚的认识，并且明白不同状态之间是如何转换的，以及对 java 线程状态枚举类解读。</p>
<h2 id="一、线程生命周期" tabindex="-1"><a class="header-anchor" href="#一、线程生命周期" aria-hidden="true">#</a> 一、线程生命周期</h2>
<p>一个完整的线程生命周期，要经过 新建(new)、就绪(Runnable)、运行(Running)、阻塞(Blocked)和死亡(Dead)5 种状态。</p>
<p><img src="@source/java/concurrent/image/1-1.png" alt=""></p>
<h3 id="_1-new-阶段" tabindex="-1"><a class="header-anchor" href="#_1-new-阶段" aria-hidden="true">#</a> 1.new 阶段</h3>
<p>New 阶段就是你 new Thread()创建线程对象时候的阶段。</p>
<p>是创建了一个 Therad 对象</p>
<p>只有当我们真正把线程启动起来的时候，此时才会在 JVM 进程</p>
<p>我们 new 了一个 Thread 对象之后就需要调用 Thread.start()来启动线程，此时线程会从 new 阶段转换到 Runnable 阶段。</p>
<p>线程流程图-new_to_runnable：</p>
<p><img src="@source/java/concurrent/image/1-2.png" alt=""></p>
<h3 id="_2-runnable-阶段" tabindex="-1"><a class="header-anchor" href="#_2-runnable-阶段" aria-hidden="true">#</a> 2. Runnable 阶段</h3>
<p>只有调用 Thread.start()方法才能使线程从 new 阶段转换到 Runnable 阶段。</p>
<p>当然我们从字面意思也可以知道此时线程是处于可执行转状态而不是真正的执行中状态了，此时的线程只能等 CPU 翻牌子，翻到了他才能真正的跑起来。</p>
<p>Java.lang.Thread.start</p>
<p>Java.lang.Thread.State</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>    public enum State {
        /**
         * Thread state for a thread which has not yet started.
         * 还没有start的线程状态
         */
        NEW,

        /**
         * Thread state for a runnable thread.  A thread in the runnable
         * state is executing in the Java virtual machine but it may
         * be waiting for other resources from the operating system
         * such as processor.
         */
        RUNNABLE,

        /**
         * Thread state for a thread blocked waiting for a monitor lock.
         * A thread in the blocked state is waiting for a monitor lock
         * to enter a synchronized block/method or
         * reenter a synchronized block/method after calling
         * {@link Object#wait() Object.wait}.
         */
        BLOCKED,

        /**
         * Thread state for a waiting thread.
         * A thread is in the waiting state due to calling one of the
         * following methods:
         * &lt;ul>
         *   &lt;li>{@link Object#wait() Object.wait} with no timeout&lt;/li>
         *   &lt;li>{@link #join() Thread.join} with no timeout&lt;/li>
         *   &lt;li>{@link LockSupport#park() LockSupport.park}&lt;/li>
         * &lt;/ul>
         *
         * &lt;p>A thread in the waiting state is waiting for another thread to
         * perform a particular action.
         *
         * For example, a thread that has called &lt;tt>Object.wait()&lt;/tt>
         * on an object is waiting for another thread to call
         * &lt;tt>Object.notify()&lt;/tt> or &lt;tt>Object.notifyAll()&lt;/tt> on
         * that object. A thread that has called &lt;tt>Thread.join()&lt;/tt>
         * is waiting for a specified thread to terminate.
         */
        WAITING,

        /**
         * Thread state for a waiting thread with a specified waiting time.
         * A thread is in the timed waiting state due to calling one of
         * the following methods with a specified positive waiting time:
         * &lt;ul>
         *   &lt;li>{@link #sleep Thread.sleep}&lt;/li>
         *   &lt;li>{@link Object#wait(long) Object.wait} with timeout&lt;/li>
         *   &lt;li>{@link #join(long) Thread.join} with timeout&lt;/li>
         *   &lt;li>{@link LockSupport#parkNanos LockSupport.parkNanos}&lt;/li>
         *   &lt;li>{@link LockSupport#parkUntil LockSupport.parkUntil}&lt;/li>
         * &lt;/ul>
         */
        TIMED_WAITING,

        /**
         * Thread state for a terminated thread.
         * The thread has completed execution.
         */
        TERMINATED;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><h3 id="_3-running-阶段" tabindex="-1"><a class="header-anchor" href="#_3-running-阶段" aria-hidden="true">#</a> 3.Running 阶段</h3>
<p>这个阶段的线程已经获取到了<strong>CPU 调度执行权</strong>，也就是说处于运行中状态了。</p>
<p>在该阶段中，线程可以向前或者向后发生转换：</p>
<ul>
<li>由于 CPU 的调度器轮询导致该线程放弃执行，就会进入 Runnable 阶段。</li>
<li>线程主动调用 yield，放弃 CPU 执行权，就会进入 Runnable 阶段(这种方式并不是百分百生效的，在 CPU 资源不紧张的时候不会生效)。</li>
<li>调用 sleep、wait 方法，进入 Blocked 阶段(这里讲的 Blocked 阶段和线程的 Blocked 状态需要区分开，这边讲的是一个比较广义的 Blocked 的阶段)</li>
<li>进行某个阻塞的 IO 操作而进入 Blocked 阶段</li>
<li>为了获取某个锁资源而加入到该锁到阻塞队列中而进入 Blocked 阶段</li>
<li>线程执行完成或者调用 stop 方法或者判断某个逻辑标识，直接进入 Terminated 阶段</li>
</ul>
<h3 id="wait" tabindex="-1"><a class="header-anchor" href="#wait" aria-hidden="true">#</a> wait</h3>
</template>
