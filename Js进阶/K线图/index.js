// javascript
const canvas = document.getElementById('canvas');
canvas.style.background = 'pink'

// 最高价、最低价、开盘价、收盘价
// 开盘价、收盘价处于最高价和最低价之间
const data = [
  { heightPrice: 110, lowPrice: 40, openingPrice: 80, closingPice: 100 },
  { heightPrice: 160, lowPrice: 30, openingPrice: 80, closingPice: 70 },
  { heightPrice: 114, lowPrice: 80, openingPrice: 90, closingPice: 100 },
  { heightPrice: 194, lowPrice: 15, openingPrice: 51, closingPice: 93 },
  { heightPrice: 122, lowPrice: 20, openingPrice: 87, closingPice: 79 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
  { heightPrice: 114, lowPrice: 40, openingPrice: 90, closingPice: 98 },
  { heightPrice: 94, lowPrice: 30, openingPrice: 51, closingPice: 83 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
]

if (canvas.getContext) {
  ctx = canvas.getContext('2d');

  // 已知条件
  // 最高价最大的值
  const maxHeightPrice = data.sort((a, b) => (b.heightPrice - a.heightPrice))[0].heightPrice
  // 坐标轴与容器间的边距
  const space = 40
  // 容器宽度
  const width = ctx.canvas.width
  // 容器高度
  const height = ctx.canvas.height
  // 三角形高度
  const triangleH = 10
  // 刻度线宽度
  const tickWidth = 5
  // x轴刻度数量
  const xAxisTickCount = data.length
  // y轴刻度数量
  const yAxisTickCount = 8
  // y轴刻度间距
  // const yAxisTickSpace = 20
  // y轴高度
  const yAxisHeight = height - space * 2
  // 价格于y轴高度的比率
  const priceAndHeightRate = maxHeightPrice / yAxisHeight
  console.log('priceAndHeightRate: ', priceAndHeightRate);

  const yAxisTickSpace = yAxisHeight / yAxisTickCount
  console.log('yAxisTickSpace: ', yAxisTickSpace);
  // x轴刻度间距
  const xAxisTickSpace = 40
  // 蜡烛宽度
  const candleW = 10
  // 原点横坐标
  const originX = space
  // 原点纵坐标
  const originY = height - space
  // x轴刻度开始点横坐标
  xAxisTickStartX = i => originX + i * xAxisTickSpace
  // y轴刻度开始点纵坐标
  xAxisTickStartPointY = height - space
  // y轴顶点横坐标
  const yAxisVertexX = space
  // y轴顶点纵坐标
  const yAxisVertexY = space
  // x轴顶点横坐标
  const xAxisVertexX = width - space
  // x轴顶点纵坐标
  const xAxisVertexY = height - space

  // 1.2 绘制Y轴
  function renderYAxis () {
    ctx.beginPath()
    ctx.moveTo(originX, originY)
    ctx.lineTo(yAxisVertexX, yAxisVertexY)
    ctx.closePath();
    ctx.stroke()
  }
  renderYAxis()

  // 1.3 绘制x轴
  function renderXAxis () {
    ctx.beginPath()
    ctx.moveTo(originX, originY)
    ctx.lineTo(xAxisVertexX, xAxisVertexY)
    ctx.closePath();
    ctx.stroke()
  }
  renderXAxis()

  // /**
  //  * 绘制y轴三角形
  //  * @param {number} yAxisVertexX y轴顶点横坐标
  //  * @param {number}} yAxisVertexY y轴顶点纵坐标
  //  * @param {number}} triangleH 三角形高度
  //  */
  //  function renderYAxisTriangle (yAxisVertexX, yAxisVertexY, triangleH) {
  //   ctx.beginPath()
  //   ctx.moveTo(yAxisVertexX, yAxisVertexY)
  //   ctx.lineTo(yAxisVertexX - triangleH/2, yAxisVertexY + triangleH)
  //   ctx.lineTo(yAxisVertexX + triangleH/2, yAxisVertexY + triangleH)
  //   ctx.fill()
  // }
  // // TODO 这里是否有必要把已知变量当做参数传入？
  // // 好处：把变量控制在函数作用域内，防止污染外部变量。坏处：感觉多此一举
  // renderYAxisTriangle(yAxisVertexX, yAxisVertexY, triangleH)


  /**
   * 绘制y轴三角形
   */
  function renderYAxisTriangle () {
    ctx.beginPath()
    ctx.moveTo(yAxisVertexX, yAxisVertexY)
    ctx.lineTo(yAxisVertexX - triangleH/2, yAxisVertexY + triangleH)
    ctx.lineTo(yAxisVertexX + triangleH/2, yAxisVertexY + triangleH)
    ctx.fill()
  }
  renderYAxisTriangle()

  /**
   * 绘制x轴三角形
   */
  function renderXAxisTriangle () {
    ctx.beginPath()
    ctx.moveTo(xAxisVertexX, xAxisVertexY)
    ctx.lineTo(xAxisVertexX - triangleH, xAxisVertexY - triangleH/2)
    ctx.lineTo(xAxisVertexX - triangleH, xAxisVertexY + triangleH/2)
    ctx.fill()
  }
  renderXAxisTriangle()

  /**
   * 绘制线条
   * @param {sx} sx 开始坐标点横坐标
   * @param {sy} sy 开始坐标点纵坐标
   * @param {ex} ex 结束坐标点横坐标
   * @param {ey} ey 结束坐标点纵坐标
   */
  function renderLine (sx, sy, ex, ey) {
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
  function renderText (text, x, y, textAlign) {
    ctx.fillStyle = "#FF0000";  // 文字颜色
    ctx.textBaseline = "middle";
    ctx.textAlign = textAlign;

    ctx.font = "10px Arial";  // 高为10px的字体
    ctx.fillText(text, x, y)  // 描绘实体文字
  }

  /**
   * 绘制y轴刻度
   */
  function renderYAxisTick () {
    for (let i = 0; i < yAxisTickCount; i++) {
      let sx = originX
          sy = xAxisTickStartPointY - yAxisTickSpace * i
          ex = originX + tickWidth
          ey = xAxisTickStartPointY - yAxisTickSpace * i

      renderText((yAxisTickSpace * i * priceAndHeightRate).toFixed(2), sx - 10, sy, 'right')
      renderLine(sx, sy, ex, ey)
    }
  }
  renderYAxisTick()

  /**
   * 绘制x轴刻度
   */
  function renderXAxisTick () {
    for (let i = 0; i < xAxisTickCount; i++) {
      const tickStartX = xAxisTickStartX(i)
      renderText(i, tickStartX, xAxisTickStartPointY + tickWidth + 10, 'center')
      renderLine(tickStartX, xAxisTickStartPointY, tickStartX, xAxisTickStartPointY + tickWidth)
    }
  }
  renderXAxisTick()


  // TODO 优化
  // 绘制所有蜡烛
  for (let i = 0; i < xAxisTickCount; i++) {

    const { heightPrice, lowPrice, openingPrice, closingPice } = data[i]

    // 刻度横坐标
    const sx = xAxisTickStartX(i)

    // 最低价坐标点
    const lowPricePointX = sx
    // TODO 计算不对
    const lowPricePointY = originY - lowPrice / priceAndHeightRate

    // 开盘价坐标点
    const openingPricePointX = sx
    const openingPricePointY = originY - openingPrice / priceAndHeightRate

    // 收盘价坐标点
    const closingPicePointX = sx
    const closingPicePointY = originY - closingPice / priceAndHeightRate

    // 最高价坐标点
    const heightPricePointX = sx
    const heightPricePointY = originY - heightPrice / priceAndHeightRate

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

    console.warn('最低价坐标', lowPricePointX, lowPricePointY);
    renderCandle(
      candleTopPointX,
      candleTopPointY,
      candleBottomPointX,
      candleBottomPointY,
      lowPricePointX,
      lowPricePointY,
      heightPricePointX,
      heightPricePointY,
      color,
      candleW
    )
  }

  /**
   * 绘制蜡烛
   * @param {number} candleTopPointX 蜡烛顶点横坐标
   * @param {number} candleTopPointY 蜡烛顶点纵坐标
   * @param {number} candleBottomPointX 蜡烛底点横坐标
   * @param {number} candleBottomPointY 蜡烛底点纵坐标
   * @param {number} lowPricePointX 最低价横坐标
   * @param {number} lowPricePointY 最低价纵坐标
   * @param {number} heightPricePointX 最高价横坐标
   * @param {number} heightPricePointY 最高价纵坐标
   * @param {string} color 烛身颜色
   * @param {number} candleW 蜡烛宽度
   */
  function renderCandle (
    candleTopPointX,
    candleTopPointY,
    candleBottomPointX,
    candleBottomPointY,
    lowPricePointX,
    lowPricePointY,
    heightPricePointX,
    heightPricePointY,
    color,
    candleW
  ) {
    const halfCandleW = candleW / 2

    // 绘制蜡烛下影线
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

    // 绘制蜡烛上影线
    ctx.beginPath()
    ctx.moveTo(candleTopPointX, candleTopPointY)
    ctx.lineTo(heightPricePointX, heightPricePointY)
    ctx.closePath();
    ctx.stroke()
  }

  // 获取当前点以及前后控制点坐标
  const getControlPointInfo = () => {
    let controlPoint = []

    for (let i = 0; i < xAxisTickCount; i++) {
      const { lowPrice } = data[i]
      let prevNode = {}
      let nextNode = {}

      // 边界处理：在首尾加入虚拟点，不全第一个元素没有前控制点，末尾元素没有后控制点的情况
      if (i === 0) {
        prevNode = { heightPrice: 100, lowPrice: 60, openingPrice: 70, closingPice: 99 }
        nextNode = data[i + 1]
      } else if (i === xAxisTickCount - 1) {
        prevNode = data[i - 1]
        nextNode = { heightPrice: 101, lowPrice: 20, openingPrice: 72, closingPice: 89 }
      } else {
        prevNode = data[i - 1]
        nextNode = data[i + 1]
      }

      // 最低价坐标点
      const lowPricePointX = xAxisTickStartX(i)
      const lowPricePointY = xAxisTickStartPointY - lowPrice / priceAndHeightRate

      // 前后点构成的三角形
      // b: 三角形的高
      const triangleHeight = Math.abs(nextNode.lowPrice - prevNode.lowPrice)
      // a: 三角形底边
      const triangleBottomLine = xAxisTickSpace * 2
      // c: 三角形斜边 = (高的平方+底边的平方)的平方根
      const triangleHypotenuse = Math.sqrt(Math.pow(triangleHeight, 2) +  Math.pow(triangleBottomLine, 2))

      // 前后控制点为斜边的三角形
      // C: 控制点三角形斜边长度(自定义)
      const controlPointW = xAxisTickSpace * 0.5
      // A: 控制点三角形底边
      const controlPointBottomLine = controlPointW * triangleBottomLine / triangleHypotenuse
      // B: 控制点三角形的高
      const controlPointHeight = controlPointW * triangleHeight / triangleHypotenuse

      // 前一个控制点坐标
      let prevControlX = undefined
      let prevControlY = undefined
      // 后一个控制点坐标
      let nextControlX = undefined
      let nextControlY = undefined
      // 如果下个控制点的最低价高于前个控制点的最低价
      // TODO 计算逻辑需要整理、注释
      if (nextNode.lowPrice < prevNode.lowPrice) {
        // 左低右高
        prevControlX = lowPricePointX - controlPointBottomLine / 2
        prevControlY = lowPricePointY - controlPointHeight / 2

        nextControlX = lowPricePointX + controlPointBottomLine / 2
        nextControlY = lowPricePointY + controlPointHeight / 2
      } else {
        prevControlX = lowPricePointX - controlPointBottomLine / 2
        prevControlY = lowPricePointY + controlPointHeight / 2

        nextControlX = lowPricePointX + controlPointBottomLine / 2
        nextControlY = lowPricePointY - controlPointHeight / 2
      }

      controlPoint.push({
        curX: lowPricePointX,
        curY: lowPricePointY,
        prevControlX,
        prevControlY,
        nextControlX,
        nextControlY
       })
    }

    return controlPoint
  }

  /**
   * 绘制贝塞尔曲线
   * @param {array} controlPoint 控制点集合:  [{ curX: lowPricePointX, curY: lowPricePointY, prevControlX, prevControlY, nextControlX, nextControlY } ...]
   */
  const renderBezierCurve = controlPoint => {
    ctx.beginPath();
    for (let i = 0; i < controlPoint.length; i++) {
      const {
        curX,
        curY,
        prevControlX,
        prevControlY,
      } = controlPoint[i]

      if (i > 0 && i < controlPoint.length) {
        const prevNode = controlPoint[i - 1]
        // 验证控制点是否正确
        // ctx.lineTo(prevNode.nextControlX, prevNode.nextControlY)
        // ctx.lineTo(prevControlX, prevControlY)
        // ctx.lineTo(curX, curY)

        ctx.bezierCurveTo(prevNode.nextControlX, prevNode.nextControlY, prevControlX, prevControlY, curX, curY);
      } else if ( i === 0) {
        ctx.moveTo(curX, curY);
      }
    }
    ctx.stroke();
  }
  renderBezierCurve(getControlPointInfo())
}

// TODO
// 1. 处理边界问题
// 2. 数据整合成我们需要的ui数据
// 3. 封装
// 原点不应该是0,0


// 以补全的方式、虚拟的点，让边界减少
// 以视图（折线）的方式验证结果（前后控制点）是否正确
// 最高价发生变动时，y轴刻度文字、蜡烛和曲线需要响应变化
//   刻度文字*倍率，（蜡烛和曲线）/倍率