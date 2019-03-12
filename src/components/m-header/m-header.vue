<template>
  <!-- 头部组件 -->
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">QQ Music</h1>
    <!-- 个人中心 -->
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>

// 样式导入
@import "../../common/stylus/mixin.styl";
@import "../../common/stylus/variable.styl";

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;

  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    bg-image('logo');
    // background-image: url('logo@2x.png')
    background-size: 30px 32px;
  }

  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }

  .mine {
    position: absolute;
    top: 0;
    right: 0;

    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>
