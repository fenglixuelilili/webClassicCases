//  给定一个按顺序排列的数组 查找一个固定的数字
function searchEr(arr,num){
    // 首先声明第一个 与 最后一个
    let start = 0;
    let end = arr.length;
    let min
    let minvalue
    while(start<=end){ //从初始位置移动到与末位位置相同或者交叉的地方停止循环
       min = Math.floor((start+end)/2) //向下取整取中间值
       minvalue = arr[min]
       if(minvalue>num){
            end = min
       }else if(minvalue<num){
           start = min
       }else{
           return [min,minvalue]
       }
    }
    return -1
}
console.log(searchEr([0,5,6,8,9,10,12,13,14,15,18,19,20,22,50],18))
