function* gen(initial) {
  console.log("initial: ", initial);
  console.log(yield);
  console.log(yield);
}
var g = gen("a"); // 阻塞住，不会执行任何语句
g.next("b");
g.next("c");
g.next("d");
