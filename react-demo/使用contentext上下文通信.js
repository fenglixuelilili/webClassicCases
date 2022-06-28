import React,{createContext, useState,useContext} from 'react';
import './App.css';
// 创建context
const Counttext = createContext()
function App2 (){
  // 直接使用
  const count = useContext(Counttext)
  return <div>
     {count}
  </div>
}
function App (){
  const [count,setCount] = useState(0)
  
  return <div>
     <Counttext.Provider value={count}>
        <App2/>
        <button onClick={()=>{setCount(count+1)}}>加1</button>
     </Counttext.Provider>
  </div>
}
export default App;
