<template><h1 id="一步步带你了解前后端分离利器之jwt" tabindex="-1"><a class="header-anchor" href="#一步步带你了解前后端分离利器之jwt" aria-hidden="true">#</a> 一步步带你了解前后端分离利器之JWT</h1>
<h2 id="一、http的无状态性" tabindex="-1"><a class="header-anchor" href="#一、http的无状态性" aria-hidden="true">#</a> 一、HTTP的无状态性</h2>
<p>HTTP 是无状态协议，它不对之前发送过的请求和响应的状态进行管理。也就是说，无法根据之前的状态进行本次的请求处理。假设要求登录认证的 Web 页面本身无法进行状态的管理（不记录已登录的状态），那么每次跳转新页面不是要再次登录，就是要在每次请求报文中附加参数来管理登录状态。</p>
<p>不可否认，无状态协议当然也有它的优点。由于不必保存状态，自然可减少服务器的CPU及内存资源的消耗。从另一侧面来说，也正是因为 <code>HTTP</code> 协议本身是非常简单的，所以才会被应用在各种场景里。</p>
<h2 id="二、cookie-技术的引入" tabindex="-1"><a class="header-anchor" href="#二、cookie-技术的引入" aria-hidden="true">#</a> 二、Cookie 技术的引入</h2>
<p>如果让服务器管理全部客户端状态则会成为负担，保留无状态协议这个特征的同时又要解决类似的矛盾问题，于是引入了 Cookie 技术。Cookie 技术通过在请求和响应报文中写入Cookie信息来控制客户端的状态。</p>
<p>Cookie 会根据从服务器端发送的响应报文内的一个叫做<code>Set-Cookie</code> 的首部字段信息，通知客户端保存 Cookie。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入 Cookie 值后发送出去。</p>
<p>1、没有 Cookie 信息状态下的请求（来源《图解HTTP》）</p>
<p>客户端 保存 Cookie</p>
<p>请求 -&gt; ①保存请求</p>
<p>响应 &lt;- ②在响应中添加Cookie后返回</p>
<p>服务器 生成Cookie记住是向谁发送到</p>
<p>2、第 2 次以后（存有 Cookie 信息状态） 的请求（来源《图解HTTP》）</p>
<p>Client</p>
<p>request -&gt; ③请求中添加Cookie后send</p>
<p>response &lt;-</p>
<p>server ④检查Cookie （是刚才生成的Cookie）</p>
<p>3、详细介绍Cookie 传输过程</p>
<p>server发现client发送过来的Cookie后，回去check 是从哪一个client发来的request，然后对比server上的记录，最后得到之前的状态信息。</p>
<h2 id="三、基于表单的认证" tabindex="-1"><a class="header-anchor" href="#三、基于表单的认证" aria-hidden="true">#</a> 三、基于表单的认证</h2>
<p>目前用户的认证多半是基于表单的认证，基于表单的认证一般会使用 Cookie 来管理Session（Session会话，Session代表着服务器和客户端一次会话的过程，直到Session失效（服务端关闭）或者客户端关闭时结束）。基于表单认证本身是通过服务器端的 Web应用，将客户端发送过来的用户ID和密码与之前登录过的信息做匹配来进行认证的。</p>
<p>但鉴于 HTTP 是无状态协议，之前已认证成功的用户状态无法通过协议层面保存下来。即无法实现状态管理，因此即使当该用户下一次继续访问，也无法区分它与其他的用户。于是我们会使用Cookie来管理Session，以弥补HTTP协议中不存在状态管理功能。</p>
<h2 id="四、session存储位置以及集群情况下的问题" tabindex="-1"><a class="header-anchor" href="#四、session存储位置以及集群情况下的问题" aria-hidden="true">#</a> 四、Session存储位置以及集群情况下的问题</h2>
<p>Session 是存储在Web服务器（例如：Tomcat）中的，并针对每个客户端（客户），通过SessionID来区别不同用户的。Session是以Cookie技术或URL重写实现，默认以Cookie技术实现，服务端会给这次会话创造一个JSESSIONID的Cookie值。</p>
<p>但是一个显著的问题就是，在集群模式下如果通过Nginx负载均衡的时候，如果有一个用户登录的时候请求被分配到服务器A上，登录成功后设置的Session就会存放在服务器A上了，但是在服务器B上却没有该用户的Session数据，当用户再次发起一个请求的时候，此时请求如果被分配到服务器B上，则就不会查询到该用户的登录状态，就会出现登录失败的情况！</p>
<p>一种可以想到的方式就是将多个Web服务器上存储的Session统一存储到某一存储介质中，保证进集群中的每一台机器都可以看到所有相同Session数据，这里的同步体现在所有的Session存储在同一的存储介质里边。</p>
<p>幸运的是我们常用的Tomcat容器已经为我们提供了一个接口，可以让我们实现将Session存储到除当前服务器之外的其他存储介质上，例如Redis等。</p>
<p>了解Spring Session的小伙伴可能都会知道<code>Spring Session</code>的本质就是通过实现Tomcat提供的该接口将Session存储到Redis中，以此来实现Session的统一存储管理，对Spring Session有兴趣的小伙伴可以参考往期的文章：</p>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzI1NDQ3MjQxNA==&amp;mid=2247483665&amp;idx=1&amp;sn=126be172d9804cdcf75a17b50dcd48fa&amp;chksm=e9c5f8a0deb271b62898af1266da1bde81aed33b231b7c79216dd550d467401728bb6726f5bd&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">使用Redis存储Nginx+Tomcat负载均衡集群的Session<ExternalLinkIcon/></a></p>
<h2 id="五、小结与需求痛点" tabindex="-1"><a class="header-anchor" href="#五、小结与需求痛点" aria-hidden="true">#</a> 五、小结与需求痛点</h2>
<p>Session和Cookie的目的相同，都是为了克服HTTP协议无状态的缺陷，但完成的方法不同。Session通过Cookie，在客户端保存SessionID，而将用户的其他会话消息保存在服务端的Session对象中，与此相对的，Cookie需要将所有信息都保存在客户端。因此Cookie存在着一定的安全隐患，例如本地Cookie中保存的用户名密码被破译，或Cookie被其他网站收集，例如：</p>
<ol>
<li>
<p>appA主动设置域B cookie，让域B cookie获取；</p>
</li>
<li>
<p>XSS，在appA上通过JavaScript获取document.cookie，并传递给自己的appB。</p>
</li>
</ol>
<p>上述过程我们简单的描述了Session的演进过程还有使用同步的方式解决Session在集群的时候出现的问题，但是我们意识到了使用Spring Session的方式来实现Session的同步是一件相对比较麻烦的事情，我们虽然使用Redis来进行同步，但是Redis并不是100%可靠的，我们需要对Redis搭建集群、进行主从同步复制、进行持久化等，显然这是一件很复杂的事情，因此有没有一种小而轻便的方式来实现我们的这种<strong>认证需求</strong>！那就是JWT了！</p>
<p>除了上述我们遇到的问题之外，在目前前后端分离的大环境下经常会遇到需要根据用户来分配权限和显示相对应信息的问题，虽然传统的Cookie和Session机制可以解决这个问题，但就通用性而言，JWT（JSON Web Token）相对来说更好。</p>
<p>看到这里很多小伙伴都已经按捺不住了！那JWT到底是什么呢？</p>
<p>##六、JWT是什么</p>
<p>Json web token (JWT)，是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准（(RFC 7519)。该标准被设计为紧凑且安全的，一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息。当然该标准也可直接被用于认证，也可被加密。</p>
<p><strong>JWT的几个特点：</strong></p>
<p>1、由于它们的尺寸较小，JWT可以通过URL，POST参数或HTTP头部发送。 另外，尺寸越小意味着传输速度越快。</p>
<p>2、有效载荷包含有关用户的所有必需信息，避免了多次查询数据库的需要。</p>
<p><strong>JWT的使用场景：</strong></p>
<p>1.验证 这是使用JWT 最常见的情况。 一旦用户登录，每个后续请求将包括JWT。它将允许用户访问该令牌允许的路由，服务和资源。 单点登录是当今广泛使用JWT的一项功能，因为它的开销很小，而且能够轻松地跨不同域使用。
2.信息交换 JWT 是在各方之间安全传输信息的好方法， 因为JWT可以被签名（例如使用公钥/私钥对进行签名）。所以你可以确定发件人是他们说的那个人。 此外，由于使用头部（header）和有效载荷（payload）计算签名，因此您还可以验证内容是否未被篡改。</p>
<p>##七、JWT的结构说明</p>
<p>JWT包含三个由点（.）分隔的部分，它们是：</p>
<ul>
<li>头部（header）</li>
<li>有效负载（payload）</li>
<li>签名（signature）</li>
</ul>
<p>因此，JWT通常看起来如下所示:</p>
<p>xxxxx.yyyyy.zzzzz</p>
<p>1、头部（header）</p>
<p>头部（header）通常由两部分组成：令牌的类型（即JWT）和正在使用的散列算法（如HMAC SHA256或RSA）。如下所示：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"alg"</span><span class="token operator">:</span> <span class="token string">"HS256"</span><span class="token punctuation">,</span>
  <span class="token property">"typ"</span><span class="token operator">:</span> <span class="token string">"JWT"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后，将这个JSON用Base64编码，形成JWT的第一部分。</p>
<p>2、有效负载（payload）</p>
<p>令牌的第二部分是包含声明的有效载荷。 声明是关于实体（通常是用户）和附加元数据的声明。 有三种类型的声明：</p>
<p>标准中注册的声明；</p>
<p>公开声明；</p>
<p>私人声明；</p>
<p>（1）标准中注册的声明：这是一组预先定义的声明，这些声明不是强制性的，但建议提供一套有用的，可互操作的声明。 如下：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>iss: jwt签发者

sub: jwt所面向的用户

aud: 接收jwt的一方

exp: jwt的过期时间，这个过期时间必须要大于签发时间

nbf: 定义在什么时间之前，该jwt都是不可用的.

iat: jwt的签发时间

jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>注意：声明名称只有三个字符长，因为JWT是紧凑的。</p>
<p>（2）公开声明：这些可以由使用JWT的人员随意定义。 但为避免冲突，应在IANA JSON Web令牌注册表中定义它们，或者将其定义为包含防冲突命名空间的URI。</p>
<p>（3）私人声明：这是为了共享使用它们的当事方之间共享信息而创建的声明，既不是登记声明，也不是公开声明。</p>
<p>示例如下：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
 <span class="token property">"sub"</span><span class="token operator">:</span> <span class="token string">"1234567890"</span><span class="token punctuation">,</span>
 <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"john"</span><span class="token punctuation">,</span>
<span class="token property">"admin"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后将有效载荷进行Base64编码，以形成JSON Web令牌的第二部分。</p>
<p>3、签名（signature）</p>
<p>要创建签名部分，您必须采用头部（header），有效载荷（payload），密钥（secret），以及头部中指定的算法。例如，如果你想使用HMACSHA256算法，签名将按以下方式创建：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>HMACSHA256<span class="token punctuation">{</span>
base64UrlEncoded(header)+<span class="token string">"."</span>+base64UrlEncoded(payload)<span class="token punctuation">,</span>
secret
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>签名通常用于验证JWT的发件人是谁，并JWT在传送的过程中不被篡改。</p>
<p>注意：上图红框中的secret是保存在服务器端的，JWT的签发生成也是在服务器端的，secret就是用来进行JWT的签发和jwt的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个secret，那就意味着客户端是可以自我签发jwt了。</p>
<p>4、案例演示</p>
<p>显示了一个登录请求成功之后服务端返回的Token，它由编码头部（header）、编码有效载荷（payload）和签名（signature）通过（.）拼接而成：</p>
<p>如果需要，你可以使用jwt.io的Debugger工具，来编码、验证和生成JWT。操作界面如下：</p>
<h2 id="八、jwt的工作原理" tabindex="-1"><a class="header-anchor" href="#八、jwt的工作原理" aria-hidden="true">#</a> 八、JWT的工作原理</h2>
<p>在身份验证中，当用户使用他们的凭证（如用户名、密码）成功登录时，后台服务器将返回一个token，前端接收到这个token将其保存在本地（通常在本地存储中，也可以使用Cookie，但不是传统方法中创建会话，服务器并返回一个cookie）。下次用户想要访问受保护的路由或资源时，就将本地保存的token放在头部Header中发送到后台服务器。服务器接收到请求，检查头部中token的存在，如果存在就允许访问受保护的路由或资源，否则就不允许。如下所示：</p>
<p>一般默认的Value是以“<code>Bearer</code> ”开始，注意这里的<code>Bearer</code>之后有一个空格，以便后端进行分割。</p>
<p>这是一种无状态身份验证机制，因为用户状态永远不会保存在服务器内存中。由于JWT是独立的，所有必要的信息都在那里，所以减少了多次查询数据库的需求。</p>
<h2 id="九、总结" tabindex="-1"><a class="header-anchor" href="#九、总结" aria-hidden="true">#</a> 九、总结</h2>
<p>1、优点</p>
<ul>
<li>（1）因为Json的通用性，所以JWT 是可以进行跨语言支持的，像Java、JavaScript、NodeJS、PHP等很多语言都可以使用。</li>
<li>（2）因为有了payload部分，所以JWT 可以在自身存储一些其他业务逻辑所必要的非敏感信息。</li>
<li>（3）便于传输，JWT 的构成非常简单，字节占用很小，所以它是非常便于传输的。</li>
<li>（4）它不需要在服务端保存会话信息, 所以它易于应用的扩展</li>
</ul>
<p>2、安全相关</p>
<ul>
<li>（1）不应该在JWT的payload 部分存放敏感信息，因为该部分是客户端可解密的部分。</li>
<li>（2）保护好secret私钥，该私钥非常重要。</li>
<li>（3）如果可以，请使用HTTPS 协议，不！是务必使用HTTPS!</li>
</ul>
</template>
