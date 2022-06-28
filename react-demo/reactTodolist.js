import React,{useState, useEffect, useCallback, useRef} from 'react';
import './App.css';
//TODO list
const loname = '_$_name'
function Control(props){
  const {addTodo} = props
  const inputref = useRef(null)
  const textChange = ()=>{
    // console.log(inputref.current.value)
    
    
  }
  const onKeyDown = (e)=>{
    // console.log(e.which)
    if(e.which == 13){
      sureadd()
    }
  }
  const sureadd = ()=>{
    // inputref.current.value
    let obj = {
      id:new Date().getTime(),
      name:inputref.current.value,
      comped:false
    }
    addTodo(obj)
    inputref.current.value=''
  }
  return <div>
    <input type="text"  onKeyDown={onKeyDown} ref={inputref} onChange={textChange}/>
    <button onClick={sureadd} >添加TODOlist</button>
  </div>
}
function Todos(props){
    const {todoList,delTodo,totagl} = props
    return <div>
    {todoList.map(item=>{
      return <Todoitem item={item} key={item.id} delTodo={delTodo} totagl={totagl}></Todoitem>
    })}
  </div>
}
function Todoitem(props){
  const {item:{id,name,comped},delTodo,totagl} = props
  const del = ()=>{
    delTodo(id)
  }
  const change = ()=>{
    console.log('哈哈哈')
    totagl(id)
  }
  return <div>
    <input type="checkbox" checked={comped} onChange={change}/>
    <label  className={comped?'gray':''}>{name}</label>
    <span onClick={del}>删除</span>
  </div>
}
function App(){
  const [todoList,setTodolist] = useState([])
  // 添加函数，传入子组件的函数必须使用 useCallback
  const addTodo = useCallback((obj)=>{
    setTodolist(todoList=>[...todoList,obj])
  },[])
  // 删除函数
  const delTodo = useCallback((id)=>{
    setTodolist(todoList=>{
      return todoList.filter(item=>item.id != id)
    })
  },[])
  // 切换函数
  const totagl = useCallback((id)=>{
    setTodolist(todoList=>{
      return todoList.map(item=>{
        if(item.id == id){
          // 注意即使是map 也要返回一个新对象
          return {
            ...item,
            comped : !item.comped
          }
        }
        // 返回旧对象
        return item
      })
    })
  },[])
  // 持久化
  useEffect(()=>{
    // 获取信息
    let list = localStorage.getItem(loname) || '[]'
    list = JSON.parse(list)
    setTodolist(list)
  },[])

  useEffect(()=>{
    localStorage.setItem(loname,JSON.stringify(todoList))
  },[todoList]) //每当todoList 发生变化时，就存储信息
  
  return <div>
    <div>
      我的todo——list
    </div>
    <Control addTodo={addTodo}></Control>
    <Todos delTodo={delTodo} todoList={todoList} totagl={totagl}></Todos>
  </div>
}


export default App;
