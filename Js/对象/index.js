// 创建对象
// 1. 使用对象初始化器（通过字面值创建对象）
// 2. 构函函数 + new关键字
// 3. Object.create() // 允许你为创建的对象选择一个原型对象，而不用定义构造函数


// 对象属性索引
let result = undefined;
let o = undefined;

// 对象的key值只能为string类型
// o = {1: 1, name: 'tom', '2': 2};
// for (const key in o) {
//   console.log(typeof key);  // 尽管我们定义o对象属性1为没加单引号的整型1，但是求值时obj的key都为string类型
// }

// 访问对象的属性
// 访问对象的属性有两种方式：点符号('.')和中括号访问('[]')
// 一个对象的属性名可以是任何有效的js字符串,或者可以被转为字符串类型的任何类型，包括空字符串
// 当对象的属性名是一个无效的js标识符时(如: 空格或连字符或以数字开头的属性名)，就只能通过方括号标记

// 在 JS 1.0中，你可以通过名称或序号访问一个属性
// V1.0之后的版本里，通过构造函数创建对象时，如果最初使用名称定义一个属性，则必须通过名称访问他；最初使用序号定义属性，则必须通过索引访问
// function Car(make, model, year) {
//   Car[5] = make;
//   this.model = model;
//   this.year = year;
// }
// var kenscar = new Car("Nissan", "300ZX", 1992);
// result = kenscar[5];  // undefined
// result = Car[5];  // Nissan

// result = {
//   myMethod: function(params) {
//     // ...do something
//   },
  
//   // 或者 这样写也可以
  
//   myOtherMethod(params) {
//     // ...do something else
//   }
// };

// 枚举一个对象的所有属性（从ES5开始）
// for...in 依次访问一个对象及其原型链中所有可枚举的属性
// Object.keys(o) 返回对象自身包含（不包括原型）的所有可枚举属性的名称的数组
// Object.getOwnPropertyNames(o) 返回对象自身包含（不包括原型）的所有属性（无论是否可枚举）的名称的数组

// defineProperty()：直接在一个Object构造器对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
// 语法：Object.defineProperty(obj, prop, descriptor)
// 描述符包括数据描述符和存取描述符
// 描述符包括：enumerable、configurable、value、writable、get、set
// 数据描述符可拥有：configurable、enumerable、value、writable
// 存取描述符可拥有：configurable、enumerable、get、set
// 默认值：enumerable、configurable、writable都是false，value、get、set都为undefined
// 描述符如果同时拥有value或writable和set或set键，会产生异常
// function Car (name, width) {
//   this.color = 'black';
  
//   Object.defineProperty(this, 'name', {
//     get: () => name,
//     configurable: true
//   })
//   Object.defineProperty(this, 'width', {
//     get: () => width,
//     enumerable: true,
//   })
//   Object.defineProperty(this, 'series', {
//     value: 520,
//     writable: true
//   })
//   Object.defineProperty(this, 'level', {
//     writable: true
//   })
// }
// const bmw = new Car('BMW', 2);

// // configurable === true 属性描述符可以修改，可以删除
// Object.defineProperty(bmw, 'name', {
//   value: 'Benz' // 设置该属性的值
// })
// delete bmw.name;

// // enumerable === true 属性将可被枚举(会枚举到for...in或Object.keys方法)
// for(const key in bmw) {
//   console.log(key); // color width
// }

// // writable === true 属性将可以被赋值运算符改变，也就是可修改，试图改变它不会引发错误
// bmw.series = 320

// result = bmw;

// getters 与 setters：获取/设定某个属性的值的方法，这个属性称为访问器属性，访问器属性只能使用get/set访问
// getter没有参数，setter的参数为我们传入的值，比如o.a = 10,这时候setter的参数就为10
// 属性可以是数据属性或访问器属性，但不能都是
// setter或getter可以单独存在，只是这时不能读取或赋值
// 使用场景：正准备进行初始化一个原型，并在设置或修改属性时必须做一些额外的逻辑控制
// 语法：[gs]et property()
// o = {
//   a: 1,
//   get b() {
//     return this.a + 1;
//   },
//   set c(x) {
//     this.a = x / 2;
//   },
  
//   getD: function() {
//     return this.e + 1; 
//   },
//   setD: function (val) {
//     this.d = val;
//   }
// }

// result = o.a; // 1
// result = o.b; // 2
// o.c = 50; 
// result = o.a; // 25
// result = o.b; // 26

// function Ab(_name, _age) {
//   Object.defineProperty(this, 'name', {
//     get: function () { return _name },
//     set: function (val) { _name = val }
//   })
//   Object.defineProperty(this, 'age', {
//     get: function () { return _age },
//     set: function (val) { _age = val }
//   })
// }
// result = new Ab('ab', 18);

// 使用原型继承属性
// 将值存储在另一个属性中，在get和set中调用this添加属性，this指向被访问和修改属性的对象，不会被所有对象共享
// 缺点：将私有属性挂载到原型上
// function Cd() {

// }
// Object.defineProperty(Cd.prototype, 'name', {
//   get() { return this.stored_name },
//   set(val){ 
//     this.stored_name = val;
//    }
// })
// const cd = new Cd('cd');
// const ab = new Cd('ab');

// cd.name = 'c';  // c.name === c
// console.log(ab.name); // undefined

// result = cd;

// 同原型继承属性，Es6写法
// class Ww {
//   constructor() {

//   }
//   get name() { return this._name }
//   set name(val) { this._name = val; }
// }
// var w1 = new Ww('ww');
// var w2 = new Ww('ww');
// w1.name = 1;



// 使用Object.defineProperty()定义一个已经声明的函数作为getter和setter的方法
// function Ef() {
//   function commonSet (property, val) {
//     property = val;
//   }
  
//   function commonGet (property) {
//     return property;
//   }

//   const [ obj ] = arguments;
//   for (const key in obj) {
//     Object.defineProperty(this, key, {
//       get: () => { return commonGet(obj[key]) }
//       set: (val) => { commonSet(key, val) },
//     })
//   }
// }

// result = new Ef({name: 'ef', age: '50'})

// defineProperties：同defineProperty，对一个已创建的对象在任何时候为其添加getter/setter方法
// 使用场景：任何时候为其添加getter或setter方便，更加灵活。表现出js语言的动态特性。
// defineProperties 与 defineProperty都能实现对对象添加getter/setter方法，定义方式的选择取决于你的编程风格和手头的工作量
// o = { a: 0 }

// Object.defineProperties(o, {
//   'b': { get: function() { return this.a + 1; } },
//   'c': { set: function(val) { this.a = val / 2 } }
// })

// o.c = 10;
// result = o;



// this
// 在方法中，this指向调用它的对象
console.log(result);