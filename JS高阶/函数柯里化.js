// 什么是函数柯里化：合并两个函数的参数
function curry(fn){
    let args = Array.prototype.slice.call(arguments,1) //将传入的参数截取除去传入的函数参数
    return function(){
        let _args = Array.prototype.slice.call(arguments) //不截取 参数全部拿到
        // 执行最终的业务函数
        let resultArr = Array.from(args.concat(_args)) //合并参数
        return fn(...resultArr)
    }
}
function add(num1,num2,num3){ //这里相加有三个参数 太复杂 我们拆分他
    return num1+num2+num3
    // return num1,num2,num3 只取，最后面的一位
}
let result = curry(add,1)(2,3) //将参数分两次传入
let result2 = curry(add,10,20)(2) //将参数分两次传入
console.log(result)
console.log(result2)