import {defineThemeConfig} from "vuepress-theme-hope";
import {navbarConfig} from "./navbar";
import {sidebarConfig} from "./sidebar";

export default defineThemeConfig({
    logo: "/logo.svg",
    port: "1314",
    author: "shijing",
    repo: "https://github.com/coderzsj/blog",
    hostname: "http://www.zhangsj.xyz",
    docsDir: "docs",
    iconPrefix: "iconfont icon-blog",
    pure: true,
    navbar: navbarConfig,
    sidebar: sidebarConfig,
    blog: {
        intro: "/about/",
        sidebarDisplay: "mobile",
        medias: {
            github: "https://github.com/coderzsj/",
            gitee: "https://gitee.com/SHIJINGSPACE",
            zhihu: "https://blog.csdn.net/qq_43183527",
        },
    },
    footer:
        '<a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备2021007439号</a>',
    displayFooter: true,
    head: [
        ["meta", {name: "baidu-site-verification", content: "code-IZvTs9l2OK"}],
        [
            "script",
            {src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"},
        ],
        [
            "script",
            {
                src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
            },
        ],
        ["script", {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"}],
        [
            "script",
            {src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"},
        ],
        [
            "script",
            {},
            `var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();`,
        ],
    ],
    docsBranch: "dev",

    algolia: {
        apiKey: "",
        indexName: "",
    },
    search: {
        // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
        // 排除首页
        isSearchable: (page) => page.path !== "/",
        maxSuggestions: 10,
        hotKeys: ["s", "/"],
        // 用于在页面的搜索索引中添加额外字段
        getExtraFields: () => [],
        locales: {
            "/": {
                placeholder: "搜索",
            },
        },
    },
    plugins: {
        blog: {
            autoExcerpt: true,
        },
        mdEnhance: {
            enableAll: false,
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
        },
    }
});

