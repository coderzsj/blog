<template><h2 id="mysql主从复制" tabindex="-1"><a class="header-anchor" href="#mysql主从复制" aria-hidden="true">#</a> mysql主从复制</h2>
<p>MySQL主从复制是一个异步的复制过程，底层是基于数据库自带的二进制日志功能。就是一台或多台MySQL数据库（slave，即从库）从另一台MySQL数据库（</p>
<ul>
<li>master将改变纪录到二进制日志（binary log)</li>
<li>slave将master的binary log拷贝到它的中继日志（relay log）</li>
<li>slave重做中继日志中的事件，将改变应用到自己的数据库中。</li>
</ul>
<p>搭建，实现主从同步。 (两阶段提交)</p>
<p>配置-前置条件</p>
<p>提前准备好两台服务器，分别安装MySQL并启动服务成功。</p>
<ul>
<li>主库（master） 192.168.138.100</li>
<li>从库（slave） 192.168.138.101</li>
</ul>
</template>
