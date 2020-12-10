// catch能捕获try语句抛出的错误，不应该后续代码的执行
// try {
//   throw 1
// } catch (err){
//   console.log('err: ', err);
// } 
// console.log(33);
// err: 1
// 33


// finally 无论是否抛出异常，都将执行finally
// try{
//   console.log(1);
// } finally{
//   console.log(2);
// }
// 1
// 2

// try{
//   throw 1
// } finally{
//   console.log(2);
// }
// 2
// Uncaught 1


// try{
//   throw 1
// } catch(err) {
//   console.log('err: ', err);
// } finally{
//   console.log(2);
// }

// err: 1
// 2