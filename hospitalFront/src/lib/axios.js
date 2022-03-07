import Axios from 'axios'
import Vue from 'vue'

Axios.defaults.baseURL = 'http://localhost:3000'
// 添加响应拦截器
Axios.interceptors.response.use(response => {
    return response;
}, error => {
    Vue.prototype.$Message.error('请求失败，请联系管理员')
})

export default Axios