function throttle(fn, time=3000) {
  // throttle 核心是丢弃
  let _startTime = +new Date()
  return () => {
    let _endTime = +new Date()
    if(_endTime > _startTime + time) {
      fn()
      _startTime = _endTime
    }
  }
}