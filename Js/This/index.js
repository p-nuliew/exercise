
// 让this指向函数自身
function foo (i) {
  this.count ++
  console.log('this.count: ', this.count);
}

foo.count = 0;

for(let i = 1; i < 5; i++) {
  foo(i)  // NaN
}

// 使用foo1标识符代替this来引用函数对象
function foo1 (i) {
  foo1.count ++
  console.log('foo1.count: ', foo1.count);
}

foo1.count = 0

for (let i = 1; i < 5; i++) {
  foo1(i)
}

// 使用call, 强制this指向foo2对象
function foo2 (i) {
  this.count ++
  console.log('this.count: ', this.count);
}

foo2.count = 0;

for(let i = 1; i < 5; i++) {
  foo2.call (foo2,i)
}

// 它的作用域
function foo3 () {
  var a = 2;
  this.bar()
}

function bar  () {
  console.log('this.a: ', this.a); // undefined
}

foo3()

// 这段代码里，bar试图访问foo3函数作用域里的a属性。
// 这样能调用this.bar纯属意外，可直接使用bar标识符调用，
// 此外，bar函数试图通过this联通访问foo3和bar的此法作用域，从而访问属性a。这是不可能实现的。
// 注意：当你想使用this和词法作用域的查找混合使用时，一定要提醒自己，这是不可能实现的。
// this指向什么取决于函数是在那里调用的


function baz5 () {
  console.log('baz5');
  bar5()
}

function bar5 () {
  console.log('bar5');
  foo5()
}

function foo5 () {
  // debugger
  console.log('foo5');
}

baz5()

function foo6() {
  'use strict'
  // console.log(this.a);  // typeError: Cannot read property 'a' of undefined 
}

foo6()

function foo7 () {
  console.log(this.a);
  var args = Array.prototype.slice.call(arguments, 1)
}

var obj = {
  a: 2,
  foo7
}

obj.foo7(1,2,3)



// bind可以把除了第一个参数（第一个参数用于绑定this）以外的其他参数都传给下层函数（
//    这种技术称为“部分应用”，也是“柯里化”的一种
// ）
// function foo8 (a, b) {
//   console.log('a, b: ', a, b);  // 1 2
// }

// var f8 = foo8.bind(null, 1)
// f8(2)




// 显示绑定也无法解决隐士绑定丢失问题？
// 1.
function foo9 () {
  console.log(this.a);
}

var obj9 = {
  a: 2,
  foo9
}


var bra9 = obj9.foo9  // bar9虽然是obj9.foo9的一个引用，但实际上它引用的是foo9函数本身
bra9()  // 所以此时的bar应用默认规则，this.a === undefined

foo9.call(obj9.foo9)  // this.a === undefined。验证显示绑定也无法解决


const arr10 = [1,2,3];
arr10.forEach(function (item) {
  console.log(item, this.a);
}, obj10)

var obj10 = {
  a: 'werrwe'
}
