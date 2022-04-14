---
title: git-use
category: tool
icon: git
tag:
  - git
---
  
git对于大家应该都不太陌生，熟练使用git已经成为程序员的一项基本技能，尽管在工作中有诸如 Sourcetree这样牛X的客户端工具，使得合并代码变的很方便。但找工作面试和一些需彰显个人实力的场景，仍然需要我们掌握足够多的git命令。

## git add&git stage区别

在回答这个问题之前需要先了解 git 仓库的三个组成部分：工作区(Working Directory)、暂存区(Stage)和历史记录区(History)：

工作区：在 git 管理下的正常目录都算是工作区，我们平时的编辑工作都是在工作区完成。

暂存区：临时区域。里面存放将要提交文件的快照。

历史记录区：git commit 后的记录区。

然后是这三个区的转换关系以及转换所使用的命令：

## git reset、git revert & git checkout

这个问题同样也需要先了解 git 仓库的三个组成部分：工作区(Working Directory)、暂存区(Stage)和历史记录区(History)。

首先是它们的共同点：用来撤销代码仓库中的某些更改。

然后是不同点：

## 从 commit 层面来说

Git reset

可以将一个分支的末端指向之前的一个 commit。

然后再下次 git 执行垃圾回收的时候，会把这个 commit 之后的 commit 都扔掉。

还支持三种标记，用来标记 reset 指令影响的范围：

--mixed：会影响到暂存区和历史记录区。也是默认选项；
--soft：只影响历史记录区；
--hard：影响工作区、暂存区和历史记录区。

Git checkout

可以将 HEAD 移到一个新的分支，并更新工作目录。因为可能会覆盖本地的修改，所以执行这个指令之前，你需要 stash 或者 commit 暂存区和工作区的更改。

Git revert

和 git reset 的目的是一样的，但是做法不同，它会以创建新的 commit 的方式来撤销 commit，这样能保留之前的 commit 历史，比较安全。

另外，同样因为可能会覆盖本地的修改，所以执行这个指令之前，你需要 stash 或者 commit 暂存区和工作区的更改。

### 从文件层面来说

Git reset 只是把文件从历史记录区拿到暂存区，不影响工作区的内容，而且不支持 --mixed、--soft 和 --hard。

Git checkout 则是把文件从历史记录拿到工作区，不影响暂存区的内容。

Git revert 不支持文件层面的操作。

## GitFlow 基本流程

GitFlow 是由 Vincent Driessen 提出的一个 git 操作流程标准。包含如下几个关键分支：

|   名称    | 说明                                                |
|:-------:|---------------------------------------------------|
| master  | 主分支                                               |
| develop | 主开发分支，包含确定即将发布的代码                                 |
| feature | 新功能分支，一般一个新功能对应一个分支，对于功能的拆分需要比较合理，以避免一些后面不必要的代码冲突 |
| release | 发布分支，发布时候用的分支，一般测试时候发现的 bug 在这个分支进行修复             |
| hotfix  | hotfix 分支，紧急修 bug 的时候用                            |

对于 feature 流程，都是从 develop 分支发起，然后通过 PR／MR 的方式合并回 develop 分支；
