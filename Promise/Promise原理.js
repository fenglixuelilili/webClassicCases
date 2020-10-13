// 手撸一个Promise
// 三种状态：pending  resolved（fullfiled） rejected
// 这三种状态唯一，要么是pending、要么是resolved(fullfiled)、要么是rejected，所以我们在实现的时候需要定义类的三种状态。
// 除此之外，Promise的构造函数需要我们传入一个函数作为参数，而且这个函数被分为resolve和reject来进行决议
class mPromise {
    constructor(fn){
        this.status = 'pending' //三种状态
        this.data = null
        this.err = null
        // 异步调用栈的临时储存数组
        //搜集resolve
        this.resolveArr = []
        // 搜集reject 
        this.rejectArr = []
        fn(this.resolve.bind(this),this.reject.bind(this))
    }
    resolve(data){
        // 这里不能是同步的  同步的话直接走主线程了
        setTimeout(() => {
            if(this.status == 'pending'){
                this.status = 'resolve'
                this.data = data
                // 执行之前未知的resolve
                this.resolveArr.forEach(resolve=>{resolve()})
            }
        }, 0);
    }
    reject(err){
        // 这里不能是同步的  同步的话直接走主线程了
        setTimeout(() => {
            if(this.status == 'pending'){
                this.status = 'reject'
                this.err = err
                this.rejectArr.forEach(reject=>{reject()})
            }
        }, 0);
    }
    _success(successFn,resolve,reject){
        let next = successFn(this.data)
        // 如果返回值是MyPromise的实例，则等待这个MyPromise决议
        if(next instanceof mPromise){
           //  返回的是一个Promise 继续执行 then
           next.then(resolve,reject)
        }else{
           //  没有返回值 或者 返回值就是一个普通人 直接执行
           resolve(next)
        }
    }
    _error(errFn,resolve,reject){
        let next = errFn(this.err)
         // 如果返回值是MyPromise的实例，则等待这个MyPromise决议
         if(next instanceof mPromise){
            //  返回的是一个Promise 继续执行 then
            next.then(resolve,reject)
         }else{
            //  没有返回值 或者 返回值就是一个普通人 直接执行
            reject(next)
         }
    }
    then(successFn,errFn){
        // 根据status的状态来判断   当status 是pending 的时候Promise 还在过程中，例如异步
        // 当是reject 的时候 是决绝失败
        // 当是resolve 的时候 是决绝成功
        // then 返回的结果还是 Promise
        // console.log(this.status,'当前值')
        // 当 this.status 为resolve 和 reject 是处理同步的 就是直接resolve 或者 reject
        if(this.status == 'resolve'){
            return new mPromise((resolve,reject)=>{
               this._success(successFn,resolve,reject)
            })
        }else if(this.status == 'reject'){
            return new mPromise((resolve,reject)=>{
                this._error(errFn,resolve,reject)
            })
        }else{
            // Promise 处理中 例如异步
            // console.log('异步处理中') 
            // 处理异步决议问题:要想处理异步决议，我们就必须获得异步调用栈的所有函数，然后在异步执行完成之后进行决议。
            return new mPromise((resolve,reject)=>{
                // 这里是未知状态  存起来 一会调用
                this.resolveArr.push((()=>{
                    return ()=>{
                        this._success(successFn,resolve,reject)
                    }
                })())
                this.rejectArr.push((()=>{
                    return ()=>{
                        this._error(errFn,resolve,reject)
                    }
                })())

            })
        }
    }
}
// 使用：
function ajax(){
    return new mPromise((resolve,reject)=>{
        setTimeout(() => {
            resolve({msg:'接受到了'})
        }, 500);
    })    
}
ajax().then(data=>{
    console.log(data)
    return 111
},error=>{
    console.log('出错啦')
    console.log(error)
}).then(data=>{
    console.log(data,'最后得嘻嘻')
})
console.log('先调用')