// 任务调度器
// [a,a,b,b,c]
gettasktime(['a','a','a','a'],2)
gettasktime(['a','a','a','b','b','b'],2)
function gettasktime(tasks,n) {
    // 将队列分组
    let obj = {
       
    }
    for(let i =0;i < tasks.length;i++){
        // tasks[i]  是任务
        if(!obj[tasks[i]]){
            obj[tasks[i]] = 0
        }
        obj[tasks[i]] += 1
    }
    // console.log(obj,'统计出来的数据任务')
    // 取出最大值
    let array = Object.values(obj)
    let length = Math.max(...array)
    // console.log(length)
    let taskarray = []
    for(let i=0;i<length;i++){
        let _min = []
        for(let key in obj){
            if(obj[key] > 0){
                _min.push(key)
            }
        }
        taskarray.push(_min)
    }
    console.log(taskarray)
    // 求任务时间
    let time = 0
    taskarray.forEach((itemarray,i)=>{
        if(taskarray[i-1] && 1 === taskarray[i-1].length && itemarray[0] === taskarray[i-1][0]){
            time = time + n + 1
        } else if ( i === 0 ){
            time = time + itemarray.length * 1
            console.log(2)
        }else{
            time = time + itemarray.length * 1 + 1
            console.log(3)
        }
    })
    console.log(time,'time')
    return time
}
