// javascript
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
// if (canvas.getContext) {
//   ctx = canvas.getContext('2d');

//   ctx.fillStyle = 'green';
//   ctx.fillRect(0, 0, 20, 30);

//   ctx.fillStyle = 'rgba(0,0,0,.9)';
//   ctx.fillRect(40, 40, 50, 50);
// } else {
//   console.error('no support canvas');
// }


// 矩形
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(200, 50);
// ctx.lineTo(200, 200);
// ctx.lineTo(50, 200)
// ctx.lineTo(50, 50)
// ctx.closePath(); // 手动闭合
// ctx.stroke();    // 通过线条绘制图形
// ctx.fill();  // 填充，自动闭合


// ctx.fillRect(25, 25, 100, 100);
// ctx.clearRect(45, 45, 60, 60);
// ctx.strokeRect(50, 50, 50, 50);

// 三角形
ctx.beginPath();  // 列表清空重置，开始重新绘制图形
ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.closePath();  // 手动闭合
    ctx.stroke();
    // ctx.fill();    // 填充并自动闭合

// 笑脸
// arc（圆弧中心的x轴坐标， 圆弧中心的y轴坐标，半径，圆弧的起始点，圆弧的终点，【true：逆时针绘制，反之顺时针】）
// ctx.beginPath();
// ctx.arc(75, 75, 50, 10, Math.PI * 2, true)
// ctx.stroke();



// 蜡烛
// function renderCandle (props) {
//     const {
//         candleTopPointX,
//         candleTopPointY,
//         candleBottomPointX,
//         candleBottomPointY,
//         lowPricePointX,
//         lowPricePointY,
//         heightPricePointX,
//         heightPricePointY,
//         sx,
//         sy,
//         color,
//         candleW
//     } = props
//     // 绘制蜡烛下面部分
//     ctx.beginPath()
//     ctx.moveTo(lowPricePointX, lowPricePointY)
//     ctx.lineTo(candleBottomPointX, candleBottomPointY)
//     ctx.closePath();
//     ctx.stroke()

//     // 绘制蜡烛中间部分
//     // 上 右 下 左 坐标
//     ctx.beginPath()
//     ctx.moveTo(sx + candleW / 2, sy - candleTopPointY)
//     ctx.lineTo(sx + candleW / 2, sy - candleBottomPointY)
//     ctx.lineTo(sx - candleW / 2, sy - candleBottomPointY)
//     ctx.lineTo(sx - candleW / 2, sy - candleTopPointY)
//     ctx.fillStyle = color
//     ctx.fill();

//     // 绘制蜡烛上面部分
//     ctx.beginPath()
//     ctx.moveTo(candleTopPointX, candleTopPointY)
//     ctx.lineTo(heightPricePointX, heightPricePointY)
//     ctx.closePath();
//     ctx.stroke()
//     }