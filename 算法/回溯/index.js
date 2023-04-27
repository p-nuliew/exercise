/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
  if (digits.length === 0) return [];
  const res = []; // 队列
   const map = {//建立电话号码和字母的映射关系
      2: "abc",
      3: "def",
      4: "ghi",
      5: "jkl",
      6: "mno",
      7: "pqrs",
      8: "tuv",
      9: "wxyz",
  };
  const def = (curStr, i) => {
      if (i > digits.length - 1) {
          res.push(curStr)
          return res; // 结束本次递归
      }
      const letters = map[digits[i]];
      for (const letter of letters) {
          def(curStr + letter, i + 1)
      }
  }
  def('', 0)  // 递归入口
  return res;
};

console.log(letterCombinations('23'));