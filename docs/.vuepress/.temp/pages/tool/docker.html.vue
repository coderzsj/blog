<template><div class="custom-container info"><p class="custom-container-title">相关信息</p>
<p>Docker 是一个软件容器化平台，它以容器的形式将您的应用程序及其所有依赖项打包在一起，以确保你的应用程序在任何环境中无缝运行。</p>
</div>
<p>Docker 容器包括应用程序及其所有依赖项，作为操作系统的独立进程运行。</p>
<p>Docker 镜像是 Docker 容器的源代码，Docker 镜像用于创建容器。使用 build 命令创建镜像。</p>
<p>Docker 容器有几种状态</p>
<p>四种状态：运行、已暂停、重新启动、已退出。</p>
<h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> Dockerfile</h2>
<p>Dockerfile 中最常见的指令是什么</p>
<p>FROM：指定基础镜像</p>
<p>LABEL：功能是为镜像指定标签</p>
<p>RUN：运行指定的命令</p>
<p>CMD：容器启动时要运行的命令</p>
<p>Dockerfile 中的命令 COPY 和 ADD 命令有什么区别?</p>
<p>COPY 与 ADD 的区别 COPY 的 SRC 只能是本地文件，其他用法一致</p>
<h2 id="docker-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-常用命令" aria-hidden="true">#</a> docker 常用命令</h2>
<h3 id="docker-run" tabindex="-1"><a class="header-anchor" href="#docker-run" aria-hidden="true">#</a> docker run</h3>
<p>创建容器,将数据,日志,配置文件映射到本机</p>
<ul>
<li>-d: 后台运行容器</li>
<li>-p 将容器的端口映射到本机的端口</li>
<li>-v 将主机目录挂载到容器的目录</li>
<li>-e 设置参数</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run 
-d 
-P 
--name nginx2 
-v /home/nginx:/usr/share/nginx/HTML 
nginx

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="docker-pull" tabindex="-1"><a class="header-anchor" href="#docker-pull" aria-hidden="true">#</a> docker pull</h3>
<p>拉取或者更新指定镜像</p>
<h3 id="docker-push" tabindex="-1"><a class="header-anchor" href="#docker-push" aria-hidden="true">#</a> docker push</h3>
<p>将镜像推送至远程仓库</p>
<h3 id="docker-rmi" tabindex="-1"><a class="header-anchor" href="#docker-rmi" aria-hidden="true">#</a> docker rmi</h3>
<p>删除镜像</p>
<h3 id="docker-rm" tabindex="-1"><a class="header-anchor" href="#docker-rm" aria-hidden="true">#</a> docker rm</h3>
<p>删除容器</p>
<h3 id="docker-images" tabindex="-1"><a class="header-anchor" href="#docker-images" aria-hidden="true">#</a> docker images</h3>
<p>查看镜像库，列出所有镜像</p>
<h3 id="docker-ps" tabindex="-1"><a class="header-anchor" href="#docker-ps" aria-hidden="true">#</a> docker ps</h3>
<p>列出所有容器</p>
<h2 id="容器与主机之间的数据拷贝" tabindex="-1"><a class="header-anchor" href="#容器与主机之间的数据拷贝" aria-hidden="true">#</a> 容器与主机之间的数据拷贝</h2>
<p>容器与主机之间的数据拷贝命令</p>
<p>docker cp 命令用于容器与主机之间的数据拷贝</p>
<p>主机到容器：</p>
<p>docker cp /www 96f7f14e99ab:/www/</p>
<p>容器到主机：</p>
<p>docker cp 96f7f14e99ab:/www /tmp/</p>
<h2 id="启动-nginx-容器-随机端口映射-并挂载本地文件目录到容器-html-的命令" tabindex="-1"><a class="header-anchor" href="#启动-nginx-容器-随机端口映射-并挂载本地文件目录到容器-html-的命令" aria-hidden="true">#</a> 启动 nginx 容器(随机端口映射)，并挂载本地文件目录到容器 HTML 的命令</h2>
<p>启动 nginx 容器(随机端口映射)，并挂载本地文件目录到容器 HTML 的命令</p>
<h2 id="生产中监控-docker" tabindex="-1"><a class="header-anchor" href="#生产中监控-docker" aria-hidden="true">#</a> 生产中监控 Docker</h2>
<p>Docker 提供 docker stats 和 docker 事件等工具来监控生产中的 Docker。我们可以使用这些命令获取重要统计数据的报告。</p>
<p>Docker 统计数据：当我们使用容器 ID 调用 docker stats 时，我们获得容器的 CPU，内存使用情况等。它类似于 Linux 中的 top 命令。</p>
<p>Docker 事件：Docker 事件是一个命令，用于查看 Docker 守护程序中正在进行的活动流。</p>
<p>一些常见的 Docker 事件是：</p>
<p>Attach，commit，die，detach，rename，destroy 等。我们还可以使用各种选项来限制或过滤我们感兴趣的事件</p>
<h2 id="dockerfile-的-onbuild-指令" tabindex="-1"><a class="header-anchor" href="#dockerfile-的-onbuild-指令" aria-hidden="true">#</a> dockerfile 的 ONBUILD 指令</h2>
<p>当镜像用作另一个镜像构建的基础时，</p>
<p>ONBUILD 指令向镜像添加将在稍后执行的触发指令。</p>
<p>如果要构建将用作构建其他镜像的基础的镜像(例如，可以使用特定于用户的配置自定义的应用程序构建环境或守护程序)，这将非常有用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it <span class="token operator">&lt;</span>container id<span class="token operator">></span> <span class="token operator">&lt;</span>path_of_nginx<span class="token operator">></span> reload

<span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it nginx /home/userfile reload
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>##案例：创建mysql容器</p>
<p>1、在本地创建mysql的映射目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> -p /root/mysql/data /root/mysql/logs /root/mysql/conf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在/root/mysql/conf中创建 *.cnf 文件(叫什么都行)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2、拉取官方mysql5.7镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>3、创建容器,将数据,日志,配置文件映射到本机</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d -p <span class="token number">3306</span>:3306 --name mysql -v /root/mysql/conf:/etc/mysql/conf.d -v /root/mysql/logs:/logs -v /root/mysql/data:/var/lib/mysql -e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>4、启动mysql容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> start mysql
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>5、查看/root/mysql/data目录是否有数据文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /root/mysql/data
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>6、使用navicat工具连接测试</p>
</template>
