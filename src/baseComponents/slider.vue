<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
			<!-- 插槽: 被替换内容 -->
      <slot></slot>
    </div>
    <!-- <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  // 配置组件props值, 外部控制组件属性
  props: {
    loop: {
      type: Boolean,
      default: true // 轮播
    },
    autoPlay: {
      type: Boolean,
      default: true // 自动轮播
    },
    interval: {
      type: Number,
      default: 3000 // 间隔时间
    }
	},
	// 组件数据
  
	// 虚拟dom挂载的钩子
	mounted() {
		
	},
	// 方法属性
	methods: {
		// 轮播图横向滚动; 给slider盒子设置宽度,初始化slider
		setSliderWidth() {

		},
		initSlider() {

		}
	},
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// 样式导入
@import '../common/stylus/variable.styl';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>