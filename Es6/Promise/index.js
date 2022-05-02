// 含义
// 定义: promise 是一个对象，保存着某个未来才会结束的事件(通常是一个异步操作)的结果，
// 从他可以获取异步操作的消息

// 特点
// 1.对象的状态不受外界的影响。有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
// 2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。状态改变只有两种结果：
//    从padding变成fulfilled（已成功）和从padding变成rejected（已失败）

// 不同于事件（Event）
// 事件的特点是，如果你错过了它，再去监听，是得不到结果的

// 优点
// 1.可以将异步操作已同步操作的流程表达出来，避免层层嵌套的回调函数。
// 2.提供统一的接口，使控制异步操作更加容易

// 缺点
// 1.代码冗余，一眼看上去都是一堆then，语义变得不清楚
// 2.无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 3.Promise内部错误需要回调函数来捕获处理。如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
// 4.当处于pending状态时，无法得知目前进展到哪个阶段

// 内部抛出的错误，不影响后续代码的执行
// const qq1 = new Promise(function(resolve, reject){
//   setTimeout(() => reject(1), 1000);
// })
// qq1
// .then(() => console.log(123))
// console.log(12);
// new Promise(function(resolve, reject){
//   setTimeout(() => console.log(2), 2000);
// })
// // 12
// // Uncaught (in promise) 1
// // 2

// const qq2 = new Promise(function(resolve, reject){
//   setTimeout(() => reject(1), 1000);
// })
// qq2
// .then(() => console.log(123))
// .catch(err => console.log(err))
// console.log(12);
// new Promise(function(resolve, reject){
//   setTimeout(() => console.log(2), 2000);
// })
// 12
// 1
// 2

// 如果在then中使用了return，那么return的值会被Promise.resolve()包装
// Promise.resolve(1)
//   .then(res => {
//     console.log(res) // => 1
//     return 2 // 包装成 Promise.resolve(2)
//   })
//   .then(res => {
//     console.log(res) // => 2
//   })

// 2.基本用法
// Promise对象是一个构造函数，用来生成Promise实例
// Promise构造函数接受一个函数作为参数，该函数的参数分别是resolve和reject。
// new Promise()返回一个实例，该实例的状态由resolve/reject函数决定
// resolve函数的作用是，将promise对象的状态从“未完成”变成“成功”，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
// reject函数的作用是将Promise对象的状态从“未完成”变成“失败”，在异步操作失败时调用，并将异步操作的结果，作为参数传递出去
// Promise实例生成后，可以用then方法分别制定resolved状态和rejected状态的回调函数。

// Promise.prototype.then()：状态改变时的回调函数
// then方法接收两个回调函数作为参数，分别是Promise对象的状态变成resolved和rejected时调用。第二个函数为可选
// then方法返回的是一个新的Promise实例，因为可以采用链式写法

// Promise 新建后会立即执行
// function timeout(ms) {
//   return new Promise(function(resolve, reject) {
//     console.log('promise');
//     setTimeout(resolve, ms, 'done') // serTimeout的第三个参数是第一个参数（回调函数）的参数
//   })
// }
// timeout(100).then(res => {
//   console.log({ res });
// })

// console.log('hi');
// promise
// Hi
// {res: 'done'}

// 由于p2返回的是另一个promise，导致自己的状态无效了，由p1决定p2的状态。所以then后面的语句都变成针对后者(p1)
// const p1 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     return reject(new Error('fail')) // 调用resolve/reject函数并不会后续代码。一般来说resolve/reject函数执行之后Promise的使命就完成了，后续操作应该放在then方法里面，而不应该写在resolve/reject函数后面，所以最好在他们前面加上return
//     console.log(1);
//   }, 1000)
// })
// const p2 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve(p1)
//   }, 1000)
// })
// p2
// .then(result => console.log(result))
// .catch(error => {
//   console.log(error)
// })



// Promise.prototype.catch()：用于指定发生错误时的回调
// Promise.prototype.catch 是 Promise.prototype.then(null, rejection) 或 .then(undefined, '')的别名
// Promise 对象的错误具有'冒泡'性质，直到被捕获为止，也就是说错误总会被下一个catch捕获
// .then运行中抛出错误也会被catch()捕获，所以建议使用catch()捕获错误，也更接近同步的写法（try/catch），而不是使用then()的第二个参数
// reject() 等同于抛出错误，但如果在resolve()之后抛出，不会被捕获，因为状态已定型

// .then运行中抛出错误也会被catch()捕获，所以建议使用catch()捕获错误。但是使用 then 的第二个参数，并不能捕获到第一个参数抛出的错误
// const p3 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve(123)
//   }, 1000)
// })
// p3
// .then(result => {
//   console.log(result)
//   throw new Error('is err')
// }, error => {
//   console.log('error', error)
// })

// const p3 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve(123)
//   }, 1000)
// })
// p3
// .then(result => {
//   console.log(result)
//   throw new Error('is err')
// })
// .catch(error => {
//   console.log('error', error)
// })

// Promise没有报错，跳过了catch()方法，直接执行后面的then()方法。此时，要是then()方法里面报错，就跟前面的catch()无关了。
// Promise.resolve()
// .catch(function(error) {
//   console.log('oh no', error);
// })
// .then(function() {
//   console.log('carry on');
// });
// carry on

// Promise.prototype.finally()：不管Promise对象最后的状态如何，都会执行的操作。由ES2018引入
// finally 本质上是 then方法的特例
// 如果不适用finally，同样的语句需要为成功和失败各写一次，有了finally只需要写一次

// promise().finally(() => {
//   console.log('finally');
// })

// 等同于
// promise().then(() => {
//   console.log('finally');
// }, () => {
//   console.log('finally');
// })

// Promise.all():参数成员状态全部变成fulfilled才算成功，有一个参数状态为失败那么就算失败
// 用于将多个Promise实例,包装成一个新的Promise实例
// 接收一个数组作为参数，如果参数成员不是Promise实例，就会调用到Promise.resolve方法将参数转为Promise实例，再进一步处理
// 另外，Promise.all()的参数可以不是数组，但必须具有Iterator(迭代器)接口，且返回的每个成员都是Promise实例。

// const p = Promise.all([p1, p2, p3]);
// p的状态由p1、p2、p3决定，分两种情况
// 1.p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时他们的返回值组成一个数组，传递给回调函数
// 2.只有p1、p2、p3之中的一个被rejected，p的状态就会变成rejected，第一个被reject的实例的返回值会传递给回调函数

// 如果作为参数的Promise实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch()方法
// const p5 = new Promise(function(resolve) {
//   resolve('hello')
// })

// const p6 = new Promise(function(resolve, reject) {
//   throw new Error('报错了')
// }).catch(e => e)

// Promise.all([p5, p6])
// .then(res => console.log(res))
// .catch(e => console.log(e))
// ["hello", Error: 报错了]

// const p1 = new Promise((resolve, reject) => {
//   resolve('hello');
//   })
//   .then(result => result)
//   .catch(e => e);

//   // const p2 = new Promise((resolve, reject) => {
//   //   throw new Error('报错了');
//   // }).catch(e => e);

// const p2 = new Promise((resolve, reject) => {
//     throw new Error('报错了');
//   });
//   p2.catch(e => e);

//   Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(e => console.log(e));

// Promise.race(): Promise实例赛跑，哪个快返回哪个，通常用于处理规定时间内请求超时的情况
// 用于将多个Promise实例,包装成一个新的Promise实例
// const p = Promise.race([p1, p2, p3]);
// 同all()，如果race()的参数成员不是Promise，会调用Promise.resolve()方法转为Promise实例，再进一步处理
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变，那个率先改变的Promise实例的返回值，就传递给P的回调函数

// 如果 5 秒之内请求无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数
// Promise.race([
//   new Promise((resolve, reject) => {
//     // 模拟请求，10秒后返回数据
//     setTimeout(resolve, 10000, "my name is a");
//   }),
//   new Promise(function (resolve, reject) {
//     // 处理请求超时
//     setTimeout(reject, 5000, new Error('超时了'));
//   }),
// ])
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log('err: ', err);
//   alert(err);
// });



  // Promise.race([
  //   new Promise((resolve) => {
  //     // 请求数据
  //     setTimeout(resolve, 3*1000, '成功数据')
  //   }),
  //   new Promise((resolve, reject) => {
  //     setTimeout(reject, 2*1000, '接口超时，请稍后再试')
  //   })
  // ]).then(res => {
  //   console.log('success');
  // }).catch(err => {
  //   console.log('接口超时:', err);
  // })



// p
// .then(res => console.log(res))
// .catch(err => console.log(err));  // Error: request timeout

// Promise.allSettled():接收一组Promise实例作为参数，包装成一个新的Promise实例
// 一旦该方法结束，状态总是fulfilled，不会变成rejected。
// 它不关心异步操作结果，只关心这些操作有没有结束
// Promise.allSettled()的返回值是一个数组，数组的每个成员都是对象，对应传入Promise.allSettled()的Promise实例。每个对象都有status属性，值只可能为字符创'fulfilled'或'rejected'。fulfilled时，对象有value属性，rejected时有reason属性，对应两种状态的返回值。

// Promise.resolve('foo'):将现有对象转为Promise对象，等价于 new Promise(resolve => resolve('foo'))
// 1. 参数是一个Promise对象，那么原封不动地返回这个实例
// 2. 参数是一个thenable对象，会将这个对象转为Promise对象，并立即执行thenable对象的then方法（thenable对象指的是具有then方法的对象）
// 3. 参数不是thenable对象，或根本不是对象，返回一个新的Promise对象，状态为resolved，并作为参数传递回调函数立即执行
// 4. 不带有任何参数，直接返回一个resolved状态的Promise对象。如果希望得到一个Promise对象，就直接调用Promise.resolve()

// 注意：立即resolve()的Promise对象，是在本轮“事件循环”的结束时执行，而不是下一轮“事件循环”的开始
// setTimeout(function () {
//   console.log('three');
// }, 0);

// Promise.resolve().then(function () {
//   console.log('two');
// });

// console.log('one');

// one
// two
// three

// Promise.reject(reason)方法也会返回一个新的Promise实例，该状态为rejected
// 不用于Promise.resolve(),Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数
// const thenable = {
//   then(resolve, reject) {
//     reject('出错了');
//   }
// };

// Promise.reject(thenable)
// .catch(e => {
//   console.log(e === thenable)
// })
// true
// catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象

// 按顺序完成异步操作
// function logInOrder(urls) {
//   // 远程读取所有URL
//   const textPromises = urls.map((url) => {
//     return new Promise((resolved, reject) => {
//       setTimeout(resolved, url * 1000, url);
//     });
//   });
//   console.log("textPromises: ", textPromises);

//   // 按次序输出
//   textPromises.reduce((chain, textPromise) => {
//     console.log("chain, textPromise: ", chain, textPromise);
//     return chain.then(() => textPromise).then((text) => console.log(text));
//   }, Promise.resolve());
// }

// logInOrder([1, 3, 2]);


// // 模拟异步
// const delay = (data) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(data)
//       console.log('data: ', data);
//     }, Math.random() * 1000)
//   })
// }

// 使用 Promise 封装一个加载图片的函数
// function imageLoad(url) {
//   const img = new Image()
//   img.src = url

//   return new Promise(function (resolve, reject) {
//     img.onload = function () {
//       resolve('图片加载成功')
//     }

//     img.onerror = function () {
//       reject('图片加载失败')
//     }
//   })
// }

// imageLoad('xxx.png').then(res => {
//   alert(res)
// }).catch(err => {
//   alert(err)
// })

// 手写一个简单的 Promise

class MyPromise {
  constructor(executor) {
    this.thenCallback = null
    this.rejectCallback = null
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve (value) {
    // this.thenCallback(value)
    setTimeout(() => {
      this.thenCallback(value)
    }, 0);
  }

  _reject (value) {
    // this.rejectCallback(value)
    setTimeout(() => {
      this.rejectCallback(value)
    }, 0)
  }

  then (then_cb, onRejected) {
    this.thenCallback = then_cb
    this.rejectCallback = onRejected
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }
}

const p = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('123')
  //   // reject('some err')
  // }, 1000)
  resolve('123')  // 如果 then_cb 没有放在队列中，这里会报错 this.thenCallback is not a function
})

p.then(res => {
  console.log(res);
})
console.log('next code');


// p.catch(err => [
//   console.log('err', err)
// ])


// // 手写Promise.all
// Promise._all = (array) => {
//   return new Promise((resolve, reject) => {
//     let count = 0;
//     const result = []
//     for (let i = 0, len = array.length; i < len; i++) {
//       array[i].then((data) => {
//         result[i] = data
//         count++
//         // 因为array[i]的执行是异步的，所以这种判断是错误的
//         // 如果i===2的promise先执行完毕,result[2]导致result.length === 3
//         // if (result.length === array.length) {
//         //   resolve(result)
//         // }
//         if (count === array.length) {
//           resolve(result)
//         }
//       }, reject)
//     }
//   })
// }

// // const p1 = delay(1)
// // const p2 = delay(2)
// // const p3 = delay(3)
// Promise._all([delay(2), delay(1), delay(3)]).then(res => {
//   console.log('res: ', res);
// }, (err) => {
//   console.log('err: ', err);
// })


