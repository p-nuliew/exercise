// const p1 = new Promise((resolve) => {
//   resolve()
// }).then(function f1() {
//   console.log(1)
//   const p2 = new Promise(resolve => {
//     resolve()
//   }).then(function f3() {
//     console.log(2)
//   }).then(function f4() {
//     console.log(4)
//   })
// }).then(function f2() {
//   console.log(3)
// })
// console.log(0)


// new Promise(resolve => {
//   resolve()
// })
//   .then(function f1 () {
//     new Promise(resolve => {
//       resolve()
//     })
//       .then(function f3 () {
//         console.log(1)
//       })
//       .then(function f4 () {
//         console.log(2)
//       })
//       .then(function f5 () {
//         console.log(3.1)
//       })
//   })
//   .then(function f2 () {
//     console.log(1.1)
//     new Promise((resolve => {
//       resolve()
//     }))
//       .then(function f6 () {
//         new Promise(resolve => {
//           resolve()
//         })
//           .then(function f7 () {
//             console.log(4)
//           })
//           .then(function f8 () {
//             console.log(6)
//           })
//       }).then(function f9 () {
//         console.log(5)
//       })
//   })
//   .then(function f10 () {
//     console.log(3)
//   })
//   console.log(0)

// 自定义一个内循环
// const queue = []

// // 定义一个事件分发器
// function rafx(cb) {
//   queue.push(cb)
// }

// rafx(() => {
//   console.log(0.1)
// })

// rafx(() => {
//   console.log(0.2)

//   rafx(() => {
//     console.log(0.21)
//   })
// })

// rafx(() => {
//   console.log(0.3)
// })

// rafx(() => {
//   console.log(0.4)
// })

// rafx(() => {
//   console.log(0.5)
// })

// let cb
// while(cb = queue.shift()) {
//   cb()
// }


// setTimeout(function s1() {
//   console.log(5);
// }, 2)

// setTimeout(function s2() {
//   console.log(6);
// }, 0)


// new Promise(function (resolve) {
//   console.log(1);
//   for (var i = 0; i < 1000; i++) {
//     i == 99 && resolve();
//   }
//   console.log(2);
// }).then(function p1() {
//   console.log(4);
// })

// console.log(3);


// 模拟一个没有临时队列的外循环事件分发器

// 用数组模拟一个队列
var tasks = [];

// 模拟一个事件分发器
var addFn1 = function (task) {
  tasks.push(task);
}

// 执行所有的任务
var flush = function () {
  tasks.map(function (task) {
    task();
  })
}

// 最后利用setTimeout/或者其他你认为合适的方式丢入事件循环中
setTimeout(function () {
  flush();
})

// 分发任务
addFn1( function add () { console.log('my name is add fn'); } )
addFn1( function foo () { console.log('my name is foo fn'); } )

// 也可以不利用事件循环，而是手动在适当的时机去执行对应的某一个方法
// var dispatch = function (name) {
//   tasks.map(function (item) {
//     if (item.name === name) {
//       item.handle()
//     }
//   })
// }

// demoTask = {
//   name: 'demo',
//   handle: function () {
//     console.log('my name is demoTack');
//   }
// }

// addFn1(demoTask)
// console.log(tasks);
// dispatch('demo')