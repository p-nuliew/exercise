// 采用分治思想：
//   选择一个基准值（可以为中间值，或首尾值），建立两个数组left和right。
//   遍历整个数组，比基准值小的扔进left，大的扔进right
//   遍历完之后，再重复以上步骤，直到left/right只剩一个值，然后返回该数组

// 快速排序是在冒泡排序的基础上改进而来的。
// 快速排序基本上被认为是在同数量级的所有排序算法中，平均性能最好的

var arr1 = [1, 6, 63, 5];

const quickSort2 = (arr) => {
  if (arr.length <= 1) return arr;
  const midIndex = Math.floor(arr.length / 2);
  const mid = arr.splice(midIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item < mid) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return quickSort2(left).concat([mid], quickSort2(right))
}
console.log('quickSort2', quickSort2(arr1));

// var arr2 = [3, 34];
// function qs(arr) {
//   if (arr.length <= 1) return arr;
//   const left = [];
//   const right = [];
//   const [a, ...rest] = arr;
//   rest.forEach((x) => {
//     if (x < a) {
//       left.push(x);
//     } else {
//       right.push(x);
//     }
//   });

//   return [...qs(left), a, ...qs(right)];
// }
// console.log(arr2 === qs(arr2));
