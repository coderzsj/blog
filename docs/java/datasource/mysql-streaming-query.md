---
title: liushiquery
icon: sql
category: mysql
date: 2021-08-03
---

::: info 前言

程序访问MySQL数据库时，当查询出来的数据量特别大时，数据库驱动把加载到的数据全部加载到内存里，就有可能会导致内存溢出（OOM）。

其实在MySQL数据库中提供了流式查询，允许把符合条件的数据分批一部分一部分地加载到内存中，可以有效避免OOM；

本文主要介绍如何使用流式查询并对比普通查询进行性能测试。

:::

查询成功后不是返回一个集合而是返回一个迭代器，应用每次从迭代器去一条查询结果。流式查询的好处是能够降低内存使用。

如果没有流式查询，我们想要从数据库取1000W 记录而有没有足够的内存时，就不得不分页查询，而分页查询效率取决于表设计，如果设计的不好，就无法执行高效的分页查询。因此流式查询是一个数据库访问框架必须具备的功能。

流式查询的过程中，数据库连接是保持打开状态的，因此要注意的是：执行一个流式查询后，数据库访问框架就不负责数据库连接了，需要应用去完数据后自己关闭。

## 基于mybatis实现流式查询

MyBatis提供了一个叫org.apache
.ibatis.cursor.Cursor
的接口类用于流式查询，这个接口继承了java.io
.Closeable和java.lang
.Iterable接口，由此可知：

1. Cursor是可关闭的
2. Cursor是可遍历的

除此之外，Cursor还提供了三个方法：

1. isOpen
(): 用于在取数据之前判断Cursor
对象是否是打开状态只有当打开时Cursor才能取数据；
2. isConsumed():用于判断查询结果是否全部取完
3. getCurrentIndex (): 返回已经获取了多少条数据

talk is cheap, show me the code

```java
package com.aeert.streamquery.service.impl;
 
import com.aeert.streamquery.dao.ArticleDao;
import com.aeert.streamquery.entity.ArticleEntity;
import com.aeert.streamquery.service.ArticleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.ibatis.cursor.Cursor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 
import java.util.Iterator;
 
/**
 * @Author l'amour solitaire
 * @Description articleService
 * @Date 2020/12/22 下午7:57
 **/
@Service("articleService")
public class ArticleServiceImpl extends ServiceImpl<ArticleDao, ArticleEntity> implements ArticleService {
 
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void queryByCursor() {
        try (Cursor<ArticleEntity> articleEntityCursor = baseMapper.queryByCursor();) {
            Iterator<ArticleEntity> articleEntityIterator = articleEntityCursor.iterator();
            while (articleEntityIterator.hasNext()) {
                System.out.println(articleEntityIterator.next().getId());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

>⚠️注意这里的@Transactional ，没有这个的话会抛异常 java.lang.IllegalStateException: A Cursor is already closed.
>这是因为我们前面说了在取数据的过程中需要保持数据库连接，而 Mapper 方法通常在执行完后连接就关闭了，因此 Cusor 也一并关闭了。

所以，解决这个问题的思路不复杂，保持数据库连接打开即可。我们至少有三种方案可选。这里我们用的是方案三；

### 方案一：SqlSessionFactory

我们可以用 SqlSessionFactory 来手工打开数据库连接，将 Controller 方法修改如下：

```java
@GetMapping("foo/scan/1/{limit}")
public void scanFoo1(@PathVariable("limit") int limit) throws Exception {
    try (
        SqlSession sqlSession = sqlSessionFactory.openSession();  // 1
        Cursor<Foo> cursor = 
              sqlSession.getMapper(FooMapper.class).scan(limit)   // 2
    ) {
        cursor.forEach(foo -> { });
    }
}
```

上面的代码中，
1. 处我们开启了一个 SqlSession （实际上也代表了一个数据库连接），并保证它最后能关闭；
2. 处我们使用 SqlSession 来获得 Mapper 对象。这样才能保证得到的 Cursor 对象是打开状态的。

### 方案二：TransactionTemplate

在 Spring 中，我们可以用 TransactionTemplate 来执行一个数据库事务，这个过程中数据库连接同样是打开的。代码如下：

```java
@GetMapping("foo/scan/2/{limit}")
public void scanFoo2(@PathVariable("limit") int limit) throws Exception {
    TransactionTemplate transactionTemplate = 
            new TransactionTemplate(transactionManager);  // 1
 
    transactionTemplate.execute(status -> {               // 2
        try (Cursor<Foo> cursor = fooMapper.scan(limit)) {
            cursor.forEach(foo -> { });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    });
}
```

上面的代码中，

1. 处我们创建了一个 TransactionTemplate 对象（此处 transactionManager 是怎么来的不用多解释，本文假设读者对 Spring 数据库事务的使用比较熟悉了），
2. 处执行数据库事务，而数据库事务的内容则是调用 Mapper 对象的流式查询。注意这里的 Mapper 对象无需通过 SqlSession 创建。

### 方案三：@Transactional 注解

这个本质上和方案二一样，代码如下：

```java
@GetMapping("foo/scan/3/{limit}")
@Transactional
public void scanFoo3(@PathVariable("limit") int limit) throws Exception {
    try (Cursor<Foo> cursor = fooMapper.scan(limit)) {
        cursor.forEach(foo -> { });
    }
}
```

它仅仅是在原来方法上面加了个 `@Transactional` 注解。这个方案看上去最简洁，但请注意 Spring 框架当中注解使用的坑：只在外部调用时生效。在当前类中调用这个方法，依旧会报错。 

## JDBC实现流式查询

使用JDBC的`PreparedStatement/Statement`的`setFetchSize`方法设置为 `Integer.MIN_VALUE`或使用方法`Statement.enableStreamingResults()`可以实现流式查询，在执行`ResultSet.next()`方法时，会通过数据库连接一条一条的返回，这样也不会大量占用客户端的内存。

```java
public int execute(String sql, boolean isStreamQuery) throws SQLException {
    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;
    int count = 0;
    try {
        //获取数据库连接
        conn = getConnection();
        if (isStreamQuery) {
            //设置流式查询参数
            stmt = conn.prepareStatement(sql, ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
            stmt.setFetchSize(Integer.MIN_VALUE);
        } else {
            //普通查询
            stmt = conn.prepareStatement(sql);
        }

        //执行查询获取结果
        rs = stmt.executeQuery();
        //遍历结果
        while(rs.next()){
            System.out.println(rs.getString(1));
            count++;
        }
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        close(stmt, rs, conn);
    }
    return count;
}

```

MySQL流式查询对于内存占用方面的优化还是比较明显的，但是对于查询速度的影响较小，主要用于解决大数据量查询时的内存占用多的场景。

[]()

```sql
SELECT * FROM bj_setl_d WHERE ownpay_setl_flag = '3' AND refd_setl_flag = '0' AND medfee_sumamt > '1500' AND med_type IN ( 11,12,13,14,19,51,53,91,1105,1104,9901,9903,9905,9906,9914,530102 )
```
