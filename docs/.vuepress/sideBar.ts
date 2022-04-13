import {defineSidebarConfig} from "vuepress-theme-hope";

export const sidebarConfig = defineSidebarConfig({
    // 应该把更精确的路径放置在前边
    "/vue/": ["Typescript", "vue知识点", "常见的问题", "指令", "",],
    "/tool/": ["", "docker", "git", "tool"],
    "/about/": [""],
    // "/java/": [
    //     "",
    //     {
    //         text: "基础",
    //         prefix: "basic/",
    //         icon: "basic",
    //         collapsable: false,
    //         children: [
    //             "",
    //             "java的异常",
    //             "hashmap"
    //         ],
    //     },
    //     {
    //         text: "缓存",
    //         icon: "redis",
    //         prefix: "redis/",
    //         collapsable: false,
    //         children: ["redis", "interview"],
    //     },
    //     {
    //         text: "并发编程",
    //         prefix: "concurrent/",
    //         icon: "bingfazheng",
    //         collapsable: false,
    //         children: ["synchronized-principle-analysis-and-optimization", "thread-life-cycle", "4-reference-types", "aqs-source-code-reading-notes", "threadpool-code-analysis", "threadlocal",],
    //     },
    //     {
    //         text: "spring",
    //         prefix: "spring/",
    //         icon: "bxl-spring-boot",
    //         collapsable: false,
    //         children: ["spring", "springboot启动流程", "spring事务"],
    //     },
    //     {
    //         text: "微服务",
    //         prefix: "cloud/",
    //         icon: "bxl-spring-boot",
    //         collapsable: false,
    //         children: ["interview"],
    //     },
    //     {
    //         text: "消息队列",
    //         // icon: "creative",
    //         prefix: "message-queue/",
    //         icon: "mqxiaoxiduilieMQ",
    //         collapsable: false,
    //         children: ["kafka", "rabbit"],
    //     },
    //     {
    //         text: "数据库",
    //         // icon: "creative",
    //         prefix: "datasource/",
    //         icon: "datasource",
    //         collapsable: false,
    //         children: ["B树、B+树详解", "mysql调优", "MySQL流式查询", "mysql事务", "存储引擎", "explain执行计划",],
    //     },
    //     {
    //         text: "分布式",
    //         // icon: "creative",
    //         prefix: "soa/",
    //         icon: "fenbushi",
    //         collapsable: false,
    //         children: ["dubbo", "分布式事务", "分布式id", "Zookeeper",],
    //     },
    //     {
    //         text: "算法",
    //         // icon: "creative",
    //         prefix: "algo/",
    //         icon: "suanfaku",
    //         collapsable: false,
    //         children: ["二叉树的最大深度", "八种排序算法总结", "算法-八皇后"],
    //     },
    //     {
    //         text: "虚拟机",
    //         // icon: "creative",
    //         prefix: "jvm/",
    //         icon: "xuniji",
    //         collapsable: false,
    //         children: ["jvm调优", "JVM内存结构", "JVM垃圾回收", "JVM类加载与字节码技术&内存模型",],
    //     },
    // ],
    // "/exam/": [
    //     "",
    //     {
    //         text: "业务",
    //         prefix: "yewu/",
    //         icon: "yewu",
    //         collapsable: false,
    //         children: ["医保",],
    //     },
    //     {
    //         text: "语言",
    //         prefix: "yanyu/",
    //         icon: "yanyu",
    //         children: [""],
    //     },
    //     {
    //         text: "表达",
    //         prefix: "capability/",
    //         icon: "biaoda",
    //         children: ["expression"],
    //     },
    // ],
})
