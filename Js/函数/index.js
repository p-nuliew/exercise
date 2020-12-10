var o = {
  a: function () {
    console.log('a');
  },
  b() {
    console.log('b');
  }
}

console.log(o);

// 提升
// 一个普通块内部的函数声明通常会被提升到所在作用域的顶部，但是条件判断将不会提升

// foo() // TypeError: foo is not a function
// var a = true;
// if (a) {
//   function foo () {
//     console.log(123);
//   }
// }

// function foo () {
//   var a = 2;

//   function bar () {
//     a++
//     console.log(a);
//   }

//   bar()
//   bar()
// }

// foo()

// function foo () {
//   var a = 2;

//   function bar () {
//     a++
//     console.log(a);
//   }

//   return bar
// }

// var baz = foo()
// baz()
// baz()

// for (var i = 1; i <= 5; i++) {
//   (function (num) {
//     setTimeout(function timer () {
//       console.log(num);
//     }, 1000)
//   })(i)
// }

// var MyModules = (function Manager() {
//   var modules = {};

//   function define (name, deps, impl) {
//     for (var i = 0; i < deps.length; i++) {
//       deps[i] = modules[deps[i]]
//     }
//     modules[name] = impl.apply(impl, deps)
//   }

//   function get (name) {
//     return modules[name]
//   }

//   return {
//     define: define,
//     get: get
//   }
// })()



// MyModules.define('bar', [], function() {
//   function hello(who) {
//     return 'let me introduce' + who;
//   }
//   return { 
//     hello: hello
//   }
// })

// MyModules.define('foo', ['bar'], function (bar) {
//   var hungry = 'hippo';
//   function awesome () {
//     console.log(bar.hello(hungry).toUpperCase());
//   }
//   return {
//     awesome: awesome
//   }
// })

// var bar = MyModules.get('bar');
// var foo = MyModules.get("foo");

// console.log(
//   bar.hello('hippo')
// );

// foo.awesome()

// function argsAsArray(fn, arr) {
//   // code here
 
//   console.log.apply(fn, arr)
// }

// argsAsArray(
//   function (greeting, name, punctuation) {
//       return greeting + ', ' + name + (punctuation || '!');
//   }, ['Hello', 'Ellie', '!']
// )


// Hello, Ellie!


// 删除指定数组的最后一个元素，不改变原数组，并返回新数组

var arr = [1,2,3,4]
console.log('arr: ', arr);

// function truncate(arr) {
//   var newArr = arr.slice()
//   newArr.pop()
//   return newArr
// }

// function truncate(arr) {
//   return arr.slice(0, -1)
// }

// function truncate(arr) {
//     // var a = Array.prototype.slice.apply(arr, [0, -1]);

//     var a = []
//     // Array.prototype.push.apply(a, arr)

//     a = arr.concat()

//     a.pop()
//     return a
//   }

// console.log(truncate(arr));


// function foo (a) {
//   console.log(a + b);
// }
// var b = 2;
// foo(2)

