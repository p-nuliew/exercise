var moveZeroes = function(nums) {
  // 如果b不为0，则不动。如果b为0，b在后面
  debugger
  nums.sort((a, b) => b ? 0 : -1)
  return nums;
};

moveZeroes([0,1,0,3,12])
// sort升序排序是a - b , 返回值小于0做交换，也就是说要后一位减前一位小于0，a和b应该分别对应nums[i + 1]和nums[i]，也就是对应1和0