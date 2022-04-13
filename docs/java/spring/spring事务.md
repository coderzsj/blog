---
title: transaction
icon: guanli
category: spring
time: 2021-10-20
tag:
  - spring
  - transaction
---

## spring 事务

Spring 事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，spring 是无法提供事务功能的。对于纯 JDBC 操作数据库，想要用到事务，可以按照以下步骤进行：

### 事务传播行为

spring特有的事务传播行为，spring支持7种事务传播行为，确定客户端和被调用端的事务边界 （说得通俗一点就是多个具有事务控制的service的相互调用时所形成的复杂的事务边界控制）下图所示为7钟事务传播机制

1. 获取连接 Connection con = DriverManager.getConnection()
2. 开启事务 con.setAutoCommit(true/false);
3. 执行 CRUD
4. 提交事务/回滚事务 con.commit() / con.rollback();
5. 关闭连接 conn.close();

使用 Spring 的事务管理功能后，我们可以不再写步骤 2 和 4 的代码，而是由 Spirng 自动完成。那么 Spring 是如何在我们书写的 CRUD 之前和之后开启事务和关闭事务的呢？解决这个问题，也就可以从整体上理解 Spring 的事务管理实现原理了。

注解方式开启事务的步骤：

1、配置文件开启注解驱动，在相关的类和方法上通过注解@Transactional 标识。
2、spring 在启动的时候会去解析生成相关的 bean，这时候会查看拥有相关注解的类和方法，并且为这些类和方法生成代理，并根据@Transaction 的相关参数进行相关配置注入，这样就在代理中为我们把相关的事务处理掉了(开启正常提交事务，异常回滚事务)。
3、真正的数据库层的事务提交和回滚是通过 binlog 或者 redo log 实现的。

## Spring 的事务机制

而 Spring 的事务机制是用统一的机制来处理不同数据访问技术的事务处理。

Spring 的事务机制提供了一个 `PlatformTransactionManager` 接口，不同的数据访问技术的事务使用不同的接口实现，

### AOP 代理的两种实现

Jdk 是代理接口，私有方法必然不会存在在接口里，所以就不会被拦截到；

Cglib 是子类，private 的方法照样不会出现在子类里，也不能被拦截。

## Spring 事务的传播属性

所谓 spring 事务的传播属性，就是定义在存在多个事务同时存在的时候，spring 应该如何处理这些事务的行为。这些属性在 TransactionDefinition 中定义，具体常量的解释见下表：

|传播行为|含义|
| :-----: | -------------------------------------------------------------------------------------------------- |
|PROPAGATION_REQUIRED（XML文件中为REQUIRED) |表示当前方法必须在一个具有事务的上下文中运行，如有客户端有事务在进行，那么被调用端将在该事务中运行，否则的话重新开启一个事务。（如果被调用端发生异常，那么调用端和被调用端事务都将回滚） |
|PROPAGATION_SUPPORTS(XML文件中为SUPPORTS） |表示当前方法不必需要具有一个事务上下文，但是如果有一个事务的话，它也可以在这个事务中运行 |
|PROPAGATION_MANDATORY(XML文件中为MANDATORY） |表示当前方法必须在一个事务中运行，如果没有事务，将抛出异常 |
|PROPAGATION_NESTED(XML文件中为NESTED) |表示如果当前方法正有一个事务在运行中，则该方法应该运行在一个嵌套事务中，被嵌套的事务可以独立于被封装的事务中进行提交或者回滚。如果封装事务存在，并且外层事务抛出异常回滚，那么内层事务必须回滚，反之，内层事务并不影响外层事务。如果封装事务不存在，则同PROPAGATION_REQUIRED的一样 |
|PROPAGATION_NEVER（XML文件中为NEVER) |表示当方法务不应该在一个事务中运行，如果存在一个事务，则抛出异常 |
|PROPAGATION_REQUIRES_NEW(XML文件中为REQUIRES_NEW） |表示当前方法必须运行在它自己的事务中。一个新的事务将启动，而且如果有一个现有的事务在运行的话，则这个方法将在运行期被挂起，直到新的事务提交或者回滚才恢复执行。 |
|PROPAGATION_NOT_SUPPORTED（XML文件中为NOT_SUPPORTED） |表示该方法不应该在一个事务中运行。如果有一个事务正在运行，他将在运行期被挂起，直到这个事务提交或者回滚才恢复执行 |

所有的数据访问技术都有事务处理机制，这些技术提供了 API 用来开启事务、提交事务来完成数据操作，或者在发生错误的时候回滚数据。

### spring 声明式事务

[Java检查型异常和非检查型异常](../basic/java的异常.md)

Spring 声明式事务管理默认对非检查型异常和运行时异常进行事务回滚，而对检查型异常则不进行回滚操作

### java 中抛异常后如何使事务回滚


代码中 try……catch 抛出的 Exception 异常，属于检查型异常,Spring 的框架默认是不会进行回滚的。所以必须在 service 捕获异常，然后再次手动 throw 一个非检查型异常，这样事务方才起效.

首先方法名前面有：`@Transactional`，下面介绍三种使事务回滚的方式

1. 手动 throw 异常，让 aop 捕获异常再去回滚，并且在 service 上层(webservice 客户端，view 层 action)要继续捕获这个异常并处理

```java
Try{undefined
    …………
} catch (Exception e) {undefined
    …………
    Throw new RuntimeException(e);

}
```

2. 通过注解参数改变默认的回滚方式 。

在`@Transaction`注解中定义了 `noRollbackFor` 和 `RollbackFor` 来指定某种异常是否回滚。

使用例子：

@Transaction(noRollbackFor=RuntimeException.class)

@Transaction(RollbackFor=Exception.class)

所以上述的问题可以直接将@Transaction

添加回滚参数@Transaction(RollbackFor=Exception.class) ,这样就改变了默认的事务处理方式。

3. 在 service 层方法的 catch 语句中增加：TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();语句，手动回滚，这样上层就无需去处理异常(现在项目的做法)
