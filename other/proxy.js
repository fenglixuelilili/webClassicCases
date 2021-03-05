function defineReacive(target) {
  if( typeof target !== 'object' ){
    return target
  }
  const handler = {
    get(_target,_key, receiver){
      console.log('拦截到了get')
      // receiver 是代理好的对象
      const keys = Reflect.ownKeys(_target)
      if( keys.includes(_key) ){
        console.log('确实是自身的属性key，在这里进行拦截操作')
      }
      let _value = Reflect.get( _target, _key, receiver )
      return defineReacive(_value)
    },
    set(_target,_key,_value,receiver){
      // _target 是原来的对象
      if(_target[_key] === _value){
        return true
      }
      let keys = Reflect.ownKeys(_target)
      if(keys.includes(_key)){
        console.log('原来有的key')
      } else {
        console.log('新增的key')
      }
      let target = Reflect.set(_target,_key,_value,receiver) //结果返回布尔值 是否设置成功
      return target
    },
    deleteProxy(_target,_key,_value,xxxx){
      console.log(_target,_key,_value,xxxx)
    }
  }
  return new Proxy(target,handler)
}
let c = {number:10,obj: [8520]}
let x = defineReacive(c)
// console.log()
// x.number = 11
x.obj.push(5)