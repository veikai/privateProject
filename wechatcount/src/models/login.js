import router from 'umi/router';
import { message } from 'antd';
import { login, getToken, logOut } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
    namespace: 'login',

    state: { },

    effects: {
        /** USER登录方法 */
        * login({ payload, callBack = null }, { call, put }) {
            const response = yield call(login, payload);
            // 登录成功
            if (response.code === 200) {
                /** 设置权限 */
                setAuthority(response.role);
                reloadAuthorized(response.role);
                message.success('登录成功！');
                /** 更新全局信息 */
                yield put({ type: 'global/getGlobalInfo' });
                if (callBack) callBack();
            } else {
                message.error('登录失败！');
            }
        },
        /** 生成token */
        * getToken({ payload, callBack }, { call }) {
            const response = yield call(getToken, payload);
            if (response.code == 200) {
                if (callBack) callBack(response);
            } else {
                message.error('跳转失败，请重试！');
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
