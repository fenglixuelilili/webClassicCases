// 惰性函数 用于性能优化  
// 例如：当频繁调用某个工程函数（例如ajax实例---一个网页内不需要多个ajax实例） 那么工厂函数内 会频繁的实例对象,
// 优化点：使用将第一次的实例的存下来  每次只调取同一个实例
function createXhr(){
    let xhr
    if(typeof XMLHttpRequest!='undefined'){
        xhr = new XMLHttpRequest()
        createXhr = function(){ //将原函数改写  直接返回上次生成的对象
            return xhr
        }
    }else{
        xhr = new XMLHttpRequest()
        createXhr = function(){
            return null
        }
    }
    return xhr
}