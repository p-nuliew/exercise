// 一、作用域是什么？
// 作用域是规定变量或函数可访问范围的一套规则。作用域的范围是在代码预解析阶段就确定的。
// 包括全局作用域和函数作用域

// 全局作用域包括以下三种方式定义的变量或函数
// 1、在全局对象(window)下定义的属性与方法
// 2、在最外层申明的属性与方法
// 3、在非严格模式中，函数作用域中未申明直接赋值的属性与方法

// 我们应该尽量避免在全局下定义属性和方法，有以下缺陷：
// 1、我们可能无意间修改了全局变量的值，但其他场景不知道
// 2、命名冲突
// 3、在应用程序的执行过程中，全局变量的内存无法释放

// 函数作用域
// 函数表达式或函数申明让花括号具备作用域，我们称之为函数作用域。
// 函数作用域中的变量和方法只能被下层子作用域访问

// var arr = [1, 2, 3, 4, 5];

// for (var i = 0; i < arr.length; i++) {
//   console.log('do something by ', i);
// }

// console.log(i); // i == 5

// 要注意的是，函数作用域的范围信息，在预解析的时候就已经确定了，
// 虽然没有执行foo1，但是foo1的作用域信息已经确定了
// function foo1() {
//   console.log('foo1')
// }
// function foo2() {
//   console.log('foo2')

// }
// foo2();


// 模拟块作用域
// 在没有块作用域之前，我们可以使用自执行函数模拟块作用域
// var arr = [1, 2, 3, 4, 5];

// // 自执行函数
// (function () {
//   for (var i = 0; i < arr.length; i++) {
//     console.log('do something by ', i);
//   }
// })();

// console.log(i); // i is not defined


// 块作用域 let/const
// 使用let/const申明的变量能被任何花括号约束，这就是我们说的块作用域
// {
//   let a = 10
// }
// console.log(a); // Uncaught ReferenceError: a is not defined

// for (let i = 1; i <= 5; i++) {
//   console.log(i);
// }
// 1、let 申明的变量不能被重复申明，否则会报错
// let a = 10
// let a = 20  // Uncaught SyntaxError: Identifier 'a' has already been declared
// 2、let 申明的变量不会提前赋值为undefined
// console.log(a); // Uncaught ReferenceError: Cannot access 'a' before initialization
// let a = 10
// 3、let 申明的变量存在暂时性死区，如果提前对它进行访问或操作，会报错

// const 声明的基础数据类型，对应的值不能被修改
// const a = 1
// a = 2 // Uncaught TypeError: Assignment to constant variable.

// const 声明的引用数据类型地址不能被修改
// const a = { n: 1 }
// // a = {}   // 这样不行
// a.n = 2 // 这样可以修改
// console.log(a)

// 作用域链
// 在一个函数内，能访问哪些变量，都必须要有一个具体的范围体现出来，因此有了作用域链。
// 每一个函数都有一个[[scopes]]属性，它是由一系列对象组成的数组。
// 每一个对象，都对应了一个父级作用域。
// 它们是从对应的父级作用域中，收集到的当前函数作用域内[会使用到的](在预编译阶段做了优化)变量申明、函数申明、函数参数的集合。

// 完整作用域链的组成部分
// Global全局对象：不会做任何优化，包含了所有变量和方法
// Script对象: 在全局作用域下，使用let、const申明的变量或方法
// Closure对象：闭包对象，包含了当前函数作用域能访问的变量和方法
// Local对象：我们称之为活动对象，以上三个都是在预编译阶段确定的，但是local是在函数的执行过程中确定的，而且属性是随时都会变化的，该对象除了会储存当前函数上下文中的所有变量和方法，还会额外记录this的指向

const a = 20;
var aa =1

function test() {
  const b = a + 10;

  function innerTest() {
    const c = 10;
    console.dir(innerTest);
    return b + c;
  }

  return innerTest();
}

test();

// function foo(params) {
//   let a = 1;
//   function bar(params) {
//     const b = ++a;
//     console.log(b);
//   }
//   console.log(a);
//   return bar;
// }

// var fo = foo();
// fo();

// function f1() {
//   var n = 999;
//   function f2() {
//     alert(n);
//   }
//   return f2;
// }
// var result = f1();
// result();

// const 声明，在其他函数的作用域链中，会归属于 Script 对象中去
// const a = 20;

// let aaa = () => {}

// function test() {
//   const b = a + 10;
//   var m = 20;
//   const x = 10
//   const y = 20

//   function innerTest() {
//     console.log(x, y)
//     const c = 10 + m;
//     console.dir(innerTest)

//     function bar() {
//       console.log(c)
//       console.dir(bar)
//     }
//     return bar;
//   }

//   return innerTest();
// }

// var foo = test();
// foo()