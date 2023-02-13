// 查找最长公共前缀
// 输入: ["flower","flow","flight"]
// 输出: "fl"

// 输入：strs = ["dog","racecar","car"]
// 输出：""

// 1. 如果字符串数组长度为0，则返回''
// 2. 初始化ans为第一个字符串
// 3. 遍历数组，两两比较，找到最长公共前缀
// 4. 比较时，如果ans为空，则返回''
var longestCommonPrefix = function(strs) {
  if (!strs || strs.length === 0) return '';
  let ans = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    // 比两个字符串长度都小时，进行比较，查找到不相等时跳出循环，该两字符串公共长度为j
    for (;j < ans.length && j < strs[i].length;j++) {
      if (ans[j] !== strs[i][j]) {
        break
      }
    }
    ans = ans.substr(0, j)
    if (ans === '') return ans;
  }
  return ans
};

console.log(longestCommonPrefix(["flower","flow","flight"]));