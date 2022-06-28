(function(){
    var initCircle = document.getElementById('initCircle');
    var finalCircle = document.getElementById('finalCircle');
    var aPath = document.getElementById('animationPath');
    var touchFingers; //缓存touches队列
    //初始圆坐标
    // 固定圆的圆心坐标，以及半径
    var x0 = parseInt(initCircle.getAttribute('cx'));
    var y0 = parseInt(initCircle.getAttribute('cy'));
    var r0 = parseInt(initCircle.getAttribute('r'));

    //最终圆坐标
    // 动态圆的圆心坐标，以及半径
    var x1;
    var y1;
    var r1 = parseInt(finalCircle.getAttribute('r'));
    //setter
    // 快捷设置元素属性
    Element.prototype._setter = function (options) {
        var attr;
        for(attr in options){
            if(options.hasOwnProperty(attr)){
                this.setAttribute(attr, options[attr]);
            }
        }
    };
    // 获取touch
    var updateF = function updateTouches(event) {
        touchFingers = event.touches[0];
    };

    var longL
    var renderThing = function () {
        // 移动圆过程中的x y坐标
        x1 = touchFingers.clientX;
        y1 = touchFingers.clientY;
        //二次贝赛尔曲线参考点 中心点坐标的计算
        var pX = x0 - ((x0 - x1) / 2);
        var pY = y0 - ((y0 - y1) / 2);
        //勾股x,y
        // 计算两个圆心的x与y差值距离
        var _gX = Math.abs(x0 - x1);
        var _gY = Math.abs(y0 - y1);
        // 此时会形成一个三角
        //勾股定理斜线长度长
        longL = Math.sqrt(_gX * _gX + _gY * _gY);
        
        var sinX = _gY / longL;
        var cosX = _gX / longL;
        var fourPoints = []
        //四个点的路径构建
        if(longL < 200){
            fourPoints = [
                // 起始点坐标
                'M',
                x0 + r0 * sinX,
                y0 + r0 * cosX,
                'Q',
                pX,
                pY,
                x1 + r1 * sinX,
                y1 + r1 * cosX,
                'L',
                x1 - r1 * sinX,
                y1 - r1 * cosX,
                'Q',
                pX,
                pY,
                x0 - r0 * sinX,
                y0 - r0 * cosX,
                'Z'
            ];
        }
        finalCircle._setter({
            cx: x1,
            cy: y1
        });
        //设置路径
        aPath._setter({
            d: fourPoints.join(' ')
        });
    };
    function renderThingend(){
        console.log(longL)
        if(longL < 200){
            // console.log('回弹')
            finalCircle._setter({
                cx: x0,
                cy: y0
            });
            // document.body.removeChild(finalCircle)
            // finalCircle.setAttribute("attributeName","fill-opacity");
            // finalCircle.setAttribute("values","1;0;1");
            // finalCircle.setAttribute("dur","1s");
            // document.body.appendChild(finalCircle)
            // finalCircle.setAttribute("repeatCount","indefinite");
            aPath._setter({
                d: [].join(' ')
            });
        }
    }
    document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        touchFingers = e.touches[0];
    });
    document.addEventListener('touchmove', function (e) {
        e.preventDefault(); //屏蔽掉默认的滚动行为
        updateF(e);
        renderThing();
    });
    document.addEventListener('touchend', function (e) {
        e.preventDefault(); //屏蔽掉默认的滚动行为
        // updateF(e);
        // renderThing();
        renderThingend()
    });
}());