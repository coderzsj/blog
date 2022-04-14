export const themeData = {
  "blog": {
    "intro": "/about/",
    "sidebarDisplay": "mobile",
    "medias": {
      "github": "https://github.com/coderzsj/",
      "gitee": "https://gitee.com/SHIJINGSPACE",
      "zhihu": "https://blog.csdn.net/qq_43183527"
    }
  },
  "encrypt": {
    "global": false
  },
  "pure": true,
  "iconPrefix": "iconfont icon-blog",
  "darkmode": "auto-switch",
  "themeColor": {
    "red": "#e74c3c",
    "blue": "#3498db",
    "green": "#3eaf7c",
    "orange": "#f39c12",
    "purple": "#8e44ad"
  },
  "fullscreen": true,
  "locales": {
    "/": {
      "blog": {},
      "repoDisplay": true,
      "navbarIcon": true,
      "navbarAutoHide": "mobile",
      "hideSiteNameonMobile": true,
      "sidebar": {
        "/vue/": [
          "Typescript",
          "vue-knowledge-points",
          "frequently-asked-questions.md",
          "instruction.md",
          ""
        ],
        "/tool/": [
          "",
          "docker",
          "git",
          "tool"
        ],
        "/about/": [
          ""
        ],
        "/java/": [
          "",
          {
            "text": "基础",
            "prefix": "basic/",
            "icon": "basic",
            "collapsable": false,
            "children": [
              "",
              "java的异常",
              "hashmap"
            ]
          },
          {
            "text": "缓存",
            "icon": "redis",
            "prefix": "redis/",
            "collapsable": false,
            "children": [
              "redis",
              "interview"
            ]
          },
          {
            "text": "并发编程",
            "prefix": "concurrent/",
            "icon": "bingfazheng",
            "collapsable": false,
            "children": [
              "synchronized-principle-analysis-and-optimization",
              "thread-life-cycle",
              "4-reference-types",
              "aqs-source-code-reading-notes",
              "threadpool-code-analysis",
              "threadlocal"
            ]
          },
          {
            "text": "spring",
            "prefix": "spring/",
            "icon": "bxl-spring-boot",
            "collapsable": false,
            "children": [
              "spring",
              "springboot-startup-process",
              "spring-transaction"
            ]
          },
          {
            "text": "微服务",
            "prefix": "cloud/",
            "icon": "bxl-spring-boot",
            "collapsable": false,
            "children": [
              "interview"
            ]
          },
          {
            "text": "消息队列",
            "prefix": "message-queue/",
            "icon": "mqxiaoxiduilieMQ",
            "collapsable": false,
            "children": [
              "kafka",
              "rabbit"
            ]
          },
          {
            "text": "数据库",
            "prefix": "datasource/",
            "icon": "datasource",
            "collapsable": false,
            "children": [
              "detailed-explanation-of-b-tree-and-b+-tree",
              "mysql-tuning",
              "mysql-tuning",
              "mysql-transaction",
              "storage-engine",
              "explain-execution-plan"
            ]
          },
          {
            "text": "分布式",
            "prefix": "soa/",
            "icon": "fenbushi",
            "collapsable": false,
            "children": [
              "dubbo",
              "distributed-transaction",
              "distributed-id",
              "Zookeeper"
            ]
          },
          {
            "text": "虚拟机",
            "prefix": "jvm/",
            "icon": "xuniji",
            "collapsable": false,
            "children": [
              "jvm-tuning",
              "jvm-memory-structure",
              "jvm-garbage-collection",
              "jvm-class-loading-and-bytecode-technology"
            ]
          }
        ],
        "/exam/": [
          "",
          {
            "text": "业务",
            "prefix": "yewu/",
            "icon": "yewu",
            "collapsable": false,
            "children": [
              "medical-insurance"
            ]
          },
          {
            "text": "语言",
            "prefix": "yanyu/",
            "icon": "yanyu",
            "children": [
              ""
            ]
          },
          {
            "text": "表达",
            "prefix": "capability/",
            "icon": "biaoda",
            "children": [
              "expression"
            ]
          }
        ],
        "/note/": [
          "60-famous-principles-and-theorems",
          "a_little_experience_of_exporting_tens_of_millions_of_data_to_excel",
          "a_null_pointer_exception-therearesomanytricks",
          "be-a-critical-thinking-programmer",
          "change-your-nickname-and-talk-nonsense",
          "how-can-programmers-not-take-a-fork",
          "how-to-write-daily-report",
          "humorous-jokes",
          "in-your-spare-time-please-don't-take-personal-work-but-improve-yourself",
          "killing-a-programmer-doesnt-require-a-gun-just-change-the-requirements-three-times",
          "life-notes",
          "rapid-growth-as-a-technologist",
          "still-using-simple-date-format"
        ],
        "/algo/": [
          "algorithm-eight-queens",
          "dynamic-programming-idea",
          "linked-list-determines-that-there-is-a-cycle-recursive-inversion",
          "maximum-depth-of-a-binary-tree"
        ]
      },
      "sidebarIcon": true,
      "headerDepth": 2,
      "logo": "/logo.svg",
      "port": "1314",
      "author": "shijing",
      "repo": "https://github.com/coderzsj/blog",
      "docsDir": "docs",
      "navbar": [
        {
          "text": "主页",
          "icon": "home",
          "link": "/"
        }
      ],
      "footer": "<a href=\"https://beian.miit.gov.cn/\" target=\"_blank\">晋ICP备2021007439号</a>",
      "displayFooter": true,
      "head": [
        [
          "meta",
          {
            "name": "baidu-site-verification",
            "content": "code-IZvTs9l2OK"
          }
        ],
        [
          "script",
          {
            "src": "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
          }
        ],
        [
          "script",
          {
            "src": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
          }
        ],
        [
          "script",
          {
            "src": "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"
          }
        ],
        [
          "script",
          {
            "src": "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"
          }
        ],
        [
          "script",
          {},
          "var _hmt = _hmt || []; (function() { var hm = document.createElement(\"script\"); hm.src = \"https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743\"; var s = document.getElementsByTagName(\"script\")[0]; s.parentNode.insertBefore(hm, s); })();"
        ]
      ],
      "docsBranch": "dev",
      "algolia": {
        "apiKey": "",
        "indexName": ""
      },
      "search": {
        "maxSuggestions": 10,
        "hotKeys": [
          "s",
          "/"
        ],
        "locales": {
          "/": {
            "placeholder": "搜索"
          }
        }
      },
      "lang": "zh-CN",
      "navbarLocales": {
        "langName": "简体中文",
        "selectLangText": "选择语言",
        "selectLangAriaLabel": "选择语言"
      },
      "metaLocales": {
        "prev": "上一页",
        "next": "下一页",
        "lastUpdated": "上次编辑于",
        "contributors": "贡献者",
        "editLink": "编辑此页"
      },
      "blogLocales": {
        "article": "文章",
        "articleList": "文章列表",
        "category": "分类",
        "tag": "标签",
        "timeline": "时间轴",
        "timelineTitle": "昨日不在",
        "all": "全部",
        "intro": "个人介绍",
        "star": "收藏",
        "slides": "幻灯片",
        "encrypt": "加密"
      },
      "outlookLocales": {
        "themeColor": "主题色",
        "darkmode": "外观",
        "fullscreen": "全屏"
      },
      "encryptLocales": {
        "title": "请输入密码",
        "errorHint": "请输入正确密码"
      },
      "routeLocales": {
        "404msg": [
          "这里什么也没有",
          "我们是怎么来到这儿的？",
          "这 是 四 零 四 !",
          "看起来你访问了一个失效的链接"
        ],
        "back": "返回上一页",
        "home": "带我回家"
      }
    }
  }
}
