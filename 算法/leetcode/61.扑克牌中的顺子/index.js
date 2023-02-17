/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var isStraight = function(nums) {
  nums = nums.sort((a, b) => a - b);
  const zeroAmount = nums.lastIndexOf(0) + 1; // 0的个数
  let chazhi = 0;

  for (let i = zeroAmount; i < nums.length - 1; i++) {
      const tmp = nums[i + 1] - nums[i] - 1;  // 前后数值的差值
      // tmp为-1，说明前后值相等，那肯定不为顺子
      if (tmp === -1) {
          return false;
      }
      chazhi += tmp
  }

  return zeroAmount >= chazhi ? true : false
};

// 解题思路
  // 1. 使用 sort 升序排序
  // 2. 初始化一个常量 zeroAmount 为0的个数，一个变量 chazhi 统计总得差值
  // 3. 如果0的个数大于等于差值总数，说明是个顺子，反之亦然