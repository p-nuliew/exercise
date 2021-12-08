// javascript
const canvas = document.getElementById('canvas');
canvas.style.background = 'pink'

// 最高价、最低价、开盘价、收盘价
// 开盘价、收盘价处于最高价和最低价之间
const data = [
  { heightPrice: 110, lowPrice: 50, openingPrice: 80, closingPice: 100 },
  { heightPrice: 130, lowPrice: 35, openingPrice: 80, closingPice: 70 },
  { heightPrice: 114, lowPrice: 65, openingPrice: 90, closingPice: 98 },
  { heightPrice: 94, lowPrice: 20, openingPrice: 51, closingPice: 93 },
  { heightPrice: 122, lowPrice: 33, openingPrice: 87, closingPice: 79 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
  { heightPrice: 114, lowPrice: 40, openingPrice: 90, closingPice: 98 },
  { heightPrice: 94, lowPrice: 30, openingPrice: 51, closingPice: 83 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
]

if (canvas.getContext) {
  ctx = canvas.getContext('2d');

  // 坐标轴与容器间的边距
  const space = 20
  // 容器宽度
  const width = ctx.canvas.width
  // 容器高度
  const height = ctx.canvas.height
  // 三角形高度
  const triangleH = 10
  // 刻度线宽度
  const tickWidth = 5
  // y轴元素数量
  const yElementCount = 8
  // y轴刻度间距
  const yAxisTickSpace = 20
  // x轴刻度间距
  const xAxisTickSpace = 40
  // 蜡烛宽度
  const candleW = 10

  // 1. 绘制坐标系
  // 1.1 原点坐标（x0, y0）
  const x0 = space
  const y0 = height - space

  // y轴顶点坐标（x1, y1）
  const x1 = space
  const y1 = space

  // x轴顶点坐标
  const x2 = width - space
  const y2 = height - space

  // 1.2 绘制y轴
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.closePath();
  ctx.stroke()

  // 1.3 绘制x轴
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x2, y2)
  ctx.closePath();
  ctx.stroke()

  // 1.4 绘制y轴三角形
  // 三角形顶点(x1, y1), 左下点(x1 - triangleH/2, y1 + triangleH), 右下点(x1 + triangleH/2, y1 + triangleH)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x1 - triangleH/2, y1 + triangleH)
  ctx.lineTo(x1 + triangleH/2, y1 + triangleH)
  ctx.fill()

  // 1.5 绘制x轴三角形
  // 三角形顶点(x2, y2), 左下点(x2 - triangleH, y2 - triangleH/2), 右下点(x2 - triangleH, y2 + triangleH/2)
  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - triangleH, y2 - triangleH/2)
  ctx.lineTo(x2 - triangleH, y2 + triangleH/2)
  ctx.fill()

  // 1.6 绘制刻度线
  // 开始坐标点和结束坐标点的坐标
  function yAxisTick (sx, sy, ex, ey) {
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(ex, ey)
    ctx.closePath();
    ctx.stroke()
  }

  /**
   * 轴线文字
   * @param {string} text 文本
   * @param {number} x 横坐标
   * @param {number} y 纵坐标
   * @param {string} textAlign 文本对齐方式
   */
  function axisText (text, x, y, textAlign) {
    ctx.fillStyle="#FF0000";  // 文字颜色
    ctx.textBaseline="middle";
    ctx.textAlign=textAlign;

    ctx.font="10px Arial";  // 高为10px的字体
    ctx.fillText(text, x, y)  // 描绘实体文字
  }

  // 1.6.1 绘制y轴刻度
  for (let i = 0; i < yElementCount; i++) {
    let sx, sy, ex, ey
    sx = x0
    sy = y0 - yAxisTickSpace * i
    ex = x0 + tickWidth
    ey = y0 - yAxisTickSpace * i

    axisText(yAxisTickSpace * i, sx - 5, sy, 'right')  // y轴刻度文字
    yAxisTick(sx, sy, ex, ey)
  }

  // 1.6.1 绘制x轴刻度
  for (let i = 0; i < data.length; i++) {
    // 暂时跳过第一个
    if (i === 0) continue

    const { heightPrice, lowPrice, openingPrice, closingPice } = data[i]
    // sx, sy, ex, ey 分别表示刻度的开始横坐标，开始纵坐标，结束横坐标，结束纵坐标
    let sx, sy, ex, ey
    sx = x0 + i * xAxisTickSpace
    sy = y0
    ex = x0 + i * xAxisTickSpace
    ey = y0 + tickWidth

    axisText(i, ex, ey + 10, 'center')  // x轴刻度文字
    yAxisTick(sx, sy, ex, ey)


    // 最低价坐标点
    const lowPricePointX = sx
    const lowPricePointY = sy - lowPrice

    // 开盘价坐标点
    const openingPricePointX = sx
    const openingPricePointY = sy - openingPrice

    // 收盘价坐标点
    const closingPicePointX = sx
    const closingPicePointY = sy - closingPice

    // 最高价坐标点
    const heightPricePointX = sx
    const heightPricePointY = sy - heightPrice

    let color = ''
    // 蜡烛顶部坐标
    let candleTopPointX = ''
    let candleTopPointY = ''
    // 蜡烛底部坐标
    let candleBottomPointX = ''
    let candleBottomPointY = ''
    // 红肿绿跌
    if (closingPice > openingPrice) {
      // 涨
      color = 'red'
      candleTopPointX = closingPicePointX
      candleTopPointY = closingPicePointY
      candleBottomPointX = openingPricePointX
      candleBottomPointY = openingPricePointY
    } else {
      color = 'green'
      candleTopPointX = openingPricePointX
      candleTopPointY = openingPricePointY
      candleBottomPointX = closingPicePointX
      candleBottomPointY = closingPicePointY
    }

    renderCandle(
      candleTopPointX,
      candleTopPointY,
      candleBottomPointX,
      candleBottomPointY,
      lowPricePointX,
      lowPricePointY,
      heightPricePointX,
      heightPricePointY,
      color
    )
  }

  // 2.绘制蜡烛
  function renderCandle (
    candleTopPointX,
    candleTopPointY,
    candleBottomPointX,
    candleBottomPointY,
    lowPricePointX,
    lowPricePointY,
    heightPricePointX,
    heightPricePointY,
    color
  ) {
    const halfCandleW = candleW / 2

    // 绘制蜡烛下面部分
    ctx.beginPath()
    ctx.moveTo(lowPricePointX, lowPricePointY)
    ctx.lineTo(candleBottomPointX, candleBottomPointY)
    ctx.closePath();
    ctx.stroke()

    // 绘制蜡烛中间部分（绘制矩形）
    ctx.beginPath()
    ctx.moveTo(candleTopPointX - halfCandleW, candleTopPointY)
    ctx.rect(candleTopPointX - halfCandleW, candleTopPointY, candleW, candleBottomPointY - candleTopPointY)
    ctx.fillStyle = color
    ctx.fill();

    // 绘制蜡烛上面部分
    ctx.beginPath()
    ctx.moveTo(candleTopPointX, candleTopPointY)
    ctx.lineTo(heightPricePointX, heightPricePointY)
    ctx.closePath();
    ctx.stroke()
  }

  // 3. 绘制贝塞尔曲线
  function renderBezierCurve () {
  }

  // 收盘价折线图
  // ctx.beginPath()
  // for (let i = 0; i < data.length; i++) {
  //   const { heightPrice, lowPrice, openingPrice, closingPice } = data[i]
  //   sx = x0 + i * xAxisTickSpace
  //   sy = y0
  //   // 收盘价坐标点
  //   const closingPicePointX = sx
  //   const closingPicePointY = sy - closingPice

  //   if (i === 0) {
  //     continue
  //   }
  //   ctx.lineTo(closingPicePointX, closingPicePointY)
  // }
  // ctx.stroke()

  // 收盘价曲线
  // TODO 计算不对
  ctx.beginPath()
  for (let i = 0; i < data.length; i++) {
    if (i < 1 || i === data.length - 1) {
      continue
    }

    const { heightPrice, lowPrice, openingPrice, closingPice } = data[i]
    const prevNode = data[i - 1]
    const nextNode = data[i + 1]

    // sx, sy 分别表示刻度的开始横坐标，开始纵坐标
    let sx, sy
    sx = x0 + i * xAxisTickSpace
    sy = y0

    // 最低价坐标点
    const lowPricePointX = sx
    const lowPricePointY = sy - lowPrice

    // 三角形的高
    const triangleHeight = Math.abs(nextNode.closingPice - prevNode.closingPice)
    // 三角形底边
    const triangleBottomLine = xAxisTickSpace * 2
    // 三角形斜边 = (高的平方+底边的平方)的平方根
    const triangleHypotenuse = Math.sqrt(Math.pow(triangleHeight, 2) +  Math.pow(triangleBottomLine, 2))

    // 控制点长度(控制点三角形斜边)
    const controlPointW = xAxisTickSpace * 0.8
    // 控制点三角形底边
    const controlPointBottomLine = triangleBottomLine / (triangleHypotenuse / controlPointW)
    // 控制点三角形的高
    const controlPointHeight = triangleHeight / (triangleHypotenuse / controlPointW)

    // 前一个控制点坐标
    let prevControlX = undefined
    // 如果下个控制点的收盘价小于前个控制点的收盘价
    if (nextNode.closingPice < prevNode.closingPice) {
      prevControlX = lowPricePointX - controlPointBottomLine / 2
      prevControlY = lowPricePointY + controlPointHeight / 2
    } else {
      prevControlX = lowPricePointX + controlPointBottomLine / 2
      prevControlY = lowPricePointY - controlPointHeight / 2
    }

    console.log('lowPricePointX, lowPricePointY: ', lowPricePointX, lowPricePointY);
    console.log('prevControlX, prevControlY: ', prevControlX, prevControlY);

    if (i === 1) {
      ctx.moveTo(lowPricePointX, lowPricePointY);
    } else {
      ctx.quadraticCurveTo(prevControlX, prevControlY, lowPricePointX, lowPricePointY);
      // ctx.quadraticCurveTo(prevControlX, prevControlY, lowPricePointX, lowPricePointY)
    }
  }
  ctx.stroke();
}


// 1. 贝塞尔曲线

// 2. 封装函数（自己的点转换为canvas的点）