let arr = [[10,10,30],'a','b']
// console.log(arr.flat(Infinity),'扁平化'); 尽在浏览器环境支持
// 属性结构的扁平化
let tree = [
    {
        name:'小明',
        id:0,
        children:[
            {
                name:'小哄',
                id:1,
            },
            {
                name:'小兰',
                id:2,
            },
        ]
    },
    {
        name:'小zhang',
        id:new Date(),
        children:[
            {
                name:'dfgh',
                id:1,
            },
            {
                name:'gsdfg',
                id:2,
            },
        ]
    }
]
// 第一种方式 forEach
function flat(arr,prop){
    let newarr = []
    arr.forEach(item=>{
        newarr.push(item)
        if(item[prop]){ //如果有当前属性
            newarr = [...newarr,...flat(item[prop])]
        }
    })
    return newarr
}
// 第一种方式 reducer
function flat2(arr,prop){
    return newarr = arr.reduce((prev,current)=>{
        return prev.concat(
                current,
                Array.isArray(current[prop])?flat2(current[prop]):[]
            )
    },[])
}
console.log(flat2(tree,'children'))