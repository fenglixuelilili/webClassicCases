class Vue {
    constructor(option){
        this.$option = option
        this.$data = this.$option.data?this.$option.data:{}
        this.$methods = this.$option.methods?this.$option.methods:{}
        this.observer(this.$data)
        new Compile(this.$option.el,this)
    }
    // 将所有的属性变成观察目标
    observer(obj){
        if(!obj || Object.prototype.toString.call(obj) !== '[object Object]'){
            return
        }
        for(let k in obj){
            // 将数据劫持到自定义的通知消息队列中
            this.DefineReactive(obj,k,obj[k])
            this.proxySelf(k)
        }
    }
    // 将数据加入响应式
    DefineReactive(obj,key,value){
        if(Object.prototype.toString.call(value) === '[object Object]'){
            this.observer(value)
        }
        // 将需要监听的函数添加到Depr中对应的监听函数列表
        let dep = new Dep()
        Object.defineProperty(obj,key,{
            enumerable: true,
            configurable: true,
            get(){
                // 加入观察者队列 收集watcher
                Dep.target&&dep.addDeeps(Dep.target) //Dep.target 是一个watcher 观察者
                return value
            },
            set(newvalue){
                if(value == newvalue){
                    return
                }
                value = newvalue
                // 通知所有人更新
                dep.notify()
            }
        })
    }
    proxySelf(key){
        // 将数据们代理到vue实例上面
        Object.defineProperty(this,key,{
            enumerable: true,
            configurable: true,
            get(){
                // 相当于读取属性，由于上面加入了数据代理，直接会走上面的get模式
                return this.$data[key]
            },
            set(newvalue){
                // 相当于设置属性，由于上面加入了数据代理，直接会走上面的get模式
                this.$data[key] = newvalue
            }
        })
        // 将方法代理到vue实例上面
        for(let methodname in this.$methods){
            let value = this.$methods[methodname]
            Object.defineProperty(this,methodname,{
                enumerable: true,
                configurable: true,
                get(){
                    return value
                }
            })
        }
    }
}
// 收集依赖容器 --- 依赖管理器 他实际的作用是将观察目标(data数据)与 观察者(Watcher) 链接起来
// 是由watcher(观察者)构成
// 当一个“可观察”数据对象的属性值发生get行为的时候，将需要监听的函数添加到Depr中对应的监听函数列表
class Dep {
    // 状态收集器
    constructor(){
        this.deps = []
    }
    addDeeps(dep){
        this.deps.push(dep)
    }
    // 通知所有watcher
    notify(){
        this.deps.forEach(watcher=>{
            watcher.updata()
        })
    }
}
// 真正的观察者(Watcher) 
class Watcher {
    constructor(vm,key,fn){
        this.vm = vm
        this.key = key
        this.fn = fn
        // 当读取
        // 读实例化Watcher的时候 将实例化的Watcher加入到Dep的静态属性上 不会丢失
        Dep.target= this
        this.vm[this.key] // 触发get
        // 读取完毕后（也就是加入deps中后）立即删除
        Dep.target= null
    }
    // 就是执行里面收集的函数
    updata(){
        console.log(this,'this')
        // Watcher 里面存放的 实际上是视图更新函数
        this.fn.call(this.vm,this.vm[this.key])
    }
}