const EventEmitter = require('events');

const event = new EventEmitter();

//监听test
event.on('test', (data) => {
  console.log(data);
});

// 解除限制 调用 setMaxListeners 传入数量
event.setMaxListeners(20);

// 只监听一次
event.once('test', (data) => {
  console.log('once', data);
});

event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});

event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});
event.on('test', (data) => {
  console.log(data);
});

// 取消监听
const fn = (msg) => {
  console.log(msg);
};
event.on('test', fn);
event.off('test', fn);

event.emit('test', 'xmxmxmxmx'); //派发事件
event.emit('test', 'xmxmxmxmx2');
