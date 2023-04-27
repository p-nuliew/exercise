// 对树进行广度优先遍历
// 输入tree，输出[1,2,3,4,5]

const tree = [
  {
    id: 1,
    title: 'child1',
    parentId: 0,
    children: [
      {
        id: 3,
        title: 'child1_1',
        parentId: 1,
      },
      {
        id: 4,
        title: 'child1_2',
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'child2',
    parentId: 0,
    children: [
      {
        id: 5,
        title: 'child2_1',
        parentId: 2,
      },
    ],
  },
];

function rangeTree(tree) {
  const arr = [];
  if (!tree || !tree.length) return arr;

  let node, list = [...tree];

  while(node = list.shift()) {
    arr.push(node.id)
    node.children && list.push(...node.children)
  }

  return arr
}
console.log(rangeTree(tree));