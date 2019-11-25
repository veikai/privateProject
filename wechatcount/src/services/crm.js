import request from '@/utils/request';

/**
 * getAnalystic [获取统计数据]
 * @author majing
 */
export async function getAnalystic() {
    return request('/crm/getAnalystic', { method: 'GET' });
}

/**
 * getUsers [获取用户管理列表]
 * @author majing
 * @param {string} page [页数]
 * @param {string} pageSize [页面条数]
 * @param {string} searchKey [搜索关键词]
 * @param {string} admin [用户来源]
 * @param {string} userRole [用户类型]
 * @param {array} registerTime [注册时间]
 * @param {array} vipStartTime [会员开始时间]
 * @param {array} vipEndTime [会员到期时间]
 */
export async function getUsers(params) {
    const { page = '', pageSize = '', searchKey = '', admin = '', customer = '', userRole = '', registerTime = [], vipStartTime = [], vipEndTime = [] } = params;
    return request('/crm/getUsers', {
        method: 'POST',
        data: {
            page,
            pageSize,
            searchKey,
            admin,
            customer,
            userRole,
            registerTime: JSON.stringify(registerTime),
            vipStartTime: JSON.stringify(vipStartTime),
            vipEndTime: JSON.stringify(vipEndTime),
        },
    });
}

/** 查询详情信息 */
export async function getUserInfo(payload) {
    const { id } = payload;
    return request('/crm/getUserInfo', { method: 'POST', data: { user_id: id } });
}

/**
 * setUserInfo 设置用户信息
 * @author Terrence
 * @param {*} payload
 */
export async function setUserInfo(payload) {
    return request('/crm/setUserInfo', {
        method: 'POST',
        data: { ...payload },
    });
}

/**
 * setCustomer 设置用户客服信息
 * @author Terrence
 * @param string userId 用户id
 * @param string customerId 客服id
 */
export async function setCustomer(params) {
    const { userId = 0, customerId = 0 } = params;
    return request('/crm/setCustomer', {
        method: 'POST',
        data: { userId, customerId },
    });
}
