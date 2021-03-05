// 贪心算法就是每次寻找最优解 最终就是最优解
// 案例：区间调度 或者 射气球
// 给定一个区间[1,2],[1,5] [2 3] 求出不重叠的区间的最大值
function getoverlap(array) {
  // 第一步 找出所有区间中尾区间的最小值  
  // 第二部 去除 比上面的最小值
  let flag = 1
  // 首先排序
  const _arr = array.sort((a,b)=>a[1]-a[2] > 0)
  let end = _arr[0][1]
  for(let values of _arr){
    if(end <= values[0]){
      flag++
      end = values[1]
    }
  }
  console.log(flag)
  return flag
}
getoverlap([[1,2],[2,3],[1,3],[3,5]])

