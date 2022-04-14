export const data = {
  "key": "v-270fc1f8",
  "path": "/java/jvm/jvm-memory-structure.html",
  "title": "jvm-architecture",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "jvm-architecture",
    "category": [
      "jvm"
    ],
    "tag": [
      "jvm"
    ],
    "summary": "JVM内存结构\rJava Virtual Machine ，Java 程序的运行环境(Java 二进制字节码的运行环境)。\r一次编译，处处执行; \r自动的内存管理，垃圾回收机制; \r数组下标越界检查; 3）比较 JVM、JRE、JDK 的关系如下图所示 操作系统(Windows+Linux) Jvm ~jre(jvm+基本类库) ~jdk(jvm+基本类库+",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/jvm/jvm-memory-structure.html"
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
          "content": "jvm-architecture"
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
          "property": "og:image",
          "content": "http://www.zhangsj.xyz/"
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
          "name": "twitter:card",
          "content": "summary_large_image"
        }
      ],
      [
        "meta",
        {
          "name": "twitter:image:alt",
          "content": "jvm-architecture"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "jvm"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "JVM内存结构",
      "slug": "jvm内存结构",
      "children": []
    },
    {
      "level": 2,
      "title": "二、内存结构",
      "slug": "二、内存结构",
      "children": [
        {
          "level": 3,
          "title": "1、程序计数器",
          "slug": "_1、程序计数器",
          "children": []
        },
        {
          "level": 3,
          "title": "2、虚拟机栈",
          "slug": "_2、虚拟机栈",
          "children": []
        },
        {
          "level": 3,
          "title": "3、本地方法栈",
          "slug": "_3、本地方法栈",
          "children": []
        },
        {
          "level": 3,
          "title": "4、堆",
          "slug": "_4、堆",
          "children": []
        },
        {
          "level": 3,
          "title": "5、方法区",
          "slug": "_5、方法区",
          "children": []
        },
        {
          "level": 3,
          "title": "6、直接内存",
          "slug": "_6、直接内存",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "JVM堆内存详解",
      "slug": "jvm堆内存详解",
      "children": [
        {
          "level": 3,
          "title": "年轻代",
          "slug": "年轻代",
          "children": []
        },
        {
          "level": 3,
          "title": "老年代",
          "slug": "老年代",
          "children": []
        },
        {
          "level": 3,
          "title": "持久代",
          "slug": "持久代",
          "children": []
        },
        {
          "level": 3,
          "title": "元空间",
          "slug": "元空间",
          "children": []
        },
        {
          "level": 3,
          "title": "为什么分代？",
          "slug": "为什么分代",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "内存分配策略",
      "slug": "内存分配策略",
      "children": [
        {
          "level": 3,
          "title": "优先在Eden区分配",
          "slug": "优先在eden区分配",
          "children": []
        },
        {
          "level": 3,
          "title": "大对象直接进入老年代",
          "slug": "大对象直接进入老年代",
          "children": []
        },
        {
          "level": 3,
          "title": "长期存活对象进入老年区",
          "slug": "长期存活对象进入老年区",
          "children": []
        },
        {
          "level": 3,
          "title": "对象年龄动态判定",
          "slug": "对象年龄动态判定",
          "children": []
        },
        {
          "level": 3,
          "title": "空间分配担保",
          "slug": "空间分配担保",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "createdTime": null,
    "updatedTime": null,
    "contributors": []
  },
  "readingTime": {
    "minutes": 15.53,
    "words": 4660
  },
  "filePathRelative": "java/jvm/jvm-memory-structure.md"
}
