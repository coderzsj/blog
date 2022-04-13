---
title: es6
icon: Vue
category: js
time: 2021-09-20
tag:
  - es6
---

## es6

一种通过重用组件构建类的方法。

不通过类的直接继承来实现，而是将基类作为接口来实现。对于基类实例化部分在子类中实现，基类中原型的部分在子类中进行声明占位，然后通过一个 Minxin 函数将基类上的原型属性拷贝到子类上。

## promise

用来处理异步任务的一个对象，一个 Promise 对象有三个状态，resolved 异步任务执行成功，rejected 异步任务执行失败

### 使用

初始化一个 Promise 对象
new Promise(fn)

然后调用上一步返回的 promise 对象的 then 方法，注册回调函数。

Then 中的回调函数可以有一个参数，也可以不带参数。如果 then 中的回调函数依赖上一步的返回结果，那么要带上参数。比如:

最后注册 catch 异常处理函数，处理前面回调中可能抛出的异常。

回调地狱带来的负面作用有以下几点：

处理一个异步网络请求

```js
请求1(function (请求结果1) {
  请求2(function (请求结果2) {
    处理请求结果2;
  });
});
```

代码臃肿。
可读性差。
耦合度过高，可维护性差。
代码复用性差。
容易滋生 bug。
只能在回调里处理异常。

比传统的异步解决方案【回调函数】和【事件】更合理、更强大。

```js
new Promise(请求1)
  .then(请求2(请求结果1))
  .then(请求3(请求结果2))
  .then(请求4(请求结果3))
  .then(请求5(请求结果4))
  .catch(处理异常(异常信息));
```

比较一下这种写法和上面的回调式的写法。我们不难发现，Promise 的写法更为直观，并且能够在外层捕获异步函数的异常信息。

### Promise.resolve(value)

类方法，该方法返回一个以 value 值解析后的 Promise 对象 1、如果这个值是个 thenable(即带有 then 方法)，返回的 Promise 对象会“跟随”这个 thenable 的对象，采用它的最终状态(指 resolved/rejected/pending/settled)
2、如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
3、其他情况以该值为成功状态返回一个 Promise 对象。

上面是 resolve 方法的解释，传入不同类型的 value 值，返回结果也有区别。这个 API 比较重要，建议大家通过练习一些小例子，并且配合上面的解释来熟悉它。如下几个小例子：

```js
//如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
function fn(resolve) {
  setTimeout(function () {
    resolve(123);
  }, 3000);
}
let p0 = new Promise(fn);
let p1 = Promise.resolve(p0);
// 返回为true，返回的 Promise 即是 入参的 Promise 对象。
console.log(p0 === p1);
```

### Promise.prototype.then

实例方法，为 Promise 注册回调函数，函数形式：fn(vlaue){}，value 是上一个任务的返回结果，then 中的函数一定要 return 一个结果或者一个新的 Promise 对象，才可以让之后的 then 回调接收

### Promise.prototype.catch

实例方法，捕获异常，函数形式：fn(err){}, err 是 catch 注册 之前的回调抛出的异常信息。

## Promise 的升级 async / await

Async/await 也是基于 Promise 实现的，

Async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。
