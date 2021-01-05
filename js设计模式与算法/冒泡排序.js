let arr = [ 11, 45, 1, 8, 9 ];
function mp(arr) {
  for(let i = arr.length-1,tmp; i > 0; i--){
    console.log(11)
    for(let j=0; j < i; j++){
      if(arr[j] > arr[j+1]){
        tmp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = tmp
      }
    }
  }
  return arr
}
mp(arr)