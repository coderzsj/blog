---
title: MySQL脏页
tag:
  - MySQL
  - 脏页
---

## 脏页

当内存数据页跟磁盘数据页内容不一致的时候，我们称这个内存页为“脏页”。内存数据写入到磁盘后，内存和磁盘上的数据页的内容就一致了，称为“干净页”。

不论是脏页还是干净页，都在内存中。

平时很快地更新操作，都是在写内存和日志。

一条 SQL 语句，正常执行的时候特别快，但是有时也不知道怎么回事，它就会变得特别慢。

那这时候可能就是在刷脏页到磁盘中了~ flush

## 2、什么时候会引起flush

（1） InnoDB的redo log写满了。这时候系统会停止所有的更新操作，然后让日志可以继续写。

把这部分数据日志都flush到磁盘上面。

(2) 也可能是系统内存不足，需要新的内存页，那么就淘汰一些内存页，空出来的给别的数据页使用。

先把脏页写到磁盘。

PS:使用内存是为了效率更好，

因为如果内存存在数据页，那么数据就一定正确，直接返回；

如果内存没有数据，才需要去磁盘中取，读入到内存，返回；

## qa

Q：buffer pool？

缓存区域，缓存数据和索引在内存中。

`innodb`使用了一些链表。

- `lru`链表：用来存储内存中的缓存数据。
- `free`链表：用来存放所有的空闲页，每次需要数据页存储数据时，就首先检测free中有没有空闲的页来分配。
- `flush`链表：在内存中被修改但还没有刷新到磁盘的数据页列表，就是所谓的脏页列表，内存中的数据跟对应的磁盘上的数据不一致，属于该列表的页面同样存在于lru列表中，但反之未必。

Q:LSN？

Log sequence number: 当前系统最大的`LSN`号

每个数据页有LSN，重做日志有LSN，`checkpoint`有LSN。

占用8字节，LSN主要用于发生crash时对数据进行`recovery`，LSN是一个一直递增的整型数字，表示事务写入到日志的字节总量。
LSN不仅只存在于重做日志中，在每个数据页头部也会有对应的LSN号，该LSN记录当前页最后一次修改的LSN号，用于在recovery时对比重做日志LSN号决定是否对该页进行恢复数据。前面说的checkpoint也是有LSN号记录的，LSN号串联起一个事务开始到恢复的过程。

程序人生
program-life

Q:刷写的答题过程？

`buffer pool`里维护着一个脏页列表，假设现在`redo log` 的 `checkpoint` 记录的 `LSN` 为 10，现在内存中的一干净页有修改，修改后该页的LSN为12，大于 checkpoint 的LSN，则在写redo log的同时该页也会被标记为脏页记录到脏页列表中，现在内存不足，该页需要被淘汰掉，该页会被刷到磁盘，磁盘中该页的LSN为12，该页也从脏页列表中移除，现在redo log 需要往前推进checkpoint，到LSN为12的这条log时，发现内存中的脏页列表里没有该页，且磁盘上该页的LSN也已经为12，则该页已刷脏，已为干净页，跳过。

Q:如果系统性能差，为什么会慢？

因为脏页刷得很慢，堆积了之后，就会等待脏页刷完之后在进行更新和读取。

- [[MySQL]脏页](https://blog.csdn.net/pmdream/article/details/103668933?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165076788816782391885620%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165076788816782391885620&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-103668933.142^v9^control,157^v4^control&utm_term=MySQL+%E8%84%8F%E9%A1%B5&spm=1018.2226.3001.4187)
- [Mysql Buffer Pool](https://blog.csdn.net/qq_27347991/article/details/81052728)
- [MySQL-LSN](https://www.cnblogs.com/drizzle-xu/p/9713378.html)
