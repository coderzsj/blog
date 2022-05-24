# Java零拷贝

DMA(直接存储器访问)

DMA(Direct Memory Access，直接内存存取) 是所有现代电脑的重要特色，它允许不同速度的硬件装置来沟通，而不需要依赖于 CPU 的大量中断负载。否则，CPU 需要从来源把每一片段的资料复制到暂存器，然后把它们再次写回到新的地方。在这个时间中，CPU 对于其他的工作来说就无法使用。


零复制(英语：Zero-copy；也译零拷贝)技术是指计算机执行操作时，CPU不需要先将数据从某处内存复制到另一个特定区域。这种技术通常用于通过网络传输文件时节省CPU周期和内存带宽。

1、`MappedByteBuffer`

java nio提供的`FileChannel`提供了map()方法，该方法可以在一个打开的文件和MappedByteBuffer之间建立一个虚拟内存映射，MappedByteBuffer继承于ByteBuffer，类似于一个基于内存的缓冲区，只不过该对象的数据元素存储在磁盘的一个文件中；调用get()方法会从磁盘中获取数据，此数据反映该文件当前的内容，调用put()方法会更新磁盘上的文件，并且对文件做的修改对其他阅读者也是可见的；下面看一个简单的读取实例，然后在对MappedByteBuffer进行分析：

分别提供了三个参数，MapMode，Position和size；分别表示：

- `MapMode`：映射的模式，可选项包括：READ_ONLY，READ_WRITE，PRIVATE；
- `Position`：从哪个位置开始映射，字节数的位置；
- `Size`：从position开始向后多少个字节；

重点看一下MapMode，请两个分别表示只读和可读可写，当然请求的映射模式受到Filechannel对象的访问权限限制，如果在一个没有读权限的文件上启用READ_ONLY，将抛出NonReadableChannelException；PRIVATE模式表示写时拷贝的映射，意味着通过put()方法所做的任何修改都会导致产生一个私有的数据拷贝并且该拷贝中的数据只有MappedByteBuffer实例可以看到；该过程不会对底层文件做任何修改，而且一旦缓冲区被施以垃圾收集动作(garbage collected)，那些修改都会丢失；大致浏览一下map()方法的源码：

大致意思就是通过native方法获取内存映射的地址，如果失败，手动gc再次映射；最后通过内存映射的地址实例化出MappedByteBuffer，MappedByteBuffer本身是一个抽象类，其实这里真正实例话出来的是DirectByteBuffer；

2、DirectByteBuffer

DirectByteBuffer继承于MappedByteBuffer，从名字就可以猜测出开辟了一段直接的内存，并不会占用jvm的内存空间；上一节中通过Filechannel映射出的MappedByteBuffer其实际也是DirectByteBuffer，当然除了这种方式，也可以手动开辟一段空间：

如上开辟了100字节的直接内存空间；

3、`Channel-to-Channel` 传输

经常需要从一个位置将文件传输到另外一个位置，FileChannel提供了transferTo()方法用来提高传输的效率，首先看一个简单的实例：

通过FileChannel的transferTo()方法将文件数据传输到System.out通道，接口定义如下：

几个参数也比较好理解，分别是开始传输的位置，传输的字节数，以及目标通道；transferTo()允许将一个通道交叉连接到另一个通道，而不需要一个中间缓冲区来传递数据；

注：这里不需要中间缓冲区有两层意思：第一层不需要用户空间缓冲区来拷贝内核缓冲区，另外一层两个通道都有自己的内核缓冲区，两个内核缓冲区也可以做到无需拷贝数据；

## `Netty`零拷贝

netty提供了零拷贝的buffer，在传输数据时，最终处理的数据会需要对单个传输的报文，进行组合和拆分，Nio原生的ByteBuffer无法做到，netty通过提供的Composite(组合)和Slice(拆分)两种buffer来实现零拷贝；看下面一张图会比较清晰：

TCP层HTTP报文被分成了两个`ChannelBuffer`，这两个Buffer对我们上层的逻辑(HTTP处理)是没有意义的。但是两个`ChannelBuffer`被组合起来，就成为了一个有意义的HTTP报文，这个报文对应的ChannelBuffer，才是能称之为”Message”的东西，这里用到了一个词”`Virtual Buffer`”。

可以看一下netty提供的CompositeChannelBuffer源码：

## Java NIO中对零拷贝的使用有哪些呢？

NIO `DirectByteBuffer`

Java NIO引入了用于通道的缓冲区的`ByteBuffer`。 ByteBuffer有三个主要的实现：

HeapByteBuffer

在调用`ByteBuffer.allocate()`时使用。 它被称为堆，因为它保存在JVM的堆空间中，因此您可以获得所有优势，如GC支持和缓存优化。 但是，它不是页面对齐的，这意味着如果您需要通过JNI与本地代码交谈，JVM将不得不复制到对齐的缓冲区空间。

DirectByteBuffer

在调用`ByteBuffer.allocateDirect()`时使用。 JVM将使用malloc()在堆空间之外分配内存空间。 因为它不是由JVM管理的，所以你的内存空间是页面对齐的，不受GC影响，这使得它成为处理本地代码的完美选择。 然而，你要C程序员一样，自己管理这个内存，必须自己分配和释放内存来防止内存泄漏。

MappedByteBuffer

在调用`FileChannel.map()`时使用。 与`DirectByteBuffer`类似，这也是JVM堆外部的情况。 它基本上作为`OS mmap()`系统调用的包装函数，以便代码直接操作映射的物理内存数据。

## 总结

零拷贝是操作系统底层的一种实现，我们在网络编程中，利用操作系统这一特性，可以大大提高数据传输的效率。这也是目前网络编程框架中都会采用的方式，理解好零拷贝，有助于我们进一步学习Netty等网络通信框架的底层原理。

 