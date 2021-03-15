//   使用闭包就行单利模式的应用
let instatce = (function() {
  let ins = null
  return function (Fn) {
    if(ins) return ins
    ins = new Fn()
    return ins
  }
})()
function Name() {
  this.name = Math.random()
}
let a = instatce(Name)
let b = instatce(Name)
console.log(a,b)