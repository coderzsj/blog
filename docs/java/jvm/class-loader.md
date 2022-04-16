# 类加载机制

## parent-delegation-model

避免用户自己编写的类动态替换JAVA的一些核心类，比如String。同时也避免了类的重复加载，因为JVM中区分不同类，不仅仅根据类名，相同的class文件被不同ClassLoader加载就是不同的两个类。

双亲委派模型的好处：

主要是为了安全性，便面用户自己编写的类动态替换JAVA的一些核心类，比如String。
