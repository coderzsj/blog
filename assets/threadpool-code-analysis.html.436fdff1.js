import{b as n}from"./app.9da19d67.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";var a="/blog/assets/threadpool-1.c4a3e117.png";const p={},e=n(`<h2 id="\u7EBF\u7A0B\u6C60-threadpoolexecutor-\u6E90\u7801\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u7A0B\u6C60-threadpoolexecutor-\u6E90\u7801\u5206\u6790" aria-hidden="true">#</a> \u7EBF\u7A0B\u6C60 ThreadPoolExecutor \u6E90\u7801\u5206\u6790</h2><h2 id="_1\u3001\u6784\u9020\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u6784\u9020\u65B9\u6CD5" aria-hidden="true">#</a> 1\u3001\u6784\u9020\u65B9\u6CD5</h2><p>\u6784\u9020\u65B9\u6CD5\u4E2D\u6709 4 \u4E2A\u65B9\u6CD5\uFF0C\u672C\u8D28\u4E0A\u90FD\u662F\u8C03\u7528\u7684\u4E0B\u9762\u8FD9\u4E2A\u6784\u9020\u65B9\u6CD5\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadPoolExecutor</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractExecutorService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>
                              <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>
                              <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>
                              <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>
                              <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> workQueue<span class="token punctuation">,</span>
                              <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>
                              <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>corePoolSize <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span>
                maximumPoolSize <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span>
                maximumPoolSize <span class="token operator">&lt;</span> corePoolSize <span class="token operator">||</span>
                keepAliveTime <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>workQueue <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> threadFactory <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> handler <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>acc <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getSecurityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span>
                <span class="token keyword">null</span> <span class="token operator">:</span>
                <span class="token class-name">AccessController</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>corePoolSize <span class="token operator">=</span> corePoolSize<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>maximumPoolSize <span class="token operator">=</span> maximumPoolSize<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>workQueue <span class="token operator">=</span> workQueue<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>keepAliveTime <span class="token operator">=</span> unit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>keepAliveTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>threadFactory <span class="token operator">=</span> threadFactory<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>handler <span class="token operator">=</span> handler<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="\u7EBF\u7A0B\u6C60\u4E2D\u5B9A\u4E49\u4E86\u56DB\u79CD\u9971\u548C\u7B56\u7565-\u62D2\u7EDD\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u7A0B\u6C60\u4E2D\u5B9A\u4E49\u4E86\u56DB\u79CD\u9971\u548C\u7B56\u7565-\u62D2\u7EDD\u7B56\u7565" aria-hidden="true">#</a> \u7EBF\u7A0B\u6C60\u4E2D\u5B9A\u4E49\u4E86\u56DB\u79CD\u9971\u548C\u7B56\u7565 (\u62D2\u7EDD\u7B56\u7565)</h2><h3 id="_1\u3001callerrunspolicy" tabindex="-1"><a class="header-anchor" href="#_1\u3001callerrunspolicy" aria-hidden="true">#</a> 1\u3001CallerRunsPolicy</h3><p>\u7ED5\u8FC7\u7EBF\u7A0B\u6C60\uFF0C\u76F4\u63A5\u6267\u884C\u7EBF\u7A0B\u7684 run \u65B9\u6CD5</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">CallerRunsPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">CallerRunsPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//\u4F7F\u7528\u4E3B\u7EBF\u7A0B\u6267\u884C\u65B0\u4EFB\u52A1</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//\u6B64\u65B9\u6CD5\u76F8\u540C\u4E8E\u540C\u6B65\u65B9\u6CD5</span>
            r<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="_2\u3001-abortpolicy-\u7EBF\u7A0B\u6C60\u9ED8\u8BA4\u7684\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#_2\u3001-abortpolicy-\u7EBF\u7A0B\u6C60\u9ED8\u8BA4\u7684\u7B56\u7565" aria-hidden="true">#</a> 2\u3001 AbortPolicy(\u7EBF\u7A0B\u6C60\u9ED8\u8BA4\u7684\u7B56\u7565)</h3><p>\u629B\u51FA RejectedExecutionException \u6765\u62D2\u7EDD\u65B0\u4EFB\u52A1\u7684\u5904\u7406</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">AbortPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">AbortPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RejectedExecutionException</span><span class="token punctuation">(</span><span class="token string">&quot;Task &quot;</span> <span class="token operator">+</span> r<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; rejected from &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_3\u3001discardpolicy" tabindex="-1"><a class="header-anchor" href="#_3\u3001discardpolicy" aria-hidden="true">#</a> 3\u3001DiscardPolicy</h3><p>\u4E0D\u6267\u884C\u4EFB\u4F55\u64CD\u4F5C\uFF0C\u4E22\u5F03\u65B0\u4EFB\u52A1</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DiscardPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">DiscardPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_4\u3001discardoldestpolicy" tabindex="-1"><a class="header-anchor" href="#_4\u3001discardoldestpolicy" aria-hidden="true">#</a> 4\u3001DiscardOldestPolicy</h3><p>\u6B64\u7B56\u7565\u5C06\u4E22\u5F03\u6700\u65E9\u7684\u672A\u5904\u7406\u7684\u4EFB\u52A1</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DiscardOldestPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">DiscardOldestPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            e<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_3\u3001\u963B\u585E\u961F\u5217" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u963B\u585E\u961F\u5217" aria-hidden="true">#</a> 3\u3001\u963B\u585E\u961F\u5217</h2><p>\u54B1\u4EEC\u770B\u4E0B<code>ThreadPoolExecutor</code>\u7684\u6E90\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static ExecutorService newFixedThreadPool(int nThreads) {
 return new ThreadPoolExecutor(nThreads, nThreads,0L, TimeUnit.MILLISECONDS,
  new LinkedBlockingQueue&lt;Runnable&gt;());
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u4F7F\u7528\u7684\u662F LinkedBlockingQueue \u4F5C\u4E3A\u963B\u585E\u961F\u5217\uFF0CLinkedBlockingQueue \u7684\u9ED8\u8BA4\u6784\u9020\u51FD\u6570\u5141\u8BB8\u7684\u961F\u5217\u957F\u5EA6\u662F Integer.MAX_VALUE\uFF0C\u82E5\u5806\u79EF\u5927\u91CF\u7684\u8BF7\u6C42\uFF0C\u53EF\u80FD\u4F1A\u9020\u6210 OOM\u3002</p><p>\u6B64\u5904\u5C31\u662F\u4E3A\u4EC0\u4E48\u300A\u963F\u91CC\u5DF4\u5DF4 Java \u5F00\u53D1\u624B\u518C\u300B\u4E2D\u4E0D\u63A8\u8350\u4F7F\u7528 Executors \u5DE5\u5177\u7C7B\u521B\u5EFA\u7EBF\u7A0B\u6C60\u7684\u539F\u56E0\uFF0C\u8981\u6C42\u4F7F\u7528 ThreadPoolExecutor \u6784\u9020\u51FD\u6570\u7684\u65B9\u5F0F\uFF0C\u8BA9\u5199\u7684\u540C\u5B66\u66F4\u52A0\u660E\u786E\u7EBF\u7A0B\u6C60\u7684\u8FD0\u884C\u89C4\u5219\uFF0C\u89C4\u907F\u8D44\u6E90\u8017\u5C3D\u7684\u98CE\u9669\u3002</p><h2 id="_4\u3001execute-\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_4\u3001execute-\u65B9\u6CD5" aria-hidden="true">#</a> 4\u3001execute \u65B9\u6CD5</h2><p>\u4E0B\u9762\u662F\u6267\u884C\u6D41\u7A0B\u56FE\uFF1A</p><p><img src="`+a+`" alt="" loading="lazy"></p><p>Java.util.concurrent.ThreadPoolExecutor.execute</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadPoolExecutor</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractExecutorService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> ctl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token function">ctlOf</span><span class="token punctuation">(</span>RUNNING<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">workerCountOf</span><span class="token punctuation">(</span><span class="token keyword">int</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> c <span class="token operator">&amp;</span> CAPACITY<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//\u4EFB\u52A1\u961F\u5217</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> workQueue<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> command<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//\u5982\u679C\u4EFB\u52A1\u4E3Anull,\u5219\u629B\u51FA\u5F02\u5E38</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>command <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//\u83B7\u53D6\u7EBF\u7A0B\u6C60\u72B6\u6001\u548C\u6709\u6548\u7EBF\u7A0B\u6570</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//\u4EE5\u4E0B\u67093\u6B65\uFF1A</span>
        <span class="token comment">//\u6B65\u9AA41\uFF1A</span>
        <span class="token comment">//\u5982\u679C\u7EBF\u7A0B\u6C60\u5DE5\u4F5C\u7684\u7EBF\u7A0B\u5C0F\u4E8E\u6838\u5FC3\u7EBF\u7A0B\u6570</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">workerCountOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">&lt;</span> corePoolSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//\u5219\u589E\u52A0\u4E00\u4E2A\u7EBF\u7A0B\uFF0C\u5E76\u628A\u8BE5\u4EFB\u52A1\u4EA4\u7ED9\u5B83\u53BB\u6267\u884C</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">addWorker</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">//\u6210\u529F\u5219\u8FD4\u56DE</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token comment">//\u8FD9\u91CC\u8BF4\u660E\u521B\u5EFA\u6838\u5FC3\u7EBF\u7A0B\u5931\u8D25\uFF0C\u9700\u8981\u518D\u6B21\u83B7\u53D6\u4E34\u65F6\u53D8\u91CFc</span>
            c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token comment">//\u6B65\u9AA42\uFF1A</span>
        <span class="token comment">// \u8D70\u5230\u8FD9\u91CC\u8BF4\u660E\u521B\u5EFA\u65B0\u7684\u6838\u5FC3\u7EBF\u7A0B\u5931\u8D25\uFF0C\u4E5F\u5C31\u662F\u5F53\u524D\u5DE5\u4F5C\u7EBF\u7A0B\u6570\u5927\u4E8E\u7B49\u4E8EcorePoolSize</span>
        <span class="token comment">// \u7EBF\u7A0B\u6C60\u7684\u8FD0\u884C\u72B6\u6001\u662FRUNNING\uFF0C\u5E76\u4E14\u5C1D\u8BD5\u5C06\u65B0\u4EFB\u52A1\u52A0\u5165\u5230\u963B\u585E\u961F\u5217\uFF0C\u6210\u529F\u8FD4\u56DEtrue</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRunning</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> workQueue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//\u8FDB\u5165\u5230\u8FD9\u91CC\uFF0C\u662F\u5DF2\u7ECF\u5411\u4EFB\u52A1\u961F\u5217\u6295\u653E\u4EFB\u52A1\u6210\u529F</span>
            <span class="token comment">//\u518D\u6B21\u83B7\u53D6\u7EBF\u7A0B\u6C60\u72B6\u6001\u548C\u6709\u6548\u7EBF\u7A0B\u6570</span>
            <span class="token keyword">int</span> recheck <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//\u5982\u679C\u7EBF\u7A0B\u6C60\u72B6\u6001\u4E0D\u662FRUNNING\uFF08\u7EBF\u7A0B\u6C60\u5F02\u5E38\u7EC8\u6B62\u4E86\uFF09,\u5C06\u7EBF\u7A0B\u4ECE\u5DE5\u4F5C\u961F\u5217\u4E2D\u79FB\u9664</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isRunning</span><span class="token punctuation">(</span>recheck<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">remove</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">//\u6267\u884C\u9971\u548C\u7B56\u7565</span>
                <span class="token function">reject</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// \u8D70\u5230\u8FD9\u91CC\u8BF4\u660E\u7EBF\u7A0B\u6C60\u72B6\u6001\u53EF\u80FD\u662FRUNNING</span>
                <span class="token comment">// \u4E5F\u53EF\u80FD\u662F\u79FB\u9664\u7EBF\u7A0B\u4EFB\u52A1\u5931\u8D25\u4E86\uFF08\u5931\u8D25\u7684\u6700\u5927\u7684\u53EF\u80FD\u662F\u5DF2\u7ECF\u6267\u884C\u5B8C\u6BD5\u4E86\uFF09</span>
                <span class="token comment">//\u56E0\u4E3A\u6240\u6709\u5B58\u6D3B\u7684\u5DE5\u4F5C\u7EBF\u7A0B\u6709\u53EF\u80FD\u5728\u6700\u540E\u4E00\u6B21\u68C0\u67E5\u4E4B\u540E\u5DF2\u7ECF\u7EC8\u7ED3,\u6240\u4EE5\u9700\u8981\u4E8C\u6B21\u68C0\u67E5\u7EBF\u7A0B\u6C60\u5DE5\u4F5C\u7EBF\u7A0B\u7684\u72B6\u6001</span>
                <span class="token comment">//\u8FD9\u91CC\u535A\u4E3B\u4E5F\u662F\u770B\u4E86\u534A\u5929\uFF0C\u5927\u5BB6\u597D\u597D\u4F53\u4F1A\u4E0B</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">workerCountOf</span><span class="token punctuation">(</span>recheck<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token comment">//\u82E5\u5F53\u524D\u7EBF\u7A0B\u6C60\u5DE5\u4F5C\u7EBF\u7A0B\u6570\u4E3A0\uFF0C\u5219\u65B0\u5EFA\u4E00\u4E2A\u7EBF\u7A0B\u5E76\u6267\u884C</span>
                <span class="token function">addWorker</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//\u6B65\u9AA43\uFF1A</span>
        <span class="token comment">// \u5982\u679C\u4EFB\u52A1\u961F\u5217\u5DF2\u6EE1\uFF0C\u5C31\u9700\u8981\u521B\u5EFA\u975E\u6838\u5FC3\u7EBF\u7A0B</span>
        <span class="token comment">// \u5982\u679C\u65B0\u5EFA\u975E\u6838\u5FC3\u7EBF\u7A0B\u5931\u8D25\uFF0C\u5219\u6267\u884C\u9971\u548C\u7B56\u7565</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">addWorker</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h2 id="\u5E38\u7528\u7684\u7EBF\u7A0B\u6C60\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u7684\u7EBF\u7A0B\u6C60\u914D\u7F6E" aria-hidden="true">#</a> \u5E38\u7528\u7684\u7EBF\u7A0B\u6C60\u914D\u7F6E</h2><ol><li>\u5355\u7EBF\u7A0B</li><li>\u56FA\u5B9A\u7EBF\u7A0B\u6570</li><li>\u6267\u884C\u65F6\u95F4\u5F88\u77ED\uFF0C\u5207\u6362\u6BD4\u8F83\u5FEB\uFF1B</li><li>\u961F\u5217\u957F\u5EA6\u65E0\u9650 \u4EFB\u52A1\u5806\u79EF</li></ol><p>\u76D1\u63A7</p><p>parallel stream\uFF0C\u4E0D\u80FD\u7528IO\u963B\u585E</p><p>ForkJoinPool\uFF0C\u6838\u5FC3\u601D\u60F3\u662F\u5206\u6CBB\u8FD8\u6709\u4EFB\u52A1\u7A83\u53D6\uFF0C\u6BCF\u4E2A\u5DE5\u4F5C\u7EBF\u7A0B\u90FD\u7EF4\u62A4\u81EA\u5DF1\u7684\u4E00\u4E2A\u53CC\u7AEF\u961F\u5217\uFF0C\u7528\u6765\u5B58\u50A8\u5206\u914D\u7ED9\u81EA\u5DF1\u7684\u4EFB\u52A1\uFF0C\u5DE5\u4F5C\u4ECE\u81EA\u5DF1\u7684\u961F\u5C3E\u83B7\u53D6\u4EFB\u52A1\uFF0C</p><ol><li>\u5355\u4F8B</li><li>\u7B56\u7565</li><li>\u9002\u914D\u5668</li><li>\u6784\u9020\u8005</li><li>\u6A21\u677F\u65B9\u6CD5</li></ol>`,33);function t(o,c){return e}var r=s(p,[["render",t],["__file","threadpool-code-analysis.html.vue"]]);export{r as default};
