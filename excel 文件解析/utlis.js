// 使用二进制读取文件对象
function readFile(file) {
  return new Promise(resolve=>{
    let reander = new FileReader()
    reander.readAsBinaryString(file)
    reander.onload = function (e) {
      resolve(e.target.result)
    }
  })
}