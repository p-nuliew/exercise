// javascript
const canvas = document.getElementById('canvas');
canvas.style.background = 'pink'

// 最高价、最低价、开盘价、收盘价
// 暂时默认开盘价、收盘价处于最高价和最低价之间
const data = [
  { heightPrice: 110, lowPrice: 50, openingPrice: 80, closingPice: 100 },
  { heightPrice: 130, lowPrice: 30, openingPrice: 80, closingPice: 100 },
  { heightPrice: 114, lowPrice: 40, openingPrice: 90, closingPice: 98 },
  { heightPrice: 94, lowPrice: 30, openingPrice: 91, closingPice: 93 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
]

if (canvas.getContext) {
  ctx = canvas.getContext('2d');

  const space = 20  // 边距
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const triangleH = 10 // 三角形高度

  // 1. 绘制坐标系
  // 1.1 绘制原点坐标（x0, y0）
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
  // 均价0-200 周K
  // const heightPrice = 200 - space // 最高价
  const tickWidth = 5 // 刻度线宽度
  const yElementCount = 8 // y轴元素数量
  // const paddingHeight = heightPrice / yElementCount
  const paddingHeight = 20
  const paddingWidth = 20
  const candleW = 10

  // 开始坐标点和结束坐标点的坐标
  function yAxisTick (sx, sy, ex, ey) {
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(ex, ey)
    ctx.closePath();
    ctx.stroke()
  }

  // 1.6.1 绘制y轴刻度
  for (let i = 0; i < yElementCount; i++) {
    let sx, sy, ex, ey
    sx = x0
    sy = y0 - paddingHeight * i
    ex = x0 + tickWidth
    ey = y0 - paddingHeight * i

    axisText(paddingHeight * i, sx - 5, sy, 'right')  // y轴刻度文字
    yAxisTick(sx, sy, ex, ey)
  }



  // 1.6.1 绘制x轴刻度
  for (let i = 0; i < data.length; i++) {
    // 暂时跳过第一个
    if (i === 0) continue

    const { heightPrice, lowPrice, openingPrice, closingPice } = data[i]
    let sx, sy, ex, ey
    sx = x0 + i * paddingHeight
    sy = y0
    ex = x0 + i * paddingHeight
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

  // 文字
  // text: 文本；x，y；坐标点；text
  function axisText (text, x, y, textAlign) {
    ctx.fillStyle="#FF0000";  // 文字颜色
    ctx.textBaseline="middle";
    ctx.textAlign=textAlign;

    ctx.font="10px Arial";  // 高为10px的字体
    ctx.fillText(text, x, y)  // 描绘实体文字
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

    // 绘制蜡烛中间部分
    // 上 右 下 左 坐标
    // TODO
    ctx.beginPath()
    ctx.moveTo(candleTopPointX + halfCandleW, candleTopPointY)
    ctx.lineTo(candleTopPointX + halfCandleW, candleBottomPointY)
    ctx.lineTo(candleTopPointX - halfCandleW, candleBottomPointY)
    ctx.lineTo(candleTopPointX - halfCandleW, candleTopPointY)
    ctx.fillStyle = color
    ctx.fill();

    // 绘制蜡烛上面部分
    ctx.beginPath()
    ctx.moveTo(candleTopPointX, candleTopPointY)
    ctx.lineTo(heightPricePointX, heightPricePointY)
    ctx.closePath();
    ctx.stroke()
  }


  // // 蜡烛图各价格的y轴坐标 = 原点y坐标 - 各价格
  // ctx.beginPath()
  // ctx.moveTo(x0, y0)
  // ctx.lineTo(y0 - closingPice, y0 + 20)
  // ctx.closePath();
  // ctx.stroke()
}