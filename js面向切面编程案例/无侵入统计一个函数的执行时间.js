// 要统计的函数
function text(){
    console.log('text')
    return 'text4546546546'
}
// 在真正的函数执行之前
Function.prototype.before = function(fn){
    // 先执行回调 在执行函数
    let that = this //让this指向实例函数本身 如果直接执行的话 执行fn函数的是window 或者 global
    // 如果需要链式调用 则需要返回东西
    // 这里是需要执行里面的代码 直接返回一个函数
    return function(){
        if(fn.apply(that,arguments) == false){
            return false
        }
        return that.apply(that,arguments)
    }
}

// 在函数执行之后
Function.prototype.after = function(fn){
    let that = this
    return function(){
        // console.log(this)
        // 此时的that 指向的是 before 的返回值
        // that.apply(that,arguments) //调用自己 就是that指向谁 就执行谁
        let result = that.apply(that,arguments)
        if(result == false){
            return false
        }
        fn.apply(that,arguments)
        return result
    }
}
console.log(text.before(function(){
    console.log('before')
    // return false //return false 之后 就不让函数执行了
}).after(function(){
    console.log('after')
})())
// text.before(function(){
//     console.log('before')
//     return false //return false 之后 就不让函数执行了
// }).after(function(){
//     console.log('after11111')
// })()
// 调换顺序也没事
// text.after(function(){
//     console.log('after')
// }).before(function(){
//     console.log('before')
// })()
