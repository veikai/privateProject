import React, { PureComponent } from 'react';
import { Modal, Result } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { getStorage, setStorage, isEmpty } from '@/utils/common';
import { getLoginSuccessContent } from '@/services/global';

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
        this.state = { content: '' };
        this.showLoginSuccess();
    }

    /**
     * showLoginSuccess
     */
    showLoginSuccess = () => {
        const { dispatch } = this.props;
        const isLogined = getStorage('isLogined');
        if (isEmpty(isLogined)) {
            setTimeout(async () => {
                const { send = 0, content = '欢迎' } = await getLoginSuccessContent();
                if (send == 1) {
                    setStorage('isLogined', true);
                    await this.setState({ content });
                    dispatch({ type: 'common/setState', payload: { loginSuccessVisible: true } });
                }
            }, 1200);
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
        const { content } = this.state;
        return (
            <Modal visible={loginSuccessVisible} onCancel={this.hide} footer={null}>
                <Result
                    title={content}
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
