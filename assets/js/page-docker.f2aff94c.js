(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{693:function(s,a,e){"use strict";e.r(a);var r=e(1),t=Object(r.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("div",{staticClass:"custom-block info"},[e("p",{staticClass:"custom-block-title"},[s._v("相关信息")]),s._v(" "),e("p",[s._v("Docker 是一个软件容器化平台，它以容器的形式将您的应用程序及其所有依赖项打包在一起，以确保你的应用程序在任何环境中无缝运行。")])]),s._v(" "),e("p",[s._v("Docker 容器包括应用程序及其所有依赖项，作为操作系统的独立进程运行。")]),s._v(" "),e("p",[s._v("Docker 镜像是 Docker 容器的源代码，Docker 镜像用于创建容器。使用 build 命令创建镜像。")]),s._v(" "),e("p",[s._v("Docker 容器有几种状态")]),s._v(" "),e("p",[s._v("四种状态：运行、已暂停、重新启动、已退出。")]),s._v(" "),e("h2",{attrs:{id:"dockerfile"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile"}},[s._v("#")]),s._v(" Dockerfile")]),s._v(" "),e("p",[s._v("Dockerfile 中最常见的指令是什么")]),s._v(" "),e("p",[s._v("FROM：指定基础镜像")]),s._v(" "),e("p",[s._v("LABEL：功能是为镜像指定标签")]),s._v(" "),e("p",[s._v("RUN：运行指定的命令")]),s._v(" "),e("p",[s._v("CMD：容器启动时要运行的命令")]),s._v(" "),e("p",[s._v("Dockerfile 中的命令 COPY 和 ADD 命令有什么区别?")]),s._v(" "),e("p",[s._v("COPY 与 ADD 的区别 COPY 的 SRC 只能是本地文件，其他用法一致")]),s._v(" "),e("h2",{attrs:{id:"docker-常用命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-常用命令"}},[s._v("#")]),s._v(" docker 常用命令")]),s._v(" "),e("h3",{attrs:{id:"docker-run"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-run"}},[s._v("#")]),s._v(" docker run")]),s._v(" "),e("p",[s._v("创建容器,将数据,日志,配置文件映射到本机")]),s._v(" "),e("ul",[e("li",[s._v("-d: 后台运行容器")]),s._v(" "),e("li",[s._v("-p 将容器的端口映射到本机的端口")]),s._v(" "),e("li",[s._v("-v 将主机目录挂载到容器的目录")]),s._v(" "),e("li",[s._v("-e 设置参数")])]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run \n-d \n-P \n--name nginx2 \n-v /home/nginx:/usr/share/nginx/HTML \nnginx\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])]),e("h3",{attrs:{id:"docker-pull"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-pull"}},[s._v("#")]),s._v(" docker pull")]),s._v(" "),e("p",[s._v("拉取或者更新指定镜像")]),s._v(" "),e("h3",{attrs:{id:"docker-push"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-push"}},[s._v("#")]),s._v(" docker push")]),s._v(" "),e("p",[s._v("将镜像推送至远程仓库")]),s._v(" "),e("h3",{attrs:{id:"docker-rmi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-rmi"}},[s._v("#")]),s._v(" docker rmi")]),s._v(" "),e("p",[s._v("删除镜像")]),s._v(" "),e("h3",{attrs:{id:"docker-rm"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-rm"}},[s._v("#")]),s._v(" docker rm")]),s._v(" "),e("p",[s._v("删除容器")]),s._v(" "),e("h3",{attrs:{id:"docker-images"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-images"}},[s._v("#")]),s._v(" docker images")]),s._v(" "),e("p",[s._v("查看镜像库，列出所有镜像")]),s._v(" "),e("h3",{attrs:{id:"docker-ps"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-ps"}},[s._v("#")]),s._v(" docker ps")]),s._v(" "),e("p",[s._v("列出所有容器")]),s._v(" "),e("h2",{attrs:{id:"容器与主机之间的数据拷贝"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#容器与主机之间的数据拷贝"}},[s._v("#")]),s._v(" 容器与主机之间的数据拷贝")]),s._v(" "),e("p",[s._v("容器与主机之间的数据拷贝命令")]),s._v(" "),e("p",[s._v("docker cp 命令用于容器与主机之间的数据拷贝")]),s._v(" "),e("p",[s._v("主机到容器：")]),s._v(" "),e("p",[s._v("docker cp /www 96f7f14e99ab:/www/")]),s._v(" "),e("p",[s._v("容器到主机：")]),s._v(" "),e("p",[s._v("docker cp 96f7f14e99ab:/www /tmp/")]),s._v(" "),e("h2",{attrs:{id:"启动-nginx-容器-随机端口映射-并挂载本地文件目录到容器-html-的命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#启动-nginx-容器-随机端口映射-并挂载本地文件目录到容器-html-的命令"}},[s._v("#")]),s._v(" 启动 nginx 容器(随机端口映射)，并挂载本地文件目录到容器 HTML 的命令")]),s._v(" "),e("p",[s._v("启动 nginx 容器(随机端口映射)，并挂载本地文件目录到容器 HTML 的命令")]),s._v(" "),e("h2",{attrs:{id:"生产中监控-docker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生产中监控-docker"}},[s._v("#")]),s._v(" 生产中监控 Docker")]),s._v(" "),e("p",[s._v("Docker 提供 docker stats 和 docker 事件等工具来监控生产中的 Docker。我们可以使用这些命令获取重要统计数据的报告。")]),s._v(" "),e("p",[s._v("Docker 统计数据：当我们使用容器 ID 调用 docker stats 时，我们获得容器的 CPU，内存使用情况等。它类似于 Linux 中的 top 命令。")]),s._v(" "),e("p",[s._v("Docker 事件：Docker 事件是一个命令，用于查看 Docker 守护程序中正在进行的活动流。")]),s._v(" "),e("p",[s._v("一些常见的 Docker 事件是：")]),s._v(" "),e("p",[s._v("Attach，commit，die，detach，rename，destroy 等。我们还可以使用各种选项来限制或过滤我们感兴趣的事件")]),s._v(" "),e("h2",{attrs:{id:"dockerfile-的-onbuild-指令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile-的-onbuild-指令"}},[s._v("#")]),s._v(" dockerfile 的 ONBUILD 指令")]),s._v(" "),e("p",[s._v("当镜像用作另一个镜像构建的基础时，")]),s._v(" "),e("p",[s._v("ONBUILD 指令向镜像添加将在稍后执行的触发指令。")]),s._v(" "),e("p",[s._v("如果要构建将用作构建其他镜像的基础的镜像(例如，可以使用特定于用户的配置自定义的应用程序构建环境或守护程序)，这将非常有用。")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("container id"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("path_of_nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" reload\n\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it nginx /home/userfile reload\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[s._v("##案例：创建mysql容器")]),s._v(" "),e("p",[s._v("1、在本地创建mysql的映射目录")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p /root/mysql/data /root/mysql/logs /root/mysql/conf\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("在/root/mysql/conf中创建 *.cnf 文件(叫什么都行)")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("touch")]),s._v(" my.cnf\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("2、拉取官方mysql5.7镜像")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull mysql:5.7\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("3、创建容器,将数据,日志,配置文件映射到本机")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(":3306 --name mysql -v /root/mysql/conf:/etc/mysql/conf.d -v /root/mysql/logs:/logs -v /root/mysql/data:/var/lib/mysql -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("root mysql:5.7\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("4、启动mysql容器")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" start mysql\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("5、查看/root/mysql/data目录是否有数据文件")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /root/mysql/data\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("6、使用navicat工具连接测试")])])}),[],!1,null,null,null);a.default=t.exports}}]);