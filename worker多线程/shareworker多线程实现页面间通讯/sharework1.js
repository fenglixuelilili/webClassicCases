console.log(self)
let msg
onconnect = function(e){
    let workport = e.ports[0]
    workport.onmessage = function(event){
        // 如果传入的数据是get 那么获取到缓存的值
        if(event.data == 'get'){
            workport.postMessage(msg)
            return
        }
        // 默认设置缓存的值
        msg = event.data
    }
}