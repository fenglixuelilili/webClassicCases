/** @type {HTMLCanvasElement} */
let cricl = document.querySelector('#cricl')
cricl.width = window.innerWidth
cricl.height = window.innerHeight
let ctx = cricl.getContext('2d')
function getnum(min,max,fn) {
  if( fn ){
    return fn(min + Math.random() * (max - min))
  }
  return min + Math.random() * (max - min)
}
const mouseinfo = {
  x: cricl.width / 2,
  y: cricl.height / 2
}
addEventListener('mousemove',function(e) {
  // console.log(e)
  const { clientX, clientY } = e
  // ball.x = clientX
  // ball.y = clientY

  mouseinfo.x = clientX
  mouseinfo.y = clientY
})
class Ball {
  constructor( x, y, r ){
    this.x = x
    this.y = y
    this.r = r
    this.lineWidth = getnum(2,6)
    this.color = `rgb(${getnum(0,255,parseInt)},${getnum(0,255,parseInt)},${getnum(0,255,parseInt)})`
    // 角度
    this.angle = 0
    // 每次增加的角度
    this.speed = getnum(0,0.1)
    this.drag = {
      x: 0,
      y: 0
    }
  }
  draw({ x, y }){
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.moveTo( x, y ) // 起始位置
    ctx.lineTo( this.x, this.y ) // 结束位置
    ctx.stroke()
    ctx.closePath()
  }
  update(){
    // 首先实现转圈
    // 计算结束位置坐标
    
    
    // 更新x y 坐标
    // this.x = mouseinfo.x - this.r
    // this.y = mouseinfo.y - this.r
    // console.log(this.x)
    let lastposition = {
      x: this.x,
      y: this.y
    }
    // 最新的位置
    // let _x = mouseinfo.x * .
    this.drag = {
      x: ( mouseinfo.x - lastposition.x ) * 0.05 + lastposition.x, 
      y: ( mouseinfo.y - lastposition.y ) * 0.05 + lastposition.y
    }
    this.x = this.drag.x + Math.cos(this.angle) * this.r
    this.y = this.drag.y + Math.sin(this.angle) * this.r
    this.angle += this.speed
    this.draw(lastposition)
    // 更新最新的坐标
    // this.x = end.x
    // this.y = end.y
  }
}

// ball.update()
// console.log(ball)
let bals = []
function init(num) {
  for(let i=0; i < num; i++ ){
    let r = getnum(2,10)
    let ball = new Ball( mouseinfo.x, mouseinfo.y, getnum(2,5) )
    bals.push(ball)
  }
}
function animate() {
  // ball.update()
  ctx.fillStyle = 'rgba(255,255,255,.1)'
  ctx.fillRect(0, 0, cricl.width, cricl.height )
  bals.forEach(ball=>{
    ball.update()
  })
  requestAnimationFrame(animate)
}
init(20)
console.log(bals)
animate()