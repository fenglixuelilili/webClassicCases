// 给定只包含 ( ) { } [ ] 的字符串组合
// 给定 '{}' 输出true 
// 给定 '{[]}' 输出 true
// 给定 '{]' 输出false
// 给定 '{}[]' 输出false
function d_str(str) {
  let res_arr = str.split('')
  // console.log(res_arr)
  if(res_arr.length % 2 !== 0){
    return false
  }
  // 第一种对比
  let table = {
    '{': '}',
    '(': ')',
    '[': ']',
  }
  let arr_left = res_arr.splice(0, res_arr.length / 2)
  let arr_right = res_arr.splice(res_arr.length / 2 - 1).reverse()
  let flag = true
  arr_left.forEach((item,i)=>{
    if(table[item] !== arr_right[i]){
      flag = false
    }
  })
  // 第二种对比
  let res_arr2 = str.split('')
  let flag2 = true
  res_arr2.forEach((item,i)=>{
    if(res_arr2[i+1] && table[item] !== res_arr2[i+1]){
      flag2 = false
    }
  })
  if(flag2 || flag){
    return true
  }else{
    return false
  }
}
console.log(d_str('()'))
console.log(d_str('(]()'))
console.log(d_str('({}]'))
console.log(d_str('([{}])'))