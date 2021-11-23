// import { setInterval } from 'timers/promises'
// // import { setInterval } from 'timers/promises'
// const ac = new AbortController();
// const { signal } = ac;
// const delay = 1000;
// setTimeout(() => ac.abort(), 5100);
// let i=0;
// try {
//   for await (const startTime of setInterval(delay, Date.now(), { ref: false, signal })) {
//     console.log(Date.now(), i, startTime);
//     i++;
//   }
// } catch (err) {
//   // AbortError: The operation was aborted
//   console.error(err);
// }
const asyncHooks = require('async_hooks')
const fs = require('fs')
const asyncid = () => asyncHooks.executionAsyncId()
const triggerAsyncId = () => asyncHooks.triggerAsyncId()
// console.log('全局的上下文资源id:'+asyncid() + '当前被触发的异步id:' + triggerAsyncId())
fs.readFile('./手写koa中间件.js', 'utf-8', (err, data)=>{
  // console.log(err)
  console.log('异步资源id:'+asyncid() + '当前被触发的异步id:' + triggerAsyncId())
})

// 开启Promise执行跟踪
const hooks = asyncHooks.createHook({
  init(asyncId,type){
    // console.log(asyncId, type)
  },
  promiseResolve(asyncId){
    // 当传递给 Promise 构造函数的 resolve() 函数执行时触发 promiseResolve 回调。
    console.log('promiseResolve', asyncId)
  }
});
hooks.enable();
Promise.resolve().then(() => {
  // Promise asyncId: 7. Promise triggerAsyncId: 6
  console.log(`Promise asyncId: ${asyncid()}. Promise triggerAsyncId: ${triggerAsyncId()}`)
})


// 自定义log
const syncLog = (...args) => fs.writeFileSync('log.txt', `${util.format(...args)}\n`, { flag: 'a' });
const hooks = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    syncLog('init: ', asyncId, type, triggerAsyncId)
  }
});
hooks.enable();

fs.open('hello.txt', (err, res) => {
  syncLog(`fs.open asyncId: ${asyncId()}, fs.open triggerAsyncId: ${triggerAsyncId()}`);
});