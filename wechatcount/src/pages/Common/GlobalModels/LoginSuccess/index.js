import React, { PureComponent } from 'react';
import { Modal, Result } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { getStorage, setStorage, isEmpty } from '@/utils/common';

/** 弹框状态显示 */
@connect(({ common: { loginSuccessVisible } = {} }) => ({ loginSuccessVisible }))

/**
 * LoginSuccess 登陆成功之后的消息弹框
 * @author Terrence
 */
class LoginSuccess extends PureComponent {
    /** 构造器 */
    constructor(props) {
        super(props);
        this.showLoginSuccess();
    }

    /**
     * showLoginSuccess
     */
    showLoginSuccess = () => {
        const { dispatch } = this.props;
        const isLogined = getStorage('isLogined');
        if (isEmpty(isLogined)) {
            setStorage('isLogined', true);
            setTimeout(() => {
                dispatch({
                    type: 'common/setState',
                    payload: { loginSuccessVisible: true },
                });
            }, 500);
        }
    }

    /** 关闭弹框 */
    hide = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'common/setState', payload: { loginSuccessVisible: false } });
    }

    /** 组件挂载 */
    render() {
        const { loginSuccessVisible } = this.props;
        return (
            <Modal visible={loginSuccessVisible} onCancel={this.hide} footer={null}>
                <Result
                    title="欢迎你第一次进入微信计数器"
                />
            </Modal>
        );
    }
}

LoginSuccess.defaultProps = {
    dispatch: null,
    loginSuccessVisible: false,
};
LoginSuccess.propTypes = {
    dispatch: PropTypes.any,
    loginSuccessVisible: PropTypes.any,
};

export default LoginSuccess;
