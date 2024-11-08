const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`);

const document = dom.window.document;

const window = dom.window;

fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
  .then((res) => {
    if (!res.ok) {
      throw new Error('网络响应不正常');
    }
    return res.json();
  })
  .then((data) => {
    const app = document.getElementById('app');
    console.log('app: ', app);

    if (data.length === 0) {
      console.log('没有获取到数据');
      return; // 如果没有数据，直接返回
    }

    data.forEach((item) => {
      const img = document.createElement('img');
      img.src = item.url;
      img.style.width = '200px';
      img.style.height = '200px';
      app.appendChild(img);
    });
    fs.writeFileSync(path.join(__dirname, 'index.html'), dom.serialize());
  })
  .catch((error) => {
    console.error('发生错误:', error);
  });
