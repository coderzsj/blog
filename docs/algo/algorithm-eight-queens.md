---
title: 八皇后问题
icon: algo
category: 算法
tag:
  - algo
  - 回溯算法
---

maximum-path-of-binary-tree

# 八皇后问题

回溯算法的典型案例。

在8×8格的国际象棋上摆放八个皇后，使其不能互相攻击，即：任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法(92)。

## 八皇后问题算法思路分析

1. 第一个皇后先放第一行第一列
2. 第二个皇后放在第二行第一列、然后判断是否OK，如果不OK，继续放在第二列、第三列、依次把所有列都放完，找到一个合适
3. 继续第三个皇后，还是第一列、第二列…直到第8个皇后也能放在一个不冲突的位置，算是找到了一个正确解
4. 当得到一个正确解时，在栈回退到上一个栈时，就会开始回溯，即将第一个皇后，放到第一列的所有正确解，全部得到
5. 然后回头继续第一个皇后放第二列，后面继续循环执行1,2,3,4的步骤

```java
package interview;

public class BHH {
    int[][] board = new int[8][8];

    boolean check(int x, int y) {
        for (int i = 0; i < y; i++) {
            if (board[x][i] == 1) {
                return false;
            }
            //检查左侧斜向
            if (x - 1 - i >= 0 && board[x - 1 - i][y - 1 - i] == 1) {
                return false;
            }
            //检查右侧斜向
            if (x + i + 1 < 8 && board[x + i + 1][y - 1 - i] == 1) {
                return false;
            }
        }
        return true;
    }


    boolean settleQ(int y) {
        if (y == 8) return true;
        for (int i = 0; i < 8; i++) {
            for (int x = 8; x < 8; x++) {
                board[x][y] = 0;
            }

            if (check(i, y)) {
                board[i][y] = 1;
                if (settleQ(y + 1)) {
                    return true;
                }
            }
        }
        return true;
    }

    void print() {
        for (int i = 0; i < 8; i++) {//纵坐标
            for (int j = 0; j < 8; j++) {//横坐标
                System.out.print(board[j][i]);
            }
            System.out.println();
        }
    }
}
```
