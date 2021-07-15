// javascript
var name = "window";

var p = {
  name: 'Perter',
  getName: function() {

    // 利用变量保存的方式保证其访问的是p对象
    var self = this;
    return function b () {
      return self.name;
    }
  }
}

var getName = p.getName();
var _name = getName();
console.log(_name);