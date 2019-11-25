import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import router from 'umi/router';
import Login from '@/components/Login';

const { Tab, Password, UserName, Submit } = Login;
/** 连接dva */
@connect()
/** 账号登录/手机号登录 */
class IndexLogin extends PureComponent {
    /** 进行登录 */
    onSubmit = (err, values) => {
        if (!err) {
            const { dispatch } = this.props;
            const { name, password } = values;
            dispatch({
                type: 'login/login',
                payload: { name, password },
                callBack: () => router.push({ pathname: '/fullNetworkSearch' }),
            });
        }
    };

    /** 组件挂载 */
    render() {
        return (
            <Login
                defaultActiveKey="passwordLogin"
                onTabChange={() => {}}
                onSubmit={this.onSubmit}
            >
                <Tab key="passwordLogin" tab="微信计数器">
                    <UserName name="name" placeholder="账户" rules={[{ required: true, message: '请输入用户名' }]} />
                    <Password name="password" placeholder="密码" />
                </Tab>
                <Submit>登录</Submit>
                <div style={{ textAlign: 'right' }}>
                    {'没有账号？'}
                    <Button type="link" onClick={() => router.push('/login/register')}>立即注册</Button>
                </div>
            </Login>
        );
    }
}

IndexLogin.defaultProps = { dispatch: null };
IndexLogin.propTypes = { dispatch: PropTypes.any };

export default IndexLogin;
