export const data = {
  "key": "v-3acc7380",
  "path": "/java/basic/hashmap.html",
  "title": "hashmap",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "hashmap",
    "icon": "hashmap",
    "category": [
      "java"
    ],
    "tag": [
      "集合",
      "java"
    ],
    "summary": "HASHMAP的内部结构（线程不安全、基于JDK7） hashmap是无序的，因为每次根据 key 的 hashcode 映射到 Entry 数组上，所以遍历出来的顺序并不是写入的顺序。 HSAHMAP底层是基于数组和链表实现的，两个重要的参数：容量和负载因子；容量的默认大小的16，负载因子是0.75，当HashMap的size>16*0.75时就会发生扩容",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.zhangsj.xyz/java/basic/hashmap.html"
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
          "content": "hashmap"
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
          "content": "集合"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "java"
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
      "title": "HASHMAP的内部结构（线程不安全、基于JDK7）",
      "slug": "hashmap的内部结构-线程不安全、基于jdk7",
      "children": []
    },
    {
      "level": 2,
      "title": "HashMap 特性",
      "slug": "hashmap-特性",
      "children": []
    },
    {
      "level": 2,
      "title": "HashMap的底层原理",
      "slug": "hashmap的底层原理",
      "children": []
    },
    {
      "level": 2,
      "title": "put方法实现",
      "slug": "put方法实现",
      "children": [
        {
          "level": 3,
          "title": "扩容机制",
          "slug": "扩容机制",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "get方法实现",
      "slug": "get方法实现",
      "children": []
    },
    {
      "level": 2,
      "title": "hash方法实现",
      "slug": "hash方法实现",
      "children": [
        {
          "level": 3,
          "title": "异或运算原因",
          "slug": "异或运算原因",
          "children": []
        },
        {
          "level": 3,
          "title": "2次幂原因",
          "slug": "_2次幂原因",
          "children": []
        },
        {
          "level": 3,
          "title": "解决hash冲突",
          "slug": "解决hash冲突",
          "children": []
        },
        {
          "level": 3,
          "title": "扩容",
          "slug": "扩容",
          "children": []
        },
        {
          "level": 3,
          "title": "rehash方法：不需要重新计算hash",
          "slug": "rehash方法-不需要重新计算hash",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "hashtable",
      "slug": "hashtable",
      "children": []
    },
    {
      "level": 2,
      "title": "loadFactor",
      "slug": "loadfactor",
      "children": []
    },
    {
      "level": 2,
      "title": "红黑树",
      "slug": "红黑树",
      "children": [
        {
          "level": 3,
          "title": "二叉查找树",
          "slug": "二叉查找树",
          "children": []
        },
        {
          "level": 3,
          "title": "avl",
          "slug": "avl",
          "children": []
        },
        {
          "level": 3,
          "title": "RedBlack树",
          "slug": "redblack树",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "平时在使用HashMap时一般使用什么类型的元素作为Key？",
      "slug": "平时在使用hashmap时一般使用什么类型的元素作为key",
      "children": []
    },
    {
      "level": 2,
      "title": "HashMap",
      "slug": "hashmap",
      "children": []
    },
    {
      "level": 2,
      "title": "HashMap扩容机制是什么？",
      "slug": "hashmap扩容机制是什么",
      "children": []
    }
  ],
  "git": {
    "createdTime": 1649813930000,
    "updatedTime": 1649875028000,
    "contributors": [
      {
        "name": "SHIJINGSPACE",
        "email": "945892500@qq.com",
        "commits": 2
      }
    ]
  },
  "readingTime": {
    "minutes": 12.46,
    "words": 3737
  },
  "filePathRelative": "java/basic/hashmap.md"
}
