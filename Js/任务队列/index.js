setTimeout(function () {
  console.log("timeout1");
});

new Promise(function (resolve) {
  console.log("promise1");
  for (var i = 0; i < 1000; i++) {
    i == 99 && resolve();
  }
  console.log("promise2");
}).then(function () {
  console.log("then1");
});

console.log("global1");

// 像setTimeout/promise我们称之为任务源，它又作为任务分发器，本身是立即执行的，而进入任务队列的具体任务是延迟执行的
// setTimeout 会把第一个参数压入任务队列延迟执行
// Promise 由于执行了 new 关键词的操作，构造函数的第一个参数会马上执行

// 任务队列是先进先出
// 事件循环的顺序，决定了js代码的执行顺序
// 任务可以分为宏任务和微任务
// 宏任务(macro-task)：script(整体代码)、setTimeout、setInterval、ui rendering、setImmediate(node), I/O（一般为ajax，读文件等）
// 微任务(micro-task)：process.nextTick(node)、promise、mutationObserver(html5新特性)
// js线程是唯一的，执行队列可以是多个的
// 不管是宏任务还是微任务，任务的执行都是在函数调用栈执行的
// 函数调用栈的执行顺序是先入后出

// 事件循环的顺序：
// 从script（整体代码）开始第一次循环。之后进入函数调用栈，等调用栈清空（只剩global），然后执行所有的微任务。
// 当所有微任务执行完毕之后，循环再次从宏任务开始，找到其中一个任务队列，执行完毕，再执行所有的微任务，这样一直循环下去

// 以上代码执行步骤：
// 假设把打印的名字当作任务的名称

// 1. 从script开始第一次循环
// 2. 遇到setTimeout, 创建一个宏任务(timeout1)
// 3. Promise 构造函数在new的时候被执行了，所以按顺序输出 promise1 和 promise2
// 4. 遇到then，创建一个微任务（then1），
// 5. 最后输出global1，第一轮宏任务结束
// 6. 查看微任务队列，发现有个then1等待执行，于是输出then1，第一轮循环结束
// 7. 开始第二轮循环，查看宏任务队列，发现timeout1，于是输出promise1，所有任务执行完成
