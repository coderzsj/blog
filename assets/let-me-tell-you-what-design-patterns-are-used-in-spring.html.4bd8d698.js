import{b as n}from"./app.9da19d67.js";import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";const s={},e=n(`<h1 id="spring\u4E2D\u5E38\u7528\u7684\u8BBE\u8BA1\u6A21\u5F0F\u8FBE\u5230\u4E5D\u79CD-\u6211\u4EEC\u4E3E\u4F8B\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#spring\u4E2D\u5E38\u7528\u7684\u8BBE\u8BA1\u6A21\u5F0F\u8FBE\u5230\u4E5D\u79CD-\u6211\u4EEC\u4E3E\u4F8B\u8BF4\u660E" aria-hidden="true">#</a> spring\u4E2D\u5E38\u7528\u7684\u8BBE\u8BA1\u6A21\u5F0F\u8FBE\u5230\u4E5D\u79CD\uFF0C\u6211\u4EEC\u4E3E\u4F8B\u8BF4\u660E</h1><h2 id="_1\u3001\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F" aria-hidden="true">#</a> 1\u3001\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F</h2><p>\u53C8\u53EB\u505A\u9759\u6001\u5DE5\u5382\u65B9\u6CD5\uFF08StaticFactory Method\uFF09\u6A21\u5F0F\uFF0C\u4F46\u4E0D\u5C5E\u4E8E23\u79CDGOF\u8BBE\u8BA1\u6A21\u5F0F\u4E4B\u4E00\u3002</p><p>GoF\uFF08Gang of Four\uFF09\uFF0C\u4E2D\u6587\u540D\u2014\u2014\u56DB\u4EBA\u7EC4\u3002 \u300ADesign Patterns: Elements of Reusable Object-Oriented Software\u300B\uFF08\u5373\u540E\u8FF0\u300A\u8BBE\u8BA1\u6A21\u5F0F\u300B\u4E00\u4E66\uFF09</p><p>\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u7684\u5B9E\u8D28\u662F\u7531\u4E00\u4E2A\u5DE5\u5382\u7C7B\u6839\u636E\u4F20\u5165\u7684\u53C2\u6570\uFF0C\u52A8\u6001\u51B3\u5B9A\u5E94\u8BE5\u521B\u5EFA\u54EA\u4E00\u4E2A\u4EA7\u54C1\u7C7B\u3002</p><p>spring\u4E2D\u7684BeanFactory\u5C31\u662F\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u7684\u4F53\u73B0\uFF0C\u6839\u636E\u4F20\u5165\u4E00\u4E2A\u552F\u4E00\u7684\u6807\u8BC6\u6765\u83B7\u5F97bean\u5BF9\u8C61\uFF0C\u4F46\u662F\u5426\u662F\u5728\u4F20\u5165\u53C2\u6570\u540E\u521B\u5EFA\u8FD8\u662F\u4F20\u5165\u53C2\u6570\u524D\u521B\u5EFA\u8FD9\u4E2A\u8981\u6839\u636E\u5177\u4F53\u60C5\u51B5\u6765\u5B9A\u3002\u5982\u4E0B\u914D\u7F6E\uFF0C\u5C31\u662F\u5728 HelloItxx \u7C7B\u4E2D\u521B\u5EFA\u4E00\u4E2A itxxBean\u3002</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>singletonBean<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.itxxz.HelloItxxz<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span><span class="token punctuation">&gt;</span></span>
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>Hello ! \u8FD9\u662FsingletonBean!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>constructor-arg</span><span class="token punctuation">&gt;</span></span>
 &lt;/ bean&gt;
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>itxxzBean<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.itxxz.HelloItxxz<span class="token punctuation">&quot;</span></span>  <span class="token attr-name">singleton</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span><span class="token punctuation">&gt;</span></span>
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>Hello! \u8FD9\u662FitxxzBean! value&gt;
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>constructor-arg</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_2\u3001\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F" aria-hidden="true">#</a> 2\u3001\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F</h2><p>\u901A\u5E38\u7531\u5E94\u7528\u7A0B\u5E8F\u76F4\u63A5\u4F7F\u7528new\u521B\u5EFA\u65B0\u7684\u5BF9\u8C61\uFF0C\u4E3A\u4E86\u5C06\u5BF9\u8C61\u7684\u521B\u5EFA\u548C\u4F7F\u7528\u76F8\u5206\u79BB\uFF0C\u91C7\u7528\u5DE5\u5382\u6A21\u5F0F,\u5373\u5E94\u7528\u7A0B\u5E8F\u5C06\u5BF9\u8C61\u7684\u521B\u5EFA\u53CA\u521D\u59CB\u5316\u804C\u8D23\u4EA4\u7ED9\u5DE5\u5382\u5BF9\u8C61\u3002</p><p>\u4E00\u822C\u60C5\u51B5\u4E0B,\u5E94\u7528\u7A0B\u5E8F\u6709\u81EA\u5DF1\u7684\u5DE5\u5382\u5BF9\u8C61\u6765\u521B\u5EFAbean.\u5982\u679C\u5C06\u5E94\u7528\u7A0B\u5E8F\u81EA\u5DF1\u7684\u5DE5\u5382\u5BF9\u8C61\u4EA4\u7ED9Spring\u7BA1\u7406,\u90A3\u4E48Spring\u7BA1\u7406\u7684\u5C31\u4E0D\u662F\u666E\u901A\u7684bean,\u800C\u662F\u5DE5\u5382Bean\u3002</p><p>\u5C31\u4EE5\u5DE5\u5382\u65B9\u6CD5\u4E2D\u7684\u9759\u6001\u65B9\u6CD5\u4E3A\u4F8B\u8BB2\u89E3\u4E00\u4E0B\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Random</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StaticFactoryBean</span> <span class="token punctuation">{</span>
 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">createRandom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u5EFA\u4E00\u4E2Aconfig.xm\u914D\u7F6E\u6587\u4EF6\uFF0C\u5C06\u5176\u7EB3\u5165Spring\u5BB9\u5668\u6765\u7BA1\u7406,\u9700\u8981\u901A\u8FC7factory-method\u6307\u5B9A\u9759\u6001\u65B9\u6CD5\u540D\u79F0\uFF1A</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>random<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>example.chapter3.StaticFactoryBean<span class="token punctuation">&quot;</span></span> <span class="token attr-name">factory-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>createRandom<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>prototype<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u6D4B\u8BD5\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//\u8C03\u7528getBean()\u65F6,\u8FD4\u56DE\u968F\u673A\u6570.\u5982\u679C\u6CA1\u6709\u6307\u5B9Afactory-method,\u4F1A\u8FD4\u56DEStaticFactoryBean\u7684\u5B9E\u4F8B,\u5373\u8FD4\u56DE\u5DE5\u5382Bean\u7684\u5B9E\u4F8B      </span>
    <span class="token class-name">XmlBeanFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlBeanFactory</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathResource</span><span class="token punctuation">(</span><span class="token string">&quot;config.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u6211\u662FIT\u5B66\u4E60\u8005\u521B\u5EFA\u7684\u5B9E\u4F8B:&quot;</span><span class="token operator">+</span>factory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;random&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_3\u3001\u5355\u4F8B\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u5355\u4F8B\u6A21\u5F0F" aria-hidden="true">#</a> 3\u3001\u5355\u4F8B\u6A21\u5F0F</h2><p>\u4FDD\u8BC1\u4E00\u4E2A\u7C7B\u4EC5\u6709\u4E00\u4E2A\u5B9E\u4F8B\uFF0C\u5E76\u63D0\u4F9B\u4E00\u4E2A\u8BBF\u95EE\u5B83\u7684\u5168\u5C40\u8BBF\u95EE\u70B9\u3002</p><p>spring\u4E2D\u7684\u5355\u4F8B\u6A21\u5F0F\u5B8C\u6210\u4E86\u540E\u534A\u53E5\u8BDD\uFF0C\u5373\u63D0\u4F9B\u4E86\u5168\u5C40\u7684\u8BBF\u95EE\u70B9<code>BeanFactory</code>\u3002\u4F46\u6CA1\u6709\u4ECE\u6784\u9020\u5668\u7EA7\u522B\u53BB\u63A7\u5236\u5355\u4F8B\uFF0C\u8FD9\u662F\u56E0\u4E3Aspring\u7BA1\u7406\u7684\u662F\u662F\u4EFB\u610F\u7684java\u5BF9\u8C61\u3002</p><p>\u6838\u5FC3\u63D0\u793A\u70B9\uFF1ASpring\u4E0B\u9ED8\u8BA4\u7684bean\u5747\u4E3Asingleton\uFF0C\u53EF\u4EE5\u901A\u8FC7singleton=\u201Ctrue|false\u201D \u6216\u8005 scope=&quot;?&quot;\u6765\u6307\u5B9A\u3002</p><h2 id="_4\u3001\u9002\u914D\u5668\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_4\u3001\u9002\u914D\u5668\u6A21\u5F0F" aria-hidden="true">#</a> 4\u3001\u9002\u914D\u5668\u6A21\u5F0F</h2><p>\u5728Spring\u7684Aop\uFF08Aspect Oriented Program\uFF09\u4E2D\uFF0C\u4F7F\u7528\u7684<code>Advice </code>\uFF08\u901A\u77E5\uFF09\u6765\u589E\u5F3A\u88AB\u4EE3\u7406\u7C7B\u7684\u529F\u80FD\u3002Spring \u5B9E\u73B0\u8FD9\u4E00AOP\u529F\u80FD\u7684\u539F\u7406\u5C31\u4F7F\u7528\u4EE3\u7406\u6A21\u5F0F\uFF081\u3001JDK\u52A8\u6001\u4EE3\u7406\u30022\u3001CGLib\u5B57\u8282\u7801\u751F\u6210\u6280\u672F\u4EE3\u7406\u3002\uFF09\u5BF9\u7C7B\u8FDB\u884C\u65B9\u6CD5\u7EA7\u522B\u7684\u5207\u9762\u589E\u5F3A\uFF0C\u5373\uFF0C\u751F\u6210\u88AB\u4EE3\u7406\u7C7B\u7684\u4EE3\u7406\u7C7B\uFF0C \u5E76\u5728\u4EE3\u7406\u7C7B\u7684\u65B9\u6CD5\u524D\uFF0C\u8BBE\u7F6E\u62E6\u622A\u5668\uFF0C\u901A\u8FC7\u6267\u884C\u62E6\u622A\u5668\u4E2D\u7684\u5185\u5BB9\u589E\u5F3A\u4E86\u4EE3\u7406\u65B9\u6CD5\u7684\u529F\u80FD\uFF0C\u5B9E\u73B0\u7684\u9762\u5411\u5207\u9762\u7F16\u7A0B\u3002</p><p><code>Adapter</code>\u7C7B\u63A5\u53E3\uFF1A<code>Target</code></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AdvisorAdapter</span> <span class="token punctuation">{</span>

    <span class="token keyword">boolean</span> <span class="token function">supportsAdvice</span><span class="token punctuation">(</span><span class="token class-name">Advice</span> advice<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">MethodInterceptor</span> <span class="token function">getInterceptor</span><span class="token punctuation">(</span><span class="token class-name">Advisor</span> advisor<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>MethodBeforeAdviceAdapter</code>\u7C7B\uFF0CAdapter</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MethodBeforeAdviceAdapter</span> <span class="token keyword">implements</span> <span class="token class-name">AdvisorAdapter</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

     <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supportsAdvice</span><span class="token punctuation">(</span><span class="token class-name">Advice</span> advice<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">return</span> <span class="token punctuation">(</span>advice <span class="token keyword">instanceof</span> <span class="token class-name">MethodBeforeAdvice</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>

     <span class="token keyword">public</span> <span class="token class-name">MethodInterceptor</span> <span class="token function">getInterceptor</span><span class="token punctuation">(</span><span class="token class-name">Advisor</span> advisor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MethodBeforeAdvice</span> advice <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodBeforeAdvice</span><span class="token punctuation">)</span> advisor<span class="token punctuation">.</span><span class="token function">getAdvice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MethodBeforeAdviceInterceptor</span><span class="token punctuation">(</span>advice<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_5\u3001\u5305\u88C5\u5668\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_5\u3001\u5305\u88C5\u5668\u6A21\u5F0F" aria-hidden="true">#</a> 5\u3001\u5305\u88C5\u5668\u6A21\u5F0F</h2><p>\u5728\u6211\u4EEC\u7684\u9879\u76EE\u4E2D\u9047\u5230\u8FD9\u6837\u4E00\u4E2A\u95EE\u9898\uFF1A\u6211\u4EEC\u7684\u9879\u76EE\u9700\u8981\u8FDE\u63A5\u591A\u4E2A\u6570\u636E\u5E93\uFF0C\u800C\u4E14\u4E0D\u540C\u7684\u5BA2\u6237\u5728\u6BCF\u6B21\u8BBF\u95EE\u4E2D\u6839\u636E\u9700\u8981\u4F1A\u53BB\u8BBF\u95EE\u4E0D\u540C\u7684\u6570\u636E\u5E93\u3002\u6211\u4EEC\u4EE5\u5F80\u5728spring\u548Chibernate\u6846\u67B6\u4E2D\u603B\u662F\u914D\u7F6E\u4E00\u4E2A\u6570\u636E\u6E90\uFF0C\u56E0\u800C<code>sessionFactory</code>\u7684<code>dataSource</code>\u5C5E\u6027\u603B\u662F\u6307\u5411\u8FD9\u4E2A\u6570\u636E\u6E90\u5E76\u4E14\u6052\u5B9A\u4E0D\u53D8\uFF0C\u6240\u6709DAO\u5728\u4F7F\u7528<code>sessionFactory</code>\u7684\u65F6\u5019\u90FD\u662F\u901A\u8FC7\u8FD9\u4E2A\u6570\u636E\u6E90\u8BBF\u95EE\u6570\u636E\u5E93\u3002</p><p>\u4F46\u662F\u73B0\u5728\uFF0C\u7531\u4E8E\u9879\u76EE\u7684\u9700\u8981\uFF0C\u6211\u4EEC\u7684DAO\u5728\u8BBF\u95EE<code>sessionFactory</code>\u7684\u65F6\u5019\u90FD\u4E0D\u5F97\u4E0D\u5728\u591A\u4E2A\u6570\u636E\u6E90\u4E2D\u4E0D\u65AD\u5207\u6362\uFF0C\u95EE\u9898\u5C31\u51FA\u73B0\u4E86\uFF1A\u5982\u4F55\u8BA9<code>sessionFactory</code>\u5728\u6267\u884C\u6570\u636E\u6301\u4E45\u5316\u7684\u65F6\u5019\uFF0C\u6839\u636E\u5BA2\u6237\u7684\u9700\u6C42\u80FD\u591F\u52A8\u6001\u5207\u6362\u4E0D\u540C\u7684\u6570\u636E\u6E90\uFF1F\u6211\u4EEC\u80FD\u4E0D\u80FD\u5728spring\u7684\u6846\u67B6\u4E0B\u901A\u8FC7\u5C11\u91CF\u4FEE\u6539\u5F97\u5230\u89E3\u51B3\uFF1F\u662F\u5426\u6709\u4EC0\u4E48\u8BBE\u8BA1\u6A21\u5F0F\u53EF\u4EE5\u5229\u7528\u5462\uFF1F</p><p>\u9996\u5148\u60F3\u5230\u5728spring\u7684<code>applicationContext</code>\u4E2D\u914D\u7F6E\u6240\u6709\u7684<code>dataSource</code>\u3002\u8FD9\u4E9BdataSource\u53EF\u80FD\u662F\u5404\u79CD\u4E0D\u540C\u7C7B\u578B\u7684\uFF0C\u6BD4\u5982\u4E0D\u540C\u7684\u6570\u636E\u5E93\uFF1AOracle\u3001SQL Server\u3001MySQL\u7B49\uFF0C\u4E5F\u53EF\u80FD\u662F\u4E0D\u540C\u7684\u6570\u636E\u6E90\uFF1A\u6BD4\u5982<code>apache</code> \u63D0\u4F9B\u7684<code>org.apache.commons.dbcp.BasicDataSource</code>\u3001<code>spring</code>\u63D0\u4F9B\u7684<code>org.springframework.jndi.JndiObjectFactoryBean</code>\u7B49\u3002\u7136\u540E<code>sessionFactory</code>\u6839\u636E\u5BA2\u6237\u7684\u6BCF\u6B21\u8BF7\u6C42\uFF0C\u5C06<code>dataSource</code>\u5C5E\u6027\u8BBE\u7F6E\u6210\u4E0D\u540C\u7684\u6570\u636E\u6E90\uFF0C\u4EE5\u5230\u8FBE\u5207\u6362\u6570\u636E\u6E90\u7684\u76EE\u7684\u3002</p><p>spring\u4E2D\u7528\u5230\u7684\u5305\u88C5\u5668\u6A21\u5F0F\u5728\u7C7B\u540D\u4E0A\u6709\u4E24\u79CD\u8868\u73B0\uFF1A\u4E00\u79CD\u662F\u7C7B\u540D\u4E2D\u542B\u6709<code>Wrapper</code>\uFF0C\u53E6\u4E00\u79CD\u662F\u7C7B\u540D\u4E2D\u542B\u6709Decorator\u3002\u57FA\u672C\u4E0A\u90FD\u662F\u52A8\u6001\u5730\u7ED9\u4E00\u4E2A\u5BF9\u8C61\u6DFB\u52A0\u4E00\u4E9B\u989D\u5916\u7684\u804C\u8D23\u3002</p><p>decorator \u82F1[\u02C8dek\u0259re\u026At\u0259(r)] \u7F8E[\u02C8dek\u0259re\u026At\u0259r] n. \u5BA4\u5185\u88C5\u4FEE\u8BBE\u8BA1\u5E08; (\u623F\u5C4B\u7684)\u6CB9\u6F06\u5320\uFF0C\u88F1\u7CCA\u5320;</p><h2 id="_6\u3001\u4EE3\u7406\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_6\u3001\u4EE3\u7406\u6A21\u5F0F" aria-hidden="true">#</a> 6\u3001\u4EE3\u7406\u6A21\u5F0F</h2><p>\u4E3A\u5176\u4ED6\u5BF9\u8C61\u63D0\u4F9B\u4E00\u79CD\u4EE3\u7406\u4EE5\u63A7\u5236\u5BF9\u8FD9\u4E2A\u5BF9\u8C61\u7684\u8BBF\u95EE\u3002 \u4ECE\u7ED3\u6784\u4E0A\u6765\u770B\u548C<code>Decorator</code>\u6A21\u5F0F\u7C7B\u4F3C\uFF0C\u4F46<code>Proxy</code>\u662F\u63A7\u5236\uFF0C\u66F4\u50CF\u662F\u4E00\u79CD\u5BF9\u529F\u80FD\u7684\u9650\u5236\uFF0C\u800CDecorator\u662F\u589E\u52A0\u804C\u8D23\u3002</p><p>spring\u7684<code>Proxy</code>\u6A21\u5F0F\u5728aop\u4E2D\u6709\u4F53\u73B0\uFF0C\u6BD4\u5982JdkDynamicAopProxy\u548CCglib2AopProxy\u3002</p><p>proxy \u82F1[\u02C8pr\u0252ksi] \u7F8E[\u02C8pr\u0251\u02D0ksi] n. \u4EE3\u7406; \u4EE3\u7406\u4EBA; \u4EE3\u8868; \u4EE3\u7406\u6743; \u4EE3\u8868\u6743; \u53D7\u6258\u4EBA; (\u6D4B\u7B97\u7528\u7684)\u4EE3\u66FF\u7269; \u6307\u6807;</p><h2 id="_7\u3001\u89C2\u5BDF\u8005\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_7\u3001\u89C2\u5BDF\u8005\u6A21\u5F0F" aria-hidden="true">#</a> 7\u3001\u89C2\u5BDF\u8005\u6A21\u5F0F</h2><p>\u5B9A\u4E49\u5BF9\u8C61\u95F4\u7684\u4E00\u79CD\u4E00\u5BF9\u591A\u7684\u4F9D\u8D56\u5173\u7CFB\uFF0C\u5F53\u4E00\u4E2A\u5BF9\u8C61\u7684\u72B6\u6001\u53D1\u751F\u6539\u53D8\u65F6\uFF0C\u6240\u6709\u4F9D\u8D56\u4E8E\u5B83\u7684\u5BF9\u8C61\u90FD\u5F97\u5230\u901A\u77E5\u5E76\u88AB\u81EA\u52A8\u66F4\u65B0\u3002</p><p>spring\u4E2D<code>Observer</code>\u6A21\u5F0F\u5E38\u7528\u7684\u5730\u65B9\u662F<code>listener</code>\u7684\u5B9E\u73B0\u3002\u5982<code>ApplicationListener</code>\u3002</p><p>observer \u82F1[\u0259b\u02C8z\u025C\u02D0v\u0259(r)] \u7F8E[\u0259b\u02C8z\u025C\u02D0rv\u0259r] n. \u89C2\u5BDF\u8005; \u89C2\u5BDF\u5458; \u89C2\u5BDF\u5BB6; \u89C2\u6D4B\u8005; \u76EE\u51FB\u8005; \u65C1\u542C\u8005; \u8BC4\u8BBA\u5458;</p><h2 id="_8\u3001\u7B56\u7565\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_8\u3001\u7B56\u7565\u6A21\u5F0F" aria-hidden="true">#</a> 8\u3001\u7B56\u7565\u6A21\u5F0F</h2><p>\u5B9A\u4E49\u4E00\u7CFB\u5217\u7684\u7B97\u6CD5\uFF0C\u628A\u5B83\u4EEC\u4E00\u4E2A\u4E2A\u5C01\u88C5\u8D77\u6765\uFF0C\u5E76\u4E14\u4F7F\u5B83\u4EEC\u53EF\u76F8\u4E92\u66FF\u6362\u3002\u672C\u6A21\u5F0F\u4F7F\u5F97\u7B97\u6CD5\u53EF\u72EC\u7ACB\u4E8E\u4F7F\u7528\u5B83\u7684\u5BA2\u6237\u800C\u53D8\u5316\u3002</p><p>spring\u4E2D\u5728\u5B9E\u4F8B\u5316\u5BF9\u8C61\u7684\u65F6\u5019\u7528\u5230Strategy\u6A21\u5F0F</p><p>\u5728<code>SimpleInstantiationStrategy</code>\u4E2D\u6709\u5982\u4E0B\u4EE3\u7801\u8BF4\u660E\u4E86\u7B56\u7565\u6A21\u5F0F\u7684\u4F7F\u7528\u60C5\u51B5\uFF1A</p><p>strategy \u82F1[\u02C8str\xE6t\u0259d\u0292i] \u7F8E[\u02C8str\xE6t\u0259d\u0292i] n. \u7B56\u7565; \u8BA1\u7B56; \u884C\u52A8\u8BA1\u5212; \u7B56\u5212; \u89C4\u5212; \u90E8\u7F72; \u7EDF\u7B79\u5B89\u6392; \u6218\u7565; \u6218\u7565\u90E8\u7F72;</p><h2 id="_9\u3001\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_9\u3001\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F" aria-hidden="true">#</a> 9\u3001\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F</h2><p>\u5B9A\u4E49\u4E00\u4E2A\u64CD\u4F5C\u4E2D\u7684\u7B97\u6CD5\u7684\u9AA8\u67B6\uFF0C\u800C\u5C06\u4E00\u4E9B\u6B65\u9AA4\u5EF6\u8FDF\u5230\u5B50\u7C7B\u4E2D\u3002<code>Template Method</code>\u4F7F\u5F97\u5B50\u7C7B\u53EF\u4EE5\u4E0D\u6539\u53D8\u4E00\u4E2A\u7B97\u6CD5\u7684\u7ED3\u6784\u5373\u53EF\u91CD\u5B9A\u4E49\u8BE5\u7B97\u6CD5\u7684\u67D0\u4E9B\u7279\u5B9A\u6B65\u9AA4\u3002</p><p><code>Template Method</code>\u6A21\u5F0F\u4E00\u822C\u662F\u9700\u8981\u7EE7\u627F\u7684\u3002\u8FD9\u91CC\u60F3\u8981\u63A2\u8BA8\u53E6\u4E00\u79CD\u5BF9<code>Template Method</code>\u7684\u7406\u89E3\u3002spring\u4E2D\u7684<code>JdbcTemplate</code>\uFF0C\u5728\u7528\u8FD9\u4E2A\u7C7B\u65F6\u5E76\u4E0D\u60F3\u53BB\u7EE7\u627F\u8FD9\u4E2A\u7C7B\uFF0C\u56E0\u4E3A\u8FD9\u4E2A\u7C7B\u7684\u65B9\u6CD5\u592A\u591A\uFF0C\u4F46\u662F\u6211\u4EEC\u8FD8\u662F\u60F3\u7528\u5230<code>JdbcTemplate</code>\u5DF2\u6709\u7684\u7A33\u5B9A\u7684\u3001\u516C\u7528\u7684\u6570\u636E\u5E93\u8FDE\u63A5\uFF0C\u90A3\u4E48\u6211\u4EEC\u600E\u4E48\u529E\u5462\uFF1F\u6211\u4EEC\u53EF\u4EE5\u628A\u53D8\u5316\u7684\u4E1C\u897F\u62BD\u51FA\u6765\u4F5C\u4E3A\u4E00\u4E2A\u53C2\u6570\u4F20\u5165<code>JdbcTemplate</code>\u7684\u65B9\u6CD5\u4E2D\u3002\u4F46\u662F\u53D8\u5316\u7684\u4E1C\u897F\u662F\u4E00\u6BB5\u4EE3\u7801\uFF0C\u800C\u4E14\u8FD9\u6BB5\u4EE3\u7801\u4F1A\u7528\u5230<code>JdbcTemplate</code>\u4E2D\u7684\u53D8\u91CF\u3002\u600E\u4E48\u529E\uFF1F\u90A3\u6211\u4EEC\u5C31\u7528\u56DE\u8C03\u5BF9\u8C61\u5427\u3002</p><p>\u5728\u8FD9\u4E2A\u56DE\u8C03\u5BF9\u8C61\u4E2D\u5B9A\u4E49\u4E00\u4E2A\u64CD\u7EB5<code>JdbcTemplate</code>\u4E2D\u53D8\u91CF\u7684\u65B9\u6CD5\uFF0C\u6211\u4EEC\u53BB\u5B9E\u73B0\u8FD9\u4E2A\u65B9\u6CD5\uFF0C\u5C31\u628A\u53D8\u5316\u7684\u4E1C\u897F\u96C6\u4E2D\u5230\u8FD9\u91CC\u4E86\u3002\u7136\u540E\u6211\u4EEC\u518D\u4F20\u5165\u8FD9\u4E2A\u56DE\u8C03\u5BF9\u8C61\u5230JdbcTemplate\uFF0C\u4ECE\u800C\u5B8C\u6210\u4E86\u8C03\u7528\u3002\u8FD9\u53EF\u80FD\u662F<code>Template Method</code>\u4E0D\u9700\u8981\u7EE7\u627F\u7684\u53E6\u4E00\u79CD\u5B9E\u73B0\u65B9\u5F0F\u3002</p><p>\u4E00\u4E2A\u5177\u4F53\u7684\u4F8B\u5B50\uFF1A JdbcTemplate\u4E2D\u7684<code>execute</code>\u65B9\u6CD5</p>`,50);function t(p,c){return e}var u=a(s,[["render",t],["__file","let-me-tell-you-what-design-patterns-are-used-in-spring.html.vue"]]);export{u as default};
