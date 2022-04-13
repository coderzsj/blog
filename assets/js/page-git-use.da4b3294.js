(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{698:function(t,e,v){"use strict";v.r(e);var i=v(1),_=Object(i.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("p",[t._v("git对于大家应该都不太陌生，熟练使用git已经成为程序员的一项基本技能，尽管在工作中有诸如 Sourcetree这样牛X的客户端工具，使得合并代码变的很方便。但找工作面试和一些需彰显个人实力的场景，仍然需要我们掌握足够多的git命令。")]),t._v(" "),v("h2",{attrs:{id:"git-add-git-stage区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#git-add-git-stage区别"}},[t._v("#")]),t._v(" git add&git stage区别")]),t._v(" "),v("p",[t._v("在回答这个问题之前需要先了解 git 仓库的三个组成部分：工作区(Working Directory)、暂存区(Stage)和历史记录区(History)：")]),t._v(" "),v("p",[t._v("工作区：在 git 管理下的正常目录都算是工作区，我们平时的编辑工作都是在工作区完成。")]),t._v(" "),v("p",[t._v("暂存区：临时区域。里面存放将要提交文件的快照。")]),t._v(" "),v("p",[t._v("历史记录区：git commit 后的记录区。")]),t._v(" "),v("p",[t._v("然后是这三个区的转换关系以及转换所使用的命令：")]),t._v(" "),v("h2",{attrs:{id:"git-reset、git-revert-git-checkout"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#git-reset、git-revert-git-checkout"}},[t._v("#")]),t._v(" git reset、git revert & git checkout")]),t._v(" "),v("p",[t._v("这个问题同样也需要先了解 git 仓库的三个组成部分：工作区(Working Directory)、暂存区(Stage)和历史记录区(History)。")]),t._v(" "),v("p",[t._v("首先是它们的共同点：用来撤销代码仓库中的某些更改。")]),t._v(" "),v("p",[t._v("然后是不同点：")]),t._v(" "),v("h2",{attrs:{id:"从-commit-层面来说"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#从-commit-层面来说"}},[t._v("#")]),t._v(" 从 commit 层面来说")]),t._v(" "),v("p",[t._v("Git reset")]),t._v(" "),v("p",[t._v("可以将一个分支的末端指向之前的一个 commit。")]),t._v(" "),v("p",[t._v("然后再下次 git 执行垃圾回收的时候，会把这个 commit 之后的 commit 都扔掉。")]),t._v(" "),v("p",[t._v("还支持三种标记，用来标记 reset 指令影响的范围：")]),t._v(" "),v("p",[t._v("--mixed：会影响到暂存区和历史记录区。也是默认选项；\n--soft：只影响历史记录区；\n--hard：影响工作区、暂存区和历史记录区。")]),t._v(" "),v("p",[t._v("Git checkout")]),t._v(" "),v("p",[t._v("可以将 HEAD 移到一个新的分支，并更新工作目录。因为可能会覆盖本地的修改，所以执行这个指令之前，你需要 stash 或者 commit 暂存区和工作区的更改。")]),t._v(" "),v("p",[t._v("Git revert")]),t._v(" "),v("p",[t._v("和 git reset 的目的是一样的，但是做法不同，它会以创建新的 commit 的方式来撤销 commit，这样能保留之前的 commit 历史，比较安全。")]),t._v(" "),v("p",[t._v("另外，同样因为可能会覆盖本地的修改，所以执行这个指令之前，你需要 stash 或者 commit 暂存区和工作区的更改。")]),t._v(" "),v("h3",{attrs:{id:"从文件层面来说"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#从文件层面来说"}},[t._v("#")]),t._v(" 从文件层面来说")]),t._v(" "),v("p",[t._v("Git reset 只是把文件从历史记录区拿到暂存区，不影响工作区的内容，而且不支持 --mixed、--soft 和 --hard。")]),t._v(" "),v("p",[t._v("Git checkout 则是把文件从历史记录拿到工作区，不影响暂存区的内容。")]),t._v(" "),v("p",[t._v("Git revert 不支持文件层面的操作。")]),t._v(" "),v("h2",{attrs:{id:"gitflow-基本流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#gitflow-基本流程"}},[t._v("#")]),t._v(" GitFlow 基本流程")]),t._v(" "),v("p",[t._v("GitFlow 是由 Vincent Driessen 提出的一个 git 操作流程标准。包含如下几个关键分支：")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("名称")]),t._v(" "),v("th",[t._v("说明")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("master")]),t._v(" "),v("td",[t._v("主分支")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("develop")]),t._v(" "),v("td",[t._v("主开发分支，包含确定即将发布的代码")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("feature")]),t._v(" "),v("td",[t._v("新功能分支，一般一个新功能对应一个分支，对于功能的拆分需要比较合理，以避免一些后面不必要的代码冲突")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("release")]),t._v(" "),v("td",[t._v("发布分支，发布时候用的分支，一般测试时候发现的 bug 在这个分支进行修复")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("hotfix")]),t._v(" "),v("td",[t._v("hotfix 分支，紧急修 bug 的时候用")])])])]),t._v(" "),v("p",[t._v("对于 feature 流程，都是从 develop 分支发起，然后通过 PR／MR 的方式合并回 develop 分支；")])])}),[],!1,null,null,null);e.default=_.exports}}]);