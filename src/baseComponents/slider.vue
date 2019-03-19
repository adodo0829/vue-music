<template>
  <div class="slider" ref="slider" style="position: relative">
    <div class="slider-group" ref="sliderGroup">
      <!-- 插槽: 被替换内容 -->
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        :class="{active: currentPageIndex === index-1 }"
        v-for="(item, index) in dots"
        :key="index"
      ></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// 导入better-scroll插件
import BetterScroll from "better-scroll";
// 导入DOM操作类名
import { addClass } from "../common/js/handledom.js";

export default {
  name: 'slider',
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
      default: 2000 // 间隔时间
    }
	},
	// 组件数据
  data() {
    return {
      dots: [],
      currentPageIndex: -1
    }
  },
	// 虚拟dom挂载的钩子; 当图片渲染后再初始化 better-scroll
	mounted() {
    // 浏览器的刷新时间 16ms; 然后初始化组件
		setTimeout(() => {
      // 设置宽度
      this.setSliderWidth()
      // 设置小点
      this.initDots()
      // 调用初始化
      this.initSlider()
      // 开启自动轮播
      if (this.autoPlay) {
          this.play()
      }
    }, 100);
    // 监听窗口变化
    window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this.setSliderWidth(true)
        this.slider.refresh()
      })
  },
  // 定时器清除
  destroyed() {
    clearTimeout(this.timer)
  },
	// 方法属性
	methods: {
		// 轮播图横向滚动; 给slider盒子设置宽度,
		setSliderWidth(isResize) {
      // 操作图片的DOM元素
      // console.log(this.$refs.sliderGroup.children);
      this.children = this.$refs.sliderGroup.children
      // console.log(this.children);
      let totalWidth = 0
      // 单张图片宽度
      let sliderWidth = this.$refs.slider.clientWidth
      // console.log(this.$refs.slider.clientWidth);
      // console.log(sliderWidth);
      // 修改图片样式: 添加类名, 让图片一行显示
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        totalWidth += sliderWidth
      }
      // 如果需要循环轮播 宽度 * 2
      if (this.loop && !isResize) {
        totalWidth += 2 * sliderWidth
      }
      // 设置盒子总宽度
      this.$refs.sliderGroup.style.width = totalWidth + 'px'
      // console.log(this.$refs.sliderGroup.style.width);
    },
    // 初始化 dot长度
    initDots() {
      this.dots = new Array(this.children.length)
    },
    // 自动轮播
    play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        if (pageIndex == 5) {
          pageIndex = -1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
        
      },
    // 使用better-scroll初始化slider
		initSlider() {
      this.slider = new BetterScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {loop: this.loop},
          snapThreshold: 0.3,
          snapSpeed: 400,
          // click: true,
      });
      // 添加滚动事件
      this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          console.log(pageIndex);
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          // 使用 setTimeout 完成自动轮播
          if (this.autoPlay) {
            // 清除定时器, 继续 轮播
            clearTimeout(this.timer)
            this.play()
          }
        })
		}
	},
};


</script>

<style lang="stylus" scoped>
// 样式导入
@import '../common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      display: inline-block;
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
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: yellowgreen;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: yellow;
      }
    }
  }
}
</style>