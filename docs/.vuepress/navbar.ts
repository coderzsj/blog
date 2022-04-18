import {defineNavbarConfig} from "vuepress-theme-hope";

export const navbarConfig = defineNavbarConfig([
    {text: "主页", icon: "home", link: "/"},
    {
        text: "java", icon: "guide", prefix: "/java",
        children: [
            {text: "基础", link: "/basic", activeMatch: "basic"},
            {text: "并发", link: "/concurrent"},
            {text: "数据库", link: "/datasource"},
            {text: "设计模式", link: "/design-patterns"},
            {text: "面经", link: "/interview"},
            {text: "JVM", link: "/jvm"},
            {text: "消息队列", link: "/message-queue"},
            {text: "缓存", link: "/redis"},
            {text: "分布式", link: "/soa"},
            {text: "spring", link: "/spring"},
        ]
    },
    {
        text: "其他", icon: "guide",
        children: [
            {text: "随笔", link: "/note"},
            {text: "前端", link: "/vue"},
            {text: "工具", link: "/tool"},
            {text: "算法", link: "/algo"},
        ]
    },
    {
        text: "工具", icon: "tool", prefix: "/tool",
        children: [
            {text: "idea", link: "/idea-plugin"},
            {text: "vscode", link: "/vscode-plugins-and-configuration"},
        ]
    },
    {text: "博客", icon: "blog", link: "https://blog.csdn.net/qq_43183527"},
    {text: "关于作者",icon: "guide",link: "/about"},
]);
