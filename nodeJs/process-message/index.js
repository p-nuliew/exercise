const { fork } = require('node:child_process');
const path = require('node:path');

const testProcess = fork(path.join(__dirname, 'test.js'));

testProcess.send('我是主进程');

testProcess.on('message', (data) => {
  console.log('我是主进程接受消息111：', data);
});
