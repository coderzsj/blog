export const data = {
  "key": "v-822a8660",
  "path": "/java/soa/Distributed%20lock.html",
  "title": "为什么分布式要有分布式锁！",
  "lang": "zh-CN",
  "frontmatter": {
    "summary": "为什么分布式要有分布式锁！ 目前网上大部分的基于ZOOKEEPER，和REDIS的分布式锁的文章都不够全面。要么就是特意避开集群的情况，要么就是考虑不全，堵着看着还是一脸迷茫。坦白说，这种老题材，很难写出新创意，博主内心战战兢兢，如履薄冰，文中有什么不严谨之处，欢迎批评。 博主的这篇文章，不上代码，只讲分析。 1、在REDIS方面，有开源REDISSION的",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/soa/Distributed%20lock.html"
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
          "content": "为什么分布式要有分布式锁！"
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
      "title": "第一回合，单机情形比较",
      "slug": "第一回合-单机情形比较",
      "children": []
    },
    {
      "level": 2,
      "title": "第二回合，集群情形比较：",
      "slug": "第二回合-集群情形比较",
      "children": []
    },
    {
      "level": 2,
      "title": "Redis 实现分布式锁",
      "slug": "redis-实现分布式锁",
      "children": [
        {
          "level": 3,
          "title": "最基本的分布式锁",
          "slug": "最基本的分布式锁",
          "children": []
        },
        {
          "level": 3,
          "title": "释放锁的时候，保证持有锁的线程释放锁",
          "slug": "释放锁的时候-保证持有锁的线程释放锁",
          "children": []
        },
        {
          "level": 3,
          "title": "可重入分布式锁",
          "slug": "可重入分布式锁",
          "children": []
        }
      ]
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
    "minutes": 8.14,
    "words": 2442
  },
  "filePathRelative": "java/soa/Distributed lock.md"
}
