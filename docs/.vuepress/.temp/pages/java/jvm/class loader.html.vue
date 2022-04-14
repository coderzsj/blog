<template><h2 id="双亲委派模型" tabindex="-1"><a class="header-anchor" href="#双亲委派模型" aria-hidden="true">#</a> 双亲委派模型</h2>
<p>避免用户自己编写的类动态替换JAVA的一些核心类，比如String。同时也避免了类的重复加载，因为JVM中区分不同类，不仅仅根据类名，相同的class文件被不同ClassLoader加载就是不同的两个类。</p>
<p>双亲委派模型的好处：</p>
<p>主要是为了安全性，便面用户自己编写的类动态替换JAVA的一些核心类，比如String。</p>
</template>
