// 75. 颜色分类
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var sortColors = function(nums) {
  // left、right都表示下标，left的左边都是0，right的右边都是2
  let left = 0, right = nums.length - 1;
  // 注意，right是动态变化的
  for (let i = 0; i <= right; i++) {
    debugger
      if (nums[i] === 0) {
          // 如果是0，和left交换位置，left向右移动
          [nums[left], nums[i]] = [nums[i], nums[left]]
          left++
      } else if (nums[i] === 2) {
          // 如果是2，和right交换位置，right向左移动
          [nums[right], nums[i]] = [nums[i], nums[right]]
          right--

          // 如果交换回来的是2，则需要再遍历一次
          i--
      }
  }
  return nums;
};
sortColors([2,0,2,1,1,0])
