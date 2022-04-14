<template><h2 id="医院上传" tabindex="-1"><a class="header-anchor" href="#医院上传" aria-hidden="true">#</a> 医院上传</h2>
<h2 id="实时未分解交易" tabindex="-1"><a class="header-anchor" href="#实时未分解交易" aria-hidden="true">#</a> 实时未分解交易</h2>
<p>未支付成功的票据 xx</p>
<h2 id="补录" tabindex="-1"><a class="header-anchor" href="#补录" aria-hidden="true">#</a> 补录</h2>
<p>Xx</p>
<h2 id="比对失败" tabindex="-1"><a class="header-anchor" href="#比对失败" aria-hidden="true">#</a> 比对失败</h2>
<p>Xx
比对失败的票据，怎么处理，</p>
<p>票据文件上传是只用于上传模块？</p>
<p>用ctrl+r进行内容替换，使用正则表达式，用<code>^\s*\n</code> 替换 空即可</p>
<p>\s 包括空格、制表符、换页符等空白字符的其中任意一个
\r, \n 代表回车和换行符</p>
<ul>
<li>表达式不出现或出现任意次，相当于 {0,}，</li>
</ul>
</template>
