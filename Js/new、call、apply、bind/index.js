// 一、new
// 创建分为以下几个步骤：
// 1. 创建一个新对象
// 2. 将this指向这个新对象
// 3. 执行构造函数（为新对象添加属性和方法）
// 4. 返回新对象（要么是实例对象，要么是return语句指定的对象）

// 如果我们没有使用关键词，那么返回结果就是undefined。this指向window
function Person1() {
  this.name = "Jack";
}
var p = Person1();
console.log(p); // undefined
// console.log(p.name); // typeError: 'name' of undefined

// 当构造函数返回一个与this无关的新对象时，new 会直接返回这个新对象，而不是通过new执行步骤生成的this对象
function Person2() {
  this.name = "Jack";
  return { age: 18 };
}
var p2 = new Person2();
console.log(p2); // { age: 18 }
console.log(p2.name); // undefined
console.log(p2.age); // 18

// 当构造函数返回的不是一个对象时，还是会按照new的实现步骤生成一个新对象
function Person3() {
  this.name = "Jack";
  return "tom";
}
var p3 = new Person3();
console.log(p3); // { name:  'Jack' }
console.log(p3.name); // 'Jack'

// 场景应用
let a = {
  name: "Jack",
  getName: function (msg) {
    return msg + this.name;
  },
};
let b = { name: "lily" };

console.log(a.getName.call(b, "hi, "));
console.log(a.getName.apply(b, ["hi,"]));
const nb = a.getName.bind(b);
console.log(nb("hi,"));

// 一、判断数据类型
console.log(Object.prototype.toString.call([])); // '[Object Array]'

// 二、类数组借用方法
var arrayLike = {
  0: "java",
  1: "script",
  length: 2,
};
Array.prototype.push.call(arrayLike, "python", "c++");
console.log(arrayLike); //  { 0: "java", 1: "script", 2: "python", 3: "c++", length: 4 }
const ar = Array.prototype.slice.call(arrayLike, 1);
console.log("ar: ", ar); // ["script", "python", "c++"]

// 三、获取数组最大、最小值
let arr = [12, 33, 4, 2, 55];
const max = Math.max.apply(Math, arr);
const min = Math.min.apply(Math, arr);

// 继承：构造函数继承就使用了call，获取父类构造函数的属性和方法
function Parent3() {
  this.name = "Parent3";
  this.getName = function () {
    return this.name;
  };
}
function Child3() {
  Parent3.call(this);
}
const c3 = new Child3();
console.log(c3.name); // 'Parent3'
console.log(c3.getName()); // 'Parent3'

// 手动实现 call 和 apply
Function.prototype.call2 = function (context, ...args) {
  var context = context || window;
  context.fn = this;
  var result = eval("context.fn(...args)");
  delete context.fn;
  return result;
};
console.log(Math.max.call2(Math, 1, 2, 3));

Function.prototype.apply2 = function (context, args) {
  var context = context || window;
  context.fn = this;
  var result = eval("context.fn(...args)");
  delete context.fn;
  return result;
};
console.log(Math.max.apply2(Math, [1, 2, 3]));
