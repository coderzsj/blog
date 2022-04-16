---
title: Typescript知识点总结
icon: typescript
category: 前端
tag:
  - Typescript
---

## TypeScript

[参考](https://zhuanlan.zhihu.com/p/362916796)

::: tip 介绍

TypeScript是强类型的JavaScript超集，支持ES6语法，支持面向对象编程的概念，如类、接口、继承、泛型等。

TypeScript并不直接在浏览器上运行，需要编译器编译成纯JavaScript来运行。

支持泛型，es6语法，强类型和静态类型

:::

1：快速简单，易于学习。
2：编译时提供错误检查， 在代码运行前就会进行错误提示。
3：支持所有的 JS 库。
4：支持 ES6，提供了 ES6 所有优点和更高的生产力。
5：使用继承提供可重用性。
6：有助于代码结构。
7：通过定义模块来定义命名空间。

1：需要长时间的来编译代码。
2：在使用第三方库时，需要有三方库的定义文件，并不是所有三方库都提供了定义文件，提供的定义文件是否准确也值得商榷。

## 基本数据类型

### js

基本数据类型:Undefined、Null、Boolean、Number、String,Symbol 引用数据类型 :Object

### ts

1：number
2：string
3：boolean
4：Symbol
5：Array
6：Tuple(元组)
7：enum(枚举)
8：object
9：never
表示那些永不存在的值类型。如总是抛出异常或者根本不会有返回值的函数的返回值类型。
10：void
与 any 相反表示没有任何类型。函数没有返回值时用 void。
11：null 和 undefined
它们是所有类型的子类型。当你指定 structNullChecks 时，它们只能赋值给 void 或者它们自己本身。
12：any
