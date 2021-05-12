/** @type {HTMLCanvasElement} */
function getnum(min,max,fn) {
  if( fn ){
    return fn(min + Math.random() * (max - min))
  }
  return min + Math.random() * (max - min)
}
let ball = document.querySelector('#ball')
let width = window.innerWidth
let height = window.innerHeight
ball.width = width
ball.height = height
let ctx = ball.getContext('2d')

class _ball {
  constructor(x,y,radius){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = `rgba(${getnum(0,255,parseInt)},${getnum(0,255,parseInt)},${getnum(0,255,parseInt)})`
    this.g = 0.9 //重力加速度
    this.speedy = 0 // 初始速度
    this.speedx = (2.5 - getnum(1,5))
    // 空气阻力
    this.zl = 0.9
  }
  draw(){
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
  update(){
    // 更新小球，让小球动起来 也就是更新 xy 坐标
    this.draw()
    // 更新 y
    if(this.y + this.radius + this.speedy >= ball.height ){
      this.speedy = -this.speedy
      // 反弹的时候将速度的能量减弱
      this.speedy *= this.zl
    }else{
      // 加速
      this.speedy += this.g
    }
    this.y = this.y + this.speedy
    // 更新x

    if(this.x + this.radius + this.speedx >= ball.width || this.x - this.radius <= 0){
      // console.log('能量减弱，改变方向')
      
      this.speedx = -this.speedx
      // 反弹的时候将速度的能量减弱
      
    }
    this.speedx *= 0.993
    // 更新x
    
    this.x = this.x + this.speedx
  }
}
let ballarray = []
function animate() {
  ctx.clearRect(0,0,width,height)
  ballarray.forEach(ball => {
    ball.update()
  })
  requestAnimationFrame(animate)
}
function init(num) {
  for( let i=0; i < num; i++ ){
    let r = getnum(5,40)
    let ballobj = new _ball( getnum(r,ball.width - r), getnum(r,ball.height - r), r )
    ballarray.push(ballobj)
  }
}
init(100)
animate()
addEventListener('resize',function () {
  ballarray = []
  ball.width = window.innerWidth
  ball.height = window.innerHeight
  init(100)
})