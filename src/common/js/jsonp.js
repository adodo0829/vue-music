// 使用Promise封装原生jsonp
import oraginJSONP from 'jsonp';

// 导出 封装好的jsonp, url:接口地址; data:接口参数;  options: 请求配置参数,如timeout
export default function jsonp(url, data, options) {
    // 设置jsonp请求
    url = setUrlParam(url, data)
    // 使用Promise来保存结果
    return new Promise((reslove, reject) => {
        
        oraginJSONP(url, options, (err, data) => {
            if (!err) {
                reslove(data)
            } else {
                reject(err)
            }
        })
    })
}

// 接口地址拼接
// url: 同上; data: 对象参数
function setUrlParam(url, data) {
    let paramList = []
    // 遍历参数对象
    for (let p in data) {
        if (data[p] !== null && data[p] !== undefined && data[p] !== '') {
            paramList.push(p + '=' + data[p])
        }
    }
    // 有时候可能要对 ? 进行一下判断
    return url + '?' + paramList.join('&')
}