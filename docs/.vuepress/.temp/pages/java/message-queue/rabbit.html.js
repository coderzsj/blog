export const data = {
  "key": "v-19a38847",
  "path": "/java/message-queue/rabbit.html",
  "title": "RabbitMQ",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "RabbitMQ",
    "category": [
      "message-queue"
    ],
    "tag": [
      "mq"
    ],
    "summary": "RabbitMQ 如何避免消息堆积？ 消息堆积问题产生的原因往往是因为消息发送的速度超过了消费者消息处理的速度。 解决方案 无外乎以下三点：\r提高消费者处理速度; \r增加更多消费者; \r增加队列消息存储上限; 1、提高消费者处理速度 消费者处理速度是由业务代码决定的，所以我们能做的事情包括：\r尽可能优化业务代码，提高业务性能; \r接收到消息后，开启线程池，并",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/message-queue/rabbit.html"
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
          "content": "RabbitMQ"
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
          "content": "2022-04-13T16:10:37.000Z"
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
          "content": "mq"
        }
      ],
      [
        "meta",
        {
          "property": "article:modified_time",
          "content": "2022-04-13T16:10:37.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "RabbitMQ",
      "slug": "rabbitmq",
      "children": [
        {
          "level": 3,
          "title": "如何避免消息堆积？",
          "slug": "如何避免消息堆积",
          "children": []
        },
        {
          "level": 3,
          "title": "解决方案",
          "slug": "解决方案",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "RabbitMQ 如何保证消息的有序性？",
      "slug": "rabbitmq-如何保证消息的有序性",
      "children": [
        {
          "level": 3,
          "title": "概念",
          "slug": "概念",
          "children": []
        },
        {
          "level": 3,
          "title": "解决方案",
          "slug": "解决方案-1",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "如何防止 MQ 消息被重复消费？",
      "slug": "如何防止-mq-消息被重复消费",
      "children": [
        {
          "level": 3,
          "title": "概念",
          "slug": "概念-1",
          "children": []
        },
        {
          "level": 3,
          "title": "解决方案",
          "slug": "解决方案-2",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "如何保证 RabbitMQ 的高可用？",
      "slug": "如何保证-rabbitmq-的高可用",
      "children": [
        {
          "level": 3,
          "title": "概念",
          "slug": "概念-2",
          "children": []
        },
        {
          "level": 3,
          "title": "解决方案",
          "slug": "解决方案-3",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "使用 MQ 可以解决那些问题？",
      "slug": "使用-mq-可以解决那些问题",
      "children": []
    },
    {
      "level": 2,
      "title": "RabbitMQ 如何确保消息的不丢失",
      "slug": "rabbitmq-如何确保消息的不丢失",
      "children": [
        {
          "level": 3,
          "title": "生产者发送消息时可能因为网络问题导致消息没有到达交换机",
          "slug": "生产者发送消息时可能因为网络问题导致消息没有到达交换机",
          "children": []
        },
        {
          "level": 3,
          "title": "消息到达队列后，MQ 宕机也可能导致丢失消息",
          "slug": "消息到达队列后-mq-宕机也可能导致丢失消息",
          "children": []
        },
        {
          "level": 3,
          "title": "消息投递给消费者后，如果消费者处理不当，也可能导致消息丢失",
          "slug": "消息投递给消费者后-如果消费者处理不当-也可能导致消息丢失",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "createdTime": 1649813930000,
    "updatedTime": 1649866237000,
    "contributors": [
      {
        "name": "SHIJINGSPACE",
        "email": "945892500@qq.com",
        "commits": 2
      }
    ]
  },
  "readingTime": {
    "minutes": 6.99,
    "words": 2096
  },
  "filePathRelative": "java/message-queue/rabbit.md"
}
