<template>
  <div id="app">
    <!-- 通用组件: 头部, tab栏 -->
    <m-header></m-header>
    <tab></tab>
    <!-- 路由显示组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 导入公共组件
import mHeader from './components/m-header/m-header' // 头部
import Tab from './components/tab/tab' // tab栏

export default {
  components: {
    mHeader,
    Tab
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
#app {
  color: #ffcd32;
}
</style>
