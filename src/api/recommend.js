// 推荐页面数据获取方法
// 构造参数去发 jsonp请求

import jsonp from '../common/js/jsonp'
import {commonParams, options} from "./jsonpConfig"

export function getRecommendData() {
    // 接口地址
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    // 配置完整参数
    const data = Object.assign({}, commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1
    })
    // 返回 jsonp函数的调用: Promise对象
    return jsonp(url, data, options)
}
