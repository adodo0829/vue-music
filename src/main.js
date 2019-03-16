/* eslint-disable */
// 导入babel
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// 导入路由模块
import router from './router/router'
// 导入样式文件
import '../src/common/stylus/index.styl'
// import '../src/common/stylus/variable.styl'
// import '../src/common/stylus/mixin.styl'

// 导入fastclick: 解决屏幕点击延迟
import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
