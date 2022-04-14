export const data = {
  "key": "v-9038f6ea",
  "path": "/java/concurrent/synchronized-principle-analysis-and-optimization.html",
  "title": "synchronized",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "synchronized",
    "category": [
      "concurrent"
    ],
    "date": "2022-01-28T00:00:00.000Z",
    "tag": [
      "concurrent",
      "synchronized"
    ],
    "summary": "可见性 可见性是指一个线程对共享变量进行修改，另一个线程先立即获取到修改后的最新值。 代码： 一个线程根据boolean类型的标记flag，while循环，另一个线程改变这个flag变量的值，另一个线程并不会停止循环。 多个线程都会访问的数据，我们称为线程的共享数据\r总结 并发编程时，会出现可见性问题，当一个线程对共享变量进行了修改，另外的线程并没有立即看到",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/concurrent/synchronized-principle-analysis-and-optimization.html"
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
          "content": "synchronized"
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
          "property": "og:updated_time",
          "content": "2022-04-13T18:37:08.000Z"
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
          "content": "synchronized"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "concurrent"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "synchronized"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-28T00:00:00.000Z"
        }
      ],
      [
        "meta",
        {
          "property": "article:modified_time",
          "content": "2022-04-13T18:37:08.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "可见性",
      "slug": "可见性",
      "children": []
    },
    {
      "level": 2,
      "title": "原子性",
      "slug": "原子性",
      "children": []
    },
    {
      "level": 2,
      "title": "有序性",
      "slug": "有序性",
      "children": []
    },
    {
      "level": 2,
      "title": "二、Java 内存模型(JMM)",
      "slug": "二、java-内存模型-jmm",
      "children": [
        {
          "level": 3,
          "title": "计算机由五大组成部分",
          "slug": "计算机由五大组成部分",
          "children": []
        },
        {
          "level": 3,
          "title": "Java 内存模型",
          "slug": "java-内存模型",
          "children": []
        },
        {
          "level": 3,
          "title": "CPU 缓存，内存与 JMM的关系",
          "slug": "cpu-缓存-内存与-jmm的关系",
          "children": []
        },
        {
          "level": 3,
          "title": "主内存与工作内存之间的交互",
          "slug": "主内存与工作内存之间的交互",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "三、synchronized 保证三大特性",
      "slug": "三、synchronized-保证三大特性",
      "children": [
        {
          "level": 3,
          "title": "synchronized 与原子性",
          "slug": "synchronized-与原子性",
          "children": []
        },
        {
          "level": 3,
          "title": "保证原子性的原理",
          "slug": "保证原子性的原理",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "synchronized 与可见性",
      "slug": "synchronized-与可见性",
      "children": []
    },
    {
      "level": 2,
      "title": "synchronized 与有序性",
      "slug": "synchronized-与有序性",
      "children": []
    },
    {
      "level": 2,
      "title": "可重入特性",
      "slug": "可重入特性",
      "children": []
    },
    {
      "level": 2,
      "title": "不可中断特性",
      "slug": "不可中断特性",
      "children": [
        {
          "level": 3,
          "title": "monitorenter",
          "slug": "monitorenter",
          "children": []
        },
        {
          "level": 3,
          "title": "monitorexit",
          "slug": "monitorexit",
          "children": []
        },
        {
          "level": 3,
          "title": "同步方法",
          "slug": "同步方法",
          "children": []
        },
        {
          "level": 3,
          "title": "问题：synchronized 与 Lock 的区别",
          "slug": "问题-synchronized-与-lock-的区别",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "深入 JVM 源码",
      "slug": "深入-jvm-源码",
      "children": [
        {
          "level": 3,
          "title": "JVM 源码下载",
          "slug": "jvm-源码下载",
          "children": []
        },
        {
          "level": 3,
          "title": "monitor 监视器锁",
          "slug": "monitor-监视器锁",
          "children": []
        },
        {
          "level": 3,
          "title": "monitor 竞争",
          "slug": "monitor-竞争",
          "children": []
        },
        {
          "level": 3,
          "title": "monitor 等待",
          "slug": "monitor-等待",
          "children": []
        },
        {
          "level": 3,
          "title": "monitor 释放",
          "slug": "monitor-释放",
          "children": []
        },
        {
          "level": 3,
          "title": "monitor是重量级锁",
          "slug": "monitor是重量级锁",
          "children": []
        },
        {
          "level": 3,
          "title": "CAS和volatile实现无锁并发",
          "slug": "cas和volatile实现无锁并发",
          "children": []
        },
        {
          "level": 3,
          "title": "CAS原理",
          "slug": "cas原理",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "synchronized 锁升级过程",
      "slug": "synchronized-锁升级过程",
      "children": []
    },
    {
      "level": 2,
      "title": "Java 对象的布局",
      "slug": "java-对象的布局",
      "children": [
        {
          "level": 3,
          "title": "对象头",
          "slug": "对象头",
          "children": []
        },
        {
          "level": 3,
          "title": "Mark Word",
          "slug": "mark-word",
          "children": []
        },
        {
          "level": 3,
          "title": "klass pointer",
          "slug": "klass-pointer",
          "children": []
        },
        {
          "level": 3,
          "title": "查看 Java 对象布局",
          "slug": "查看-java-对象布局",
          "children": []
        },
        {
          "level": 3,
          "title": "什么是偏向锁",
          "slug": "什么是偏向锁",
          "children": []
        },
        {
          "level": 3,
          "title": "偏向锁原理",
          "slug": "偏向锁原理",
          "children": []
        },
        {
          "level": 3,
          "title": "偏向锁的撤销",
          "slug": "偏向锁的撤销",
          "children": []
        },
        {
          "level": 3,
          "title": "偏向锁好处",
          "slug": "偏向锁好处",
          "children": []
        },
        {
          "level": 3,
          "title": "什么是轻量级锁",
          "slug": "什么是轻量级锁",
          "children": []
        },
        {
          "level": 3,
          "title": "轻量级锁原理",
          "slug": "轻量级锁原理",
          "children": []
        },
        {
          "level": 3,
          "title": "轻量级锁的释放",
          "slug": "轻量级锁的释放",
          "children": []
        },
        {
          "level": 3,
          "title": "轻量级锁好处",
          "slug": "轻量级锁好处",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "自旋锁",
      "slug": "自旋锁",
      "children": [
        {
          "level": 3,
          "title": "适应性自旋锁",
          "slug": "适应性自旋锁",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "锁消除",
      "slug": "锁消除",
      "children": []
    },
    {
      "level": 2,
      "title": "锁粗化",
      "slug": "锁粗化",
      "children": []
    },
    {
      "level": 2,
      "title": "平时写代码如何对 synchronized 优化",
      "slug": "平时写代码如何对-synchronized-优化",
      "children": [
        {
          "level": 3,
          "title": "读写分离",
          "slug": "读写分离",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "createdTime": 1649813930000,
    "updatedTime": 1649875028000,
    "contributors": [
      {
        "name": "SHIJINGSPACE",
        "email": "945892500@qq.com",
        "commits": 3
      }
    ]
  },
  "readingTime": {
    "minutes": 40.9,
    "words": 12270
  },
  "filePathRelative": "java/concurrent/synchronized-principle-analysis-and-optimization.md"
}
