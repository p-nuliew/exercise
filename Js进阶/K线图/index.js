// javascript
const canvas = document.getElementById('canvas');
// canvas.style.background = 'pink'

// 最高价、最低价、开盘价、收盘价
// 开盘价、收盘价处于最高价和最低价之间
const data = [
  { heightPrice: 100, lowPrice: 40, openingPrice: 80, closingPice: 100 },
  { heightPrice: 100, lowPrice: 30, openingPrice: 80, closingPice: 70 },
  { heightPrice: 131, lowPrice: 100, openingPrice: 110, closingPice: 120 },
  { heightPrice: 95, lowPrice: 15, openingPrice: 51, closingPice: 93 },
  { heightPrice: 122, lowPrice: 20, openingPrice: 87, closingPice: 79 },
  { heightPrice: 122, lowPrice: 63, openingPrice: 87, closingPice: 99 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
  { heightPrice: 114, lowPrice: 40, openingPrice: 90, closingPice: 98 },
  { heightPrice: 94, lowPrice: 30, openingPrice: 51, closingPice: 83 },
  { heightPrice: 122, lowPrice: 53, openingPrice: 87, closingPice: 99 },
]

if (canvas.getContext) {
  ctx = canvas.getContext('2d');

  // 已知条件
  // 最高价最大的值
  const maxHeightPrice = Math.max(...data.map(x => x.heightPrice))
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
  // 价格与y轴高度的比率
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
  // y轴价格纵坐标是否要伸缩
  const isNeedFlex = priceAndHeightRate > 2
  // y轴价格纵坐标伸缩比率
  const flexRate = isNeedFlex ? priceAndHeightRate * 0.5 : priceAndHeightRate
  // 价格纵坐标
  const priceY = price => originY - price / priceAndHeightRate
  // 曲线类型
  const curveType = 'lowPrice'
  // 数据纵坐标
  const dataYAxisPoint = data.map(it => {
    const newIt = {}
    for (key in it) {
      newIt[key] =  priceY(it[key])
    }
    return newIt
  })

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

      let text = (yAxisTickSpace * i * priceAndHeightRate).toFixed(2)
      if (isNeedFlex) {
        text = (yAxisTickSpace * i * priceAndHeightRate / flexRate).toFixed(2)
      }
      renderText(text, sx - 10, sy, 'right')
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


  // 绘制一串蜡烛
  for (let i = 0; i < xAxisTickCount; i++) {
    const { heightPrice, lowPrice, openingPrice, closingPice } = dataYAxisPoint[i]
    // 刻度横坐标
    const xAxisTickX = xAxisTickStartX(i)
    // 蜡烛一半宽度
    const halfCandleW = candleW / 2
    // 蜡烛颜色
    let color = ''
    let candleTopPointY = ''
    let candleBottomPointY = ''

    // 红涨绿跌
    if (closingPice < openingPrice) {
      // 涨
      color = 'red'
      candleTopPointY = closingPice
      candleBottomPointY = openingPrice
    } else {
      color = 'green'
      candleTopPointY = openingPrice
      candleBottomPointY = closingPice
    }

    // 绘制蜡烛下影线
    ctx.beginPath()
    ctx.moveTo(xAxisTickX, lowPrice)
    ctx.lineTo(xAxisTickX, candleBottomPointY)
    ctx.closePath();
    ctx.stroke()

    // 绘制蜡烛中间部分（绘制矩形）
    ctx.beginPath()
    ctx.moveTo(xAxisTickX - halfCandleW, candleTopPointY)
    ctx.rect(xAxisTickX - halfCandleW, candleTopPointY, candleW, candleBottomPointY - candleTopPointY)
    ctx.fillStyle = color
    ctx.fill();

    // 绘制蜡烛上影线
    ctx.beginPath()
    ctx.moveTo(xAxisTickX, candleTopPointY)
    ctx.lineTo(xAxisTickX, heightPrice)
    ctx.closePath();
    ctx.stroke()
  }

  /**
   * 获取当前点以及前后控制点坐集合
   * @returns [array] 当前点以及前后控制点坐集合
   */
  const getControlPointInfo = () => {
    let controlPoint = []

    for (let i = 0; i < xAxisTickCount; i++) {
      const pricePointX = xAxisTickStartX(i)
      const pricePointY = dataYAxisPoint[i][curveType]
      let prevNode = {}
      let nextNode = {}

      // 边界处理：在首尾加入虚拟点，不全第一个元素没有前控制点，末尾元素没有后控制点的情况
      if (i === 0) {
        prevNode = { heightPrice: priceY(100), lowPrice: priceY(60), openingPrice: priceY(70), closingPice: priceY(99) }
        nextNode = dataYAxisPoint[i + 1]
      } else if (i === xAxisTickCount - 1) {
        prevNode = dataYAxisPoint[i - 1]
        nextNode = { heightPrice: priceY(101), lowPrice: priceY(20), openingPrice: priceY(72), closingPice: priceY(89) }
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
// 1. 处理边界问题：以补全的方式、虚拟的点，让边界问题变成常规问题
// 2. 数据整合：整合成我们需要的ui数据
// 3. 封装
// 原点不应该是0,0


// 以视图（折线）的方式验证结果（前后控制点）是否正确
// 最高价发生变动时，y轴刻度文字、蜡烛和曲线需要响应变化
//   刻度文字*倍率，（蜡烛和曲线）/倍率


// 面向对象
// 父类
class Person {
	constructor(sex, age) {
  	this.sex = sex
    this.age = age
  }
}

// 子类
class Student extends Person {
	constructor(studentNumber, sex, age) {
    super(sex, age)
  	this.studentNumber = studentNumber

    // 继承Person的属性
    // this.sex = sex
    // this.age = age
  }
}

student1 = new Student('330311221', '男', 15)
console.log('student1: ', student1);


// 封装理念整理：
// 1.先有场景，再封装，先有子类，再有父类
// 2. 封装颗粒度：取决于场景的偏向性
// 3。 封装偏向性：工具函数的独立性，结合场景分析


// 代码待完善：
// 1. 绘制一串蜡烛的函数
// 2. 传入一个参数，可以绘制不同的曲线
// 3. 起点价格的定位
// 4. 实现辅助线，并思考“变和不变”上的优化点
// 5. 实现拖拽功能，

// const data = []
// function renderFn (
//   data,
//   config = {
//     candleBgColor: ''
//   },
// ) {

// }
