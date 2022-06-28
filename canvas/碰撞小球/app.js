/** @type {HTMLCanvasElement} */
function getnum(min, max) {
  return min + Math.random() * (max - min)
}
function getDistance(x, y, x1, y1) {
  let _x = Math.abs(x1 - x)
  let _y = Math.abs(y1 - y)
  return Math.sqrt(_x * _x + _y * _y)
}
let ball = document.querySelector("#ball")
let width = window.innerWidth
let height = window.innerHeight
// console.log(width,height)
ball.width = width
ball.height = height
let ctx = ball.getContext("2d")
// 小球对象
let mouse = {
  x: 0,
  y: 0,
}
addEventListener("mousemove", function (e) {
  mouse.x = e.x
  mouse.y = e.y
})
class _ball {
  constructor(x, y, speedx = 0, speedy = 0, radius, color) {
    this.x = x
    this.y = y
    this.speedx = speedx
    this.speedy = speedy
    this.radius = radius
    this._radius = radius
    this.color = color
    this.maxradius = 40
  }
  draw() {
    // ctx.clearRect(0,0,width,height)
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
  update() {
    console.log("执行")
    // 更新小球，让小球动起来 也就是更新xy坐标
    this.collision()
    this.mousebig()
    this.draw()
  }
  collision() {
    // 碰撞监测
    if (this.x > width - this.radius || this.x < this.radius) {
      this.speedx = -this.speedx
    }
    this.x = this.x + this.speedx

    if (this.y > height - this.radius || this.y < this.radius) {
      this.speedy = -this.speedy
    }
    this.y = this.y + this.speedy
  }
  mousebig() {
    // 鼠标交互
    // mouse.x
    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      this.radius += 1
    } else {
      this.radius -= 2
    }
    if (this.radius <= this._radius) {
      this.radius = this._radius
    }
    if (this.radius >= this.maxradius) {
      this.radius = this.maxradius
    }
  }
}
// let
function getonlyball(balls) {
  let radius = getnum(0, width / 50)
  let color = `rgb(${parseInt(getnum(0, 255))},${parseInt(
    getnum(0, 255)
  )},${parseInt(getnum(0, 255))})`
  // 新生成的小球
  let x = getnum(radius, width - radius)
  let y = getnum(radius, height - radius)
  for (let j = 0; j < balls.length; j++) {
    //循环监测有没有重复的
    let ball = balls[j]
    if (getDistance(ball.x, ball.y, x, y) <= ball.radius + radius) {
      // 失败 有重叠的
      // console.log('有重叠的',  getDistance(ball.x, ball.y, x, y ) ,
      // ball.radius + radius )
      // console.log( getDistance(ball.x, ball.y, x, y ) ,
      // ball.radius + radius)
      return getonlyball(balls)
      // break
    }
  }
  return {
    x,
    y,
    radius,
    color,
  }
}
let balls = []
function init(num) {
  // 生成不重叠的小球
  for (let i = 0; i < num; i++) {
    let { x, y, radius, color } = getonlyball(balls)
    speedx = 1.5 - getnum(0, 3)
    speedy = 1.5 - getnum(0, 3)
    console.log(speedx, speedy)
    balls.push(new _ball(x, y, speedx, speedy, radius, color))
  }
}
function animate() {
  ctx.clearRect(0, 0, width, height)
  balls.forEach((ball) => {
    ball.update()
  })
  requestAnimationFrame(animate)
}
init(50)
console.log(balls)
animate()
