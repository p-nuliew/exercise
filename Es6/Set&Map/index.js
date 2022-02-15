// Set结构：类似于数组，但是成员唯一
const set = new Set([1,3,4,4,5,5]);
console.log('set: ', set);
// let result = null;

// Set 实例的属性和方法
// 属性
// const constructor = set.constructor;  // 构造函数默认就是Set函数
// const size = set.size;  // 返回实例的成员总数
// 方法
// result = set.add(6); // 添加值，返回添加后的Set结构
// result = set.has(1) // 返回布尔值，表示该值是否为Set成员
// result = set.delete(5)  // 删除值，返回一个是否删除成功的布尔值，原数组发生改变
// result = set.clear() // 清除所有成员，没有返回值

// 遍历操作
// Set结构的实例只有4个遍历方法用于遍历成员
// result = set.keys();  // 返回键名组成的遍历器对象 Entries[1,2,3,4,5]
// result = set.values();  // 返回键值组成的遍历器对象 Entries[1,2,3,4,5]
// result = set.entries(); // 返回键值对组成的遍历器对象
// result = set.forEach(_ => console.log(_)); // 参数为value，key，set使用回调函数遍历每个成员

// 遍历改变原来的Set结构
// set.map(item => console.log(item)) // Uncaught TypeError: set.map is not a function
// 1.Array.from(set):将Set结构转为数组
const newSet = new Set(Array.from(set, _ => _ * 2))
console.log('newSet: ', newSet);
// 2.利用原Set结构映射出一个新的结构
// const newSet = new Set([...set].map(_ => _ * 3))

// 应用
// 1.去重
// result = [...set];  // ...内部使用的是for...of循环，然后转化为数组格式
// 间接使用map或filter
// result = [...set].map(_ => _ * 3)
// result = [...set].filter(_ => (_ % 2) === 0)
// console.log('set', set);
// console.log('result: ', result);
// 2.取并集、交集、差集
const arr1 = new Set([1,2,3,4,5])
const arr2 = new Set([1,5,6])

//并集
console.log('并集', new Set([...arr1, ...arr2]))

// 交集
console.log('交集', new Set([...arr1].filter(item => arr2.has(item))))

// 差集
console.log('差集', new Set([...arr1].filter(item => !arr2.has(item))))


// Map：js中的对象只能用字符串当做键，Map数据结构各种类型的值都能当做键。Map比Object更合适“键值对”数据结构
// Map 接受一个数组为参数。该数组的成员是一个个表示键值对的数组
const arr = [
  ["name", "zhangsan"],
  ["age", 18],
  ["age", 17],  // 键名相同，后者覆盖前者。map.size === 2
];
const map = new Map(arr); // Entries [ {"name" => "zhangsan"} ]
console.log('map: ', map);

// Map 实现了迭代协议，可用for...of遍历，而 Object 不行。
for (let item of map) {
  console.log('item: ', item);
}

// const obj = {
//   name: 1,
//   age: 2
// }
// for (let item of obj) {
//   console.log('item: ', item); // obj is not iterable
// }
// console.log('objLength', obj.length);

// Map 得遍历会保证顺序
const m = new Map()
m.set(['username'],'jack')//数组作为键
m.set(true, true)//boolean类型作为键
m.set(4, 4)//boolean类型作为键
m.set('3', 3)//boolean类型作为键
m.set(2, 22)//boolean类型作为键

for (let item of m) {
  console.log('item: ', item);
}

m.forEach((value, key, map) => console.log('value', value))

// Map 实例的属性和方法
// 属性
// const size = map.size;  // 返回实例的成员总数
// 方法
// result = map.set('p', 'hi');  // 返回 Entries[{ 'p': 'hi' }]
// result = map.get('p');  // 返回 'hi'
// result = map.has(o) // 返回该成员是否存在的布尔值
// result = map.delete(o) // 返回删除是否成功的布尔值，并改变原数组
// result = map.clear()  // 清除所有成员，没有返回值

// 遍历方法
result = map.keys(); // 返回键名组成的遍历器对象
// result = map.values(); // 返回键值组成的遍历器对象
// result = map.entries(); // 返回所有成员组成的遍历器对象
// result = map.forEach((_) => console.log(_)); // 遍历Map成员，参数为value，key，map

console.log("result: ", result);
