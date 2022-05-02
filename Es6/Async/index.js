// async 是 Promise 的语法糖

// function fn() {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000, 30)
//   })
// }

// const foo = async () => {
//   const t = await fn()
//   console.log('t', t);
//   console.log('next code');
// }

// foo()

// 输出结果
// t: 30
// next code


// 如果是使用 then 方法，就不得不把后续代码写在 then 方法中
// const foo = () => {
//   return fn().then(t => {
//     console.log('t: ', t);
//     console.log('next doce');
//   })
// }
// foo()

// 异常处理
// 使用 try/catch 来捕获异常
// function fn() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('some error')
//     }, 1000)
//   })
// }

// const foo = async () => {
//   try {
//     await fn()
//   } catch (e) {
//     console.log('e: ', e);
//   }
// }
// foo()

// 多个 await ，只会捕获到第一个异常
function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('some error fn1')
    }, 1000)
  })
}
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('some error fn2')
    }, 1000)
  })
}

const foo = async () => {
  try {
    await fn1()
    await fn2()
  } catch (e) {
    console.log('e: ', e);  // some error fn1
  }
}
foo()