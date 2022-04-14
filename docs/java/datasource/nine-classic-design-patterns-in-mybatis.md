# 二十三种设计模式

虽然我们都知道有二十三种设计模式，但是大多停留在概念层面，真实开发中很少遇到。mybatis源码中使用了大量的设计模式，阅读源码并观察设计模式在其中的应用，能够更深入的理解设计模式。

1. Builder模式，例如SqlSessionFactoryBuilder、XMLConfigBuilder、XMLMapperBuilder、XMLStatementBuilder、CacheBuilder；
2. 工厂模式，例如SqlSessionFactory、ObjectFactory、MapperProxyFactory；
3. 单例模式，例如ErrorContext和LogFactory；
4. 代理模式，Mybatis实现的核心，比如MapperProxy、ConnectionLogger，用的jdk的动态代理；还有executor.loader包使用了cglib或者javassist达到延迟加载的效果；
5. 组合模式，例如SqlNode和各个子类`ChooseSqlNode`等；
6. 模板方法模式，例如BaseExecutor和SimpleExecutor，还有`BaseTypeHandler`和所有的子类例如`IntegerTypeHandler`；
8. 装饰者模式，例如Cache包中的`cache.decorators`子包中等各个装饰者的实现；
9. 迭代器模式，例如迭代器模式`PropertyTokenizer`；

[面试必问：Mybatis中9种经典的设计模式！你知道几个？](https://blog.csdn.net/androidstarjack/article/details/121133873)
