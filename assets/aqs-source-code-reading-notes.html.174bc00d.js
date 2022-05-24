import{r as e,c as p,a as n,d as t,F as c,b as o,e as s,o as l}from"./app.9da19d67.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";var u="/blog/assets/aqs-2.0e5bd873.png",i="/blog/assets/aqs-1.1496ea9c.png";const k={},b=o('<h1 id="aqs" tabindex="-1"><a class="header-anchor" href="#aqs" aria-hidden="true">#</a> AQS</h1><h2 id="\u6982\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u6982\u8FF0" aria-hidden="true">#</a> \u6982\u8FF0</h2><p>AbstractQueuedSynchronizer\uFF0C\u662F JDK \u63D0\u4F9B\u7684\u4E00\u4E2A\u540C\u6B65\u6846\u67B6\uFF0C\u5185\u90E8\u7EF4\u62A4\u7740 FIFO \u53CC\u5411\u961F\u5217\uFF0C\u5373 CLH \u540C\u6B65\u961F\u5217\u3002</p><p>AQS \u4F9D\u8D56\u5B83\u6765\u5B8C\u6210\u540C\u6B65\u72B6\u6001\u7684\u7BA1\u7406(voliate \u4FEE\u9970\u7684 state\uFF0C\u7528\u4E8E\u6807\u5FD7\u662F\u5426\u6301\u6709\u9501)\u3002\u5982\u679C\u83B7\u53D6\u540C\u6B65\u72B6\u6001 state \u5931\u8D25\u65F6\uFF0C\u4F1A\u5C06\u5F53\u524D\u7EBF\u7A0B\u53CA\u7B49\u5F85\u4FE1\u606F\u7B49\u6784\u5EFA\u6210\u4E00\u4E2A Node\uFF0C\u5C06 Node.js \u653E\u5230 FIFO \u961F\u5217\u91CC\uFF0C\u540C\u65F6\u963B\u585E\u5F53\u524D\u7EBF\u7A0B\uFF0C\u5F53\u7EBF\u7A0B\u5C06\u540C\u6B65\u72B6\u6001 state \u91CA\u653E\u65F6\uFF0C\u4F1A\u628A FIFO \u961F\u5217\u4E2D\u7684\u9996\u8282\u7684\u5524\u9192\uFF0C\u4F7F\u5176\u83B7\u53D6\u540C\u6B65\u72B6\u6001 state\u3002</p><p>\u5F88\u591A JUC \u5305\u4E0B\u7684\u9501\u90FD\u662F\u57FA\u4E8E AQS \u5B9E\u73B0\u7684</p><p>\u5982\u4E0B\u8111\u56FE\uFF1A</p><p><img src="'+u+`" alt="" loading="lazy"></p><h2 id="node-js-\u5185\u90E8\u7C7B" tabindex="-1"><a class="header-anchor" href="#node-js-\u5185\u90E8\u7C7B" aria-hidden="true">#</a> Node.js \u5185\u90E8\u7C7B</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/** \u5171\u4EAB\u8282\u70B9 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> SHARED <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u72EC\u5360\u8282\u70B9 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> EXCLUSIVE <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u56E0\u4E3A\u8D85\u65F6\u6216\u8005\u4E2D\u65AD\uFF0C\u8282\u70B9\u4F1A\u88AB\u8BBE\u7F6E\u6210\u53D6\u6D88\u72B6\u6001\uFF0C\u88AB\u53D6\u6D88\u7684\u8282\u70B9\u4E0D\u4F1A\u53C2\u4E0E\u5230\u7ADE\u4E89\u4E2D\uFF0C\u4F1A\u4E00\u76F4\u662F\u53D6\u6D88
            \u72B6\u6001\u4E0D\u4F1A\u6539\u53D8 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> CANCELLED <span class="token operator">=</span>  <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u540E\u7EE7\u8282\u70B9\u5904\u4E8E\u7B49\u5F85\u72B6\u6001\uFF0C\u5982\u679C\u5F53\u524D\u8282\u70B9\u91CA\u653E\u4E86\u540C\u6B65\u72B6\u6001\u6216\u8005\u88AB\u53D6\u6D88\uFF0C\u4F1A\u901A\u77E5\u540E\u7EE7\u8282\u70B9\uFF0C\u4F7F\u5176\u5F97\u4EE5
            \u8FD0\u884C */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> SIGNAL    <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u8282\u70B9\u5728\u7B49\u5F85\u6761\u4EF6\u961F\u5217\u4E2D\uFF0C\u8282\u70B9\u7EBF\u7A0B\u7B49\u5F85\u5728condition\u4E0A\uFF0C\u5F53\u5176\u4ED6\u7EBF\u7A0B\u5BF9condition\u8C03\u7528\u4E86signal
            \u540E\uFF0C\u8BE5\u8282\u70B9\u5C06\u4F1A\u4ECE\u7B49\u5F85\u961F\u5217\u4E2D\u8FDB\u5165\u540C\u6B65\u961F\u5217\u4E2D\uFF0C\u83B7\u53D6\u540C\u6B65\u72B6\u6001 */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> CONDITION <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * \u4E0B\u4E00\u6B21\u5171\u4EAB\u5F0F\u540C\u6B65\u72B6\u6001\u83B7\u53D6\u4F1A\u65E0\u6761\u4EF6\u7684\u4F20\u64AD\u4E0B\u53BB
         */</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> PROPAGATE <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u7B49\u5F85\u72B6\u6001 */</span>
        <span class="token keyword">volatile</span> <span class="token keyword">int</span> waitStatus<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u524D\u9A71\u8282\u70B9 */</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Node</span> prev<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u540E\u7EE7\u8282\u70B9 */</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Node</span> next<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** \u83B7\u53D6\u540C\u6B65\u72B6\u6001\u7684\u7EBF\u7A0B */</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Thread</span> thread<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * \u4E0B\u4E00\u4E2A\u6761\u4EF6\u961F\u5217\u7B49\u5F85\u8282\u70B9
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><h2 id="fifo-\u7ED3\u6784\u56FE" tabindex="-1"><a class="header-anchor" href="#fifo-\u7ED3\u6784\u56FE" aria-hidden="true">#</a> FIFO \u7ED3\u6784\u56FE</h2><p><img src="`+i+`" alt="" loading="lazy"></p><h2 id="\u72EC\u5360\u5F0F\u540C\u6B65\u72B6\u6001\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u72EC\u5360\u5F0F\u540C\u6B65\u72B6\u6001\u8FC7\u7A0B" aria-hidden="true">#</a> \u72EC\u5360\u5F0F\u540C\u6B65\u72B6\u6001\u8FC7\u7A0B</h2><h3 id="acquire" tabindex="-1"><a class="header-anchor" href="#acquire" aria-hidden="true">#</a> acquire</h3><p>\u72EC\u5360\u5F0F\u83B7\u53D6\u540C\u6B65\u72B6\u6001</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public final void acquire(int arg) {
    if (!tryAcquire(arg) &amp;&amp; acquireQueued(addWaiter(Node.EXCLUSIVE), arg)) {
        selfInterrupt();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="tryacquire" tabindex="-1"><a class="header-anchor" href="#tryacquire" aria-hidden="true">#</a> tryAcquire</h3><p>\u5C1D\u8BD5\u53BB\u83B7\u53D6\u9501\uFF0C\u83B7\u53D6\u6210\u529F\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002\u8BE5\u65B9\u6CD5\u7531\u7EE7\u627F AQS \u7684\u5B50\u7C7B\u81EA\u5DF1\u5B9E\u73B0\u3002\u91C7\u7528\u4E86\u6A21\u677F\u65B9\u6CD5\u8BBE\u8BA1\u6A21\u5F0F\u3002</p><p>\u5982\uFF1AReentrantLock\u7684Sync\u5185\u90E8\u7C7B\uFF0CSync\u7684\u5B50\u7C7B\uFF1A<code>NonfairSync</code>\u548C<code>FairSync</code></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Sync</span><span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="addwaiter" tabindex="-1"><a class="header-anchor" href="#addwaiter" aria-hidden="true">#</a> addWaiter</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Node</span> <span class="token function">addWaiter</span><span class="token punctuation">(</span><span class="token class-name">Node</span> mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// \u65B0\u5EFANode\u8282\u70B9</span>
       <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mode<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token comment">// \u5C1D\u8BD5\u5FEB\u901F\u6DFB\u52A0\u5C3E\u7ED3\u70B9</span>
       <span class="token class-name">Node</span> pred <span class="token operator">=</span> tail<span class="token punctuation">;</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>pred <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           node<span class="token punctuation">.</span>prev <span class="token operator">=</span> pred<span class="token punctuation">;</span>
           <span class="token comment">// CAS\u65B9\u5F0F\u8BBE\u7F6E\u5C3E\u7ED3\u70B9</span>
           <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetTail</span><span class="token punctuation">(</span>pred<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               pred<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
               <span class="token keyword">return</span> node<span class="token punctuation">;</span>
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
       <span class="token comment">// \u5982\u679C\u4E0A\u9762\u6DFB\u52A0\u5931\u8D25\uFF0C\u8FD9\u91CC\u5FAA\u73AF\u5C1D\u8BD5\u6DFB\u52A0\uFF0C\u76F4\u5230\u6DFB\u52A0\u6210\u529F\u4E3A\u6B62</span>
       <span class="token function">enq</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="enq" tabindex="-1"><a class="header-anchor" href="#enq" aria-hidden="true">#</a> enq</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token class-name">Node</span> <span class="token function">enq</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u4E00\u76F4for\u5FAA\u73AF\uFF0C\u76F4\u5230\u63D2\u5165Node\u6210\u529F\u4E3A\u6B62</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> t <span class="token operator">=</span> tail<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// CAS\u8BBE\u7F6E\u9996\u8282\u70B9</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetHead</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    tail <span class="token operator">=</span> head<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                node<span class="token punctuation">.</span>prev <span class="token operator">=</span> t<span class="token punctuation">;</span>
                <span class="token comment">// CAS\u8BBE\u7F6E\u5C3E\u7ED3\u70B9</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetTail</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    t<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    <span class="token keyword">return</span> t<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="acquirequeued" tabindex="-1"><a class="header-anchor" href="#acquirequeued" aria-hidden="true">#</a> acquireQueued</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">acquireQueued</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u64CD\u4F5C\u662F\u5426\u6210\u529F\u6807\u5FD7</span>
        <span class="token keyword">boolean</span> failed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u7EBF\u7A0B\u4E2D\u65AD\u6807\u5FD7</span>
            <span class="token keyword">boolean</span> interrupted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token comment">// \u4E0D\u65AD\u7684\u81EA\u65CB\u5FAA\u73AF</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// \u5F53\u524D\u8282\u70B9\u7684prev\u8282\u70B9</span>
                <span class="token keyword">final</span> <span class="token class-name">Node</span> p <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token function">predecessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// \u5224\u65ADprev\u662F\u5426\u662F\u5934\u7ED3\u70B9 &amp;&amp; \u662F\u5426\u83B7\u53D6\u5230\u540C\u6B65\u72B6\u6001</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> head <span class="token operator">&amp;&amp;</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// \u4EE5\u4E0A\u6761\u4EF6\u6210\u7ACB\uFF0C\u5C06\u5F53\u524D\u8282\u70B9\u8BBE\u7F6E\u6210\u5934\u7ED3\u70B9</span>
                    <span class="token function">setHead</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// \u5C06prev\u8282\u70B9\u79FB\u9664\u961F\u5217\u4E2D</span>
                    p<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// help GC</span>
                    failed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> interrupted<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// \u81EA\u65CB\u8FC7\u7A0B\u4E2D\uFF0C\u5224\u65AD\u5F53\u524D\u7EBF\u7A0B\u662F\u5426\u9700\u8981\u963B\u585E &amp;&amp; \u963B\u585E\u5F53\u524D\u7EBF\u7A0B\u5E76\u4E14\u68C0\u9A8C\u7EBF\u7A0B\u4E2D\u65AD\u72B6\u6001</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldParkAfterFailedAcquire</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> node<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
                    <span class="token function">parkAndCheckInterrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    interrupted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>failed<span class="token punctuation">)</span>
                <span class="token comment">// \u53D6\u6D88\u83B7\u53D6\u540C\u6B65\u72B6\u6001</span>
                <span class="token function">cancelAcquire</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="shouldparkafterfailedacquire" tabindex="-1"><a class="header-anchor" href="#shouldparkafterfailedacquire" aria-hidden="true">#</a> shouldParkAfterFailedAcquire</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
        // \u62FF\u5230\u5F53\u524D\u8282\u70B9\u7684prev\u8282\u70B9\u7684\u7B49\u5F85\u72B6\u6001
        int ws = pred.waitStatus;

        if (ws == Node.SIGNAL)
            /*
             * \u5982\u679Cprev\u7684status\u662Fsignal\uFF0C\u8868\u793A\u5F53prev\u91CA\u653E\u4E86\u540C\u6B65\u72B6\u6001\u6216\u8005\u53D6\u6D88\u4E86\uFF0C\u4F1A\u901A\u77E5\u5F53\u524D\u8282
             * \u70B9\uFF0C\u6240\u4EE5\u5F53\u524D\u8282\u70B9\u53EF\u4EE5\u5B89\u5FC3\u7684\u963B\u585E\u4E86\uFF08\u76F8\u5F53\u7761\u89C9\u4F1A\u6709\u4EBA\u53EB\u9192\u4ED6\uFF09
             */
            return true;
        if (ws &gt; 0) {
            /*
             * status &gt; 0\uFF0C\u8868\u793A\u4E3A\u53D6\u6D88\u72B6\u6001\uFF0C\u9700\u8981\u5C06\u53D6\u6D88\u72B6\u6001\u7684\u8282\u70B9\u4ECE\u961F\u5217\u4E2D\u79FB\u9664
             * \u76F4\u5230\u627E\u5230\u4E00\u4E2A\u72B6\u6001\u4E0D\u662F\u53D6\u6D88\u7684\u8282\u70B9\u4E3A\u6B62
             */
            do {
                node.prev = pred = pred.prev;
            } while (pred.waitStatus &gt; 0);
            pred.next = node;
        } else {
            /*
             * \u9664\u4E86\u4EE5\u4E0A\u60C5\u51B5\uFF0C\u901A\u8FC7CAS\u5C06prev\u7684status\u8BBE\u7F6E\u6210signal
             */
            compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
        }
        return false;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="parkandcheckinterrupt" tabindex="-1"><a class="header-anchor" href="#parkandcheckinterrupt" aria-hidden="true">#</a> parkAndCheckInterrupt</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private final boolean parkAndCheckInterrupt() {
    // \u963B\u585E\u5F53\u524D\u7EBF\u7A0B
    LockSupport.park(this);
    // \u8FD4\u56DE\u5F53\u524D\u7EBF\u7A0B\u7684\u4E2D\u65AD\u72B6\u6001
    return Thread.interrupted();
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>Sun.misc.Unsafe</code></p>`,30),d=s("\u53C2\u8003\u6587\u732E\uFF1A "),m={href:"https://mp.weixin.qq.com/s/PdB_1-C2FGl91vN3SM5ZVg",target:"_blank",rel:"noopener noreferrer"},h=s("2 \u4E07\u6708\u85AA\u5FC5\u4F1A\u77E5\u8BC6\uFF1AAQS");function w(y,f){const a=e("ExternalLinkIcon");return l(),p(c,null,[b,n("p",null,[d,n("a",m,[h,t(a)])])],64)}var N=r(k,[["render",w],["__file","aqs-source-code-reading-notes.html.vue"]]);export{N as default};
