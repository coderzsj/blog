<template><h2 id="启动项目报错" tabindex="-1"><a class="header-anchor" href="#启动项目报错" aria-hidden="true">#</a> 启动项目报错</h2>
<h2 id="error-java-outofmemoryerror-insufficient-memory" tabindex="-1"><a class="header-anchor" href="#error-java-outofmemoryerror-insufficient-memory" aria-hidden="true">#</a> <code>Error:java: OutOfMemoryError: insufficient memory</code></h2>
<p>idea</p>
<p>修改Compiler下面的Compiler Process heap size 参数</p>
<p>点击file，选择Invalidate Caches 进行清理一下。</p>
<h2 id="idea运行报错error-running-application-command-line-is-too-long的解决方法" tabindex="-1"><a class="header-anchor" href="#idea运行报错error-running-application-command-line-is-too-long的解决方法" aria-hidden="true">#</a> Idea运行报错Error running ‘Application‘: Command line is too long的解决方法</h2>
<p>首先找到项目里面的idea/workspace.xml文件，然后再找到
<code>&lt;component name=&quot;PropertiesComponent&quot;&gt;&lt;/component &gt;</code></p>
<p>标签，标签如下所示</p>
<p>然后再在component 标签里加一行 <property name="dynamic.classpath" value="true" />，就是变成下面这样</p>
<p>C:\WINDOWS\system32\drivers\etc</p>
<p>工作、生活娱乐的电脑要分开</p>
</template>
