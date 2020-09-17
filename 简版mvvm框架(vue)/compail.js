class Compile{
    constructor(el,vm){
        this.$el = document.querySelector(el)
        this.$vm = vm
        if(this.$el){
            this.$fragment = this.node2Fragment(this.$el) //将真实的dom转化为frament片段----在内存中操作
            
            this.compile(this.$fragment)
            // 上面经过编译 最终的结果加入信息中
            this.$el.appendChild(this.$fragment)
        }else{
            console.error('无效的dom节点')
        }
    }
    node2Fragment(el){
        // 创建一个空的fragment片段
        let fragment = document.createDocumentFragment()
        let child
        // 每次去除第一个元素，并且移动到framnent中
        while (child = el.firstChild) {
            // 这里是将原来的元素删除 并加入到fragment元素中
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el){
        // 取出所有子节点
        Array.from(el.childNodes).forEach(node=>{
            if(this.isElement(node)){
                if(node.childNodes &&　node.childNodes.length){
                    this.compile(node)
                }
                Array.from(node.attributes).forEach(attribute=>{
                    if(this.isEvent(attribute.name)){
                        // 事件 
                        this.bindHandel(node,attribute)
                    }
                    if(this.isDir(attribute.name)){
                        // 指令 v-html  v-text
                        console.log('compile' + attribute.name.substr(2))
                        this['compile' + attribute.name.substr(2)] &&　this['compile' + attribute.name.substr(2)](node,attribute)
                    }
                })
            }
            if(this.isText(node)){
                // 文本节点
                this.compiletext(node)
            }
        })
    }
    compiletext(node){
        this.updata(node,this.$vm,RegExp.$1,'text')
    }
    compilehtml(node,{value}){
        this.updata(node,this.$vm,value,'html')
    }
    compilemodel(node,{value}){
        this.updata(node,this.$vm,value,'model')
        node.addEventListener('input',e=>{
            // console.log(e.target.value)
            this.$vm[value] = e.target.value
        })
    }
    bindHandel(node,{name,value}){
        let event = name.substr(1)
        let fn = this.$vm.$option.methods[value]
        if(fn){
            node.addEventListener(event,fn.bind(this.$vm))
        }
       
    }
    updata(node,vm,attr,dir){
        let updatafn = this['updata' + dir] //具体的更新视图函数
        // 更新视图----就是替换内容
        updatafn &&　updatafn(node,vm[attr])
        new Watcher(vm,attr,function(value){
            updatafn && updatafn(node,value)
            // 如果不写 bind(this) 将会指向Vue 
            console.log(this) // 将this指向到Compile中
            // this.$el.appendChild(this.$fragment)
        }.bind(this))
    }
    updatatext(node,value){
        node.textContent = value
    }
    updatahtml(node,value){
        node.innerHTML = value
        
    }
    updatamodel(node,value){
        node.value = value
        
    }
    isElement(node){
        // 是不是元素节点
        return node.nodeType == 1
    }
    isText(node){
        // 是不是指定的双大括号指令
        return node.nodeType == 3 &&　/\{\{(.+)\}\}/.test(node.textContent)
    }
    isEvent(attributeName){
        return attributeName.indexOf('@') == 0
    }
    isDir(attributeName){
        return attributeName.indexOf('v-') == 0
    }
}