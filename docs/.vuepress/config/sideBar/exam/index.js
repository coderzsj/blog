const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = sidebarConfig([
  "",
  {
    title: "业务",
    prefix: "yewu/",
    icon: "yewu",
    children: [
      "医保",
    ],
  },
  {
    title: "语言",
    prefix: "yanyu/",
    icon: "yanyu",
    children: [""],
  },
  {
    title: "表达",
    prefix: "capability/",
    icon: "biaoda",
    children: ["expression"],
  },
]);
