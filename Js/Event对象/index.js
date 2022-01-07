// javascript

const node = document.getElementById('d')
node.addEventListener('click', function (e) {
  console.log('e: ', e);
  const { screenX, clientX, x, pageX, offsetX, layerX } = e
  console.log('layerX: ', layerX);

  // screenX
  // 点击位置到显示屏左侧的x坐标，是绝对位置

  // clientX,x
  // 点击位置到浏览器可视区域左侧的x坐标

  // pageX
  // 相对文档的位置（也就是说包括工具栏和滚动条）

  // offsetX
  // 相对于自身的x坐标

  // layerX
  // 如果自身存在定位，则相对于自身的位置
  // 如果没有，则相对于最近的设置了position的父元素
}, false)

// x滚动条测试
const nodeB = document.getElementById('b')
nodeB.addEventListener('click', function (e) {
  const { screenX, clientX, x, pageX, offsetX } = e
  console.log('screenX, clientX, x, pageX, offsetX: ', screenX, clientX, x, pageX, offsetX);

  // screenX: 相对于显示屏的x坐标
  // clientX, x: 相对于浏览器的x坐标
  // pageX: 相对于文档的x坐标（也就是包括滚动条的宽度）
  // offsetX: 相对于自身的x坐标（包括滚动条的宽度）
}, false)

// y滚动条测试
const nodeY = document.getElementById('y')
nodeY.addEventListener('click', function (e) {
  console.log('e: ', e);
  const { screenY, clientY, y, pageY, offsetY } = e
  console.log('screenY, clientY, y, pageY, offsetY: ', screenY, clientY, y, pageY, offsetY);

  // screenY: 相对于显示屏的y坐标
  // clientY, y: 相对于浏览器的y坐标
  // pageY: 相对于文档的y坐标（也就是包括滚动条的宽度）
  // offsetY: 相对于自身的y坐标（包括滚动条的宽度）
}, false)

// layer 相对于父元素测试
const nodeChild = document.getElementById('child')
console.log('nodeChild: ', nodeChild);
nodeChild.addEventListener('click', function (e) {
  const { layerX, layerY, offsetX, offsetY } = e

  console.log('layerX, layerY: ', layerX, layerY);
  // 如果自身存在定位，则相对于自身的位置
  // 如果没有，则相对于最近的设置了position的父元素

  console.log('offsetX, offsetY: ', offsetX, offsetY);
}, false)