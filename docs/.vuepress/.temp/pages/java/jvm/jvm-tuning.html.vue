<template><h2 id="jvm调优" tabindex="-1"><a class="header-anchor" href="#jvm调优" aria-hidden="true">#</a> jvm调优</h2>
<p>虚拟机和内存调优技能</p>
<p>第一步，发现系统很卡，或者日志里频繁出现 OOM 异常。</p>
<p>第二步，用 dump 文件看 OOM 时的内存镜像，看的工具可以是 JMAT。这两个步骤是通用的。</p>
<p>生成dump文件 <code>jmap -dump:live,format=b,file=xxxx.bin 进程ID</code></p>
<p>第三，通过 dump 文件，jvisualvm 启动可视化工具，再结合日志上下文，</p>
<p>定位 OOM 的原因，比较简单的原因是 Redis 缓存超时时间过长，或者是 ThreadLocal 里的对象用好没 remove(这块还涉及到弱引用，大家可以自己去查，本文不展开)，或者创建线程池时，等待队列设置成了无界，或者你在 mybatis 里，where 条件都是带 if 的，即如果传入 ID 和 name 再拼装 where ID = xxx 之类的语句，在一种场景里，都没传条件，所以 where 后面不带条件，把数据库里记录全捞出来了，导致 OOM。</p>
<p>第四是解决，发现问题后，对症下药解决就很容易，比如降低 Redis 超时时间，或者修改好对应的代码。</p>
</template>
