---
title: Git的核心概念及命令清单
category: 工具
icon: git
tag:
  - git
---
  
## git 仓库的三个组成部分

在回答这个问题之前需要先了解 git 仓库的三个组成部分：工作区(Working Directory)、暂存区(Stage)和历史记录区(History)：

- 工作区：在`git`管理下的正常目录都算是工作区，我们平时的编辑工作都是在工作区完成。
- 暂存区：临时区域。里面存放将要提交文件的快照。
- 历史记录区：`git commit` 后的记录区。

需要注意的是：提交一个文件需要先`git add <file>`把它放到暂存区，然后才能用`git commit`真正提交。

这是一个和svn在使用上一个很大的区别。一直commit发现提交不上去，找了好久才发现，原来是没有提交到暂存区。

然后是这三个区的转换关系以及转换所使用的命令：

## head

HEAD指的就是 .git/HEAD 文件，它存储着当前工作区所处的某次`commit`，打开文件内容为

```bash
ref: refs/heads/master
```

refs目录下存储的是仓库和tags，每个仓库下又有分支，每个tags下又有tag，一个tag对应的某次commit。

```bash
存储 local master 分支的最新commit对象的SHA-1
refs/heads/master

存储远程仓库 master 分支的最新commit对象的SHA-1
refs/remotes/origin/master

存储tag的SHA-1
tags/xxx

```

HEAD 是当前分支引用的指针，它总是指向某次commit，默认是上一次的commit。 这表示 `HEAD` 将是下一次提交的父结点。 通常，可以把 HEAD 看做你的上一次提交的快照。当然HEAD的指向是可以改变的，比如你提交了commit，切换了仓库，分支，或者回滚了版本，切换了`tag`等。

## git reset、git revert & git checkout

首先是它们的共同点：用来撤销代码仓库中的某些更改。

然后是不同点：

### 从 commit 层面来说

1、`Git checkout`

可以将 `HEAD` 移到一个新的分支，并更新工作目录。因为可能会覆盖本地的修改，所以执行这个指令之前，你需要stash或者commit暂存区和工作区的更改。

2、`Git reset`

可以将一个分支的末端指向之前的一个commit。然后再下次git执行垃圾回收的时候，会把这个commit之后的commit都扔掉。 还支持三种标记，用来标记 reset 指令影响的范围：

1. mixed：会影响到暂存区和历史记录区。也是默认选项；改变HEAD和index，指向那个你要reset到的commit上。而working copy(本地)文件不被改变,index(暂存区)中文件会回退。当然会显示工作目录下有修改，但没有缓存到index(暂存区)中。如需重新提交得先add,再commi
2. soft：只影响历史记录区；index(暂存区)和working copy(本地)中的文件都不改变。如需重新提交,不再需要add,只需要重新commit
3. hard：影响工作区、暂存区和历史记录区。这个标记很危险，执行了它，你的本地修改可能就丢失了。

3、`Git revert`

可以将一个分支的末端指向之前的一个commit，它会以创建新的`commit`的方式来撤销 commit，这样能保留之前的 commit 历史，比较安全。 另外，同样因为可能会覆盖本地的修改，所以执行这个指令之前，你需要 stash 或者 commit 暂存区和工作区的更改。

### 从文件层面来说

- `Git reset` 只是把文件从历史记录区拿到暂存区，不影响工作区的内容，而且不支持 --mixed、--soft 和 --hard。
- `Git checkout` 则是把文件从历史记录拿到工作区，不影响暂存区的内容。
- `Git revert` 不支持文件层面的操作。

## GitFlow 基本流程

`GitFlow` 是由 Vincent Driessen 提出的一个 git 操作流程标准。包含如下几个关键分支：

|   名称    | 说明                                                |
|:-------:|---------------------------------------------------|
| master  | 主分支                                               |
| develop | 主开发分支，包含确定即将发布的代码                                 |
| feature | 新功能分支，一般一个新功能对应一个分支，对于功能的拆分需要比较合理，以避免一些后面不必要的代码冲突 |
| release | 发布分支，发布时候用的分支，一般测试时候发现的 bug 在这个分支进行修复             |
| hotfix  | hotfix 分支，紧急修 bug 的时候用                            |

对于 feature 流程，都是从 develop 分支发起，然后通过 PR／MR 的方式合并回 develop 分支；
