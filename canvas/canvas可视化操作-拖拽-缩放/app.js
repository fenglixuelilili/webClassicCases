/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("#cv");
let ctx = canvas.getContext("2d");
let width = 500,
  id = 0
  height = 500;
canvas.width = width;
canvas.height = height;
function drawcricl(ctx, x, y, r) {
  ctx.beginPath();
  ctx.fillStyle = "#a75315";
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}
//圆信息
const initinfoir = {
  //  圆就是真正的坐标
  cir1: {
    x: 50,
    y: 50,
    r: 20,
    select: false,
    id: ++id
  },
  cir2: {
    x: 200,
    y: 100,
    r: 50,
    select: false,
    id: ++id
  }
};
function draw() {
  ctx.save()
  ctx.closePath()
  // ctx.clearRect(0,0,width,height)
  // ctx.clearRect(0,0,canvas.width * eventinfo.zoom + eventinfo.,canvas.height * eventinfo.zoom)
  clearreact()
  for (let key in initinfoir) {
    let { x, y, r } = initinfoir[key];
    drawcricl(ctx, x, y, r);
  }
  ctx.beginPath()
  ctx.restore()
}
function clearreact() {
  // ctx.clearRect(0 - eventinfo._offsetX,0-eventinfo._offsetY,canvas.width * eventinfo.zoom - eventinfo._offsetX,canvas.height * eventinfo.zoom - eventinfo._offsetY)
  ctx.clearRect(-1000,-1000,canvas.width * eventinfo.zoom + 1000, canvas.height * eventinfo.zoom+ 1000)
}
// 存储鼠标信息
const eventinfo = {
  // x y 坐标
  x: width / 2,
  y: height / 2,
  // 偏移量 和 缩放zoon
  _offsetX: 0,
  _offsetY: 0,
  zoom: 1,
  zoomStep: 0.1, //每次缩放的大小
  incanvas: false //鼠标是否点在了画布上
};
function getrell(num,type, _offset) {
  // console.log(_offset)
  if( undefined === _offset ) return
  let obj = {
    x: num * eventinfo.zoom   - _offset,
    y: num * eventinfo.zoom - _offset
  }
  return obj[type]
}
function bindevent() {
  let canvasinfo = canvas.getBoundingClientRect()
  let orgx,orgy
  const { zoomStep } = eventinfo
  let _offsetX, _offsetY, zoom
  canvas.addEventListener('mousedown',function (e) {
    // 重置偏移
    _offsetX = eventinfo._offsetX
    _offsetY = eventinfo._offsetY
    zoom = eventinfo.zoom
    eventinfo.x = getrell(e.clientX-canvasinfo.left, 'x', _offsetX)
    eventinfo.y = getrell(e.clientY-canvasinfo.top, 'y', _offsetY)
    // 在此判断是否点击上了圆信息
    let flag = false
    for (let key in initinfoir) {
      let { x, y, r } = initinfoir[key]
      // 计算真正的数据
      x = x * zoom
      y = y * zoom
      r = r
      let san = Math.abs((eventinfo.x - x) ** 2) + Math.abs((eventinfo.y - y) ** 2)
      let currentr = Math.sqrt(san)
      if( currentr < r){
        initinfoir[key].select = true
        flag = true
        orgx = x
        orgy = y
        break
      }
    }
    if(!flag){
      // 点到画布上了
      eventinfo.incanvas = true
    }else{
      eventinfo.incanvas = false
    }
  })
  canvas.addEventListener('mousemove',function (e) {
    // 在此判断是否点击上了圆信息
    let currentx = getrell((e.clientX-canvasinfo.left), 'x', _offsetX)
    let currenty = getrell((e.clientY-canvasinfo.top), 'y', _offsetY)
    
    for (let key in initinfoir) {
      let { select } = initinfoir[key]
      let distancex = currentx - eventinfo.x
      let distancey = currenty - eventinfo.y
      if(select ){
        // 更新 圆坐标
        initinfoir[key].x = orgx + distancex
        initinfoir[key].y = orgy + distancey
        draw()
      }
    }
    if( eventinfo.incanvas ){
      // 更新偏移量
      eventinfo._offsetX = _offsetX + (currentx - eventinfo.x)
      eventinfo._offsetY = _offsetY + (currenty - eventinfo.y)
      clearreact()
      ctx.setTransform(eventinfo.zoom,0,0,eventinfo.zoom,eventinfo._offsetX,eventinfo._offsetY);
      draw()
    }
  })
  canvas.addEventListener('mouseup',function (e) {
    // 在此判断是否点击上了圆信息
    for (let key in initinfoir) {
      initinfoir[key].select = false
    }
    eventinfo.incanvas = false
    _offsetX = eventinfo._offsetX
    _offsetY = eventinfo._offsetY
  })
  canvas.addEventListener('mousewheel',function (e) {
    const { offsetX, offsetY } = e
    // 计算真正的正确坐标
    const  relaly = {
      relalyX: offsetX - eventinfo._offsetX,
      relalyY: offsetY - eventinfo._offsetY
    }
    // 计算每滚一步所需要的偏移坐标
    // 核心计算偏移量  实际坐标 除 缩放大小 
    let detalX = (relaly.relalyX / eventinfo.zoom) * zoomStep
    // console.log(detalX,(relaly.relalyX / eventinfo.zoom) * zoomStep,'得得')
    let detalY = (relaly.relalyY / eventinfo.zoom) * zoomStep
    // console.log(detalX)
    if(e.wheelDelta > 0 ){
      // 缩放增大
      eventinfo.zoom += zoomStep
      // 更新偏移量
      eventinfo._offsetX -= detalX
      eventinfo._offsetY -= detalY
    } else {
      // 缩放减小
      eventinfo.zoom -= zoomStep
      eventinfo._offsetX += detalX
      eventinfo._offsetY += detalY
    }
    // eventinfo._offsetX //偏移量
    // ctx.clearRect(0,0,canvas.width,canvas.height)
    // ctx.clearRect(0,0,canvas.width * eventinfo.zoom,canvas.height * eventinfo.zoom)
    clearreact()

    // 缩放最小 > 0
    ctx.setTransform(eventinfo.zoom,0,0,eventinfo.zoom,eventinfo._offsetX,eventinfo._offsetY);
    // console.log('重绘')
    draw()
  })
}
bindevent()
draw();

