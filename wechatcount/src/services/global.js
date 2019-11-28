import request from '@/utils/request';

/**
 * getGlobalInfo [获取oa全局信息]
 * @author Terrence
 */
export async function getGlobalInfo() {
    return request('http://106.14.21.166:8080/query_account', { method: 'POST' });
}

export default getGlobalInfo;
