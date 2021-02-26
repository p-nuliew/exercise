// 与箭头函数的区别：
// 1.语法更加简洁、清晰
// 2.箭头函数没有原型
// 3.不会创建自己的this
// 4.this继承自父执行上下文的this
// 5.call || apply || bind 无法改变箭头函数中this的指向
// 6.不能作为构造函数，因为没有自己的this
// 7.不绑定arguments对象，可用rest参数来访问箭头函数参数列表
