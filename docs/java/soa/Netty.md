---
title: Netty
category: 网络/IO基础
---

## 从一个简单的例子开始

开篇讲到了，为了满足高并发下网络请求，引入了NIO的概念。Netty是针对NIO的实现，在NIO封装，网络调用，数据处理以及性能优化等方面都有不俗的表现。

学习架构最容易的方式就是从实例入手，从客户端访问服务端的代码来看看Netty是如何运作的。再一次介绍代码中调用的组件以及组件的工作原理。

假设有一个客户端去调用一个服务端，假设服务端叫做EchoServer，客户端叫做EchoClient，用Netty架构实现代码如下。

服务端代码

构建服务器端，假设服务器接受客户端传来的信息，然后在控制台打印。首先，生成EchoServer，在构造函数中传入需要监听的端口号。

接下来就是服务的启动方法：

Server的启动方法涉及到了一些组件的调用，例如`EventLoopGroup`，`Channel`。这些会在后面详细讲解。

这里有个大致的印象就好：

创建`EventLoopGroup`。

创建`ServerBootstrap`。

指定所使用的NIO传输`Channel`。

使用指定的端口设置套接字地址。

添加一个ServerHandler到Channel的ChannelPipeline。

异步地绑定服务器；调用`sync()`方法阻塞等待直到绑定完成。

获取Channel的CloseFuture，并且阻塞当前线程直到它完成。

关闭EventLoopGroup，释放所有的资源。

`NettyServer`启动以后会监听某个端口的请求，当接受到了请求就需要处理了。在Netty中客户端请求服务端，被称为“入站”操作。

可以通过`ChannelInboundHandlerAdapter`实现，具体内容如下：

从上面的代码可以看出，服务端处理的代码包含了三个方法。这三个方法都是根据事件触发的。

他们分别是：

当接收到消息时的操作，`channelRead`。消息读取完成时的方法，`channelReadComplete`。出现异常时的方法，`exceptionCaught`。

客户端和服务端的代码基本相似，在初始化时需要输入服务端的Port和IP。
