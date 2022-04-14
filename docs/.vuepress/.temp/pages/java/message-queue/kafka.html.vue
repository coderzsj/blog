<template><h2 id="kafka" tabindex="-1"><a class="header-anchor" href="#kafka" aria-hidden="true">#</a> kafka</h2>
<h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2>
<ul>
<li>高吞吐量、低延迟：消息中间件每秒可以处理几十万条消息，它的延迟最低只有几毫秒</li>
<li>可扩展性：kafka 集群支持热扩展</li>
<li>持久性、可靠性：消息被持久化到本地磁盘，并且支持数据备份防止数据丢失</li>
<li>容错性：允许集群中节点失败(若副本数量为 n,则允许 n-1 个节点失败)</li>
<li>高并发：支持数千个客户端同时读写</li>
<li>支持Kafka Server间的消息分区，及分布式消费，同时保证每个Partition内的消息顺序传输；</li>
</ul>
<p>数据稳定性一般，而且无法保证消息有序性</p>
<p>每个 topic 可以分多个 partition, consumer group 对 partition 进行 consume 操作。</p>
<h2 id="常用mq对比" tabindex="-1"><a class="header-anchor" href="#常用mq对比" aria-hidden="true">#</a> 常用MQ对比</h2>
<p>RabbitMQ：RabbitMQ是使用Erlang编写的一个开源的消息队列，本身支持很多的协议：AMQP，XMPP, SMTP, STOMP，也正因如此，它非常重量级，更适合于企业级的开发。同时实现了Broker构架，这意味着消息在发送给客户端时先在中心队列排队。对路由，负载均衡或者数据持久化都有很好的支持。</p>
<p>Redis：Redis是一个基于Key-Value对的NoSQL数据库，开发维护很活跃。虽然它是一个Key-Value数据库存储系统，但它本身支持MQ功能，所以完全可以当做一个轻量级的队列服务来使用。对于RabbitMQ和Redis的入队和出队操作，各执行100万次，每10万次记录一次执行时间。测试数据分为128Bytes、512Bytes、1K和10K四个不同大小的数据。实验表明：入队时，当数据比较小时Redis的性能要高于RabbitMQ，而如果数据大小超过了10K，Redis则慢的无法忍受；出队时，无论数据大小，Redis都表现出非常好的性能，而RabbitMQ的出队性能则远低于Redis。</p>
<p>ZeroMQ：ZeroMQ号称最快的消息队列系统，尤其针对大吞吐量的需求场景。ZMQ能够实现RabbitMQ不擅长的高级/复杂的队列，但是开发人员需要自己组合多种技术框架，技术上的复杂度是对这MQ能够应用成功的挑战。ZeroMQ具有一个独特的非中间件的模式，你不需要安装和运行一个消息服务器或中间件，因为你的应用程序将扮演这个服务器角色。你只需要简单的引用ZeroMQ程序库，可以使用NuGet安装，然后你就可以愉快的在应用程序之间发送消息了。但是ZeroMQ仅提供非持久性的队列，也就是说如果宕机，数据将会丢失。其中，Twitter的Storm 0.9.0以前的版本中默认使用ZeroMQ作为数据流的传输（Storm从0.9版本开始同时支持ZeroMQ和Netty作为传输模块）。</p>
<p>ActiveMQ：ActiveMQ是Apache下的一个子项目。 类似于ZeroMQ，它能够以代理人和点对点的技术实现队列。同时类似于RabbitMQ，它少量代码就可以高效地实现高级应用场景。</p>
<p>Kafka/Jafka：Kafka是Apache下的一个子项目，是一个高性能跨语言分布式发布/订阅消息队列系统，而Jafka是在Kafka之上孵化而来的，即Kafka的一个升级版。具有以下特性：快速持久化，可以在O(1)的系统开销下进行消息持久化；高吞吐，在一台普通的服务器上既可以达到10W/s的吞吐速率；完全的分布式系统，Broker、Producer、Consumer都原生自动支持分布式，自动实现负载均衡；支持Hadoop数据并行加载，对于像Hadoop的一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka通过Hadoop的并行加载机制统一了在线和离线的消息处理。Apache Kafka相对于ActiveMQ是一个非常轻量级的消息系统，除了性能非常好之外，还是一个工作良好的分布式系统。</p>
<h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2>
<ul>
<li>消息系统：解耦和生产者和消费者、缓存消息等。</li>
<li>日志收集：一个公司可以用 Kafka 可以收集各种服务的 log，通过 kafka 以统一接口服务的方式开放给各种 consumer，例如 hadoop、HBase、Solr 等。</li>
<li>流式处理：比如 spark streaming 和 Flink</li>
</ul>
<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2>
<ul>
<li>Broker：Kafka集群包含一个或多个服务器，这种服务器被称为broker；</li>
<li>Producer：消息生产者，就是向 kafka broker 发消息的客户端。</li>
<li>Consumer：消息消费者，向Kafka broker读取消息的客户端；</li>
<li>Topic： 每条发布到Kafka集群的消息都有一个类别，这个类别被称为Topic。（物理上不同Topic的消息分开存储，逻辑上一个Topic的消息虽然保存于一个或多个broker上但用户只需指定消息的Topic即可生产或消费数据而不必关心数据存于何处）；</li>
<li>Partition：Parition是物理上的概念，每个Topic包含一个或多个Partition.；</li>
<li>Producer：负责发布消息到Kafka broker；</li>
<li>Consumer：消息消费者，向Kafka broker读取消息的客户端；</li>
<li>Consumer Group：每个Consumer属于一个特定的Consumer Group（可为每个Consumer指定group name，若不指定group name则属于默认的group）。</li>
</ul>
<p>为了实现扩展性，一个非常大的 topic 可以分布到多个 broker 上，每个 partition 是一个有序的队列。Partition 中的每条消息都会被分配一个有序的 id(offset)。将消息发给 consumer，kafka 只保证按一个 partition 中的消息的顺序，不保证一个 topic 的整体(多个 partition 间)的顺序。</p>
<p>kafka 的存储文件都是按照 offset.kafka 来命名，用 offset 做名字的好处是方便查找。例如你想找位于 2049 的位置，只要找到 2048.kafka 的文件即可。当然 the first offset 就是 00000000000.kafka。</p>
<h2 id="生产者发送重复解决方案" tabindex="-1"><a class="header-anchor" href="#生产者发送重复解决方案" aria-hidden="true">#</a> 生产者发送重复解决方案</h2>
<p>1、启动 kafka 的幂等性</p>
<p>要启动 kafka 的幂等性，无需修改代码，默认为关闭，需要修改配置文件:enable.idempotence=true 同时要求 ack=all 且 retries&gt;1。</p>
<p>幂等原理：</p>
<p>每个 producer 有一个 producer id，服务端会通过这个 ID 关联记录每个 producer 的状态，每个 producer 的每条消息会带上一个递增的 sequence，服务端会记录每个 producer 对应的当前最大 sequence，producerId + sequence ，如果新的消息带上的 sequence 不大于当前的最大 sequence 就拒绝这条消息，如果消息落盘会同时更新最大 sequence，这个时候重发的消息会被服务端拒掉从而避免消息重复。该配置同样应用于 kafka 事务中。</p>
<p>2、ack=0，不重试。</p>
<p>可能会丢消息，适用于吞吐量指标重要性高于数据丢失，例如：日志收集。</p>
<h2 id="生产者和-broke-阶段消息丢失场景" tabindex="-1"><a class="header-anchor" href="#生产者和-broke-阶段消息丢失场景" aria-hidden="true">#</a> 生产者和 broke 阶段消息丢失场景</h2>
<p>1、ack=0，不重试</p>
<p>Producer 发送消息完，不管结果了，如果发送失败也就丢失了。</p>
<p>2、ack=1，leader crash</p>
<p>Producer 发送消息完，只等待 lead 写入成功就返回了，leader crash 了，这时 follower 没来及同步，消息丢失。</p>
<p>3、unclean.leader.election.enable 配置 true</p>
<p>允许选举 ISR 以外的副本作为 leader,会导致数据丢失，默认为 false。Producer 发送异步消息完，只等待 lead 写入成功就返回了，leader crash 了，这时 ISR 中没有 follower，leader 从 OSR 中选举，因为 OSR 中本来落后于 Leader 造成消息丢失。</p>
<h2 id="kafka消息堆积" tabindex="-1"><a class="header-anchor" href="#kafka消息堆积" aria-hidden="true">#</a> kafka消息堆积</h2>
<p>提高消费者处理速度</p>
<p>增加更多消费者</p>
<p>增加队列消息存储上限</p>
<p>注：Kafka 什么时候进行提交消费进度以及心跳保活的方式很关键</p>
</template>
