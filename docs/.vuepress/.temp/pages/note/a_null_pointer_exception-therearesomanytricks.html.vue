<template><h2 id="一个-nullpointerexception-竟然有这么多花样" tabindex="-1"><a class="header-anchor" href="#一个-nullpointerexception-竟然有这么多花样" aria-hidden="true">#</a> 一个 NullPointerException ，竟然有这么多花样！</h2>
<p>敢问各位大佬，在使用spring 的缓存注解@Cacheable 时，缓存配置的时redis，客户端Jedis ,生产时单点，线上是否碰到过随机的空指针异常，有spring的RedisCache在get时抛出的；</p>
<p>这里就涉及到一个重要的问题，那就是提问的艺术</p>
<p>比如说：我们常见的错误提问方式是：</p>
<p>你们有没有遇到过XXX问题？【X】</p>
<p>看到这样的问题着实让人脑壳疼，其实简单的常见问题网上搜一下都有</p>
<p>复杂的问题基本和业务相关，别人碰到和你一样的问题的概率很小</p>
<p>比较正确的提问姿势应该是把问题具体描述出来</p>
<p>我做了什么事， 我期望的结果是XX，但是目前出现的结果又是XX ，异常栈信息如下XX</p>
<p>感兴趣的自然会出声，不感兴趣的那也没办法</p>
<p>等他出来，再做工作交接，但是得把现有的问题处理处理，再交接。</p>
<p>要写个交接文档，包括流程、操作表之类的，代码实现具体类、方法。</p>
<p>有还有另一种奇葩问法：</p>
<p>XX功能怎么做，如何实现？</p>
</template>
