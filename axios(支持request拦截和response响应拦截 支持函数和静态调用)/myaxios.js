const utlis = {
    extendsFn(obj1,obj2,context){
        //obj2 中的函数混入到obj1中
        for(let k in obj2){
            if(obj2.hasOwnProperty(k)){
                if(typeof obj2[k] === 'function'){
                    obj1[k] = obj2[k].bind(context)
                }else{
                    obj1[k] = obj2[k]
                }
            }
            
        }
    }
}
// 拦截管理器
class Interceptor {
    constructor(){
        this.handles = []
    }
    use(success,error){
        this.handles.push({success,error})
    }
}
class Axios {
    constructor(){
        this.interceptors = {
            request:new Interceptor(),
            response:new Interceptor()
        }
    }
    request(config){
        // 创建一个执行器
        let promise = Promise.resolve(config)
        // 执行函数收集器
        let arr = [this.xhrPromise,null]
        this.interceptors.request.handles.forEach(obj=>{
            arr.unshift(obj.error)
            arr.unshift(obj.success)
        })
        this.interceptors.response.handles.forEach(obj=>{
            
            arr.push(obj.success)
            arr.push(obj.error)
        })
        // 此时得到一个数组  让执行器 promise 去执行每一个函数，由于执行器promise 需要一个成功的回调函数  和一个失败的回调函数  所以数组中应当是成对出现的
        console.log(arr)
        while(arr.length){
            promise = promise.then(arr.shift(),arr.shift()) //具体执行 每次都会返回Promise 必须重新赋值
        }
        return promise
    }
    xhrPromise({url,methods='get',data={},headers={}}=config){
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest()
            if(!url){
                return reject('请传url')
            }
            // let _url = methods=='get'
            let str = ''
            for(let k in data){
                str+=k+'='+ data[k] +'&'
            }
            str = str.substr(0,str.length-1)

            if(methods=='get' && str){
                if(url.indexOf('?')>=0){
                    url = url + '&' + str
                }else{
                    url = url + '?' + str
                }
            }

            xhr.open(methods,url)
            for(let k in headers){
                xhr.setRequestHeader(k,headers[k]) 
            }
            if(methods == 'get'){
                xhr.send()
            }
            if(methods == 'post'){
                let head = ''
                for(let k in headers){
                    if(k=='content-type' || k=='Content-type' || k=='Content-Type' || k=='content-Type'){
                        head = headers[k]
                    }
                }
                if(!head){
                    xhr.setRequestHeader('content-type','application/x-www-form-urlencode')
                    data = JSON.stringify(data)
                }else{
                    if(head.indexOf('application/x-www-form-urlencoded')>=0){
                        data = str
                    }
                    if(head.indexOf('application/json')>=0){
                        data = JSON.stringify(data)
                    }
                    if(head.indexOf('application/text/plain')>=0){
                        data = str
                    }
                }
                xhr.send(data)
            }

            xhr.onload = function(){
                resolve(xhr.responseText)
            }
        })
    }
}
addSing()
function addSing(){
    let arr = ['get','post']
    arr.forEach(method=>{
        Axios.prototype[method] = function(url,{data={},headers={}}=config){
            let _config = {
                url,
                methods:method,
                data,
                headers
            }
            //原型中的this就是指向的实例本身
            return this.request(_config)
        }
    })    
}

function CreateInstance(){
    let _axios = new Axios()
    let request = _axios.request.bind(_axios)
    // console.log(request)
    // _axios 是实例 他的原型是 __proto__  类或者构造函数才有原型  prototype
    // 混入方法
    utlis.extendsFn(request,Axios.prototype,_axios)
    // 混入属性 interceptors 模拟axios的写法
    utlis.extendsFn(request,_axios)
    // console.dir(request.interceptors.request)
    return request
}
const axios = CreateInstance()