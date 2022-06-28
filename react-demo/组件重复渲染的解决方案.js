import React,{PureComponent,Component,memo} from 'react';
import './App.css';
// 有这么一个问题，当组件中的摸一个组件并没有数据变动的时候，父组件中的任何数据变化 都会引起该子组件的渲染
// 解决方案1：使用一个自定义的属性，固定值，使用声明周期函数shoudcomponentupdate 中的nextProps 拿到属性做对比 是否渲染   缺点 当传入一个对象属性的时候，对象属性变化就监听不到了
// 解决方案2：PureComponent 进行渲染
// 以上两种方案都有一个注意点 就是 如果属性传入 的是函数的话 不能直接写行内函数，也会导致不更新，应该使用外面的 this.xxx 函数
// 解决方案3 使用memo  使用函数式的写法 无状态组件  memo本身就是一个高阶组件
// 方案1
// class Mychild extends Component {
//   constructor(){
//     super()
//   }
//   shouldComponentUpdate(nextProps,nextState){
//     if(nextProps.name===this.props.name){
//       return false
//     }
//     return true
//   }
//   render(){
//     const {num} = this.props.numobj
//     console.log('我渲染了')
//   return <div>哈喽{num}</div>
//   }
// }
// 方案2
// class Mychild extends PureComponent {
//   constructor(){
//     super()
//   }
//   render(){
//     const {num} = this.props.numobj
//     console.log('我渲染了')
//   return <div>哈喽{num}</div>
//   }
// }
// 方案3
const Mychild = memo(function(props){
  const {num} = props.numobj
  return  <div>哈喽{num}</div>
})
class App extends PureComponent{
  constructor (){
    super()
    this.state = {
      numobj:{
        text:'哈喽',
        num:0
      }
    }
  }
  add=()=>{
    this.setState({
      numobj:{...this.state.numobj,num:++this.state.numobj.num}
    })
  }
  render(){
    return <div>
      <button onClick={()=>{this.add()}}>点击{this.state.numobj.num}</button>
      {/* numobj={this.state.numobj} */}
        <Mychild name='myname' numobj={this.state.numobj}></Mychild>
    </div>
  }
}


export default App;
