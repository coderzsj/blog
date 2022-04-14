<template><h2 id="jvm类加载与字节码技术-内存模型" tabindex="-1"><a class="header-anchor" href="#jvm类加载与字节码技术-内存模型" aria-hidden="true">#</a> JVM类加载与字节码技术&amp;内存模型</h2>
<h2 id="class-load" tabindex="-1"><a class="header-anchor" href="#class-load" aria-hidden="true">#</a> class load</h2>
<p>类加载与字节码技术</p>
<p><img src="@source/java/jvm/img/3-1.png" alt=""></p>
<p>1、类文件结构</p>
<p>通过 javac 类名.java 编译 java 文件后，会生成一个 .class 的文件！下图是字节码文件：</p>
<p><img src="@source/java/jvm/assets/20220413/JVM类加载与字节码技术&amp;内存模型-1649849261566.png" alt="字节码文件"></p>
<p>据 JVM 规范，类文件结构如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>u4       magic
u2             minor_version;
u2             major_version;
u2             constant_pool_count;
cp_info        constant_pool[constant_pool_count-1];
u2             access_flags;
u2             this_class;
u2             super_class;
u2             interfaces_count;
u2             interfaces[interfaces_count];
u2             fields_count;
field_info     fields[fields_count];
u2             methods_count;
method_info    methods[methods_count];
u2             attributes_count;
attribute_info attributes[attributes_count];
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>1）魔数</p>
<p>U4 magic
对应字节码文件的 0~3 个字节
0000000 ca fe ba be 00 00 00 34 00 23 0a 00 06 00 15 09
ca fe ba be：意思是 .class文件，不同的东西有不同的魔数，比如jpg、PNG 图片等！</p>
<p>2）版本</p>
<p>U2 minor_version;
u2 major_version;
0000000 ca fe ba be 00 00 00 34 00 23 0a 00 06 00 15 09
00 00 00 34：34H(16 进制) = 52(10 进制)，代表 JDK8</p>
<p>3）常量池</p>
<p>常量池在java用于保存在编译期已确定的，已编译的class文件中的一份数据。它包括了关于类，方法，接口等中的常量，也包括字符串常量，如String s = &quot;java&quot;这种申明方式；当然也可扩充，执行器产生的常量也会放入常量池，故认为常量池是JVM的一块特殊的内存空间。</p>
<p><a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.5" target="_blank" rel="noopener noreferrer">参考文档<ExternalLinkIcon/></a></p>
<h2 id="_2、字节码指令" tabindex="-1"><a class="header-anchor" href="#_2、字节码指令" aria-hidden="true">#</a> 2、字节码指令</h2>
<p>可参考：</p>
<p><a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5" target="_blank" rel="noopener noreferrer">字节码指令<ExternalLinkIcon/></a></p>
<h3 id="_1、javap-工具" tabindex="-1"><a class="header-anchor" href="#_1、javap-工具" aria-hidden="true">#</a> 1、javap 工具</h3>
<p>Java中提供了<code>javap</code>工具来反编译 class 文件</p>
<h3 id="_2-图解方法执行流程" tabindex="-1"><a class="header-anchor" href="#_2-图解方法执行流程" aria-hidden="true">#</a> 2）图解方法执行流程</h3>
<p>代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo3_1</span> <span class="token punctuation">{</span>
 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token class-name">Short</span><span class="token punctuation">.</span>MAX_VALUE <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>常量池载入运行时常量池</p>
<p>常量池也属于方法区，只不过这里单独提出来了</p>
<p><img src="@source/java/jvm/img/3-2.png" alt=""></p>
<p>方法字节码载入方法区</p>
<p>(stack=2，locals=4) 对应操作数栈有 2 个空间(每个空间 4 个字节)，局部变量表中有 4 个槽位。</p>
<p><img src="@source/java/jvm/img/3-3.png" alt=""></p>
<p>执行引擎开始执行字节码</p>
<p>Bipush 10</p>
<ul>
<li>将一个 byte 压入操作数栈(其长度会补齐 4 个字节)，类似的指令还有
<ul>
<li>sipush 将一个 short 压入操作数栈(其长度会补齐 4 个字节)</li>
<li>ldc 将一个 int 压入操作数栈</li>
<li>ldc2_w 将一个 long 压入操作数栈（<strong>分两次压入</strong>，因为 long 是 8 个字节）</li>
<li>这里小的数字都是和字节码指令存在一起，<strong>超过 short 范围的数字存入了常量池</strong></li>
</ul>
</li>
</ul>
<p>Istore 1</p>
<p>将操作数栈栈顶元素弹出，放入局部变量表的 slot 1 中</p>
<p>对应代码中的 <code>a = 10</code></p>
<p>3）通过字节码指令分析问题</p>
<p>代码</p>
<p><a href="https://blog.csdn.net/weixin_50280576/article/details/113784268" target="_blank" rel="noopener noreferrer">csdn<ExternalLinkIcon/></a></p>
</template>
