WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 800
MARGIN_LEFT = 30
MARGIN_TOP = 50
RADIUS = 10

var date = new Date();
var h = date.getHours()
var min = date.getMinutes()
var sec = date.getSeconds()

var balls = [];
var colors = ["#33b5e5", "#ccc000", "#0099cc", "#aa66cc", "#9933cc", "#99cc00", "#669900", "#ff8800", "#ff4444"];

window.onload = function (ev) {
    //自适应屏幕
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1

    var canvas = document.getElementById("canvas")
    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT
    var context = canvas.getContext('2d')
    setInterval(
        function () {
            render(context);
            update()
        }, 50);
    //alert(balls.length)
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= WINDOW_HEIGHT + RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -Math.abs(balls[i].vy) * 0.75;
        }
    }
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS < 0 || balls[i].x - RADIUS > WINDOW_WIDTH) {
            balls.splice(i, 1);
            console.log(balls.length)
        }
    }

}

function update() {
    var NewDate = new Date();
    Nh = NewDate.getHours()
    Nmin = NewDate.getMinutes()
    Nsec = NewDate.getSeconds()
    if (sec != NewDate.getSeconds()) {

        if (parseInt(h / 10) != parseInt(Nh / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(Nh / 10));
        }
        if (parseInt(h % 10) != parseInt(Nh % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(Nh % 10));
        }
        if (parseInt(min / 10) != parseInt(Nmin / 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(Nmin / 10));
        }
        if (parseInt(min % 10) != parseInt(Nmin % 10)) {
            addBalls(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, parseInt(Nmin % 10));
        }
        if (parseInt(sec / 10) != parseInt(Nsec / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(Nsec / 10));
        }
        if (parseInt(sec % 10) != parseInt(Nsec % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(Nsec % 10));
        }
        h = Nh
        min = Nmin
        sec = Nsec
    }
    updateBalls()
}

//上层小球存放
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    //xy圆心坐标
                    x: x + 2 * j * (RADIUS + 1) + (RADIUS + 1),
                    y: y + 2 * i * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    colors: colors[Math.floor(Math.random() * colors.length)]
                }
                //添加进数组
                balls.push(aBall);
            }
        }
    }
}

//将数字画出来
function render(cxt) {
    //clear canvas
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    draw(MARGIN_LEFT, MARGIN_TOP, parseInt(h / 10), cxt);
    draw(MARGIN_LEFT + (14 + 1) * (RADIUS + 1), MARGIN_TOP, parseInt(h % 10), cxt);
    draw(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    draw(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(min / 10), cxt);
    draw(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(min % 10), cxt);
    draw(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    draw(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(sec / 10), cxt);
    draw(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(sec % 10), cxt);
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].colors
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        cxt.closePath()
        cxt.fill();
    }
}

//(x,y)为坐标
function draw(x, y, num, cxt) {

    cxt.strokeStyle = "red"
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.fillStyle = "blue"
                cxt.moveTo(x + j * 2 * (RADIUS + 1) + 1, y + i * 2 * (RADIUS + 1) + 1);
                cxt.lineTo(x + j * 2 * (RADIUS + 1) + 1 + 2 * RADIUS, y + i * 2 * (RADIUS + 1) + 1);
                cxt.lineTo(x + j * 2 * (RADIUS + 1) + 1 + 2 * RADIUS, y + i * 2 * (RADIUS + 1) + 1 + 2 * RADIUS);
                cxt.lineTo(x + j * 2 * (RADIUS + 1) + 1, y + i * 2 * (RADIUS + 1) + 1 + 2 * RADIUS);
                //cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                cxt.closePath();
                cxt.stroke();
                cxt.fill();
            }
        }
    }
}



