// console.log(process.arch);

// 当前工作目录。所有相对路径都是相对于此目录。
// console.log(process.cwd());

// console.log(__dirname);

// 获取执行进程的命令行参数
// console.log(process.argv);
// node nodeJs/process.js --open --xm
// [
//   'C:\\Users\\Administrator\\AppData\\Roaming\\nvm\\v18.19.1\\node.exe',
//   'C:\\Users\\Administrator\\Desktop\\personal\\exercise\\nodeJs\\process.js',
//   '--open',
//   '--xm'
// ]

// 强制进程退出
// setTimeout(() => {
//   process.exit();
// }, 1000);
// process.on('exit', () => {
//   console.log('进程被退出');
// });

// 进程id
// console.log(process.pid);

// 杀死一个进程
// process.kill(process.pid);

// 操作系统所有的环境变量
// console.log(process.env);

// 修改 注意修改并不会真正影响操作系统的变量，而是只在当前线程生效，线程结束便释放
process.env.JS_HOME = 'jshome';
console.log(process.env);

// cross-env 跨平台设置环境变量
// 用法：
// cross-env NODE_ENV=dev

// 他的原理就是如果是windows 就调用SET 如果是posix 就调用export 设置环境变量
// sh脚本：
// set NODE_ENV=production  #windows
// export NODE_ENV=production #posix
