// Array.from 将类数组(Set)或可迭代对象转成数组，返回新数组
// Array.from(arrayLike, mapFn, thisArg);

// arrayLike 类数组对象或可迭代对象
// mapFn  对最后生成的数组再进行map
// thisArg 执行回调函数 mapFn 时 this 对象

console.log(Array.from({ length: 5 }));

console.log(Array.from("123"));

console.log(Array.from(new Set([1, 2])));
