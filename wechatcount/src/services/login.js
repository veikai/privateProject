import request from '@/utils/request';

/**
 * login 登录
 * @author Terrence
 * @param string name [用户名]
 * @param string password [密码]
 */
export async function login(params) {
    const { name = '', password = '', mobile = '' } = params;
    return request('http://106.14.21.166:8080/login', {
        method: 'POST',
        data: JSON.stringify({
            usr: name,
            pwd: password,
            type: 2,
            mobile,
        }),
    });
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
 * logOut 退出登录
 * @author Terrence
 */
export async function logOut() {
    return request('/login/logOut', { method: 'GET' });
}
