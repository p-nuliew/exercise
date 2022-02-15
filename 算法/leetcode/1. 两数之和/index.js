// 解法一
// var twoSum = function(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//       const val = nums[i]

//       for(let j = 0; j < nums.length; j++) {
//           const otherVal = nums[j]

//           if (i !== j && val + otherVal === target) {
//               return [i, j]
//           }
//       }
//   }
// };

// 解法二
// 理解点：map对象存的是数组的项与对应下标，如果在map中找到otherVal，取出对应下标与当前一起返回即可
var twoSum = function(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const otherVal = target - nums[i]

        if (map.has(otherVal)) {
            return [map.get(otherVal), i]
        }

        map.set(nums[i], i)
    }
};

const res = twoSum([7,7,11,15], 14)
console.log('res: ', res);