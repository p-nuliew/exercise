function sort(arr) {
  var sum1 = 0;
  var sum2 = 0;
  for (var j = 0; j < arr.length - 1; j++) {
    // 声明一个变量，作为标志位
    var done = true;
    for (var i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        done = false;
      }
      sum1++;
    }
    if (done) break;
    sum2++;
  }
  console.log(sum1);
  console.log(sum2);
  return arr;
}

console.log(sort([1, 2, 4, 3]));

function sort2(arr) {
  var length = arr.length;
  var done = true; // 设置一个标志位，如果不需要排序则跳出循环
  for (var j = 0; j < length - 1; j++) {
    for (var i = 0; i < length - 1 - j; i++) {
      //
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
        done = false;
      }
    }
    if (done) break;
  }
  return arr;
}

console.log(sort2([1, 2, 3, 4]));
