PHp工程师执行redis keys *导致数据库宕机！

keys *wxdb（此处省略）cf8*

这样的命令，导致Redis锁住，导致CPU飙升，引起所有支付链路卡住，等十几秒结束后，所有的请求流量全部挤压到了RDS数据库中，使数据库产生了雪崩效应发生了宕机事件。

时间复杂度为O(N)的命令，都要慎重，不要在生产上随便使用。例如：hgetall、lrange、smembers、zrange、sinter等命令，

Redis2.8版本以后有了一个新命令`scan`，可以用来分批次扫描`redis`记录，这样肯定会导致整个查询消耗的总时间变大，但不会影响redis服务卡顿，影响服务使用。

encryption
