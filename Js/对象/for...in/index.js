// for...in语句：按任意顺序遍历一个对象的所有属性（除了Symbol和不可枚举属性）

let obj = {
  a: 1,
  b: 2,
  [Symbol(1)]: "symbol",
};
Object.defineProperty(obj, "enumerate", {
  value: "enumerate",
  enumerable: false,
});
Object.prototype.xxx = 1231235;

for (let i in obj) {
  console.log(i);
}
// logs: a b xxx

// continue 可以跳过这次循环
for (let i in obj) {
  if (i === 'a') continue
  console.log(i);
}


// hasOwnProperty 过滤掉原型链继承到的属性
for (let i in obj) {
  if (obj.hasOwnProperty(i)) {
    console.log(i); // logs: a b
  }
}

// 为什么for in 不适合数组
// 1、index 的类型是 String，并不是number，如果对index做运算，可能会导致一些错误
// 2、原型链上的属性也会被遍历到
// 3、遍历顺序可能是不确定的

let arr = [1, 3, 2];
Array.prototype.isLast = function () {};

for (const key in arr) {
  console.warn(key); // logs: 0 1 2 isLast xxx
}
