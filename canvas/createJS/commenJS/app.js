// console.log(createjs)
// let stage = new createjs.Stage('my')
// let text = new createjs.Text('你好 我的宝贝','12px Arial', '#fff')
// stage.addChild(text)
// stage.update()

// 创建舞台
let stage = new createjs.Stage('my')
// 移动舞台坐标 默认坐标在左上角
stage.x = 100
stage.y = 100

// 创建一个形状
let circle = new createjs.Shape()

// 将形状绘制为圆形
circle.graphics.beginFill('#e8989e').drawCircle(0,0,50)

stage.addChild(circle)

createjs.Tween.get(circle, { loop: true })
        .wait(1000)
        .to({scaleX:0.2,scaleY: 0.2})
        .wait(1000)
        .to({ scaleX: 1,scaleY:  1 }, 1000, createjs.Ease.bounceInOut)
createjs.Ticker.setFPS(20)
createjs.Ticker.addEventListener('tick', stage)

// 音频处理
let status = document.querySelector('#status')

createjs.Sound.alternateExtensions = ['mp4']
createjs.Sound.addEventListener('fileload', playSound)
let src = 'trailer.mp4'
createjs.Sound.registerSound(src)
function playSound(event) {
  console.log(event.src)
  createjs.Sound.play(event.src)
  status.innerHTML = event.src
}
// console.dir()
