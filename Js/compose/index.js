const add = x => x + 6;
const multiple = x => x * 6
const subtraction = x => x - 10

// compose组合函数：可以将嵌套的函数平铺执行，比如f1(f2)(arg), 可以这么执行：compose(f2, f1)(arg)
// 应用场景：
  // redux中间件：applyMiddleware,
  // webpack.loader: ['style-loader', 'css-loader', 'less-loader']，从右往左执行
  // compose(...loader)('源文件')
function compose (...args) {
  return function (prev) {
    return args.reduceRight((accumulator, item, index, arr) => {
      // console.log('accumulator, item: ', accumulator, item);
      return item(accumulator)
    }, prev)
  }
}

console.log('compose(multiple, add)(10): ', compose(subtraction, multiple, add)(10));

// compose是从右往左执行，pipe是从左往右执行
const pipe = (...args) => prev => args.reduce((accumulator, item) => item(accumulator), prev)
console.log('pipe(add, multiple)(10): ', pipe(add, multiple)(10));