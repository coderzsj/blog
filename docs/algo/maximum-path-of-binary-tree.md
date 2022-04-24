---
title: 二叉树的最大路径
category: 算法
---


```java
class T{
    public int maxPathLen(TreeNode root) {
        int[] max = new int[]{Integer.MIN_VALUE};
        dfs(root, max);
        return max[0];
    }

    private int dfs(TreeNode root, int[] max) {
        if (root == null) return 0;

        int lHeight = dfs(root.left, max);
        int rHeight = dfs(root.right, max);

        if (lHeight + root.val + rHeight > max[0]) max[0] = lHeight + root.val + rHeight;
        if (lHeight + root.val > max[0]) max[0] = lHeight + root.val;
        if (root.val + rHeight > max[0]) max[0] = root.val + rHeight;
        if (root.val > max[0]) max[0] = root.val;

        return Math.max(root.val, Math.max(lHeight + root.val, root.val + rHeight));
    }
}

```
