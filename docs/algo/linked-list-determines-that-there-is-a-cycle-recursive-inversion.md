---
title: 链表算法
icon: algo
category: 算法
tag:
  - algo
---

## 链表算法

判断链表是否有环

定义一个临时变量引用指向当前的节点

定义一个 hashmap。Key 与 value 当时当前的节点。

该节点存在于 hashmap 中，node.get(tmp) ，则确定有环， 没有就存放该的节点。

## 单链表反转

从当前链表的首节点开始循环遍历，一直到链表的最后一个节点，会逐个改变所遍历的节点的指针域，另其指向前一个节点。

具体的实现方法也很简单，借助三个指针即可。首先我们定义 3 个指针并分别命名为 begn，mid，end。他们的初始指向如图 3 所示：

[](docs/algo/img/1-1.png)

## 递归反转

链表的尾节点开始，依次向前遍历，遍历过程一次改变各节点的指向，即另其指向前一个节点。

```java
class Node {
 private int Data;// 数据域
 private Node Next;// 指针域
 public Node(int Data) {
  // super();
  this.Data = Data;
 }
}

```

```java
public class javatest1 {
    public static void main(String[] args) {
        Node head = new Node(0);
        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);
        head.setNext(node1);
        node1.setNext(node2);
        node2.setNext(node3);

        // 调用反转方法
        head = Reverse1(head);
         while (null != head) {
            System.out.print(head.getData() + " ");
            head = head.getNext();
        }
    }

    /**
     * 递归，在反转当前节点之前先反转后续节点
     */
    public static Node Reverse1(Node head) {
        // head看作是前一结点，head.getNext()是当前结点，reHead是反转后新链表的头结点
        if (head == null || head.getNext() == null) {
            return head;// 若为空链或者当前结点的下一个节点在尾结点，则直接还回
        }
        Node reHead = Reverse1(head.getNext());// 先反转后续节点head.getNext()
        head.getNext().setNext(head);// 将当前结点的指针域指向前一结点
        head.setNext(null);// 前一结点的指针域令为null;
        return reHead;// 反转后新链表的头结点
    }
}


```
