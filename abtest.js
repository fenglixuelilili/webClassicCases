// abtest 方案 即随机方案
// 例如 一个颜色 红色1 绿色5 黄色 4
// testName 测试名称
// list 为所有的方案 数据结构为[ { key: string, data: object|string, probability: number} ]
// 其中 probability 为概率
// 最终返回随机获取的方案
export const getdssetColor = ( testName, list )=>{
  let probability = 0
  const resultkeys = list.reduce( (pre, current ) => {
      // console.log(pre,'')
      if( !current.key || pre.indexOf( current.key ) !== -1 ){
          throw new Error( 'key值不唯一' )
      }
      // 默认为1份概率
      let num = current.probability || 1
      probability = probability + num
      if( probability > 10 ){
          throw new Error( '总probability为10' )
      }
      while( num-- ){
          pre.push( current.key )
      }
      return pre
  },[] )
  let abkey = localStorage.getItem( testName )
  if( abkey === 'undefined' ){
      abkey = resultkeys[ Math.floor( Math.random() * resultkeys.length ) ] + ''
      localStorage.setItem( testName, abkey )
  }
  abkey = Number(abkey)
  return list.find( item => { return item.key === abkey } )
}