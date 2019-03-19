// 导入axios
// import axios from 'axios';
// import Vue from 'vue';

// 设置基地址
// axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

// 实现axios拦截器
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     console.log('请求准备发了...');
//     // console.log(config);
//     // 给除了login页面的 其他请求添加token验证字段
//     if (!config.url.includes('login')) {
//         config.headers.Authorization = window.sessionStorage.getItem("token");
//     }
//     return config;

// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     console.log('请求回来了....');
    
//     if (response.data.meta.status === 200 || response.data.meta.status === 201) {
//         Vue.prototype.$message({
//             message: response.data.meta.msg,
//             type: 'success',
//             duration: 1000,
//             center: true
//         })
//     } else {
//         Vue.prototype.$message({
//             message: response.data.meta.msg,
//             type: 'error',
//             duration: 1000,
//             center: true
//         })
//     }
//     return response; // 页面中请求回来的res

// }, function (error) {
//     // 对响应错误做点什么
    
//     return Promise.reject(error);
// });

// 实现插件,实现install方法, 设置到 Vue原型上
// 暴露方法
// export default {
//     install(Vue) {
//         Vue.prototype.$http = axios
//     }
// }