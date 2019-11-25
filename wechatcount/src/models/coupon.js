import { message } from 'antd';
import { getCoupons, delCoupon, addCoupon, addCoupons } from '@/services/coupon';

export default {
    namespace: 'coupon',

    state: {
        coupons: [], /** 优惠券列表 */
        couponsTotal: 0, /** 优惠券列表总数 */
        keywords: '', /** 优惠券列表搜索的关键词 */
    },

    effects: {
        /** 获取优惠券列表 */
        * getCoupons({ payload, callBack = null }, { call, put }) {
            const response = yield call(getCoupons, payload);
            if (response.code == 200) {
                const { result = [], totalCount = 0 } = response;
                /** 更新列表数据 */
                yield put({ type: 'setState', payload: { coupons: result, couponsTotal: totalCount } });
                if (callBack) callBack();
            }
        },
        /** 删除优惠券 */
        * delCoupon({ payload, callBack = null }, { call }) {
            const response = yield call(delCoupon, payload);
            if (response.code == 200) {
                message.success('删除成功');
                if (callBack) callBack();
            }
        },
        /** 新增优惠券 */
        * addCoupon({ payload, callBack = null }, { call }) {
            const response = yield call(addCoupon, payload);
            if (response.code == 200) {
                /** 成功生成 */
                if (callBack) callBack(response);
                message.success('生成成功!');
            } else {
                message.error(response.msg);
            }
        },
        /** 批量添加优惠券 */
        * addCoupons({ payload, callBack = null }, { call }) {
            const response = yield call(addCoupons, payload);
            if (response.code == 200) {
                /** 成功生成 */
                if (callBack) callBack(response);
                message.success('生成成功!');
            } else {
                message.error(response.msg);
            }
        },
    },

    reducers: {
        /** 更新数据 */
        setState(state, { payload }) {
            return { ...state, ...payload };
        },
    },

    subscriptions: {
        /** 获取初始化值 */
        getCoupon({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname == '/systemManage/coupon') {
                    dispatch({ type: 'getCoupons', payload: { page: 1, pageSize: 10, keywords: '' } });
                }
            });
        },
    },
};
