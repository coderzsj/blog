<template><h2 id="java性能优化之字符串优化处理" tabindex="-1"><a class="header-anchor" href="#java性能优化之字符串优化处理" aria-hidden="true">#</a> Java性能优化之字符串优化处理</h2>
<h3 id="string对象" tabindex="-1"><a class="header-anchor" href="#string对象" aria-hidden="true">#</a> string对象</h3>
<p>String对象时JAVA中重要的数据类型，在大部分情况下我们都会用到String对象。</p>
<h2 id="string-s-new-string-111-会创建几个对象" tabindex="-1"><a class="header-anchor" href="#string-s-new-string-111-会创建几个对象" aria-hidden="true">#</a> String s = new String(&quot;111 &quot;)会创建几个对象？</h2>
<p>String不可变吗？</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> a <span class="token operator">=</span> <span class="token string">"111"</span><span class="token punctuation">;</span>
        a <span class="token operator">=</span> <span class="token string">"222"</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>有的人会认为上面这段代码应该输出：111</p>
<p>这样才和上面的不变性吻合。</p>
<p>哈哈哈，但是并不是这样滴。</p>
<p>222</p>
<p>这不对呀，不是不变吗？怎么变了呢？</p>
<p>其实在JVM的运行中，会单独给一块地分给String。</p>
<p>上面的：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Stirng</span> a<span class="token operator">=</span><span class="token string">"111"</span>；
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>我们知道字符串的分配和其他对象分配一样，是需要消耗高昂的时间和空间的，而且字符串我们使用的非常多。JVM为了提高性能和减少内存的开销，在实例化字符串的时候进行了一些优化：</p>
<p>使用字符串常量池。每当我们创建字符串常量时，JVM会首先检查字符串常量池，如果该字符串已经存在常量池中，那么就直接返回常量池中的实例引用。如果字符串不存在常量池中，就会实例化该字符串并且将其放到常量池中。由于String字符串的不可变性我们可以十分肯定常量池中一定不存在两个相同的字符串。</p>
<p>这里先去JVM给常量池里找，找到了就不用创建对象了，直接把对象的引用地址赋给a。找不到会重新创建一个对象，然后把对象的引用地址赋给a。同理a=&quot;222&quot;;也是先找，找不到就重新创建一个对象，然后把对象的引用地址赋给a。</p>
<p>大家有没有发现我上面的描述中“引用地址”。比如说 Object obj = new Object();很多人喜欢成obj为对象，其实obj不是对象，他只是一个变量，然后这个变量里保存一个Object对象的引用地址罢了。</p>
<p>引用类型声明的变量是指该变量在内存中实际存储的是一个引用地址，实体在堆中。</p>
<p>所以网上很多文章老喜欢这么说</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>创建了一个user对象，老喜欢把user称之为对象。这里不接受反驳。</p>
<p>所以上面<code>String a = &quot;111&quot;;</code>表达的是变量a里保存了“111
”这个对象的引用地址。变量是可以变的，不能变的是“111”。</p>
<p>String 为什么是不可变的？</p>
</template>
