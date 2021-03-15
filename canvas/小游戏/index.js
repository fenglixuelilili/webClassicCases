const canvas = document.createElement('canvas')
canvas.width = 512
canvas.height = 480
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)


// 创建三个图片
let bgReady = false
let bgimg = new Image()
bgimg.onload = function name() {
  bgReady = true
}
bgimg.src = './imgs/background.png'

let hearo = false
let hearoimg = new Image()
hearoimg.onload = function name() {
  hearo = true
}
hearoimg.src = './imgs/hero.png'

let mosterReady = false
let monsterImage = new Image()
monsterImage.onload = function name() {
  mosterReady = true
}
monsterImage.src = './imgs/monster.png'

// 定义对象
// 永雄
let hero = {
  speed: 256,
  x: 0,
  y: 0
}
// 怪物
let mouster = {
  x: 0,
  y: 0
}
// 被捉次数
let monstersCaught = 0

let keysDown = {}
// 键盘按下
addEventListener('keydown', function (e) {
  // 记录键盘按下
  keysDown[e.keyCode] = true
}, false)
// 键盘抬起
addEventListener('keyup', function (e) {
  // 将记录的按下键盘删除
  delete keysDown[e.keyCode]
}, false)

function reset() {
  // 永雄在正中心
  hero.x = canvas.width / 2
  hero.y = canvas.height / 2
  // 怪物随机地方
  // 小怪物的width 和 height 32
  mouster.x = 32 + Math.random() * (canvas.width - 64)
  mouster.y = 32 + Math.random() * (canvas.height - 64)
}

function update(modifer) {
  // 操控英雄
  if( 38 in keysDown ){
    // 下键盘 网下走
    hero.y = hero.y - modifer * hero.speed
  }
  if( 40 in keysDown ){
    // 上键盘 网上走
    hero.y = hero.y + modifer * hero.speed
  }
  if( 37 in keysDown ){
    // 左键盘 网左走
    hero.x = hero.x - modifer * hero.speed
  }
  if( 39 in keysDown ){
    // 上键盘 网上走
    hero.x = hero.x + modifer * hero.speed
  }
  // 判断是否被捉
  if( 
    hero.x <= mouster.x + 32 &&
    mouster.x <= hero.x + 32 &&
    hero.y <= mouster.y + 32 &&
    mouster.y <= hero.y + 32
   ){
    ++monstersCaught
    reset()
   }
}
// 渲染canvas
function render() {
  if(bgReady) {
    ctx.drawImage(bgimg,0,0)
  }
  if(hearo) {
    ctx.drawImage(hearoimg,hero.x,hero.y)
  }
  if(mosterReady) {
    ctx.drawImage(monsterImage, mouster.x, mouster.y)
  }
  ctx.fillStyle = 'rgb(250,250,250)'
  ctx.font = '24px Helvetica'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillText('Golins caught:' + monstersCaught, 32 , 32)
}
// let then = Date.now()
// function main() {
//   let now = Date.now()
//   let detal = now - then

  
// }
let mian = (function() {
  let then = Date.now()
  function main () {
    let now = Date.now()
    let detal = now - then
    update( detal / 1000 )
    render()
    then = now
    console.log(123)
    requestAnimationFrame(main)
  }
  return main
})()

reset()
mian()