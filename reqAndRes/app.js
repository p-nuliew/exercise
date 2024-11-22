import express from 'express';
const app = express();

app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501'); //允许localhost 5501 访问
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST,GET,OPTIONS,DELETE,PATCH',
  ); // 允许的请求方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // application/json 不属于cors 范畴需要手动支持
  next();
});

app.get('/info', (req, res) => {
  res.json({
    code: 200,
  });
});
app.patch('/info', (req, res) => {
  res.json({
    code: 200,
  });
});
app.post('/info', (req, res) => {
  res.json({
    code: 200,
  });
});

// 后端自定义响应头
app.get('/info2', (req, res) => {
  res.set('xmzs', '1');
  // 自定义响应头之后还需要抛出
  res.setHeader('Access-Control-Expose-Headers', 'xmzs');
  res.json({
    code: 200,
  });
});

// SSE(server-Sent Events)技术：webSocket属于全双工通讯，也就是前端可以给后端实时发送，后端也可以给前端实时发送，SSE属于单工通讯，后端可以给前端实时发送
app.get('/sse', (req, res) => {
  // 增加该响应头text/event-stream就变成了sse
  res.setHeader('Content-Type', 'text/event-stream');
  res.status(200);
  // event 事件名称 data 发送的数据
  setInterval(() => {
    res.write('event: test\n');
    res.write('data: ' + new Date().getTime() + '\n\n');
  }, 1000);
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
