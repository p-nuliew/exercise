// 导入所需模块
let request = require('request-promise'); // 用于发送HTTP请求的库
let cheerio = require('cheerio'); // 用于解析HTML的库
let fs = require('fs'); // 文件系统模块，用于文件操作
const util = require('util'); // Node.js内置工具模块

// 初始化电影列表和基础URL
let movies = [];
let basicUrl = 'https://movie.douban.com/top250';

// 防止并发控制的函数，确保某段代码只被执行一次
let once = function (cb) {
  let active = false;
  return function () {
    if (!active) {
      active = true;
      cb();
    }
  };
};

// 日志打印函数，利用once确保日志不重复打印
function log(item) {
  once(() => {
    console.log(item);
  });
}

// 提取单个电影信息的函数
function getMovieInfo(node) {
  let $ = cheerio.load(node); // 使用cheerio加载HTML节点
  let titles = $('.info .hd span'); // 获取标题元素
  titles = Array.from(titles).map((t) => $(t).text()); // 将标题文本内容提取到数组
  let bd = $('.info .bd'); // 获取电影信息块
  let info = bd.find('p').text(); // 提取简介文本
  let score = bd.find('.star .rating_num').text(); // 提取评分
  return { titles, info, score }; // 返回电影信息对象
}

// 获取单页电影列表的异步函数
async function getPage(url, num) {
  let html = await request({ url }); // 发起请求获取HTML
  console.log('连接成功！', `正在爬取第${num + 1}页数据`); // 打印日志
  let $ = cheerio.load(html); // 解析HTML
  let movieNodes = $('#content .article .grid_view').find('.item'); // 获取电影项
  let movieList = Array.from(movieNodes).map((node) => getMovieInfo(node)); // 提取各电影信息
  return movieList; // 返回当前页电影列表
}

// 主函数，执行爬虫逻辑
async function main() {
  let count = 25; // 需爬取的页数
  let list = []; // 存储所有电影信息的列表
  for (let i = 0; i < count; i++) {
    let url = `${basicUrl}?start=${25 * i}`; // 构造URL
    list.push(...(await getPage(url, i))); // 爬取每页数据并添加到list
  }
  console.log(list.length); // 打印总数
  fs.writeFile('./output.json', JSON.stringify(list), 'utf-8', () => {
    // 写入文件
    console.log('生成json文件成功！');
  });
}
// 启动主函数
main();
