import { getGlobalInfo } from '@/services/global';

export default {
    namespace: 'global',

    state: {
        collapsed: false,
        /** 套餐列表信息 */
        packages: {},
        /** 管理员列表信息(包括 代理商, 管理员, 客服, 销售 信息) */
        admins: {},
        /** 当前登录管理员账号信息 */
        admin: {},
    },

    effects: {
        /** 获取全局信息 */
        * getGlobalInfo(_, { call, put }) {
            const response = yield call(getGlobalInfo);
            const { result: { admin = [], admins = [], packages = [] } } = response;
            yield put({
                type: 'setState',
                payload: { admin, admins, packages },
            });
        },
        /** 获取当前用户的角色(用于权限管理) */
        * getRole({ callBack }, { select }) {
            const role = yield select(state => state.global.role);
            if (callBack) callBack(role);
        },
    },

    reducers: {
        /** */
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        /** 更新数据 */
        setState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
