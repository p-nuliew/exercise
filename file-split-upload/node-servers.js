import express from 'express'; // 导入 express 框架，用于创建服务器和处理请求
import multer from 'multer'; // 导入 multer 中间件，用于处理文件上传
import cors from 'cors'; // 导入 cors 中间件，用于处理跨域请求
import fs from 'node:fs'; // 导入 Node.js 的文件系统模块，用于文件操作
import path from 'node:path'; // 导入 Node.js 的路径模块，用于处理文件路径

const storage = multer.diskStorage({
  // 创建 multer 存储配置
  destination: (req, file, cb) => {
    // 设置文件存储的目标目录
    const dir = 'uploads/'; // 定义上传文件的目录
    if (!fs.existsSync(dir)) {
      // 检查目录是否存在
      fs.mkdirSync(dir, { recursive: true }); // 如果不存在，则创建目录
    }
    cb(null, dir); // 调用回调函数，指定存储目录
  },
  filename: (req, file, cb) => {
    // 设置上传文件的文件名
    cb(null, `${req.body.index}-${req.body.fileName}`); // 使用请求体中的 index 和 fileName 作为文件名
  },
});
const upload = multer({ storage }); // 创建 multer 实例，使用上面的存储配置
const app = express(); // 创建 express 应用实例

app.use(cors()); // 使用 cors 中间件，允许跨域请求
app.use(express.json()); // 使用 express.json() 中间件，解析 JSON 格式的请求体

app.get('/list', async (req, res) => {
  // 定义 GET 请求的路由 '/list'
  res.send('ok'); // 返回 'ok' 响应
});

app.post('/up', upload.single('file'), (req, res) => {
  // 定义 POST 请求的路由 '/up'，处理单个文件上传
  if (!req.file) {
    // 检查是否有文件上传
    return res.status(400).send('No file uploaded.'); // 如果没有文件，返回 400 状态和错误信息
  }
  res.send('ok'); // 返回 'ok' 响应
});

app.post('/merge', async (req, res) => {
  // 定义 POST 请求的路由 '/merge'
  const uploadPath = './uploads'; // 定义上传文件的路径
  let files = fs.readdirSync(path.join(process.cwd(), uploadPath)); // 读取上传目录中的文件
  files = files.sort((a, b) => a.split('-')[0] - b.split('-')[0]); // 按照文件名中的索引排序
  const writePath = path.join(
    // 定义合并后文件的写入路径
    process.cwd(),
    `video`,
    `${req.body.fileName}.mp4`, // 使用请求体中的 fileName 作为合并后文件的名称
  );
  files.forEach((item) => {
    // 遍历每个文件
    fs.appendFileSync(
      // 将文件内容追加到合并后的文件中
      writePath,
      fs.readFileSync(path.join(process.cwd(), uploadPath, item)), // 读取文件内容
    );
    fs.unlinkSync(path.join(process.cwd(), uploadPath, item)); // 删除已合并的文件
  });

  res.send('ok'); // 返回 'ok' 响应
});

app.listen(3000, () => {
  // 启动服务器，监听 3000 端口
  console.log('Server is running on port 3000'); // 在控制台输出服务器运行信息
});
