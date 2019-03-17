<template>
    <!-- 推荐页结构 -->
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <!-- 插槽内容 slot: html替换 -->
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl">
              </a>
            </div>

          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <!-- <li @click="selectItem(item)" v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <!-- <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div> -->
    </scroll>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// 导入页面依赖包
import { getRecommendData } from "../../api/recommend.js"
import { noError } from "../../api/jsonpConfig.js";
// 导入基础组件: 轮播图
import slider from '../../baseComponents/slider';

export default {
    // 在created钩子中发请求
    created() {
        // 调用
        this.getRecommend()
    },
    // 组件数据
    data() {
        return {
            recommends: [] // 轮播图数据
        }
    },
    // 方法属性
    methods: {
        // 获取数据
        getRecommend() {
            // 调用 api中接口请求函数: 它返回的时一个promise对象
            getRecommendData().then(res => {
                if (res.code === noError) {
                  console.log(res.data.slider);
                  this.recommends = res.data.slider
                }
            })
        },
    },
    // 子组件注册
    components: {
        slider // 轮播图
    }
}
</script>

<style lang="stylus" scoped>
  // 导入样式
  @import "../../common/stylus/variable.styl"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        h1.list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>