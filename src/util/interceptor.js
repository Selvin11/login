import axios from 'axios'
import router from '@/router'
import store from '@/store'

axios.default.timeout = 5000



// axios拦截响应
axios.interceptors.response.use(response => {
    // 后端的checkLogin返回的json数据作为跳转依据
    if (!response.data.session) {
        router.replace({
            path: 'login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    }
    return response
}, err => {
    return Promise.reject(err)
})

export default axios;