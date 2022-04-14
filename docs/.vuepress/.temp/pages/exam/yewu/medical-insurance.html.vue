<template><h2 id="yewu" tabindex="-1"><a class="header-anchor" href="#yewu" aria-hidden="true">#</a> yewu</h2>
<h2 id="正常的业务" tabindex="-1"><a class="header-anchor" href="#正常的业务" aria-hidden="true">#</a> 正常的业务</h2>
<p>08.0 3 到 03.19北京新医保核心业务的开发，</p>
<p>负责业务模块</p>
<p>手工报销结算模块：</p>
<p>票据扫描，票据文件报盘导入，提供两定接口，院端自费信息上传接口，院端上传的自费信息进行预结算，结算；添加相应的规则校验；手工报销费用补支、追回及其审核发财务；</p>
<p>手工报销结算模块(医照人员)模块：单位报盘自费信息导入，数据审核，补支、追回及其审核模块；对明细进行分割，各个分笔的费用进行金额的分割；预结算，将个人信息，就诊的信息，明细信息调支付方式，得出最后可以结算信息，(报销的金额，各项医保基金支出的金额)，如统筹基金，大额基金，军残基金；</p>
<p>结算，将预结算算出的结算信息保存，同时保存参保人的待遇累计信息；</p>
<p>北京医保不同点</p>
<p>单位将单位参保人自费的信息进行汇总，通过报盘导入，</p>
<p>金额是单位将明细的金额进行分类，保存的是分类项金额，不是具体的明细金额</p>
<p>灵活就业，纯手工录入七大项金额；就诊，明细信息需要机构传入，然后，再经办模块直接结算；</p>
<p>模式增加了单位和机构的工作量；</p>
<p>校验规则比较多；</p>
<p>上传模块还可以进行批量结算，初审时，多次门诊交易可以结成一笔结算信息；</p>
<h2 id="还做了一个批量导出的功能" tabindex="-1"><a class="header-anchor" href="#还做了一个批量导出的功能" aria-hidden="true">#</a> 还做了一个批量导出的功能</h2>
<p>项目前期给监管平台做的大数据批量导出的功能，前端查询模块查询业务数据，有导出功能，选择条件，将数据导出 excel 文件，每天业务量数据很大，每天都好几千万的数据。还要实现进度条的功能</p>
<ol>
<li>使用 easyexcel 框架，分批次导出，50 万作为一个 excel 的导出文件，假如有 1000 万条数据，需要 for 循环 20 次，每次循环，去用 limit 分批次查询，当所有 excel 文件生成，将 20 个 excel 文件打包，给前端提供压缩文件的地址</li>
<li>使用流式查询，防止内存的溢出</li>
<li>使用 redis 保存该用户各个导出文件的进度，前端专门画了一个页面去查看用户所有导出事件文件生成的进度，<code>redis</code> 结构使用 <code>hash</code> 结构，key 使用用户的 id，<code>value</code> 中的 <code>hash</code> 的 <code>key</code>，导出文件的文件名，value 是导出文件的生成的进度，当压缩文件生成完，<code>value</code> 为压缩文件的地址，前端使用定时器，不停的调查询接口，查询缓存中保存的进度</li>
</ol>
<p>用户正在导出的数据过多，可以添加限制次数，前端可以判断 value 值是文件地址时，显示可导出，导出按钮将文件下载。</p>
<h2 id="注" tabindex="-1"><a class="header-anchor" href="#注" aria-hidden="true">#</a> 注</h2>
<p>每次向文件里面追加数据，类似与 <code>aof</code></p>
<p>调用 <code>ArrayList.clear()</code>，或者把对象置空,使用 <code>JProfile</code> 进行内存检测</p>
<p>通过 <code>JProfile</code> 内存分析.最终问题定位完毕.</p>
<p>原因如下：100W 数据  生成一个文件的过程中，等文件生成完毕之后才能把数据库中的数据备份到历史表中，这个时候才能进行事务的提交，也就是执行 commit()， 并且删除原表数据，100W 数据按照 3000 一批写入文件，每批次只是通过 <code>PreparedStatement.addBatch()</code>;加入到批次里面去,并没有执行 <code>PreparedStatement.executeBatch()</code>,而是在 <code>commit()</code> 之前统一调用的 <code>PreparedStatement.executeBatch()</code>，这样的话 <code>PreparedStatement</code> 就会缓存 100W 条数据信息，造成了内存溢出.</p>
<h2 id="改进" tabindex="-1"><a class="header-anchor" href="#改进" aria-hidden="true">#</a> 改进</h2>
<p><code>Spring Batch</code> 做批量。根据数据库的时间或者 ID 来进行批量处理后生成文件。然后将生成的文件放到某一个存储位置</p>
<h2 id="审核不通过-逻辑修改" tabindex="-1"><a class="header-anchor" href="#审核不通过-逻辑修改" aria-hidden="true">#</a> 审核不通过，逻辑修改</h2>
<p>审核不通过时，对上传的信息做特殊处理，根据医院就诊 id，分组</p>
</template>
