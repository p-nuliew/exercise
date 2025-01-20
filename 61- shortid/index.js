import knex from 'knex';
import express from 'express';
import shortid from 'shortid';
const app = express();
app.use(express.json());
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'Aa123456',
    database: 'short_link',
  },
});
//生成短码 存入数据库
app.post('/create_url', async (req, res) => {
  const { url } = req.body;
  const short_id = shortid.generate();
  const result = await db('short').insert({ short_id, url });
  res.send(`http://localhost:3000/${short_id}`);
});
//重定向
app.get('/:shortUrl', async (req, res) => {
  const short_id = req.params.shortUrl;
  const result = await db('short').select('url').where('short_id', short_id);
  if (result && result[0]) {
    res.redirect(result[0].url);
  } else {
    res.send('Url not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
