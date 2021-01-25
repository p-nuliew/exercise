// #浅拷贝
// 方法一：Object.assign
// 从一个或多个源对象分配到目标对象，返回目标对象
// let obj1 = { a: { b: 1 }, sym: Symbol(1) };
// Object.defineProperty(obj1, "innumerable", {
//   value: "不可枚举属性",
//   enumerable: false,
// });
// let obj2 = {};
// Object.assign(obj2, obj1);
// obj1.a.b = 2;
// console.log({ obj1 });
// console.log({ obj2 });

// 注意点:
// 1：他不会拷贝对象的继承属性
// 2.不会拷贝不可枚举属性
// 3.可以拷贝symbol类型的属性

// 方法二：扩展运算符
// 和Object拥有同样的缺陷，但是拷贝基本类型的值的时候会更加方便

// 方法三：concat
// 浅拷贝数组

// 方法四 slice
// 浅拷贝数组，仅仅针对数组类型，
// 类数组可以使用 Object.prototype.slice.call(arr):从Array中获取slice，绑定到arr中，并执行slice

// 手工浅拷贝
function shallowClone(obj) {
  if (typeof obj !== "object" || target === null) return;
  const newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 忽略原型上继承过来的属性
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// #深拷贝
// 乞丐版：JSON.stringify
// 将对象序列化为JSON字符串，对对象里面的内容转为字符串，再用JSON.parse生成新对象

// 注意点：
// 1、如果对象"值"中有函数、undefined、symbol这几种类型，经过序列化之后这个键值对会消失
// 2、拷贝 Date 引用各类型会变成字符串
// 3、拷贝 RegExp 引用类型会变成空对象
// 4、无法拷贝不可枚举属性
// 5、无法拷贝对象的原型链
// 6、对象                                                                                              中含有NaN、infinity以及-infinity,JSON序列化的结果会变成null
// 7、无法拷贝对象的循环应用，即对象成环（obj[key] = obj）

function Obj() {
  this.func = function () {
    alert(1);
  };
  this.obj = { a: 1 };
  this.arr = [1, 2, 3];
  this.und = undefined;
  this.reg = /123/;
  this.date = new Date(0);
  this.NaN = NaN;
  this.infinity = Infinity;
  this.sym = Symbol(1);
  this[Symbol(2)] = "sym2";
}

let obj1 = new Obj();

Object.defineProperty(obj1, "innumerable", {
  enumerable: false,
  value: "innumerable",
});
console.log("obj1", obj1);
let obj2 = JSON.parse(JSON.stringify(obj1));
console.log("obj2", obj2);

// 基础版(手写递归)

// 注意点：
// 1、不能复制不可枚举和Symbol类型的属性
// 2、对于Date、RegExp这样的引用类型不能正确的拷贝
// 3、没解决循环引用问题
function deepClone(target) {
  if (typeof target === "object" && target !== null) {
    const newObj = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] === "object") {
        newObj[key] = deepClone(target[key]);
      } else {
        newObj[key] = target[key];
      }
    }
    return newObj;
  }
}

const obj3 = deepClone(obj1);
console.log("obj3", obj3);

// 改进版
// 1、对于不可枚举和Symbol类型，可以Reflect.ownKeys(),Reflect.ownKeys === Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(Obj))
// 2、对于Date 和 RegExp 类型，直接返回一个实例对象
// 3、Object.getOwnPropertyDescriptors可以获取所有自身属性的描述符，以及对应的特性，
// 顺便结合Object的create方法创建一个新对象，并集成原对象的原型链
// 4、利用WeakMap类型作为hash表，因为WeakMap是弱引用类型，可以有效防止内存泄漏，如果存在循环引用，就直接返回WeakMap存储的值

const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;
function deepCloneImprove(obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Date(obj); // 日期对象直接返回一个新的日期对象
  if (obj.constructor === RegExp) return new RegExp(obj); //正则对象直接返回一个新的正则对象
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) return hash.get(obj);
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  //继承原型链
  hash.set(obj, cloneObj);

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepCloneImprove(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
}

// 下面是验证代码
let obj4 = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数");
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
};
Object.defineProperty(obj4, "innumerable", {
  enumerable: false,
  value: "不可枚举属性",
});
obj4 = Object.create(obj4, Object.getOwnPropertyDescriptors(obj4));
obj4.loop = obj4; // 设置loop成循环引用的属性
let cloneObj = deepCloneImprove(obj4);
cloneObj.arr.push(4);
console.log("obj4", obj4);
console.log("cloneObj", cloneObj);
