// 循环的理解：是一种方法，可以重复做某些事
// 迭代：表示一个约定，想Array、Map 都称之为可迭代对象

// label语句: label的值可以是任何的非保留字的js标识符，statement是语句（块）
// 语法 label: statement

var num = 0;
outPoint: for (var i = 0; i < 10; i++) {
  // i 循环
  for (var j = 0; j < 10; j++) {
    // j 循环
    if (i == 5 && j == 5) {
      break outPoint; // i = 5，j = 5 时，会跳出 j 循环
    } // 但 i 循环会继续执行，等于跳出之后又继续执行更多次 j 循环
    num++;
  }
}

// alert(num);
// 如果上面没添加label，则输出95
// 使用了label之后，输出为55

// break语句：用来终止循环或者switch，或者是链接到label
// 语法：break [label]
// 当你使用不带label的break时，它会立即终止当前所在的while、do-while、for、switch
// 当使用label的break时，它会终止指定的label语句

// continue: 继续执行（跳过代码块的剩余部分进入到下次循环）语句
// 语法：continue [label]
// 当你不使用label时，它会终止一个while、do-while、while、switch 或者label语句
// 使用label时，它会应用被 label 标识的循环语句。

// for...of语句：循环一个可迭代对象（包括Array，Map，Set，arguments）
for (let i of arr) {
  console.log(i); // 输出 "1", "2", "3"
}
