# vue-music

基于vue + webpack + vuex 实现模仿 QQ音乐播放器
下载安装依赖就可以跑起来了...

## vue-music项目过程记录

### 1.需求分析

页面划分; 页面实现的功能点; 页面之间的关联; 实现细节等

    主页面: 
    推荐页面:
    歌手页面:
    排行页面:
    搜素页面:
    播放器内核页面: 
    播放列表页面:
    添加歌曲页面:
    用户中心页面:

## 2.搭建环境

    脚手架快速搭建项目: vue init webpack vue-music
    主要项目目录介绍:
        /src: 主要项目文件
            /api: 请求接口的
            /common: 通用的静态资源
                /fonts
                /image
                /stylus
                /js: 封装的基础方法
            /components: 业务组件
            /baseComponents: 基础组件
            /router: 路由
            /store: vuex

    webpack.base.js中的设置
        // 目录的别名设置, 
        // 通过path模块的resolve方法的参数,不设置就传绝对路径
        alias: {
        '别名': resolve('替代的路径名')
        举个栗子:
        '@': resolve('src'),
        }

    ESlint配置rules规范
        https://juejin.im/post/5afede99f265da0b82630af8

## 3.主页面

    问题1: stylus文件打包错误;无法解析变量; 原因是main.js直接将导入的styl文件解析为css, 需要在util.js中配置路径选项
    解决方案:
        const stylusOptions = {
            import: [
                path.join(__dirname, "../src/common/stylus/variable.styl") // variable.styl全局变量文件
            ],
            paths: [
                path.join(__dirname, "../src/common/"),
                path.join(__dirname, "../")
            ]
        }
        
    问题2: 路由link更改默认标签a,  使用tag属性="div", 方便写样式
    利用 动态路由传参... :参数

## 4.公共方法封装

    1.原生jsonp的Promise封装
        function jsonp(url, data, option) {
            return new Promise((resolve, reject) => {
                调用原生jsonp, 对回调结果进行处理
            }
        )}

## 5.基础组件实现

    1.轮播图组件封装
        基于better-scroll + 生命周期钩子mounted实现 + 类名操作方法封装
        这里使用了 slot插槽, 因为在推荐页直接拿到了图片数据, 为避免先子组传值
        可以使用插槽先将数据 绑定到slot上, 但slider的相关操作还是在 slider组件中执行
        
        // 坑点: 注意渲染的时间和顺序; 请求数据为异步,此时mounted已加载出来了; 图片尺寸需要在渲染后才能获取到, 
        然后才能给slider盒子设置尺寸
        这里注意: 需要对返回的图片数据做一个判断
        
        // keep-alive 去缓存轮播图DOM...
        // 在destory中 清除轮播的定时器
        // 使用setTimeout完成自动轮播: 在上一张图片滑动结束时, 清空定时器,继续调用play

    2.scroll滑动组件
        基于 better-scroll + slot插槽 实现组件封装复用
        注意点同上: 
            注意DOM的渲染时机, 因为better-scroll是基于获取到的DOM尺寸来实现 相关的初始化的, 我们请求来的图片都是一个异步请求过程, 所以需要确保 图片在真实渲染后才去初始化 scroll

        优化点: 图片尺寸只需要获取一次 load方法

## 6.推荐页面

    1. 项目报错信息记录: 编译报错 更改vue-loader库中的parser-babel
    2. Vuex中 在组件中添加 动态新属性时 vuex不会跟踪, 需要使用this.$set(obj, key, v)
        来添加 属性的双向绑定
    3. router配置 meta 元信息字段: 在导航守卫中 用作判断条件

## 7.node + express 实现反向代理解决 后台接口访问限制问题

    referer:HTTP referer 是header的一部分，当浏览器向Web服务器发送请求的时候，一般会带上referer，告诉服务器我是从哪个页面过来的，服务器基于此可以获得一些信息进行处理，当然服务器可以检查请求来源页面的host和referer，并做相应的限制

    问题1: 使用jsonp跨域是; 会出现由于 referer 和 host 限制无法访问服务器资源
    解决:  Vue中使用反向代理模拟http请求中host和referer，绕过Web服务器对请求的限制
        使用express配置路由
        
        axios去请求本地node+express开启的服务的接口, express 设置referer和host后转发到目标服务器

    问题2: vue配置跨域     
        在webpack的配置config中的 proxyTable属性
        本质上还是 利用了express的http-proxy-middle中间件 去代理发请求 
        proxyTable: {
            '/api': {
            // 测试环境
            target: 'http://www.demo.com/',  // 我们要请求的接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/api': ''   //需要rewrite重写的,
            }              
        }
        在需要请求的页面，只需要这样写(/api/具体请求参数)  可以用fetch 或 axios
