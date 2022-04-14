<template><h2 id="sql调优" tabindex="-1"><a class="header-anchor" href="#sql调优" aria-hidden="true">#</a> sql调优</h2>
<h3 id="使用exists代替in" tabindex="-1"><a class="header-anchor" href="#使用exists代替in" aria-hidden="true">#</a> 使用exists代替in</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>
<span class="token keyword">select</span> name <span class="token keyword">from</span> a <span class="token keyword">where</span> id <span class="token operator">in</span><span class="token punctuation">(</span><span class="token keyword">select</span> id <span class="token keyword">from</span> b<span class="token punctuation">)</span>

<span class="token comment">-- 如果我们将这条语句换成下面的写法：</span>

<span class="token keyword">select</span> name <span class="token keyword">from</span> a <span class="token keyword">where</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token number">1</span> <span class="token keyword">from</span> b <span class="token keyword">where</span> id <span class="token operator">=</span> a<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="避免在-where-子句中对字段进行函数操作。" tabindex="-1"><a class="header-anchor" href="#避免在-where-子句中对字段进行函数操作。" aria-hidden="true">#</a> 避免在 where 子句中对字段进行函数操作。</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> substring<span class="token punctuation">(</span>name<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string">'zs'</span>

<span class="token comment">--或</span>

<span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> datediff<span class="token punctuation">(</span><span class="token keyword">day</span><span class="token punctuation">,</span>datefield<span class="token punctuation">,</span><span class="token string">'2022-07-17'</span><span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">0</span>    

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="like-中通配符的使用。" tabindex="-1"><a class="header-anchor" href="#like-中通配符的使用。" aria-hidden="true">#</a> like 中通配符的使用。</h3>
<p>下面的语句会导致全表扫描，尽量少用。如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">like</span><span class="token string">'%zs%'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="between-and-代替-in-少用-in-或-not-in" tabindex="-1"><a class="header-anchor" href="#between-and-代替-in-少用-in-或-not-in" aria-hidden="true">#</a> between and 代替 in 少用 in 或 not in</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> name <span class="token keyword">from</span> tabel <span class="token keyword">where</span> id <span class="token operator">in</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>像这种连续的数值，我们可以使用 BETWEEN AND，如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> name <span class="token keyword">from</span> tabel <span class="token keyword">where</span> id <span class="token operator">between</span> <span class="token number">1</span> <span class="token operator">and</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="避免在-where-子句中使用-or来链接条件。" tabindex="-1"><a class="header-anchor" href="#避免在-where-子句中使用-or来链接条件。" aria-hidden="true">#</a> 避免在 where 子句中使用 or来链接条件。</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">'zs'</span> <span class="token operator">or</span> name <span class="token operator">=</span> <span class="token string">'PHP'</span>

<span class="token comment">-- 这种情况，我们可以这样写：</span>

<span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">'zs'</span>

<span class="token keyword">union</span> <span class="token keyword">all</span>

<span class="token keyword">select</span> id <span class="token keyword">from</span> tabel <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">'PHP'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="避免在-where-子句中使用-或-操作符。" tabindex="-1"><a class="header-anchor" href="#避免在-where-子句中使用-或-操作符。" aria-hidden="true">#</a> 避免在 where 子句中使用 != 或 &lt;&gt; 操作符。</h3>
<p>避免在where子句中使用 is null 或 is not null 对字段进行判断。</p>
<p>如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> name <span class="token operator">is</span> <span class="token boolean">null</span><span class="token punctuation">`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在这个查询中，就算我们为 name 字段设置了索引，查询分析器也不会使用，因此查询效率底下。</p>
<p>为了避免这样的查询，在数据库设计的时候，尽量将可能会出现 null 值的字段设置默认值，这里如果我们将 name 字段的默认值设置为0，那么我们就可以这样查询：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">table</span> <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>索引不存储空值，如果不限制索引列是not null，数据库会认为索引列有可能存在空值，所以不会按照索引进行计算。</p>
<h3 id="最左原则" tabindex="-1"><a class="header-anchor" href="#最左原则" aria-hidden="true">#</a> 最左原则</h3>
<p>复合索引中索引列按顺序查询，如果不是按照索引的最左列开始查找，则无法使用索引</p>
<h3 id="覆盖索引" tabindex="-1"><a class="header-anchor" href="#覆盖索引" aria-hidden="true">#</a> 覆盖索引</h3>
<p>如果一个索引包含（或者说覆盖）所有需要查询的字段的值，我们就称之为“覆盖索引”。我们知道在 InnoDB 存储引擎中，如果不是主键索引，叶子节点存储的是主键+列值。最终还是要“回表”，也就是要通过主键再查找一次。这样就会比较慢覆盖索引就是把要查询出的列和索引是对应的，不做回表操作！</p>
<p>覆盖索引即需要查询的字段正好是索引的字段，那么直接根据该索引，就可以查到数据了，
而无需回表查询。</p>
<p>如主键索引，如果一条 SQL 需要查询主键，那么正好根据主键索引就可以查到主键。</p>
<p>再如普通索引，如果一条 SQL 需要查询 name，name 字段正好有索引， 那么直接根据这个索引就可以查到数据，也无需回表。</p>
<h2 id="创建索引的注意事项" tabindex="-1"><a class="header-anchor" href="#创建索引的注意事项" aria-hidden="true">#</a> 创建索引的注意事项</h2>
<p>1、选择合适的字段创建索引：</p>
<ul>
<li>不为<code>NULL</code>的字段 ：索引字段的数据应该尽量不为<code>NULL</code>，因为对于数据为 <code>NULL</code> 的字段，数据库较难优化。</li>
<li>如果字段频繁被查询，但又避免不了为 NULL ，建议使用 0,1,true,false 这样语义较为清晰的短值或短字符作为替代。</li>
<li>被频繁查询的字段 ：我们创建索引的字段应该是查询操作非常频繁的字段。</li>
<li>被作为条件查询的字段 ：被作为 WHERE 条件查询的字段，应该被考虑建立索引。</li>
<li>频繁需要排序的字段 ：索引已经排序，这样查询可以利用索引的排序，加快排序查询时间。</li>
<li>被经常频繁用于连接的字段 ：经常用于连接的字段可能是一些外键列，对于外键列并不一定要建立外键，只是说该列涉及到表与表的关系。对于频繁被连接查询的字段，可以考虑建立索引，提高多表连接查询的效率。</li>
</ul>
<p>2、被频繁更新的字段应该慎重建立索引。</p>
<p>虽然索引能带来查询上的效率，但是维护索引的成本也是不小的。 如果一个字段不被经常查询，反而被经常修改，那么就更不应该在这种字段上建立索引了。</p>
<p>3、尽可能的考虑建立联合索引而不是单列索引。</p>
<p>因为索引是需要占用磁盘空间的，可以简单理解为每个索引都对应着一颗 B+树。如果一个表的字段过多，索引过多，那么当这个表的数据达到一个体量后，索引占用的空间也是很多的，且修改索引时，耗费的时间也是较多的。</p>
<p>如果是联合索引，多个字段在一个索引上，那么将会节约很大磁盘空间，且修改数据的操作效率也会提升。</p>
<p>4、注意避免冗余索引 。</p>
<p>冗余索引指的是索引的功能相同，能够命中索引(a, b)就肯定能命中索引(a) ，那么索引(a)就是冗余索引。如（name,city ）和（name ）这两个索引就是冗余索引，能够命中前者的查询肯定是能够命中后者的 在大多数情况下，都应该尽量扩展已有的索引而不是创建新索引。</p>
<p>5、考虑在字符串类型的字段上使用前缀索引代替普通索引。</p>
<p>前缀索引仅限于字符串类型，较普通索引会占用更小的空间，所以可以考虑使用前缀索引带替普通索引。</p>
<p>1.普通索引 添加INDEX</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">INDEX</span> index_name <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">`</span>column<span class="token punctuation">`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>下面演示下给user表的name字段添加一个索引</p>
<p>2.主键索引 添加PRIMARY KEY</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">`</span>column<span class="token punctuation">`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>3.唯一索引 添加UNIQUE</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">UNIQUE</span> <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">`</span>column<span class="token punctuation">`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>4.全文索引 添加FULLTEXT</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span> <span class="token keyword">ADD</span> FULLTEXT <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">`</span>column<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>5.如何添加多列索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">INDEX</span> index_name <span class="token punctuation">(</span> <span class="token identifier"><span class="token punctuation">`</span>column1<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>column2<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>column3<span class="token punctuation">`</span></span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
