## 启动项目报错

## `Error:java: OutOfMemoryError: insufficient memory`

idea

修改Compiler下面的Compiler Process heap size 参数

点击file，选择Invalidate Caches 进行清理一下。


## Idea运行报错Error running ‘Application‘: Command line is too long的解决方法


首先找到项目里面的idea/workspace.xml文件，然后再找到
`<component name="PropertiesComponent"></component >`

标签，标签如下所示

然后再在component 标签里加一行 <property name="dynamic.classpath" value="true" />，就是变成下面这样

C:\WINDOWS\system32\drivers\etc

工作、生活娱乐的电脑要分开
