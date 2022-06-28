import React,{PureComponent, useEffect, useState, useMemo} from 'react';
import './App.css';
// class 与  hook组件的声明周期写法
// 两个例子：1更新document.title 2.事件绑定与解绑
class App extends PureComponent{
  constructor(){
    super()
    this.state = {
      count:0,
      size:{
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
      }
    }
  }
  componentDidMount(){
    document.title = this.state.count
    // 绑定事件  需要在组件卸载的时候解绑
    window.addEventListener('resize',()=>{
      this.setState({
        size:{
          width:document.documentElement.clientWidth,
          height:document.documentElement.clientHeight
        }
      })
    })
  }
  // 解绑事件
  componentWillUnmount(){
    window.removeEventListener('resize')
  }
  componentWillUpdate(){
    document.title = this.state.count
  }
  setCount(){
    this.setState({
      count:this.state.count+1
    })
  }
  render(){
    return <div>
        <button onClick={()=>{this.setCount()}}>点击更改count---{this.state.count}</button>
        <p>我是窗口大小：width:{this.state.size.width}px----height:{this.state.size.height}px</p>
    </div>
  }
}

// hooks 版本
function App2 (){
  const [count,setCount] = useState(0)
  const [size,setSize] = useState({
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
  })
  // useEffect 说明 每次更新视图都会执行useEffect，可以通过第二个参数控制是否执行useEffect---替代了class组件的生命周期
  //，共有两个参数，一个是函数，第二个参数是数组，如果数组为空，则代表只执行一次，如果传入useState的特定值，只有当值发生变化的时候才会执行
  // 第一个参数是个函数，可以有返回值，返回一个函数，再次执行代码，这里触发的时机是 1.组件重新渲染的时候 2.组件卸载的时候
  // 对比useMemo
  // 用法是一样的，useEffect用作副作用，就是组件渲染后的事情，useMemo可以在组件渲染中执行计算逻辑
  // useMemo 具有返回值 返回值类似计算属性
  useEffect(()=>{
    document.title = count
    return ()=>{
      // alert('执行')
    }
  })
  // 计算count 的返回值
  const doublenumber = useMemo(()=>{
    return count*2
  },[count])
  // 还可以使用判断语句
  // const doublenumber = useMemo(()=>{
  //   return count*2
  // },[count==3])
  // useMemo的另一种用法：配合memo函数使用，当传递的属性值为函数的时候，为了防止不必要的渲染 可以使用useMemo 包装函数，是返回的函数
  const myClick = useMemo(()=>{
    return ()=>{
      // 代码
      alert('click')
    }
  },[])
  // 使用useCallback 优化useMemo   直接写函数代码，不用return 了
  const myClick = useCallback(()=>{
    // 代码
    alert('click')
  },[])

  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setSize({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
      })
    })
    return  ()=>{
      window.removeEventListener('resize')
    }
  },[])
  return <div>
     <button onClick={()=>{setCount(count+1)}}>点击更改count---{count}</button>
     <p>我是窗口大小：width:{size.width}px----height:{size.height}px</p>
  </div>
}
export default App2;
