export const data = {
  "key": "v-4113d76b",
  "path": "/java/concurrent/how-to-communicate-between-java-threads.html",
  "title": "the-way-the-thread-communicates",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "the-way-the-thread-communicates",
    "category": [
      "concurrent"
    ],
    "tag": [
      "concurrent",
      "thread"
    ],
    "summary": "Java 线程的通信方式 通信的目的是为了更好的协作，线程无论是交替式执行，还是接力式执行，都需要进行通信告知。 使用 volatile 保证可见性 synchronized Volatile 有两大特性，一是可见性(让线程之间进行通信)，二是有序性，禁止指令重排序 所有 volatile 修饰的变量一旦被某个线程更改，必须立即刷新到主内存 所有 volat",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/concurrent/how-to-communicate-between-java-threads.html"
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
          "content": "the-way-the-thread-communicates"
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
          "property": "article:tag",
          "content": "concurrent"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "thread"
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
      "title": "Java 线程的通信方式",
      "slug": "java-线程的通信方式",
      "children": []
    },
    {
      "level": 2,
      "title": "使用 volatile 保证可见性 synchronized",
      "slug": "使用-volatile-保证可见性-synchronized",
      "children": []
    },
    {
      "level": 2,
      "title": "等待/通知机制 是基于 wait 和 notify 方法来实现的",
      "slug": "等待-通知机制-是基于-wait-和-notify-方法来实现的",
      "children": []
    },
    {
      "level": 2,
      "title": "join 方式",
      "slug": "join-方式",
      "children": []
    },
    {
      "level": 2,
      "title": "threadLocal 方式",
      "slug": "threadlocal-方式",
      "children": []
    }
  ],
  "git": {
    "createdTime": 1649875028000,
    "updatedTime": 1649875028000,
    "contributors": [
      {
        "name": "SHIJINGSPACE",
        "email": "945892500@qq.com",
        "commits": 1
      }
    ]
  },
  "readingTime": {
    "minutes": 2.02,
    "words": 605
  },
  "filePathRelative": "java/concurrent/how-to-communicate-between-java-threads.md"
}
