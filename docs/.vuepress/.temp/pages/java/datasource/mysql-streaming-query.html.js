export const data = {
  "key": "v-5119153d",
  "path": "/java/datasource/mysql-streaming-query.html",
  "title": "liushiquery",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "liushiquery",
    "icon": "sql",
    "category": [
      "mysql"
    ],
    "date": "2021-08-03T00:00:00.000Z",
    "summary": "前言 程序访问MySQL数据库时，当查询出来的数据量特别大时，数据库驱动把加载到的数据全部加载到内存里，就有可能会导致内存溢出（OOM）。 其实在MySQL数据库中提供了流式查询，允许把符合条件的数据分批一部分一部分地加载到内存中，可以有效避免OOM； 本文主要介绍如何使用流式查询并对比普通查询进行性能测试。 查询成功后不是返回一个集合而是返回一个迭代器，应",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/datasource/mysql-streaming-query.html"
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
          "content": "liushiquery"
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
          "property": "article:published_time",
          "content": "2021-08-03T00:00:00.000Z"
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
      "title": "基于mybatis实现流式查询",
      "slug": "基于mybatis实现流式查询",
      "children": [
        {
          "level": 3,
          "title": "方案一：SqlSessionFactory",
          "slug": "方案一-sqlsessionfactory",
          "children": []
        },
        {
          "level": 3,
          "title": "方案二：TransactionTemplate",
          "slug": "方案二-transactiontemplate",
          "children": []
        },
        {
          "level": 3,
          "title": "方案三：@Transactional 注解",
          "slug": "方案三-transactional-注解",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "JDBC实现流式查询",
      "slug": "jdbc实现流式查询",
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
    "minutes": 4.44,
    "words": 1331
  },
  "filePathRelative": "java/datasource/mysql-streaming-query.md"
}
