import React,{PureComponent,lazy,Suspense} from 'react';
import './App.css';
// 懒加载组件 Suspense 是对于加载中的组件中的一种显示什么状态
const Lazycom = lazy(()=>import('./components/lazy.js'))
class App extends PureComponent{
  constructor (){
    super()
    this.state = {
      hasError:false
    }
  }
  // 捕获组件渲染错误信息
  static getDerivedStateFromError(){
    return {
      hasError:true
    }
  }
  render(){
    if(this.state.hasError){
      return <div>组件渲染错误</div>
    }
    return <div>
        {/* fallback 的值可以是一个组件 */}
      <Suspense fallback={<div>正在加载中...</div>}> 
        <Lazycom></Lazycom>
      </Suspense>
    </div>
  }
}


export default App;
