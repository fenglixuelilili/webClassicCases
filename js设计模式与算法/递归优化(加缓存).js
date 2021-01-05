// 计算斐波那契数列 1 1 2 3 5 8...
// 常规的递归
// function fbnq(n){
//     if(n==1 || n==2){
//         return 1
//     }
//     return fbnq(n-1) + fbnq(n-2)
// }
// console.log(fbnq(50))

//  加入缓存的
function fbnq(n){
    let arr = []
    return fbnq2(arr,n)
}
function fbnq2(arr,n){
    if(n==1 || n==2){
        return 1
    }
    if(arr[n]){
        return arr[n]
    }
    arr[n] = fbnq2(arr,n-1) + fbnq2(arr,n-2)
    return arr[n]
}
console.log(fbnq(50))