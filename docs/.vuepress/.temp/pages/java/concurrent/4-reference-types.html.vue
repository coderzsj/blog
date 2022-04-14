<template><h1 id="四种引用类型" tabindex="-1"><a class="header-anchor" href="#四种引用类型" aria-hidden="true">#</a> 四种引用类型</h1>
<h2 id="强引用" tabindex="-1"><a class="header-anchor" href="#强引用" aria-hidden="true">#</a> 强引用</h2>
<p>强引用是使用最普遍的引用。如果一个对象具有强引用，那垃圾收集器绝不会回收它。</p>
<p>但是如果这个<code>strong-reference</code>是全局变量时，就需要在不用这个对象时赋值为<code>null</code>，因为强引用不会被垃圾回收。</p>
<p>例如：<code>ArrayList</code>的 <code>Clear</code>方法：</p>
<p>在<code>ArrayList</code>类中定义了一个<code>elementData</code>数组，在调用clear方法清空数组时，每个数组元素被赋值为null。不同于<code>elementData=null</code>，强引用仍然存在，避免在后续调用<code>add()</code>等方法添加元素时进行内存的重新分配。使用如<code>clear()</code>方法内存数组中存放的引用类型进行内存释放特别适用，这样就可以及时释放内存。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        modCount<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token comment">// clear to let 垃圾收集器 do its work</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            elementData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_2-软引用" tabindex="-1"><a class="header-anchor" href="#_2-软引用" aria-hidden="true">#</a> 2. 软引用</h2>
<p>SoftReference的主要特点就是在当内存不够的时候，垃圾收集器会回收软引用所引用的对象。</p>
<p>在内存敏感的项目中将某些数据设置成SoftReference可以避免内存的溢出。</p>
<h2 id="_3-弱引用-weakreference" tabindex="-1"><a class="header-anchor" href="#_3-弱引用-weakreference" aria-hidden="true">#</a> 3. 弱引用（weakReference）</h2>
<p>当一个对象仅被弱引用指向, 而没有任何其他强引用指向的时候, 如果这时垃圾收集器运行, 那么这个对象就会被回收，不论当前的内存空间是否足够，这个对象都会被回收。引用队列注册引用的对象，在适当的可达的改变被监听</p>
<h2 id="_4-phantomreference-虚引用" tabindex="-1"><a class="header-anchor" href="#_4-phantomreference-虚引用" aria-hidden="true">#</a> 4. PhantomReference 虚引用</h2>
<p>虚引用顾名思义，就是形同虚设。</p>
<p>如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾收集器回收。</p>
<p>与其他几种引用都不同，虚引用并不会决定对象的生命周期。</p>
<h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3>
<p>虚引用主要用来跟踪对象被垃圾收集器回收的活动。</p>
<p>如果程序发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取必要的行动。</p>
</template>
