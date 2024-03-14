// 发布订阅
// 1. 创建一个保存回调函数的对象 events
// 2. 创建订阅函数，将回调添加进 events 对象
// 3. 创建更新 state 函数，setState
//     a.更新state
//     b.遍历events，执行回调函数
// 4. 创建获取state函数

let state = {
  avatar: '',
  userInfo: {
    name: '',
    age: ''
  }
}

const events = {}

export const on = (key, cb) => {
  if (!events[key]) {
    events[key] = new Set()
  }
  events[key].add(cb)
}

/**
 * 更新函数
 * _state { eventName: value }
 */
export const setState = (_state) => {
  const preState = {
    ...state
  }

  state = {
    ...state,
    ..._state
  }

  Object.keys(_state).forEach(key => {
    if (preState[key] === _state[key]) return;
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