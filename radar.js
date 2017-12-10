var canvas = document.getElementsByClassName('radar')[0];
canvas.width = 500;
canvas.height = 500;

var ctx = canvas.getContext('2d');
ctx.save();
ctx.strokeStyle = '#888'; // 线条颜色

var lineArr = [];
var rAngle = Math.PI * 2 / 6; // 内角和: 六边形
console.log(rAngle)

var rCenter = 250; // 圆心
var curR = 100; // 半径
ctx.beginPath();

// 绘画正六边形
// http://upload-images.jianshu.io/upload_images/2064035-2829c491837aca91.png
// https://gw.alicdn.com/tfs/TB12V2PfiqAXuNjy1XdXXaYcVXa-1112-380.png
for(var i = 0; i < 6; i++) {
	lineArr[i] = {};
	lineArr[i].y = rCenter + curR * Math.cos(rAngle * i);
	lineArr[i].x = rCenter + curR * Math.sin(rAngle * i);
	ctx.lineTo(lineArr[i].x, lineArr[i].y);
}
ctx.closePath();
ctx.stroke();
ctx.restore();

// 绘画对角线
ctx.strokeStyle = '#ffcd00';
ctx.save();
ctx.beginPath();

for (var j = 0; j < 3; j++) {
	ctx.moveTo(lineArr[j].x, lineArr[j].y);
	ctx.lineTo(lineArr[j+3].x, lineArr[j+3].y);
	ctx.stroke();
}
ctx.closePath();
ctx.restore();

// 绘制数据区域
var letterData = {
    'S': 1,
    'A': 1.5,
    'B': 2,
    'C': 2.5,
    'D': 3
}
var rData = [
    ['生存', 'S'],
    ['经济', 'S'],
    ['输出', 'S'],
    ['KDA', 'B'],
    ['打野', 'B'],
    ['推进', 'S']
]
ctx.save();
ctx.beginPath();
for (var i = 0; i < 6; i++) {
        lineArr[i].yEnd = rCenter + curR * Math.cos(rAngle * i) / (letterData[rData[i][1]]);
        lineArr[i].xEnd = rCenter + curR * Math.sin(rAngle * i) / (letterData[rData[i][1]]);
        ctx.lineTo(lineArr[i].xEnd, lineArr[i].yEnd); 
        console.log(lineArr);
 }
ctx.closePath();
ctx.stroke();
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; 
ctx.fill();

ctx.lineWidth = 2;  //设置数据填充区域的线条颜色
ctx.strokeStyle = '#dd3f26';  //设置填充区域的颜色
var point = 3; //设置数据填充区域的小圆点大小
for (var i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(lineArr[i].xEnd, lineArr[i].yEnd, point, 0, Math.PI * 2); 
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.fill();
    console.log(lineArr);
}
ctx.restore();

// 绘制文本
// ctx.save();
// ctx.font = '16px Microsoft Yahei';  //设置字体
// ctx.fillStyle = '#000';  // 颜色
// for (var i = 0; i < 6; i++) {
//     var y = rCenter + curR * Math.cos(rAngle * i);
//     var x = rCenter + curR * Math.sin(rAngle * i);
//     ctx.fillText(rData[i][0], x, y);
// }
// ctx.restore();

// 绘制文本
// ctx.save();
// var fontSize = 16;
// ctx.font =  fontSize + 'px Microsoft Yahei';
// ctx.textBaseline="middle"; //设置基线参考点
// ctx.textAlign="center";  // 文本居中
// ctx.fillStyle = '#000';
// for (var i = 0; i < 6; i++) {
//     var y = rCenter + curR * Math.cos(rAngle * i);
//     var x = rCenter + curR * Math.sin(rAngle * i);
//     console.log(Math.sin(rAngle * i))
//     var s_width = ctx.measureText(rData[i][0]).width; //获取当前绘画的字体宽度
//     if ( x == rCenter) {
//         if (y > rCenter ) {
//             ctx.fillText(rData[i][0], x - s_width/2, y + fontSize);
//         } else {
//             ctx.fillText(rData[i][0], x - s_width/2, y - fontSize);
//         }
//     } else if ( x > rCenter) {
//         console.log(rData[i][0]);
//         ctx.fillText(rData[i][0], x + s_width*1.5, y);
//     } else {
//          ctx.fillText(rData[i][0], x - s_width*1.5, y);
//     }
// }

// 绘制文本
ctx.save();
var fontSize = 16;
var maxfontSize = 30;
ctx.font =  fontSize + 'px Microsoft Yahei';
ctx.textBaseline="middle";
ctx.textAlign="center";
for (var i = 0; i < 6; i++) {
    var y = rCenter + curR * Math.cos(rAngle * i);
    var x = rCenter + curR * Math.sin(rAngle * i);
    console.log(Math.sin(rAngle * i))
    var s_width = ctx.measureText(rData[i][0]).width;
    if ( x == rCenter) {
        if (y > rCenter ) {
            ctx.fillText(rData[i][0], x - s_width/2, y + fontSize);
        } else {
            ctx.fillText(rData[i][0], x - s_width/2, y - fontSize);
        }
    } else if ( x > rCenter) {
        console.log(rData[i][0]);
        ctx.fillText(rData[i][0], x + s_width*1.5, y);
    } else {
         ctx.fillText(rData[i][0], x - s_width*1.5, y);
    }
}
ctx.restore();
ctx.save(); 
// 绘制等级
ctx.font = '30px Microsoft Yahei bold';
ctx.fillStyle = '#d7431f';
ctx.textBaseline="middle";
ctx.textAlign="center";
for (var i = 0; i < 6; i++) {
    var y = rCenter + curR * Math.cos(rAngle * i);
    var x = rCenter + curR * Math.sin(rAngle * i);
    var M_width = ctx.measureText(rData[i][1]).width;
    if ( x == rCenter) {
        if (y > rCenter ) {
            ctx.fillText(rData[i][1], x + M_width/2, y + fontSize);
        } else {
            ctx.fillText(rData[i][1], x + M_width/2, y - fontSize);
        }
    } else if ( x > rCenter) {
        console.log(rData[i][0]);
        ctx.fillText(rData[i][1], x + M_width, y);
    } else {
         ctx.fillText(rData[i][1], x - M_width, y);
    }
}
ctx.restore();
ctx.save();