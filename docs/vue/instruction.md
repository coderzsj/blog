---
title: vue指令
icon: Vue
category: 前端
tag:
  - vue
---

## directives

表格临时回车跳转

```js
    nextSelect: {
      bind: function (el, { value }, vnode) {
        el.onkeydown = function (ev) {
          if (ev.keyCode === 13) {
            let nextInput = vnode.context.$refs[value]
            if (nextInput && typeof nextInput.focus === 'function') {
              nextInput.focus()
            } else {
            }
          }
        }
      }
    }
```

浅拷贝 ： 只是将数据中所有的数据引用下来，依旧指向同一个存放地址，拷贝之后的数据修改之后，也会影响到原数据的中的对象数据。例如:Object.assign(),...扩展运算符

深拷贝： 将数据中所有的数据拷贝下来，对拷贝之后的数据进行修改不会影响到原数据。

JSON.parse(JSON.stringify(obj))深拷贝的问题

JSON.parse(JSON.stringify(obj))深拷贝的问题

1. 如果 obj 里面存在时间对象,JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。
2. 如果 obj 里有 RegExp、Error 对象，则序列化的结果将只得到空对象。
3. 如果 obj 里有函数，undefined，则序列化的结果会把函数， undefined 丢失。
4. 如果 obj 里有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null。
5. JSON.stringify()只能序列化对象的可枚举的自有属性。如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor。
6. 如果对象中存在循环引用的情况也无法正确实现深拷贝。
