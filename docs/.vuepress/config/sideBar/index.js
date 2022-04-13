const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = {
  zh: sidebarConfig({
    "/java/": require("./java"),
    "/exam/": require("./exam"),
    "/vue/": require("./vue"),
    "/tool/": require("./tool"),
    "/about/": [""],
  }),
};
