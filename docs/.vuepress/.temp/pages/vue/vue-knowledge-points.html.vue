<template><h2 id="es6" tabindex="-1"><a class="header-anchor" href="#es6" aria-hidden="true">#</a> es6</h2>
<p>一种通过重用组件构建类的方法。</p>
<p>不通过类的直接继承来实现，而是将基类作为接口来实现。对于基类实例化部分在子类中实现，基类中原型的部分在子类中进行声明占位，然后通过一个 Minxin 函数将基类上的原型属性拷贝到子类上。</p>
<h2 id="promise" tabindex="-1"><a class="header-anchor" href="#promise" aria-hidden="true">#</a> promise</h2>
<p>用来处理异步任务的一个对象，一个 Promise 对象有三个状态，resolved 异步任务执行成功，rejected 异步任务执行失败</p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>初始化一个 Promise 对象
new Promise(fn)</p>
<p>然后调用上一步返回的 promise 对象的 then 方法，注册回调函数。</p>
<p>Then 中的回调函数可以有一个参数，也可以不带参数。如果 then 中的回调函数依赖上一步的返回结果，那么要带上参数。比如:</p>
<p>最后注册 catch 异常处理函数，处理前面回调中可能抛出的异常。</p>
<p>回调地狱带来的负面作用有以下几点：</p>
<p>处理一个异步网络请求</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">请求1</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">请求结果<span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">请求2</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">请求结果<span class="token number">2</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    处理请求结果<span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>代码臃肿。
可读性差。
耦合度过高，可维护性差。
代码复用性差。
容易滋生 bug。
只能在回调里处理异常。</p>
<p>比传统的异步解决方案【回调函数】和【事件】更合理、更强大。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>请求<span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token function">请求2</span><span class="token punctuation">(</span>请求结果<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token function">请求3</span><span class="token punctuation">(</span>请求结果<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token function">请求4</span><span class="token punctuation">(</span>请求结果<span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token function">请求5</span><span class="token punctuation">(</span>请求结果<span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token function">处理异常</span><span class="token punctuation">(</span>异常信息<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>比较一下这种写法和上面的回调式的写法。我们不难发现，Promise 的写法更为直观，并且能够在外层捕获异步函数的异常信息。</p>
<h3 id="promise-resolve-value" tabindex="-1"><a class="header-anchor" href="#promise-resolve-value" aria-hidden="true">#</a> Promise.resolve(value)</h3>
<p>类方法，该方法返回一个以 value 值解析后的 Promise 对象 1、如果这个值是个 thenable(即带有 then 方法)，返回的 Promise 对象会“跟随”这个 thenable 的对象，采用它的最终状态(指 resolved/rejected/pending/settled)
2、如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
3、其他情况以该值为成功状态返回一个 Promise 对象。</p>
<p>上面是 resolve 方法的解释，传入不同类型的 value 值，返回结果也有区别。这个 API 比较重要，建议大家通过练习一些小例子，并且配合上面的解释来熟悉它。如下几个小例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> p0 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> p1 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>p0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回为true，返回的 Promise 即是 入参的 Promise 对象。</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p0 <span class="token operator">===</span> p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="promise-prototype-then" tabindex="-1"><a class="header-anchor" href="#promise-prototype-then" aria-hidden="true">#</a> Promise.prototype.then</h3>
<p>实例方法，为 Promise 注册回调函数，函数形式：fn(vlaue){}，value 是上一个任务的返回结果，then 中的函数一定要 return 一个结果或者一个新的 Promise 对象，才可以让之后的 then 回调接收</p>
<h3 id="promise-prototype-catch" tabindex="-1"><a class="header-anchor" href="#promise-prototype-catch" aria-hidden="true">#</a> Promise.prototype.catch</h3>
<p>实例方法，捕获异常，函数形式：fn(err){}, err 是 catch 注册 之前的回调抛出的异常信息。</p>
<h2 id="promise-的升级-async-await" tabindex="-1"><a class="header-anchor" href="#promise-的升级-async-await" aria-hidden="true">#</a> Promise 的升级 async / await</h2>
<p>Async/await 也是基于 Promise 实现的，</p>
<p>Async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。</p>
</template>
