<template><h2 id="spring中常用的设计模式达到九种-我们举例说明。" tabindex="-1"><a class="header-anchor" href="#spring中常用的设计模式达到九种-我们举例说明。" aria-hidden="true">#</a> spring中常用的设计模式达到九种，我们举例说明。</h2>
<h3 id="_1、简单工厂模式" tabindex="-1"><a class="header-anchor" href="#_1、简单工厂模式" aria-hidden="true">#</a> 1、简单工厂模式</h3>
<p>又叫做静态工厂方法（StaticFactory Method）模式，但不属于23种GOF设计模式之一。</p>
<p>GoF（Gang of Four），中文名——四人组。 《Design Patterns: Elements of Reusable Object-Oriented Software》（即后述《设计模式》一书）</p>
<p>简单工厂模式的实质是由一个工厂类根据传入的参数，动态决定应该创建哪一个产品类。</p>
<p>spring中的BeanFactory就是简单工厂模式的体现，根据传入一个唯一的标识来获得bean对象，但是否是在传入参数后创建还是传入参数前创建这个要根据具体情况来定。如下配置，就是在 HelloItxx 类中创建一个 itxxBean。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>singletonBean<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.itxxz.HelloItxxz<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span><span class="token punctuation">></span></span>
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>Hello ! 这是singletonBean!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>constructor-arg</span><span class="token punctuation">></span></span>
 &lt;/ bean>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>itxxzBean<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.itxxz.HelloItxxz<span class="token punctuation">"</span></span>  <span class="token attr-name">singleton</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span><span class="token punctuation">></span></span>
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>Hello! 这是itxxzBean! value>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>constructor-arg</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_2、工厂方法模式" tabindex="-1"><a class="header-anchor" href="#_2、工厂方法模式" aria-hidden="true">#</a> 2、工厂方法模式</h3>
<p>通常由应用程序直接使用new创建新的对象，，为了将对象的创建和使用相分离，采用工厂模式,即应用程序将对象的创建及初始化职责交给工厂对象。</p>
<p>一般情况下,应用程序有自己的工厂对象来创建bean.如果将应用程序自己的工厂对象交给Spring管理,那么Spring管理的就不是普通的bean,而是工厂Bean。</p>
<p>就以工厂方法中的静态方法为例讲解一下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Random</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StaticFactoryBean</span> <span class="token punctuation">{</span>
 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">createRandom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>建一个config.xm配置文件，将其纳入Spring容器来管理,需要通过factory-method指定静态方法名称：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>random<span class="token punctuation">"</span></span>
<span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example.chapter3.StaticFactoryBean<span class="token punctuation">"</span></span> <span class="token attr-name">factory-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>createRandom<span class="token punctuation">"</span></span>
<span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>prototype<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>测试：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//调用getBean()时,返回随机数.如果没有指定factory-method,会返回StaticFactoryBean的实例,即返回工厂Bean的实例      </span>
    <span class="token class-name">XmlBeanFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlBeanFactory</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathResource</span><span class="token punctuation">(</span><span class="token string">"config.xml"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我是IT学习者创建的实例:"</span><span class="token operator">+</span>factory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"random"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_3、单例模式" tabindex="-1"><a class="header-anchor" href="#_3、单例模式" aria-hidden="true">#</a> 3、单例模式</h3>
<p>保证一个类仅有一个实例，并提供一个访问它的全局访问点。</p>
<p>spring中的单例模式完成了后半句话，即提供了全局的访问点<code>BeanFactory</code>。但没有从构造器级别去控制单例，这是因为spring管理的是是任意的java对象。</p>
<p>核心提示点：Spring下默认的bean均为singleton，可以通过singleton=“true|false” 或者 scope=&quot;?&quot;来指定。</p>
<h3 id="_4、适配器模式" tabindex="-1"><a class="header-anchor" href="#_4、适配器模式" aria-hidden="true">#</a> 4、适配器模式</h3>
<p>在Spring的Aop（Aspect Oriented Program）中，使用的<code>Advice </code>（通知）来增强被代理类的功能。Spring 实现这一AOP功能的原理就使用代理模式（1、JDK动态代理。2、CGLib字节码生成技术代理。）对类进行方法级别的切面增强，即，生成被代理类的代理类， 并在代理类的方法前，设置拦截器，通过执行拦截器中的内容增强了代理方法的功能，实现的面向切面编程。</p>
<p><code>Adapter</code>类接口：<code>Target</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AdvisorAdapter</span> <span class="token punctuation">{</span>

    <span class="token keyword">boolean</span> <span class="token function">supportsAdvice</span><span class="token punctuation">(</span><span class="token class-name">Advice</span> advice<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">MethodInterceptor</span> <span class="token function">getInterceptor</span><span class="token punctuation">(</span><span class="token class-name">Advisor</span> advisor<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>MethodBeforeAdviceAdapter</code>类，Adapter</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MethodBeforeAdviceAdapter</span> <span class="token keyword">implements</span> <span class="token class-name">AdvisorAdapter</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

     <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supportsAdvice</span><span class="token punctuation">(</span><span class="token class-name">Advice</span> advice<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">return</span> <span class="token punctuation">(</span>advice <span class="token keyword">instanceof</span> <span class="token class-name">MethodBeforeAdvice</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>

     <span class="token keyword">public</span> <span class="token class-name">MethodInterceptor</span> <span class="token function">getInterceptor</span><span class="token punctuation">(</span><span class="token class-name">Advisor</span> advisor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MethodBeforeAdvice</span> advice <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodBeforeAdvice</span><span class="token punctuation">)</span> advisor<span class="token punctuation">.</span><span class="token function">getAdvice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MethodBeforeAdviceInterceptor</span><span class="token punctuation">(</span>advice<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_5、包装器模式" tabindex="-1"><a class="header-anchor" href="#_5、包装器模式" aria-hidden="true">#</a> 5、包装器模式</h3>
<p>在我们的项目中遇到这样一个问题：我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同的数据库。我们以往在spring和hibernate框架中总是配置一个数据源，因而<code>sessionFactory</code>的<code>dataSource</code>属性总是指向这个数据源并且恒定不变，所有DAO在使用<code>sessionFactory</code>的时候都是通过这个数据源访问数据库。</p>
<p>但是现在，由于项目的需要，我们的DAO在访问<code>sessionFactory</code>的时候都不得不在多个数据源中不断切换，问题就出现了：如何让<code>sessionFactory</code>在执行数据持久化的时候，根据客户的需求能够动态切换不同的数据源？我们能不能在spring的框架下通过少量修改得到解决？是否有什么设计模式可以利用呢？</p>
<p>首先想到在spring的<code>applicationContext</code>中配置所有的<code>dataSource</code>。这些dataSource可能是各种不同类型的，比如不同的数据库：Oracle、SQL Server、MySQL等，也可能是不同的数据源：比如<code>apache</code> 提供的<code>org.apache.commons.dbcp.BasicDataSource</code>、<code>spring</code>提供的<code>org.springframework.jndi.JndiObjectFactoryBean</code>等。然后<code>sessionFactory</code>根据客户的每次请求，将<code>dataSource</code>属性设置成不同的数据源，以到达切换数据源的目的。</p>
<p>spring中用到的包装器模式在类名上有两种表现：一种是类名中含有<code>Wrapper</code>，另一种是类名中含有Decorator。基本上都是动态地给一个对象添加一些额外的职责。</p>
<p>decorator	英[ˈdekəreɪtə(r)] 美[ˈdekəreɪtər] n.	室内装修设计师; (房屋的)油漆匠，裱糊匠;</p>
<h3 id="_6、代理模式" tabindex="-1"><a class="header-anchor" href="#_6、代理模式" aria-hidden="true">#</a> 6、代理模式</h3>
<p>为其他对象提供一种代理以控制对这个对象的访问。  从结构上来看和<code>Decorator</code>模式类似，但<code>Proxy</code>是控制，更像是一种对功能的限制，而Decorator是增加职责。</p>
<p>spring的<code>Proxy</code>模式在aop中有体现，比如JdkDynamicAopProxy和Cglib2AopProxy。</p>
<p>proxy	英[ˈprɒksi] 美[ˈprɑːksi] n.	代理; 代理人; 代表; 代理权; 代表权; 受托人; (测算用的)代替物; 指标;</p>
<h3 id="_7、观察者模式" tabindex="-1"><a class="header-anchor" href="#_7、观察者模式" aria-hidden="true">#</a> 7、观察者模式</h3>
<p>定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。</p>
<p>spring中<code>Observer</code>模式常用的地方是<code>listener</code>的实现。如<code>ApplicationListener</code>。</p>
<p>observer	英[əbˈzɜːvə(r)] 美[əbˈzɜːrvər] n.	观察者; 观察员; 观察家; 观测者; 目击者; 旁听者; 评论员;</p>
<h3 id="_8、策略模式" tabindex="-1"><a class="header-anchor" href="#_8、策略模式" aria-hidden="true">#</a> 8、策略模式</h3>
<p>定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。本模式使得算法可独立于使用它的客户而变化。</p>
<p>spring中在实例化对象的时候用到Strategy模式</p>
<p>在<code>SimpleInstantiationStrategy</code>中有如下代码说明了策略模式的使用情况：</p>
<p>strategy	英[ˈstrætədʒi] 美[ˈstrætədʒi] n.	策略; 计策; 行动计划; 策划; 规划; 部署; 统筹安排; 战略; 战略部署;</p>
<h3 id="_9、模板方法模式" tabindex="-1"><a class="header-anchor" href="#_9、模板方法模式" aria-hidden="true">#</a> 9、模板方法模式</h3>
<p>定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。<code>Template Method</code>使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。</p>
<p><code>Template Method</code>模式一般是需要继承的。这里想要探讨另一种对<code>Template Method</code>的理解。spring中的<code>JdbcTemplate</code>，在用这个类时并不想去继承这个类，因为这个类的方法太多，但是我们还是想用到<code>JdbcTemplate</code>已有的稳定的、公用的数据库连接，那么我们怎么办呢？我们可以把变化的东西抽出来作为一个参数传入<code>JdbcTemplate</code>的方法中。但是变化的东西是一段代码，而且这段代码会用到<code>JdbcTemplate</code>中的变量。怎么办？那我们就用回调对象吧。</p>
<p>在这个回调对象中定义一个操纵<code>JdbcTemplate</code>中变量的方法，我们去实现这个方法，就把变化的东西集中到这里了。然后我们再传入这个回调对象到JdbcTemplate，从而完成了调用。这可能是<code>Template Method</code>不需要继承的另一种实现方式。</p>
<p>一个具体的例子： JdbcTemplate中的<code>execute</code>方法</p>
</template>
