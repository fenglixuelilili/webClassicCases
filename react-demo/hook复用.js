import React,{useState, useEffect, useCallback} from 'react';
import './App.css';
// 使用hook 复用逻辑
function useGetwindow(){
  const [size,setSize] = useState({
    width:document.documentElement.clientWidth,
    height:document.documentElement.clientHeight
  })
  const OnRsezie = useCallback(()=>{
    setSize({
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    })
  })
  useEffect(()=>{
    window.addEventListener('resize',OnRsezie)
    return ()=>{
      window.removeEventListener('resize',OnRsezie)
    }
  },[])
  
  return size
}
function App(){
  const mysize = useGetwindow()
  return <div>
    窗口大小是：{mysize.width}和{mysize.height}
  </div>
}


export default App;
