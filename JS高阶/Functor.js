// Functor
class Functor_ {
  constructor( value ){
    this._value = value
  }
  map(f){
    // 链式调用的实现方式,链式调用完成之后并不会改变原来值的原因
    return Functor_.of(f(this._value))
  }
  toString(){
    // 如何对象实现了toString接口，那么在字符串化的时候会默认调用该接口
    return 'toString'
  }
  static of(value){
    // console.log(this._value,'静态方法中的this指向为undefind')
    // 间接的通过of函数获取实例
    return new Functor_(value)
  }
}
// Functor 的使用
let test = Functor_.of(10)
function add(value) {
  return ++value
}
// 操作值
let newtest = test.map(add).map(add)
console.log(newtest)

// ----------------------------------------------------------
// Maybe 就是将错误处理
class Maybe_ {
  constructor( value ){
    this._value = value
  }
  map(f){
    // 链式调用的实现方式,链式调用完成之后并不会改变原来值的原因
    return Test.of(f(this._value))
  }
  toString(){
    // 如何对象实现了toString接口，那么在字符串化的时候会默认调用该接口
    return 'toString'
  }
  static of(value){
    // console.log(this._value,'静态方法中的this指向为undefind')
    // 间接的通过of函数获取实例
    return new Test(value)
  }
}


