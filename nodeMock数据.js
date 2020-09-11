const Koa = require('koa');
const Router = require('koa-router');
const app =new Koa()
const router = new Router()
var cors = require('koa2-cors');
const fs = require('fs')
router.get('/miserables',(ctx,next)=>{
    ctx.set('Content-Type', 'application/json')
    ctx.set('Access-Control-Allow-Origin', '*')
    const nei = fs.readFileSync('./les-miserables.josn').toString()
    ctx.body = nei
})
app.use(router.routes())
app.use(cors());
app.listen(88);