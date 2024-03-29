---
title: 面试技巧
date: 2022-01-01
category: 面经
tag:
  - interview
---

## interview

1. 自动说出自己匹配该职位的要点，比如项目时长够，所用技术匹配，别等提问者提问。
2. 面试前不仅要准备八股文，更要多准备亮点，面试中尽可能地通过抛出亮点来引导提问者提问，尽量压缩提问者的提问空间。
3. 语气神态不亢不卑，甚至故意示弱，比如某些问题想下再回答，或故意抛出些小问题，等提问者提问后再澄清。总之别让提问者感觉你事先准备过。
4. 抛出诱饵问题后，别立即展开，等提问者提问再展开，这点很重要。如果直接展开，就相当于自说自话。

下面就按面试流程逐渐展开。首先是自我介绍和项目介绍阶段。

1. 抛出自己和这个职位的匹配度。

比如可以说，我叫XXX，(省略自我介绍性文字)，我之前在 java 方面有3年左右开发经验，有 mysql,oracle 等项目经验，有 nginx，kafka,dubbo分布式 等的使用经验。总之先亮出你和职位介绍的匹配度，职位要求上有的技术，如果你有直接说。

2. 介绍项目时，别过多介绍需求，大致介绍你做的模块，介绍项目流程和使用的管理方式，尤其要说明项目管理和发布用到的组件和技术。
比如你可以说，这个项目里，我做了手工报销相关的模块和(医照人员)手工报销的模块，项目规模是80人，做了多久9个月。这个项目是用敏捷开发的管理方式。这个项目，我们用用maven+gitlab来管理项目，等等。

3. 抛出亮点，但别展开。下面列些哪怕是初级开发也能抛出的亮点。

这个项目里，我解决过了oom问题，有过用redis缓存的经验，解决过redis内存溢出问题，解决过dubbo超时而导致的问题。

在项目开发过程中，我还专研过ArrayList和HashMap的底层源码，还看过SpringBoot相关注解的源码。

大家可以对比下，大多数候选人面试java，在项目介绍阶段，是大谈特谈项目需求和功能，这就相当于把提问的控制权交给提问者。但相反，你不仅列出了你和该职位的匹配度，还用项目管理方式证明了你项目的真实性。更重要的是，你还抛出了诸多分布式和解决过的实际问题作为亮点。

这样一来，不少提问者，尤其是资历比较浅的提问者，往往就可能在听到你的说辞后顺带一问，比如顺口问，你们项目是怎么用Redis的，你是怎么解决OOM问题的，这样就相当于进入到你事先准备好的范围。

但是请注意，你在介绍项目时，可以抛出亮点，比如说解决过oom问题，但绝不能展开说怎么解决。原因很简单，你还在介绍项目，如果展开，就相当于条理不清晰。不过你提到的点，如果提问者感兴趣，自然会继续提问，你都不用着急。

介绍好项目经验后，一般提问者会看着你简历，针对你简历上提到的，以及你刚说的点发问。刚也说了，你完全可以在面试前准备好技术和亮点说辞，这样的话你可以大概率把提问者的问题引导带到你准备的范围。

其实很多亮点，比如OOM调优，缓存性能优化，或者多线程使用要点等，java八股文里都有，甚至你都不用自己多准备。但是，在这环节你回答提问者技术提问时，要注意两个要点

第一，主动结合项目需求，说些使用要点证明这个技术你在项目里用过。

第二，在回答好当前提问后多说一句，继续引导提问者提问。

接上文，比如提问者问你，你项目里是怎么用redis的？你可以通过如下层次来说。

1. 说需求，应为我们项目经常会查询会员，为了提升性能，所以把会员信息放入缓存。
2. 说实现，比如在redis缓存会员信息时，键是什么？值是什么，缓存时用到Jedis的什么方法。
3. 如果有，说遇到并解决过的问题。比如可以说，在这个过程中，我还解决过Redis穿透问题。同样抛出点，别展开，原因刚才也说了。
4. 这点必须有，再给出引导性说辞。比如说，这个项目里，除了redis缓存，我们还用到了索引来提升性能(引导到索引)。或者，这个项目里，我们用的不是单机版Redis，而是Redis哨兵集群(引导到集群)。

如果不引导，你回答好问题后，提问者大概率会自行发问，这样就有可能问到你不熟悉的点，但你再这样引导一波，后面提问者大概率会继续顺着问。

Redis，其他技术一样准备。你这样一说，不仅能向提问者证明这个技术你有项目经验，而且还能通过基本的用法，进一步证明你用过。同时还能通过说明你解决过的问题进一步展示技能，最后还带引导一波。

这样的话，提问者问的范围大概率会是你简历上提到的技术点，以及你引导的内容。只要你事先准备过相关技术的用法和解决过的问题(这些都能从 java 八股文里找到答案)。说难听点，你哪怕在之前项目里没用过，或者用得很浅，一样能给提问者留下“项目中掌握该技术”的印象，甚至还能留下“排查解决过 xx 方面实际问题”的印象。

结合项目问技术之后，提问者一般会从 java 核心，数据库，框架等方面提问。这方面你更可以通过背八股文来应对。这里，任何一个问题，你照样可以从“项目中的用法”、“解决过的实际问题”和“引导说辞”等方面来说。

比如你被问，hashcode 方法为什么要重写？你可以这样回答。

1. 解释下原因，原因大家自行去看八股文，不展开。
2. 说下你项目里怎么用的，无非是存放键值对，但要结合需求说。
3. 说下你知道hashmap源码，但别展开，等提问者继续提问。
4. 把后继问题引导到缓存等方面，比如可以这样说，我们项目是用hashmap做缓存，除此之外，我们还引入了redis缓存，以提升数据库访问性能，这样就引导到redis甚至数据库调优方面。或者说，Hashmap是线程不安全的，所以使用起来要小心，这样就引导到了线程方面。

到这里为止，基本上提问者的问题就问完了，如果采用上文给出的方法来准备并实践面试，你会比其他只会背答案的候选人强在哪里呢？

1. 人家大概率只会说理论，你能结合项目证明你用过。
2. 由于事先准备过，所以能讲述源码、解决过的问题等亮点说辞。
3. 由于准备过引导话术，所以虽然可能无法做到百分之一百，但能把很多提问者的问题引导到你准备好的范围。

上文给出的是准备面试和实践面试的方法，但实际操作起来，面试前需要准备的点还是比较多的。或者可以这样说，如果事先不准备，这套面试方法论可以说是无源之水。

本来要想如何在面试前准备背题、如何准备 java 亮点乃至面试控场和引导技巧的，但来了其他事情，本文就先更新到这里。有机会再继续说下高效准备 Java 面试以及在面试中引导提问者提问的技巧。

1 通过自我介绍和介绍项目，全面抛出自己和该职位的匹配度，同时全面抛出自己的技术列表。

2 在项目介绍中，有效地证明自己的商业项目经验，同时可以通过抛出亮点作为诱饵，最大程度地引导提问者后继提问。

但是，提问者问好这些问题后，如果你不加以引导，提问者依然可能自由发问，从而问到你不熟悉的技术点。这里就将着重讲下“引导”相关的技巧。

先讲下 Java 核心方面的事先准备和引导相关技巧。在 java 核心方面，哪怕初级开发多少也能准备集合、线程和异常处理等方面的说辞。

集合方面，你可以准备下HashMap的底层代码，尤其是和hashcode的源码，同时也可以准备下ArrayList和快速失效(`fast fail`)的底层代码，随后可以再进一步看下ConcurrentHashMap的读写并发管理部分的代码，因为其中包含volatile，散列表数据结构和线程并发部分的技能，而且jdk1.7和1.8ConcurrentHashMap的底层代码实现起来还不同，而且ConcurrentHashMap源码网上都有，还不难，所以你尤其可以通过ConcurrentHashMap来展示实力。

面试的时候，提问者大概率会问到ArrayList等基本集合的问题，比如如何遍历，有什么优势等等。问到了，你回答好本身问题后，再多说句，在项目里，我遇到过ArrayList快速失效问题，对此我还专研过底层源码，然后坐等提问者提问，提问者一旦问了，你甚至可以边写源码边解释，这样如果你说你才1年经验，面试估计也不信。

集合相关的，HashMap也是一个必考点，姑且我不管提问者怎么提问，回答好以后，你再多说下，我知道为什么要重写hashcode方法，因为我看过HashMap底层源码，然后再说下。甚至你说好HashMap底层源码后，还可以继续提下，HashMap是线程不安全的，而ConcurrentHashMap是线程安全，因为我见过它的源码，然后展开。

甚至可以这样说，当你按上述方式准备并引导后，虽然你只展示了集合方面的技能，但Java核心方面，提问者就不问别的问题了。

在线程方面，准备下锁，volatile，线程池和ThreadLocal的说辞，

[参考 threadlocal.md]()

具体通过ConcurrentHashMap了解下锁(1.7)版本和synchronized+volatile(1.8版本)的用法

以及ThreadLocal里可能引发内存泄漏的问题，这些点网上都有，本文就不展开了，其实也未必多，能讲清楚就行了。

这方面怎么引导？被问及volatile，回答好以后多提一句，ConcurrentHashMap底层源码有这个，然后可以引导到ConcurrentHashMap底层源码。任何线程并发问题，用类似多说一句的方式，引导到volatile，甚至是ConcurrentHashMap底层源码。任何并发问题，可以引导到线程池，线程池里有个参数是描述等待队列，如果设置成无界的有可能出现OOM(不知道的自己查)，也就是说，面试中回答好并发后，通过引导，可以引到线程池话题，再可以找机会说出，自己解决过因线程池等待队列设置不当而导致的OOM问题。

或者你可以从ThreadLocal，引出底层的Weak引用话题，再引出JVM结构以及OOM调优方面的话题。这块不知道也自己去查，不说白不说。

异常方面，准备下你在项目里的异常处理方法实践说辞，比如尽量缩小try...catch的范围，finally从句里放释放资源的代码，catch里应尽量处理异常，先用IOException等专业异常处理，再用Exception兜底，以及尽量缩小异常的影响范围，别让程序一遇异常就崩。面试时如果你说出上述异常处理的最佳实践要点，虽然价值不大，好歹也算项目开发经验，也就是说，任何异常方面的问题，你都可以通过上文提到的“多说一句”的方式，引导到“异常实践”上。

Java核心方面，其实还有很多可以挖掘的点，比如String,final关键字等，而且对初级开发也适用。只要大家第一准备些(未必很深的)源码和解决(oom)问题的说辞，再按上文给出的方法找个相关问题点。只要提问者一旦问及，你回答好后再多说句，同时抛出事先准备好的亮点说辞。

其实Java核心方面，虚拟机和内存调优绝对是个值钱的亮点。如何在面试前准备，面试时如何引导以及如何展示，我有专门的文章来介绍。不再重复介绍如何引出该话题，而是讲下在引入虚拟机调优话题后，如何全面展示相关技能的说法。

[参考 jvm 调优.md]()

再说下，数据库调优方面的说辞该如何准备？以及对应的引导话术。

1. 熟悉索引，包括索引结构，复合索引和回表等技能，最好是结合源码。
2. 单机版调优技能怎么说？通过看执行计划，调优SQL语句，具体是在项目中，会在linux上设置，如果有超过10秒的SQL就打印出来，然后通过执行计划看耗时点，比如大多是走全表扫描，或者有了索引没用到，或者子sql运行了多次，再往深讲就是Oracle里连接方式不对。你通过执行计划看到问题所在后，就对应修改，比如建复合索引，或者通过with语句把子查询提取出来。
3. 可以再进一步讲些MyCAT分库分表和redis方面的调优能力。这方面可以准备的项目说辞是：比如业务请求里，会经常用公司ID向风控模块看风险情况，那么就可以用ID做键，风控字段做值，另外再把null放到键里，以放缓存击穿。另外对于一个千万级别的大表，你可以用ID作为分表字段，分10个表，根据最后一位的值定位到具体的表。同时排查所有的SQL语句，把一些可能全表关联的SQL语句，比如带groupby和多表关联，或者用Java业务写，或者优化。
4. 同时准备些数据库调优方面解决过的问题，比如索引对应的字段重复率太高，所以索引没用到，解决方法是建复合索引，或redis缓存信息没设超时时间，导致内存爆掉，解决方法是设下。这种问题网上一大堆，你适当准备下。

准备好以后，可以采用对应的引导方式。

1. 被问及任何数据库问题，比如sql，jdbc，回答好了再多说下，除了直接实现数据库方面的需求外，我还有数据库性能调优方面的经验。展开时，你是说到单机版调优还是分布式组件调优，看你能力。
2. 在介绍项目时，同时说下，在这个项目里，我做过数据库性能调优方面的事情。被继续问及后再展开。
3. 被问到索引相关问题后，回答好以后再多说句，除了索引，我还用过其他调优技术，然后展开。
4. 随便找个机会，比如谈到索引，或者干脆在介绍项目时，多说一句，我解决过线上的数据库性能过慢的问题，然后展开。
5. 当你回答好redis问题后，可以再“顺口”说句，在我们项目里，除了redis外，还用过dubbo组件，结果过因dubbo超时时间过长而导致的问题。然后提问者自然就会问到这块了，你同样可以准备些dubbo底层细节(乃至其他分布式组件方面)的问题，这方面也很多资料。

分布式组件方面，网上资料更是铺天盖地，这里就仅仅给出初级开发也能准备的点。

1. Redis，Dubbo，kafka等组件的超时问题，以及对应的OOM问题。
2. Netty堆外内存导致的OOM。
3. Netty半包粘包。Netty整合线程池，因线程池等待队列设置不当而导致的oom。
4. kafka重发和堆积消息过多的问题。

上述问题不难，我让我的初级开发学生也这样准备的，同时还能结合源码准备，源码虽然难，但可以死记硬背。

准备到上述点以后，引导到话术就更多了。比如被问及数据库性能调优问题时，引导到同为高并发解决方案的 redis 和 mycat，被问题内存相关问题时，说自己解决过 netty，kafka 等方面的内存问题等等，这类文字我都不想再多说了，只要有关联，就可以引导。做项目无非是应对高并发，解决数据库和内存等性能问题，这类引导话术准备起来简直可以说一找一大堆。

大家可以发现，上文给出的点包含了 java 核心，数据库调优和分布式组件调优等诸多要点，而且哪怕初级开发也能在短时间内准备。准备的时候时候，大家可以按照上文的提示，自己举一反三，另外多找些源码和其他值钱问题，网上这种问题太多。

准备好诸多值钱技术点后，第一需要把这些点融入项目，比如我做订单模块时，用 ArrayList 存订单对象，遍历时遇到快速失效问题。其他点也照此，一一找个可以融入项目的点。结合项目说绝对要比单纯说技术好，不仅可信，而且能证明在项目里用过，第二再多准备些引导话术，别直接抛出，如果没机会抛出千万别自说自话地抛出。

准备引导话术的套路是，回答到现有问题后，再多说一句，比方说，除此之外，我还解决过其他同类 xxx 问题，看过相关的 xxx 底层源码。或者说，在解决该性能调优问题时，我还额外用到了 xxx 组件。或者说，在使用这个 xxx 技术时，我还遇到 xxx(比如 oom 或超时等)问题。

给出了“为每个技术找个项目落脚点”的背法，能好些，至少能得到“不仅会技术，而且在项目里用过”的评语。

## 谈谈你的优缺点

缺点：

1. 每个离职原因都说一下；本地互联网发展较为落后，去一线城市希望更好的发展。
2. 缺乏项目的完整性，公司完整的跟踪整个业务，了解行业；乙方公司自身发展受限制，技术水平达到瓶颈，更先进的技术栈；

之前的项目没有接触过这个技术；

@xiaoxiao

- 1.个人情况方面（个人规划，稳定性判断，婚育情况，父母身体，有无小孩，房产购买，离职原因）
- 2.工作规划
（1）项目展开，个人参与度，所扮角色，项目在公司所占比重，对项目了解程度
（2）产品展开，产品上线情况，对标产品情况，优劣势分析，对产品发展看法
- 3.个人认知：未来发展是管理层还是深耕架构技术，自己最近遇到最大的困难，解决方法，感悟。自己认为最大的缺点是什么
