import React,{useState, useRef, PureComponent, useEffect,memo} from 'react';
import './App.css';
// useRef 两个作用1.获取组件或者dom节点的句柄 2.渲染抽签之间共享数据存储
// 注意 使用的ref的时候的组件，只能是class

// 在class中使用ref
class Child extends PureComponent {
  constructor(){
    super()
    this.state = {
      count:10
    }
  }

  AlertNum = ()=>{
    alert(this.state.count)
    console.log(this.spnRef.current)
  }
  // 创建span ref
  spnRef = React.createRef()
  render(){
      return <div>
        <span onClick={()=>{this.AlertNum()}} ref={this.spnRef}>子组件中class ref使用</span>
      </div>
  }
}
// 在函数式组件中使用
function App (){
  const [count,setCount] = useState(0)
  // 与useState 类似的有个叫 useRef(0)  useRef是莱斯静态变量，每次更新都不会变得 
  const child = useRef() //声明
  const domst = useRef() //声明
  const getChild = ()=>{
    console.log(child.current,'我是子组件中的信息')
    // 调用子组件中的函数
    child.current.AlertNum()
    console.log(domst.current,'我是dom')
  }
  return <div>
    {/* 使用 */}
    <Child ref={child}></Child>
    <button onClick={()=>{getChild()}}>点击获取子组件信息</button>
    <div ref={domst}>1111</div>
  </div>
}

// 第二种使用，夸声明周期存储数据
// 例子 定时器，我们需要开一个定时器
const Apptest = memo(function (){
  let testcount = 0
  let timer = useRef() //由于每次将变量状态都会重新执行，所以用 useRef() 将变量保存下来
  // useState在视图更新后 不会重新执行了，而是上次的赋值
  const [count,setCount] = useState(0)
  // const [count,setCount] = useState(0)
  // console.log('执行')
  console.log(count,'sad')
  useEffect(()=>{
    // 只执行1次  此时的count 就是第一次的count 所以说不能从里面判断逻辑
    timer.current = setInterval(()=>{
      setCount(count=>count+1)
      // console.log(count)
      // if(count>10){
      //   console.log(count)
      //   clearInterval(timer.current)
      // }
    },1000)
  },[])
  // 每次视图更新后 判断：
  useEffect(()=>{
    testcount = testcount+1
    console.log(testcount,'testcount')
     if(count>10){
        clearInterval(timer.current)
      }
  })
  return <div>
    {count}
  </div>
})


export default Apptest;
