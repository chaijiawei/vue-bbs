import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Vue.use(Router)
const baseUrl = process.env.BASE_URL

const routes = [
    //登录注册
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        alias: '/topics',
        meta: {title: '话题列表'},
    },
    {
        path: '/auth/register',
        name: 'auth.register',
        component: () => import('@/views/auth/Register'),
        meta: {title: '注册页'},
    },
    {
        path: '/auth/login',
        name: 'auth.login',
        component: () => import('@/views/auth/Login'),
        meta: {title: '登录页'},
    },

    //用户
    {
        path: '/users/:id/edit',
        component: () => import('@/views/users/Edit'),
        props: true,
        meta: {title: '编辑资料'},
        children: [
            {
                path: '',
                name: 'users.profileEdit',
                component: () => import('@/views/users/ProfileEdit')
            },
            {
                path: 'password',
                name: 'users.passwordEdit',
                component: () => import('@/views/users/PasswordEdit'),
                meta: {title: '修改密码'},
            }
        ]
    },

    //文章
    {
        path: '/articles/create',
        name: 'articles.create',
        component: () => import('@/views/articles/CreateAndEdit'),
        meta: {title: '发布文章'},
    },
    {
        path: '/articles/:id/edit',
        name: 'articles.edit',
        props: true,
        component: () => import('@/views/articles/CreateAndEdit'),
        meta: {title: '编辑文章'}
    },
    {
        path: '/column/:userId',
        props: true,
        component: () => import('@/views/articles/Column'),
        children: [
            {
                path: '',
                name: 'column.list',
                props: true,
                component: () => import('@/views/articles/List')
            },
            {
                path: 'articles/:id/show',
                name: 'articles.show',
                props: true,
                component: () => import('@/views/articles/Show'),
            },
        ]
    },

    //搜索
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/Search')
    },

    //分类
    {
        path: '/category/:categoryId',
        name: 'category',
        props: true,
        component: () => import('@/views/Home'),
    },
]

const router = new Router({
    mode: 'history',
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active',
    base: baseUrl,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
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
