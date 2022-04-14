export const data = {
  "key": "v-21f9c138",
  "path": "/java/concurrent/optimistic%20locking%20and%20pessimistic%20locking.html",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "summary": "写操作，系统保证接口的幂等性和关联数据的一致性。 业务数据中有一个唯一字段 businessCode 作为幂等字段。 新增保存 业务数据中唯一字段作为幂等字段 直接交给数据库层面处理。 更新 系统中有一张异常订单表，订单表 exorder 有字段 status，如果 status 为 1，代表待处理，就能对该订单做异常登记处理，生成异常登记记录表 exreg",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/concurrent/optimistic%20locking%20and%20pessimistic%20locking.html"
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
      "title": "悲观锁方案",
      "slug": "悲观锁方案",
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
    "minutes": 2.32,
    "words": 697
  },
  "filePathRelative": "java/concurrent/optimistic locking and pessimistic locking.md"
}
