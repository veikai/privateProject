import request from '@/utils/request';

/**
 * getList 获取列表
 * @author Terrence
 */
export async function getList() {
    return request('http://106.14.21.166:8080/query_fans_data', { method: 'POST' });
}

/**
 * register 注册
 * @author Terrence
 * @param string name [用户名]
 * @param string password [密码]
 */
export async function register(params) {
    const { name, password } = params;
    return request('http://106.14.21.166:8080/register', {
        method: 'POST',
        data: JSON.stringify({
            usr: name,
            pwd: password,
        }),
    });
}

/**
 * getShareUrl 获取分享链接
 * @author Terrence
 */
export async function getShareUrl() {
    return request('http://106.14.21.166:8080/create_share_url', { method: 'POST' });
}

/**
 * logOut 退出登录
 * @author Terrence
 */
export async function logOut() {
    return request('/login/logOut', { method: 'GET' });
}
