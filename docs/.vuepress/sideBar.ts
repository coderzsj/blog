import {defineSidebarConfig} from "vuepress-theme-hope";

export const sidebarConfig = defineSidebarConfig({
    // 应该把更精确的路径放置在前边
    "/vue/": ["","Typescript", "vue-knowledge-points", "frequently-asked-questions.md", "instruction.md", ],
    "/tool/": ["", "docker", "git", "tool"],
    "/about/": [""],
    "/java/": [
        "",
        {
            text: "基础",
            prefix: "basic/",
            icon: "basic",
            collapsable: false,
            children: [
                "",
                "java-exception",
                "hashmap"
            ],
        },
        {
            text: "缓存",
            icon: "redis",
            prefix: "redis/",
            collapsable: false,
            children: ["redis", "interview"],
        },
        {
            text: "并发编程",
            prefix: "concurrent/",
            icon: "bingfazheng",
            collapsable: false,
            children: ["synchronized-principle-analysis-and-optimization", "thread-life-cycle", "4-reference-types", "aqs-source-code-reading-notes", "threadpool-code-analysis", "threadlocal",],
        },
        {
            text: "spring",
            prefix: "spring/",
            icon: "bxl-spring-boot",
            collapsable: false,
            children: ["spring", "springboot-startup-process", "spring-transaction","@RequestBody&ResponseBody"],
        },
        {
            text: "消息队列",
            // icon: "creative",
            prefix: "message-queue/",
            icon: "mqxiaoxiduilieMQ",
            collapsable: false,
            children: ["kafka", "rabbit"],
        },
        {
            text: "数据库",
            // icon: "creative",
            prefix: "datasource/",
            icon: "datasource",
            collapsable: false,
            children: ["detailed-explanation-of-b-tree-and-b+-tree", "mysql-tuning", "mysql-transaction", "storage-engine", "explain-execution-plan",],
        },
        {
            text: "分布式",
            // icon: "creative",
            prefix: "soa/",
            icon: "fenbushi",
            collapsable: false,
            children: ["dubbo", "distributed-transaction", "distributed-id", "Zookeeper","spring-cloud","take-you-step-by-step-to-understand-the-jwt"],
        },
        {
            text: "虚拟机",
            prefix: "jvm/",
            icon: "xuniji",
            collapsable: false,
            children: ["jvm-tuning", "jvm-memory-structure", "jvm-garbage-collection", "jvm-class-loading&bytecode-technology",],
        },
    ],
    "/exam/": [
        "",
        {
            text: "业务",
            prefix: "yewu/",
            icon: "yewu",
            collapsable: false,
            children: ["medical-insurance",],
        },
        {
            text: "语言",
            prefix: "yanyu/",
            icon: "yanyu",
            children: [""],
        },
        {
            text: "表达",
            prefix: "capability/",
            icon: "biaoda",
            children: ["expression"],
        },
    ],
    "/note/": ["60-famous-principles-and-theorems","a_little_experience_of_exporting_tens_of_millions_of_data_to_excel","a_null_pointer_exception-therearesomanytricks","be-a-critical-thinking-programmer","change-your-nickname-and-talk-nonsense","how-can-programmers-not-take-a-fork","how-to-write-daily-report","humorous-jokes","in-your-spare-time-please-don-not-take-personal-work-but-improve-yourself","killing-a-programmer-doesnt-require-a-gun-just-change-the-requirements-three-times","life-notes","rapid-growth-as-a-technologist","still-using-simple-date-format"],
    "/algo/":["algorithm-eight-queens","dynamic-programming-idea","linked-list-determines-that-there-is-a-cycle-recursive-inversion","maximum-depth-of-a-binary-tree"],
})
