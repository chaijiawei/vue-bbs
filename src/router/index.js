import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
    {
        path: '/users/:id/edit',
        name: 'user.edit',
        component: () => import('@/views/users/Edit'),
        props: true,
        children: [
            {
                path: '',
                component: () => import('@/views/users/ProfileEdit')
            },
            {
                path: 'password',
                component: () => import('@/views/users/PasswordEdit')
            }
        ]
    }
]

const router = new Router({
    mode: 'history',
    routes,
    linkExactActiveClass: 'active',
})

export default router
