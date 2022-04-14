<template><h1 id="为什么分布式要有分布式锁" tabindex="-1"><a class="header-anchor" href="#为什么分布式要有分布式锁" aria-hidden="true">#</a> 为什么分布式要有分布式锁！</h1>
<p>目前网上大部分的基于ZOOKEEPER，和REDIS的分布式锁的文章都不够全面。要么就是特意避开集群的情况，要么就是考虑不全，堵着看着还是一脸迷茫。坦白说，这种老题材，很难写出新创意，博主内心战战兢兢，如履薄冰，文中有什么不严谨之处，欢迎批评。</p>
<p>博主的这篇文章，不上代码，只讲分析。</p>
<p>1、在REDIS方面，有开源REDISSION的JAR包供你使用。
2、在ZOOKEEPER方面，有开源的CURATOR的JAR包供你使用。</p>
<p>因为已经有开源JAR供你使用，没有必要去自己封装一个，大家出门百度一个API即可，不需要再罗列一堆实现代码。</p>
<p>需要说明的是，Google有一个名为CHUBBY的粗粒度分布式锁的服务，然而，Google chubb并不是开源的，我们只能通过其论文和其他相关的文档中了解具体的细节。值得庆幸的是，YAHOO！借鉴CHUBBY的设计思想开发了ZOOKEEPER，并将其开源，因此本文不讨论CHUBBY。至于TAIR，是阿里开源的一个分布式KV存储方案。我们在工作中基本上REDIS是用的比较多，讨论TAIR所实现的分布式锁，不具有代表性。</p>
<p>因此，主要分析的还是REDIS和ZOOKEEPER所实现的分布式锁。</p>
<p>文档的目录结构如下：</p>
<p>1、为什么使用分布式锁
2、单机情形比较。
3、集群情形比较；
4、锁的其它特性比较；</p>
<p>为什么使用分布式锁？</p>
<p>使用分布式锁的目的，无外乎就是保证同一时间只有一个客户端可以对共享资源进行操作。</p>
<p>但是MARTIN指出，根据锁的用途还可以细分为以下两类：</p>
<p>1、允许多个客户端操作共享资源</p>
<p>这种情况下，对共享资源的操作一定是幂等性操作，无论你操作多少次都不会出现不同结果。在这里使用锁，无外乎就是避免重复操作共享资源从而提高效率。</p>
<p>2、 只允许一个客户端操作共享资源</p>
<p>这种情况下，对共享资源的操作一般是非幂等性操作。在这种情况下，如果出现多个客户端操作共享资源，就可能意味着数据不一致，数据丢失。</p>
<h2 id="第一回合-单机情形比较" tabindex="-1"><a class="header-anchor" href="#第一回合-单机情形比较" aria-hidden="true">#</a> 第一回合，单机情形比较</h2>
<p>1、redis</p>
<p>先说加锁，根据REDIS官网文档的描述，是所有下面的命令加锁：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">set</span> resource_name my_random_value NX PX <span class="token number">30000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li>my_random_value是由客户端生成的一个随机字符串，相当于客户端持有锁的标志</li>
<li>NX表示只有当resource_name对应的KEY值不存在的时候才能SET成功，相当于只有第一个请求的客户端才能获得锁</li>
<li>PX 30000表示这个锁有一个三十秒的自动过期时间。</li>
</ul>
<p>至于解锁，为了防止客户端A获得的锁被客户端B释放，采用下面的LUA脚本来释放锁</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">if</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"get"</span><span class="token punctuation">,</span>KEY<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> then
        <span class="token keyword">return</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"del"</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
<span class="token keyword">else</span>
    <span class="token keyword">return</span> <span class="token number">0</span>
end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在执行这段LUA脚本的时候，KEYS[1]的值为resource_name，ARGV[1]的值为my_random_value。原理就是先获取所对应的VALUE值，保证和客户端穿进去的my_random_value值相等，这样就能避免自己的所被其他人释放。另外，采取LUA脚本操作保证了原子性。</p>
<p>过期时间如果设置。如果客户端在操作共享资源的过程中，因为长期阻塞的原因，导致锁过期，那么接下来访问共享资源就不安全。</p>
<p>可是，有的人会说</p>
<blockquote>
<p>那可以在客户端操作完共享资源后，判断锁是否依然归该客户端所有，如果依然归客户端所有，则提交资源，释放锁。若不归客户端所有，则不提交资源。</p>
</blockquote>
<p>这么做，只能降低多个客户端操作共享资源发生的概率，并不能解决问题</p>
<h2 id="第二回合-集群情形比较" tabindex="-1"><a class="header-anchor" href="#第二回合-集群情形比较" aria-hidden="true">#</a> 第二回合，集群情形比较：</h2>
<p>我们在生产中，一般都是用集群情形，所以第一回合讨论的单机情形。算是给大家热热身。</p>
<p>1、Redis</p>
<p>为了Redis的高可用，一般都会给REDIS的节点挂一个SLAVE，然后采用哨兵模式进行主备切换。但由于REDIS的主从复制是异步的，这可能会出现在数据同步过程中，master宕机，slave来不及同步数据就被选为MASTER，从而数据丢失。具体流程如下所示：</p>
<ol>
<li>客户端A从MASTER获取了锁。</li>
<li>MASTER宕机了，存储锁的KEY还没有来得及同步到SLAVE上。</li>
<li>SLAVE升级为MASTER。</li>
<li>客户端B从新的MASTER获取到了对应的同一个资源的锁</li>
</ol>
<p>为了应对这个情形，REDIS的作者antirez提出了REDLOCK算法，步骤如下：</p>
<p>假设我们有N个MASTER节点</p>
<ol>
<li>获取当前时间（单位是毫秒）。</li>
<li>轮流用相同的KEY和随机值在N个节点上清求索，在这一步里，客户端在每个master上请求锁时，会有一个和总得锁释放时间相比小得多的超时时间。比如如果锁自动释放时间是十秒钟，那每个节点所请求的超时时间可能是5~50毫秒的范围，这个可以防止一个客户端在某个宕掉的MASTER节点上阻塞过长时间，如果一个MASTER节点不可用了，我们应该尽快尝试下一个MASTER节点。</li>
<li>客户端计算第二步中获取锁所花的时间，只有当客户端在大多数MASTER节点上成功获取了锁（在这里是三个），而且总共消耗的时间不超过锁释放时间，这个锁就认为是获取成功了。</li>
</ol>
<h2 id="redis-实现分布式锁" tabindex="-1"><a class="header-anchor" href="#redis-实现分布式锁" aria-hidden="true">#</a> Redis 实现分布式锁</h2>
<p>分布式锁要满足的条件：</p>
<ul>
<li>多进程互斥：同一时刻，只有一个进程可以获取锁</li>
<li>保证锁可以释放：任务结束或出现异常，锁一定要释放，避免死锁</li>
<li>阻塞锁(可选)：获取锁失败时可否重试</li>
<li>重入锁(可选)：获取锁的代码递归调用时，依然可以获取锁</li>
</ul>
<h3 id="最基本的分布式锁" tabindex="-1"><a class="header-anchor" href="#最基本的分布式锁" aria-hidden="true">#</a> 最基本的分布式锁</h3>
<p>利用 Redis 的 setnx 命令，这个命令的特征时如果多次执行，只有第一次执行会成功，可以实现<code>互斥</code>的效果。为了保证服务宕机时也可以释放锁，同时需要利用 expire 命令给锁设置一个有效期</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>setnx lock thread-01 # 尝试获取锁
expire lock 10 # 设置有效期
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="释放锁的时候-保证持有锁的线程释放锁" tabindex="-1"><a class="header-anchor" href="#释放锁的时候-保证持有锁的线程释放锁" aria-hidden="true">#</a> 释放锁的时候，保证持有锁的线程释放锁</h3>
<p>在锁中存储当前进程和线程标识，释放锁时对锁的标识判断，如果是自己的则删除，不是则放弃操作。</p>
<p>但是这两步操作要保证原子性，需要通过 Lua 脚本来实现。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if redis.call("get",KEYS[1]) == ARGV[1] then
    redis.call("del",KEYS[1])
end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="可重入分布式锁" tabindex="-1"><a class="header-anchor" href="#可重入分布式锁" aria-hidden="true">#</a> 可重入分布式锁</h3>
<p>如果有重入的需求，则除了在锁中记录进程标识，还要记录重试次数，流程如下：</p>
<p>下面我们假设锁的 key 为“<code>lock</code>”，hashKey 是当前线程的 id：“<code>threadId</code>”，锁自动释放时间假设为 20</p>
<p>获取锁的步骤：</p>
<ul>
<li>1、判断 lock 是否存在 <code>EXISTS lock</code>
<ul>
<li>存在，说明有人获取锁了，下面判断是不是自己的锁</li>
<li>判断当前线程 ID 作为 hashKey 是否存在：<code>HEXISTS lock threadId</code></li>
<li>不存在，说明锁已经有了，且不是自己获取的，锁获取失败，end</li>
<li>存在，说明是自己获取的锁，重入次数+1：<code>HINCRBY lock threadId 1</code>，去到步骤 3</li>
</ul>
</li>
<li>2、不存在，说明可以获取锁，<code>HSET key threadId 1</code></li>
<li>3、设置锁自动释放时间，<code>EXPIRE lock 20</code></li>
</ul>
<p>释放锁的步骤：</p>
<ul>
<li>1、判断当前线程 ID 作为 hashKey 是否存在：<code>HEXISTS lock threadId</code>
<ul>
<li>不存在，说明锁已经失效，不用管了</li>
<li>存在，说明锁还在，重入次数减 1：<code>HINCRBY lock threadId -1</code>，获取新的重入次数</li>
</ul>
</li>
<li>2、判断重入次数是否为 0：
<ul>
<li>为 0，说明锁全部释放，删除 key：<code>DEL lock</code></li>
<li>大于 0，说明锁还在使用，重置有效时间：<code>EXPIRE lock 20</code></li>
</ul>
</li>
</ul>
<p>对应的 Lua 脚本如下：</p>
<p>首先是获取锁：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> key <span class="token operator">=</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">-- 锁的key</span>
<span class="token keyword">local</span> threadId <span class="token operator">=</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">-- 线程唯一标识</span>
<span class="token keyword">local</span> releaseTime <span class="token operator">=</span> ARGV<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">-- 锁的自动释放时间</span>

<span class="token keyword">if</span><span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'exists'</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">then</span> <span class="token comment">-- 判断是否存在</span>
 redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'hset'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> <span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 不存在, 获取锁</span>
 redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'expire'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> releaseTime<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 设置有效期</span>
 <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">-- 返回结果</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'hexists'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> threadId<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">then</span> <span class="token comment">-- 锁已经存在，判断threadId是否是自己</span>
 redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'hincrby'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> <span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 不存在, 获取锁，重入次数+1</span>
 redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'expire'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> releaseTime<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 设置有效期</span>
 <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">-- 返回结果</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">-- 代码走到这里,说明获取锁的不是自己，获取锁失败</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>然后是释放锁：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> key <span class="token operator">=</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">-- 锁的key</span>
<span class="token keyword">local</span> threadId <span class="token operator">=</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">-- 线程唯一标识</span>
<span class="token keyword">local</span> releaseTime <span class="token operator">=</span> ARGV<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">-- 锁的自动释放时间</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'HEXISTS'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> threadId<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">then</span> <span class="token comment">-- 判断当前锁是否还是被自己持有</span>
    <span class="token keyword">return</span> <span class="token keyword">nil</span><span class="token punctuation">;</span> <span class="token comment">-- 如果已经不是自己，则直接返回</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">local</span> count <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'HINCRBY'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 是自己的锁，则重入次数-1</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">then</span> <span class="token comment">-- 判断是否重入次数是否已经为0</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'EXPIRE'</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> releaseTime<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 大于0说明不能释放锁，重置有效期然后返回</span>
    <span class="token keyword">return</span> <span class="token keyword">nil</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'DEL'</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 等于0说明可以释放锁，直接删除</span>
    <span class="token keyword">return</span> <span class="token keyword">nil</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></template>
