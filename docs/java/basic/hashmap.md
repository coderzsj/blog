---
title: hashmap
icon: hashmap
category: java
tags:
  - 集合
  - java
---

## HASHMAP的内部结构（线程不安全、基于JDK7）

hashmap是无序的，因为每次根据 key 的 hashcode 映射到 Entry 数组上，所以遍历出来的顺序并不是写入的顺序。

HSAHMAP底层是基于数组和链表实现的，两个重要的参数：容量和负载因子；容量的默认大小的16，负载因子是0.75，当HashMap的size>16*0.75时就会发生扩容（容量和负载因子都可以自由调整）。

内部包含了一个ENTRY类型的数组TABLE。

```java
static class Entry<K,V> implements Map.Entry<K,V> {
    transient Entry[] table;
    final K key;
    V value;
    Entry<K, V> next;
    int hash;

    Entry(int h, K k, V v, Entry<K, V> n) {
        value = v;
        next = n;
        key = k;
        hash = h;
    }

    public final K getKey() {
        return key;
    }

    public final V getValue() {
        return value;
    }

    public final V setValue(V newValue) {
        V oldValue = value;
        value = newValue;
        return oldValue;
    }

    public final boolean equals(Object o) {
        if (!(o instanceof Map.Entry))
            return false;
        Map.Entry e = (Map.Entry) o;
        Object k1 = getKey();
        Object k2 = e.getKey();
        if (k1 == k2 || (k1 != null && k1.equals(k2))) {
            Object v1 = getValue();
            Object v2 = e.getValue();
            if (v1 == v2 || (v1 != null && v1.equals(v2)))
                return true;
        }
        return false;
    }

    public final int hashCode() {
        return Objects.hashCode(getKey()) ^ Objects.hashCode(getValue());
    }

    public final String toString() {
        return getKey() + "=" + getValue();
    }
}
```

## HashMap 特性

1. 存储键值对实现快速存取，允许为null。key值不可重复，若key值重复则覆盖。
2. 非同步，线程不安全。
3. 底层是hash表，不保证有序(比如插入的顺序，自然顺序)

Treemap默认按照key的字典顺序来排序(升序) ，也可以自定义排序规则:要实现Comparator接口。

ArrayList，linkedList插入和检索顺序是一样的。

LinkedHashMap实现顺序性

## HashMap的底层原理

基于hashing的原理，jdk8后采用数组+链表+红黑树的数据结构。

我们通过put和get存储和获取对象。

当我们给put()方法传递键和值时，先对键做一个hashCode()的计算来得到它在bucket数组中的位置来存储Entry对象。

当获取对象时，通过get获取到bucket的位置，再通过键对象的equals()方法找到正确的键值对，然后在返回值对象。

## put方法实现

1. 计算关于key的hashcode值（与Key.hashCode的高16位做异或运算）
2. 如果散列表为空时，调用resize()初始化散列表
3. 如果没有发生碰撞，直接添加元素到散列表中去
4. 如果发生了碰撞(hashCode值相同)，进行三种判断
    - 若key地址相同或者equals后内容相同，则替换旧值
    - 如果是红黑树结构，就调用树的插入方法
    - 链表结构，循环遍历直到链表中某个节点为空，尾插法进行插入，插入之后判断链表个数是否到达变成红黑树的阙值8；也可以遍历到有节点与插入元素的哈希值和内容相同，进行覆盖。

### 扩容机制 

如果桶满了大于阀值，则resize进行扩容

1. 初始化数组table
2. 当数组table的size达到阙值时即++size > load factor * capacity 时，也是在putVal函数中

扩容需要重新分配一个新数组，新数组是老数组的2倍长，然后遍历整个老结构，把所有的元素挨个重新hash分配到新结构中去。

::: info ps

可见底层数据结构用到了数组，到最后会因为容量问题都需要进行扩容操作

:::

## get方法实现

对key的hashCode进行hashing，与运算计算下标获取bucket位置，如果在桶的首位上就可以找到就直接返回，否则在树中找或者链表中遍历找。

如果有hash冲突，则利用equals方法去遍历链表查找节点。

## hash方法实现

对key的hashCode做hash操作，与高16位做异或运算

还有平方取中法，除留余数法，伪随机数法

### 异或运算原因

为什么不直接将key作为哈希值而是与高16位做异或运算？

因为数组位置的确定用的是与运算，仅仅最后四位有效，设计者将key的哈希值与高16为做异或运算使得在做&运算确定数组的插入位置时，此时的低位实际是高位与低位的结合，增加了随机性，减少了哈希碰撞的次数。

HashMap默认初始化长度为16，并且每次自动扩展或者是手动初始化容量时，必须是2的幂。

### 2次幂原因

为什么是16？为什么必须是2的幂？如果输入值不是2的幂比如10会怎么样？

1. 为了数据的均匀分布，减少哈希碰撞。因为确定数组位置是用的位运算，若数据不是2的次幂则会增加哈希碰撞的次数和浪费数组空间。(PS:其实若不考虑效率，求余也可以就不用位运算了也不用长度必需为2的幂次) `hash % length 等于 hash & ( length - 1)`

2. 输入数据若不是2的幂，HashMap通过一通位移运算和或运算得到的肯定是2的幂次数，并且是离那个数最近的数字,

按位与运算规则:相同的二进制数位上,都是1的时候,结果为1.否则为0;

### 解决hash冲突

```java
static final int hash(Object key) {
	int h;
	return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

key 的 hashCode 赋值给 h，然后与 h 无符号右移 16 位后的二进制进行按位异或得到最后的 hash 值。

会产生哈希碰撞，若key值相同则替换旧值，不然链接到链表后面，链表长度超过阙值8就转为红黑树存储

HashCode相同，通过equals比较内容获取值对象

### 扩容 

如果HashMap的大小超过了负载因子(load factor)定义的容量

超过阙值会进行扩容操作，概括的讲就是扩容后的数组大小是原数组的2倍，将原来的元素 rehash 放入到新的散列表中去。

扩容这个过程涉及到 rehash、复制数据等操作，非常消耗性能。所以开发中尽量减少扩容的次数，可以通过创建 HashMap 集合对象时指定初始容量来尽量避免。

### rehash方法：不需要重新计算hash

因为每次扩容都是翻倍，扩容之后结点要么就在原来的位置，与原来计算的 (n - 1) & hash 的结果相比，只是多了一个 bit 位，rehash设计为结点要么就在原来的位置，要么就被分配到 **“原位置 + 旧容量”** 这个位置。

元素桶位置，新增的 1bit 是0还是 1是随机的，在 resize 的过程中保证了 rehash 之后每个桶上的结点数一定小于等于原来桶上的结点数，保证了rehash之后不会出现更严重的 hash 冲突，均匀的把之前的冲突的结点分散到新的桶中了。

## hashtable

Hashtable没有自定义哈希算法，而直接采用的key的hashCode()。

## loadFactor

loadFactor表示HashMap的拥挤程度，影响hash操作到同一个数组位置的概率。

默认loadFactor等于0.75，当HashMap里面容纳的元素已经达到HashMap数组长度的75%时，表示HashMap太挤了，需要扩容，在HashMap的构造器中可以定制loadFactor。

## 红黑树

### 二叉查找树

二叉查找树就是左结点小于根节点，右结点大于根节点的一种排序树，也叫二叉搜索树。也叫BST，英文Binary Sort Tree。

二叉查找树比普通树查找更快，查找、插入、删除的时间复杂度为`O（logN）`。但是二叉查找树有一种极端的情况，就是会变成一种线性链表似的结构。此时时间复杂度就变成了`O（N）`，为了解决这种情况，出现了二叉平衡树。

### avl

平衡二叉树全称平衡二叉搜索树，也叫AVL树。是一种自平衡的树。

AVL树也规定了左结点小于根节点，右结点大于根节点。并且还规定了左子树和右子树的高度差不得超过1。

这样保证了它不会成为线性的链表。

AVL树的查找稳定，查找、插入、删除的时间复杂度都为O（logN），但是由于要维持自身的平衡，所以进行插入和删除结点操作的时候，需要对结点进行频繁的旋转。

### RedBlack树

红黑树的使用场景
java中使用到红黑树的有TreeSet和JDK1.8的HashMap。

红黑树也叫RB树，RB-Tree。是一种自平衡的二叉查找树，它的节点的颜色为红色和黑色。它不严格控制左、右子树高度或节点数之差小于等于1。也是一种解决二叉查找树极端情况的数据结构。

当链表长度大于8时，遍历查找效率较慢，故引入红黑树;因为红黑树在插入新数据之后，可能会通过左旋、右旋、变色来保持平衡，故链路较短时，不适合用红黑树。

红黑树的特性：

1. 节点是红色或黑色。
2. 根节点是黑色。
3. 每个叶子节点都是黑色的空节点（NIL节点）。
4. 每个红色节点的两个子节点都是黑色。也就是说从每个叶子到根的所有路径上不能有两个连续的红色节点)。
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

旋转的目的是将节点多的一支出让节点给另一个节点少的一支，旋转操作在插入和删除操作中经常会用到，所以要熟记。



它们非常相似，真正的区别在于在任何添加/删除操作时完成的旋转操作次数。保证平衡性的最大目的就是降低术的高度，因为树的查找性能取决于树的高度，所以树的高度越低搜索的效率越高！

这也是为什么存在二叉树、搜索二叉树等，各类树的目的。

红黑树在查找方面和AVL树操作几乎相同。 但是在插入和删除操作上，AVL树每次插入删除会进行大量的平衡度计算，红黑树没有像avl严格的高度平衡，它只要求部分地达到平衡要求，结合变色，降低了对旋转的要求，从而提高了性能。

红黑树能够以`O(log^2n)`的时间复杂度进行搜索、插入、删除操作。此外，由于它的设计，任何不平衡都会在三次旋转之内解决。

## 平时在使用HashMap时一般使用什么类型的元素作为Key？

选择`Integer`，`String`这种不可变的类型，像对`String`的一切操作都是新建一个`String`对象，对新的对象进行拼接分割等，这些类已经很规范的覆写了`hashCode()`以及`equals()`方法。作为不可变类天生是线程安全的，

## HashMap

JDK1.7版本，HashMap的数据结构是什么？

数组+单向链表

什么叫做Hash桶

数组中的单向链表

HashMap的数组长度为什么必须是2的幂？

计算元素存在数组中下标的算法：hash值 & 数组长度-1

如果数组长度不是2的幂，减1后二进制的某一位有可能出现0，导致数组某个位置永远存不到数据

HashMap的默认负载因子是多少，作用是什么？

默认负载因子是0.75

作用：数组长度*负载因子=阈值（扩容条件）

HashMap的默认负载因子为什么是0.75？

取得了时间和空间的平衡

假设负载因子过大，导致数组装满后才扩容，牺牲时间，利用空间

假设负载因子过小，导致数组装载较少内容就扩容，牺牲空间，利用时间

HashMax数组最大长度是多少？

1 << 30

HashMap数组最大长度为什么是1 << 30？

因为数组长度必须是2的幂并且HashMap数组最大长度的变量为int类型，所有1<<30

什么叫做Hash碰撞/冲突？

两个对象的hash值一样，导致在数组中的下标一样

HashMap何时扩容？

元素个数>=阈值，并且存入数据的位置不等于null

## HashMap扩容机制是什么？

1. 如果节点的NEXT属性为NULL，则说明这个一个最正常的节点，不是桶内链表，也不是红黑树，这样的节点可以直接计算索引位置，然后插入。
2. 如果是一颗红黑树，会使用SPLIT方法进行处理，原理就是将红黑树拆分成两个TREENODE链表，然后判断每个链表的长度是否小于等于六，如果是，九江TREENODE转换成桶内链表，否则再转换成红黑树。
3. 如果是桶内链表，则将链表拷贝到新数组中，保证链表的顺序不变。

原来的2倍，在REHASH之后，元素的存放位置要么是在原位置，要么是在原位置的基础上向下移动之前容量个数的位置。比如：上次容量是16，下次扩容后容量变成了16*2=32。如果一个元素原先在下表为七的位置上，那么扩容后，该元素要么还在七的位置上，要么就在七加十六的位置上。

HashMap存入null键的位置？

hash数组下标为0的位置

什么叫做Hash回环？

多线程下会出现Hash回环

线程1：不断添加数据，导致不断扩容

线程2：不断遍历

出现Hash回环，活该，HashMap明确说明该集合不是个线程安全的集合，多线程下应该使用ConcurrentHashMap

JDK1.7版本和JDK1.8版本的HashMap的区别

JDK1.7：数组+链表，头插法，通过散列算法获取hash值

JDK1.8：数组+链表+红黑树，尾插法，通过低16位^高16位让hash值更加散列

JDK1.8版本HashMap为什么添加红黑树的数据结构？

因为链表查询慢，红黑树查询快

JDK1.8版本什么时候由数组+链表变成数组+红黑树

链表长度>8并且数组长度>64时，从数组+链表变成数组+红黑树

JDK1.8版本为什么链表长度大于8时，变成数组+红黑树

因为泊松部分（统计概率学），当红黑树里的数据小于6
时，又会将数组+红黑树变会数组+链表；而且根据统计，链表中节点数是8的概率已经接近千分之一，而且此时链表的性能已经很差了。
