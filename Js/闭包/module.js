// 二、闭包与模块化开发
// 在单例模式的基础上，一个模块就是一个单例
// 可以通过自执行函数模拟一个模块，变量名就是模块名
// 在自执行函数里面我们return一个字面量对象来对外提供接口
var module_status = (function () {
  var status = {
    number: 0,
    color: null,
  };

  var get = function (prop) {
    return status[prop];
  };

  var set = function (prop, value) {
    status[prop] = value;
  };

  return {
    get: get,
    set: set,
  };
})();

var module_color = (function () {
  // 假装用这种方式执行第二步引入模块 类似于 import state from 'module_status';
  var state = module_status;
  var colors = ["orange", "#ccc", "pink"];

  function render() {
    var color = colors[state.get("number") % 3];
    document.body.style.backgroundColor = color;
  }

  return {
    render: render,
  };
})();

var module_context = (function () {
  var state = module_status;

  function render() {
    document.body.innerHTML = "this Number is " + state.get("number");
  }

  return {
    render: render,
  };
})();

var module_main = (function () {
  var state = module_status;
  var color = module_color;
  var context = module_context;

  setInterval(function () {
    var newNumber = state.get("number") + 1;
    state.set("number", newNumber);

    color.render();
    context.render();
  }, 1000);
})();
