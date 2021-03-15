/*
  选择排序的工作原理：取一项比较 循环比较最小值，找到最小值进行交换
*/
let arr = [ 11, 45, 1, 8, 9 ];
function mp(arr) {
  
  for(let i = 0; i < arr.length; i++){
    let tmp = arr[i]
    for(let j = i + 1; j < arr.length; j++){
      if(tmp > arr[j]){
        let t = tmp
        tmp = arr[j]
        arr[j] = t
      }
    }
    arr[i] = tmp
  }
  return arr
}
console.log(mp(arr))