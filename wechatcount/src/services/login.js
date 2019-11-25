import request from '@/utils/request';

/**
 * login 登录
 * @param mobile 电话号码
 * @param password 密码
 */
export async function login(params) {
    const { mobile, password } = params;
    return request('/login/login', {
        method: 'POST',
        data: {
            mobile,
            password,
        },
    });
}

/**
 * getToken 生成token
 * @param mobile 手机号
 */
export async function getToken(params) {
    const { mobile } = params;
    return request('/login/getToken', {
        method: 'POST',
        data: { mobile },
    });
}

/**
 * @param logOut [注销]
 *  @author majing
 */
export async function logOut() {
    return request('/login/logOut', { method: 'GET' });
}
