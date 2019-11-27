import router from 'umi/router';
import { message } from 'antd';
import { login, register, logOut } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
    namespace: 'login',

    state: { },

    effects: {
        /** USER登录方法 */
        * login({ payload, callBack = null }, { call }) {
            const response = yield call(login, payload);
            // 登录成功
            if (response.code === 1) {
                /** 设置权限 */
                setAuthority(response.role);
                reloadAuthorized(response.role);
                message.success('登录成功');
                if (callBack) callBack();
            } else {
                message.error('登录失败');
            }
        },
        /** USER注册方法 */
        * register({ payload, callBack = null }, { call }) {
            const response = yield call(register, payload);
            // 登录成功
            if (response.code === 1) {
                /** 设置权限 */
                setAuthority(response.role);
                reloadAuthorized(response.role);
                message.success('注册成功');
                /** 更新全局信息 */
                router.push('/login');
                if (callBack) callBack();
            } else {
                message.error(response.err);
            }
        },
        /** 注销 */
        * logOut(_, { call }) {
            const response = yield call(logOut);
            if (response.code == 200) {
                message.success('您已退出');
                router.push('/login');
            }
        },
    },

    reducers: {
        /** 更新数据 */
        setState(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
