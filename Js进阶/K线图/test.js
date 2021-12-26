
/**
 * 绘制蜡烛
 * @param {number} abscissa 蜡烛横坐标
 * @param {number} topPointY 最高点纵坐标
 * @param {number} bottomPointY 最低点纵坐标
 * @param {number} secondPointY 第二个点纵坐标
 * @param {number} thirdPointY 第三个点纵坐标
 * @param {number} candleW 蜡烛宽度
 * @param {string} candleColor 蜡烛颜色
 */
 function renderCandle (abscissa, topPointY, bottomPointY, secondPointY, thirdPointY, candleW, candleColor) {
  const halfCandleW = candleW / 2

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

  // 绘制蜡烛中间部分（绘制矩形）
  ctx.beginPath()
  ctx.moveTo(abscissa - halfCandleW, secondPointY)
  ctx.rect(abscissa - halfCandleW, secondPointY, candleW, secondPointY - thirdPointY)
  ctx.fillStyle = candleColor
  ctx.fill();
}

renderCandle(50, 88, 50, 44, 33, 20, 'red')