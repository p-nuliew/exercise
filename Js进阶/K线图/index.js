// javascript
const canvas = document.getElementById('canvas');
canvas.style.background = '#e8e8e8'

const leftData = [
  { date: '08-21', heightPrice: 1200, lowPrice: 580, openingPrice: 860, closingPice: 980 },
  { date: '08-22', heightPrice: 1500, lowPrice: 625, openingPrice: 800, closingPice: 700 },
  { date: '08-23', heightPrice: 1000, lowPrice: 750, openingPrice: 800, closingPice: 900 },
  { date: '08-24', heightPrice: 905, lowPrice: 625, openingPrice: 701, closingPice: 903 },
  { date: '08-25', heightPrice: 1000, lowPrice: 550, openingPrice: 807, closingPice: 789 },
  { date: '08-26', heightPrice: 1000, lowPrice: 300, openingPrice: 607, closingPice: 989 },
  { date: '08-27', heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
  { date: '08-28', heightPrice: 1000, lowPrice: 400, openingPrice: 900, closingPice: 908 },
  { date: '08-29', heightPrice: 904, lowPrice: 680, openingPrice: 701, closingPice: 883 },
  { date: '08-30', heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
]
const rightData = [
  { date: '09-11', heightPrice: 1000, lowPrice: 500, openingPrice: 800, closingPice: 900 },
  { date: '09-12', heightPrice: 990, lowPrice: 625, openingPrice: 800, closingPice: 700 },
  { date: '09-13', heightPrice: 1000, lowPrice: 750, openingPrice: 800, closingPice: 900 },
  { date: '09-14', heightPrice: 905, lowPrice: 625, openingPrice: 701, closingPice: 903 },
  { date: '09-15', heightPrice: 1000, lowPrice: 550, openingPrice: 807, closingPice: 709 },
  { date: '09-16', heightPrice: 1000, lowPrice: 800, openingPrice: 807, closingPice: 909 },
  { date: '09-17', heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
  { date: '09-18', heightPrice: 1000, lowPrice: 600, openingPrice: 900, closingPice: 908 },
  { date: '09-19', heightPrice: 904, lowPrice: 600, openingPrice: 701, closingPice: 803 },
  { date: '09-20', heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
]

// 最高价、最低价、开盘价、收盘价
const data = [
  { date: '09-01', heightPrice: 1000, lowPrice: 510, openingPrice: 800, closingPice: 900 },
  { date: '09-02', heightPrice: 1000, lowPrice: 510, openingPrice: 800, closingPice: 700 },
  { date: '09-03', heightPrice: 1000, lowPrice: 400, openingPrice: 800, closingPice: 900 },
  { date: '09-04', heightPrice: 905, lowPrice: 625, openingPrice: 701, closingPice: 903 },
  { date: '09-05', heightPrice: 1000, lowPrice: 550, openingPrice: 807, closingPice: 709 },
  { date: '09-06', heightPrice: 1000, lowPrice: 800, openingPrice: 807, closingPice: 909 },
  { date: '09-07', heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
  { date: '09-08', heightPrice: 1000, lowPrice: 600, openingPrice: 900, closingPice: 908 },
  { date: '09-09', heightPrice: 904, lowPrice: 600, openingPrice: 701, closingPice: 803 },
  { date: '09-10', heightPrice: 1000, lowPrice: 600, openingPrice: 807, closingPice: 909 },
]

if (canvas.getContext) {
  ctx = canvas.getContext('2d');
  let init = true
  const config = {
    yAxisSplitNumber: 6,
    showTips: true,
    canDrag: true,
  }
  renderKLineChart(data, config, init)
}

/**
 * 绘制k线图
 * @param {array} data 数据源
 * @param {object} config k线图配置项
 */
function renderKLineChart (
  data = [],
  {
    // y轴分段数量
    yAxisSplitNumber = 4,
    // 坐标轴与容器间的边距
    padding = {
      left: 50,
      right: 50,
      top: 30,
      bottom: 30
    },
    // 三角形高度
    triangleH = 10,
    // 刻度线宽度
    tickWidth = 5,
    // 蜡烛宽度
    candleW = 10,
    // 曲线类型
    curveType = 'lowPrice',
    // 是否绘制辅助线
    showTips = false,
    // 是否可以拖拽
    canDrag = false
  },
  init = false
) {
  console.log('开始绘制k线图:', data);

  // 已知条件
  // 容器宽度
  const width = ctx.canvas.width
  // 容器高度
  const height = ctx.canvas.height
  // x轴元素数量
  const xAxisItemLength = data.length
  const config = arguments[1]

  // 可知条件
  // y轴横坐标
  const yAxisPointX = padding.left
  // y轴原点纵坐标
  const yAxisOriginPointY = height - padding.bottom
  // y轴顶点纵坐标
  const yAxisVertexY = padding.top
  // y轴高度
  const yAxisHeight = height - (padding.top + padding.bottom)
  // y轴刻度间距
  const yAxisTickSpace = yAxisHeight / (yAxisSplitNumber - 1)
  // x轴顶点横坐标
  const xAxisVertexX = width - yAxisPointX
  // x轴宽度
  const xAxisWidth = width - yAxisPointX - padding.right
  // x轴元素间距
  const xAxisItemSpace = xAxisWidth/ xAxisItemLength
  // 最高价
  const maxPrice = Math.max(...data.map(x => x.heightPrice))
  // 最低价（在最低价的基础上 - 50）
  const minPrice = Math.min(...data.map(x => x.lowPrice)) - 50
  // 坐标系内容高度占坐标系高度的比例
  const contentRate = 0.9 || 1

  // 纵坐标集合
  const dataYAxisPoint = data.map(it => {
    const newIt = {}
    for (key in it) {
      if (key === 'date') continue
      newIt[key] =  tranPriceToOrdinate(it[key])
    }
    return newIt
  })

  const seriesData = data.map(it => it.date)

  // 绘制Y轴
  ctx.beginPath()
  ctx.moveTo(yAxisPointX, yAxisOriginPointY)
  ctx.lineTo(yAxisPointX, yAxisVertexY)
  ctx.closePath();
  ctx.stroke()

  // 绘制x轴
  ctx.beginPath()
  ctx.moveTo(yAxisPointX, yAxisOriginPointY)
  ctx.lineTo(xAxisVertexX, yAxisOriginPointY)
  ctx.closePath();
  ctx.stroke()

  // 绘制y轴三角形
  ctx.beginPath()
  ctx.moveTo(yAxisPointX, yAxisVertexY)
  ctx.lineTo(yAxisPointX - triangleH/2, yAxisVertexY + triangleH)
  ctx.lineTo(yAxisPointX + triangleH/2, yAxisVertexY + triangleH)
  ctx.fill()

  // 绘制x轴三角形
  ctx.beginPath()
  ctx.moveTo(xAxisVertexX, yAxisOriginPointY)
  ctx.lineTo(xAxisVertexX - triangleH, yAxisOriginPointY - triangleH/2)
  ctx.lineTo(xAxisVertexX - triangleH, yAxisOriginPointY + triangleH/2)
  ctx.fill()

  // 绘制y轴文字与刻度
  for (let i = 0; i < yAxisSplitNumber; i++) {
    let sx = yAxisPointX
        ex = yAxisPointX + tickWidth
        y = yAxisOriginPointY - yAxisTickSpace * i * contentRate

    renderText(ctx, sx - 10, y, yAxisTickText(i), 'right', '#FF0000')
    renderLine(sx, y, ex, y)
  }

  // 绘制x轴刻度
  for (let i = 0; i < xAxisItemLength; i++) {
    const xAxisTickX = xAxisTickPointX(i)
    renderText(ctx, xAxisTickX, yAxisOriginPointY + tickWidth + 10, seriesData[i], 'center', '#FF0000')
    renderLine(xAxisTickX, yAxisOriginPointY, xAxisTickX, yAxisOriginPointY + tickWidth)
  }

  // 绘制一串蜡烛
  renderCandles(dataYAxisPoint, candleW)

  // 绘制贝塞尔曲线
  renderBezierCurve(getControlPointInfo(curveType))
  console.log('绘制完成');

  if (init) {
    showTips && renderTipCanvas()
    canDrag && getDrag()
  }

  // 初始化完毕
  init = false

  // x轴刻度横坐标
  function xAxisTickPointX (i) {
    return yAxisPointX + i * xAxisItemSpace
  }

  // 实际价格转为canvas纵坐标
  function tranPriceToOrdinate (price) {
    // 每块钱占自定义坐标系的高度
    const rate = yAxisHeight / (maxPrice - minPrice) * contentRate
    // 当前价格占自定义坐标系的高度
    const h = rate *  (price - minPrice)

    return yAxisOriginPointY - h
  }

  // Y轴刻度文字
  function yAxisTickText (i) {
      // 每个像素占多少钱
    const x = (maxPrice - minPrice) / yAxisHeight
    return (minPrice + yAxisTickSpace * i * x).toFixed(2)
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
    }
  }

   /**
   * 获取当前点以及前后控制点坐集合
   * @param {string} curveType 曲线类型 { heightPrice, lowPrice, openingPrice, closingPice }
   * @returns [array] 当前点以及前后控制点坐集合
   */
  function getControlPointInfo (curveType = curveType) {
    let controlPoint = []

    for (let i = 0; i < xAxisItemLength; i++) {
      const pricePointX = xAxisTickPointX(i)
      const pricePointY = dataYAxisPoint[i][curveType]
      let prevNode = {}
      let nextNode = {}

      // 边界处理：在首尾加入虚拟点，不全第一个元素没有前控制点，末尾元素没有后控制点的情况
      if (i === 0) {
        prevNode = { heightPrice: tranPriceToOrdinate(1000), lowPrice: tranPriceToOrdinate(600), openingPrice: tranPriceToOrdinate(780), closingPice: tranPriceToOrdinate(899) }
        nextNode = dataYAxisPoint[i + 1]
      } else if (i === xAxisItemLength - 1) {
        prevNode = dataYAxisPoint[i - 1]
        nextNode = { heightPrice: tranPriceToOrdinate(1021), lowPrice: tranPriceToOrdinate(720), openingPrice: tranPriceToOrdinate(782), closingPice: tranPriceToOrdinate(889) }
      } else {
        prevNode = dataYAxisPoint[i - 1]
        nextNode = dataYAxisPoint[i + 1]
      }

      // 前后点构成的三角形
      // b: 三角形的高
      const triangleHeight = Math.abs(nextNode[curveType] - prevNode[curveType])
      // a: 三角形底边
      const triangleBottomLine = xAxisItemSpace * 2
      // c: 三角形斜边 = (高的平方+底边的平方)的平方根
      const triangleHypotenuse = Math.sqrt(Math.pow(triangleHeight, 2) +  Math.pow(triangleBottomLine, 2))

      // 前后控制点为斜边的三角形
      // C: 控制点三角形斜边长度(自定义)
      const controlPointW = xAxisItemSpace * 0.5
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
   * @param {object} context canvas上下文
   * @param {number} x 横坐标
   * @param {number} y 纵坐标
   * @param {string} text 文本
   * @param {string} align 文本对齐方式
   * @param {string} color 文本颜色
   */
  // TODO 把参数放在对象下传入是不是更方便？
  // 5个以上的参数，用对象比较方便，但是要给key值
  function renderText (context = ctx, x, y, text, align = 'left', color = '#FFF') {
    // context.fillStyle = "#FF0000";  // 文字颜色
    context.fillStyle = color;  // 文字颜色
    context.textBaseline = "middle";
    context.textAlign = align;

    context.font = "10px Arial";  // 高为10px的字体
    context.fillText(text, x, y)  // 描绘实体文字
  }

  /**
   * 绘制辅助线画布
   */
  function renderTipCanvas () {
    console.log('绘制辅助线画布');
    const tipCanvas = document.getElementById('tipCanvas');
    if (!tipCanvas.getContext) return
    const ctxTip = tipCanvas.getContext('2d');

    // 容器宽度
    const width = ctxTip.canvas.width
    // 容器高度
    const height = ctxTip.canvas.height
    // 提示框元素
    let tipInfoEl = null
    // 提示框元素宽度
    let tipInfoElWidth = 100
    // 提示框内的日期元素
    let tipDateEl = null
    // 提示框内的最高价元素
    let heightPriceEl = null
    // 提示框内的最低价元素
    let lowPriceEl = null
    // x轴y轴上的提示框宽、高
    const xyAxisTipBoxWidth = padding.left
    const xyAxisTipBoxHeight = 20

    // 鼠标按下时，显示拖拽元素
    tipCanvas.addEventListener('mousedown', function (e) {
      if (canDrag) {
        //创建拖拽元素
        const kWrapNode = document.getElementById('kWrap')
        const draggableNode = document.getElementById('draggable')
        console.log('draggableNode: ', draggableNode);

        // 如果拖拽元素存在，则显示（避免重复创建）
        if (draggableNode) {
          draggableNode.style.display = 'block'
          return
        }

        const div = document.createElement('div')

        div.style.position = 'absolute'
        div.style.zIndex = '10'
        div.style.left = `${padding.left}px`
        div.style.top = `${padding.top}px`
        div.style.width = `${width - padding.left - padding.right}px`
        div.style.height = `${height - padding.top - padding.bottom}px`
        // div.style.background = 'yellow'

        div.setAttribute('id', 'draggable')
        div.setAttribute('draggable', 'true')

        kWrapNode.appendChild(div)
      }
    }, false)

    // 监听鼠标进入事件
    tipCanvas.addEventListener('mouseenter', function (e) {
      // 保存提示详情框的引用
      tipInfoEl = document.getElementById('tipInfo')
    }, false)

    // 监听鼠标移动事件并绘制辅助线
    tipCanvas.addEventListener('mousemove', function (e) {
      // 鼠标距目标节点左上角的X坐标、Y坐标
      const { offsetX, offsetY } = e
      // 清除画布
      ctxTip.clearRect(0, 0, width, height)

      // 不在内容区域则隐藏提示详情框并释放dom元素的绑定
      if (!isContentArea(e)) {
        tipInfoEl.style.display = 'none'
        tipDateEl = null
        heightPriceEl = null
        lowPriceEl = null
        return
      }

      // 绘制水平辅助线
      ctxTip.beginPath();
      ctxTip.setLineDash([4, 4]);
      ctxTip.moveTo(yAxisPointX, offsetY);
      ctxTip.lineTo(width - padding.right - xAxisWidth / xAxisItemLength, offsetY);
      ctxTip.stroke();

      // 绘制垂直辅助线
      ctxTip.beginPath();
      ctxTip.setLineDash([4, 4]);
      ctxTip.moveTo(offsetX, padding.top);
      ctxTip.lineTo(offsetX, yAxisOriginPointY);
      ctxTip.stroke();

      // 绘制y轴tip文字背景框
      ctxTip.beginPath();
      ctxTip.rect(0, offsetY - xyAxisTipBoxHeight / 2, xyAxisTipBoxWidth, xyAxisTipBoxHeight);
      ctxTip.fillStyle = '#999'
      ctxTip.fill();

      // 绘制y轴tip文字
      const yAxisValue = ((yAxisHeight + padding.top - offsetY) / yAxisHeight * maxPrice).toFixed(2)
      renderText(ctxTip, yAxisPointX - 30, offsetY, yAxisValue, 'left', '#fff')


      // 绘制x轴tip文字背景框
      ctxTip.beginPath();
      ctxTip.rect(offsetX - xyAxisTipBoxWidth / 2, yAxisOriginPointY, xyAxisTipBoxWidth, xyAxisTipBoxHeight);
      ctxTip.fillStyle = '#999'
      ctxTip.fill();

      // 绘制x轴tip文字
      const xTipIndex = Math.round((offsetX - yAxisPointX) / xAxisWidth* xAxisItemLength)
      renderText(ctxTip, offsetX, yAxisOriginPointY + xyAxisTipBoxHeight / 2, seriesData[xTipIndex] || '', 'center', '#fff')

      // 设置提示框元素的样式和内容
      const { date, heightPrice, lowPrice } = data[xTipIndex]
      // 如果有子元素，说明已经插入，避免重复获取元素
      if (tipDateEl) {
        tipDateEl.innerText = date
        heightPriceEl.innerText = `最高价：${heightPrice}`
        lowPriceEl.innerText = `最低价：${lowPrice}`
        // 如果光标在x轴后半部分，提示框定位到左侧，反之亦然
        if (xTipIndex > xAxisItemLength / 2) {
          tipInfoEl.style.left = padding.left + 'px'
        } else {
          tipInfoEl.style.width = tipInfoElWidth + 'px'
          tipInfoEl.style.left = padding.left + xAxisWidth - tipInfoElWidth + 'px'
        }
      } else {
        // 显示提示详情框
        // 这里会偶现一直被执行
        console.log('显示提示详情框');
        tipInfoEl.style.display = 'block'
        tipDateEl = document.getElementById('tipDate')
        heightPriceEl = document.getElementById('heightPrice')
        lowPriceEl = document.getElementById('lowPrice')
      }
    }, false)

    // k线图内容区域
    function isContentArea (e) {
      const { offsetX, offsetY } = e

      return  offsetX > yAxisPointX &&
              offsetX < width - padding.right - xAxisWidth / xAxisItemLength &&
              offsetY > padding.top &&
              offsetY < yAxisOriginPointY
    }

  }

  // 拖拽
  function getDrag () {
    console.log('getDrag: ');
    // 新数据
    let cloneData = [...data]
    let cloneLeftData = [...leftData]
    let cloneRightData = [...rightData]

    // 水平拖动距离
    let horizontalDragDistance = 0
    // 插入数据时的光标位置
    let insertPosition = 0
    // 光标的上一个位置
    let lastPosition = ''
    // 拖动方向 左 or 右
    let dragDirection = 'left'

    /* 拖动目标元素时触发drag事件 */
    document.addEventListener("dragstart", function( event ) {
      console.log('dragstart: ');
      // 清除提示画布并隐藏提示详情框
      const tipCanvas = document.getElementById('tipCanvas');
      const ctxTip = tipCanvas.getContext('2d');
      // 容器宽度
      const width = ctxTip.canvas.width
      // 容器高度
      const height = ctxTip.canvas.height
      // 清除提示画布
      ctxTip.clearRect(0, 0, width, height)

      insertPosition = event.offsetX
      lastPosition = event.offsetX

      tipInfoEl = document.getElementById('tipInfo')
      tipInfoEl.style.display = 'none'
    }, false);


    /* 拖动目标元素时触发drag事件 */
    document.addEventListener("drag", function( event ) {
      console.log('event: ', event);
      const { offsetX } = event

      // // 如果左侧数据全部显示完成，则不绘制
      if (cloneLeftData.length === 0) return

      // 计算水平往右的拖动距离
      horizontalDragDistance = Math.abs(offsetX - insertPosition)
      console.log('offsetX: ', offsetX);
      // console.log('插入数据时的光标位置: ', insertPosition);
      // console.log('12-------------拖动距离: ', horizontalDragDistance);

      // // 如果拖动距离大于x轴元素间距，则插入
      if ( horizontalDragDistance > xAxisItemSpace) {
        // 清除画布并输入新数据重新绘制
        ctx.clearRect(0, 0, width, height)

        // 根据上一刻的光标位置，判断鼠标拖动方向，更新展示数据
        if (lastPosition !== offsetX) {
          if (lastPosition < offsetX) {
            console.log('右');
            dragDirection = 'right'

            const node = cloneLeftData.pop()
            cloneData.unshift(node)
            cloneData.pop()
            cloneRightData.unshift(node)
          } else {
            dragDirection = 'left'

            const node = cloneRightData.shift()
            cloneData.push(node)
            cloneData.shift()
            cloneLeftData.push(node)
          }
        }

        // 拿新数据重新绘制
        renderKLineChart(cloneData, config)

        // 记录插入数据时的光标位置
        insertPosition = offsetX
      }

      lastPosition = offsetX
    }, false);

    // 拖动结束时，隐藏draggable，否则辅助线出不来
    document.addEventListener("dragend", function( event ) {
      // 水平拖动距离
      horizontalDragDistance = 0
      // 插入数据时的光标位置
      insertPosition = 0
      // 光标的上一个位置
      lastPosition = ''

      const draggable = document.getElementById('draggable')
      draggable.style.display = 'none'
    }, false);
  }
}
