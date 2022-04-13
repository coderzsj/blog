(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{603:function(a,t,e){"use strict";e.r(t);var v=e(1),o=Object(v.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h2",{attrs:{id:"java-线程的通信方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#java-线程的通信方式"}},[a._v("#")]),a._v(" Java 线程的通信方式")]),a._v(" "),e("p",[a._v("通信的目的是为了更好的协作，线程无论是"),e("code",[a._v("交替")]),a._v("式执行，还是"),e("code",[a._v("接力")]),a._v("式执行，都需要进行通信告知。")]),a._v(" "),e("h2",{attrs:{id:"使用-volatile-保证可见性-synchronized"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用-volatile-保证可见性-synchronized"}},[a._v("#")]),a._v(" 使用 volatile 保证可见性 synchronized")]),a._v(" "),e("p",[a._v("Volatile 有两大特性，一是可见性(让线程之间进行通信)，二是有序性，禁止指令重排序")]),a._v(" "),e("p",[a._v("所有 volatile 修饰的变量一旦被某个线程更改，必须立即刷新到主内存\n所有 volatile 修饰的变量在使用之前必须重新读取主内存的值")]),a._v(" "),e("h2",{attrs:{id:"等待-通知机制-是基于-wait-和-notify-方法来实现的"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#等待-通知机制-是基于-wait-和-notify-方法来实现的"}},[a._v("#")]),a._v(" 等待/通知机制 是基于 wait 和 notify 方法来实现的")]),a._v(" "),e("p",[a._v("在一个线程内调用该线程锁对象的 wait 方法，线程将进入等待队列进行等待直到被通知或者被唤醒。")]),a._v(" "),e("p",[a._v("因为调用 wait 方法时，必须要先释放锁，如果没有持有锁将会抛出异常。")]),a._v(" "),e("h2",{attrs:{id:"join-方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#join-方式"}},[a._v("#")]),a._v(" join 方式")]),a._v(" "),e("p",[a._v("Join 可以理解成是线程合并，当在一个线程调用另一个线程的 join 方法时，当前线程阻塞等待被调用 join 方法的线程执行完毕才能继续执行，所以 join 的好处能够保证线程的执行顺序，但是如果调用线程的 join 方法其实已经失去了并行的意义，虽然存在多个线程，但是本质上还是串行的，join 实现其实也是基于 wait/notify(等待通知机制)。")]),a._v(" "),e("h2",{attrs:{id:"threadlocal-方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#threadlocal-方式"}},[a._v("#")]),a._v(" threadLocal 方式")]),a._v(" "),e("p",[a._v("ThreadLocal使用场合主要解决多线程中数据因并发产生不一致问题。")]),a._v(" "),e("p",[a._v("每个线程的中并发访问的数据提供一个副本，通过访问副本来运行业务，这样的结果是耗费了内存，单大大减少了线程同步所带来性能消耗，也减少了线程并发控制的复杂度。")]),a._v(" "),e("p",[a._v("ThreadLocal不能使用原子类型，只能使用Object类型。ThreadLocal的使用比synchronized要简单得多。")]),a._v(" "),e("p",[a._v("实现每一个线程都有自己的共享变量,绑定自己的值,cpu 下一次轮询，还能获取自己上次的状态。")]),a._v(" "),e("p",[a._v("ThreadLocal 方式的线程通信，不像以上三种方式是多个线程之间的通信，它更像是一个线程内部的通信，将当前线程和一个 map 绑定，在当前线程内可以任意存取数据，减省了方法调用间参数的传递。")])])}),[],!1,null,null,null);t.default=o.exports}}]);