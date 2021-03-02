import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: {title: '主页'},
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register'),
        meta: {title: '注册页'},
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login'),
        meta: {title: '登录页'},
    },
    {
        path: '/users/:id/edit',
        component: () => import('@/views/users/Edit'),
        props: true,
        meta: {title: '编辑资料'},
        children: [
            {
                path: '',
                component: () => import('@/views/users/ProfileEdit')
            },
            {
                path: 'password',
                component: () => import('@/views/users/PasswordEdit'),
                meta: {title: '修改密码'},
            }
        ]
    }
]

const router = new Router({
    mode: 'history',
    routes,
    linkExactActiveClass: 'active',
})

//设置标题
router.beforeEach((to, from, next) => {
    _.forEach(to.matched, function(route) {
        if(route.meta && !_.isEmpty(route.meta.title)) {
            document.title = route.meta.title
        }
    })

    next()
})

export default router
