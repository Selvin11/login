import axios from 'axios'
import router from '@/router'
import store from '@/store'

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'


// axios拦截请求
axios.interceptors.request.use(
    config => {
        // 判断localStorage是否存在token，如果存在的话，则每个http header都加上token
        if (localStorage.getItem('token')) {
            config.headers.Authorization = `token ${localStorage.getItem('token')}`
                .replace(/(^\")|(\"$)/g, '')
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

// axios拦截响应
axios.interceptors.response.use(response => {
    return response
}, err => {
    return Promise.reject(err)
})

export default axios;