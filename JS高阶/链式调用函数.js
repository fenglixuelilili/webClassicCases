class Text {
    constructor({name='',age=''}){
        this.name = name
        this.age = age
    }
    setName(name){
        this.name = name
        return this
    }
    setAge(age){
        this.age = age
        return this
    }
}
// 使用工厂函数包装一下
function JQQ(obj={}){
    let text = new Text(obj)
    return text
}
let mytext = JQQ().setAge(10).setName('张三')
console.log(mytext)