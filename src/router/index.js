import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(Router)

export const router = new Router({
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
// 设置全局钩子 每个路由皆会执行下面的钩子函数
// to 进入 from 离开 next 传递

router.beforeEach((to, from, next) => {
    if (to.meta.requireLogin) {
        // 通过判断状态中是否存在user

        if (store.state.user) {
            next();
        } else {
            // next({path:xxx})当前的导航被中断，然后进行一个新的导航
            next({
                path: '/login',
                // $router.path 
                // 一个 key/value 对象，表示 URL 查询参数。
                // 例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
                // 如果没有查询参数，则是个空对象。
                // 假设一开始进入 / 并且没有登录 ，则next进行跳转的路由为/login 
                // 之后登录成功 则redirect => to.fullPath => /
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                // $router.fullPath 完成解析后的 URL，包含查询参数和 hash 的完整路径
            })
        }
    } else {
        next();
    }
})


// 至此所有路由完成拦截
// 但是这种方式只是简单的前端路由控制
// 并不能真正阻止用户访问需要登录权限的路由
// 即任何路由都是可以进行访问，只是进入后会被强制跳转到登录页


// 接下来便实现基于http请求与响应的拦截
// 即在请求前端路由时，同时也会与后端的API进行请求
// 在请求后端的同时，也设置判断关卡 
// ======= 向后端请求时的判断关卡流程 =====
// 访问后端api，首先会进行session验证
// 如果成功则会返回user信息
// 前端也会将其存在localStorage中
// 如果session失败，则返回错误信息，
// 前端也会将localStorage和state中的user信息清空
