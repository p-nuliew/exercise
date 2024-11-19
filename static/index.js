// 动静资源分离

import http from 'node:http'; // 导入http模块
import fs from 'node:fs'; // 导入文件系统模块
import path from 'node:path'; // 导入路径处理模块
import mime from 'mime'; // 导入mime模块

const server = http.createServer((req, res) => {
  const { url, method } = req;

  // 处理静态资源
  if (method === 'GET' && url.startsWith('/static')) {
    const filePath = path.join(process.cwd(), url); // 获取文件路径
    const mimeType = mime.getType(filePath); // 获取文件的MIME类型
    console.log(mimeType); // 打印MIME类型

    fs.readFile(filePath, (err, data) => {
      // 读取文件内容
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain', // 设置响应头为纯文本类型
        });
        res.end('not found'); // 返回404 Not Found
      } else {
        res.writeHead(200, {
          'Content-Type': mimeType, // 设置响应头为对应的MIME类型
          'Cache-Control': 'public, max-age=3600', // 设置缓存控制头
        });
        res.end(data); // 返回文件内容
      }
    });
  }

  // 处理动态资源
  if ((method === 'GET' || method === 'POST') && url.startsWith('/api')) {
    // ...处理动态资源的逻辑
  }
});

server.listen(80); // 监听端口80
