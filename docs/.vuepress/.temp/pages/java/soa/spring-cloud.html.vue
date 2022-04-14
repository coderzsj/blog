<template><h2 id="什么是微服务-spring-cloud" tabindex="-1"><a class="header-anchor" href="#什么是微服务-spring-cloud" aria-hidden="true">#</a> 什么是微服务？spring cloud</h2>
<p>spring cloud是一系列框架的有序集合，它利用了spring boot的开发便利性简化了分布式系统的开发，比如服务发现、服务网关、服务路由、链路追踪等。spring cloud并不重复造轮子，而是将市面上开发的比较好的模块集成进去，进行封装，从而减少了各模块的开发成本。换句话说：spring cloud提供了构建分布式系统所需的“全家桶”。</p>
<h3 id="springcloud现状" tabindex="-1"><a class="header-anchor" href="#springcloud现状" aria-hidden="true">#</a> SpringCloud现状</h3>
<ol>
<li>中文文档较少，出现问题网上没有太多的解决方案，</li>
<li>国内创业型公司技术老大的多是阿里系员工，而阿里系多采用DUBBO来构建微服务架构。</li>
<li>大型公司基本都有自己的分布式解决方案，而中小型公司的架构很多用不上为服务，所以没有采用SpringCloud的必要性。</li>
</ol>
<p>但是，微服务架构是一个趋势，而SpringCloud是为服务解决方案的佼佼者。</p>
<p>##　微服务优缺点</p>
<ul>
<li>单一职责原则；</li>
<li>每个服务足够内聚，足够小，代码容易理解，这样能聚焦一个指定的业务功能或业务需求；</li>
<li>开发简单，开发效率高，一个服务可能就是专一的只干一件事；</li>
<li>微服务能够被小团队单独开发，这个团队只需2-5个开发人员组成；</li>
<li>微服务是松耦合的，是有功能意义的服务，无论是在开发阶段或部署阶段都是独立的；</li>
<li>微服务能使用不同的语言开发；</li>
<li>易于和第三方集成，微服务允许容易且灵活的方式集成自动部署，通过持续集成工具，如jenkins，Hudson，bamboo；</li>
</ul>
<h3 id="springcloud优缺点" tabindex="-1"><a class="header-anchor" href="#springcloud优缺点" aria-hidden="true">#</a> SpringCloud优缺点</h3>
<p>优点：</p>
<ol>
<li>集大成者，SpringCloud包含了微服务架构的方方面面。</li>
<li>约定优于配置，基于注解，没有配置文件。</li>
<li>轻量级组件，SpringCloud对各个组件进行了大量的封装，从而简化了开发。</li>
<li>开发灵活，SpringCloud的组件都是解耦的，开发人员可以灵活按需选择组件。</li>
</ol>
<p>缺点：</p>
<ol>
<li>项目结构复杂，每一个组件或者每一个微服务都需要创建一个项目。</li>
<li>部署门槛高，项目部署需要配合DOCKER等容器技术进行集群部署，而是想要深入了解DOCKER，学习成本高。</li>
</ol>
<h2 id="springcloud项目搭建" tabindex="-1"><a class="header-anchor" href="#springcloud项目搭建" aria-hidden="true">#</a> SpringCloud项目搭建</h2>
<p>使用Maven项目进行构建：</p>
<p>父项目，GAV填写，根据自己的习惯进行填写，然后点击NEXT.</p>
<p>配置pom.xml文件。</p>
<p>父工程是不写业务的，其中我们可以将SRC文件夹删除，将一些没用的文件进行设置不显示或者删除，我们此时父工程就搭建完成了，就是这么简单。</p>
<p>接下来，我们就可以进行继续搭建其他的微服务工程了。我们首先搭建一个专门放我们是提累的服务，来让其他服务调用。</p>
<p>选中我们的父工程点击NEW，再点击MOUDULE：</p>
<p>这里是跟建父工程一样。</p>
<p>填写我们的MOUDULE的项目名称。</p>
<p>注意这一步，我们项目名的-省略，因为实际项目中有更多的工程，我们为了方便看得更清楚，需要加-来进行分割！</p>
<p>我们的第一个微服务工程就建立完成了，接下来就是配置啦，我们首先配置POM文件，我们引入了HUTOOL这个JAR包，它是一个JAVA基础工具类，对文件、流、加密解密、转码、正则、线程、xml等jdk方法进行封装，组成各种UTIL工具类，同时提供以下组件：</p>
<ul>
<li>布隆过滤器</li>
<li>缓存</li>
<li>克隆接口</li>
<li>类型转换</li>
<li>日期处理</li>
<li>数据库ORM</li>
<li>基于DFA有限自动机的多个关键字查找</li>
<li>HTTP客户端</li>
<li>IO和文件</li>
<li>有用的一些数据结构</li>
<li>日志</li>
<li>反射代理类的简化（AOP切面实现）</li>
</ul>
<p>它提倡单一的应用程序垂直地划分为一组小的服务，每个服务都是独立在自己的进程内，服务之间相互协调。</p>
<p>互相配置，为用户提供最终价值，服务之间采用轻量级的通信机制（HTTP）互相沟通，每个服务都围绕着具体的业务进行构建，并且能够独立的部署到生产环境中，</p>
<p>另外，应尽 量避免统一的，集中式的服务管理机制，对具体的一个服务而言，应该根据业务上下文，选择合适的语言，工具(Maven)对其进行构建，可以有一个非常轻量级的集中式管理来协调这些服务，可以使用不同的语言来编写服务，也可以使用不同的数据存储。</p>
<h2 id="微服务之间是如何独立通讯的" tabindex="-1"><a class="header-anchor" href="#微服务之间是如何独立通讯的" aria-hidden="true">#</a> 微服务之间是如何独立通讯的？</h2>
<p>同步（REST HTTP协议，RPC TCP 协议）</p>
<p>同步（REST HTTP协议，RPC TCP 协议）</p>
<p>异步（消息中间件，例如 Kafka、ActiveMQ、RabbitMQ、RocketMQ）</p>
<p>REST HTTP 协议（编写restful风格接口，调用接口）（springcloud使用REST通信）</p>
<p>RPC TCP 协议（客户端代理序列化方法和参数传入服务器，服务器代理解码方法和参数并执行方法，将结果再序列化传回去，客户端代理再解码结果得到结果）</p>
<p>springboot 可以springCloud</p>
<h2 id="springcloud-常见组件" tabindex="-1"><a class="header-anchor" href="#springcloud-常见组件" aria-hidden="true">#</a> SpringCloud 常见组件</h2>
<p>•注册中心组件：Eureka、Nacos 等</p>
<p>•负载均衡组件：Ribbon</p>
<p>•远程调用组件：OpenFeign</p>
<p>•网关组件：Zuul、Gateway</p>
<p>•服务保护组件：Hystrix、Sentinel</p>
<p>•服务配置管理组件：SpringCloudConfig、Nacos</p>
<h2 id="nacos-的-服务注册表结构是怎样的" tabindex="-1"><a class="header-anchor" href="#nacos-的-服务注册表结构是怎样的" aria-hidden="true">#</a> Nacos 的 服务注册表结构是怎样的？</h2>
<p>问题: 考察对 Nacos 数据分级结构的了解，以及 Nacos 源码的掌握情况</p>
<p>Nacos 采用了数据的分级存储模型，最外层是 Namespace，用来隔离环境。然后是 Group，用来对服务分组。接下来就是服务(Service)了，一个服务包含多个实例，但是可能处于不同机房，因此 Service 下有多个集群(Cluster)，Cluster 下是不同的实例(Instance)。</p>
<p>对应到 Java 代码中，Nacos 采用了一个多层的 Map 来表示。结构为 Map&lt;String, Map&lt;String, Service&gt;&gt;，其中最外层 Map 的 key 就是 namespaceId，值是一个 Map。内层 Map 的 key 是 group 拼接 serviceName，值是 Service 对象。Service 对象内部又是一个 Map，key 是集群名称，值是 Cluster 对象。而 Cluster 对象内部维护了 Instance 的集合。</p>
<p>如图：</p>
<p><img src="@source/java/soa/assets/image-20210925215305446.png" alt="image-20210925215305446"></p>
<h2 id="nacos-如何支撑阿里内部数十万服务注册压力" tabindex="-1"><a class="header-anchor" href="#nacos-如何支撑阿里内部数十万服务注册压力" aria-hidden="true">#</a> Nacos 如何支撑阿里内部数十万服务注册压力？</h2>
<p>Nacos 内部接收到注册的请求时，不会立即写数据，而是将服务注册的任务放入一个阻塞队列就立即响应给客户端。</p>
<p>然后利用线程池读取阻塞队列中的任务，异步来完成实例更新，从而提高并发写能力。</p>
<h2 id="nacos-如何避免并发读写冲突问题" tabindex="-1"><a class="header-anchor" href="#nacos-如何避免并发读写冲突问题" aria-hidden="true">#</a> Nacos 如何避免并发读写冲突问题？</h2>
<p>问题: 考察对 Nacos 源码的掌握情况</p>
<p>Nacos 在更新实例列表时，会采用 CopyOnWrite 技术，首先将旧的实例列表拷贝一份，然后更新拷贝的实例列表，再用更新后的实例列表来覆盖旧的实例列表。</p>
<p>这样在更新的过程中，就不会对读实例列表的请求产生影响，也不会出现脏读问题了。</p>
<h2 id="nacos-与-eureka" tabindex="-1"><a class="header-anchor" href="#nacos-与-eureka" aria-hidden="true">#</a> Nacos 与 Eureka</h2>
<p>Nacos 与 Eureka 有相同点，也有不同之处，可以从以下几点来描述：</p>
<ul>
<li><strong>接口方式</strong>：Nacos 与 Eureka 都对外暴露了 Rest 风格的 API 接口，用来实现服务注册、发现等功能</li>
<li><strong>实例类型</strong>：Nacos 的实例有永久和临时实例之分；而 Eureka 只支持临时实例</li>
<li><strong>健康检测</strong>：Nacos 对临时实例采用心跳模式检测，对永久实例采用主动请求来检测；Eureka 只支持心跳模式</li>
<li><strong>服务发现</strong>：Nacos 支持定时拉取和订阅推送两种模式；Eureka 只支持定时拉取模式</li>
</ul>
<h2 id="sentinel-的限流与-gateway-的限流有什么差别" tabindex="-1"><a class="header-anchor" href="#sentinel-的限流与-gateway-的限流有什么差别" aria-hidden="true">#</a> Sentinel 的限流与 Gateway 的限流有什么差别？</h2>
<p>限流算法常见的有三种实现：</p>
<p>滑动时间窗口、令牌桶算法、漏桶算法。</p>
<p>Gateway 则采用了基于 Redis 实现的令牌桶算法。</p>
<p>而 Sentinel 内部却比较复杂：</p>
<ul>
<li>默认限流模式是基于滑动时间窗口算法</li>
<li>排队等待的限流模式则基于漏桶算法</li>
<li>而热点参数限流则是基于令牌桶算法</li>
</ul>
<h2 id="sentinel-的线程隔离与-hystix-的线程隔离" tabindex="-1"><a class="header-anchor" href="#sentinel-的线程隔离与-hystix-的线程隔离" aria-hidden="true">#</a> Sentinel 的线程隔离与 Hystix 的线程隔离</h2>
<p>线程隔离方案的掌握</p>
<p>Hystix 默认是基于线程池实现的线程隔离，每一个被隔离的业务都要创建一个独立的线程池，线程过多会带来额外的 CPU 开销，性能一般，但是隔离性更强。</p>
<p>Sentinel 是基于 信号量 实现的线程隔离，不用创建线程池，性能较好，但是隔离性一般。</p>
<h2 id="服务熔断-服务降级" tabindex="-1"><a class="header-anchor" href="#服务熔断-服务降级" aria-hidden="true">#</a> 服务熔断，服务降级</h2>
<p>服务熔断（提供者）</p>
<p>Hystrix解决服务雪崩的方案（服务熔断）：</p>
<p>在不可用的服务中服务端给调用方返回备用响应，就可以继续运行调用之后的服务，就可以避免长时间的等待或抛出无法解决的异常，无法释放调用线程，导致服务雪崩</p>
<p>服务降级（消费者）：</p>
<p>当某个时间段访问压力大，需要停掉不重要的某些功能（例如：广告。。），释放占用资源以保证主要核心重要业务能够顺利完成，而消费者调用这些不重要功能时，客户端会返回备用响应</p>
</template>
