// javascript
// 表现为 setTimeout第二个参数为1-5，定时器在循环结束后隔秒输出6
// for (var i = 1; i <= 5; i++) {
//   setTimeout(function timer() {
//     console.log(i);
//   }, i * 1000);
// }

// 用自执行函数改造-隔秒一次输出1-5
// 自执行函数与timer形成闭包，所以i被保存了下来
// for (var i = 1; i <= 5; i++) {
//   console.log('i', i);
//   (function(i) {
//     console.log('ii', i);
//     setTimeout(function timer() {
//       console.log('iii', i);
//     }, i * 1000);
//     console.log('iiii', i);
//   })(i)
// }

// 缩小约束范围，瞬间输出1-5
// 只约束timer
// for (var i = 1; i <= 5; i++) {
//   setTimeout((function timer(i) {
//     console.log(i);
//   })(i), i * 1000);
// }


// 单例模式与闭包
// 单例模式，就是只有一个实例的对象
// 对象字面量就是一个单例模式
// var per = {
//   name: 'Jake',
//   age: 20,
//   getName: function () {
//     return this.name;
//   },
//   getAge: function () {
//     return this.age;
//   }
// }

// per.name = 'Tom'
// console.log(per.getName());

// 这样的单例存在一个问题，属性可以被外部修改。
//我们希望拥有自己的私有方法/属性，所以可以利用自执行函数的作用域进行隔离
// var per = (function () {
//   var name = 'Jake';
//   var age = 20;
//   return {
//     getName: function () {
//       return name;
//     },

//     getAge: function () {
//       return age;
//     }
//   }
// })();

// 这样内部修改就不会被修改，我们可以控制对外提供的属性和方法
// 但是还有一个小问题，这种方式一开始就被初始化了。

// 改造一下，仅在调用时初始化
// var per = (function () {
//   var instance = null // 保存实例
//   var name = 'Jake';
//   var age = 20;

//   function initial () {
//     return {
//       getName: function () {
//         return name;
//       },
//       getAge: function () {
//         return age;
//       }
//     }
//   }

//   return {
//     getInstance: function () {
//       if (!instance) {
//         instance = initial()
//       }
//       return instance
//     }
//   }
// })();

// var per1 = per.getInstance()
// var per2 = per.getInstance()

// console.log(per1 === per2); // true