// 发布订阅模式
// event：存储事件键对应的回调函数
// on: 订阅事件，将事件存到数组
// setPosition: 存储数据，并触发event
// getPosition: 获取数据

let position = {
  x: 0,
  y: 0,
  width: 10,
  height: 20,
}

// 存储事件键对应的回调函数
const events = {}

// 订阅函数，将回调函数加入event
export const on = (key, cb) => {
  if (!events[key]) {
    events[key] = new Set();
  }
  events[key].add(cb)
}

export const getPosition = (key) => {
  return key ? position[key] : {
    ...position
  };
}

export const setPosition = (_position) => {
  const prePosition = {
    ...position
  };

  position = {
    ...position,
    ..._position
  }

  Object.keys(_position).forEach(key => {
    // 优化：setPosition传入的值与原来的值相等时，不触发回调
    if (_position[key] === prePosition[key]) return;

    events[key].forEach(cb => {
      if (cb) {
        // 发布事件
        cb()
      }
    })
  })
}