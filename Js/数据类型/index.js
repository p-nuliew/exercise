// 查看数据类型:typeof

// typeof:返回一个字符串，表示操作数的类型
let result;
const str = '123abc';

result = typeof(10+'20') // 1020
result = typeof a;  // undefined
result = typeof null; // object
result = typeof NaN;  // number
result = typeof +str; // number
result = typeof !!str;  // boolean
result = typeof str + ''; // string


// instanceof: object instanceof constructor 
// 检测constructor.prototype是否存在于参数object的原型链上
function C(){};
function D(){};
var o = new C();  

result = C.prototype // C.prototype = { constructor: f C(), __proto__: Object}
result = o instanceof C;  // true
result = Object.getPrototypeOf(o) === C.prototype;  // true

C.prototype = {}; // C.prototype = {}，表示
var o2 = new C();
result = o2 instanceof C; // true
result = o instanceof C;  // false

console.log(result) 
