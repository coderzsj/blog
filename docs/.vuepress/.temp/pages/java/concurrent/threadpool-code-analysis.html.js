export const data = {
  "key": "v-07012f80",
  "path": "/java/concurrent/threadpool-code-analysis.html",
  "title": "threadpool",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "threadpool",
    "category": [
      "thread"
    ],
    "tag": [
      "threadpool"
    ],
    "summary": "threadpool 线程池 ThreadPoolExecutor 源码分析 1、构造方法 构造方法中有 4 个方法，本质上都是调用的下面这个构造方法： 线程池中定义了四种饱和策略 (拒绝策略) 1、CallerRunsPolicy 绕过线程池，直接执行线程的 run 方法 2、 AbortPolicy(线程池默认的策略) 抛出 RejectedExecut",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/concurrent/threadpool-code-analysis.html"
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
          "content": "threadpool"
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
          "content": "2022-04-13T01:38:50.000Z"
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
          "content": "threadpool"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "threadpool"
        }
      ],
      [
        "meta",
        {
          "property": "article:modified_time",
          "content": "2022-04-13T01:38:50.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1、构造方法",
      "slug": "_1、构造方法",
      "children": []
    },
    {
      "level": 2,
      "title": "线程池中定义了四种饱和策略 (拒绝策略)",
      "slug": "线程池中定义了四种饱和策略-拒绝策略",
      "children": [
        {
          "level": 3,
          "title": "1、CallerRunsPolicy",
          "slug": "_1、callerrunspolicy",
          "children": []
        },
        {
          "level": 3,
          "title": "2、 AbortPolicy(线程池默认的策略)",
          "slug": "_2、-abortpolicy-线程池默认的策略",
          "children": []
        },
        {
          "level": 3,
          "title": "3、DiscardPolicy",
          "slug": "_3、discardpolicy",
          "children": []
        },
        {
          "level": 3,
          "title": "4、DiscardOldestPolicy",
          "slug": "_4、discardoldestpolicy",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "3、阻塞队列",
      "slug": "_3、阻塞队列",
      "children": []
    },
    {
      "level": 2,
      "title": "4、execute 方法",
      "slug": "_4、execute-方法",
      "children": []
    }
  ],
  "git": {
    "createdTime": 1649813930000,
    "updatedTime": 1649813930000,
    "contributors": [
      {
        "name": "SHIJINGSPACE",
        "email": "945892500@qq.com",
        "commits": 1
      }
    ]
  },
  "readingTime": {
    "minutes": 3.12,
    "words": 936
  },
  "filePathRelative": "java/concurrent/threadpool-code-analysis.md"
}
