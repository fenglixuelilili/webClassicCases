// 原生版本
// ws 模块是安装的
let websocketServer = require('ws').Server;
wss = new websocketServer({port:8181});
// 监听客户端连接事件 
wss.on('connection',function(ws){
    console.log('客户端已连接')
    // 监听接口消息事件
    ws.on('message',function(message){
        console.log('我是客户端传来的消息' + message)
    })
    let i = 0
    setInterval(()=>{
        i++
        let obj = {
            name:'张三' + i,
            time:new Date() 
        }
        // 向客户端发送消息
        ws.send(JSON.stringify(obj))
    },500)
})