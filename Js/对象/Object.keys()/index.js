// for...in语句：返回自身可枚举属性组成的数组（除了Symbol），数组中属性名的排序和[正常循环遍历该对象时返回的顺序](随意排序)一致

let keys = undefined;
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

keys = Object.keys(obj); // ["a", "b"];

var obj1 = { 0: "a", 2: "c", 1: "b" };
keys = Object.keys(obj1);

console.log("keys: ", keys); // logs: ['0', '1', '2']
