---
title: maximum-depth-of-a-binary-tree
icon: algo
category: algo
tag:
  - algo
---

## 二叉树的最大深度

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的路径上的节点数。

说明:

叶子节点是指没有子节点的节点。

给定二叉树`[3,9,20,null,null,15,7]`

    3
   / \
  9  20
    /  \
   15   7

```

返回它的最大深度 3 。

解题思路：

要求二叉树的最大深度，我们可以先求出左子树和右子树的深度 l 和 r

那就可以计算出二叉树的最大深度了：max( l,r )+1

而左子树和右子树的最大深度又可以以同样的方式进行计算。

因此我们可以用「深度优先搜索」的方法来计算二叉树的最大深度。

具体而言，在计算当前二叉树的最大深度时，可以先递归计算出其左子树和右子树的最大深度，然后在 O(1) 时间内计算出当前二叉树的最大深度。递归在访问到空节点时退出。

:::: 递归求最大深度

```java

class TreeNode {
    Node left;
    Node right;
}

class Solution {
    public int maxDepth(TreeNode root) {
           //递归终止情况：节点为空
            if (root == null)
            {
                return 0;
            }
            else{
             int ldpeth = maxDepth(root.left);
             int rdpeth = maxDepth(root.right);
              return Math.max(ldpeth , rdpeth ) + 1;
            }
    }
}
```

通过
执行用时：100 ms，在所有 C# 提交中击败了 43.46%的用户
内存消耗：25.7 MB，在所有 C# 提交中击败了 10.73%的用户

时间复杂度：O(n) O( n )其中 n 为二叉树节点的个数。每个节点在递归中只被遍历一次。
空间复杂度：O(n) 空间复杂度：O( height ) 其中 height 表示二叉树的高度。递归函数需要栈空间，而栈空间取决于递归的深度，因此空间复杂度等价于二叉树的高度。

## 广度优先搜索

思路：广度优先搜索的队列里存放的是「当前层的所有节点」。

每次拓展下一层的时候，不同于广度优先搜索的每次只从队列里拿出一个节点，

我们需要将队列里的所有节点都拿出来进行拓展，这样能保证每次拓展完的时候队列里存放的是当前层的所有节点，即我们是一层一层地进行拓展，最后我们用一个变量 ans 来维护拓展的次数，该二叉树的最大深度即为 ans。

```java

class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = 0, p2 = 0;
        int[] sorted = new int[m + n];
        int cur;
        while (p1 < m || p2 < n) {
            if (p1 == m) {
                cur = nums2[p2++];
            } else if (p2 == n) {
                cur = nums1[p1++];
            } else if (nums1[p1] < nums2[p2]) {
                cur = nums1[p1++];
            } else {
                cur = nums2[p2++];
            }
            sorted[p1 + p2 - 1] = cur;
        }
        for (int i = 0; i != m + n; ++i) {
            nums1[i] = sorted[i];
        }
    }
}
```

## 深度优先遍历

指对每一个可能的分支路径深入到不能再深入为止，而且每个节点只能访问一次。

二叉树的深度优先遍历分为：先序遍历，中序遍历和后序遍历

- 先序遍历：先访问根，在访问左子树，最后访问右子树，总结就是“根左右”；
- 中序遍历：先访问左子树，再访问根，最后访问右子树，总结就是“左根右”；
- 后序遍历：先访问左子树，再访问右子树，最后访问根，总结就是“左右根”。