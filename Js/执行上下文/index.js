// // javascript
// var name = "window";

// var p = {
//   name: 'Perter',
//   getName: function() {

//     // 利用变量保存的方式保证其访问的是p对象
//     var self = this;
//     return function b () {
//       return self.name;
//     }
//   }
// }

// var getName = p.getName();
// var _name = getName();
// console.log(_name);


// 保存闭包对象不被回收
// function foo() {
//   var a = 20;

//   function bar() {
//     a = a + 1
//     var b = 10
//     console.log(a + b);
//   }

//   return bar;
// }

// // foo()()
// // foo()()


// const bar = foo()

// bar()
// bar()

function foo() {
  let a = 10;
  let b = 20;

  function bar() {
    a = a + 1;
    console.log('in bar', a)
    let c = 30;

    function fn() {
      a = a + 1;
      c = c + 1
      console.log('in fn', a)
    }

    console.dir(fn)
    return fn
  }

  console.dir(bar)
  return bar()
}

var fn = foo()
fn()
fn()
fn()