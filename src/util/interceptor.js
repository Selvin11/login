import axios from 'axios'
import router from '@/router'
import store from '@/store'

axios.default.timeout = 5000



// axios拦截响应
axios.interceptors.response.use(response => {
    if (!response.data.session.user) {
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