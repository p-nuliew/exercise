// 递归：是一种通过将问题重复拆解为同类子问题的解决办法

// 一、从1累加到n
// 循环解法：
{
  function add(n) {
    let sum = 0;
    for (let i = 1; i <=n; i++) {
      sum+=i;
    }
    return sum;
  }
  console.log(add(100));
}

// 递归解法：
// n = 100
// 100 + [add(99)]
// 100 + [99 + add(98)]
// 100 + [99 + 98 + add(97)]
// 100 + [99 + 98 + 97 + add(76) + 2 + 1]
{
  function add(n) {
    if (n === 1) return 1;
    return n + add(n - 1)
  }

  console.log(add(100));
}

// 进一步优化，从min累加到max
{
  function add(min, max) {
    if (max <= min) return min;

    return max + add(min, max - 1)
  }

  console.log(add(2, 4));
}


// 二、计算树结构，所有节点number的总和
// node = {
//   tagName: 'div',
//   number: 10,
//   children: [node, node, node]
// }

var nodeTree = {
  tagName: 'div1',
  number: 10,
  children: [
    {
      tagName: 'div1-1',
      number: 10
    },
    {
      tagName: 'div1-2',
      number: 20,
      children: [
        {
          tagName: 'div1-2-1',
          number: 30
        },
        {
          tagName: 'div1-2-2',
          number: 40
        }
      ]
    }
  ]
}
const tree = [nodeTree];
// 观察nodeTree，发现children为一个数组，而根节点只有一个节点。因此我们要将根节点转为数组，这样子问题就变成了同类问题
{
  let sum = 0
  function addNumber(tree) {
    for (let item of tree) {
      sum += item.number
      if (item.children) {
        addNumber(item.children)
      }
    }
    return sum;
  }
  addNumber(tree)
  console.log(sum);
}
// 去掉外部变量sum
// 1. 确认终止条件: 没有children时，结束结果
// 2. 确认返回值：返回本次处理后的sum
// 3. 本级逻辑：初始sum为0，sum+=item.number;

{
  function addNumber2(tree) {
    let sum = 0;
    tree.forEach(item => {
      sum += item.number;
      if (item.children) {
        sum += addNumber2(item.children)
      }
    })
    return sum;
  }
  console.log(addNumber2(tree));
}
