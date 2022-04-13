(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{541:function(v,_,a){v.exports=a.p+"assets/img/image-20210925215305446.7f0da66b.png"},669:function(v,_,a){"use strict";a.r(_);var s=a(1),t=Object(s.a)({},(function(){var v=this,_=v.$createElement,s=v._self._c||_;return s("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[s("h2",{attrs:{id:"什么是微服务-spring-cloud"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是微服务-spring-cloud"}},[v._v("#")]),v._v(" 什么是微服务？spring cloud")]),v._v(" "),s("p",[v._v("spring cloud是一系列框架的有序集合，它利用了spring boot的开发便利性简化了分布式系统的开发，比如服务发现、服务网关、服务路由、链路追踪等。spring cloud并不重复造轮子，而是将市面上开发的比较好的模块集成进去，进行封装，从而减少了各模块的开发成本。换句话说：spring cloud提供了构建分布式系统所需的“全家桶”。")]),v._v(" "),s("h3",{attrs:{id:"springcloud现状"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springcloud现状"}},[v._v("#")]),v._v(" SpringCloud现状")]),v._v(" "),s("ol",[s("li",[v._v("中文文档较少，出现问题网上没有太多的解决方案，")]),v._v(" "),s("li",[v._v("国内创业型公司技术老大的多是阿里系员工，而阿里系多采用DUBBO来构建微服务架构。")]),v._v(" "),s("li",[v._v("大型公司基本都有自己的分布式解决方案，而中小型公司的架构很多用不上为服务，所以没有采用SpringCloud的必要性。")])]),v._v(" "),s("p",[v._v("但是，微服务架构是一个趋势，而SpringCloud是为服务解决方案的佼佼者。")]),v._v(" "),s("p",[v._v("##　微服务优缺点")]),v._v(" "),s("ul",[s("li",[v._v("单一职责原则；")]),v._v(" "),s("li",[v._v("每个服务足够内聚，足够小，代码容易理解，这样能聚焦一个指定的业务功能或业务需求；")]),v._v(" "),s("li",[v._v("开发简单，开发效率高，一个服务可能就是专一的只干一件事；")]),v._v(" "),s("li",[v._v("微服务能够被小团队单独开发，这个团队只需2-5个开发人员组成；")]),v._v(" "),s("li",[v._v("微服务是松耦合的，是有功能意义的服务，无论是在开发阶段或部署阶段都是独立的；")]),v._v(" "),s("li",[v._v("微服务能使用不同的语言开发；")]),v._v(" "),s("li",[v._v("易于和第三方集成，微服务允许容易且灵活的方式集成自动部署，通过持续集成工具，如jenkins，Hudson，bamboo；")])]),v._v(" "),s("h3",{attrs:{id:"springcloud优缺点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springcloud优缺点"}},[v._v("#")]),v._v(" SpringCloud优缺点")]),v._v(" "),s("p",[v._v("优点：")]),v._v(" "),s("ol",[s("li",[v._v("集大成者，SpringCloud包含了微服务架构的方方面面。")]),v._v(" "),s("li",[v._v("约定优于配置，基于注解，没有配置文件。")]),v._v(" "),s("li",[v._v("轻量级组件，SpringCloud对各个组件进行了大量的封装，从而简化了开发。")]),v._v(" "),s("li",[v._v("开发灵活，SpringCloud的组件都是解耦的，开发人员可以灵活按需选择组件。")])]),v._v(" "),s("p",[v._v("缺点：")]),v._v(" "),s("ol",[s("li",[v._v("项目结构复杂，每一个组件或者每一个微服务都需要创建一个项目。")]),v._v(" "),s("li",[v._v("部署门槛高，项目部署需要配合DOCKER等容器技术进行集群部署，而是想要深入了解DOCKER，学习成本高。")])]),v._v(" "),s("h2",{attrs:{id:"springcloud项目搭建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springcloud项目搭建"}},[v._v("#")]),v._v(" SpringCloud项目搭建")]),v._v(" "),s("p",[v._v("使用Maven项目进行构建：")]),v._v(" "),s("p",[v._v("父项目，GAV填写，根据自己的习惯进行填写，然后点击NEXT.")]),v._v(" "),s("p",[v._v("配置pom.xml文件。")]),v._v(" "),s("p",[v._v("父工程是不写业务的，其中我们可以将SRC文件夹删除，将一些没用的文件进行设置不显示或者删除，我们此时父工程就搭建完成了，就是这么简单。")]),v._v(" "),s("p",[v._v("接下来，我们就可以进行继续搭建其他的微服务工程了。我们首先搭建一个专门放我们是提累的服务，来让其他服务调用。")]),v._v(" "),s("p",[v._v("选中我们的父工程点击NEW，再点击MOUDULE：")]),v._v(" "),s("p",[v._v("这里是跟建父工程一样。")]),v._v(" "),s("p",[v._v("填写我们的MOUDULE的项目名称。")]),v._v(" "),s("p",[v._v("注意这一步，我们项目名的-省略，因为实际项目中有更多的工程，我们为了方便看得更清楚，需要加-来进行分割！")]),v._v(" "),s("p",[v._v("我们的第一个微服务工程就建立完成了，接下来就是配置啦，我们首先配置POM文件，我们引入了HUTOOL这个JAR包，它是一个JAVA基础工具类，对文件、流、加密解密、转码、正则、线程、xml等jdk方法进行封装，组成各种UTIL工具类，同时提供以下组件：")]),v._v(" "),s("ul",[s("li",[v._v("布隆过滤器")]),v._v(" "),s("li",[v._v("缓存")]),v._v(" "),s("li",[v._v("克隆接口")]),v._v(" "),s("li",[v._v("类型转换")]),v._v(" "),s("li",[v._v("日期处理")]),v._v(" "),s("li",[v._v("数据库ORM")]),v._v(" "),s("li",[v._v("基于DFA有限自动机的多个关键字查找")]),v._v(" "),s("li",[v._v("HTTP客户端")]),v._v(" "),s("li",[v._v("IO和文件")]),v._v(" "),s("li",[v._v("有用的一些数据结构")]),v._v(" "),s("li",[v._v("日志")]),v._v(" "),s("li",[v._v("反射代理类的简化（AOP切面实现）")])]),v._v(" "),s("p",[v._v("它提倡单一的应用程序垂直地划分为一组小的服务，每个服务都是独立在自己的进程内，服务之间相互协调。")]),v._v(" "),s("p",[v._v("互相配置，为用户提供最终价值，服务之间采用轻量级的通信机制（HTTP）互相沟通，每个服务都围绕着具体的业务进行构建，并且能够独立的部署到生产环境中，")]),v._v(" "),s("p",[v._v("另外，应尽 量避免统一的，集中式的服务管理机制，对具体的一个服务而言，应该根据业务上下文，选择合适的语言，工具(Maven)对其进行构建，可以有一个非常轻量级的集中式管理来协调这些服务，可以使用不同的语言来编写服务，也可以使用不同的数据存储。")]),v._v(" "),s("h2",{attrs:{id:"微服务之间是如何独立通讯的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#微服务之间是如何独立通讯的"}},[v._v("#")]),v._v(" 微服务之间是如何独立通讯的？")]),v._v(" "),s("p",[v._v("同步（REST HTTP协议，RPC TCP 协议）")]),v._v(" "),s("p",[v._v("同步（REST HTTP协议，RPC TCP 协议）")]),v._v(" "),s("p",[v._v("异步（消息中间件，例如 Kafka、ActiveMQ、RabbitMQ、RocketMQ）")]),v._v(" "),s("p",[v._v("REST HTTP 协议（编写restful风格接口，调用接口）（springcloud使用REST通信）")]),v._v(" "),s("p",[v._v("RPC TCP 协议（客户端代理序列化方法和参数传入服务器，服务器代理解码方法和参数并执行方法，将结果再序列化传回去，客户端代理再解码结果得到结果）")]),v._v(" "),s("p",[v._v("springboot 可以springCloud")]),v._v(" "),s("h2",{attrs:{id:"springcloud-常见组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springcloud-常见组件"}},[v._v("#")]),v._v(" SpringCloud 常见组件")]),v._v(" "),s("p",[v._v("•注册中心组件：Eureka、Nacos 等")]),v._v(" "),s("p",[v._v("•负载均衡组件：Ribbon")]),v._v(" "),s("p",[v._v("•远程调用组件：OpenFeign")]),v._v(" "),s("p",[v._v("•网关组件：Zuul、Gateway")]),v._v(" "),s("p",[v._v("•服务保护组件：Hystrix、Sentinel")]),v._v(" "),s("p",[v._v("•服务配置管理组件：SpringCloudConfig、Nacos")]),v._v(" "),s("h2",{attrs:{id:"nacos-的-服务注册表结构是怎样的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nacos-的-服务注册表结构是怎样的"}},[v._v("#")]),v._v(" Nacos 的 服务注册表结构是怎样的？")]),v._v(" "),s("p",[v._v("问题: 考察对 Nacos 数据分级结构的了解，以及 Nacos 源码的掌握情况")]),v._v(" "),s("p",[v._v("Nacos 采用了数据的分级存储模型，最外层是 Namespace，用来隔离环境。然后是 Group，用来对服务分组。接下来就是服务(Service)了，一个服务包含多个实例，但是可能处于不同机房，因此 Service 下有多个集群(Cluster)，Cluster 下是不同的实例(Instance)。")]),v._v(" "),s("p",[v._v("对应到 Java 代码中，Nacos 采用了一个多层的 Map 来表示。结构为 Map<String, Map<String, Service>>，其中最外层 Map 的 key 就是 namespaceId，值是一个 Map。内层 Map 的 key 是 group 拼接 serviceName，值是 Service 对象。Service 对象内部又是一个 Map，key 是集群名称，值是 Cluster 对象。而 Cluster 对象内部维护了 Instance 的集合。")]),v._v(" "),s("p",[v._v("如图：")]),v._v(" "),s("p",[s("img",{attrs:{src:a(541),alt:"image-20210925215305446",loading:"lazy"}})]),v._v(" "),s("h2",{attrs:{id:"nacos-如何支撑阿里内部数十万服务注册压力"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nacos-如何支撑阿里内部数十万服务注册压力"}},[v._v("#")]),v._v(" Nacos 如何支撑阿里内部数十万服务注册压力？")]),v._v(" "),s("p",[v._v("Nacos 内部接收到注册的请求时，不会立即写数据，而是将服务注册的任务放入一个阻塞队列就立即响应给客户端。")]),v._v(" "),s("p",[v._v("然后利用线程池读取阻塞队列中的任务，异步来完成实例更新，从而提高并发写能力。")]),v._v(" "),s("h2",{attrs:{id:"nacos-如何避免并发读写冲突问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nacos-如何避免并发读写冲突问题"}},[v._v("#")]),v._v(" Nacos 如何避免并发读写冲突问题？")]),v._v(" "),s("p",[v._v("问题: 考察对 Nacos 源码的掌握情况")]),v._v(" "),s("p",[v._v("Nacos 在更新实例列表时，会采用 CopyOnWrite 技术，首先将旧的实例列表拷贝一份，然后更新拷贝的实例列表，再用更新后的实例列表来覆盖旧的实例列表。")]),v._v(" "),s("p",[v._v("这样在更新的过程中，就不会对读实例列表的请求产生影响，也不会出现脏读问题了。")]),v._v(" "),s("h2",{attrs:{id:"nacos-与-eureka"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nacos-与-eureka"}},[v._v("#")]),v._v(" Nacos 与 Eureka")]),v._v(" "),s("p",[v._v("Nacos 与 Eureka 有相同点，也有不同之处，可以从以下几点来描述：")]),v._v(" "),s("ul",[s("li",[s("strong",[v._v("接口方式")]),v._v("：Nacos 与 Eureka 都对外暴露了 Rest 风格的 API 接口，用来实现服务注册、发现等功能")]),v._v(" "),s("li",[s("strong",[v._v("实例类型")]),v._v("：Nacos 的实例有永久和临时实例之分；而 Eureka 只支持临时实例")]),v._v(" "),s("li",[s("strong",[v._v("健康检测")]),v._v("：Nacos 对临时实例采用心跳模式检测，对永久实例采用主动请求来检测；Eureka 只支持心跳模式")]),v._v(" "),s("li",[s("strong",[v._v("服务发现")]),v._v("：Nacos 支持定时拉取和订阅推送两种模式；Eureka 只支持定时拉取模式")])]),v._v(" "),s("h2",{attrs:{id:"sentinel-的限流与-gateway-的限流有什么差别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sentinel-的限流与-gateway-的限流有什么差别"}},[v._v("#")]),v._v(" Sentinel 的限流与 Gateway 的限流有什么差别？")]),v._v(" "),s("p",[v._v("限流算法常见的有三种实现：")]),v._v(" "),s("p",[v._v("滑动时间窗口、令牌桶算法、漏桶算法。")]),v._v(" "),s("p",[v._v("Gateway 则采用了基于 Redis 实现的令牌桶算法。")]),v._v(" "),s("p",[v._v("而 Sentinel 内部却比较复杂：")]),v._v(" "),s("ul",[s("li",[v._v("默认限流模式是基于滑动时间窗口算法")]),v._v(" "),s("li",[v._v("排队等待的限流模式则基于漏桶算法")]),v._v(" "),s("li",[v._v("而热点参数限流则是基于令牌桶算法")])]),v._v(" "),s("h2",{attrs:{id:"sentinel-的线程隔离与-hystix-的线程隔离"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sentinel-的线程隔离与-hystix-的线程隔离"}},[v._v("#")]),v._v(" Sentinel 的线程隔离与 Hystix 的线程隔离")]),v._v(" "),s("p",[v._v("线程隔离方案的掌握")]),v._v(" "),s("p",[v._v("Hystix 默认是基于线程池实现的线程隔离，每一个被隔离的业务都要创建一个独立的线程池，线程过多会带来额外的 CPU 开销，性能一般，但是隔离性更强。")]),v._v(" "),s("p",[v._v("Sentinel 是基于 信号量 实现的线程隔离，不用创建线程池，性能较好，但是隔离性一般。")]),v._v(" "),s("h2",{attrs:{id:"服务熔断-服务降级"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#服务熔断-服务降级"}},[v._v("#")]),v._v(" 服务熔断，服务降级")]),v._v(" "),s("p",[v._v("服务熔断（提供者）")]),v._v(" "),s("p",[v._v("Hystrix解决服务雪崩的方案（服务熔断）：")]),v._v(" "),s("p",[v._v("在不可用的服务中服务端给调用方返回备用响应，就可以继续运行调用之后的服务，就可以避免长时间的等待或抛出无法解决的异常，无法释放调用线程，导致服务雪崩")]),v._v(" "),s("p",[v._v("服务降级（消费者）：")]),v._v(" "),s("p",[v._v("当某个时间段访问压力大，需要停掉不重要的某些功能（例如：广告。。），释放占用资源以保证主要核心重要业务能够顺利完成，而消费者调用这些不重要功能时，客户端会返回备用响应")])])}),[],!1,null,null,null);_.default=t.exports}}]);