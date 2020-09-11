const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')
const app = new Koa()
app.use(Static(__dirname + '/views')) //配置静态资源地址
const router = new Router()
const http = require('http')
const server = http.createServer(app.callback())
const io = require('socket.io')(server)
router.get('/',ctx=>{
    ctx.body = '哈哈哈'
})
app.use(router.routes())
io.on('connection',(socket)=>{
    socket.on('send',msg=>{
        socket.broadcast.emit('accept',msg)
    })
    
    // setTimeout(() => {
    //     socket.emit('clientFn','得劲哦')
    // }, 1000);
})
server.listen(6060)