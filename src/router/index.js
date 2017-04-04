import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
import store from '@/store/index.js'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        // 路由元信息 meta
        meta: {
            requireLogin: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Home
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }]
})

// 设置路由拦截
// 在vue-router的全局钩子中设置拦截 
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
// 不考虑刷新浏览器的情况，
// 实现了在各个需要登录和不需要登录状态之间跳转的拦截
// 底部是另外两个拦截条件不同的路由拦截方案，仅记录当时的思考

// router.beforeEach((to, from, next) => {
//     if (to.meta.requireLogin) {
//         // 通过判断状态中是否存在user.name
//         // 浏览store中的代码即可了解
//         // 此次实例简化了state，只将流程跑通
//         // !! 但是只通过vuex维护的全局状态中是否含有user信息
//         // 当浏览器刷新时，所有状态将被清空，每次都会被重定向至登录页，
//         // 因此有了http拦截的意义，底部有解释
//         if (store.state.user.name) {
//             next();
//         } else {
//             // next({path:xxx})当前的导航被中断，然后进行一个新的导航
//             next({
//                 path: '/login',
//                 // $router.path 
//                 // 一个 key/value 对象，表示 URL 查询参数。
//                 // 例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
//                 // 如果没有查询参数，则是个空对象。
//                 // 假设一开始进入 / (首页)并且没有登录 ，则next进行跳转的路由为/login 
//                 // 之后登录成功 则redirect => to.fullPath（即为开始进入的路由） => / (首页)
//                 query: {
//                     redirect: to.fullPath
//                 }
//                 // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                 // $router.fullPath 完成解析后的 URL，包含查询参数和 hash 的完整路径
//             })
//         }
//     } else {
//         next();
//     }
// })


// 至此所有路由完成拦截
// 但是这种方式只是简单的前端路由控制
// 并不能真正阻止用户访问需要登录权限的路由，而且存在以下问题
// 1. 任何路由都是可以进行访问，只是进入后会被强制跳转到登录页
// 2. 当浏览器刷新时，每次都会被重定向至登录页，因为状态会被清空
// 3. 当服务端的session失效时，但保存在本地localStorage中的user信息无法根据时效自动消除
// ——————解决方案—————— 
// 起初，我的方案是在需要登录的页面，比如首页，
// 在created钩子函数中，
// 请求后端一个获取session的api，只要页面刷新就会传递请求，
// 如果session失效，则返回错误代码，前端接受后即可清除掉本地localStorage中的user信息
// 但问题显而易见，当需要登录状态的路由较多时，需要每一个都设置，


// 因此需要一个可以全局挂载的http请求拦截 使用axios中的Interceptors（拦截器）模块，在全局请求使用上面的流程
// /util/interceptor.js  实现了axios的响应拦截



// 路由拦截的另外两种方案思考
// 方案一
// 在里面请求后端一个获取session的api

// router.beforeEach((to, from, next) => {

//     if (to.meta.requireLogin) {
//         // 向后端请求获取session的api
//         axios.get('/api')
//             .then(res => {
//                 // console.dir(res.data)
//                 if (res.data.error) {
//                     next({
//                         // 如果session失效，则跳转至登录页
//                         path: '/login',
//                         // 跳转后将跳转前的url赋值给参数redirect
//                         query: {
//                             redirect: to.fullPath
//                         }
//                     })
//                 } else {
//                     next();
//                 }
//             })
//             .catch(err => {
//                 console.dir(err);
//             })

//     } else {
//         next();
//     }
// })

// 方案二：
// 根据localStorage是否存在为判断依据，
// 因为每次进入需要登录状态的页面，(参见home.vue以及store/mutations.js)
// 已经对获取session的api进行了访问，因此方案一增加了请求次数
// router.beforeEach((to, from, next) => {
//     let session = localStorage.getItem('session')
//     if (to.meta.requireLogin) {
//         if (session) {
//             next();
//         } else {
//             next({
//                 path: '/login',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             })
//         }

//     } else {
//         next();
//     }
// })


export default router;