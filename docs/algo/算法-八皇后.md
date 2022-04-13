---
title: 8Queens
icon: algo
category: algo
tag:
  - algo
---

## 八皇后

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
   if(x-1-i >= 0 && board[x-1-i][y-1-i] == 1) {
    return false;
   }
   //检查右侧斜向
   if (x+i+1 < 8 && board[x+i+1][y-1-i] == 1) {
    return false;
   }
  }
  return true;
 }


 boolean settleQ(int y) {
  if (y == 8) return true;
  for (int i = 0; i < 8; i++) {
   for(int x=8; x<8; x++) {
    board[x][y]=0;
   }

   if (check(i, y)) {
    board[i][y] = 1;
    if (settleQ(y+1)) {
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
