export const data = {
  "key": "v-6bef3c55",
  "path": "/java/jvm/jvm-garbage-collection.html",
  "title": "jvm-gc",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "jvm-gc",
    "category": [
      "jvm"
    ],
    "date": "2021-02-01T00:00:00.000Z",
    "tag": [
      "jvm",
      "优化"
    ],
    "summary": "（1）Java内存运行时区域的各个部分，其中程序计数器、虚拟机栈、本地方法栈三个区域随线程而生，随线程尔灭；栈中的栈帧随着方法的进入和退出而有条不紊的执行着出栈和入栈操作。 （2）每一个栈帧中分配多少内存基本上是在类结构确定下来时就已知的，因此这几个区域的内存和回收都具确定性， 如果垃圾不被回收，内存迟早会被消耗空，因为我们在不断的分配内存空间而不进行回收，",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/jvm/jvm-garbage-collection.html"
        }
      ],
      [
        "meta",
        {
          "property": "og:site_name",
          "content": "JavaGuide"
        }
      ],
      [
        "meta",
        {
          "property": "og:title",
          "content": "jvm-gc"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "article"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale",
          "content": "zh-CN"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "jvm"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "优化"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-02-01T00:00:00.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "GC执行的机制",
      "slug": "gc执行的机制",
      "children": [
        {
          "level": 3,
          "title": "Minor GC(young GC)",
          "slug": "minor-gc-young-gc",
          "children": []
        },
        {
          "level": 3,
          "title": "Full GC",
          "slug": "full-gc",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "判断哪些对象可以回收",
      "slug": "判断哪些对象可以回收",
      "children": [
        {
          "level": 3,
          "title": "引用计数法",
          "slug": "引用计数法",
          "children": []
        },
        {
          "level": 3,
          "title": "可达性分析算法",
          "slug": "可达性分析算法",
          "children": []
        },
        {
          "level": 3,
          "title": "四种引用",
          "slug": "四种引用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "垃圾回收算法",
      "slug": "垃圾回收算法",
      "children": [
        {
          "level": 3,
          "title": "标记清除算法（引用计数算法）",
          "slug": "标记清除算法-引用计数算法",
          "children": []
        },
        {
          "level": 3,
          "title": "复制算法",
          "slug": "复制算法",
          "children": []
        },
        {
          "level": 3,
          "title": "标记-整理算法(压缩法)",
          "slug": "标记-整理算法-压缩法",
          "children": []
        },
        {
          "level": 3,
          "title": "分代收集算法",
          "slug": "分代收集算法",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "典型的垃圾收集器",
      "slug": "典型的垃圾收集器",
      "children": []
    },
    {
      "level": 2,
      "title": "Serial 收集器",
      "slug": "serial-收集器",
      "children": [
        {
          "level": 3,
          "title": "ParNew 收集器",
          "slug": "parnew-收集器",
          "children": []
        },
        {
          "level": 3,
          "title": "CMS 收集器",
          "slug": "cms-收集器",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "G1 收集器（待续。。。）",
      "slug": "g1-收集器-待续。。。",
      "children": []
    },
    {
      "level": 2,
      "title": "tiaoyou新生代",
      "slug": "tiaoyou新生代",
      "children": []
    },
    {
      "level": 2,
      "title": "tiaoyou老年代",
      "slug": "tiaoyou老年代",
      "children": []
    }
  ],
  "git": {
    "createdTime": null,
    "updatedTime": null,
    "contributors": []
  },
  "readingTime": {
    "minutes": 14.56,
    "words": 4368
  },
  "filePathRelative": "java/jvm/jvm-garbage-collection.md"
}
