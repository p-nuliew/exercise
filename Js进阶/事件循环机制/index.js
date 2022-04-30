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


new Promise(resolve => {
  resolve()
})
  .then(function f1 () {
    new Promise(resolve => {
      resolve()
    })
      .then(function f3 () {
        console.log(1)
      })
      .then(function f4 () {
        console.log(2)
      })
      .then(function f5 () {
        console.log(3.1)
      })
  })
  .then(function f2 () {
    console.log(1.1)
    new Promise((resolve => {
      resolve()
    }))
      .then(function f6 () {
        new Promise(resolve => {
          resolve()
        })
          .then(function f7 () {
            console.log(4)
          })
          .then(function f8 () {
            console.log(6)
          })
      }).then(function f9 () {
        console.log(5)
      })
  })
  .then(function f10 () {
    console.log(3)
  })
  console.log(0)


