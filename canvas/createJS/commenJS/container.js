<script>
  window.onload = () => {
    /**
      * bitmap Class 图像类
      * 用于在画布显示列表中渲染图像
      */
    let stage3 = new createjs.Stage('demo3')

    // 渲染图片
    let bitmap = new createjs.Bitmap('./assets/img/hill1.png')
    bitmap.alpha = 0.6      // 透明度
    bitmap.cursor = 'help'
    // 创建一个shadow实例Object(color, offsetX, offsetY, blur)
    bitmap.shadow = new createjs.Shadow("#97c89e", 20, 10, 20);

    // 给图片添加遮罩
    let bitmap2 = new createjs.Bitmap('./assets/img/avatar.jpg')
    bitmap2.x = 400;        // 图片绘制的起始点X坐标
    bitmap2.y = 0;          // 图片绘制的起始点Y坐标
    //遮罩图形
    let shape = new createjs.Shape();
    shape.graphics.beginFill('#000').drawCircle(0, 0, 100);
    shape.x = 500;          // 圆心X坐标
    shape.y = 100;          // 圆心Y坐标
    bitmap2.mask = shape;   //给图片bg添加遮罩

    // 绘制一片草地
    let groundBg = new createjs.Bitmap("./assets/img/ground.png").image;
    let ground = new createjs.Shape();
    w = stage3.canvas.width;      // 650
    h = stage3.canvas.height;     // 400
    stage3.addChild(ground)

    stage3.addChild(bitmap, bitmap2)
    stage3.update()       // 此处刷新无效

    // 监听定时广播
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick',(event) => {
      ground.tileW = groundBg.width;
      ground.y = h - groundBg.height;
      ground.graphics.beginBitmapFill(groundBg).drawRect(0, 0, w, groundBg.height);
      ground.cache(0, 0, w, groundBg.height);
        
      stage3.update()
    });
  }