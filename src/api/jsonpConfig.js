// 配置jsonp公共参数
// 导出给请求模块的函数
/* eslint-disable */
export const commonParams = {
  g_tk: 5381,
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0
}

// 回调函数的参数
export const options = {
  param: 'jsonpCallback'
}

// 设置语义化参数
export const noError = 0
