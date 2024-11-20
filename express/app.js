import express from 'express';
import User from './src/user.js';
import loggerMiddleware from './middleware/logger.js';

const app = express(); //express 是个函数

app.use(express.json()); //如果前端使用的是post并且传递json 需要注册此中间件 不然是undefined
app.use(loggerMiddleware); // 中间件要注册在路由之前
app.use('/user', User);

app.get('/', (req, res) => {
  console.log('query:', req.query); //get 用query
  res.send('get');
});

app.post('/create', (req, res) => {
  console.log('body', req.body); //post用body
  res.send('create');
});

app.listen(98, () => console.log('Listening on port 98'));
