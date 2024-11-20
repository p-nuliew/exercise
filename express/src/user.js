import express from 'express';

const router = express.Router(); //路由模块

router.post('/login', (req, res) => {
  console.log('req:', req.body);
  res.send('login');
});

router.post('/register', (req, res) => {
  res.send('register');
});

export default router;
