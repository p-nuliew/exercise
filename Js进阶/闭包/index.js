// https://xiaozhuanlan.com/topic/9283417506
// 什么叫闭包
// 闭包是一个特殊的对象，它由两部分组成，执行上下文A以及在A中创建的函数B
// 当B执行时，如果访问了A中的变量对象，那么闭包就产生了

// 在chrome中，执行上下文A的函数名代指闭包
// 闭包对象[Closure(A)]的引用存在于B函数体内存中，如果B函数体被回收，闭包对象同样也会回收

var fn = function () {
  var a = 1;
  (function f() {
    console.log(++a); // 这时候闭包产生了，
  })();
  console.log(a); //运行到这里是，f的执行上下文被销毁，闭包也消失了。此时fn中的a变成了2
};
fn(); // 等fn执行完，fn的执行上下文也被销毁
