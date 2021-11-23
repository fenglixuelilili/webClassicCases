async function f1(ctx, next) {
  console.log('f1 start ->');
  await next();
  console.log('f1 end <-');
}

async function f2(ctx, next) {
  console.log('f2 start ->');
  await next();
  console.log('f2 end <-');
}

async function f3(ctx) {
  console.log('f3 service...');
}

let ctx = {}
let middlewares = [] // 中间件集合

function use(fn){ // 中间件的使用方法
  middlewares.push(fn)
}

// 依次挂载需要的函数
use(f1)
use(f2)
// use(f3)
// let next1 = () => middlewares[0](ctx, next2)
// let next2 = () => middlewares[1](ctx, next3)
// let next3 = () => middlewares[2](ctx)

// next1()

function compose(ctx, middlewares=[]){
  if( !Array.isArray(middlewares) ){
    throw new Error('非数组')
  }
  for( let fn of  middlewares){
    if( typeof fn !== 'function' ){
      throw new Error('中间件应该为函数')
    }
  }
  // 具体执行
  let len = middlewares.length
  let dispatch = function(i){ // 当前函数是执行中间件函数, 参数是第几个
    let fn = middlewares[i]
    if( len <= i ){
      // 最后一个执行完毕了
      return Promise.resolve()
    }else{
      try{
        return Promise.resolve(fn(ctx, dispatch.bind(null, ++i)))
      } catch(e){
        return Promise.reject()
      }
    }
  }
  dispatch(0) // 从第一个开始执行
  // return function(){
  //   let len = middlewares.length
  //   let dispatch = function(i){ // 当前函数是执行中间件函数, 参数是第几个
  //     let fn = middlewares[i]
  //     if( len >= i ){
  //       // 最后一个执行完毕了
  //       return Promise.resolve()
  //     }else{
  //       try{
  //         return Promise.resolve(fn(ctx, dispatch.bind(null, ++i)))
  //       } catch(e){
  //         return Promise.reject()
  //       }
  //     }
  //   }
  //   dispatch(0) // 从第一个开始执行
  // }
}
compose(ctx, middlewares)
// res()