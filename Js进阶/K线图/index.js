// javascript
const canvas = document.getElementById('canvas');
// canvas.style.background = 'pink'

// 最高价、最低价、开盘价、收盘价
// 开盘价、收盘价处于最高价和最低价之间
const data = [
  { heightPrice: 110, lowPrice: 40, openingPrice: 80, closingPice: 100 },
  { heightPrice: 130, lowPrice: 30, openingPrice: 80, closingPice: 70 },
  { heightPrice: 114, lowPrice: 80, openingPrice: 90, closingPice: 98 },
  { heightPrice: 94, lowPrice: 15, openingPrice: 51, closingPice: 93 },
  { heightPrice: 122, lowPrice: 20, openingPrice: 87, closingPice: 79 },
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
  // x轴刻度数量
  const xAxisTickCount = data.length
  // y轴刻度数量
  const yAxisTickCount = 8
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
  console.log('原点', x0, y0);

  // y轴顶点坐标（x1, y1）
  const x1 = space
  const y1 = space

  // x轴顶点坐标
  const x2 = width - space
  const y2 = height - space

  // 1.2 绘制Y轴
  function renderYAxis (x0, y0, x1, y1) {
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.closePath();
    ctx.stroke()
  }
  renderYAxis(x0, y0, x1, y1)

  // 1.3 绘制x轴
  function renderXAxis (x0, y0, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x2, y2)
    ctx.closePath();
    ctx.stroke()
  }
  renderXAxis(x0, y0, x2, y2)

  /**
   * 绘制y轴三角形
   * @param {number} x1 y轴顶点横坐标
   * @param {number}} y1 y轴顶点纵坐标
   * @param {number}} triangleH 三角形高度
   */
  function renderYAxisTriangle (x1, y1, triangleH) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 - triangleH/2, y1 + triangleH)
    ctx.lineTo(x1 + triangleH/2, y1 + triangleH)
    ctx.fill()
  }
  renderYAxisTriangle(x1, y1, triangleH)

  /**
   * 绘制x轴三角形。三角形顶点(x2, y2), 左下点(x2 - triangleH, y2 - triangleH/2), 右下点(x2 - triangleH, y2 + triangleH/2)
   * @param {number} x2 x轴顶点横坐标
   * @param {number}} y2 x轴顶点纵坐标
   * @param {number}} triangleH 三角形高度
   */
  function renderXAxisTriangle (x2, y2, triangleH) {
    ctx.beginPath()
    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - triangleH, y2 - triangleH/2)
    ctx.lineTo(x2 - triangleH, y2 + triangleH/2)
    ctx.fill()
  }
  renderXAxisTriangle(x2, y2, triangleH)

  /**
   * 绘制刻度线
   * @param {sx} sx 开始坐标点横坐标
   * @param {sy} sy 开始坐标点纵坐标
   * @param {ex} ex 结束坐标点横坐标
   * @param {ey} ey 结束坐标点纵坐标
   */
  function renderAxisTick (sx, sy, ex, ey) {
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
  function renderAxisText (text, x, y, textAlign) {
    ctx.fillStyle = "#FF0000";  // 文字颜色
    ctx.textBaseline = "middle";
    ctx.textAlign = textAlign;

    ctx.font = "10px Arial";  // 高为10px的字体
    ctx.fillText(text, x, y)  // 描绘实体文字
  }

  /**
   * 绘制y轴刻度
   * @param {number} yAxisTickSpace y轴刻度间距
   * @param {number} tickWidth 刻度宽度
   * @param {number} yAxisTickCount y轴刻度数量
   * @param {number} x0 原点横坐标
   * @param {number} y0 原点纵坐标
   */
  function renderYAxisTick (yAxisTickSpace, tickWidth, yAxisTickCount, x0, y0) {
    for (let i = 0; i < yAxisTickCount; i++) {
      let sx, sy, ex, ey
      sx = x0
      sy = y0 - yAxisTickSpace * i
      ex = x0 + tickWidth
      ey = y0 - yAxisTickSpace * i

      renderAxisText(yAxisTickSpace * i, sx - 5, sy, 'right')  // y轴刻度文字
      renderAxisTick(sx, sy, ex, ey)
    }
  }
  renderYAxisTick(yAxisTickSpace, tickWidth, yAxisTickCount, x0, y0)

  /**
   * 绘制x轴刻度
   * @param {number} xAxisTickSpace x轴刻度间距
   * @param {number} tickWidth 刻度宽度
   * @param {number} xAxisTickCount x轴刻度数量
   * @param {number} x0 原点横坐标
   * @param {number} y0 原点纵坐标
   */
  function renderXAxisTick (xAxisTickSpace, tickWidth, xAxisTickCount, x0, y0) {
    for (let i = 0; i < xAxisTickCount; i++) {
      // sx, sy, ex, ey 分别表示刻度的开始横坐标，开始纵坐标，结束横坐标，结束纵坐标
      let sx, sy, ex, ey
      sx = x0 + i * xAxisTickSpace
      sy = y0
      ex = x0 + i * xAxisTickSpace
      ey = y0 + tickWidth

      renderAxisText(i, ex, ey + 10, 'center')  // x轴刻度文字
      renderAxisTick(sx, sy, ex, ey)
    }
  }
  renderXAxisTick(xAxisTickSpace, tickWidth, xAxisTickCount, x0, y0)


  // 绘制所有蜡烛
  for (let i = 0; i < xAxisTickCount; i++) {
    // 暂时跳过第一个
    // if (i === 0) continue

    const { heightPrice, lowPrice, openingPrice, closingPice } = data[i]

    // 刻度横坐标
    const sx = x0 + i * xAxisTickSpace

    // 最低价坐标点
    const lowPricePointX = sx
    const lowPricePointY = y0 - lowPrice

    // 开盘价坐标点
    const openingPricePointX = sx
    const openingPricePointY = y0 - openingPrice

    // 收盘价坐标点
    const closingPicePointX = sx
    const closingPicePointY = y0 - closingPice

    // 最高价坐标点
    const heightPricePointX = sx
    const heightPricePointY = y0 - heightPrice

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
  const getControlPointInfo = (data, x0, y0, xAxisTickSpace) => {
    let controlPoint = []

    for (let i = 0; i < data.length; i++) {
      const { lowPrice } = data[i]
      let prevNode = {}
      let nextNode = {}

      // 边界处理：在首尾加入虚拟点，不全第一个元素没有前控制点，末尾元素没有后控制点的情况
      if (i === 0) {
        prevNode = { heightPrice: 100, lowPrice: 60, openingPrice: 70, closingPice: 99 }
        nextNode = data[i + 1]
      } else if (i === data.length - 1) {
        prevNode = data[i - 1]
        nextNode = { heightPrice: 101, lowPrice: 20, openingPrice: 72, closingPice: 89 }
      } else {
        prevNode = data[i - 1]
        nextNode = data[i + 1]
      }

      // sx, sy 分别表示刻度的开始横坐标，开始纵坐标
      let sx, sy
      sx = x0 + i * xAxisTickSpace
      sy = y0

      // 最低价坐标点
      const lowPricePointX = sx
      const lowPricePointY = sy - lowPrice

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
  renderBezierCurve(getControlPointInfo(data, x0, y0, xAxisTickSpace))
}

// 1. 处理边界问题
// 2. 数据整合成我们需要的ui数据
// 3. 封装

// 以视图（折线）的方式验证结果（前后控制点）是否正确