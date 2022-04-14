<template><h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> 一、前言</h2>
<p>在应用开发的早期，数据量少，开发人员开发功能时更重视功能上的实现，随着生产数据的增长，很多SQL语句开始暴露出性能问题，对生产的影响也越来越大，有时可能这些有问题的SQL就是整个系统性能的瓶颈。</p>
<h2 id="二、sql优化一般步骤" tabindex="-1"><a class="header-anchor" href="#二、sql优化一般步骤" aria-hidden="true">#</a> 二、SQL优化一般步骤</h2>
<p><strong>1、通过慢查日志等定位那些执行效率较低的SQL语句</strong></p>
<p><strong>2、explain 分析SQL的执行计划</strong></p>
<p>需要重点关注 type、rows、filtered 、extra。</p>
<p>type由上至下，效率越来越高。</p>
<p>ALL 全表扫描；</p>
<p>index 索引全扫描；</p>
<p>range 索引范围扫描，常用语&lt;,&lt;=,&gt;=,between,in等操作；</p>
<p>ref 使用非唯一索引扫描或唯一索引前缀扫描，返回单条记录，常出现在关联查询中；</p>
<p>eq_ref 类似ref，区别在于使用的是唯一索引，使用主键的关联查询；</p>
<p>const/system 单条记录，系统会把匹配行中的其他列作为常数处理，如主键或唯一索引查询；</p>
<p>null MySQL不访问任何表或索引，直接返回结果；</p>
<p>虽然上至下，效率越来越高，但是根据cost模型，假设有两个索引idx1(a, b, c),idx2(a, c)，SQL为</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token identifier"><span class="token punctuation">`</span>select * from t where a = 1 and b in (1, 2) order by c<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果走idx1，那么是type为 <code>range</code> ，如果走idx2，那么type是<code>ref</code>；当需要扫描的行数，使用idx2大约是idx1的5倍以上时，会用idx1，否则会用idx2。</p>
<p><strong>Extra</strong></p>
<ul>
<li>
<p>Using filesort：MySQL 需要额外的一次传递，以找出如何按排序顺序检索行。通过根据联接类型浏览所有行并为所有匹配WHERE子句的行保存排序关键字和行的指针来完成排序。然后关键字被排序，并按排序顺序检索行；</p>
</li>
<li>
<p>Using temporary ：使用了临时表保存中间结果，性能特别差，需要重点优化；</p>
</li>
<li>
<p>Using index：表示相应的 select 操作中使用了覆盖索引（Coveing Index）,避免访问了表的数据行，效率不错！如果同时出现 using where，意味着无法直接通过索引查找来查询到符合条件的数据；</p>
</li>
<li>
<p>Using index condition ：MySQL5.6之后新增的ICP，using index condtion就是使用了ICP（索引下推），在存储引擎层进行数据过滤，而不是在服务层过滤，利用索引现有的数据减少回表的数据。</p>
</li>
</ul>
<p><strong>3、show profile 分析</strong></p>
<p>了解SQL执行的线程的状态及消耗的时间。</p>
<p>默认是关闭的，开启语句“set profiling = 1;”</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> PROFILES <span class="token punctuation">;</span>
<span class="token keyword">SHOW</span> PROFILE <span class="token keyword">FOR</span> QUERY  <span class="token comment">#{id};</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>4、trace</strong></p>
<p>trace分析优化器如何选择执行计划，通过trace文件能够进一步了解为什么优惠券选择A执行计划而不选择B执行计划。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> optimizer_trace<span class="token operator">=</span><span class="token string">"enabled=on"</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> optimizer_trace_max_mem_size<span class="token operator">=</span><span class="token number">1000000</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> information_schema<span class="token punctuation">.</span>optimizer_trace<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>5、确定问题并采用相应的措施</strong></p>
<p>优化索引；</p>
<p>优化SQL语句：修改SQL、IN 查询分段、时间查询分段、基于上一次数据过滤；</p>
<p>改用其他实现方式：ES、数仓等；</p>
<p>数据碎片处理。</p>
<h2 id="三、场景分析" tabindex="-1"><a class="header-anchor" href="#三、场景分析" aria-hidden="true">#</a> 三、场景分析</h2>
<h3 id="_1、最左匹配" tabindex="-1"><a class="header-anchor" href="#_1、最左匹配" aria-hidden="true">#</a> 1、最左匹配</h3>
<p><strong>1）索引</strong></p>
<p>KEY <code>idx_shopid_orderno</code> (<code>shop_id</code>,<code>order_no</code>)</p>
<p><strong>2）SQL语句</strong></p>
<p>select * from _t where orderno=''</p>
<p>查询匹配从左往右匹配，要使用order_no走索引，必须查询条件携带shop_id或者索引(shop_id,order_no)调换前后顺序。</p>
<h3 id="_2、隐式转换" tabindex="-1"><a class="header-anchor" href="#_2、隐式转换" aria-hidden="true">#</a> 2、隐式转换</h3>
<p><strong>1）索引</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_mobile<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>mobile<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2）SQL语句</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _user <span class="token keyword">where</span> mobile<span class="token operator">=</span><span class="token number">12345678901</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>隐式转换相当于在索引上做运算，会让索引失效。mobile是字符类型，使用了数字，应该使用字符串匹配，否则MySQL会用到隐式替换，导致索引失效。</p>
<h3 id="_3、大分页" tabindex="-1"><a class="header-anchor" href="#_3、大分页" aria-hidden="true">#</a> 3、大分页</h3>
<p>1）索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_a_b_c<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>a<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>b<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>c<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2）SQL语句</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _t <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> b <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">order</span> <span class="token keyword">by</span> c <span class="token keyword">desc</span> <span class="token keyword">limit</span> <span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>对于大分页的场景，可以优先让产品优化需求，如果没有优化的，有如下两种优化方式：</p>
<p>一种是把上一次的最后一条数据，也即上面的c传过来，然后做“c &lt; xxx”处理，但是这种一般需要改接口协议，并不一定可行；‘</p>
<p>另一种是采用延迟关联的方式进行处理，减少SQL回表，但是要记得索引需要完全覆盖才有效果，SQL改动如下：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> t1<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> _t t1<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">select</span> id <span class="token keyword">from</span> _t <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> b <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">order</span> <span class="token keyword">by</span> c <span class="token keyword">desc</span> <span class="token keyword">limit</span> <span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span> t2 <span class="token keyword">where</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_4、in-order-by" tabindex="-1"><a class="header-anchor" href="#_4、in-order-by" aria-hidden="true">#</a> 4、in + order by</h3>
<p>1）索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_shopid_status_created<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>shop_id<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>order_status<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>created_at<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2）SQL语句</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _order <span class="token keyword">where</span> shop_id <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> order_status <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token keyword">order</span> <span class="token keyword">by</span> created_at <span class="token keyword">desc</span> <span class="token keyword">limit</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>in查询在MySQL底层是通过n*m的方式去搜索，类似union，但是效率比union高。</p>
<p>in查询在进行cost代价计算时（代价 = 元组数 * IO平均值），是通过将in包含的数值，一条条去查询获取元组数的，因此这个计算过程会比较的慢，所以MySQL设置了个临界值(eq_range_index_dive_limit)，5.6之后超过这个临界值后该列的cost就不参与计算了。因此会导致执行计划选择不准确。默认是200，即in条件超过了200个数据，会导致in的代价计算存在问题，可能会导致Mysql选择的索引不准确。</p>
<p>3）处理方式</p>
<p>可以(order_status, created_at)互换前后顺序，并且调整SQL为延迟关联。</p>
<h3 id="_5、范围查询阻断-后续字段不能走索引" tabindex="-1"><a class="header-anchor" href="#_5、范围查询阻断-后续字段不能走索引" aria-hidden="true">#</a> 5、范围查询阻断，后续字段不能走索引</h3>
<p>1）索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_shopid_created_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>shop_id<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>created_at<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>order_status<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2）SQL语句</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _order <span class="token keyword">where</span> shop_id <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> created_at <span class="token operator">></span> <span class="token string">'2021-01-01 00:00:00'</span> <span class="token operator">and</span> order_status <span class="token operator">=</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>范围查询还有“IN、between”。</p>
<h3 id="_6、不等于、不包含不能用到索引的快速搜索" tabindex="-1"><a class="header-anchor" href="#_6、不等于、不包含不能用到索引的快速搜索" aria-hidden="true">#</a> 6、不等于、不包含不能用到索引的快速搜索</h3>
<p>可以用到ICP</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _order <span class="token keyword">where</span> shop_id<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">and</span> order_status <span class="token operator">not</span> <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _order <span class="token keyword">where</span> shop_id<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">and</span> order_status <span class="token operator">!=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在索引上，避免使用NOT、!=、&lt;&gt;、!&lt;、!&gt;、NOT EXISTS、NOT IN、NOT LIKE等。</p>
<h3 id="_7、优化器选择不使用索引的情况" tabindex="-1"><a class="header-anchor" href="#_7、优化器选择不使用索引的情况" aria-hidden="true">#</a> 7、优化器选择不使用索引的情况</h3>
<p>如果要求访问的数据量很小，则优化器还是会选择辅助索引，但是当访问的数据占整个表中数据的蛮大一部分时（一般是20%左右），优化器会选择通过聚集索引来查找数据。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _order <span class="token keyword">where</span>  order_status <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查询出所有未支付的订单，一般这种订单是很少的，即使建了索引，也没法使用索引。</p>
<h3 id="_8、复杂查询" tabindex="-1"><a class="header-anchor" href="#_8、复杂查询" aria-hidden="true">#</a> 8、复杂查询</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token function">sum</span><span class="token punctuation">(</span>amt<span class="token punctuation">)</span> <span class="token keyword">from</span> _t <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> b <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">and</span> c <span class="token operator">></span> <span class="token string">'2020-01-01'</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _t <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> b <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">and</span> c <span class="token operator">></span> <span class="token string">'2020-01-01'</span> <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如果是统计某些数据，可能改用数仓进行解决；</p>
<p>如果是业务上就有那么复杂的查询，可能就不建议继续走SQL了，而是采用其他的方式进行解决，比如使用ES等进行解决。</p>
<h3 id="_9、asc和desc混用" tabindex="-1"><a class="header-anchor" href="#_9、asc和desc混用" aria-hidden="true">#</a> 9、asc和desc混用</h3>
<p><code>sql select * from _t where a=1 order by b desc, c asc </code></p>
<h3 id="_10、大数据" tabindex="-1"><a class="header-anchor" href="#_10、大数据" aria-hidden="true">#</a> 10、大数据</h3>
<p>对于推送业务的数据存储，可能数据量会很大，如果在方案的选择上，最终选择存储在MySQL上，并且做7天等有效期的保存。</p>
<p>那么需要注意，频繁的清理数据，会照成数据碎片，需要联系DBA进行数据碎片处理。</p>
<h2 id="tiaoyou" tabindex="-1"><a class="header-anchor" href="#tiaoyou" aria-hidden="true">#</a> tiaoyou</h2>
<p>MyCat 分库分表</p>
<p>对于一个千万级别的结算，订单表，我们可以用人员编号作为分库分表键，分散 8 个库，根据最后一位的值或者不同的分库分表健的策略定位到具体的表。</p>
<p>排查所有的 SQL 语句，把用到表关联的 SQL 语句，多表关联和 group by 的语句修改，或者添加冗余字段，或者分组，关联的逻辑在 java 业务写，或者优化将复杂的操作或者计算操作、一些分组计算写入缓存</p>
<p>Mycat 只能支持一些简单的 join，如果你的表都在同一个实例的话 join 是不影响的，跟 mysql 本身 join 一样，如果不在一个实例的表进行 join 貌似只支持两张表 join，并且还不能做太大数据量的 join</p>
<p>数据库调优方面解决过的问题，比如索引对应的字段重复率太高，所以索引没用到，解决方法是建复合索引，或 redis 缓存信息没设超时时间，导致内存爆掉，解决方法是设下限。</p>
<h2 id="mycat" tabindex="-1"><a class="header-anchor" href="#mycat" aria-hidden="true">#</a> mycat</h2>
<p>水平切分，一个实体库切分成多个库</p>
<p>不可能！因为只有大数据量的用户相关业务才会用到水平切割！</p>
<p>数据库集群对外的统一访问入口</p>
<p><strong>核心文件：</strong></p>
<ul>
<li>schem.xml 配置参数：逻辑库，逻辑表，数据节点。节点主机</li>
<li>rule.xml：分片规则</li>
<li>server.xml：连接 mycat 的用户信息(账号和密码)</li>
</ul>
<p><code>Order by</code> 字段必须出现在 select 中(MyCat 先将结果取出，然后排序)</p>
<p><code>Group by</code> 务必使用标准语法 select count(1),type from tab_a group by type;</p>
<p>MyCat 的一些自带函数 sum，min，max 等可以正确使用，但多分片执行的 avg 有 bug，执行的结果是错误的谨慎使用子查询，外层查询没有分片查询条件，则会在所有分片上执行(子查询内外层的表一样较为特殊)</p>
<h3 id="场景分析" tabindex="-1"><a class="header-anchor" href="#场景分析" aria-hidden="true">#</a> 场景分析</h3>
<p>sql优化</p>
<p>财务流水表 1000w 分页查询 limit</p>
<p>优化前 17s
优化后 300ms</p>
<p>阿里巴巴Java开发手册 第五章-MySQL数据库 （二）索引规约、第7条：</p>
<p>【推荐】利用延迟关联或者子查询优化超多分页场景</p>
<p>说明：MySQL并不是挑过offset 行，而是去offset+N行，然后返回放弃前offset行，返回N行，那当offset特别大的时候，效率就非常的底下，要么控制返回的总页数，要么对超过特定阈值的页数进行SQL改写。</p>
<p>正例：先快速定位需要获取的id段，然后再关联：</p>
<p>索引</p>
<p>KEY <code>idx_a_b_c</code> (<code>a</code>, <code>b</code>, <code>c</code>)</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> _t <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> b <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">order</span> <span class="token keyword">by</span> c <span class="token keyword">desc</span> <span class="token keyword">limit</span> <span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>对于大分页的场景，可以优先让产品优化需求，如果没有优化的，有如下两种优化方式：</p>
<ul>
<li>
<p>一种是把上一次的最后一条数据，也即上面的c 传过来，然后做“c &lt; xxx”处理，但是这种一般需要改接口协议，并不一定可行；‘</p>
</li>
<li>
<p>另一种是采用延迟关联的方式进行处理，减少SQL回表，但是要记得索引需要完全覆盖才有效果，SQL改动如下：</p>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> t1<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> _t t1<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">select</span> id <span class="token keyword">from</span> _t <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> b <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">order</span> <span class="token keyword">by</span> c <span class="token keyword">desc</span> <span class="token keyword">limit</span> <span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span> t2 <span class="token keyword">where</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>灌入大量数据，共500万</p>
</template>
