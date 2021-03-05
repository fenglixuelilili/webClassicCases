function partation(arr, low, height) {
  // 取值最低位 第一个值为i，最高位，最后一个值为 j
  let i = low, j = height
  while( true ) {
    // 第一个元素与最低位++ 比较
    while(less( arr[++i] , arr[low])){
      // 第一个元素 与 后方的最低位 +1 的元素依次作比较，如果 第一个元素大于后方元素，或者说 后方元素小于此时的标志位则交换元素，也就是小元素来左侧
      // 进入这个循环 则什么也不做 等着跳出循环，不满足的话才开始交换
      if( i === height ){
        // 说明i指针到了最后一个元素
        break
      }
    }
    // 第一个元素 与 最高位-- 比较
    while( less( arr[low], arr[--j] ) ) {
      // 如果后方元素较小则跳出循环交换位置
      if( j === low ){
        // 如果指针与 最低位碰头了 则跳出循环
        break
      }
    }
    if( i>= j ){
      // 两个指针碰头了
      break
    }
    // 交换位置
    swap( arr, i, j )
  }
  // 交换中间
  swap( arr, low, j )
  // 将基准位置返回
  return j
}
function quickSort(arr) {
  _sort(arr, 0, arr.length-1)
}
function _sort( arr, low, height ) {
  if(height <= low) return
  let j = partation(arr, low, height)
  _sort( arr,low, j-1 )
  _sort( arr,j + 1, height)
}
// [ 2 8 5 0 9 ]
// [ 2 8 5 0 9]
// [ 9 0 2 5 8 ]
// [  ]

// 交换位置函数
function swap(arr, a, b) {
  if ( arr[a] > arr[b] ) {
    let tmp = arr[a]
    arr[a] = arr[b]
    arr[b] = tmp
  }
}
function less(a, b) {
  return a > b
}