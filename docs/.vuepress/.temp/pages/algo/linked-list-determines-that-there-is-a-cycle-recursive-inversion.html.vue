<template><h2 id="链表算法" tabindex="-1"><a class="header-anchor" href="#链表算法" aria-hidden="true">#</a> 链表算法</h2>
<p>判断链表是否有环</p>
<p>定义一个临时变量引用指向当前的节点</p>
<p>定义一个 hashmap。Key 与 value 当时当前的节点。</p>
<p>该节点存在于 hashmap 中，node.get(tmp) ，则确定有环， 没有就存放该的节点。</p>
<h1 id="单链表反转" tabindex="-1"><a class="header-anchor" href="#单链表反转" aria-hidden="true">#</a> 单链表反转</h1>
<p>从当前链表的首节点开始循环遍历，一直到链表的最后一个节点，会逐个改变所遍历的节点的指针域，另其指向前一个节点。</p>
<p>具体的实现方法也很简单，借助三个指针即可。首先我们定义 3 个指针并分别命名为 begn，mid，end。他们的初始指向如图 3 所示：</p>
<p><a href="docs/algo/img/1-1.png"></a></p>
<h2 id="递归反转" tabindex="-1"><a class="header-anchor" href="#递归反转" aria-hidden="true">#</a> 递归反转</h2>
<p>链表的尾节点开始，依次向前遍历，遍历过程一次改变各节点的指向，即另其指向前一个节点。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
 <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token class-name">Data</span><span class="token punctuation">;</span><span class="token comment">// 数据域</span>
 <span class="token keyword">private</span> <span class="token class-name">Node</span> <span class="token class-name">Next</span><span class="token punctuation">;</span><span class="token comment">// 指针域</span>
 <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token class-name">Data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// super();</span>
  <span class="token class-name"><span class="token namespace">this<span class="token punctuation">.</span></span>Data</span> <span class="token operator">=</span> <span class="token class-name">Data</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> javatest1 <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span>node1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        node1<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span>node2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        node2<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span>node3<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 调用反转方法</span>
        head <span class="token operator">=</span> <span class="token class-name">Reverse1</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            head <span class="token operator">=</span> head<span class="token punctuation">.</span><span class="token function">getNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 递归，在反转当前节点之前先反转后续节点
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token class-name">Reverse1</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// head看作是前一结点，head.getNext()是当前结点，reHead是反转后新链表的头结点</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span><span class="token function">getNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span><span class="token comment">// 若为空链或者当前结点的下一个节点在尾结点，则直接还回</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> reHead <span class="token operator">=</span> <span class="token class-name">Reverse1</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span><span class="token function">getNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 先反转后续节点head.getNext()</span>
        head<span class="token punctuation">.</span><span class="token function">getNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 将当前结点的指针域指向前一结点</span>
        head<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 前一结点的指针域令为null;</span>
        <span class="token keyword">return</span> reHead<span class="token punctuation">;</span><span class="token comment">// 反转后新链表的头结点</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div></template>
