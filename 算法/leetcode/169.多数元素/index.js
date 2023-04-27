const majorityElement = nums => {
  let count = 1;  // 不是最多元素出现的次数，而是抵消 非多数元素出现次数 后的次数
  let majority = nums[0]; // 出现最多的元素
  for (let i = 1; i < nums.length; i++) {
      // count为0，说明出现了新的多数元素
      if (count === 0) {
          majority = nums[i];
      }
      // 如果又遇到多数元素，count++，否则--
      if (nums[i] === majority) {
          count++;
      } else {
          count--;
      }
  }
  return majority;
};
console.log(majorityElement([1,1,2,2,2]));
console.log(majorityElement([1,1,2,2,2]));