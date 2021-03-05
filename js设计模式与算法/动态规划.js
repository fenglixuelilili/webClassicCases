
// 计算斐波那契数字
// 递归是从大到小 从上到下的过程
// 动态规划 是从小到大  从下到上的过程
// function fbnq(n){
//     let result = [1,1]
//     for(i=2;i<n;i++){
//         result[i] = result[i-1] +  result[i-2]
//     }
//     return result[result.length-1]
// }
// console.log(fbnq(5))


// 动态规划案例 之 找零钱 ----- 1维 数组动态规划 如果不存在的话 返回 -1
// 给定一个数组 [1, 2, 5 ] 给定金额 11 元， 找出最小数量金额的人命币是多少张
// 11 元 是由 1 + dp[10] 
function getMoneyNumbers(monearrs,amount) {
    // 1 创建dp数组  一般dp数组的索引 就是 状态 ，状态就是原问题和子问题中会变化的量 ，在此题中就是变化的总金额
    // 数组的内容是所需要的最小张数
    // 数组的下标是 当前所剩金额
    // 将最小张数设置为一个不可能的值
    // 由于存在索引 0 所以创建的数组为 amount + 1
    let dp = new Array( amount + 1 ).fill(amount+1)
    dp[0] = 0
    // 1. 动态条件： 
    for(let i = 0; i < dp.length; i++){
        for(let mone of monearrs){
            if( mone > i){
                continue
            }
            dp[i] = Math.min( dp[i], dp[ i - mone ] + 1 )
        }
    }
    return dp[amount] >=  amount+1 ? -1 : dp[amount]
}
// console.log(getMoneyNumbers([2,5,1],6))

// 动态规划案例之 寻找两个字符串之间的最小子串 给定 s1 和 s2
function getyoungest(s1,s2) {
    // 创建db数组 是一个二维数组
    let m = s1.length
    let n = s2.length
    let db = Array.from( new Array(m+1),() => new Array(n+1).fill(0) )
    // base case
    // db[0][n] = 0 db[m][0] = 0 
    for(let i = 1; i <= m; i++ ){
        for(let j = 1; j <= n; j++) {
            if( s1[i-1] === s2[j-1] ){
                // 当前值 =  上一次的值 + 1
                db[i][j] = db[i-1][j-1] + 1
            }else{
                db[i][j] = Math.max(db[i][j-1],db[i-1][j])
            }
        }
    }
    console.log(db[m][n])
    return db[m][n]
}
getyoungest('abcef','cdef')