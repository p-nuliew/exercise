const { exec } = require('child_process');
const util = require('node:util');

// exec('node -v', (err, stdout) => {
//   if (err) {
//     return err;
//   }
//   console.log(stdout);
// });

// promise 风格写法
// const execPromise = util.promisify(exec);
// execPromise('node -v')
//   .then((res) => {
//     console.log('res: ', res);
//   })
//   .catch((err) => {
//     console.err('err: ', err);
//   });

// promisify 实现原理
function promisify(originalFn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      originalFn(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

// promise api => callback api
const fn = (type) => {
  if (type === 1) {
    return Promise.resolve(2);
  }
  return Promise.reject('error');
};
// const callback = util.callbackify(fn);
const callback = callbackify(fn);

callback(1, (err, data) => {
  if (err) {
    console.log({ err });
  } else {
    console.log({ data });
  }
});

// callbackify 原理
// 1. callbackify接收一个返回Promise的函数，并返回一个新函数
// 2. 新函数接收任意参数，最后一个参数是回调函数
function callbackify(originalFn) {
  return (...args) => {
    const callback = args.pop(); // 从参数中提取回调函数
    // 新函数执行时，调用原函数并传入参数
    // 原函数的执行结果会通过回调函数返回
    originalFn(...args)
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

// format: 格式化为字符串
const format = util.format;
console.log('format1', format({ a: 1, b: 2 }));
console.log('format2', format(1, 2, 3));
console.log('format3', format([1, 2, 3]));
