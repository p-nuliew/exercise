
// 单向链表的实现
class LinkedList {
  constructor() {
    this.length = 0
    this.head = null // 链表首部节点
  }

  // 约定此时的节点格式
  createNode(number) {
    return {
      num: number,
      next: null
    }
  }

  push(number) {
    const node = this.createNode(number)
    if (!this.head) {
      this.head = node
      this.length++
      return node
    }
    let current = this.head

    // 此处的节点处理是关键，从头部开始遍历，只要还能找到下一个，说明就还不是最后一个，直到最后找不到了，就表示 current 指向了最后的节点
    while (current.next) {
      current = current.next
    }
    current.next = node
    this.length++
    return node
  }

  // 根据索引位置，插入新节点：默认此处传入的 i 值 >= 0，小于 length
  insert(i, number) {
    const node = this.createNode(number)
    let curIndex = 0, prevNode = null, current = this.head;
    if (i == 0) {
      node.next = current
      this.head = node
      return node
    }
    // 找到 i 对应的节点
    while (curIndex++ < i) {
      prevNode = current
      current = current.next
    }
    // 上一个节点指向新增节点，新增节点指向下一个节点
    node.next = current
    prevNode.next = node
    this.length++
    return node
  }

  // 找到节点所在的位置
  indexOf(number) {
    let index = -1, curIndex = -1, current = this.head

    // 直到找到最后一个节点
    while (current) {
      index++
      if (current.num == number) {
        curIndex = index
        break
      }
      current = current.next
    }

    return curIndex
  }

  // 根据索引位置，删除节点，默认 i 值是合理的
  remove(i) {
    let prevNode = null, current = this.head, curIndex = 0;
    if (i == 0) {
      const rmNode = current
      this.head = current.next
      return rmNode
    }

    // while(curIndex++ < i) {
    //   prevNode = current
    //   current = current.next
    // }
    for(;curIndex < i; curIndex++) {
      prevNode = current
      current = current.next
    }

    // 被删除的节点
    const rmNode = current
    prevNode.next = current.next
    this.length--
    return rmNode
  }
}

const linked = new LinkedList()
linked.push(1)
linked.push(2)
linked.push(3)

const i = linked.indexOf(1)
console.log('i: ', i);

linked.remove(1)

linked.insert(0, 4)
console.log('linked: ', linked);
