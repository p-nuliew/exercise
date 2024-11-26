// knex: Knex是一个基于JavaScript的查询生成器，它允许你使用JavaScript代码来生成和执行SQL查询语句。
// 它提供了一种简单和直观的方式来与关系型数据库进行交互，而无需直接编写SQL语句。
// 你可以使用Knex定义表结构、执行查询、插入、更新和删除数据等操作。

import fs from 'node:fs';
import jsyaml from 'js-yaml';
const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
const config = jsyaml.load(yaml);
import knex from 'knex';
import express from 'express';

const db = knex({
  client: 'mysql2',
  connection: config.db,
});

// 定义表结构
// db.schema
//   .createTable('list', (table) => {
//     table.increments('id'); //id自增
//     table.integer('age'); //age 整数
//     table.string('name'); //name 字符串
//     table.string('hobby'); //hobby 字符串
//     table.timestamps(true, true); //创建时间和更新时间
//   })
//   .then(() => {
//     console.log('创建成功');
//   });

const app = express();
app.use(express.json());
//查询接口 全部
app.get('/', async (req, res) => {
  const data = await db('list').select().orderBy('id', 'desc');
  const total = await db('list').count('* as total');
  res.json({
    code: 200,
    data,
    total: total[0].total,
  });
});
//单个查询 params
app.get('/user/:id', async (req, res) => {
  const row = await db('list').select().where({ id: req.params.id });
  res.json({
    code: 200,
    data: row,
  });
});

//新增接口
app.post('/create', async (req, res) => {
  const { name, age, hobby } = req.body;
  const detail = await db('list').insert({ name, age, hobby });
  res.send({
    code: 200,
    data: detail,
  });
});

//编辑
app.post('/update', async (req, res) => {
  const { name, age, hobby, id } = req.body;
  const info = await db('list').update({ name, age, hobby }).where({ id });
  res.json({
    code: 200,
    data: info,
  });
});
//删除
app.post('/delete', async (req, res) => {
  const info = await db('list').delete().where({ id: req.body.id });
  res.json({
    code: 200,
    data: info,
  });
});
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
