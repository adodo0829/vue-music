<template>
    <!-- 引用 -->
    <div ref="wrapper">
        <!-- 插槽: 套用任何DOM -->
        <slot></slot>
    </div>
</template>

<script>
// 使用better-scroll
import BetterScroll from 'better-scroll';

export default {
    name: 'scroll',
    // 设置的传值
    props: {
        // 监听滚动事件
        probeType: {
            type: Number,
            default: 1
        },
        // 可点击
        click: {
            type: Boolean,
            default: true
        },
        // 初始化数据
        data: {
            type: Array,
            default: null
        }
    },
    mounted() {
        setTimeout(() => {
            this.initScroll()
        }, 20);
    },
    methods: {
        // 滚动条初始化方法
        initScroll() {
            // DOM存在判断
            if(!this.$refs.wrapper) return;

            this.scroll = new BetterScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
        },
        // 代理方法
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        }
    },
    // 监听父组件传过来的data设置
    watch: {
        data:function() {
            setTimeout(() => {
                // 刷新组件
                this.refresh()
            }, 20);
        }
    },
}
</script>

<style lang="stylus" scoped>

</style>
