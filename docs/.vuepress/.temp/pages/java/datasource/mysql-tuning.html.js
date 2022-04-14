export const data = {
  "key": "v-17294c43",
  "path": "/java/datasource/mysql-tuning.html",
  "title": "sql tiaoyou",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "sql tiaoyou",
    "icon": "youhuayunhang",
    "category": [
      "mysql"
    ],
    "author": "狼爷、zsj",
    "date": "2020-08-01T00:00:00.000Z",
    "tag": [
      "优化"
    ],
    "summary": "一、前言 在应用开发的早期，数据量少，开发人员开发功能时更重视功能上的实现，随着生产数据的增长，很多SQL语句开始暴露出性能问题，对生产的影响也越来越大，有时可能这些有问题的SQL就是整个系统性能的瓶颈。 二、SQL优化一般步骤 1、通过慢查日志等定位那些执行效率较低的SQL语句 2、explain 分析SQL的执行计划 需要重点关注 type、rows、f",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/datasource/mysql-tuning.html"
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
          "content": "sql tiaoyou"
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
          "property": "og:locale",
          "content": "zh-CN"
        }
      ],
      [
        "meta",
        {
          "property": "article:author",
          "content": "狼爷、zsj"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "优化"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2020-08-01T00:00:00.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一、前言",
      "slug": "一、前言",
      "children": []
    },
    {
      "level": 2,
      "title": "二、SQL优化一般步骤",
      "slug": "二、sql优化一般步骤",
      "children": []
    },
    {
      "level": 2,
      "title": "三、场景分析",
      "slug": "三、场景分析",
      "children": [
        {
          "level": 3,
          "title": "1、最左匹配",
          "slug": "_1、最左匹配",
          "children": []
        },
        {
          "level": 3,
          "title": "2、隐式转换",
          "slug": "_2、隐式转换",
          "children": []
        },
        {
          "level": 3,
          "title": "3、大分页",
          "slug": "_3、大分页",
          "children": []
        },
        {
          "level": 3,
          "title": "4、in + order by",
          "slug": "_4、in-order-by",
          "children": []
        },
        {
          "level": 3,
          "title": "5、范围查询阻断，后续字段不能走索引",
          "slug": "_5、范围查询阻断-后续字段不能走索引",
          "children": []
        },
        {
          "level": 3,
          "title": "6、不等于、不包含不能用到索引的快速搜索",
          "slug": "_6、不等于、不包含不能用到索引的快速搜索",
          "children": []
        },
        {
          "level": 3,
          "title": "7、优化器选择不使用索引的情况",
          "slug": "_7、优化器选择不使用索引的情况",
          "children": []
        },
        {
          "level": 3,
          "title": "8、复杂查询",
          "slug": "_8、复杂查询",
          "children": []
        },
        {
          "level": 3,
          "title": "9、asc和desc混用",
          "slug": "_9、asc和desc混用",
          "children": []
        },
        {
          "level": 3,
          "title": "10、大数据",
          "slug": "_10、大数据",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "tiaoyou",
      "slug": "tiaoyou",
      "children": []
    },
    {
      "level": 2,
      "title": "mycat",
      "slug": "mycat",
      "children": [
        {
          "level": 3,
          "title": "场景分析",
          "slug": "场景分析",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "createdTime": null,
    "updatedTime": null,
    "contributors": []
  },
  "readingTime": {
    "minutes": 8.93,
    "words": 2678
  },
  "filePathRelative": "java/datasource/mysql-tuning.md"
}
