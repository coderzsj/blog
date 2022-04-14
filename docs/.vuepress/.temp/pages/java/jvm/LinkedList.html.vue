<template><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>上篇文章我们分析了常见的ArrayList源码，它的内部是由一个数组来实现的。那么今天，我们来分析另一个常见的类LinkedList。本文分析都来自Java8。(ps:这段话写自写完本文记录后添加。个人感想为已经写成了介绍链表)</p>
<p>一、类说明</p>
<p>首先我们来看一下这个类。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>
    <span class="token class-name">E</span> item<span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> next<span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> prev<span class="token punctuation">;</span>
    
    <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">E</span> item<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> next<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> prev<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>item <span class="token operator">=</span> item<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prev <span class="token operator">=</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这是一个LinkedList的内部类，还是比较简单的。首先一个泛型的item变量，用来存储数据，然后有一个指向下一个结点的next指针，前一个结点的prev指针。</p>
<p>至此我们其实就可以得出结论，LinkedList果然名不虚传，内部就是由链表的形式实现。它并没有用数组来存储数据元素，而是由一个个Node类型结点来储存数据，然后每个Node结点通过指向前后结点的next和prev指针将整个List串联起来。我们来画张简单图来看看ArrayList和LinkedList的基本区别：</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>首先linkedlist
内部是由双向链表来实现的。我们存储的每一个数据都会被封装到一个数据节点之中。包括指向前节点的指针，数据，指向后节点的指针；依靠这些数据结点实现双向链表。</p>
<p>既然是链表，那么优点就是插入，修改，删除数据效率比数组高很多。因为在插入或者实时某个数据时，只需对要删除节点，前节点，后节点进行操作，无需像数组一样将后续数据全部前移或者后移。但是由此也看出缺点，因为链表并不是连续的空间存储，也没有什么下标进行记录位置，因此要寻找某个数据时只能进行遍历，而不像数组一样可以随机查找。如果在实际开发中，我们需要对某个list进行频繁的插入、删除，而且数据量有特别大的时候。可以考虑使用linkedlist。</p>
</template>
