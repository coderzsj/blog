const { defineHopeConfig } = require("vuepress-theme-hope");
import themeConfig from "./themeConfig";

module.exports = defineHopeConfig({
    port: "1314",
    title: "ShijingSpace",
    description: "Java学习&&面试指南",
    //指定 vuepress build 的输出目录
    dest: "./dist",
    // 是否开启默认预加载 js
    base: "/blog/",
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    shouldPrefetch: (file, type) => false,
    head: [
      //   // 添加百度统计
      //   [
      //       "script", {},
      //       `var _hmt = _hmt || [];
      // (function() {
      //   var hm = document.createElement("script");
      //   hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743";
      //   var s = document.getElementsByTagName("script")[0];
      //   s.parentNode.insertBefore(hm, s);
      // })();`
      //   ],
        [
            "link",
            {
                rel: "stylesheet",
                href: '//at.alicdn.com/t/font_3166858_nfzh5q0te6g.css',
            },
        ],
    ],
   themeConfig,
});
