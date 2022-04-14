<template><p>git对于大家应该都不太陌生，熟练使用git已经成为程序员的一项基本技能，尽管在工作中有诸如 Sourcetree这样牛X的客户端工具，使得合并代码变的很方便。但找工作面试和一些需彰显个人实力的场景，仍然需要我们掌握足够多的git命令。</p>
<h2 id="git-add-git-stage区别" tabindex="-1"><a class="header-anchor" href="#git-add-git-stage区别" aria-hidden="true">#</a> git add&amp;git stage区别</h2>
<p>在回答这个问题之前需要先了解 git 仓库的三个组成部分：工作区(Working Directory)、暂存区(Stage)和历史记录区(History)：</p>
<p>工作区：在 git 管理下的正常目录都算是工作区，我们平时的编辑工作都是在工作区完成。</p>
<p>暂存区：临时区域。里面存放将要提交文件的快照。</p>
<p>历史记录区：git commit 后的记录区。</p>
<p>然后是这三个区的转换关系以及转换所使用的命令：</p>
<h2 id="git-reset、git-revert-git-checkout" tabindex="-1"><a class="header-anchor" href="#git-reset、git-revert-git-checkout" aria-hidden="true">#</a> git reset、git revert &amp; git checkout</h2>
<p>这个问题同样也需要先了解 git 仓库的三个组成部分：工作区(Working Directory)、暂存区(Stage)和历史记录区(History)。</p>
<p>首先是它们的共同点：用来撤销代码仓库中的某些更改。</p>
<p>然后是不同点：</p>
<h2 id="从-commit-层面来说" tabindex="-1"><a class="header-anchor" href="#从-commit-层面来说" aria-hidden="true">#</a> 从 commit 层面来说</h2>
<p>Git reset</p>
<p>可以将一个分支的末端指向之前的一个 commit。</p>
<p>然后再下次 git 执行垃圾回收的时候，会把这个 commit 之后的 commit 都扔掉。</p>
<p>还支持三种标记，用来标记 reset 指令影响的范围：</p>
<p>--mixed：会影响到暂存区和历史记录区。也是默认选项；
--soft：只影响历史记录区；
--hard：影响工作区、暂存区和历史记录区。</p>
<p>Git checkout</p>
<p>可以将 HEAD 移到一个新的分支，并更新工作目录。因为可能会覆盖本地的修改，所以执行这个指令之前，你需要 stash 或者 commit 暂存区和工作区的更改。</p>
<p>Git revert</p>
<p>和 git reset 的目的是一样的，但是做法不同，它会以创建新的 commit 的方式来撤销 commit，这样能保留之前的 commit 历史，比较安全。</p>
<p>另外，同样因为可能会覆盖本地的修改，所以执行这个指令之前，你需要 stash 或者 commit 暂存区和工作区的更改。</p>
<h3 id="从文件层面来说" tabindex="-1"><a class="header-anchor" href="#从文件层面来说" aria-hidden="true">#</a> 从文件层面来说</h3>
<p>Git reset 只是把文件从历史记录区拿到暂存区，不影响工作区的内容，而且不支持 --mixed、--soft 和 --hard。</p>
<p>Git checkout 则是把文件从历史记录拿到工作区，不影响暂存区的内容。</p>
<p>Git revert 不支持文件层面的操作。</p>
<h2 id="gitflow-基本流程" tabindex="-1"><a class="header-anchor" href="#gitflow-基本流程" aria-hidden="true">#</a> GitFlow 基本流程</h2>
<p>GitFlow 是由 Vincent Driessen 提出的一个 git 操作流程标准。包含如下几个关键分支：</p>
<table>
<thead>
<tr>
<th style="text-align:center">名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">master</td>
<td>主分支</td>
</tr>
<tr>
<td style="text-align:center">develop</td>
<td>主开发分支，包含确定即将发布的代码</td>
</tr>
<tr>
<td style="text-align:center">feature</td>
<td>新功能分支，一般一个新功能对应一个分支，对于功能的拆分需要比较合理，以避免一些后面不必要的代码冲突</td>
</tr>
<tr>
<td style="text-align:center">release</td>
<td>发布分支，发布时候用的分支，一般测试时候发现的 bug 在这个分支进行修复</td>
</tr>
<tr>
<td style="text-align:center">hotfix</td>
<td>hotfix 分支，紧急修 bug 的时候用</td>
</tr>
</tbody>
</table>
<p>对于 feature 流程，都是从 develop 分支发起，然后通过 PR／MR 的方式合并回 develop 分支；</p>
</template>
