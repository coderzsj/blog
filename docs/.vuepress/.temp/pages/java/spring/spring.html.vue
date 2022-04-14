<template><h2 id="spring-mvc-工作原理" tabindex="-1"><a class="header-anchor" href="#spring-mvc-工作原理" aria-hidden="true">#</a> spring mvc 工作原理</h2>
<p>其中核心类是 <code>DispatcherServlet</code>，它是一个 Servlet，顶层是实现的Servlet接口。</p>
<p>客户端发送请求-&gt;
前端控制器 <code>DispatcherServlet</code> 接受客户端请求 -&gt;
找到处理器映射 <code>HandlerMapping</code> 解析请求对应的 Handler-&gt;
<code>HandlerAdapter</code> 会根据 Handler 来调用真正的处理器开处理请求，并处理相应的业务逻辑 -&gt;
处理器返回一个模型视图 ModelAndView -&gt;
视图解析器进行解析 -&gt;
返回一个视图对象（jsp、freemarker、pdf...）-&gt;
前端控制器 DispatcherServlet 渲染数据（Moder）-&gt;
将得到视图对象返回给用户</p>
<h2 id="三级缓存" tabindex="-1"><a class="header-anchor" href="#三级缓存" aria-hidden="true">#</a> 三级缓存</h2>
<p>Spring在启动过程中，使用到了三个map，称为三级缓存。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DefaultSingletonBeanRegistry</span> <span class="token keyword">extends</span> <span class="token class-name">SimpleAliasRegistry</span> <span class="token keyword">implements</span> <span class="token class-name">SingletonBeanRegistry</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/** Cache of singleton objects: bean name --> bean instance */</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> singletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/** Cache of singleton factories: bean name --> ObjectFactory */</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">ObjectFactory</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span><span class="token punctuation">></span></span> singletonFactories <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/** Cache of early singleton objects: bean name --> bean instance */</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> earlySingletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Spring启动过程大致如下：</p>
<ol>
<li>创建beanFactory，加载配置文件</li>
<li>解析配置文件转化beanDefination，获取到bean的所有属性、依赖及初始化用到的各类处理器等</li>
<li>刷新beanFactory容器，初始化所有单例bean</li>
<li>注册所有的单例bean并返回可用的容器，一般为扩展的applicationContext</li>
</ol>
<h3 id="一级缓存" tabindex="-1"><a class="header-anchor" href="#一级缓存" aria-hidden="true">#</a> 一级缓存</h3>
<p>在第三步中，所有单例的bean初始化完成后会存放在一个Map(singletonObjects)中，beanName为key，单例bean为value。</p>
<p>第三步单例bean的初始化过程大致如下：</p>
<ol start="0">
<li>标记bean为创建中</li>
<li>new出bean对象</li>
<li>如果支持循环依赖则生成三级缓存，可以提前暴露bean</li>
<li>填充bean属性，解决属性依赖</li>
<li>初始化bean，处理Aware接口并执行各类bean后处理器，执行初始化方法，如果需要生成aop代理对象</li>
<li>如果存在循环依赖，解决之 – 这里有点问题，这一步是如果之前解决了aop循环依赖，则缓存中放置了提前生成的代理对象，然后使用原始bean继续执行初始化，所以需要再返回最终bean前，把原始bean置换为代理对象返回。</li>
<li>此时bean已经可以被使用，进行bean注册(标记)并注册销毁方法。</li>
<li>将bean放入容器中(一级缓存)，移除创建中标记及二三级缓存(后面再具体分析)</li>
</ol>
<h3 id="循环依赖及三级缓存" tabindex="-1"><a class="header-anchor" href="#循环依赖及三级缓存" aria-hidden="true">#</a> 循环依赖及三级缓存</h3>
<p>根据以上步骤可以看出bean初始化是一个相当复杂的过程，假如初始化A bean时，发现A bean依赖B bean,即A初始化执行到了第3步填充属性，需要注入B bean，此时B还没有初始化，则需要暂停A，先去初始化B，那么此时new出来的A对象放哪里，直接放在容器Map里显然不合适，半残品怎么能用，所以需要提供一个可以标记创建中bean(A)的Map，可以提前暴露正在创建的bean供其他bean依赖，而如果初始化A所依赖的bean B时，发现B也需要注入一个A的依赖(即发生循环依赖)，则B可以从创建中的beanMap中直接获取A对象（创建中）注入A，然后完成B的初始化，返回给正在注入属性的A，最终A也完成初始化，皆大欢喜。</p>
<p>如果配置不允许循环依赖，则上述缓存就用不到了，A 依赖B，就是创建B，B依赖C就去创建C，创建完了逐级返回就行，所以，一级缓存之后的其他缓存(二三级缓存)就是为了解决循环依赖！而配置支持循环依赖后，就一定要解决循环依赖吗？肯定不是！循环依赖在实际应用中也有，但不会太多，简单的应用场景是： controller注入service，service注入mapper，只有复杂的业务，可能service互相引用，有可能出现循环依赖，所以为了出现循环依赖才去解决，不出现就不解决，虽然支持循环依赖，但是只有在出现循环依赖时才真正暴露早期对象，否则只暴露个获取bean的方法，并没有真正暴露bean，因为这个方法不会被执行到，这块的实现就是三级缓存（singletonFactories），只缓存了一个单例bean工厂。</p>
<p>这个bean工厂不仅可以暴露早期bean还可以暴露代理bean，如果存在aop代理，则依赖的应该是代理对象，而不是原始的bean。而暴露原始bean是在单例bean初始化的第2步，填充属性第3步，生成代理对象第4步，这就矛盾了，A依赖到B并去解决B依赖时，要去初始化B，然后B又回来依赖A，而此时A还没有执行代理的过程，所以，需要在填充属性前就生成A的代理并暴露出去，第2步时机就刚刚好。</p>
<p>三级缓存的bean工厂getObject方式，实际执行的是getEarlyBeanReference，如果对象需要被代理(存在beanPostProcessors -&gt; SmartInstantiationAwareBeanPostProcessor)，则提前生成代理对象。</p>
<h3 id="二级缓存" tabindex="-1"><a class="header-anchor" href="#二级缓存" aria-hidden="true">#</a> 二级缓存</h3>
<p>三级缓存已经解决所有问题了，二级缓存用来做什么呢？为什么三级缓存不直接叫做二级缓存?这个应该是在缓存使用时决定的：</p>
<p>三级缓存中提到出现循环依赖才去解决，也就是说出现循环依赖时，才会执行工厂的getObject生成(获取)早期依赖，这个时候就需要给它挪个窝了，因为真正暴露的不是工厂，而是对象，所以需要使用一个新的缓存保存暴露的早期对象(earlySingletonObjects)，同时移除提前暴露的工厂，也不需要在多重循环依赖时每次去执行getObject(虽然个人觉得不会出问题，因为代理对象不会重复生成，详细可以了解下代理里面的逻辑，如wrapIfNecessary)。</p>
<div class="custom-container info"><p class="custom-container-title">总结</p>
<p>经过分析可以看到：</p>
<ol>
<li>不支持循环依赖情况下，只有一级缓存生效，二三级缓存用不到</li>
<li>二三级缓存就是为了解决循环依赖，且之所以是二三级缓存而不是二级缓存，主要是可以解决循环依赖对象需要提前被aop代理，以及如果没有循环依赖，早期的bean也不会真正暴露，不用提前执行代理过程，也不用重复执行代理过程。</li>
</ol>
</div>
<h2 id="自动装配" tabindex="-1"><a class="header-anchor" href="#自动装配" aria-hidden="true">#</a> 自动装配</h2>
<h3 id="spring中bean注入的三种形式" tabindex="-1"><a class="header-anchor" href="#spring中bean注入的三种形式" aria-hidden="true">#</a> spring中bean注入的三种形式</h3>
<ol>
<li>setter注入</li>
<li>构造器注入</li>
<li>属性注入</li>
</ol>
<h3 id="spring的两种配置方式" tabindex="-1"><a class="header-anchor" href="#spring的两种配置方式" aria-hidden="true">#</a> Spring的两种配置方式</h3>
<ol>
<li>基于XML的配置</li>
<li>基于JavaConfig类的配置方式</li>
</ol>
<h3 id="springbootconfiguration注解" tabindex="-1"><a class="header-anchor" href="#springbootconfiguration注解" aria-hidden="true">#</a> @SpringBootConfiguration注解</h3>
<p>复合注解,主要的有以下三个：</p>
<ul>
<li>@SpringBootConfiguration</li>
<li>@EnableAutoConfiguration</li>
<li>@ComponentScan</li>
</ul>
<p><strong>@SpringBootConfiguration</strong></p>
<p>这个注解之后会发现，原来该注解是@Configuration，一个JavaConfig配置类</p>
<p><strong>@ComponentScan</strong></p>
<p>组件扫描，这个扫描的范围是：SpringBoot主启动类的同级路径及子路径</p>
<p><strong>@EnableAutoConfiguration</strong></p>
<p>进入注解，发现@Import({AutoConfigurationImportSelector.class}) 导入了 AutoConfigurationImportSelector 这个类的bean定义，</p>
<p>返回的是要加载的Config配置文件的全包名</p>
<p>META-INF/spring.factories</p>
<p>spring boot自动装配的依赖jar包：</p>
<p>注解默认加载124个配置类</p>
<p>帮我们加载了各种已经写好的Config类文件，实现了这些JavaConfig配置文件的重复利用和组件化</p>
<div class="custom-container info"><p class="custom-container-title">总结</p>
<p>SpringBoot自动装配的本质就是通过Spring去读取META-INF/spring.factories中保存的配置类文件然后加载bean定义的过程。</p>
<p>如果是标了@Configuration注解，就是批量加载了里面的bean定义</p>
<p>如何实现”自动“：通过配置文件获取对应的批量配置类，然后通过配置类批量加载bean定义，只要有写好的配置文件spring.factories就实现了自动。</p>
</div>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>TYPE<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@AutoConfigurationPackage</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">AutoConfigurationImportSelector</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">EnableAutoConfiguration</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> ENABLED_OVERRIDE_PROPERTY <span class="token operator">=</span> <span class="token string">"spring.boot.enableautoconfiguration"</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">exclude</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">excludeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>Spring Boot 在启动的时候从类路径下的 META-INF/spring.factories 保存配置类的路径</p>
<p>中获取 EnableAutoConfiguration 指定的值，将这些值作为自动配置类导入到容器中，自动配置类就生效，帮我们进行自动配置工作。以前我们需要自己配置的东西，自动配置类都帮我们完成了。</p>
</template>
