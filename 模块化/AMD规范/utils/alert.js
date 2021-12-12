// 定义模块
define(function () {
  var alertName = function (str) {
    alert('i am ' + str)
  }

  return {
    alertName: alertName
  }
})