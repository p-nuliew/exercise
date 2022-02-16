// 利用栈的思维
// 声明一个数组，循环这个字符串
// 如果当前字符与栈顶相匹配，则出栈，不匹配，当前字符入栈
// 遍历结束后，如果栈为空，那就表示是有效的字符串

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    // 栈顶字符：栈顶存放的只可能是 '(' 或 '[' 或 '{'
    const t = stack[stack.length-1]

    if (t === '(' && c === ')' || t === '[' && c === ']' || t === '{' && c === '}' ) {
      stack.pop()
    } else {
      stack.push(c)
    }
  }

  return stack.length === 0
};

console.log(isValid('()'))    // true
console.log(isValid('()[]{}'))  // true
console.log(isValid('(]'))  // false
console.log(isValid('([)]'))  // false
console.log(isValid('{[]}'))  // true