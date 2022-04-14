export const data = {
  "key": "v-a478043a",
  "path": "/java/soa/distributed-transaction.html",
  "title": "fubuhi transaction",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "fubuhi transaction",
    "icon": "fubuhi",
    "category": [
      "分布式"
    ],
    "date": "2021-10-21T00:00:00.000Z",
    "tag": [
      "tcc",
      "分布式事务"
    ],
    "summary": "解决跨库操作的数据一致性问题： 在分布式或者微服务架构中，每个服务都有自己的数据源，使用不同事务管理器，如果A服务去调用B服务，B服务执行失败了，A服务的事务和B服务的事务都会回滚，这时候是不存在事务问题的，但是如果A服务B服务执行成功之后出现异常，A服务的事原子性务会回滚，但是B服务的事务不会回滚，此时就存在分布式事务问题。 使用场景：\r转账：包含转出和转",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/soa/distributed-transaction.html"
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
          "content": "fubuhi transaction"
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
          "content": "fubuhi transaction"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "tcc"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "分布式事务"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-10-21T00:00:00.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "使用场景：",
      "slug": "使用场景",
      "children": [
        {
          "level": 3,
          "title": "事务的4个特性ACID",
          "slug": "事务的4个特性acid",
          "children": []
        },
        {
          "level": 3,
          "title": "CAP定理",
          "slug": "cap定理",
          "children": []
        },
        {
          "level": 3,
          "title": "一致性",
          "slug": "一致性",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "seata",
      "slug": "seata",
      "children": []
    },
    {
      "level": 2,
      "title": "AT事务模式",
      "slug": "at事务模式",
      "children": []
    },
    {
      "level": 2,
      "title": "sagas事务模式",
      "slug": "sagas事务模式",
      "children": []
    },
    {
      "level": 2,
      "title": "TCC事务模型",
      "slug": "tcc事务模型",
      "children": [
        {
          "level": 3,
          "title": "注意事项：",
          "slug": "注意事项",
          "children": []
        },
        {
          "level": 3,
          "title": "一个完整的TCC事务参与方包括三部分：",
          "slug": "一个完整的tcc事务参与方包括三部分",
          "children": []
        },
        {
          "level": 3,
          "title": "tcc 案例",
          "slug": "tcc-案例",
          "children": []
        },
        {
          "level": 3,
          "title": "一个稳定的、高可用的、扩展性强的TCC事务管理器（seata）",
          "slug": "一个稳定的、高可用的、扩展性强的tcc事务管理器-seata",
          "children": []
        },
        {
          "level": 3,
          "title": "TCC事务的优点和限制",
          "slug": "tcc事务的优点和限制",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "基于消息的分布式事务",
      "slug": "基于消息的分布式事务",
      "children": []
    }
  ],
  "git": {
    "createdTime": null,
    "updatedTime": null,
    "contributors": []
  },
  "readingTime": {
    "minutes": 18.19,
    "words": 5457
  },
  "filePathRelative": "java/soa/distributed-transaction.md"
}
