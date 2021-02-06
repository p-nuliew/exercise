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

function foo() {
  var a = 10;

  function fn1() {
    console.log(a);
  }

  function fn2() {
    var b = 10;
    console.log(b);
  }

  fn2();
}

foo();
