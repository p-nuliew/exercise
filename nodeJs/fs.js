const fs = require('node:fs');
const fs2 = require('node:fs/promises');

// promise 风格异步调用
fs2
  .readFile('./index.txt', 'utf-8')
  .then((data) => {
    console.log('promise 风格readFile: ', data.toString());
  })
  .catch((err) => {
    console.log(err);
  });

// 异步调用
fs.readFile('./index.txt', (err, data) => {
  if (err) {
    return err;
  }
  console.log('readFile:', data.toString());
});

// 同步调用
let text = fs.readFileSync('./index.txt');
console.log('readFileSync', text.toString());

fs2
  .writeFile('./index2.txt', '被写入', {
    encoding: 'utf-8',
  })
  .then(() => {
    console.log('writeFile: success');
  })
  .catch((err) => {
    console.log('write error');
  });

fs2
  .readFile('./index2.txt', {
    encoding: 'utf-8',
  })
  .then((data) => {
    console.log('readFile: ', data.toString());
  })
  .catch((err) => {
    console.log(err);
  });

// 使用可读流读取
const rs = fs.createReadStream('./test.mp4', {
  // 可以设置适当的 highWaterMark 来控制每次读取的数据量
  highWaterMark: 2 * 1024, // 64KB chunks
});
// rs.on('data', (chunk) => {
//   console.log('接收到数据块，大小:', chunk, chunk.length, '字节');
// });
// rs.on('end', () => {
//   console.log('文件读取完毕');
// });
// rs.on('error', (err) => {
//   console.log('文件读取出错', err);
// });

// 创建文件夹
// fs.mkdir('ccc', (err) => {});
// fs.mkdir('path2/ccc', (err) => {
//   console.log('mkdir err', err);
// });
// recursive: true 递归创建文件夹
// fs.mkdir('path/test/ccc', { recursive: true }, (err) => {});

// 删除文件夹
// fs.rmdir('path', (err) => {});
// 递归删除全部文件夹
// fs.rmdir('path', { recursive: true }, (err) => {});

// 重命名
fs.renameSync('rename.txt', 'rename2.txt');

// 监听文件的变化：内容变化、重命名/移动/删除文件
// 应用场景：热重载，日志的实时监控，自动化构建工具
fs.watch(
  './index.txt',
  {
    persistent: true, // 保持进程运行
    recursive: false, // 是否监视子目录
    encoding: 'utf8', // 文件名编码
  },
  (event, filename) => {
    console.log(event, filename);
  },
);
