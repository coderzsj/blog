(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{634:function(a,t,s){"use strict";s.r(t);var e=s(1),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"kafka"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka"}},[a._v("#")]),a._v(" kafka")]),a._v(" "),s("h2",{attrs:{id:"特点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[a._v("#")]),a._v(" 特点")]),a._v(" "),s("ul",[s("li",[a._v("高吞吐量、低延迟：消息中间件每秒可以处理几十万条消息，它的延迟最低只有几毫秒")]),a._v(" "),s("li",[a._v("可扩展性：kafka 集群支持热扩展")]),a._v(" "),s("li",[a._v("持久性、可靠性：消息被持久化到本地磁盘，并且支持数据备份防止数据丢失")]),a._v(" "),s("li",[a._v("容错性：允许集群中节点失败(若副本数量为 n,则允许 n-1 个节点失败)")]),a._v(" "),s("li",[a._v("高并发：支持数千个客户端同时读写")]),a._v(" "),s("li",[a._v("支持Kafka Server间的消息分区，及分布式消费，同时保证每个Partition内的消息顺序传输；")])]),a._v(" "),s("p",[a._v("数据稳定性一般，而且无法保证消息有序性")]),a._v(" "),s("p",[a._v("每个 topic 可以分多个 partition, consumer group 对 partition 进行 consume 操作。")]),a._v(" "),s("h2",{attrs:{id:"常用mq对比"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用mq对比"}},[a._v("#")]),a._v(" 常用MQ对比")]),a._v(" "),s("p",[a._v("RabbitMQ：RabbitMQ是使用Erlang编写的一个开源的消息队列，本身支持很多的协议：AMQP，XMPP, SMTP, STOMP，也正因如此，它非常重量级，更适合于企业级的开发。同时实现了Broker构架，这意味着消息在发送给客户端时先在中心队列排队。对路由，负载均衡或者数据持久化都有很好的支持。")]),a._v(" "),s("p",[a._v("Redis：Redis是一个基于Key-Value对的NoSQL数据库，开发维护很活跃。虽然它是一个Key-Value数据库存储系统，但它本身支持MQ功能，所以完全可以当做一个轻量级的队列服务来使用。对于RabbitMQ和Redis的入队和出队操作，各执行100万次，每10万次记录一次执行时间。测试数据分为128Bytes、512Bytes、1K和10K四个不同大小的数据。实验表明：入队时，当数据比较小时Redis的性能要高于RabbitMQ，而如果数据大小超过了10K，Redis则慢的无法忍受；出队时，无论数据大小，Redis都表现出非常好的性能，而RabbitMQ的出队性能则远低于Redis。")]),a._v(" "),s("p",[a._v("ZeroMQ：ZeroMQ号称最快的消息队列系统，尤其针对大吞吐量的需求场景。ZMQ能够实现RabbitMQ不擅长的高级/复杂的队列，但是开发人员需要自己组合多种技术框架，技术上的复杂度是对这MQ能够应用成功的挑战。ZeroMQ具有一个独特的非中间件的模式，你不需要安装和运行一个消息服务器或中间件，因为你的应用程序将扮演这个服务器角色。你只需要简单的引用ZeroMQ程序库，可以使用NuGet安装，然后你就可以愉快的在应用程序之间发送消息了。但是ZeroMQ仅提供非持久性的队列，也就是说如果宕机，数据将会丢失。其中，Twitter的Storm 0.9.0以前的版本中默认使用ZeroMQ作为数据流的传输（Storm从0.9版本开始同时支持ZeroMQ和Netty作为传输模块）。")]),a._v(" "),s("p",[a._v("ActiveMQ：ActiveMQ是Apache下的一个子项目。 类似于ZeroMQ，它能够以代理人和点对点的技术实现队列。同时类似于RabbitMQ，它少量代码就可以高效地实现高级应用场景。")]),a._v(" "),s("p",[a._v("Kafka/Jafka：Kafka是Apache下的一个子项目，是一个高性能跨语言分布式发布/订阅消息队列系统，而Jafka是在Kafka之上孵化而来的，即Kafka的一个升级版。具有以下特性：快速持久化，可以在O(1)的系统开销下进行消息持久化；高吞吐，在一台普通的服务器上既可以达到10W/s的吞吐速率；完全的分布式系统，Broker、Producer、Consumer都原生自动支持分布式，自动实现负载均衡；支持Hadoop数据并行加载，对于像Hadoop的一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka通过Hadoop的并行加载机制统一了在线和离线的消息处理。Apache Kafka相对于ActiveMQ是一个非常轻量级的消息系统，除了性能非常好之外，还是一个工作良好的分布式系统。")]),a._v(" "),s("h2",{attrs:{id:"使用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用场景"}},[a._v("#")]),a._v(" 使用场景")]),a._v(" "),s("ul",[s("li",[a._v("消息系统：解耦和生产者和消费者、缓存消息等。")]),a._v(" "),s("li",[a._v("日志收集：一个公司可以用 Kafka 可以收集各种服务的 log，通过 kafka 以统一接口服务的方式开放给各种 consumer，例如 hadoop、HBase、Solr 等。")]),a._v(" "),s("li",[a._v("流式处理：比如 spark streaming 和 Flink")])]),a._v(" "),s("h2",{attrs:{id:"概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[a._v("#")]),a._v(" 概念")]),a._v(" "),s("ul",[s("li",[a._v("Broker：Kafka集群包含一个或多个服务器，这种服务器被称为broker；")]),a._v(" "),s("li",[a._v("Producer：消息生产者，就是向 kafka broker 发消息的客户端。")]),a._v(" "),s("li",[a._v("Consumer：消息消费者，向Kafka broker读取消息的客户端；")]),a._v(" "),s("li",[a._v("Topic： 每条发布到Kafka集群的消息都有一个类别，这个类别被称为Topic。（物理上不同Topic的消息分开存储，逻辑上一个Topic的消息虽然保存于一个或多个broker上但用户只需指定消息的Topic即可生产或消费数据而不必关心数据存于何处）；")]),a._v(" "),s("li",[a._v("Partition：Parition是物理上的概念，每个Topic包含一个或多个Partition.；")]),a._v(" "),s("li",[a._v("Producer：负责发布消息到Kafka broker；")]),a._v(" "),s("li",[a._v("Consumer：消息消费者，向Kafka broker读取消息的客户端；")]),a._v(" "),s("li",[a._v("Consumer Group：每个Consumer属于一个特定的Consumer Group（可为每个Consumer指定group name，若不指定group name则属于默认的group）。")])]),a._v(" "),s("p",[a._v("为了实现扩展性，一个非常大的 topic 可以分布到多个 broker 上，每个 partition 是一个有序的队列。Partition 中的每条消息都会被分配一个有序的 id(offset)。将消息发给 consumer，kafka 只保证按一个 partition 中的消息的顺序，不保证一个 topic 的整体(多个 partition 间)的顺序。")]),a._v(" "),s("p",[a._v("kafka 的存储文件都是按照 offset.kafka 来命名，用 offset 做名字的好处是方便查找。例如你想找位于 2049 的位置，只要找到 2048.kafka 的文件即可。当然 the first offset 就是 00000000000.kafka。")]),a._v(" "),s("h2",{attrs:{id:"生产者发送重复解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生产者发送重复解决方案"}},[a._v("#")]),a._v(" 生产者发送重复解决方案")]),a._v(" "),s("p",[a._v("1、启动 kafka 的幂等性")]),a._v(" "),s("p",[a._v("要启动 kafka 的幂等性，无需修改代码，默认为关闭，需要修改配置文件:enable.idempotence=true 同时要求 ack=all 且 retries>1。")]),a._v(" "),s("p",[a._v("幂等原理：")]),a._v(" "),s("p",[a._v("每个 producer 有一个 producer id，服务端会通过这个 ID 关联记录每个 producer 的状态，每个 producer 的每条消息会带上一个递增的 sequence，服务端会记录每个 producer 对应的当前最大 sequence，producerId + sequence ，如果新的消息带上的 sequence 不大于当前的最大 sequence 就拒绝这条消息，如果消息落盘会同时更新最大 sequence，这个时候重发的消息会被服务端拒掉从而避免消息重复。该配置同样应用于 kafka 事务中。")]),a._v(" "),s("p",[a._v("2、ack=0，不重试。")]),a._v(" "),s("p",[a._v("可能会丢消息，适用于吞吐量指标重要性高于数据丢失，例如：日志收集。")]),a._v(" "),s("h2",{attrs:{id:"生产者和-broke-阶段消息丢失场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生产者和-broke-阶段消息丢失场景"}},[a._v("#")]),a._v(" 生产者和 broke 阶段消息丢失场景")]),a._v(" "),s("p",[a._v("1、ack=0，不重试")]),a._v(" "),s("p",[a._v("Producer 发送消息完，不管结果了，如果发送失败也就丢失了。")]),a._v(" "),s("p",[a._v("2、ack=1，leader crash")]),a._v(" "),s("p",[a._v("Producer 发送消息完，只等待 lead 写入成功就返回了，leader crash 了，这时 follower 没来及同步，消息丢失。")]),a._v(" "),s("p",[a._v("3、unclean.leader.election.enable 配置 true")]),a._v(" "),s("p",[a._v("允许选举 ISR 以外的副本作为 leader,会导致数据丢失，默认为 false。Producer 发送异步消息完，只等待 lead 写入成功就返回了，leader crash 了，这时 ISR 中没有 follower，leader 从 OSR 中选举，因为 OSR 中本来落后于 Leader 造成消息丢失。")]),a._v(" "),s("h2",{attrs:{id:"kafka消息堆积"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka消息堆积"}},[a._v("#")]),a._v(" kafka消息堆积")]),a._v(" "),s("p",[a._v("提高消费者处理速度")]),a._v(" "),s("p",[a._v("增加更多消费者")]),a._v(" "),s("p",[a._v("增加队列消息存储上限")]),a._v(" "),s("p",[a._v("注：Kafka 什么时候进行提交消费进度以及心跳保活的方式很关键")])])}),[],!1,null,null,null);t.default=r.exports},641:function(a,t,s){"use strict";s.r(t);var e=s(1),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"kafka"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka"}},[a._v("#")]),a._v(" kafka")]),a._v(" "),s("p",[a._v("Kafka 是一个分布式流式处理平台。")]),a._v(" "),s("p",[a._v("流平台具有三个关键功能：")]),a._v(" "),s("ol",[s("li",[a._v("消息队列：发布和订阅消息流，这个功能类似于消息队列，这也是 Kafka 也被归类为消息队列的原因。")]),a._v(" "),s("li",[a._v("容错的持久方式存储记录消息流： Kafka 会把消息持久化到磁盘，有效避免了消息丢失的风险。")]),a._v(" "),s("li",[a._v("流式处理平台: 在消息发布的时候进行处理，Kafka 提供了一个完整的流式处理类库。")])]),a._v(" "),s("p",[a._v("Kafka 主要有两大应用场景：")]),a._v(" "),s("ol",[s("li",[a._v("消息队列 ：建立实时流数据管道，以可靠地在系统或应用程序之间获取数据。")]),a._v(" "),s("li",[a._v("数据处理： 构建实时的流数据处理程序来转换或处理数据流。")])]),a._v(" "),s("h3",{attrs:{id:"和其他消息队列相比-kafka-的优势在哪里"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#和其他消息队列相比-kafka-的优势在哪里"}},[a._v("#")]),a._v(" 和其他消息队列相比,Kafka 的优势在哪里？")]),a._v(" "),s("p",[a._v("Kafka 相比其他消息队列主要的优势如下：")]),a._v(" "),s("ol",[s("li",[a._v("极致的性能 ：设计中大量使用了批量处理和异步的思想，最高可以每秒处理千万级别的消息。")]),a._v(" "),s("li",[a._v("生态系统兼容性好 ：Kafka 与周边生态系统的兼容性是最好的，在大数据和流计算领域。")])]),a._v(" "),s("h3",{attrs:{id:"队列模型了解吗-kafka-的消息模型知道吗"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#队列模型了解吗-kafka-的消息模型知道吗"}},[a._v("#")]),a._v(" 队列模型了解吗？Kafka 的消息模型知道吗？")]),a._v(" "),s("p",[a._v("使用队列(Queue)作为消息通信载体，满足生产者与消费者模式，一条消息只能被一个消费者使用，未被消费的消息在队列中保留直到被消费或超时。 比如：我们生产者发送 100 条消息的话，两个消费者来消费一般情况下两个消费者会按照消息发送的顺序各自消费一半(也就是你一个我一个的消费。)")]),a._v(" "),s("p",[a._v("队列模型存在的问题：")]),a._v(" "),s("p",[a._v("假如我们存在这样一种情况：我们需要将生产者产生的消息分发给多个消费者，并且每个消费者都能接收到完整的消息内容。")]),a._v(" "),s("p",[a._v("这种情况，队列模型就不好解决了。很多比较杠精的人就说：我们可以为每个消费者创建一个单独的队列，让生产者发送多份。这是一种非常愚蠢的做法，浪费资源不说，还违背了使用消息队列的目的。")]),a._v(" "),s("h4",{attrs:{id:"发布-订阅模型-kafka-消息模型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#发布-订阅模型-kafka-消息模型"}},[a._v("#")]),a._v(" 发布-订阅模型:Kafka 消息模型")]),a._v(" "),s("p",[a._v("发布-订阅模型主要是为了解决队列模型存在的问题。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://guide-blog-images.oss-cn-shenzhen.aliyuncs.com/java-guide-blog/发布订阅模型.png",alt:"发布订阅模型",loading:"lazy"}})]),a._v(" "),s("p",[a._v("发布订阅模型(Pub-Sub) 使用主题(Topic) 作为消息通信载体，类似于广播模式；发布者发布一条消息，该消息通过主题传递给所有的订阅者，在一条消息广播之后才订阅的用户则是收不到该条消息的。")]),a._v(" "),s("p",[a._v("在发布 - 订阅模型中，如果只有一个订阅者，那它和队列模型就基本是一样的了。所以说，发布 - 订阅模型在功能层面上是可以兼容队列模型的。")]),a._v(" "),s("p",[a._v("Kafka 采用的就是发布 - 订阅模型。")]),a._v(" "),s("blockquote",[s("p",[a._v("RocketMQ 的消息模型和 Kafka 基本是完全一样的。唯一的区别是 Kafka 中没有队列这个概念，与之对应的是 Partition(分区)。")])]),a._v(" "),s("h3",{attrs:{id:"基本概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基本概念"}},[a._v("#")]),a._v(" 基本概念")]),a._v(" "),s("p",[a._v("Kafka 将生产者发布的消息发送到 Topic(主题) 中，需要这些消息的消费者可以订阅这些 Topic(主题)，如下图所示：")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://my-blog-to-use.oss-cn-beijing.aliyuncs.com/2019-11/KafkaTopicPartitioning.png",alt:"Kafka Topic Partition",loading:"lazy"}})]),a._v(" "),s("h2",{attrs:{id:"二、kafka基本架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、kafka基本架构"}},[a._v("#")]),a._v(" 二、Kafka基本架构")]),a._v(" "),s("p",[a._v("Producer(生产者) 产生消息的一方。")]),a._v(" "),s("p",[a._v("Consumer(消费者) 消费消息的一方。")]),a._v(" "),s("p",[a._v("Broker(代理)")]),a._v(" "),s("p",[a._v("可以看作是一个独立的 Kafka 实例。多个 Kafka Broker 组成一个 Kafka Cluster。")]),a._v(" "),s("p",[a._v("同时，你一定也注意到每个 Broker 中又包含了 Topic 以及 Partition 这两个重要的概念：")]),a._v(" "),s("ul",[s("li",[a._v("主题（Topic）： Producer将消息发送到特定的主题，Consumer通过订阅特定的Topic（主题）来消费消息。")]),a._v(" "),s("li",[a._v("分区（Partition）: "),s("code",[a._v("Partition")]),a._v("属于"),s("code",[a._v("Topic")]),a._v("的一部分。一个Topic可以有多个Partition ，并且同一 Topic 下的 Partition 可以分布在不同的 Broker 上，这也就表明一个 Topic 可以横跨多个 Broker 。这正如我上面所画的图一样。")]),a._v(" "),s("li")]),a._v(" "),s("blockquote",[s("p",[a._v("划重点：Kafka 中的 Partition(分区) 实际上可以对应成为消息队列中的队列。这样是不是更好理解一点？")])]),a._v(" "),s("h3",{attrs:{id:"kafka-的多副本机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka-的多副本机制"}},[a._v("#")]),a._v(" Kafka 的多副本机制")]),a._v(" "),s("p",[a._v("还有一点我觉得比较重要的是 Kafka 为分区(Partition)引入了多副本(Replica)机制。分区(Partition)中的多个副本之间会有一个叫做 leader 的家伙，其他副本称为 follower。我们发送的消息会被发送到 leader 副本，然后 follower 副本才能从 leader 副本中拉取消息进行同步。")]),a._v(" "),s("blockquote",[s("p",[a._v("生产者和消费者只与 leader 副本交互。你可以理解为其他副本只是 leader 副本的拷贝，它们的存在只是为了保证消息存储的安全性。当 leader 副本发生故障时会从 follower 中选举出一个 leader,但是 follower 中如果有和 leader 同步程度达不到要求的参加不了 leader 的竞选。")])]),a._v(" "),s("h4",{attrs:{id:"好处"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#好处"}},[a._v("#")]),a._v(" 好处")]),a._v(" "),s("p",[a._v("Kafka 的多分区(Partition)以及多副本(Replica)机制有什么好处呢？")]),a._v(" "),s("ol",[s("li",[a._v("Kafka 通过给特定 Topic 指定多个 Partition, 而各个 Partition 可以分布在不同的 Broker 上, 这样便能提供比较好的并发能力(负载均衡)。")]),a._v(" "),s("li",[a._v("Partition 可以指定对应的 Replica 数, 这也极大地提高了消息存储的安全性, 提高了容灾能力，不过也相应的增加了所需要的存储空间。")])]),a._v(" "),s("h3",{attrs:{id:"zookeeper-在-kafka-中的作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zookeeper-在-kafka-中的作用"}},[a._v("#")]),a._v(" Zookeeper 在 Kafka 中的作用")]),a._v(" "),s("p",[a._v("下图就是我的本地 Zookeeper ，它成功和我本地的 Kafka 关联上(以下文件夹结构借助 idea 插件 Zookeeper tool 实现)。")]),a._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://my-blog-to-use.oss-cn-beijing.aliyuncs.com/2019-11/zookeeper-kafka.jpg"}}),a._v(" "),s("p",[a._v("ZooKeeper 主要为 Kafka 提供元数据的管理的功能。")]),a._v(" "),s("p",[a._v("从图中我们可以看出，Zookeeper 主要为 Kafka 做了下面这些事情：")]),a._v(" "),s("ol",[s("li",[a._v("Broker 注册 ：")])]),a._v(" "),s("p",[a._v("在 Zookeeper 上会有一个专门用来进行 Broker 服务器列表记录的节点。每个 Broker 在启动时，都会到 Zookeeper 上进行注册，即到 "),s("code",[a._v("/brokers/ids")]),a._v(" 下创建属于自己的节点。每个 Broker 就会将自己的 IP 地址和端口等信息记录到该节点中去")]),a._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[a._v("Topic 注册 ：")])]),a._v(" "),s("p",[a._v("在 Kafka 中，同一个 Topic 的消息会被分成多个分区并将其分布在多个 Broker 上，这些分区信息及与 Broker 的对应关系也都是由 Zookeeper 在维护。比如我创建了一个名字为 my-topic 的主题并且它有两个分区，对应到 zookeeper 中会创建这些文件夹："),s("code",[a._v("/brokers/topics/my-topic/Partitions/0")]),a._v("、"),s("code",[a._v("/brokers/topics/my-topic/Partitions/1")])]),a._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[a._v("负载均衡 ：")])]),a._v(" "),s("p",[a._v("上面也说过了 Kafka 通过给特定 Topic 指定多个 Partition, 而各个 Partition 可以分布在不同的 Broker 上, 这样便能提供比较好的并发能力。 对于同一个 Topic 的不同 Partition，Kafka 会尽力将这些 Partition 分布到不同的 Broker 服务器上。当生产者产生消息后也会尽量投递到不同 Broker 的 Partition 里面。当 Consumer 消费的时候，Zookeeper 可以根据当前的 Partition 数量以及 Consumer 数量来实现动态负载均衡。")]),a._v(" "),s("h3",{attrs:{id:"kafka-如何保证消息的消费顺序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka-如何保证消息的消费顺序"}},[a._v("#")]),a._v(" Kafka 如何保证消息的消费顺序？")]),a._v(" "),s("p",[a._v("我们在使用消息队列的过程中经常有业务场景需要严格保证消息的消费顺序，比如我们同时发了 2 个消息，这 2 个消息对应的操作分别对应的数据库操作是：")]),a._v(" "),s("ol",[s("li",[a._v("更改用户会员等级。")]),a._v(" "),s("li",[a._v("根据会员等级计算订单价格。")])]),a._v(" "),s("p",[a._v("假如这两条消息的消费顺序不一样造成的最终结果就会截然不同。")]),a._v(" "),s("p",[a._v("我们知道 Kafka 中 Partition(分区)是真正保存消息的地方，我们发送的消息都被放在了这里。而我们的 Partition(分区) 又存在于 Topic(主题) 这个概念中，并且我们可以给特定 Topic 指定多个 Partition。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://my-blog-to-use.oss-cn-beijing.aliyuncs.com/2019-11/KafkaTopicPartionsLayout.png",alt:"",loading:"lazy"}})]),a._v(" "),s("p",[a._v("每次添加消息到 Partition(分区) 的时候都会采用尾加法，如上图所示。 Kafka 只能为我们保证 Partition(分区) 中的消息有序。")]),a._v(" "),s("blockquote",[s("p",[a._v("消息在被追加到 Partition(分区)的时候都会分配一个特定的偏移量(offset)。Kafka 通过偏移量(offset)来保证消息在分区内的顺序性。")])]),a._v(" "),s("p",[a._v("所以，我们就有一种很简单的保证消息消费顺序的方法：")]),a._v(" "),s("p",[a._v("1 个 Topic 只对应一个 Partition。")]),a._v(" "),s("p",[a._v("这样当然可以解决问题，但是破坏了 Kafka 的设计初衷。")]),a._v(" "),s("p",[a._v("Kafka 中发送 1 条消息的时候，可以指定 topic, partition, key, data(数据) 4 个参数。如果你发送消息的时候指定了 Partition 的话，所有消息都会被发送到指定的 Partition。并且，同一个 key 的消息可以保证只发送到同一个 partition，这个我们可以采用表/对象的 ID 来作为 key 。")]),a._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[a._v("总结")]),a._v(" "),s("p",[a._v("对于如何保证 Kafka 中消息消费的顺序，有了下面两种方法：")]),a._v(" "),s("ol",[s("li",[s("p",[a._v("1 个 Topic 只对应一个 Partition。")])]),a._v(" "),s("li",[s("p",[a._v("(推荐)发送消息的时候指定 key/Partition。")])])])]),a._v(" "),s("p",[a._v("当然不仅仅只有上面两种方法，上面两种方法是我觉得比较好理解的，")]),a._v(" "),s("h3",{attrs:{id:"kafka-如何保证消息不丢失"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka-如何保证消息不丢失"}},[a._v("#")]),a._v(" Kafka 如何保证消息不丢失")]),a._v(" "),s("h4",{attrs:{id:"生产者丢失消息的情况"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生产者丢失消息的情况"}},[a._v("#")]),a._v(" 生产者丢失消息的情况")]),a._v(" "),s("p",[a._v("生产者(Producer) 调用"),s("code",[a._v("send")]),a._v("方法发送消息之后，消息可能因为网络问题并没有发送过去。")]),a._v(" "),s("p",[a._v("所以，我们不能默认在调用"),s("code",[a._v("send")]),a._v("方法发送消息之后消息发送成功了。为了确定消息是发送成功，我们要判断消息发送的结果。但是要注意的是 Kafka 生产者(Producer) 使用 "),s("code",[a._v("send")]),a._v(" 方法发送消息实际上是异步的操作，我们可以通过 "),s("code",[a._v("get()")]),a._v("方法获取调用结果，但是这样也让它变为了同步操作，示例代码如下：")]),a._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("SendResult")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" sendResult "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" kafkaTemplate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("send")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("topic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" o"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("sendResult"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("getRecordMetadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  logger"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("info")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"生产者成功发送消息到"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" sendResult"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("getProducerRecord")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("topic")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"-> "')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" sendRe\n              sult"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("getProducerRecord")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br")])]),s("p",[a._v("但是一般不推荐这么做！可以采用为其添加回调函数的形式，示例代码如下：")]),a._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("void")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("m")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n            "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ListenableFuture")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("SendResult")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" future "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" kafkaTemplate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("send")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("topic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" o"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n                    future"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("addCallback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("result "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("->")]),a._v(" logger"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("info")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"生产者成功发送消息到topic:{} partition:{}的消息"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" result"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("getRecordMetadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("topic")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" result"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("getRecordMetadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("partition")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n                    ex "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("->")]),a._v(" logger"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"生产者发送消失败，原因：{}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" ex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("getMessage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br")])]),s("p",[a._v("如果消息发送失败的话，我们检查失败的原因之后重新发送即可！")]),a._v(" "),s("p",[a._v("另外这里推荐为 Producer 的"),s("code",[a._v("retries")]),a._v("(重试次数)设置一个比较合理的值，一般是 3 ，")]),a._v(" "),s("p",[a._v("但是为了保证消息不丢失的话一般会设置比较大一点。")]),a._v(" "),s("p",[a._v("设置完成之后，当出现网络问题之后能够自动重试消息发送，避免消息丢失。另外，建议还要设置重试间隔，因为间隔太小的话重试的效果就不明显了，网络波动一次你 3 次一下子就重试完了")]),a._v(" "),s("h4",{attrs:{id:"消费者丢失消息的情况"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#消费者丢失消息的情况"}},[a._v("#")]),a._v(" 消费者丢失消息的情况")]),a._v(" "),s("p",[a._v("我们知道消息在被追加到 Partition(分区)的时候都会分配一个特定的偏移量(offset)。")]),a._v(" "),s("p",[a._v("偏移量(offset)表示 Consumer 当前消费到的 Partition(分区)的所在的位置。Kafka 通过偏移量（offset)可以保证消息在分区内的顺序性。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://my-blog-to-use.oss-cn-beijing.aliyuncs.com/2019-11/kafka-offset.jpg",alt:"kafka offset",loading:"lazy"}})]),a._v(" "),s("p",[a._v("当消费者拉取到了分区的某个消息之后，消费者会自动提交了 offset。自动提交的话会有一个问题，试想一下，当消费者刚拿到这个消息准备进行真正消费的时候，突然挂掉了，消息实际上并没有被消费，但是 offset 却被自动提交了。")]),a._v(" "),s("p",[a._v("解决办法也比较粗暴，我们手动关闭自动提交 offset，每次在真正消费完消息之后再自己手动提交 offset 。 但是，细心的朋友一定会发现，这样会带来消息被重新消费的问题。比如你刚刚消费完消息之后，还没提交 offset，结果自己挂掉了，那么这个消息理论上就会被消费两次。")]),a._v(" "),s("h4",{attrs:{id:"kafka-弄丢了消息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka-弄丢了消息"}},[a._v("#")]),a._v(" Kafka 弄丢了消息")]),a._v(" "),s("p",[a._v("我们知道 Kafka 为分区(Partition)引入了多副本(Replica)机制。")]),a._v(" "),s("p",[a._v("分区(Partition)中的多个副本之间会有一个叫做 leader 的家伙，其他副本称为 follower。")]),a._v(" "),s("p",[a._v("我们发送的消息会被发送到 leader 副本，然后 follower 副本才能从 leader 副本中拉取消息进行同步。")]),a._v(" "),s("p",[a._v("生产者和消费者只与 leader 副本交互。")]),a._v(" "),s("p",[a._v("你可以理解为其他副本只是 leader 副本的拷贝，它们的存在只是为了保证消息存储的安全性。")]),a._v(" "),s("p",[a._v("试想一种情况：假如 leader 副本所在的 broker 突然挂掉，那么就要从 follower 副本重新选出一个 leader ，但是 leader 的数据还有一些没有被 follower 副本的同步的话，就会造成消息丢失。")]),a._v(" "),s("p",[a._v("设置 "),s("code",[a._v("acks = all")])]),a._v(" "),s("p",[a._v("解决办法就是我们设置 acks = all。")]),a._v(" "),s("p",[a._v("acks 是 Kafka 生产者(Producer) 很重要的一个参数。")]),a._v(" "),s("p",[a._v("acks 的默认值即为 1，代表我们的消息被 leader 副本接收之后就算被成功发送。当我们配置 acks = all 代表则所有副本都要接收到该消息之后该消息才算真正成功被发送。")]),a._v(" "),s("p",[a._v("设置 replication.factor >= 3")]),a._v(" "),s("p",[a._v("为了保证 leader 副本能有 follower 副本能同步消息，我们一般会为 topic 设置 replication.factor >= 3。这样就可以保证每个 分区(partition) 至少有 3 个副本。虽然造成了数据冗余，但是带来了数据的安全性。")]),a._v(" "),s("p",[a._v("设置 min.insync.replicas > 1")]),a._v(" "),s("p",[a._v("一般情况下我们还需要设置 min.insync.replicas> 1 ，这样配置代表消息至少要被写入到 2 个副本才算是被成功发送。Min.insync.replicas 的默认值为 1 ，在实际生产中应尽量避免默认值 1。")]),a._v(" "),s("p",[a._v("但是，为了保证整个 Kafka 服务的高可用性，你需要确保 replication.factor > min.insync.replicas 。为什么呢？设想一下假如两者相等的话，只要是有一个副本挂掉，整个分区就无法正常工作了。这明显违反高可用性！一般推荐设置成 replication.factor = min.insync.replicas + 1。")]),a._v(" "),s("p",[a._v("设置 unclean.leader.election.enable = false")]),a._v(" "),s("blockquote",[s("p",[a._v("Kafka 0.11.0.0 版本开始 unclean.leader.election.enable 参数的默认值由原来的 true 改为 false")])]),a._v(" "),s("p",[a._v("我们最开始也说了我们发送的消息会被发送到 leader 副本，然后 follower 副本才能从 leader 副本中拉取消息进行同步。多个 follower 副本之间的消息同步情况不一样，当我们配置了 unclean.leader.election.enable = false 的话，当 leader 副本发生故障时就不会从 follower 副本中和 leader 同步程度达不到要求的副本中选择出 leader ，这样降低了消息丢失的可能性。")]),a._v(" "),s("h3",{attrs:{id:"kafka-如何保证消息不重复消费"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka-如何保证消息不重复消费"}},[a._v("#")]),a._v(" Kafka 如何保证消息不重复消费")]),a._v(" "),s("p",[a._v("kafka 出现消息重复消费的原因：")]),a._v(" "),s("ul",[s("li",[a._v("服务端侧已经消费的数据没有成功提交 offset(根本原因)。")]),a._v(" "),s("li",[a._v("Kafka 侧 由于服务端处理业务时间长或者网络链接等等原因让 Kafka 认为服务假死，触发了分区 rebalance。")])]),a._v(" "),s("p",[a._v("解决方案：")]),a._v(" "),s("ul",[s("li",[a._v("消费消息服务做幂等校验，比如 Redis 的 set、MySQL 的主键等天然的幂等功能。这种方法最有效。")]),a._v(" "),s("li",[a._v("将 "),s("code",[a._v("enable.auto.commit")]),a._v(" 参数设置为 false，关闭自动提交，开发者在代码中手动提交 offset。那么这里会有个问题：什么时候提交 offset 合适？\n"),s("ul",[s("li",[a._v("处理完消息再提交：依旧有消息重复消费的风险，和自动提交一样")]),a._v(" "),s("li",[a._v("拉取到消息即提交：会有消息丢失的风险。允许消息延时的场景，一般会采用这种方式。然后，通过定时任务在业务不繁忙(比如凌晨)的时候做数据兜底。")])])])]),a._v(" "),s("h3",{attrs:{id:"reference"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[a._v("#")]),a._v(" Reference")]),a._v(" "),s("ul",[s("li",[a._v("Kafka 官方文档： "),s("a",{attrs:{href:"https://kafka.apache.org/documentation/",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://kafka.apache.org/documentation/"),s("OutboundLink")],1)]),a._v(" "),s("li",[a._v("极客时间—《Kafka 核心技术与实战》第 11 节：无消息丢失配置怎么实现？")])]),a._v(" "),s("p",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247486269&idx=2&sn=ec00417ad641dd8c3d145d74cafa09ce&chksm=cea244f6f9d5cde0c8eb233fcc4cf82e11acd06446719a7af55230649863a3ddd95f78d111de&token=1633957262&lang=zh_CN#rd",target:"_blank",rel:"noopener noreferrer"}},[a._v("Kafka 系列第三篇！10 分钟学会如何在 Spring Boot 程序中使用 Kafka 作为消息队列?"),s("OutboundLink")],1)]),a._v(" "),s("h2",{attrs:{id:"三、基本原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、基本原理"}},[a._v("#")]),a._v(" 三、基本原理")]),a._v(" "),s("p",[a._v("我们将消息的发布者称作producer，将消息的订阅表述为consumer，将中间的存储阵列称作broker，这样就可以大致描绘出一个场面：")]),a._v(" "),s("p",[a._v("生产者将数据生产出来，交给broker进行存储，，消费者需要消费数据了，就从broker中区拿出数据来，然后完成一系列对数据的处理操作。")]),a._v(" "),s("p",[a._v("咋一看范爷太简单了，不是说了它是分布式吗？难道把producer、broker、和consumer放在三台不同的机器上就算是分布式了吗？")]),a._v(" "),s("p",[a._v("多个broker协同合作，producer和consumer部署在各个分布式消息发布订阅系统就完成了。")]),a._v(" "),s("p",[a._v("图上有个细节需要注意，producer到broker的过程是push，也就是有数据就推送到borker，而consumer到borker的过程就是pull，是通过consumer主动去拉数据的，而不是broker把数据主动发送到consumer端的。")]),a._v(" "),s("h2",{attrs:{id:"_4、zookeeper在kafka的作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4、zookeeper在kafka的作用"}},[a._v("#")]),a._v(" 4、Zookeeper在kafka的作用：")]),a._v(" "),s("p",[a._v("上述，提到了Zookeeper，那么Zookeeper在kafka的作用是什么？")]),a._v(" "),s("p",[a._v("（1）、无论是kafka集群，还是producer和consumer都依赖于zookeeper来保证系统可用性集群保存一些Meta信息。")]),a._v(" "),s("p",[a._v("（2）、kafka使用zookeeper作为其分布式协调框架，很好地将消息生产、存储、消费的过程结合在一起。")]),a._v(" "),s("p",[a._v("(3)、同时借助Z")]),a._v(" "),s("h2",{attrs:{id:"执行流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行流程"}},[a._v("#")]),a._v(" 执行流程：")]),a._v(" "),s("p",[a._v("我们看上面的图：我们把broker的数量减少，另有一台。现在假设我们安装上图进行部署:")]),a._v(" "),s("h2",{attrs:{id:"特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[a._v("#")]),a._v(" 特性：")]),a._v(" "),s("p",[a._v("高吞吐量、低延迟：")]),a._v(" "),s("p",[a._v("可扩展性：")]),a._v(" "),s("p",[a._v("持久性：")]),a._v(" "),s("p",[a._v("容错性：")]),a._v(" "),s("p",[a._v("高并发：")]),a._v(" "),s("p",[a._v("支持实时在线处理和离线处理：可以用时storm这种实时流处理系统对消息进行实时处理，同时还可以使用Hadoop这种批处理系统进行离线处理；")]),a._v(" "),s("h2",{attrs:{id:"使用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用场景"}},[a._v("#")]),a._v(" 使用场景：")]),a._v(" "),s("p",[a._v("日志收集：")]),a._v(" "),s("p",[a._v("消息系统：")]),a._v(" "),s("p",[a._v("用户活动跟踪：")]),a._v(" "),s("p",[a._v("运营指标：")]),a._v(" "),s("p",[a._v("流式处理：")]),a._v(" "),s("p",[a._v("事件源：")])])}),[],!1,null,null,null);t.default=r.exports}}]);