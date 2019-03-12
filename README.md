# vue-music

基于vue实现模仿 QQ音乐播放器
git remote add origin https://github.com/appleguardu/vue-music.git
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
        /api: 存放请求文件
        /common: 通用的静态资源文件
            /fonts
            /image
            /stylus
            /js
        /components: 通用组件文件
        /router: 路由文件
        /store: vuex文件

webpack.base.js中的设置
    // 目录的别名设置, 
    // 通过path模块的resolve方法的参数,不设置就传绝对路径
    alias: {
      '别名': resolve('替代的路径名')
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



