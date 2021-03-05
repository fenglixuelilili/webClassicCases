let industry_list = [
        {
            "parent_ind" : "女装",
            "name" : "连衣裙"
        },
        {
            "name": "女装"
        },
        {
            "parent_ind" : "女装",
            "name" : "半身裙"
        },
        {
            "parent_ind" : "女装",
            "name" : "A字裙"
        },
        {
            "name": "数码"
        },
        {
            "parent_ind" : "数码",
            "name": "电脑配件"
        },
        {
            "parent_ind" : "电脑配件",
            "name": "内存"
        },
]
function convert_format(data) {
    const res = {}
    for(let i = 0; i < data.length; i ++) {
        const {parent_ind, name} = data[i]
        if (!parent_ind) {
            !res[name] && (res[name] = {})
        } else {
            !res[name] && (res[name] = {})
            res[name].isChild = true
            !res[parent_ind] && (res[parent_ind] = {})
            res[parent_ind][name] = res[name]
        }
    }
    Object.keys(res).forEach(key => {
        if (res[key].isChild === true) {
            delete res[key].isChild
            delete res[key]
        }
    })
    return res
}
console.log(convert_format(industry_list))
// { '女装': {}, '数码': {} }
// function text(arr){
//     return arr.reduce((pre,next)=>{
//         console.log(pre,next)
//         // if(next.name)
//         // if(next.name &&　!next.parent_ind){
//         //     console.log(pre[next.name])
//         //     pre[next.name] = {}
//         // }
//     },{})
// }
// console.log(text(industry_list))
// return
// function convert_format_one(datas){
//     let obj = {}
//     // 1.便利单个类

//     // let leis = datas.filter(item=>!item.parent_ind&&item.name)
//     // leis.forEach((item,i)=>{
//     //     datas.forEach(lei=>{
//     //         if(item.name == lei.name&&lei.parent_ind){
//     //             // 存储
//     //             if(obj[])
//     //         }
//     //     })
//     // })
//     datas.forEach(item=>{
//         if(item.name&&!item.parent_ind){
//             obj[item.name] = {}
//         }
//     })
//     return obj
// }
// // let industry = datas.filter(item=>item.parent_ind&&item.name)
// // let leis = convert_format_one(industry_list)
// // { '女装': {}, '数码': {} }
// // [ { parent_ind: '电脑配件', name: '内存' } ] {name ：'内存'}
// function convert_format_tow(industry,obj={}){
//     // return 
//     // console.log(1)
//     // let obj2 = JSON.parse(JSON.stringify(obj))
//     if(!industry.length){
//         return {}
//     }
//     let oldindustry = industry
//     industry = industry.filter(item=>{
//         let flag = true
//         if(item.name&&!item.parent_ind){
//             obj[item.name] = {}
//             // obj2[item.name] = {}
//             return false
//         }
//         return flag
//     })
//     console
//     industry.forEach((item,i)=>{
//         for(let k in obj){
//             if( k == item.parent_ind){
//                 obj[k][item.name] = {}
//                 industry.splice(i,1)
//             }
//         }
//         // return flag
//     })
//     // convert_format_tow(industry,obj)

//     console.log(industry,obj)
//     return
//     let oldindustry2 = industry.filter(item=>{
//         let flag = true
//         for(let k in obj2){
//             if( k == item.parent_ind){
//                 flag = false
//                 obj2[k][item.name] = {}
//             }
//         }
//         return flag
//     })
//     // console.log(obj2,oldindustry2)
//     industry.forEach(item=>{
//         for(let k in obj){
//             if( k == item.parent_ind){
//                 console.log('得到的',oldindustry2,obj2)
//                 obj[k][item.name] = convert_format_tow(oldindustry2,obj2)
//             }
//             // if()
//         }
//         // return flag
//     })
//     // console.log(obj,'最终的')
//     return obj
// }
// function map(obj={},key='数码'){
//     let arr = [key]
//     for(let k in obj[key]){
//         if(Object.keys(obj[key][k]).length>=1){
//             arr.push(map(obj[key],k))
//         }else{
//             arr.push(k)
//         }
//     }
//     return arr
// }
// let a = {
//     "数码": {
//         "电脑配件": {
//             "内存" : {
//                 "jajaj":{}
//             },
//             "内存2" : {
//                 "jajaj":{}
//             }
//         }
//     },
//     "女装" : {
//         "连衣裙": {},
//         "半身裙": {},
//         "A字裙": {}
//     }
// }
// console.log(convert_format_tow(industry_list,{}))


// ak