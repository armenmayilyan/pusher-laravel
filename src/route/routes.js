import guest from "./middlweare/guest";
import auth from "./middlweare/auth";


export const routes = {
    mode: 'history',
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('../components/Register'),
            meta: {
                middleware: [
                    guest
                ]
            }
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login'),
            meta: {
                middleware: [
                    guest
                ]
            }
        },

        {
            path: '/home',
            name: 'home',
            component: () => import('../components/Home'),
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: `/post/:id`,
            name: 'post',
            component: () => import('../components/Post'),
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: '/created',
            name: 'created',
            component: () => import('../components/Created'),
            meta: {
                middleware: [
                    auth
                ]
            }
        },

    ]
}
