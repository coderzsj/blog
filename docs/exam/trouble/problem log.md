---
title: 项目启动报错
category: 问题
---

## 启动项目报错

## Error:java: OutOfMemoryError: insufficient memory

idea

修改Compiler下面的Compiler Process heap size 参数

点击file，选择Invalidate Caches 进行清理一下。

## Command line is too long的解决方法

首先找到项目里面的idea/workspace.xml文件，然后再找到标签如下所示
    
```xml
`<component name="PropertiesComponent"></component >`
```

然后再在component 标签里加一行`<property name="dynamic.classpath" value="true"/>`，就是变成下面这样

C:\WINDOWS\system32\drivers\etc
