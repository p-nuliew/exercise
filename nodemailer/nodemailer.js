import nodemailer from 'nodemailer';
import yaml from 'js-yaml';
import fs from 'node:fs';
import http from 'node:http';
import url from 'node:url';
// const mailConfig = yaml.load(fs.readFileSync('./mail.yaml', 'utf8'));
const mailConfig = {
  pass: 'bcheeefvwkgnbdbj',
  user: '869056620@qq.com',
};
const transPort = nodemailer.createTransport({
  service: 'qq',
  port: 587,
  host: 'smtp.qq.com',
  secure: true,
  auth: {
    pass: mailConfig.pass,
    user: mailConfig.user,
  },
});

http
  .createServer((req, res) => {
    console.log('req.url', req.url);
    const { pathname } = url.parse(req.url, true);
    if (req.method === 'POST' && pathname == '/send/mail') {
      let mailInfo = '';
      req.on('data', (chunk) => {
        console.log('chunk', chunk);
        mailInfo += chunk.toString();
      });
      req.on('end', () => {
        const body = JSON.parse(mailInfo);
        transPort.sendMail(
          {
            to: body.to,
            from: mailConfig.user,
            subject: body.subject,
            text: body.text,
          },
          (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.end('Error sending email');
            } else {
              console.log('Email sent:', info.response);
              res.end('ok');
            }
          },
        );
        res.end('ok');
      });
    }
  })
  .listen(3000, () => {
    console.log('nodemailer server start');
  });
