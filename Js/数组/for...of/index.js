// for...in 迭代一个可迭代对象

let result = undefined;

// 迭代Array
for (const item of [1, 3, 4]) {
  console.log(item);
}

// 迭代String
for (let item of "1,2,3") {
  console.log(item); // 1 , 2 , 3
}
for (let item of "123") {
  console.log(item); // 1 2 3
}

// 迭代Map
for (let item of new Map([
  ["a", 1],
  ["b", 2],
])) {
  console.log(item);
  const [key, value] = item;
  console.log("key, value: ", key, value);
}

// 迭代Set
for (let item of new Set([{ a: 1 }, { a: 2 }, { a: 2 }])) {
  console.log(item);
}

(function () {
  for (let argument of arguments) {
    console.log(argument);
  }
})(1, 2, 3);

// 关闭迭代器
for (let o of [1, 2]) {
  console.log(o);
  break; // closes iterator, triggers return
}

// 与 for...in 的区别
Array.prototype.aa = function () {};
Object.prototype.bb = { bb: 1 };

let iteration = [1, 2, 3];
iteration.add = "add";

for (const key in iteration) {
  // for...in 会迭代继承属性
  console.log(key); // logs: 0 1 2 add aa bb
}

for (const key in iteration) {
  // for...in 会过滤继承属性
  if (iteration.hasOwnProperty(key)) {
    console.log(key); // logs: 0 1 2 add
  }
}

for (const value of iteration) {
  // 迭代可迭代对象定义的迭代值
  console.log(value); // logs: 1 2 3
}
