// 1、原型链继承
function Parent1() {
  this.name = "parent1";
  this.play = [1, 2, 3];
}
function Child1() {
  this.type = "child1";
}
Child1.prototype = new Parent1(); // new Parent1包含一个指向原型对象的指针
Child1.prototype.construct = Child1; // 再把原型对象上指向构造函数的指针指向自己
console.log(new Child1());
// 缺点：共享一个内存空间，当一个发生变化时，另一个也随之进行变化

// 2、构造函数继承
function Parent2() {
  this.name = "parent2";
  this.play = [1, 2, 3];
}
Parent2.prototype.getName = function () {
  return this.name;
};
function Child2() {
  Parent2.call(this);
  this.type = "child2";
}
const c2 = new Child2();
// console.log(c2.getName()); // 会报错
// 缺点：只能继承父类的实例属性和方法，不能继承原型属性和方法

// 3、组合继承（结合前两种）
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
  console.log("我被打印了两遍");
}
Parent3.prototype.getName = function () {
  return this.name;
};
function Child3() {
  Parent3.call(this);
  this.type = "child3";
}
Child3.prototype = new Parent3();
Child3.prototype.construct = Child3;
const c3 = new Child3();
console.log(c3);
console.log(c3.getName());
// 解决了以上两种问题
// 缺点：父类构造函数被执行了两次，第一次为改变Child3的prototype的时候，第二次为通过call方法调用Parent3的时候

// 4、原型式继承
let parent4 = {
  name: "parent4",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

let person4 = Object.create(parent4); // Object.create(__proto__, propertiesObject)
person4.name = "tom";
person4.friends.push("p4");

let person5 = Object.create(parent4);
person5.friends.push("p5");

person4.arr = [1, 2, 3];
person5.arr = [1, 2, 3];
console.log(person4);
console.log(person5);
console.log(person4.__proto__ === person5.__proto__);
// 缺点：使用同一个原型对象，原型对象下的引用类型指向了相同的内存，存在篡改的可能

// 5、寄生式继承：利用原型式继承得到一份浅拷贝对象，然后利用浅拷贝的功能再进行曾强，添加一些方法
let Parent5 = {
  name: "parent5",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

function clone(target) {
  let clone = Object.create(target);
  console.log("clone: ", clone);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

const child5 = clone(Parent5);
console.log("child5: ", child5);

// 6、寄生组合式继承（构造函数继承+寄生式继承）
// 利用Object.create浅拷贝原型，减少了一次父类构造函数的调用
function clonePrototype(parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.construct = child;
  console.log(1);
}
function Parent6() {
  this.name = "parent6";
  this.play = [1, 2, 3];
  this.friends = "parent5";
}
Parent6.prototype.getName = function () {
  return this.name;
};
// 构造函数继承
function Child6() {
  Parent6.call(this);
  this.name = "child6";
}
// 步骤1：浅拷贝父类原型对象赋值给子类
clonePrototype(Parent6, Child6);
// 步骤2：对其曾强
Child6.prototype.getFriends = function () {
  return this.friends;
};
const person6 = new Child6();

console.log(person6);
console.log(person6.getName()); // child6
console.log(person6.getFriends()); // parent5

// 7、es6 extends
// extends相当于寄生组合的语法糖，

class Parent7 {
  constructor() {
    this.name = "parent7";
  }

  getName = function () {
    return "parent7 name： " + this.name;
  };
}

class Child7 extends Parent7 {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

const child7 = new Child7("child7", 20);
console.log("child7: ", child7);
console.log("child7: ", child7.getName());
