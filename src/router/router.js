import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import recommend from '../components/recommend/recommend.vue'
import singer from '../components/singer/singer.vue'
import rank from '../components/rank/rank.vue'
import search from '../components/search/search.vue'

// 使用路由
Vue.use(VueRouter)

// 配置路由对象
let router = new VueRouter({

  routes: [
    // 首页路由 /
    {
      path: '/',
      redirect: '/recommend'
    },
    // 推荐路由
    {
      path: '/recommend',
      component: recommend
    },
    // 歌手路由
    {
      path: '/singer',
      component: singer
    },
    // 排行路由
    {
      path: '/rank',
      component: rank
    },
    // 搜索路由
    {
      path: '/search',
      component: search
    }
  ]
})

// 导出路由
export default router
