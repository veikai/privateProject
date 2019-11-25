import { message } from 'antd';
import { getUsers, getAnalystic, setCustomer, getUserInfo, setUserInfo } from '@/services/crm';
import { emptyOrBlank } from '@/utils/common';

export default {
    namespace: 'crm',
    state: {
        /** 用户列表信息 */
        users: [],
        usersTotal: 0,

        /** 统计信息数据 */
        anaTotal: {}, /** 总共分析数据 */
        anaToday: {}, /** 今日分析数据 */
        anaSeven: {}, /** 七天分析数据 */

        /** 用户公司信息开始 */
        companyAddress: '', /** 公司地址 */
        companyDomain: '', /** 公司域名 */
        companyProduct: '', /** 公司经营产品 */
        compamyName: '', /** 公司名称 */
        /** 用户公司信息结束 */

        /** 用户合同信息开始 */
        orderCreateDate: '', /** 合同创建时间 */
        orderPackage: '', /** 合同套餐 */
        orderPrice: '', /** 合同金额 */
        orderAdmin: '', /** 合同签单人员 */
        orderVipStartTime: '', /** 合同会员开始时间 */
        orderVipEndTime: '', /** 合同会员结束时间 */
        orderMemo: '', /** 合同备注信息 */
        /** 用户合同信息结束 */

        /** 用户个人信息开始 */
        name: '', /** 用户名称 */
        mobile: '', /** 用户电话 */
        vipEndTime: '', /** 用户会员到期时间 */
        qq: '', /** 用户qq信息 */
        email: '', /** 用户邮件信息 */
        /** 用户个人信息结束 */

    },
    effects: {
        /** 获取分析数据 */
        * getAnalystic({ payload, callBack = null }, { call, put }) {
            const response = yield call(getAnalystic, payload);
            if (response.code == 200) {
                const { result: { total = {}, today = {}, seven = {} } } = response;
                yield put({
                    type: 'setState',
                    payload: { anaTotal: total, anaToday: today, anaSeven: seven },
                });
                if (callBack) callBack();
            }
        },
        /** 获取用户列表 */
        * getUsers({ payload, callBack = null }, { call, put }) {
            const response = yield call(getUsers, payload);
            if (response.code == 200) {
                yield put({
                    type: 'setState',
                    payload: {
                        users: emptyOrBlank(response, 'result', []),
                        usersTotal: emptyOrBlank(response, 'count', 0),
                    },
                });
                if (callBack) callBack();
            }
        },
        /** 设置用户客服信息 */
        * setCustomer({ payload, callBack = null }, { call }) {
            const response = yield call(setCustomer, payload);
            if (response.code == 200) {
                message.success('修改成功');
                if (callBack) callBack();
            } else {
                message.error(response.msg);
            }
        },
        /** 获取用户详情 */
        * getUserInfo({ payload }, { call, put }) {
            const response = yield call(getUserInfo, payload);
            if (response.code == 200) {
                const { result: { company = {}, order = {}, user = {} } } = response;
                yield put({
                    type: 'setState',
                    payload: {
                        ...user,
                        /** 用户公司信息 */
                        compamyName: emptyOrBlank(company, 'name', ''),
                        compamyAddress: emptyOrBlank(company, 'address', ''),
                        companyDomain: emptyOrBlank(company, 'domain', ''),
                        companyProduct: emptyOrBlank(company, 'product', ''),
                        /** 用户合同信息 */
                        orderCreateDate: emptyOrBlank(order, 'createdate', ''), /** 合同创建时间 */
                        orderPackage: emptyOrBlank(order, 'package', ''), /** 合同套餐 */
                        orderPrice: emptyOrBlank(order, 'price', ''), /** 合同金额 */
                        orderAdmin: emptyOrBlank(order, 'admin', ''), /** 合同签单人员 */
                        orderVipStartTime: emptyOrBlank(order, 'vipStartTime', ''), /** 合同会员开始时间 */
                        orderVipEndTime: emptyOrBlank(order, 'vipEndTime', ''), /** 合同会员结束时间 */
                        orderMemo: emptyOrBlank(order, 'memo', ''), /** 合同备注信息 */
                    },
                });
            }
        },
        /** 修改用户详情 */
        * setUserInfo({ payload, callBack }, { call }) {
            const response = yield call(setUserInfo, payload);
            if (response.code == 200) {
                message.success('编辑成功');
                if (callBack) callBack();
            } else {
                message.error('修改失败');
            }
        },
        /** 清空用户信息 */
        * emptyUserInfo(_, { put }) {
            yield put({
                type: 'setState',
                payload: { name: '', mobile: '', vipEndTime: '', qq: '', email: '', companyAddress: '', companyDomain: '', companyProduct: '', compamyName: '', orderCreateDate: '', orderPackage: '', orderPrice: '', orderAdmin: '', orderVipStartTime: '', orderVipEndTime: '', orderMemo: '' },
            });
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
