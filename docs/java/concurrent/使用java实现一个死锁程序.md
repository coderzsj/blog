死锁:在java语言中,死锁是指在两个或者两个以上的线程执行的过程中,因争夺资源而产生的一种互相等待的现象

同步锁使用的弊端：当线程任务中出现了多个同步(多个锁)时，如果同步中嵌套了其他的同步。这时容易引发一种现象：程序出现无限等待，这种现象我们称为死锁。这种情况能避免就避免掉。

```java
class T {
    synchronzied(A锁) {
        undefined
        synchronized (B锁) {
            undefined
        }
    }
}

```

我们进行下死锁情况的代码演示：

定义锁对象类

```java
public class MyLock {
    public static final Object lockA = new Object();
    public static final Object lockB = new Object();
}
```

线程任务类

```java
public class ThreadTask implements Runnable {
    int x = new Random().nextInt(1);//0,1
//指定线程要执行的任务代码
    @Override
    public void run() {
        while (true) {
            if (x % 2 == 0) {
                //情况一
                synchronized (MyLock.lockA) {
                    System.out.println("if-LockA");
                    synchronized (MyLock.lockB) {
                        System.out.println("if-LockB");
                        System.out.println("if大口吃肉");
                    }
                }
            } else {
                //情况二
                synchronized (MyLock.lockB) {
                    System.out.println("else-LockB");
                    synchronized (MyLock.lockA) {
                        System.out.println("else-LockA");
                        System.out.println("else大口吃肉");
                    }
                }
            }
            x++;
        }
    }
}
```

测试类

```java
public class ThreadDemo {
    // undefined
    public static void main(String[] args) {
        // undefined
        //创建线程任务类对象
        ThreadTask task = new ThreadTask();
        //创建两个线程
        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        //启动线程
        t1.start();
        t2.start();
    }
}
```

解决死锁问题的方法是：一种是用`synchronized`，一种是用`Lock`显式锁实现。

而如果不恰当的使用了锁，且出现同时要锁多个对象时，会出现死锁情况 
