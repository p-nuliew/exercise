// javascript
const canvas = document.getElementById('canvas');
canvas.style.background = 'pink'

// 最高价、最低价、开盘价、收盘价
const data = [
  { heightPrice: 1000, lowPrice: 500, openingPrice: 800, closingPice: 900 },
  { heightPrice: 1000, lowPrice: 625, openingPrice: 800, closingPice: 700 },
  { heightPrice: 1000, lowPrice: 750, openingPrice: 800, closingPice: 900 },
  { heightPrice: 905, lowPrice: 625, openingPrice: 701, closingPice: 903 },
  { heightPrice: 1000, lowPrice: 550, openingPrice: 807, closingPice: 709 },
  { heightPrice: 1000, lowPrice: 800, openingPrice: 807, closingPice: 909 },
  { heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
  { heightPrice: 1000, lowPrice: 600, openingPrice: 900, closingPice: 908 },
  { heightPrice: 904, lowPrice: 600, openingPrice: 701, closingPice: 803 },
  { heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
]

if (canvas.getContext) {
  ctx = canvas.getContext('2d');
  renderKLineChart(data, {
    yAxisSplitNumber: 6,
  })
}


/**
 * 绘制k线图
 * @param {array} data 数据源
 * @param {config} config k线图配置项
 */
function renderKLineChart (
  data,
  {
    // y轴分段数量
    yAxisSplitNumber = 4,
    // 坐标轴与容器间的边距
    padding = 60,
    // 三角形高度
    triangleH = 10,
    // 刻度线宽度
    tickWidth = 5,
    // x轴刻度间距
    xAxisTickSpace = 40,
    // 蜡烛宽度
    candleW = 10,
    // 曲线类型
    curveType = 'lowPrice'
  }
) {

  // 已知条件
  // 容器宽度
  const width = ctx.canvas.width
  // 容器高度
  const height = ctx.canvas.height
  // x轴刻度数量
  const xAxisTickCount = data.length

  // 可知条件
  // 原点横坐标
  const originX = padding
  // 原点纵坐标
  const originY = height - padding
  // y轴顶点横坐标
  const yAxisVertexX = padding
  // y轴顶点纵坐标
  const yAxisVertexY = padding
  // x轴顶点横坐标
  const xAxisVertexX = width - padding
  // x轴顶点纵坐标
  const xAxisVertexY = height - padding
  // y轴高度
  const yAxisHeight = height - padding * 2
  // y轴刻度间距
  const yAxisTickSpace = yAxisHeight / yAxisSplitNumber
  // 最高价最大的值
  const maxPrice = Math.max(...data.map(x => x.heightPrice))

  // 价格与y轴高度的比率
  const yAxisPriceRate = maxPrice / yAxisHeight
  // 纵坐标集合
  const dataYAxisPoint = data.map(it => {
    const newIt = {}
    for (key in it) {
      newIt[key] =  tranPriceToOrdinate(it[key])
    }
    return newIt
  })

  // TODO Y轴刻度和纵坐标优化
  // const minPrice = Math.min(...data.map(x => x.lowPrice))
  // const splitBase = (maxPrice - minPrice) / yAxisSplitNumber
  // const yAxisTickText = i => (minPrice + splitBase * i).toFixed(2)
  // 不知道哪里计算错误
  // const tranPriceToOrdinate = price => originY - price / yAxisPriceRate + (price - minPrice) / yAxisPriceRate


  // 绘制Y轴
  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(yAxisVertexX, yAxisVertexY)
  ctx.closePath();
  ctx.stroke()

  // 绘制x轴
  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(xAxisVertexX, xAxisVertexY)
  ctx.closePath();
  ctx.stroke()

  // 绘制y轴三角形
  ctx.beginPath()
  ctx.moveTo(yAxisVertexX, yAxisVertexY)
  ctx.lineTo(yAxisVertexX - triangleH/2, yAxisVertexY + triangleH)
  ctx.lineTo(yAxisVertexX + triangleH/2, yAxisVertexY + triangleH)
  ctx.fill()

  // 绘制x轴三角形
  ctx.beginPath()
  ctx.moveTo(xAxisVertexX, xAxisVertexY)
  ctx.lineTo(xAxisVertexX - triangleH, xAxisVertexY - triangleH/2)
  ctx.lineTo(xAxisVertexX - triangleH, xAxisVertexY + triangleH/2)
  ctx.fill()

  // 绘制y轴刻度
  for (let i = 0; i < yAxisSplitNumber; i++) {
    let sx = originX
        sy = originY - yAxisTickSpace * i
        ex = originX + tickWidth
        ey = originY - yAxisTickSpace * i

    renderText(yAxisTickText(i), sx - 10, sy, 'right')
    renderLine(sx, sy, ex, ey)
  }

  // 绘制x轴刻度
  for (let i = 0; i < xAxisTickCount; i++) {
    const xAxisTickX = xAxisTickPointX(i)
    renderText(i, xAxisTickX, originY + tickWidth + 10, 'center')
    renderLine(xAxisTickX, originY, xAxisTickX, originY + tickWidth)
  }

  // 绘制一串蜡烛
  renderCandles(dataYAxisPoint, candleW)

  // 绘制贝塞尔曲线
  renderBezierCurve(getControlPointInfo(curveType))


  // x轴刻度横坐标
  function xAxisTickPointX (i) {
    return originX + i * xAxisTickSpace
  }

  // 实际价格转为纵坐标
  function tranPriceToOrdinate (price) {
    return originY - price / yAxisPriceRate
  }

  // Y轴刻度文字
  function yAxisTickText (i) {
    return (yAxisTickSpace * i * yAxisPriceRate).toFixed(2)
  }

  /**
   * 绘制一串蜡烛
   * @param {array} dataYAxisPoint 数据源
   * @param {number} candleW 蜡烛宽度
   */
  function renderCandles (dataYAxisPoint, candleW) {
    const halfCandleW = candleW / 2

    for (let i = 0, candleLength = dataYAxisPoint.length; i < candleLength; i++) {
      const { heightPrice, lowPrice, openingPrice, closingPice } = dataYAxisPoint[i]
      let
        abscissa = xAxisTickPointX(i),
        topPointY = heightPrice,
        bottomPointY = lowPrice,
        secondPointY,
        thirdPointY,
        candleColor

      if (closingPice < openingPrice) {
        // 涨
        candleColor = 'red'
        secondPointY = closingPice
        thirdPointY = openingPrice
      } else {
        candleColor = 'green'
        secondPointY = openingPrice
        thirdPointY = closingPice
      }

      // 绘制蜡烛上影线
      ctx.beginPath()
      ctx.moveTo(abscissa, topPointY)
      ctx.lineTo(abscissa, secondPointY)
      ctx.closePath();
      ctx.stroke()

      // 绘制蜡烛下影线
      ctx.beginPath()
      ctx.moveTo(abscissa, bottomPointY)
      ctx.lineTo(abscissa, thirdPointY)
      ctx.closePath();
      ctx.stroke()

      // 绘制蜡烛实体（绘制矩形）
      ctx.beginPath()
      ctx.moveTo(abscissa - halfCandleW, secondPointY)
      ctx.rect(abscissa - halfCandleW, secondPointY, candleW, thirdPointY - secondPointY)
      ctx.fillStyle = candleColor
      ctx.fill();

      // TODO 因为没有绘制单个蜡烛的场景，所以没必要封装（偏应用），以一串蜡烛为颗粒这样使用更为方便
      // 如果我们做的是类似图表库项目，就可以考虑封装为一个工具函数，在多个地方使用，提高复用率
      // renderCandle(abscissa, topPointY, bottomPointY, secondPointY, thirdPointY, candleW, candleColor)
    }
  }

   /**
   * 获取当前点以及前后控制点坐集合
   * @param {string} curveType 曲线类型 { heightPrice, lowPrice, openingPrice, closingPice }
   * @returns [array] 当前点以及前后控制点坐集合
   */
  function getControlPointInfo (curveType) {
    let controlPoint = []

    for (let i = 0; i < xAxisTickCount; i++) {
      const pricePointX = xAxisTickPointX(i)
      const pricePointY = dataYAxisPoint[i][curveType]
      let prevNode = {}
      let nextNode = {}

      // 边界处理：在首尾加入虚拟点，不全第一个元素没有前控制点，末尾元素没有后控制点的情况
      if (i === 0) {
        prevNode = { heightPrice: tranPriceToOrdinate(100), lowPrice: tranPriceToOrdinate(60), openingPrice: tranPriceToOrdinate(70), closingPice: tranPriceToOrdinate(99) }
        nextNode = dataYAxisPoint[i + 1]
      } else if (i === xAxisTickCount - 1) {
        prevNode = dataYAxisPoint[i - 1]
        nextNode = { heightPrice: tranPriceToOrdinate(101), lowPrice: tranPriceToOrdinate(20), openingPrice: tranPriceToOrdinate(72), closingPice: tranPriceToOrdinate(89) }
      } else {
        prevNode = dataYAxisPoint[i - 1]
        nextNode = dataYAxisPoint[i + 1]
      }

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

      // 前一个控制点纵坐标
      let prevControlY = undefined
      // 后一个控制点纵坐标
      let nextControlY = undefined

      // 相对于canvas的坐标，如果前个控制点纵坐标小于下个控制点的纵坐标（相当于视觉上的左高右低）
      if (prevNode[curveType] < nextNode[curveType]) {
        // 左高右低
        prevControlY = pricePointY - controlPointHeight / 2
        nextControlY = pricePointY + controlPointHeight / 2
      } else {
        prevControlY = pricePointY + controlPointHeight / 2
        nextControlY = pricePointY - controlPointHeight / 2
      }

      controlPoint.push({
        curX: pricePointX,
        curY: pricePointY,
        prevControlX: pricePointX - controlPointBottomLine / 2,
        prevControlY,
        nextControlX: pricePointX + controlPointBottomLine / 2,
        nextControlY
       })
    }

    return controlPoint
  }

   /**
   * 绘制贝塞尔曲线
   * @param {array} controlPoint 控制点集合:  [{ curX: lowPricePointX, curY: lowPricePointY, prevControlX, prevControlY, nextControlX, nextControlY } ...]
   */
  function renderBezierCurve (controlPoint) {
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
        ctx.bezierCurveTo(prevNode.nextControlX, prevNode.nextControlY, prevControlX, prevControlY, curX, curY);
      } else if ( i === 0) {
        ctx.moveTo(curX, curY);
      }
    }
    ctx.stroke();
  }

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
}

// TODO 怎样定义内部
// 如果一个函数或者组件内部的某段逻辑出现了好几次，我们可以将它封装成函数，执行函数时不需要通过参数传入，可以利用闭包的特性在封装函数内部直接访问外部变量。