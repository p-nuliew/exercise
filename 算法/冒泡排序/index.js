// 1. 比较相邻的元素，如果第一个比第二个大，则交换他们。第一遍遍历完之后，最后的元素肯定是最大的数。所以内循环可以-i
// 2. 重复以上步骤，除了最后一个（所以比较次数为length-1）
function sort3(arr) {
  const length = arr.length;
  let done = true;  // 用于优化：如果在当前趟中没有发生交换，说明该序列已经有序
  for (let i = 0; i < length - 1; i++) {
    for(let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j + 1], arr[j]]
        done = false
      }
    }
    if (done) break
  }
  return arr
}

console.log(sort3([1, 3, 2, 5, 4]));
