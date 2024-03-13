// 发布订阅
// 1. events 对象存储键对应的回调函数
// 2. on 订阅函数
// 3. setState:
// a.更新 state
// b.触发回调
// 4. getState

const state = {
  userInfo: {
    name: 'tom',
    age: 18
  }
}

const events = {}

export const on = (key, cb) => {
  if (!events[key]) {
    events[key] = new Set()
  }
  events[key].add(cb)
}

export const setState = (_state) => {
  const preState = {
    ...state
  };

  state = {
    ...state,
    ..._state
  }

  Object.key(_state).foeEach(key => {
    if (_state[key] === preState[key]) return;

    // if (events[key].cb) {
    //   events[key].cb()
    // }
    events[key].forEach(cb => {
      if (cb) {
        cb()
      }
    })
  })
}

export const getState = (key) => {
  return key ? state[key] : {
    ...state
  }
}