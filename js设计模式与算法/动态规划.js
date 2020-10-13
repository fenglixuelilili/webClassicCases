
// 计算斐波那契数字
// 递归是从大到小 从上到下的过程
// 动态规划 是从小到大  从下到上的过程
function fbnq(n){
    let result = [1,1]
    for(i=2;i<n;i++){
        result[i] = result[i-1] +  result[i-2]
    }
    return result[result.length-1]
}
console.log(fbnq(5))