const {config} = require("vuepress-theme-hope");
const CompressionPlugin = require("compression-webpack-plugin");

const sideBarConfig = require("./config/sideBar");

const nav = [
    {text: "主页", link: "/", icon: "home"},
    {text: "Guide", link: "/about/", icon: "guide"},
    {text: "博客", link: "https://blog.csdn.net/qq_43183527", icon: "blog"},
    {text: "gitee", link: "https://gitee.com/SHIJINGSPACE", icon: "gitee"},
];

module.exports = config({
    port: "1314",
    title: "SHIJINGSPACE",
    description: "个人博客",
    dest: "dist",
    base: "/blog/",
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    shouldPrefetch: (filename) => !filename.includes("page-"),
    configureWebpack: {
        //vuepress 编译压缩
        plugins: [
            new CompressionPlugin({
                filename: "[path].gz", //编译后的文件名
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/, //需要编译的文件
                threshold: 10240, //需要编译的文件大小
                minRatio: 0.8, //压缩比
                deleteOriginalAssets: false, //编译时是否删除源文件
            }),
        ],
    },
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
    themeConfig: {
        logo: "/logo.svg",
        author: "zhangsj",
        repo: "https://gitee.com/SHIJINGSPACE/myblog",
        repoDisplay: false,
        docsDir: "docs",
        docsBranch: "dev",
        nav,
        sidebar: sideBarConfig.zh,

        blog: {
            sidebarDisplay: "mobile",
            media: {
                csdn: "https://blog.csdn.net/qq_43183527",
                github: "https://github.com/coderzsj/",
                gitee: "https://gitee.com/SHIJINGSPACE",
                csdn: "https://blog.csdn.net/qq_43183527",
            },

        },

        copyright: {
            status: "global",
        },

        mdEnhance: {
            align: true,
            demo: true,
            flowchart: true,
            footnote: true,
            presentation: true,
            sub: true,
            sup: true,
            tex: true,
            vpre: true,
            tasklist: true,
            codegroup: true,
        },

        footer: {
            copyright:
                '<a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备2021007439号</a>',
            display: true,
        },

        hostname: "http://www.zhangsj.xyz",

        algolia: {
            apiKey: "",
            indexName: "",
        },

        algoliaType: "full",

        git: {
            contributor: false
        },

        iconPrefix: "icon-blog",

        displayAllHeaders: true, // 默认值: false

        editLinks: true,

        repoLabel: "Gitee",

        pwa: {
            favicon: "/logo.svg",
            themeColor: "#5c92d1",
            cacheHTML: false,
            maxSize: 3072,
            apple: {
                icon: "/assets/icon/logo.svg",
                statusBarColor: "black",
            },
            msTile: {
                image: "/assets/icon/logo.svg",
                color: "#ffffff",
            },
        },
    },
    git: {
        timezone: "Asia/Shanghai",
    },

    plugins: [
        [
            "@mr-hope/copy-code",
            {
                // 你的选项
            },
        ],
    ],
});
