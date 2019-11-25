import request from '@/utils/request';

/**
 * getGlobalInfo [获取oa全局信息]
 * @author Terrence
 */
export async function getGlobalInfo() {
    return request('/login/getGlobalInfo');
}

export default getGlobalInfo;
