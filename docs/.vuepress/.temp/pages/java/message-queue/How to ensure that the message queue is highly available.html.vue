<template><h2 id="rocketmq" tabindex="-1"><a class="header-anchor" href="#rocketmq" aria-hidden="true">#</a> rocketMQ</h2>
<p>consumer</p>
<p>需要部署多个节点，以保证</p>
<ul>
<li>Zookeeper部署2N+1节点，形成ZOOKEEPER集群，保证高可用。</li>
<li>kafka Broker部署集群。
<ul>
<li>每个TOPIC的PARTITION，基于【副本机制】，在Broker集群中复制，形成REPICA副本，保证消息存储的可靠性。每个REPILICA副本，都会选择出一个LEADER分区，提供给客户端进行读写。</li>
</ul>
</li>
<li></li>
</ul>
</template>
