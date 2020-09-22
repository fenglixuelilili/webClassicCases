onmessage = function(e){
    // console.log(e.data)
    let msg = e.data
    if(typeof msg !== 'number'){
        // postMessage('')
        throw Error('请传入number类型')
    }
    let res = 0
    while(res<msg){
        res += msg*msg
    }
    postMessage(res)
}