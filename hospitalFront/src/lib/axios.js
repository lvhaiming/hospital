import Axios from 'axios'
import Vue from 'vue'

Axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器
Axios.interceptors.request.use(config => {
    Vue.prototype.$Loading.start()
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(response => {
    Vue.prototype.$Loading.finish()
    return response;
}, error => {
    Vue.prototype.$Loading.error()
    Vue.prototype.$Message.error('请求失败，请联系管理员')
    return error
})

export default Axios