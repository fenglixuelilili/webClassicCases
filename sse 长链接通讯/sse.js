/*
    server send event
    使用server-send 事件的方法 服务器可以在任何时刻向我们的web页面推送数据和信息  这些被推送来的信息可以再这个页面上作为事件 +data来处理
    使用弊端：单向通讯 只能服务器推送到客户端不能客户端推送到服务器
    使用场景：服务器推送数据 echars图表等
*/
const http = require('http');
const fs = require('fs');
const app = http.createServer((request,response)=>{
    if(request.url == '/'){
        let index = fs.readFileSync(__dirname + '/sse.html')
        response.end(index)
    }
    if(request.url == '/sse'){
        response.setHeader('Content-type','text/event-stream')
        // 需要有开始标志(data：) 和结束标志 （\r\n\r\n）
        setInterval(()=>{
            response.write('data:' + '时间是：' + new Date() + '\r\n\r\n')
        },500)
    }

});
app.listen(50);