import request from '@/utils/request';

/**
 * getUsers 获取用户列表
 * @author Terrence
 * @param string searchKey 搜索的关键词
 * @param string state 搜索的状态
 */
export async function getUsers(params) {
    const { searchKey = '', state = 0 } = params;
    return request('http://119.23.79.73:8080/manage/query_account', {
        method: 'POST',
        data: JSON.stringify({
            key: searchKey,
            state: Number(state),
        }),
    });
}

/**
 * setUser 更新用户信息
 * @author Terrence
 * @param string searchKey 搜索的关键词
 * @param string state 搜索的状态
 */
export async function setUser(params) {
    const { ids = [], state = 0, deadline = '' } = params;
    return request('http://119.23.79.73:8080/manage/update_account', {
        method: 'POST',
        data: JSON.stringify({
            accounts: ids,
            state,
            deadline,
        }),
    });
}

export default getUsers;
