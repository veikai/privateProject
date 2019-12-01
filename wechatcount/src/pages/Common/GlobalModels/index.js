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
        this.state = { isConfirmed: false };
        this.onLoad();
    }

    /** 初始化 */
    onLoad = () => {
        const { isConfirmed } = this.state;
        if (!isConfirmed) {
            setTimeout(async () => {
                const { send = 0, content = '欢迎' } = await getLoginSuccessContent();
                if (send == 1) {
                    notification.info({
                        className: 'loginSuccess',
                        message: '通知',
                        duration: null,
                        description: content,
                        placement: 'bottomRight',
                    });
                    return this.setState({ isConfirmed: true });
                }
                return true;
            }, 2000);
        }
        return true;
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
