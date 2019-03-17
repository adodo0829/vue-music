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

## 6.推荐页面

    1. 项目报错信息记录: 编译报错 更改vue-loader库中的parser-babel
    2. Vuex中 在组件中添加 动态新属性时 vuex不会跟踪, 需要使用this.$set(obj, key, v)
        来添加 属性的双向绑定
    3. router配置 meta 元信息字段: 在导航守卫中 用作判断条件