<template><h2 id="boot-flow" tabindex="-1"><a class="header-anchor" href="#boot-flow" aria-hidden="true">#</a> boot flow</h2>
<h2 id="自动装配流程" tabindex="-1"><a class="header-anchor" href="#自动装配流程" aria-hidden="true">#</a> 自动装配流程</h2>
<p>里面有一个 main 方法运行了一个 run()方法，在 run 方法中必须要传入一个被@SpringBootApplication 注解的类。</p>
<p>@SpringBootApplication
SpringBoot 应用标注在某个类上说明这个类是 SpringBoot 的主配置类，SpringBoot 就会运行这个类的 main 方法来启动 SpringBoot 项目。</p>
<p>那@SpringBootApplication 注解到底是什么呢，点进去看看：</p>
<p>发现@@SpringBootApplication 是一个组合注解。</p>
<h2 id="springbootconfiguration" tabindex="-1"><a class="header-anchor" href="#springbootconfiguration" aria-hidden="true">#</a> @SpringBootConfiguration</h2>
<p>先看看@SpringBootConfiguration 注解：</p>
</template>
