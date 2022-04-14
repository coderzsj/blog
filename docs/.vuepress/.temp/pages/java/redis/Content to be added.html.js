export const data = {
  "key": "v-6c0a4543",
  "path": "/java/redis/Content%20to%20be%20added.html",
  "title": "redislock",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "redislock",
    "category": [
      "redis"
    ],
    "tag": [
      "redis lock"
    ],
    "summary": "redis 分布式锁依赖于 redis，如果 redis 宕机则锁失效。如何解决？ 可以做搭建主从集群，做数据备份。 但如果搭建主从集群做数据备份时，进程 A 获取锁，master 还没有把数据备份到 slave，master 宕机，slave 升级为 master，此时原来锁失效，其它进程也可以获取锁，出现安全问题。如何解决？ 关于这个问题，Redis 官",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/redis/Content%20to%20be%20added.html"
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
          "content": "redislock"
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
          "content": "redis lock"
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
      "level": 3,
      "title": "redis 分布式锁依赖于 redis，如果 redis 宕机则锁失效。如何解决？",
      "slug": "redis-分布式锁依赖于-redis-如果-redis-宕机则锁失效。如何解决",
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
    "minutes": 2.28,
    "words": 685
  },
  "filePathRelative": "java/redis/Content to be added.md"
}
