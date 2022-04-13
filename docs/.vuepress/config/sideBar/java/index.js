const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = sidebarConfig([
  "",
  {
    title: "基础",
    prefix: "basic/",
    icon: "basic",
    children: [
        "",
        "java的异常",
        "hashmap"
    ],
  },
  {
    title: "缓存",
    icon: "redis",
    prefix: "redis/",
    children: ["redis", "interview"],
  },
  {
    title: "并发编程",
    prefix: "concurrent/",
    icon: "bingfazheng",
    children: [
      "synchronized-principle-analysis-and-optimization",
      "thread-life-cycle",
      "4-reference-types",
      "aqs-source-code-reading-notes",
      "threadpool-code-analysis",
      "threadlocal",
    ],
  },
  {
    title: "spring",
    prefix: "spring/",
    icon: "bxl-spring-boot",
    children: ["spring", "springboot启动流程", "spring事务"],
  },
  {
    title: "微服务",
    prefix: "cloud/",
    icon: "bxl-spring-boot",
    children: ["interview"],
  },
  {
    title: "消息队列",
    // icon: "creative",
    prefix: "message-queue/",
    icon: "mqxiaoxiduilieMQ",
    children: ["kafka", "rabbit"],
  },
  {
    title: "数据库",
    // icon: "creative",
    prefix: "datasource/",
    icon: "datasource",
    children: [
      "B树、B+树详解",
      "mysql调优",
      "MySQL流式查询",
      "mysql事务",
      "存储引擎",
      "explain执行计划",
    ],
  },
  {
    title: "分布式",
    // icon: "creative",
    prefix: "soa/",
    icon: "fenbushi",
    children: [
        "dubbo",
        "分布式事务",
        "分布式id",
        "Zookeeper",
    ],
  },
  {
    title: "算法",
    // icon: "creative",
    prefix: "algo/",
    icon: "suanfaku",
    children: ["二叉树的最大深度", "八种排序算法总结", "算法-八皇后"],
  },
  {
    title: "虚拟机",
    // icon: "creative",
    prefix: "jvm/",
    icon: "xuniji",
    children: [
      "jvm调优",
      "JVM内存结构",
      "JVM垃圾回收",
      "JVM类加载与字节码技术&内存模型",
    ],
  },
]);
