<template><h2 id="innodb-myisam" tabindex="-1"><a class="header-anchor" href="#innodb-myisam" aria-hidden="true">#</a> Innodb &amp;Myisam</h2>
<ol>
<li>myisam 是不支持支持事务；innodb支持事务。</li>
<li>myisam支持表级锁；innodb 支持行锁，粒度更小，但是在执行不能确定扫描范围的sql语句时，innodb同样会锁全表。</li>
<li>数据都是存在磁盘文件，通过磁盘IO 操作读取数据，myisam有三个文件.frm(存储表定义)   .myi（存储表索引） .myd（存储表数据） innodb磁盘上存储的是.frm(存储表定义)，.ibd(该表的索引和数据) 和 redo-log,undo-log日志文件;</li>
</ol>
<h3 id="主键索引" tabindex="-1"><a class="header-anchor" href="#主键索引" aria-hidden="true">#</a> 主键索引</h3>
<p>数据表的主键列使用的就是主键索引。</p>
<p>一张数据表有只能有一个主键，并且主键不能为 null，不能重复。</p>
<p>因为InnoDB 的数据文件本身要按主键聚集，所以InnoDB 要求表必须有主键（MyISAM 可以没有），如果没有显式指定，则MySQL 系统会自动选择一个可以唯一标识数据记录的列作为主键，没有空值的唯一索引，如果不存在这种列，则MySQL自动为InnoDB表生成一个隐式字段作为主键，这个字段长度为6个字节，类型为长整形。</p>
<p>在 Mysql 中，InnoDB 引擎的表的 .ibd文件就包含了该表的索引和数据，对于 InnoDB 引擎表来说，该表的索引(B+树)的每个非叶子节点存储索引，叶子节点存储索引和索引对应的数据。</p>
<h4 id="innodb聚集索引" tabindex="-1"><a class="header-anchor" href="#innodb聚集索引" aria-hidden="true">#</a> InnoDB聚集索引</h4>
<div class="custom-container info"><p class="custom-container-title">优点</p>
<p>查询速度非常的快，因为整个 B 树本身就是一颗多叉平衡树，叶子节点也都是有序的，定位到索引的节点，就相当于定位到了数据。</p>
</div>
<div class="custom-container info"><p class="custom-container-title">缺点</p>
<ol>
<li>依赖于有序的数据 ：因为 B+树是多路平衡树，如果索引的数据不是有序的，那么就需要在插入时排序，如果数据是整型还好，否则类似于字符串或 UUID 这种又长又难比较的数据，插入或查找的速度肯定比较慢。</li>
<li>更新代价大 ： 如果对索引列的数据被修改时，那么对应的索引也将会被修改， 而且况聚集索引的叶子节点还存放着数据，修改代价肯定是较大的， 所以对于主键索引来说，主键一般都是不可被修改的。</li>
</ol>
</div>
<h4 id="myisam非聚集索引" tabindex="-1"><a class="header-anchor" href="#myisam非聚集索引" aria-hidden="true">#</a> MYISAM非聚集索引</h4>
<p>非聚集索引即索引结构和数据分开存放的索引。</p>
<p>二级索引属于非聚集索引。 MYISAM 引擎的表的.MYI 文件包含了表的索引， 该表的索引(B+树)的每个叶子非叶子节点存储索引， 叶子节点存储索引和索引对应数据的指针，指向.MYD 文件的数据。</p>
<p>非聚集索引的叶子节点并不一定存放数据的指针， 因为二级索引的叶子节点就存放的是主键，根据主键再回表查数据。</p>
<p>非聚集索引的优点 更新代价比聚集索引要小 。</p>
<p>非聚集索引的更新代价就没有聚集索引那么大了，非聚集索引的叶子节点是不存放数据的 # 非聚集索引的缺点 跟聚集索引一样，非聚集索引也依赖于有序的数据 可能会二次查询(回表) :这应该是非聚集索引最大的缺点了。 当查到索引对应的指针或主键后，可能还需要根据指针或主键再到数据文件或表中查询。 这是 MySQL 的表的文件截图:</p>
<p>覆盖索引不会回表查询</p>
<h3 id="主键索引-辅助索引区别" tabindex="-1"><a class="header-anchor" href="#主键索引-辅助索引区别" aria-hidden="true">#</a> 主键索引&amp;辅助索引区别：</h3>
<ul>
<li>B+Tree的叶子节点存放的是主键字段值就属于主键索引；</li>
<li>如果存放的是非主键值 就属于辅助索引（二级索引）；</li>
</ul>
<h2 id="innodb索引" tabindex="-1"><a class="header-anchor" href="#innodb索引" aria-hidden="true">#</a> Innodb索引</h2>
<p>InnoDB主索引（同时也是数据文件）的示意图，可以看到叶节点包含了完整的数据记录。这种索引叫做聚集索引。</p>
<h3 id="myisam索引" tabindex="-1"><a class="header-anchor" href="#myisam索引" aria-hidden="true">#</a> myisam索引</h3>
<p>索引由B+树构成，执行查询操作的时候会先搜索B+树，如果找到对应叶子结点，根据叶子节点的值（地址），拿出整行数据。</p>
<p>辅助索引搜索需要检索两遍索引：首先检索辅助索引获得主键，然后用主键到主索引中检索获得记录。</p>
</template>
