// 特点：先进后出，后进先出

class Stack {
  constructor() {
    this._i = Symbol('stack') // 利用Symbol的唯一性（一般无法获取的他们），避免实例对象直接修改
    this[this._i] = {}
    this.length = 0
  }

  push(node) {
    this[this._i][this.length] = node
    this.length++
  }

  pop() {
    if (this.isEmpty()) {
      return null
    }
    this.length--
    const r = this[this._i][this.length]
    delete this[this._i][this.length]
    return r
  }

  // 获取栈顶节点
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this[this._i][this.length - 1]
  }

  isEmpty() {
    return this.length === 0
  }

  clear() {
    this[this._i] = {}
    this.length = 0
  }
}

const stack = new Stack()

stack.push({ id: 1 })
stack.push({ id: 2 })

const items = stack[Object.getOwnPropertySymbols(stack)[0]] // 这样还是可以获取

console.log(items);

items[2] = { id: 3 }


console.log('stack: ', stack)



// 利用栈思维，封装两个方法

// 实战1：将十进制转为二进制
function decimalToBinary(number) {
  const stack = new Stack()
  let result = ''

  while(number > 0) {
    stack.push(number % 2)

    number = Math.floor(number / 2)
  }

  while(!stack.isEmpty()) {
    result += stack.pop()
  }

  return result
}

console.log(decimalToBinary(10));
console.log(decimalToBinary(11));

/**
 * @desc 通用，10进制转其他进制
 * @param {number} number 10进制数字
 * @param {*} bs 2进制 8进制 16进制
 * @returns {string} 转换结果
 */
function decimalToBinary(number, bs) {
  const stack = new Stack()
  const digits = '0123456789ABCDEF'
  let result = ''

  while(number > 0) {
    stack.push(number % bs)

    number = Math.floor(number / bs)
  }

  while(!stack.isEmpty()) {
    result += digits[stack.pop()]
  }

  return result
}

console.log(decimalToBinary(10, 2)); // 1010
console.log(decimalToBinary(10, 8)); // 12
console.log(decimalToBinary(10, 16)); // A


// 实战2：有效的括号
// 给定一个只包括 小括号 '(' ')' ，中括号 '[' ']' 大括号 '{' '}' 的字符串，判断字符串是否有效。

// 有效字符串需要满足：

// 左括号必须用相同类型的右括号闭合
// 左括号必须以正确的顺序闭合

// input: '()[]{}'
// out: true

// input: '(]'
// out: false

function isValid (s) {
  const stack = new Stack()

  for(let i = 0, len = s.length; i < len; i++) {
    const c = s[i]  // 当前字符（必须要拿右括号匹配，匹配上了删除栈顶字符（左括号））

    const p = stack.peek()  // 栈顶节点
    if (c ===')' && p === '(' || c === ']' && p === '[' || c === '}' && p === '{') {
      stack.pop()
    } else {
      stack.push(c)
    }
  }

  return stack.isEmpty()
}

console.log(isValid('([]){}'));
console.log(isValid('(]'));


function isValid2 (str) {
  const arr = []

  for(let i = 0, len = str.length; i < len; i++) {
    const c = str[i]

    // 栈顶节点
    const t = arr[arr.length - 1]

    // 栈的思维，所以从右括号开始匹配
    if (c === ')' && t === '(' || c === ']' && t === '[' || c === '}' && t === '{') {
      // 匹配 出栈
      arr.pop()
    } else {
      arr.push(c)
    }
  }

  return arr.length === 0
}


console.log(isValid2('([]){}'));
console.log(isValid2('(]'));
