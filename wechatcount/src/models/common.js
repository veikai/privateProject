export default {
    namespace: 'common',

    state: {
        /** 登陆成功后弹出提示框 */
        loginSuccessVisible: false,
    },

    // effects: {
    //     /** 获取全局信息 */
    //     * getGlobalInfo(_, { call, put }) {
    //         const response = yield call(getGlobalInfo);
    //         const { data = [] } = response;
    //         yield put({
    //             type: 'setState',
    //             payload: { data },
    //         });
    //     },
    //     /** 获取当前用户的角色(用于权限管理) */
    //     * getRole({ callBack }, { select }) {
    //         const role = yield select(state => state.global.role);
    //         if (callBack) callBack(role);
    //     },
    // },

    reducers: {
        /** 更新数据 */
        setState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
