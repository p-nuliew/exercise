// 特性：先进先出。数组已经实现了该特性

// 运用到实践中，有如下常用操作：
//   1. 从队列最后入队
//   2. 从队列头部出队
//   3. 从队列任意位置离队（有其他事情）
//   4. 从队列任意位置插队（特殊权利）
//   5. 清空队列

// 应用场景：
//   医院挂号。先到先处理

class Queue {
  constructor() {
    this.length = 0
    this.queue = {}
  }

  // 从队列尾部进入
  push(node) {
    this.queue[this.length] = node
    this.length++
    return this.queue
  }

  // 从队列头部出队
  shift() {
    const rq = this.queue[0]
    for (let i = 0; i < this.length - 1; i++) {
      this.queue[i] = this.queue[i + 1]
    }
    delete this.queue[this.length - 1]
    this.length--;
    return rq
  }

  // 特殊情况的插队处理，在 i 前面插队
  inset(i, node) {
    this.length++
    for (let k = this.length - 1; k > i; k--) {
      this.queue[k] = this.queue[k - 1]
    }
    this.queue[i] = node
    return this.queue
  }

  // 特殊情况的离队处理，队列中的任意位置离队
  out(i) {
    const rq = this.queue[i]
    for (let k = i; k < this.length - 1; k++) {
      this.queue[k] = this.queue[k + 1]
    }

    delete this.queue[this.length - 1]
    this.length--
    return rq
  }

  clear() {
    this.length = 0
    this.queue = {}
  }
}


const queue = new Queue()

console.log(queue.push(1));
console.log(queue.push(2));
// console.log(queue.shift());
console.log(queue.push(3));
console.log(queue.push(4));
console.log(queue.inset(2, 22));
console.log(queue.out(2));
console.log('queue: ', queue);