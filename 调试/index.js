// var fn;
// function foo() {
//   var a = 2;
//   function baz() {
//     console.log(a);
//   }
//   fn = baz;
// }
// function bar() {
//   fn();
// }

// foo();
// bar(); // 2

// function foo(p) {
//   var a = 10;

//   function fn1() {
//     console.log(a);
//   }
//   throw 'wq'
//   p+=1
//   console.log(p)

//   function fn2() {
//     var b = 10;
//     console.log(b);
//   }

//   fn2();
// }

// foo(100);


const m = {
  a: 1,
  b: 2
}
function foo(arg) {
  arg.a = 20;
}
foo(m)
