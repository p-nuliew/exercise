// https://xiaozhuanlan.com/topic/9283417506
// 什么叫闭包
// 闭包是一个特殊的对象，它由两部分组成，执行上下文A以及在A中创建的函数B
// 当B执行时，如果访问了A中的变量对象，那么闭包就产生了

// 在chrome中，执行上下文A的函数名代指闭包
// 闭包对象[Closure(A)]的引用存在于B函数体内存中，如果B函数体被回收，闭包对象同样也会回收

var fn = function () {
  var a = 1;
  (function f() {
    console.log(++a); // 这时候闭包产生了，
  })();
  // 运行到这里是，f的执行上下文被销毁，闭包也消失了
  // 此时fn中的a变成了2
};
fn(); // 等fn执行完，fn的执行上下文也被销毁

// 闭包的应用
// 一、单例模式与闭包（单例模式指的是只有一个实例的对象）
// 返回可以访问私有属性的特权方法，使外部通过特权方法进行属性的访问和修改

var person = (function () {
  var instance = null;
  // 定义私有属性
  var state = {
    name: "tom",
    age: 19,
  };

  function init() {
    // 返回特权方法（特权方法：可以访问私有、公有的属性和方法 的方法）
    return {
      getFn: function (prop) {
        return state[prop];
      },
      setFn: function (prop, value) {
        state[prop] = value;
      },
    };
  }

  return {
    getInstance: function () {
      // 变量instance只会被赋值一次。这样符合单例模式的思想
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

const person1 = person.getInstance();
const person2 = person.getInstance();
console.log(person1 === person2);
console.log('person1.getFn("name");: ', person1.getFn("name"));
