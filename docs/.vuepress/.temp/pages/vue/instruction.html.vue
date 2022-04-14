<template><h2 id="directives" tabindex="-1"><a class="header-anchor" href="#directives" aria-hidden="true">#</a> directives</h2>
<p>表格临时回车跳转</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>    <span class="token literal-property property">nextSelect</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">bind</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span><span class="token punctuation">,</span> vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        el<span class="token punctuation">.</span><span class="token function-variable function">onkeydown</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>ev<span class="token punctuation">.</span>keyCode <span class="token operator">===</span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> nextInput <span class="token operator">=</span> vnode<span class="token punctuation">.</span>context<span class="token punctuation">.</span>$refs<span class="token punctuation">[</span>value<span class="token punctuation">]</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nextInput <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> nextInput<span class="token punctuation">.</span>focus <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              nextInput<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>浅拷贝 ： 只是将数据中所有的数据引用下来，依旧指向同一个存放地址，拷贝之后的数据修改之后，也会影响到原数据的中的对象数据。例如:Object.assign(),...扩展运算符</p>
<p>深拷贝： 将数据中所有的数据拷贝下来，对拷贝之后的数据进行修改不会影响到原数据。</p>
<p>JSON.parse(JSON.stringify(obj))深拷贝的问题</p>
<p>JSON.parse(JSON.stringify(obj))深拷贝的问题</p>
<ol>
<li>如果 obj 里面存在时间对象,JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。</li>
<li>如果 obj 里有 RegExp、Error 对象，则序列化的结果将只得到空对象。</li>
<li>如果 obj 里有函数，undefined，则序列化的结果会把函数， undefined 丢失。</li>
<li>如果 obj 里有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null。</li>
<li>JSON.stringify()只能序列化对象的可枚举的自有属性。如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor。</li>
<li>如果对象中存在循环引用的情况也无法正确实现深拷贝。</li>
</ol>
</template>
