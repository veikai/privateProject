import { message } from 'antd';
import { addAdmin, getAdmins, setPassword } from '@/services/admin';

export default {
    namespace: 'admin',
    state: {
        /** 管理员列表信息 */
        adminsTotal: 0,
        admins: [],

    },
    effects: {
        /** 新增管理员 */
        * addAdmin({ payload, callBack = null }, { call }) {
            const response = yield call(addAdmin, payload);
            if (response.code == 200) {
                message.success('新增成功');
                if (callBack) callBack();
            } else if (response.code == 304) {
                message.info(response.msg);
            } else {
                message.error('新增失败');
            }
        },
        /** 获取管理员列表 */
        * getAdmins({ payload, callBack }, { call, put }) {
            const response = yield call(getAdmins, payload);
            if (response.code == 200) {
                const { result: { adminsTotal = 0, admins = [] } } = response;
                yield put({
                    type: 'setState',
                    payload: { adminsTotal, admins },
                });
                if (callBack) callBack();
            } else {
                message.error(response.msg);
            }
        },
        /** 修改管理员密码 */
        * setPassword({ payload, callBack }, { call }) {
            const response = yield call(setPassword, payload);
            if (response.code == 200) {
                if (callBack) callBack();
                message.success('修改成功');
            } else {
                message.error(response.msg);
            }
        },
    },

    reducers: {
        /** 修改全局数据 */
        setState(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
};
