/** @type {HTMLCanvasElement} */
function getnum(min,max) {
  return min + Math.random() * (max - min)
}
let ball = document.querySelector('#ball')
let width = window.innerWidth
let height = window.innerHeight
// console.log(width,height)
ball.width = width
ball.height = height
let ctx = ball.getContext('2d')
// 小球对象
let mouse = {
  x: 0,
  y: 0
}
addEventListener('mousemove',function(e) {
  mouse.x = e.x
  mouse.y = e.y
})
class _ball {
  constructor(x,y,speedx,speedy,radius,color){
    this.x = x
    this.y = y
    this.speedx = speedx
    this.speedy = speedy
    this.radius = radius
    this._radius = radius
    this.color = color
    this.maxradius = 40
  }
  draw(){
    // ctx.clearRect(0,0,width,height)
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
  update(){
    // 更新小球，让小球动起来 也就是更新xy坐标
    this.collision()
    this.mousebig()
    this.draw()
  }
  collision(){
    // 碰撞监测
    if( this.x > width - this.radius || this.x < this.radius){
      this.speedx = -this.speedx
    }
    this.x = this.x + this.speedx
    
    if( this.y > height - this.radius || this.y < this.radius){
      this.speedy = -this.speedy
    }
    this.y = this.y + this.speedy
  }
  mousebig(){
    // 鼠标交互
    // mouse.x
    if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
      this.radius += 1
    } else {
      this.radius -= 2
    }
    if( this.radius <= this._radius ){
      this.radius = this._radius
    }
    if(this.radius >= this.maxradius){
      this.radius = this.maxradius
    }
    
  }
}
let balls = []
function init(num) {
  let x,y,speedx,speedy,radius
  let color
  for( let i=0; i < num; i++ ){
    radius = getnum(0,20)
    color = `rgb(${parseInt(getnum(0,255))},${parseInt(getnum(0,255))},${parseInt(getnum(0,255))})`
    x = getnum(radius,width - radius)
    y = getnum(radius,height - radius)
    speedx = 1.5 - getnum(0,3)
    speedy = 1.5 - getnum(0,3)
    balls.push(new _ball(x,y,speedx,speedy,radius,color))
  }
}
function animate() {
  ctx.clearRect(0,0,width,height)
  balls.forEach(ball=>{
    ball.update()
  })
  requestAnimationFrame(animate)
}
init(500)
console.log(balls)
animate()