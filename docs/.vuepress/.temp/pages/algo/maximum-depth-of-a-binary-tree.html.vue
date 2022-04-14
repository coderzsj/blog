<template><h2 id="二叉树的最大深度" tabindex="-1"><a class="header-anchor" href="#二叉树的最大深度" aria-hidden="true">#</a> 二叉树的最大深度</h2>
<p>给定一个二叉树，找出其最大深度。</p>
<p>二叉树的深度为根节点到最远叶子节点的路径上的节点数。</p>
<p>说明:</p>
<p>叶子节点是指没有子节点的节点。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>给定二叉树` [3,9,20,null,null,15,7]`

    3
   / \
  9  20
    /  \
   15   7

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>返回它的最大深度 3 。</p>
<p>解题思路：</p>
<p>要求二叉树的最大深度，我们可以先求出左子树和右子树的深度 l 和 r</p>
<p>那就可以计算出二叉树的最大深度了：max( l,r )+1</p>
<p>而左子树和右子树的最大深度又可以以同样的方式进行计算。</p>
<p>因此我们可以用「深度优先搜索」的方法来计算二叉树的最大深度。</p>
<p>具体而言，在计算当前二叉树的最大深度时，可以先递归计算出其左子树和右子树的最大深度，然后在 O(1) 时间内计算出当前二叉树的最大深度。递归在访问到空节点时退出。</p>
<p>:::: 递归求最大深度</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token keyword">class</span> <span class="token class-name">TreeNode</span> <span class="token punctuation">{</span>
    <span class="token class-name">Node</span> left<span class="token punctuation">;</span>
    <span class="token class-name">Node</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">maxDepth</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token comment">//递归终止情况：节点为空</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span><span class="token punctuation">{</span>
             <span class="token keyword">int</span> ldpeth <span class="token operator">=</span> <span class="token function">maxDepth</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token keyword">int</span> rdpeth <span class="token operator">=</span> <span class="token function">maxDepth</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>ldpeth <span class="token punctuation">,</span> rdpeth <span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>通过
执行用时：100 ms，在所有 C# 提交中击败了 43.46%的用户
内存消耗：25.7 MB，在所有 C# 提交中击败了 10.73%的用户</p>
<p>时间复杂度：O(n) O( n )其中 n 为二叉树节点的个数。每个节点在递归中只被遍历一次。
空间复杂度：O(n) 空间复杂度：O( height ) 其中 height 表示二叉树的高度。递归函数需要栈空间，而栈空间取决于递归的深度，因此空间复杂度等价于二叉树的高度。</p>
<h2 id="广度优先搜索" tabindex="-1"><a class="header-anchor" href="#广度优先搜索" aria-hidden="true">#</a> 广度优先搜索</h2>
<p>思路：广度优先搜索的队列里存放的是「当前层的所有节点」。</p>
<p>每次拓展下一层的时候，不同于广度优先搜索的每次只从队列里拿出一个节点，</p>
<p>我们需要将队列里的所有节点都拿出来进行拓展，这样能保证每次拓展完的时候队列里存放的是当前层的所有节点，即我们是一层一层地进行拓展，最后我们用一个变量 ans 来维护拓展的次数，该二叉树的最大深度即为 ans。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums1<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums2<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> p1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> p2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sorted <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>m <span class="token operator">+</span> n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> cur<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>p1 <span class="token operator">&lt;</span> m <span class="token operator">||</span> p2 <span class="token operator">&lt;</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p1 <span class="token operator">==</span> m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cur <span class="token operator">=</span> nums2<span class="token punctuation">[</span>p2<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p2 <span class="token operator">==</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cur <span class="token operator">=</span> nums1<span class="token punctuation">[</span>p1<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums1<span class="token punctuation">[</span>p1<span class="token punctuation">]</span> <span class="token operator">&lt;</span> nums2<span class="token punctuation">[</span>p2<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cur <span class="token operator">=</span> nums1<span class="token punctuation">[</span>p1<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                cur <span class="token operator">=</span> nums2<span class="token punctuation">[</span>p2<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sorted<span class="token punctuation">[</span>p1 <span class="token operator">+</span> p2 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> cur<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">!=</span> m <span class="token operator">+</span> n<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> sorted<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="深度优先遍历" tabindex="-1"><a class="header-anchor" href="#深度优先遍历" aria-hidden="true">#</a> 深度优先遍历</h2>
<p>指对每一个可能的分支路径深入到不能再深入为止，而且每个节点只能访问一次。</p>
<p>二叉树的深度优先遍历分为：先序遍历，中序遍历和后序遍历</p>
<ul>
<li>先序遍历：先访问根，在访问左子树，最后访问右子树，总结就是“根左右”；</li>
<li>中序遍历：先访问左子树，再访问根，最后访问右子树，总结就是“左根右”；</li>
<li>后序遍历：先访问左子树，再访问右子树，最后访问根，总结就是“左右根”。</li>
</ul>
</template>
