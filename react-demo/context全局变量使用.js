import React,{PureComponent,createContext} from 'react';
import './App.css';
// createContext 全局通信变量的使用方法
const numContext = createContext(10) //给一个默认值
const onlineContext = createContext()
class Life extends PureComponent{
  render(){
    return <div>
      <div>我是中间人：</div>
      <Child></Child>
    </div>
  }
}
class Child extends PureComponent{
  render(){
    return <div>
      <div>最终显示的数据：</div>
      {/* 最后使用的时候就是和定义时候的嵌套一样 */}
      <numContext.Consumer>
        {
          num=>(
            <onlineContext.Consumer>
              {
                onLine=>(
                  <div>
                    <div>num数据为：{num}</div>
                    是否联网：{onLine ? <span>联网</span>:<span style={{color:'red'}}>未联网</span>}
                  </div>
                )
              }
            </onlineContext.Consumer>
          )
        }
      </numContext.Consumer>
    </div>
  }
}
class App extends PureComponent{
  constructor (){
    super()
    this.state = {
      num:10,
      onLine:false
    }
  }
  add(){
    this.setState({
      num:this.state.num + 1
    })
  }
  tabonline(){
    this.setState({
      onLine:!this.state.onLine
    })
  }
  render(){
    const { num , onLine } = this.state
    return <div>
      <button onClick={()=>{this.add()}}>加1</button>
      <button onClick={()=>{this.tabonline()}}>切换联网模式</button>
      <numContext.Provider value={num}>
          <onlineContext.Provider value={onLine}>
            <Life></Life>
          </onlineContext.Provider>
      </numContext.Provider>
    </div>
  }
}


export default App;





// 另一种：

import React,{PureComponent,createContext} from 'react';
import './App.css';
// createContext 全局通信变量的使用方法  实际使用中可以提到一个文件中导出使用
const numContext = createContext(10) //给一个默认值
const onlineContext = createContext()
class Life extends PureComponent{
  render(){
    return <div>
      <div>我是中间人：</div>
      <Child></Child>
    </div>
  }
}
class Child extends PureComponent{
  // 声明静态属性contextType之后，直接可以使用变量获取到
  static contextType = numContext
  render(){
    const num = this.context
    return <div>
      <div>最终显示的数据：</div>
      {/* 最后使用的时候就是和定义时候的嵌套一样 */}
      {/* <numContext.Consumer>
        {
          num=>(
            <onlineContext.Consumer>
              {
                onLine=>(
                  <div>
                    <div>num数据为：{num}</div>
                    是否联网：{onLine ? <span>联网</span>:<span style={{color:'red'}}>未联网</span>}
                  </div>
                )
              }
            </onlineContext.Consumer>
          )
        }
      </numContext.Consumer> */}
      <div>
        最终的num：{num}
      </div>
    </div>
  }
}
class App extends PureComponent{
  constructor (){
    super()
    this.state = {
      num:10,
      onLine:false
    }
  }
  add(){
    this.setState({
      num:this.state.num + 1
    })
  }
  tabonline(){
    this.setState({
      onLine:!this.state.onLine
    })
  }
  render(){
    const { num , onLine } = this.state
    return <div>
      <button onClick={()=>{this.add()}}>加1</button>
      <button onClick={()=>{this.tabonline()}}>切换联网模式</button>
      <numContext.Provider value={num}>
          <onlineContext.Provider value={onLine}>
            <Life></Life>
          </onlineContext.Provider>
      </numContext.Provider>
    </div>
  }
}


export default App;

