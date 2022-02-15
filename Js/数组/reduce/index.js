// Array.prototype.reduce(callback, initialValue);
// 对数组中的每一个元素执行提供的函数（升序执行），将其结果汇总为单个返回值
// 回调函数：callback(accumulator, curValue, curIndex, array)
// initialValue: 初始值
// 如果提供initialValue，accumulator为initialValue，curValue为每数组的item
// 如果没提供initialValue，accumulator为arr[0]，curValue为arr[1]

let result = undefined;
const initialValue = 100;

result = [1, 2, 3].reduce((accumulator, value, index, arr) => {
  return accumulator + value;
}, initialValue);

// 注意：如果没有提供initialValue，reduce会从索引1的地方开始执行callback方法，跳过第一个索引。如果提供了initialValue，从索引0开始。
// 当只有一个元素并且没有初始值，或者有初始值但是数组为空，都将不会执行reduce，而是直接返回第一个元素或初始值
result = [{ x: 1 }].reduce(
  (accumulator, currentValue) => accumulator + currentValue.x
);
result = [].reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  { x: 1 }
);

// 当有两个元素，并且没有提供初始值，accumulator为第一个元素，value为第二个元素
result = [{ x: 1 }, { x: 2 }].reduce(
  (accumulator, value, index) => accumulator.x + value.x
);

console.log("result", result);
