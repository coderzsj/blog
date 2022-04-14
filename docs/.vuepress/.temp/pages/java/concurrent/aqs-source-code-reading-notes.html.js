export const data = {
  "key": "v-c82fcb16",
  "path": "/java/concurrent/aqs-source-code-reading-notes.html",
  "title": "AbstractQueuedSynchronizer",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "AbstractQueuedSynchronizer",
    "category": [
      "concurrent"
    ],
    "tag": [
      "concurrent",
      "aqs"
    ],
    "summary": "AQS 概述 AbstractQueuedSynchronizer，是 JDK 提供的一个同步框架，内部维护着 FIFO 双向队列，即 CLH 同步队列。 AQS 依赖它来完成同步状态的管理(voliate 修饰的 state，用于标志是否持有锁)。如果获取同步状态 state 失败时，会将当前线程及等待信息等构建成一个 Node，将 Node.js 放到 ",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/concurrent/aqs-source-code-reading-notes.html"
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
          "content": "AbstractQueuedSynchronizer"
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
          "content": "AbstractQueuedSynchronizer"
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
          "content": "aqs"
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
      "title": "概述",
      "slug": "概述",
      "children": []
    },
    {
      "level": 2,
      "title": "Node.js 内部类",
      "slug": "node-js-内部类",
      "children": []
    },
    {
      "level": 2,
      "title": "FIFO 结构图",
      "slug": "fifo-结构图",
      "children": []
    },
    {
      "level": 2,
      "title": "独占式同步状态过程",
      "slug": "独占式同步状态过程",
      "children": [
        {
          "level": 3,
          "title": "acquire",
          "slug": "acquire",
          "children": []
        },
        {
          "level": 3,
          "title": "tryAcquire",
          "slug": "tryacquire",
          "children": []
        },
        {
          "level": 3,
          "title": "addWaiter",
          "slug": "addwaiter",
          "children": []
        },
        {
          "level": 3,
          "title": "enq",
          "slug": "enq",
          "children": []
        },
        {
          "level": 3,
          "title": "acquireQueued",
          "slug": "acquirequeued",
          "children": []
        },
        {
          "level": 3,
          "title": "shouldParkAfterFailedAcquire",
          "slug": "shouldparkafterfailedacquire",
          "children": []
        },
        {
          "level": 3,
          "title": "parkAndCheckInterrupt",
          "slug": "parkandcheckinterrupt",
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
    "minutes": 3.68,
    "words": 1103
  },
  "filePathRelative": "java/concurrent/aqs-source-code-reading-notes.md"
}
