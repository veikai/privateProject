import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { BackTop } from 'antd';

/** 登陆成功之后的消息弹框 */
import LoginSuccess from './LoginSuccess';

/** 连接dva */
@connect()
/** 全局弹框组件 */
class GlobalModels extends PureComponent {
    /** 构造器 */
    constructor(props) {
        super(props);
        this.state = {};
    }


    /** 组件挂载 */
    render() {
        return (
            <>
                {/* 登陆成功之后的消息弹框 */}
                <LoginSuccess />
                {/* 回到顶部 */}
                <BackTop style={{ bottom: 80, right: 10 }} />
            </>
        );
    }
}

// GlobalModels.defaultProps = { dispatch: () => {} };
// GlobalModels.propTypes = { dispatch: PropTypes.any };

export default GlobalModels;
