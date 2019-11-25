import { message } from 'antd';

/**
 * isEmpty [判断一个值是否为空]
 * @author Terrence
 * @param string key [description]
 * @return 是否为空
 */
export function isEmpty(key) {
    const type = typeof key;
    if (type == 'undefined' || type == 'null') return true;
    if (type == 'string') {
        const res = key.replace(/(^\s*)|(\s*$)/g, '');
        if (res == '' || res == null || res == 'null' || res == undefined || res == 'undefined') { return true; }
        return false;
    }
    if (type == 'object') {
    /** 数组或者对象 */
        if (key == null) return true;
        if (Object.keys(key).length > 0) return false;
        return true;
    }
    if (type == 'boolean') return !key;
    if (type == 'number') return !key;
    return true;
}

/**
 * jsonDecode [解析json]
 * @author Terrence
 * @param string json [要进行解析的json字符串]
 * @param object defaultValue [解析失败时的默认结果]
 * @return 解析值
 */
export function jsonDecode(json = '', defaultValue = []) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return defaultValue;
    }
}

/**
 * emptyOrBlank [进行对象的判空处理，返回一个默认值]
 * @author Terrence
 * @param object object [要进行判空的对象]
 * @param string key [要进行判空的对象的键名]
 * @param any defaultValue [若是为空要进行设置默认值]
 * @param boolean isJson [是不是要进行解json操作]
 * @return 解析值
 */
export function emptyOrBlank(object, key, defaultValue = '', isJson = false) {
    if (Object.prototype.hasOwnProperty.call(object, key) && !isEmpty(object[key])) {
    /** 若是键存在且键值不为空 */
        if (isJson) {
            /** 若是要解json */
            return jsonDecode(object[key], defaultValue);
        } /** 直接读值 */
        return object[key];
    }
    return defaultValue;
}

/**
 * 存储 Session
 */
export function setSession(name, content) {
    if (isEmpty(name)) return false;
    if (typeof content !== 'string') {
        return window.sessionStorage.setItem(name, JSON.stringify(content));
    }
    return window.sessionStorage.setItem(name, content);
}
/**
 * 获取 Session
 */
export function getSession(name) {
    if (!name) return '';
    return window.sessionStorage.getItem(name) ? window.sessionStorage.getItem(name) : '';
}
/**
 * 清除 Session
 */
export function clearSession() {
    window.sessionStorage.clear();
}

/**
 * 随机生成颜色
 * @author majing
 * @return 解析值
 */
export function getRandomColor() {
    const c1 = Math.floor(Math.random() * 255);
    const c2 = Math.floor(Math.random() * 255);
    const c3 = Math.floor(Math.random() * 255);
    return `rgb(${c1},${c2},${c3})`;
}

/**
 * 过滤社媒平台名称
 * @author majing
 * @param string platName [社媒平台名称]
 * @return 解析值
 */
export function filterPlatForm(item) {
    const result = {};
    if (typeof (item) == 'string') {
        result.isMain = true;
        const sign = item.toLowerCase();
        switch (sign) {
        case 'facebook':
        case 'facebookpage':
            result.platForm = 'facebook';
            result.bgColor = '#4167B2';
            result.icon = 'icon-facebook2';
            result.iconUnUse = 'icon-facebook-';
            break;
        case 'linkedin':
        case 'linkedincompany':
            result.platForm = 'linkedin';
            result.bgColor = '#0084B1';
            result.icon = 'icon-linkedin';
            result.iconUnUse = 'icon-linkedin0';
            break;
        case 'twitter':
            result.platForm = 'twitter';
            result.bgColor = '#1DA1F3';
            result.icon = 'icon-twitter';
            result.iconUnUse = 'icon-Twitter-';
            break;
        case 'youtube':
        case 'youtubechannel':
            result.platForm = 'youtube';
            result.bgColor = '#db332e';
            result.icon = 'icon-youtube';
            result.iconUnUse = 'icon-333';
            break;
        case 'pinterest':
            result.platForm = 'pinterest';
            result.bgColor = '#d53031';
            result.icon = 'icon-pinterest';
            result.iconUnUse = 'icon-pinterest2';
            break;
        case 'instagram':
            result.platForm = 'instagram';
            result.bgColor = '#d4237a';
            result.icon = 'icon-instagram';
            result.iconUnUse = 'icon-instagram1';
            break;
        default:
            result.platForm = item;
            result.bgColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
            result.icon = 'icon-companyreg';
            result.iconUnUse = 'icon-companyreg';
            result.isMain = false;
            break;
        }
    }
    return result;
}

/**
 * getRandKey [获取遍历时的随机key]
 * @author Terrence
 * @return result
 */
export function getRandKey() {
    return Math.random().toString(36).substr(2);
}

/**
 * copy [进行复制]
 * @author Terrence
 * @param {string} content [复制的文本内容]
 * @return {boolean} copyResult [复制是否成功]
 */
export function copy(content = '') {
    // 创建input标签存放需要复制的文字
    const oInput = document.createElement('input');
    // 把文字放进input中，供复制
    oInput.value = content;
    document.body.appendChild(oInput);
    // 选中创建的input
    oInput.select();
    // 执行复制方法， 该方法返回bool类型的结果，告诉我们是否复制成功
    const copyResult = document.execCommand('copy');
    // 操作中完成后 从Dom中删除创建的input
    document.body.removeChild(oInput);
    // 根据返回的复制结果 给用户不同的提示
    if (copyResult) message.success('复制成功');
    else message.success('复制失败');
}

/**
 * isOperate [判断是否有操作权限]
 * @author Terrence
 * @param {string} role [角色]
 * @return {boolean} _ [是否能进行操作]
 */
export function isOperate(role = '') {
    if (role == 'admin' || role == 'super') return true;
    return false;
}


/**
 * ajaxDecrypt ajax 数据解密方法
 * @author Terrence
 * @param {string} response [要进行解密的值]
 */
export function ajaxDecrypt(response) {
    const result = response.split('¥');
    const data = result[0];
    const key = result[1];
    let x = 0;
    let char = '';
    let str = '';
    const enData = window.atob(data);
    const len = enData.length;
    const l = key.length;
    for (let i = 0; i < len; i += 1, x += 1) {
        if (x == l) x = 0;
        char = `${char}${key[x]}`;
    }
    for (let i = 0; i < len; i += 1) {
        if (enData[i].charCodeAt() < char[i].charCodeAt()) {
            str = `${str}${window.String.fromCharCode((enData[i].charCodeAt() + 256) - char[i].charCodeAt())}`;
        } else {
            str = `${str}${window.String.fromCharCode(enData[i].charCodeAt() - char[i].charCodeAt())}`;
        }
    }
    return str;
}

/**
 * ajaxEncrypt ajax 数据加密方法
 * @author Terrence
 * @param {string} data [要进行加密的值]
 */
export function ajaxEncrypt(data) {
    const key = Date.parse(new Date());
    let x = 0;
    let char = '';
    let str = '';
    const len = data.length;
    const l = key.length;
    for (let i = 0; i < len; i += 1, x += 1) {
        if (x == l) x = 0;
        char = `${char}${key[x]}`;
    }
    for (let i = 0; i < len; i += 1) {
        str = `${str}${window.String.fromCharCode(data[i].charCodeAt() + (char[i].charCodeAt() % 256))}`;
    }
    return `${window.btoa(data)}¥${key}`;
}
