<template><h2 id="sql-case-语句" tabindex="-1"><a class="header-anchor" href="#sql-case-语句" aria-hidden="true">#</a> SQL CASE 语句</h2>
<p>作为 if-then-else 之类逻辑的关键字。</p>
<p>SELECT CASE(&quot;栏位名”)</p>
<p>WHEN “条件 1” THEN “结果 1”</p>
<p>WHEN “条件 2” THEN “结果 2”</p>
<p>...</p>
<p>[ELSE “结果 N”]</p>
<p>END</p>
<p>FROM “表格名”</p>
<p>例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> store_name<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">case</span> store_name
<span class="token keyword">when</span> ’Los Angeles’ <span class="token keyword">then</span> sales<span class="token operator">*</span><span class="token number">2</span>
<span class="token keyword">when</span> ‘San Diego’ <span class="token keyword">then</span> sales<span class="token operator">*</span><span class="token number">1.5</span>
<span class="token keyword">else</span> sales <span class="token keyword">end</span><span class="token punctuation">)</span> <span class="token keyword">as</span> “new sales”<span class="token punctuation">,</span> <span class="token keyword">date</span>
<span class="token keyword">from</span> store_information<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="create-index-语句-在不读取整个表的情况下-更快地查找数据" tabindex="-1"><a class="header-anchor" href="#create-index-语句-在不读取整个表的情况下-更快地查找数据" aria-hidden="true">#</a> CREATE INDEX 语句：在不读取整个表的情况下，更快地查找数据</h2>
<p>简单索引，允许使用重复的值：</p>
<p>CREATE INDEX index_name ON table_name (colunm_name);</p>
<h2 id="group-concat" tabindex="-1"><a class="header-anchor" href="#group-concat" aria-hidden="true">#</a> group_concat</h2>
<p>使用group_concat()和group by显示相同名字的人的id号：</p>
<p>将上面的id号从大到小排序，且用'_'作为分隔符：</p>
<p><strong>去重</strong></p>
<p>DISTINCT score</p>
<p><strong>设置分隔符</strong></p>
<p>score SEPARATOR ';'</p>
<p><strong>排序</strong></p>
<p>score ORDER BY score DESC</p>
</template>
