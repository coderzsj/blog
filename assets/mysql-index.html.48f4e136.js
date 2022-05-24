import{b as s}from"./app.9da19d67.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=s(`<h2 id="sql\u8C03\u4F18" tabindex="-1"><a class="header-anchor" href="#sql\u8C03\u4F18" aria-hidden="true">#</a> sql\u8C03\u4F18</h2><h3 id="\u4F7F\u7528exists\u4EE3\u66FFin" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528exists\u4EE3\u66FFin" aria-hidden="true">#</a> \u4F7F\u7528exists\u4EE3\u66FFin</h3><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>
<span class="token keyword">select</span> name <span class="token keyword">from</span> a <span class="token keyword">where</span> id <span class="token operator">in</span><span class="token punctuation">(</span><span class="token keyword">select</span> id <span class="token keyword">from</span> b<span class="token punctuation">)</span>

<span class="token comment">-- \u5982\u679C\u6211\u4EEC\u5C06\u8FD9\u6761\u8BED\u53E5\u6362\u6210\u4E0B\u9762\u7684\u5199\u6CD5\uFF1A</span>

<span class="token keyword">select</span> name <span class="token keyword">from</span> a <span class="token keyword">where</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token number">1</span> <span class="token keyword">from</span> b <span class="token keyword">where</span> id <span class="token operator">=</span> a<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="\u907F\u514D\u5728-where-\u5B50\u53E5\u4E2D\u5BF9\u5B57\u6BB5\u8FDB\u884C\u51FD\u6570\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u907F\u514D\u5728-where-\u5B50\u53E5\u4E2D\u5BF9\u5B57\u6BB5\u8FDB\u884C\u51FD\u6570\u64CD\u4F5C" aria-hidden="true">#</a> \u907F\u514D\u5728 where \u5B50\u53E5\u4E2D\u5BF9\u5B57\u6BB5\u8FDB\u884C\u51FD\u6570\u64CD\u4F5C</h3><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> substring<span class="token punctuation">(</span>name<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string">&#39;zs&#39;</span>

<span class="token comment">--\u6216</span>

<span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> datediff<span class="token punctuation">(</span><span class="token keyword">day</span><span class="token punctuation">,</span>datefield<span class="token punctuation">,</span><span class="token string">&#39;2022-07-17&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span>    

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="like-\u4E2D\u901A\u914D\u7B26\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#like-\u4E2D\u901A\u914D\u7B26\u7684\u4F7F\u7528" aria-hidden="true">#</a> like \u4E2D\u901A\u914D\u7B26\u7684\u4F7F\u7528</h3><p>\u4E0B\u9762\u7684\u8BED\u53E5\u4F1A\u5BFC\u81F4\u5168\u8868\u626B\u63CF\uFF0C\u5C3D\u91CF\u5C11\u7528\u3002\u5982\uFF1A</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">like</span><span class="token string">&#39;%zs%&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="between-and-\u4EE3\u66FF-in-\u5C11\u7528-in-\u6216-not-in" tabindex="-1"><a class="header-anchor" href="#between-and-\u4EE3\u66FF-in-\u5C11\u7528-in-\u6216-not-in" aria-hidden="true">#</a> between and \u4EE3\u66FF in \u5C11\u7528 in \u6216 not in</h3><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> name <span class="token keyword">from</span> tabel <span class="token keyword">where</span> id <span class="token operator">in</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u50CF\u8FD9\u79CD\u8FDE\u7EED\u7684\u6570\u503C\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 BETWEEN AND\uFF0C\u5982\uFF1A</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> name <span class="token keyword">from</span> tabel <span class="token keyword">where</span> id <span class="token operator">between</span> <span class="token number">1</span> <span class="token operator">and</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="\u907F\u514D\u5728-where-\u5B50\u53E5\u4E2D\u4F7F\u7528-or\u6765\u94FE\u63A5\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u907F\u514D\u5728-where-\u5B50\u53E5\u4E2D\u4F7F\u7528-or\u6765\u94FE\u63A5\u6761\u4EF6" aria-hidden="true">#</a> \u907F\u514D\u5728 where \u5B50\u53E5\u4E2D\u4F7F\u7528 or\u6765\u94FE\u63A5\u6761\u4EF6</h3><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">&#39;zs&#39;</span> <span class="token operator">or</span> name <span class="token operator">=</span> <span class="token string">&#39;PHP&#39;</span>

<span class="token comment">-- \u8FD9\u79CD\u60C5\u51B5\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8FD9\u6837\u5199\uFF1A</span>

<span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">&#39;zs&#39;</span>

<span class="token keyword">union</span> <span class="token keyword">all</span>

<span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">&#39;PHP&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="\u907F\u514D\u5728-where-\u5B50\u53E5\u4E2D\u4F7F\u7528-\u6216-\u64CD\u4F5C\u7B26" tabindex="-1"><a class="header-anchor" href="#\u907F\u514D\u5728-where-\u5B50\u53E5\u4E2D\u4F7F\u7528-\u6216-\u64CD\u4F5C\u7B26" aria-hidden="true">#</a> \u907F\u514D\u5728 where \u5B50\u53E5\u4E2D\u4F7F\u7528 != \u6216 &lt;&gt; \u64CD\u4F5C\u7B26</h3><p>\u907F\u514D\u5728where\u5B50\u53E5\u4E2D\u4F7F\u7528 is null \u6216 is not null \u5BF9\u5B57\u6BB5\u8FDB\u884C\u5224\u65AD\u3002</p><p>\u5982\uFF1A</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> name <span class="token operator">is</span> <span class="token boolean">null</span><span class="token punctuation">\`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u5728\u8FD9\u4E2A\u67E5\u8BE2\u4E2D\uFF0C\u5C31\u7B97\u6211\u4EEC\u4E3A name \u5B57\u6BB5\u8BBE\u7F6E\u4E86\u7D22\u5F15\uFF0C\u67E5\u8BE2\u5206\u6790\u5668\u4E5F\u4E0D\u4F1A\u4F7F\u7528\uFF0C\u56E0\u6B64\u67E5\u8BE2\u6548\u7387\u5E95\u4E0B\u3002</p><p>\u4E3A\u4E86\u907F\u514D\u8FD9\u6837\u7684\u67E5\u8BE2\uFF0C\u5728\u6570\u636E\u5E93\u8BBE\u8BA1\u7684\u65F6\u5019\uFF0C\u5C3D\u91CF\u5C06\u53EF\u80FD\u4F1A\u51FA\u73B0 null \u503C\u7684\u5B57\u6BB5\u8BBE\u7F6E\u9ED8\u8BA4\u503C\uFF0C\u8FD9\u91CC\u5982\u679C\u6211\u4EEC\u5C06 name \u5B57\u6BB5\u7684\u9ED8\u8BA4\u503C\u8BBE\u7F6E\u4E3A0\uFF0C\u90A3\u4E48\u6211\u4EEC\u5C31\u53EF\u4EE5\u8FD9\u6837\u67E5\u8BE2\uFF1A</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">\`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u7D22\u5F15\u4E0D\u5B58\u50A8\u7A7A\u503C\uFF0C\u5982\u679C\u4E0D\u9650\u5236\u7D22\u5F15\u5217\u662Fnot null\uFF0C\u6570\u636E\u5E93\u4F1A\u8BA4\u4E3A\u7D22\u5F15\u5217\u6709\u53EF\u80FD\u5B58\u5728\u7A7A\u503C\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u6309\u7167\u7D22\u5F15\u8FDB\u884C\u8BA1\u7B97\u3002</p><h3 id="\u6700\u5DE6\u539F\u5219" tabindex="-1"><a class="header-anchor" href="#\u6700\u5DE6\u539F\u5219" aria-hidden="true">#</a> \u6700\u5DE6\u539F\u5219</h3><p>\u590D\u5408\u7D22\u5F15\u4E2D\u7D22\u5F15\u5217\u6309\u987A\u5E8F\u67E5\u8BE2\uFF0C\u5982\u679C\u4E0D\u662F\u6309\u7167\u7D22\u5F15\u7684\u6700\u5DE6\u5217\u5F00\u59CB\u67E5\u627E\uFF0C\u5219\u65E0\u6CD5\u4F7F\u7528\u7D22\u5F15</p><h3 id="\u8986\u76D6\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#\u8986\u76D6\u7D22\u5F15" aria-hidden="true">#</a> \u8986\u76D6\u7D22\u5F15</h3><p>\u5982\u679C\u4E00\u4E2A\u7D22\u5F15\u5305\u542B\uFF08\u6216\u8005\u8BF4\u8986\u76D6\uFF09\u6240\u6709\u9700\u8981\u67E5\u8BE2\u7684\u5B57\u6BB5\u7684\u503C\uFF0C\u6211\u4EEC\u5C31\u79F0\u4E4B\u4E3A\u201C\u8986\u76D6\u7D22\u5F15\u201D\u3002\u6211\u4EEC\u77E5\u9053\u5728 InnoDB \u5B58\u50A8\u5F15\u64CE\u4E2D\uFF0C\u5982\u679C\u4E0D\u662F\u4E3B\u952E\u7D22\u5F15\uFF0C\u53F6\u5B50\u8282\u70B9\u5B58\u50A8\u7684\u662F\u4E3B\u952E+\u5217\u503C\u3002\u6700\u7EC8\u8FD8\u662F\u8981\u201C\u56DE\u8868\u201D\uFF0C\u4E5F\u5C31\u662F\u8981\u901A\u8FC7\u4E3B\u952E\u518D\u67E5\u627E\u4E00\u6B21\u3002\u8FD9\u6837\u5C31\u4F1A\u6BD4\u8F83\u6162\u8986\u76D6\u7D22\u5F15\u5C31\u662F\u628A\u8981\u67E5\u8BE2\u51FA\u7684\u5217\u548C\u7D22\u5F15\u662F\u5BF9\u5E94\u7684\uFF0C\u4E0D\u505A\u56DE\u8868\u64CD\u4F5C\uFF01</p><p>\u8986\u76D6\u7D22\u5F15\u5373\u9700\u8981\u67E5\u8BE2\u7684\u5B57\u6BB5\u6B63\u597D\u662F\u7D22\u5F15\u7684\u5B57\u6BB5\uFF0C\u90A3\u4E48\u76F4\u63A5\u6839\u636E\u8BE5\u7D22\u5F15\uFF0C\u5C31\u53EF\u4EE5\u67E5\u5230\u6570\u636E\u4E86\uFF0C \u800C\u65E0\u9700\u56DE\u8868\u67E5\u8BE2\u3002</p><p>\u5982\u4E3B\u952E\u7D22\u5F15\uFF0C\u5982\u679C\u4E00\u6761 SQL \u9700\u8981\u67E5\u8BE2\u4E3B\u952E\uFF0C\u90A3\u4E48\u6B63\u597D\u6839\u636E\u4E3B\u952E\u7D22\u5F15\u5C31\u53EF\u4EE5\u67E5\u5230\u4E3B\u952E\u3002</p><p>\u518D\u5982\u666E\u901A\u7D22\u5F15\uFF0C\u5982\u679C\u4E00\u6761 SQL \u9700\u8981\u67E5\u8BE2 name\uFF0Cname \u5B57\u6BB5\u6B63\u597D\u6709\u7D22\u5F15\uFF0C \u90A3\u4E48\u76F4\u63A5\u6839\u636E\u8FD9\u4E2A\u7D22\u5F15\u5C31\u53EF\u4EE5\u67E5\u5230\u6570\u636E\uFF0C\u4E5F\u65E0\u9700\u56DE\u8868\u3002</p><h2 id="\u521B\u5EFA\u7D22\u5F15\u7684\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u7D22\u5F15\u7684\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> \u521B\u5EFA\u7D22\u5F15\u7684\u6CE8\u610F\u4E8B\u9879</h2><p>1\u3001\u9009\u62E9\u5408\u9002\u7684\u5B57\u6BB5\u521B\u5EFA\u7D22\u5F15\uFF1A</p><ul><li>\u4E0D\u4E3A<code>NULL</code>\u7684\u5B57\u6BB5 \uFF1A\u7D22\u5F15\u5B57\u6BB5\u7684\u6570\u636E\u5E94\u8BE5\u5C3D\u91CF\u4E0D\u4E3A<code>NULL</code>\uFF0C\u56E0\u4E3A\u5BF9\u4E8E\u6570\u636E\u4E3A <code>NULL</code> \u7684\u5B57\u6BB5\uFF0C\u6570\u636E\u5E93\u8F83\u96BE\u4F18\u5316\u3002</li><li>\u5982\u679C\u5B57\u6BB5\u9891\u7E41\u88AB\u67E5\u8BE2\uFF0C\u4F46\u53C8\u907F\u514D\u4E0D\u4E86\u4E3A NULL \uFF0C\u5EFA\u8BAE\u4F7F\u7528 0,1,true,false \u8FD9\u6837\u8BED\u4E49\u8F83\u4E3A\u6E05\u6670\u7684\u77ED\u503C\u6216\u77ED\u5B57\u7B26\u4F5C\u4E3A\u66FF\u4EE3\u3002</li><li>\u88AB\u9891\u7E41\u67E5\u8BE2\u7684\u5B57\u6BB5 \uFF1A\u6211\u4EEC\u521B\u5EFA\u7D22\u5F15\u7684\u5B57\u6BB5\u5E94\u8BE5\u662F\u67E5\u8BE2\u64CD\u4F5C\u975E\u5E38\u9891\u7E41\u7684\u5B57\u6BB5\u3002</li><li>\u88AB\u4F5C\u4E3A\u6761\u4EF6\u67E5\u8BE2\u7684\u5B57\u6BB5 \uFF1A\u88AB\u4F5C\u4E3A WHERE \u6761\u4EF6\u67E5\u8BE2\u7684\u5B57\u6BB5\uFF0C\u5E94\u8BE5\u88AB\u8003\u8651\u5EFA\u7ACB\u7D22\u5F15\u3002</li><li>\u9891\u7E41\u9700\u8981\u6392\u5E8F\u7684\u5B57\u6BB5 \uFF1A\u7D22\u5F15\u5DF2\u7ECF\u6392\u5E8F\uFF0C\u8FD9\u6837\u67E5\u8BE2\u53EF\u4EE5\u5229\u7528\u7D22\u5F15\u7684\u6392\u5E8F\uFF0C\u52A0\u5FEB\u6392\u5E8F\u67E5\u8BE2\u65F6\u95F4\u3002</li><li>\u88AB\u7ECF\u5E38\u9891\u7E41\u7528\u4E8E\u8FDE\u63A5\u7684\u5B57\u6BB5 \uFF1A\u7ECF\u5E38\u7528\u4E8E\u8FDE\u63A5\u7684\u5B57\u6BB5\u53EF\u80FD\u662F\u4E00\u4E9B\u5916\u952E\u5217\uFF0C\u5BF9\u4E8E\u5916\u952E\u5217\u5E76\u4E0D\u4E00\u5B9A\u8981\u5EFA\u7ACB\u5916\u952E\uFF0C\u53EA\u662F\u8BF4\u8BE5\u5217\u6D89\u53CA\u5230\u8868\u4E0E\u8868\u7684\u5173\u7CFB\u3002\u5BF9\u4E8E\u9891\u7E41\u88AB\u8FDE\u63A5\u67E5\u8BE2\u7684\u5B57\u6BB5\uFF0C\u53EF\u4EE5\u8003\u8651\u5EFA\u7ACB\u7D22\u5F15\uFF0C\u63D0\u9AD8\u591A\u8868\u8FDE\u63A5\u67E5\u8BE2\u7684\u6548\u7387\u3002</li></ul><p>2\u3001\u88AB\u9891\u7E41\u66F4\u65B0\u7684\u5B57\u6BB5\u5E94\u8BE5\u614E\u91CD\u5EFA\u7ACB\u7D22\u5F15\u3002</p><p>\u867D\u7136\u7D22\u5F15\u80FD\u5E26\u6765\u67E5\u8BE2\u4E0A\u7684\u6548\u7387\uFF0C\u4F46\u662F\u7EF4\u62A4\u7D22\u5F15\u7684\u6210\u672C\u4E5F\u662F\u4E0D\u5C0F\u7684\u3002 \u5982\u679C\u4E00\u4E2A\u5B57\u6BB5\u4E0D\u88AB\u7ECF\u5E38\u67E5\u8BE2\uFF0C\u53CD\u800C\u88AB\u7ECF\u5E38\u4FEE\u6539\uFF0C\u90A3\u4E48\u5C31\u66F4\u4E0D\u5E94\u8BE5\u5728\u8FD9\u79CD\u5B57\u6BB5\u4E0A\u5EFA\u7ACB\u7D22\u5F15\u4E86\u3002</p><p>3\u3001\u5C3D\u53EF\u80FD\u7684\u8003\u8651\u5EFA\u7ACB\u8054\u5408\u7D22\u5F15\u800C\u4E0D\u662F\u5355\u5217\u7D22\u5F15\u3002</p><p>\u56E0\u4E3A\u7D22\u5F15\u662F\u9700\u8981\u5360\u7528\u78C1\u76D8\u7A7A\u95F4\u7684\uFF0C\u53EF\u4EE5\u7B80\u5355\u7406\u89E3\u4E3A\u6BCF\u4E2A\u7D22\u5F15\u90FD\u5BF9\u5E94\u7740\u4E00\u9897 B+\u6811\u3002\u5982\u679C\u4E00\u4E2A\u8868\u7684\u5B57\u6BB5\u8FC7\u591A\uFF0C\u7D22\u5F15\u8FC7\u591A\uFF0C\u90A3\u4E48\u5F53\u8FD9\u4E2A\u8868\u7684\u6570\u636E\u8FBE\u5230\u4E00\u4E2A\u4F53\u91CF\u540E\uFF0C\u7D22\u5F15\u5360\u7528\u7684\u7A7A\u95F4\u4E5F\u662F\u5F88\u591A\u7684\uFF0C\u4E14\u4FEE\u6539\u7D22\u5F15\u65F6\uFF0C\u8017\u8D39\u7684\u65F6\u95F4\u4E5F\u662F\u8F83\u591A\u7684\u3002</p><p>\u5982\u679C\u662F\u8054\u5408\u7D22\u5F15\uFF0C\u591A\u4E2A\u5B57\u6BB5\u5728\u4E00\u4E2A\u7D22\u5F15\u4E0A\uFF0C\u90A3\u4E48\u5C06\u4F1A\u8282\u7EA6\u5F88\u5927\u78C1\u76D8\u7A7A\u95F4\uFF0C\u4E14\u4FEE\u6539\u6570\u636E\u7684\u64CD\u4F5C\u6548\u7387\u4E5F\u4F1A\u63D0\u5347\u3002</p><p>4\u3001\u6CE8\u610F\u907F\u514D\u5197\u4F59\u7D22\u5F15 \u3002</p><p>\u5197\u4F59\u7D22\u5F15\u6307\u7684\u662F\u7D22\u5F15\u7684\u529F\u80FD\u76F8\u540C\uFF0C\u80FD\u591F\u547D\u4E2D\u7D22\u5F15(a, b)\u5C31\u80AF\u5B9A\u80FD\u547D\u4E2D\u7D22\u5F15(a) \uFF0C\u90A3\u4E48\u7D22\u5F15(a)\u5C31\u662F\u5197\u4F59\u7D22\u5F15\u3002\u5982\uFF08name,city \uFF09\u548C\uFF08name \uFF09\u8FD9\u4E24\u4E2A\u7D22\u5F15\u5C31\u662F\u5197\u4F59\u7D22\u5F15\uFF0C\u80FD\u591F\u547D\u4E2D\u524D\u8005\u7684\u67E5\u8BE2\u80AF\u5B9A\u662F\u80FD\u591F\u547D\u4E2D\u540E\u8005\u7684 \u5728\u5927\u591A\u6570\u60C5\u51B5\u4E0B\uFF0C\u90FD\u5E94\u8BE5\u5C3D\u91CF\u6269\u5C55\u5DF2\u6709\u7684\u7D22\u5F15\u800C\u4E0D\u662F\u521B\u5EFA\u65B0\u7D22\u5F15\u3002</p><p>5\u3001\u8003\u8651\u5728\u5B57\u7B26\u4E32\u7C7B\u578B\u7684\u5B57\u6BB5\u4E0A\u4F7F\u7528\u524D\u7F00\u7D22\u5F15\u4EE3\u66FF\u666E\u901A\u7D22\u5F15\u3002</p><p>\u524D\u7F00\u7D22\u5F15\u4EC5\u9650\u4E8E\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u8F83\u666E\u901A\u7D22\u5F15\u4F1A\u5360\u7528\u66F4\u5C0F\u7684\u7A7A\u95F4\uFF0C\u6240\u4EE5\u53EF\u4EE5\u8003\u8651\u4F7F\u7528\u524D\u7F00\u7D22\u5F15\u5E26\u66FF\u666E\u901A\u7D22\u5F15\u3002</p><p>1.\u666E\u901A\u7D22\u5F15 \u6DFB\u52A0INDEX</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>table_name<span class="token punctuation">\`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">INDEX</span> index_name <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">\`</span>column<span class="token punctuation">\`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u4E0B\u9762\u6F14\u793A\u4E0B\u7ED9user\u8868\u7684name\u5B57\u6BB5\u6DFB\u52A0\u4E00\u4E2A\u7D22\u5F15</p><p>2.\u4E3B\u952E\u7D22\u5F15 \u6DFB\u52A0PRIMARY KEY</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>table_name<span class="token punctuation">\`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">\`</span>column<span class="token punctuation">\`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>3.\u552F\u4E00\u7D22\u5F15 \u6DFB\u52A0UNIQUE</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>table_name<span class="token punctuation">\`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">UNIQUE</span> <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">\`</span>column<span class="token punctuation">\`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>4.\u5168\u6587\u7D22\u5F15 \u6DFB\u52A0FULLTEXT</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>table_name<span class="token punctuation">\`</span></span> <span class="token keyword">ADD</span> FULLTEXT <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">\`</span>column<span class="token punctuation">\`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>5.\u5982\u4F55\u6DFB\u52A0\u591A\u5217\u7D22\u5F15</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>table_name<span class="token punctuation">\`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">INDEX</span> index_name <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">\`</span>column1<span class="token punctuation">\`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">\`</span>column2<span class="token punctuation">\`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">\`</span>column3<span class="token punctuation">\`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,52);function p(l,t){return e}var r=n(a,[["render",p],["__file","mysql-index.html.vue"]]);export{r as default};
