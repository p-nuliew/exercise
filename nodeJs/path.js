const path = require('node:path');

// 文件名
// 在posix系统处理windows的路径
console.log(
  path.win32.basename(
    'C:UsersAdministratorDesktoppersonalexercise\\nodeJs\\path.js',
  ),
);

// 文件路径
console.log(
  path.dirname(
    'C:\\Users\\Administrator\\Desktop\\personalexercise\\nodeJs\\path.js',
  ),
);

// 扩展名
console.log(
  path.extname(
    'C:\\Users\\Administrator\\Desktop\\personalexercise\\nodeJs\\path.js',
  ),
);

// 拼接路径
console.log(
  path.join(
    'C:\\Users\\Administrator\\Desktop\\personalexercise\\nodeJs',
    'path.js',
  ),
);

// 路径拼接并返回绝对路径
// C:\Users\Administrator\Desktop\personal\exercise\nodeJs\path.js
console.log(path.resolve(__dirname, 'path.js'));
// C:\Users\Administrator\Desktop\personal\exercise\path.js
console.log(path.resolve('path.js'));

// 解析文件路径
console.log(path.parse('/home/user/dir/file.txt'));
// {
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
// root：路径的根目录，即 /。
// dir：文件所在的目录，即 /home/user/dir
// base：文件名，即 file.txt。
// ext：文件扩展名，即 .txt。
// name：文件名去除扩展名，即 file。

// 路径组装
console.log(
  path
    .format({
      root: '/',
      dir: '/home/user/dir',
      base: 'file.txt',
      ext: '.txt',
      name: 'file',
    })
    .replace(/\\/g, '/'), // 替换反斜杠为正斜杠,
);
