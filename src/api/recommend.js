// 推荐页面数据获取方法
// 构造参数去发 jsonp请求
/* eslint-disable */
import jsonp from '../common/js/jsonp'
import { commonParams, options} from "./jsonpConfig"
import axios from 'axios';

// 轮播图数据
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

// 歌单数据
export function getCateList() {
  // 请求本地服务器的接口, 本地服务器代为转发
  const url = 'api/getCateList'
  // 请求参数
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  // 返回结果
  return axios.get(url, {
    params: data
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })

}
