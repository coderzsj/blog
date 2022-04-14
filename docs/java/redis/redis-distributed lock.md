---
title: redis分布式锁
category: redis
icon: redis
tag:
  - redis
  - lock
  - fubushi
---

### 分布式锁

Redis 中的乐观锁机制，可以帮助我们实现分布式锁的效果，用于解决分布式系统下的多线程安全问题

:::: code-group

::: code-group-item 基于Redis的分布式锁

```java
public void UserRegWithLock(UserRegDto dto) throws Exception {
    //精心设计并构造SETNX中的key, 一定要跟实际的业务或共享资源挂钩
    final String key = dto.getUserName() + "-lock";
    //设计key对应的value应该具有随机性
    final String value = System.nanoTime() + "" + UUID.randomUUID();
    //调用SETNX操作获取锁, 如果返回true, 代表获取锁成功
    boolean res = redisUtils.setIfAbsent(key, value);
    if (res) {
        //为了防止出现死锁, 加上EXPIRE操作, 即key的过期时间, 在这里设置为20s, 实际开发是情况而定
        redisUtils.expire(key, 20L, TimeUnit.SECONDS);
        try {
            UserReg userReg = userRegMapper.selectByUserName(dto.getUserName());
            if (userReg == null) {
                log.info("---加分布式锁---, 当前用户名为:{}", dto.getUserName());
                UserReg entity = new UserReg();
                BeanUtils.copyProperties(dto, entity);
                entity.setCreateTime(new Date());
                userRegMapper.insertSelective(entity);
            }
        } catch (Exception e) {
            throw e;
        } finally {
            //不管发生任何状况, 都需要在redis加锁成功并访问操作完成共享资源后释放资源
            if (value.equals(redisUtils.get(key).toString())) {
                redisUtils.del(key);
            }
        }
    }
}
```

:::

::: code-group-item 不带锁

```java
/**
 * 处理用户提交注册
 *
 * @param dto UserRegDto(用户名, 密码)
 * @throws Exception 账户已注册
 */
public void userRegNoLock(UserRegDto dto) throws Exception {
    UserReg userReg = userRegMapper.selectByUserName(dto.getUserName());
    if (userReg == null) {
        log.info("---不加分布式锁---, 当前用户名为:{}", dto.getUserName());
        UserReg entity = new UserReg();
        BeanUtils.copyProperties(dto, entity);
        entity.setCreateTime(new Date());
        userRegMapper.insertSelective(entity);
    } else {
        throw new Exception("用户信息已经存在");
    }
}
```

:::

::::

### Redisson

#### 典型应用场景之高性能点赞

一般情况下, 一个完整的点赞业务模块包含两大核心操作: 点赞和取消点赞.

用户点赞文章

1. 校验文章，用户等基本信息
2. 校验通过，查询当前用户-当前文章的点赞记录
3. 插入当前用户-当前文档的点赞记录 返回相应结果被

先查询当前用户是否已经点赞过了, 如果已经点赞过了, 就直接返回点赞成功; 如果没有点赞过, 当用户点赞时系统后端会记录一条该文章的点赞记录至数据库中, 并设置该记录当前的状态为1, 表示当前用户已点赞该文章.

:::: code-group

::: code-group-item 分布式锁

```java
 public void addPraiseLock(PraiseDto dto) throws Exception {
    //定义用于获取分布式锁的Redis的key
    final String lockName = keyAddBlogLock + dto.getBlogId() + "-" + dto.getUserId();
    //获取一次性锁对象
    RLock lock = redissonClient.getLock(lockName);
    //上锁并在10秒钟自动释放,可用于避免Redis节点宕机时出现死锁
    lock.lock(10L, TimeUnit.SECONDS);

    try {
        Praise praise = praiseMapper.selectByBlogUserId(dto.getBlogId(), dto.getUserId());
        if (praise == null) {
            //如果没有点赞记录, 则创建点赞实体信息
            Praise p = new Praise();
            BeanUtils.copyProperties(dto, p);
            Date date = new Date();
            p.setPraiseTime(date);
            p.setStatus(1);
            p.setCreateTime(date);
            p.setUpdateTime(date);
            //插入点赞记录
            int total = praiseMapper.insertSelective(p);
            if(total > 0) {
                //如果插入成功, 则输出打印相应的信息, 并将用户点赞记录添加至缓存中
                log.info("--点赞博客,-{}-加分布式锁-插入点赞记录成功---",dto.getBlogId());
                redisPraise.cachePraiseBlog(dto.getBlogId(), dto.getUserId(), 1);
                this.cachePraiseTotal();
            }
        }
    } catch (Exception e) {
        log.error("--点赞博客,-{}-分布式锁-发生未知异常--",dto.getBlogId());
        throw e;
    } finally {
        if (lock.isLocked()) {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
}
```

:::

::: code-group-item 无分布式锁

```java
 @Transactional(rollbackFor = Exception.class)
public void addPraise(PraiseDto dto) throws Exception {
    Praise praise = praiseMapper.selectByBlogUserId(dto.getBlogId(), dto.getUserId());
    if (praise == null) {
        //如果没有点赞记录, 则创建点赞实体信息
        Praise p = new Praise();
        BeanUtils.copyProperties(dto, p);
        Date date = new Date();
        p.setPraiseTime(date);
        p.setStatus(1);
        p.setCreateTime(date);
        p.setUpdateTime(date);
        //插入点赞记录
        int total = praiseMapper.insertSelective(p);
        if(total > 0) {
            //如果插入成功, 则输出打印相应的信息, 并将用户点赞记录添加至缓存中
            log.info("--点赞博客,-{}-无锁-插入点赞记录成功---",dto.getBlogId());
            redisPraise.cachePraiseBlog(dto.getBlogId(), dto.getUserId(), 1);
            this.cachePraiseTotal();
        }
    }
}

```

:::

::::
