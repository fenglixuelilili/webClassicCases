class Eventself {
    constructor(){
        this.events = {}
    }
    addEvent(name,fn){
        if(!this.events[name]){
            this.events[name] = []
        }
        if(typeof fn === 'function'){
            this.events[name].push(fn)
        }else if (Object.prototype.toString.call(fn) === "[object Array]"){
           this.events[name] = this.events[name].concat(fn)
        }else{
            throw error('错误参数')
        }
        
    }
    removeEvent(name,fn){
        this.events[name].splice(this.events[name].indexOf(fn),1)
    }
    triggerEvent(name){
        this.events[name].forEach(fn=>{
            fn()
        })
    }
}
let ev = new Eventself()
function fn1(fn1){
    console.log(fn1)
}
function fn2(){
    console.log('fn2')
}
function fn3(){
    console.log('fn3')
}
ev.addEvent('test',[()=>{fn1(111)},fn2,fn3])
ev.removeEvent('test',fn2)
ev.triggerEvent('test')