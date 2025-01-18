import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./static'));

app.post('/download', (req, res) => {
  const filename = req.body.filename;
  const filePath = path.join(process.cwd(), 'static', filename);
  const content = fs.readFileSync(filePath);
  // res.setHeader('Content-Type', 'application/octet-stream'); // octet-stream 通用的二进制流类型
  res.setHeader('Content-Type', 'application/image/png'); // 具体的二进制流类型,如image/png
  // res.setHeader('Content-Disposition', `attachment; filename=${filename}`); // attachment 附件, 直接下载
  res.send(content);
});

app.post('/download/text', (req, res) => {
  const filename = req.body.filename;
  const filePath = path.join(process.cwd(), 'static', filename);
  const content = fs.readFileSync(filePath);
  res.setHeader('Content-Type', 'application/octet-stream'); // octet-stream 通用的二进制流类型
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`); // attachment 附件, 直接下载
  res.send(content);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
