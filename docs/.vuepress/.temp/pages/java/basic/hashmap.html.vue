<template><h2 id="hashmap的内部结构-线程不安全、基于jdk7" tabindex="-1"><a class="header-anchor" href="#hashmap的内部结构-线程不安全、基于jdk7" aria-hidden="true">#</a> HASHMAP的内部结构（线程不安全、基于JDK7）</h2>
<p>hashmap是无序的，因为每次根据 key 的 hashcode 映射到 Entry 数组上，所以遍历出来的顺序并不是写入的顺序。</p>
<p>HSAHMAP底层是基于数组和链表实现的，两个重要的参数：容量和负载因子；容量的默认大小的16，负载因子是0.75，当HashMap的size&gt;16*0.75时就会发生扩容（容量和负载因子都可以自由调整）。</p>
<p>内部包含了一个ENTRY类型的数组TABLE。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">transient</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> table<span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">K</span> key<span class="token punctuation">;</span>
    <span class="token class-name">V</span> value<span class="token punctuation">;</span>
    <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> next<span class="token punctuation">;</span>
    <span class="token keyword">int</span> hash<span class="token punctuation">;</span>

    <span class="token class-name">Entry</span><span class="token punctuation">(</span><span class="token keyword">int</span> h<span class="token punctuation">,</span> <span class="token class-name">K</span> k<span class="token punctuation">,</span> <span class="token class-name">V</span> v<span class="token punctuation">,</span> <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">=</span> v<span class="token punctuation">;</span>
        next <span class="token operator">=</span> n<span class="token punctuation">;</span>
        key <span class="token operator">=</span> k<span class="token punctuation">;</span>
        hash <span class="token operator">=</span> h<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">K</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> key<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">setValue</span><span class="token punctuation">(</span><span class="token class-name">V</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">V</span> oldValue <span class="token operator">=</span> value<span class="token punctuation">;</span>
        value <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        <span class="token keyword">return</span> oldValue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span> e <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
        <span class="token class-name">Object</span> k1 <span class="token operator">=</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> k2 <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>k1 <span class="token operator">==</span> k2 <span class="token operator">||</span> <span class="token punctuation">(</span>k1 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> k1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Object</span> v1 <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Object</span> v2 <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>v1 <span class="token operator">==</span> v2 <span class="token operator">||</span> <span class="token punctuation">(</span>v1 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> v1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"="</span> <span class="token operator">+</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><h2 id="hashmap-特性" tabindex="-1"><a class="header-anchor" href="#hashmap-特性" aria-hidden="true">#</a> HashMap 特性</h2>
<ol>
<li>存储键值对实现快速存取，允许为null。key值不可重复，若key值重复则覆盖。</li>
<li>非同步，线程不安全。</li>
<li>底层是hash表，不保证有序(比如插入的顺序，自然顺序)</li>
</ol>
<p>Treemap默认按照key的字典顺序来排序(升序) ，也可以自定义排序规则:要实现Comparator接口。</p>
<p>ArrayList，linkedList插入和检索顺序是一样的。</p>
<p>LinkedHashMap实现顺序性</p>
<h2 id="hashmap的底层原理" tabindex="-1"><a class="header-anchor" href="#hashmap的底层原理" aria-hidden="true">#</a> HashMap的底层原理</h2>
<p>基于hashing的原理，jdk8后采用数组+链表+红黑树的数据结构。</p>
<p>我们通过put和get存储和获取对象。</p>
<p>当我们给put()方法传递键和值时，先对键做一个hashCode()的计算来得到它在bucket数组中的位置来存储Entry对象。</p>
<p>当获取对象时，通过get获取到bucket的位置，再通过键对象的equals()方法找到正确的键值对，然后在返回值对象。</p>
<h2 id="put方法实现" tabindex="-1"><a class="header-anchor" href="#put方法实现" aria-hidden="true">#</a> put方法实现</h2>
<ol>
<li>计算关于key的hashcode值（与Key.hashCode的高16位做异或运算）</li>
<li>如果散列表为空时，调用resize()初始化散列表</li>
<li>如果没有发生碰撞，直接添加元素到散列表中去</li>
<li>如果发生了碰撞(hashCode值相同)，进行三种判断
<ul>
<li>若key地址相同或者equals后内容相同，则替换旧值</li>
<li>如果是红黑树结构，就调用树的插入方法</li>
<li>链表结构，循环遍历直到链表中某个节点为空，尾插法进行插入，插入之后判断链表个数是否到达变成红黑树的阙值8；也可以遍历到有节点与插入元素的哈希值和内容相同，进行覆盖。</li>
</ul>
</li>
</ol>
<h3 id="扩容机制" tabindex="-1"><a class="header-anchor" href="#扩容机制" aria-hidden="true">#</a> 扩容机制</h3>
<p>如果桶满了大于阀值，则resize进行扩容</p>
<ol>
<li>初始化数组table</li>
<li>当数组table的size达到阙值时即++size &gt; load factor * capacity 时，也是在putVal函数中</li>
</ol>
<p>扩容需要重新分配一个新数组，新数组是老数组的2倍长，然后遍历整个老结构，把所有的元素挨个重新hash分配到新结构中去。</p>
<div class="custom-container info"><p class="custom-container-title">ps</p>
<p>可见底层数据结构用到了数组，到最后会因为容量问题都需要进行扩容操作</p>
</div>
<h2 id="get方法实现" tabindex="-1"><a class="header-anchor" href="#get方法实现" aria-hidden="true">#</a> get方法实现</h2>
<p>对key的hashCode进行hashing，与运算计算下标获取bucket位置，如果在桶的首位上就可以找到就直接返回，否则在树中找或者链表中遍历找。</p>
<p>如果有hash冲突，则利用equals方法去遍历链表查找节点。</p>
<h2 id="hash方法实现" tabindex="-1"><a class="header-anchor" href="#hash方法实现" aria-hidden="true">#</a> hash方法实现</h2>
<p>对key的hashCode做hash操作，与高16位做异或运算</p>
<p>还有平方取中法，除留余数法，伪随机数法</p>
<h3 id="异或运算原因" tabindex="-1"><a class="header-anchor" href="#异或运算原因" aria-hidden="true">#</a> 异或运算原因</h3>
<p>为什么不直接将key作为哈希值而是与高16位做异或运算？</p>
<p>因为数组位置的确定用的是与运算，仅仅最后四位有效，设计者将key的哈希值与高16为做异或运算使得在做&amp;运算确定数组的插入位置时，此时的低位实际是高位与低位的结合，增加了随机性，减少了哈希碰撞的次数。</p>
<p>HashMap默认初始化长度为16，并且每次自动扩展或者是手动初始化容量时，必须是2的幂。</p>
<h3 id="_2次幂原因" tabindex="-1"><a class="header-anchor" href="#_2次幂原因" aria-hidden="true">#</a> 2次幂原因</h3>
<p>为什么是16？为什么必须是2的幂？如果输入值不是2的幂比如10会怎么样？</p>
<ol>
<li>
<p>为了数据的均匀分布，减少哈希碰撞。因为确定数组位置是用的位运算，若数据不是2的次幂则会增加哈希碰撞的次数和浪费数组空间。(PS:其实若不考虑效率，求余也可以就不用位运算了也不用长度必需为2的幂次) <code>hash % length 等于 hash &amp; ( length - 1)</code></p>
</li>
<li>
<p>输入数据若不是2的幂，HashMap通过一通位移运算和或运算得到的肯定是2的幂次数，并且是离那个数最近的数字,</p>
</li>
</ol>
<p>按位与运算规则:相同的二进制数位上,都是1的时候,结果为1.否则为0;</p>
<h3 id="解决hash冲突" tabindex="-1"><a class="header-anchor" href="#解决hash冲突" aria-hidden="true">#</a> 解决hash冲突</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">hash</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">int</span> h<span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token punctuation">(</span>h <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token punctuation">(</span>h <span class="token operator">>>></span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>key 的 hashCode 赋值给 h，然后与 h 无符号右移 16 位后的二进制进行按位异或得到最后的 hash 值。</p>
<p>会产生哈希碰撞，若key值相同则替换旧值，不然链接到链表后面，链表长度超过阙值8就转为红黑树存储</p>
<p>HashCode相同，通过equals比较内容获取值对象</p>
<h3 id="扩容" tabindex="-1"><a class="header-anchor" href="#扩容" aria-hidden="true">#</a> 扩容</h3>
<p>如果HashMap的大小超过了负载因子(load factor)定义的容量</p>
<p>超过阙值会进行扩容操作，概括的讲就是扩容后的数组大小是原数组的2倍，将原来的元素 rehash 放入到新的散列表中去。</p>
<p>扩容这个过程涉及到 rehash、复制数据等操作，非常消耗性能。所以开发中尽量减少扩容的次数，可以通过创建 HashMap 集合对象时指定初始容量来尽量避免。</p>
<h3 id="rehash方法-不需要重新计算hash" tabindex="-1"><a class="header-anchor" href="#rehash方法-不需要重新计算hash" aria-hidden="true">#</a> rehash方法：不需要重新计算hash</h3>
<p>因为每次扩容都是翻倍，扩容之后结点要么就在原来的位置，与原来计算的 (n - 1) &amp; hash 的结果相比，只是多了一个 bit 位，rehash设计为结点要么就在原来的位置，要么就被分配到 <strong>“原位置 + 旧容量”</strong> 这个位置。</p>
<p>元素桶位置，新增的 1bit 是0还是 1是随机的，在 resize 的过程中保证了 rehash 之后每个桶上的结点数一定小于等于原来桶上的结点数，保证了rehash之后不会出现更严重的 hash 冲突，均匀的把之前的冲突的结点分散到新的桶中了。</p>
<h2 id="hashtable" tabindex="-1"><a class="header-anchor" href="#hashtable" aria-hidden="true">#</a> hashtable</h2>
<p>Hashtable没有自定义哈希算法，而直接采用的key的hashCode()。</p>
<h2 id="loadfactor" tabindex="-1"><a class="header-anchor" href="#loadfactor" aria-hidden="true">#</a> loadFactor</h2>
<p>loadFactor表示HashMap的拥挤程度，影响hash操作到同一个数组位置的概率。</p>
<p>默认loadFactor等于0.75，当HashMap里面容纳的元素已经达到HashMap数组长度的75%时，表示HashMap太挤了，需要扩容，在HashMap的构造器中可以定制loadFactor。</p>
<h2 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h2>
<h3 id="二叉查找树" tabindex="-1"><a class="header-anchor" href="#二叉查找树" aria-hidden="true">#</a> 二叉查找树</h3>
<p>二叉查找树就是左结点小于根节点，右结点大于根节点的一种排序树，也叫二叉搜索树。也叫BST，英文Binary Sort Tree。</p>
<p>二叉查找树比普通树查找更快，查找、插入、删除的时间复杂度为<code>O（logN）</code>。但是二叉查找树有一种极端的情况，就是会变成一种线性链表似的结构。此时时间复杂度就变成了<code>O（N）</code>，为了解决这种情况，出现了二叉平衡树。</p>
<h3 id="avl" tabindex="-1"><a class="header-anchor" href="#avl" aria-hidden="true">#</a> avl</h3>
<p>平衡二叉树全称平衡二叉搜索树，也叫AVL树。是一种自平衡的树。</p>
<p>AVL树也规定了左结点小于根节点，右结点大于根节点。并且还规定了左子树和右子树的高度差不得超过1。</p>
<p>这样保证了它不会成为线性的链表。</p>
<p>AVL树的查找稳定，查找、插入、删除的时间复杂度都为O（logN），但是由于要维持自身的平衡，所以进行插入和删除结点操作的时候，需要对结点进行频繁的旋转。</p>
<h3 id="redblack树" tabindex="-1"><a class="header-anchor" href="#redblack树" aria-hidden="true">#</a> RedBlack树</h3>
<p>红黑树的使用场景
java中使用到红黑树的有TreeSet和JDK1.8的HashMap。</p>
<p>红黑树也叫RB树，RB-Tree。是一种自平衡的二叉查找树，它的节点的颜色为红色和黑色。它不严格控制左、右子树高度或节点数之差小于等于1。也是一种解决二叉查找树极端情况的数据结构。</p>
<p>当链表长度大于8时，遍历查找效率较慢，故引入红黑树;因为红黑树在插入新数据之后，可能会通过左旋、右旋、变色来保持平衡，故链路较短时，不适合用红黑树。</p>
<p>红黑树的特性：</p>
<ol>
<li>节点是红色或黑色。</li>
<li>根节点是黑色。</li>
<li>每个叶子节点都是黑色的空节点（NIL节点）。</li>
<li>每个红色节点的两个子节点都是黑色。也就是说从每个叶子到根的所有路径上不能有两个连续的红色节点)。</li>
<li>从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。</li>
</ol>
<p>旋转的目的是将节点多的一支出让节点给另一个节点少的一支，旋转操作在插入和删除操作中经常会用到，所以要熟记。</p>
<p>它们非常相似，真正的区别在于在任何添加/删除操作时完成的旋转操作次数。保证平衡性的最大目的就是降低术的高度，因为树的查找性能取决于树的高度，所以树的高度越低搜索的效率越高！</p>
<p>这也是为什么存在二叉树、搜索二叉树等，各类树的目的。</p>
<p>红黑树在查找方面和AVL树操作几乎相同。 但是在插入和删除操作上，AVL树每次插入删除会进行大量的平衡度计算，红黑树没有像avl严格的高度平衡，它只要求部分地达到平衡要求，结合变色，降低了对旋转的要求，从而提高了性能。</p>
<p>红黑树能够以<code>O(log^2n)</code>的时间复杂度进行搜索、插入、删除操作。此外，由于它的设计，任何不平衡都会在三次旋转之内解决。</p>
<h2 id="平时在使用hashmap时一般使用什么类型的元素作为key" tabindex="-1"><a class="header-anchor" href="#平时在使用hashmap时一般使用什么类型的元素作为key" aria-hidden="true">#</a> 平时在使用HashMap时一般使用什么类型的元素作为Key？</h2>
<p>选择<code>Integer</code>，<code>String</code>这种不可变的类型，像对<code>String</code>的一切操作都是新建一个<code>String</code>对象，对新的对象进行拼接分割等，这些类已经很规范的覆写了<code>hashCode()</code>以及<code>equals()</code>方法。作为不可变类天生是线程安全的，</p>
<h2 id="hashmap" tabindex="-1"><a class="header-anchor" href="#hashmap" aria-hidden="true">#</a> HashMap</h2>
<p>JDK1.7版本，HashMap的数据结构是什么？</p>
<p>数组+单向链表</p>
<p>什么叫做Hash桶</p>
<p>数组中的单向链表</p>
<p>HashMap的数组长度为什么必须是2的幂？</p>
<p>计算元素存在数组中下标的算法：hash值 &amp; 数组长度-1</p>
<p>如果数组长度不是2的幂，减1后二进制的某一位有可能出现0，导致数组某个位置永远存不到数据</p>
<p>HashMap的默认负载因子是多少，作用是什么？</p>
<p>默认负载因子是0.75</p>
<p>作用：数组长度*负载因子=阈值（扩容条件）</p>
<p>HashMap的默认负载因子为什么是0.75？</p>
<p>取得了时间和空间的平衡</p>
<p>假设负载因子过大，导致数组装满后才扩容，牺牲时间，利用空间</p>
<p>假设负载因子过小，导致数组装载较少内容就扩容，牺牲空间，利用时间</p>
<p>HashMax数组最大长度是多少？</p>
<p>1 &lt;&lt; 30</p>
<p>HashMap数组最大长度为什么是1 &lt;&lt; 30？</p>
<p>因为数组长度必须是2的幂并且HashMap数组最大长度的变量为int类型，所有1&lt;&lt;30</p>
<p>什么叫做Hash碰撞/冲突？</p>
<p>两个对象的hash值一样，导致在数组中的下标一样</p>
<p>HashMap何时扩容？</p>
<p>元素个数&gt;=阈值，并且存入数据的位置不等于null</p>
<h2 id="hashmap扩容机制是什么" tabindex="-1"><a class="header-anchor" href="#hashmap扩容机制是什么" aria-hidden="true">#</a> HashMap扩容机制是什么？</h2>
<ol>
<li>如果节点的NEXT属性为NULL，则说明这个一个最正常的节点，不是桶内链表，也不是红黑树，这样的节点可以直接计算索引位置，然后插入。</li>
<li>如果是一颗红黑树，会使用SPLIT方法进行处理，原理就是将红黑树拆分成两个TREENODE链表，然后判断每个链表的长度是否小于等于六，如果是，九江TREENODE转换成桶内链表，否则再转换成红黑树。</li>
<li>如果是桶内链表，则将链表拷贝到新数组中，保证链表的顺序不变。</li>
</ol>
<p>原来的2倍，在REHASH之后，元素的存放位置要么是在原位置，要么是在原位置的基础上向下移动之前容量个数的位置。比如：上次容量是16，下次扩容后容量变成了16*2=32。如果一个元素原先在下表为七的位置上，那么扩容后，该元素要么还在七的位置上，要么就在七加十六的位置上。</p>
<p>HashMap存入null键的位置？</p>
<p>hash数组下标为0的位置</p>
<p>什么叫做Hash回环？</p>
<p>多线程下会出现Hash回环</p>
<p>线程1：不断添加数据，导致不断扩容</p>
<p>线程2：不断遍历</p>
<p>出现Hash回环，活该，HashMap明确说明该集合不是个线程安全的集合，多线程下应该使用ConcurrentHashMap</p>
<p>JDK1.7版本和JDK1.8版本的HashMap的区别</p>
<p>JDK1.7：数组+链表，头插法，通过散列算法获取hash值</p>
<p>JDK1.8：数组+链表+红黑树，尾插法，通过低16位^高16位让hash值更加散列</p>
<p>JDK1.8版本HashMap为什么添加红黑树的数据结构？</p>
<p>因为链表查询慢，红黑树查询快</p>
<p>JDK1.8版本什么时候由数组+链表变成数组+红黑树</p>
<p>链表长度&gt;8并且数组长度&gt;64时，从数组+链表变成数组+红黑树</p>
<p>JDK1.8版本为什么链表长度大于8时，变成数组+红黑树</p>
<p>因为泊松部分（统计概率学），当红黑树里的数据小于6
时，又会将数组+红黑树变会数组+链表；而且根据统计，链表中节点数是8的概率已经接近千分之一，而且此时链表的性能已经很差了。</p>
</template>
