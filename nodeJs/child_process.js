// child_progress: 可以编写前端工程化工具之类;
// child_process 用于创建和管理子进程

// 创建子进程的7个api: 加sync是同步，不加是异步
// exec execFile spawn  fork
// execSync execFileSync spawnSync

const path = require('node:path');
const { exec, execSync, execFile, spawn } = require('node:child_process');

// 获得 node 版本号
// exec('node -v', (err, stdout, stderr) => {
//   if (err) {
//     return err;
//   }
//   console.log(stdout.toString());
// });

// const nodeVersion = execSync('node -v');
// console.log(nodeVersion.toString('utf-8'));

// 打开百度，并进入无痕浏览
// execSync('start chrome http://www.baidu.com --incognito');

// 执行可执行文件
// execFile(path.join(__dirname, './bat.cmd'), null, (err, stdout, stderr) => {
//   if (err) {
//     return err;
//   }
//   console.log(stdout.toString());
// });

//                       命令      参数  options配置
const { stdout } = spawn('netstat', ['-an'], {});

//返回的数据用data事件接受
stdout.on('data', (steram) => {
  console.log(steram.toString());
});
