export default [
    // User
    {
        path: '/',
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
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            {
                path: '/',
                redirect: '/systemManage/userManage',
                authority: ['admin', 'super', 'agent', 'customer'],
            },
            {
                path: '/systemManage',
                name: 'systemManage',
                icon: 'home',
                component: './SystemManage',
                authority: ['admin', 'super', 'agent', 'customer'],
                routes: [
                    {
                        path: '/systemManage',
                        redirect: '/systemManage/userManage',
                    },
                    {
                        path: '/systemManage/userManage',
                        name: 'userManage',
                        component: './SystemManage/UserManage/List',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/systemManage/userManage/detail',
                                component: './SystemManage/UserManage/Detail',
                                name: 'detail',
                            },
                        ],
                    },
                    {
                        path: '/systemManage/coupon',
                        name: 'coupon',
                        component: './SystemManage/Coupon',
                        authority: ['admin', 'super', 'agent'],
                        hideChildrenInMenu: true,
                    },
                ],
            },
            {
                path: '/adminManage',
                name: 'adminManage',
                authority: ['super'],
                icon: 'team',
                component: './AdminManage',
            },
            {
                path: '/personalCenter',
                name: 'personalCenter',
                authority: ['admin', 'super', 'agent', 'super'],
                component: './PersonalCenter',
                hideInMenu: true,
            },
            { component: './404.js' },
        ],
    },
];
