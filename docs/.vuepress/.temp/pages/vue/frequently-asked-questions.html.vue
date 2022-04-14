<template><h2 id="vue-常见问题" tabindex="-1"><a class="header-anchor" href="#vue-常见问题" aria-hidden="true">#</a> vue 常见问题</h2>
<h2 id="spa" tabindex="-1"><a class="header-anchor" href="#spa" aria-hidden="true">#</a> SPA</h2>
<p>单页应用</p>
<p>仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。</p>
<p>一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转，利用路由机制实现 HTML 内容的变换来代替，UI 与用户的交互，避免页面的重新加载。</p>
<p>用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
基于上面一点，SPA 相对对服务器压力小；
前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；</p>
<h3 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h3>
<p>初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；</p>
<p>用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；</p>
<h3 id="v-show-与-v-if" tabindex="-1"><a class="header-anchor" href="#v-show-与-v-if" aria-hidden="true">#</a> v-show 与 v-if</h3>
<p>V-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。</p>
<p>V-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。</p>
<h3 id="computed-和-watch" tabindex="-1"><a class="header-anchor" href="#computed-和-watch" aria-hidden="true">#</a> computed 和 watch</h3>
<p>Computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；</p>
<p>Watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；</p>
<h2 id="vue-生命周期" tabindex="-1"><a class="header-anchor" href="#vue-生命周期" aria-hidden="true">#</a> Vue 生命周期</h2>
<p>Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -&gt; 渲染、更新 -&gt; 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。</p>
<table>
<thead>
<tr>
<th style="text-align:center">生命周期</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">beforeCreate</td>
<td>组件实例被创建之初，组件的属性生效之前</td>
</tr>
<tr>
<td style="text-align:center">created</td>
<td>组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用</td>
</tr>
<tr>
<td style="text-align:center">beforeMount</td>
<td>在挂载开始之前被调用：相关的 render 函数首次被调用</td>
</tr>
<tr>
<td style="text-align:center">mounted</td>
<td>el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子</td>
</tr>
<tr>
<td style="text-align:center">beforeUpdate</td>
<td>组件数据更新之前调用，发生在虚拟 DOM 打补丁之前</td>
</tr>
<tr>
<td style="text-align:center">update</td>
<td>组件数据更新之后</td>
</tr>
<tr>
<td style="text-align:center">activited</td>
<td>keep-alive 专属，组件被激活时调用</td>
</tr>
<tr>
<td style="text-align:center">deactivated</td>
<td>keep-alive 专属，组件被销毁时调用</td>
</tr>
<tr>
<td style="text-align:center">beforeDestory</td>
<td>组件销毁前调用</td>
</tr>
<tr>
<td style="text-align:center">destoryed</td>
<td>组件销毁后调用</td>
</tr>
</tbody>
</table>
<h2 id="哪个生命周期内调用异步请求" tabindex="-1"><a class="header-anchor" href="#哪个生命周期内调用异步请求" aria-hidden="true">#</a> 哪个生命周期内调用异步请求</h2>
<p>可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点</p>
<p>能更快获取到服务端数据，减少页面 loading 时间；
服务端渲染不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；</p>
<h2 id="在什么阶段才能访问操作-dom" tabindex="-1"><a class="header-anchor" href="#在什么阶段才能访问操作-dom" aria-hidden="true">#</a> 在什么阶段才能访问操作 DOM</h2>
<p>在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。V</p>
<h2 id="父子通信" tabindex="-1"><a class="header-anchor" href="#父子通信" aria-hidden="true">#</a> 父子通信</h2>
<ol>
<li>
<p>$emit props 触发父组件的事件</p>
</li>
<li>
<p>ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例</p>
</li>
<li>
<p>EventBus (emit /on) 适用于 父子、隔代、兄弟组件通信</p>
</li>
<li>
<p>Vuex 适用于 父子、隔代、兄弟组件通信</p>
</li>
<li>
<p>provide / inject 适用于 隔代组件通信</p>
</li>
</ol>
<p><a href="https://www.jianshu.com/p/9f460e66ce01" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
<h2 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive" aria-hidden="true">#</a> keep-alive</h2>
<p>Keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：</p>
<p>一般结合路由和动态组件一起使用，用于缓存组件；</p>
<p>提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；</p>
<p>对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。</p>
</template>
