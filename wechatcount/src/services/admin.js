import request from '@/utils/request';

/**
 * addAdmin [新增管理员]
 * @author majing
 * @param {string} email [管理员邮箱]
 * @param {string} mobile [管理员手机号]
 * @param {string} name [管理员名称]
 * @param {string} role [管理员类型]
 */
export async function addAdmin(params) {
    const { email = '', mobile = '', name = '', role = '' } = params;
    return request('/admin/addAdmin', { method: 'POST', data: { email, mobile, name, role } });
}

/**
 * getAdmins [获取管理员列表]
 * @author majing
 * @param {string} page [当前页]
 * @param {string} pageSize [每页总数]
 */
export async function getAdmins(params) {
    const { page = 1, pageSize = 10 } = params;
    return request('/admin/getAdmins', { method: 'POST', data: { page, pageSize } });
}

/**
 * setPassword [修改密码]
 * @author majing
 * @param {string} password [旧密码]
 * @param {string} newPassword [新密码]
 */
export async function setPassword(params) {
    const { password = '', newPassword = '' } = params;
    return request('/admin/setPassword', { method: 'POST', data: { password, newPassword } });
}
