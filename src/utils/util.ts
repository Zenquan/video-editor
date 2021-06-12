/**
 *
 *
 * @export 加零格式化
 * @param {number} num
 * @returns 主要是时间点分<10时需要格式化
 */
function addZero(num: number) {
  let lastNum: string = num.toString()
  if (num < 10) {
    lastNum = '0' + num
  }

  return lastNum
}
/**
 *
 *
 * @export 倒计时函数
 * @param {number} time 倒计时时间
 * @param {string} [type] 特殊类型
 * @returns {string} 00:00:00
 */
function renderTime(time: number): string {
  let seconds = Math.round(time)

  let minute = Math.floor(seconds / 60)
  let remainderSeconds = seconds - (minute * 60)

  let secondsString: string | number = addZero(remainderSeconds)
  minute = Math.floor(seconds / 1000 / 60 % 60);
  secondsString = Math.floor(seconds / 1000 % 60);
  let ms = Math.floor(seconds % 1000)

  return `${addZero(minute)}:${addZero(secondsString)}:${addZero(ms > 340 ? ms - 340 : ms).slice(0, 2)}`
}

export {
  addZero,
  renderTime
}