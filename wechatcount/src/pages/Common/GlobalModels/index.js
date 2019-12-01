import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { BackTop, notification } from 'antd';

import { getLoginSuccessContent } from '@/services/global';

/** 连接dva */
@connect()
/** 全局弹框组件 */
class GlobalModels extends PureComponent {
    /** 构造器 */
    constructor(props) {
        super(props);
        this.notice = null;
        this.noticeInterval = null;
        this.getNotice();
    }

    /** 获取通知信息 */
    getNotice = () => {
        /** 判断是否要生成定时器 */
        if (!this.notice && !window.isLoginNoticed) {
            this.noticeInterval = setInterval(async () => {
                const { code = 0, send = 0, content = '欢迎' } = await getLoginSuccessContent();
                if (send == 1) {
                    this.notice = notification.info({
                        className: 'loginSuccess',
                        message: '通知',
                        duration: null,
                        description: content,
                        placement: 'bottomRight',
                    });
                    clearInterval(this.noticeInterval);
                    this.noticeInterval = true;
                    window.isLoginNoticed = true;
                    return true;
                } if (code == -1) {
                    clearInterval(this.noticeInterval);
                    this.noticeInterval = true;
                    return true;
                }
                return true;
            }, 2000);
        }
    }

    /** 组件挂载 */
    render() {
        return (
            <>
                {/* 回到顶部 */}
                <BackTop style={{ bottom: 80, right: 10 }} />
            </>
        );
    }
}

// GlobalModels.defaultProps = { dispatch: () => {} };
// GlobalModels.propTypes = { dispatch: PropTypes.any };

export default GlobalModels;
