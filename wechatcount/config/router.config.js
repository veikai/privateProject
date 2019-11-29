export default [
    /** login 登录页 */
    {
        path: '/login',
        component: '../layouts/UserLayout',
        routes: [
            {
                path: '/',
                redirect: '/login',
            },
            {
                path: '/login',
                name: 'login',
                component: './Login',
            },
            {
                path: '/login/register',
                name: 'register',
                component: './Login/Register',
            },
            { component: './404.js' },
        ],
    },
    /** 管理列表页 */
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            {
                path: '/',
                redirect: '/list/wechat',
            },
            {
                path: '/home',
                name: 'home',
                icon: 'home',
                component: './Home',
            },
            {
                path: '/list/wechat',
                name: 'wechat',
                icon: 'wechat',
                component: './List/Wechat',
            },
            { component: './404.js' },
        ],
    },
];
