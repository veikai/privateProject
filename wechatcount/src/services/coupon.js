import request from '@/utils/request';

/**
 * getCoupons [获取优惠券列表]
 * @author majing
 * @param {string} keywords [搜索的关键词]
 * @param {string} curPage [当前页]
 * @param {string} pageSize [一页总数]
 */
export async function getCoupons(params) {
    const { keywords, page, pageSize } = params;
    return request('/coupon/getCoupons', {
        method: 'POST',
        data: {
            keywords,
            page,
            pageSize,
        },
    });
}

/**
 * delCoupon [删除指定优惠券]
 * @author majing
 * @param {string} id [优惠券ID]
 */
export async function delCoupon(params) {
    const { id } = params;
    return request('/coupon/delCoupon', {
        method: 'POST',
        data: { id },
    });
}


/**
 * addCoupon [添加优惠券]
 * @author majing
 * @param {string} invalidDate [优惠券失效时间]
 * @param {string} validDate [优惠券生效时间]
 * @param {string} mobile [优惠券电话]
 * @param {string} price [优惠金额]
 * @param {string} packageId [使用的套餐id]
 */
export async function addCoupon(params) {
    const { invalidDate, validDate, mobile, price, packageId } = params;
    return request('/coupon/addCoupon', {
        method: 'POST',
        data: { invalidDate, validDate, mobile, price, packageId },
    });
}


/**
 * addCoupons [批量添加优惠券]
 * @author majing
 * @param {string} agent [代理商id]
 * @param {string} count [优惠券数量]
 * @param {string} price [优惠券金额]
 * @param {string} packageId [优惠券使用限制套餐]
 * @param {string} validDate [优惠券失效时间]
 * @param {string} invalidDate [优惠券生效时间]
 */
export async function addCoupons(params) {
    const { ownerAdmin, count, price, packageId, validDate, invalidDate } = params;
    return request('/coupon/addCoupons', {
        method: 'POST',
        data: { ownerAdmin, count, price, packageId, validDate, invalidDate },
    });
}
