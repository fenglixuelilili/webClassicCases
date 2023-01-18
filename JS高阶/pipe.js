/**
 * @funs 是所有函数
 * */
function pipe(...funs) {
  function callback(value, func) {
    return func(value)
  }
  return (params) => {
    return funs.reduce(callback, params)
  }
}
function add1(n) {
  return n + n
}

function multiple1(n) {
  return n * n
}
let myfunc = pipe(add1, multiple1)
console.log(myfunc(5))
