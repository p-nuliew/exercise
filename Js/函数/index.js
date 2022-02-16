// 函数写法
// 函数声明，除了函数声明不可省略函数名，其他写法都可以省略函数名
function a () {}

// 函数表达式
const b = function () {}    // 匿名
const c = function cc () {}   // 具名

// 匿名函数表达式
// 1.在函数参数中常见
const d = setTimeout(function () {}, 1)  // 匿名函数

// 行内函数表达式，可具名可匿名
const g = setTimeout(function () {}, 1000)  // 匿名的
const f = setTimeout(function timer () {}, 1000)  // 具名的

// 立即执行函数表达式(IIFE)
// 两种写法同种意思，看个人喜好
// 写法一
(function () {
  console.log(12);
}())

(function () {
  console.log(23);
})()

// 写法二
(function () {}())
(function IIFE () {}())

var obj = {
  a: 1,
  fn () {
    console.log('fn');
  },
  fn1: function () {
    console.log('fn1');
  },
  fn2: () => {
    console.log('fn2');
  }
}