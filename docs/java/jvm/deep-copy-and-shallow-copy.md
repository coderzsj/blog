---
title: Shallow&Deep copy
category: jvm
tag:
  - 深拷贝和浅拷贝
---

## 基本类型和引用类型

### 在Java中数据类型可以分为两大类：基本类型和引用类型

基本类型也称为值类型，分别是字符型char，布尔型boolean以及数值型 byte、short、int、long、float、double。

引用类型则包括类、接口、数组、枚举等。

### 内存空间分为堆和栈

基本类型直接在栈中存储数值，而引用类型是将引用放在栈中，实际存储的值是放在堆中，通过栈中的引用指向堆中存放的数据。

开发过程中，有时会遇到把现有的一个对象的所有成员属性拷贝给另一个对象的需求。

## 创建对象的5种方式

①、通过 new 关键字

　　这是最常用的一种方式，通过 new 关键字调用类的有参或无参构造方法来创建对象。比如 Object obj = new Object();

②、通过 Class 类的 newInstance() 方法

这种默认是调用类的无参构造方法创建对象。

比如 `Person p2 = (Person) Class.forName("com.ys.test.Person").newInstance();`

③、通过 Constructor 类的 newInstance 方法

这和第二种方法类时，都是通过反射来实现。通过 java.lang.relect.Constructor 类的 newInstance() 方法指定某个构造器来创建对象。

`Person p3 = (Person) Person.class.getConstructors()[0].newInstance();`

实际上第二种方法利用 Class 的 `newInstance()`方法创建对象，其内部调用还是 Constructor 的 newInstance() 方法。

④、利用 Clone 方法

`Clone` 是 `Object` 类中的一个方法，通过 对象`A.clone()`方法会创建一个内容和对象 A 一模一样的对象 B，clone 克隆，顾名思义就是创建一个一模一样的对象出来。

`Person p4 = (Person) p3.clone();`

⑤、反序列化

序列化是把堆内存中的 Java 对象数据，通过某种方式把对象存储到磁盘文件中或者传递给其他网络节点（在网络上传输）。而反序列化则是把磁盘文件中的对象数据或者把网络节点上的对象数据，恢复成Java对象模型的过程。

## Clone 方法

　本篇博客我们讲解的是 Java 的深拷贝和浅拷贝，其实现方式正是通过调用 Object 类的 clone() 方法来完成。在 Object.class 类中，源码为：

`protected native Object clone() throws CloneNotSupportedException;`

ative 修饰的方法就是告诉操作系统，这个方法我不实现了，让操作系统去实现。具体怎么实现我们不需要了解，只需要知道 clone方法的作用就是复制对象，产生一个新的对象。

## 深拷贝

深拷贝：创建一个新对象，然后将当前对象的非静态字段复制到该新对象，无论该字段是值类型的还是引用类型，都复制独立的一份。

当你修改其中一个对象的任何内容时，都不会影响另一个对象的内容。

①、让每个引用类型属性内部都重写clone() 方法

既然引用类型不能实现深拷贝，那么我们将每个引用类型都拆分为基本类型，分别进行浅拷贝。比如上面的例子，Person 类有一个引用类型 Address(其实String 也是引用类型，但是String类型有点特殊，后面会详细讲解)，我们在 Address 类内部也重写 clone 方法。如下：

测试还是和上面一样，我们会发现更改了p2对象的Address属性，p1 对象的 Address 属性并没有变化。

但是这种做法有个弊端，这里我们 Person 类只有一个 Address 引用类型，而 Address 类没有，所以我们只用重写 Address 类的clone 方法，但是如果 Address 类也存在一个引用类型，那么我们也要重写其clone 方法，这样下去，有多少个引用类型，我们就要重写多少次，如果存在很多引用类型，那么代码量显然会很大，所以这种方法不太合适。

②、利用序列化

序列化是将对象写到流中便于传输，而反序列化则是把对象从流中读取出来。这里写到流中的对象则是原始对象的一个拷贝，因为原始对象还存在 JVM 中，所以我们可以利用对象的序列化产生克隆对象，然后通过反序列化获取这个对象。

注意每个需要序列化的类都要实现 Serializable 接口，如果有某个属性不需要序列化，可以将其声明为 transient，即将其排除在克隆属性之外。

因为序列化产生的是两个完全独立的对象，所有无论嵌套多少个引用类型，序列化都是能实现深拷贝的。
