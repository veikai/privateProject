import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { router } from 'umi';
import { Button, message } from 'antd';
import Login from '@/components/Login';

const { Tab, Password, Submit, UserName } = Login;
/** 连接dva */
@connect()
/** 首页注册 */
class LoginRegister extends PureComponent {
    /** 进行注册 */
    onSubmit = (err, values) => {
        const { dispatch } = this.props;
        const { name, password, confirmPassword } = values;
        /** 如果规则没有报错 */
        if (!err) {
            /** 验证密码 */
            if (password != confirmPassword) return message.error('两次密码输入不一致');
            /** 进行注册 */
            dispatch({
                type: 'login/register',
                payload: { name, password },
                callBack: (response) => {
                    if (response.code == 200) {
                        message.success('注册成功');
                    } else if (response.code == 204) {
                        message.success('此用户名已被注册');
                    }
                },
            });
        }
        return true;
    }

    /** 组件挂载 */
    render() {
        return (
            <Login
                defaultActiveKey="register"
                onSubmit={this.onSubmit}
            >
                <Tab key="register" tab="微信计数器">
                    <UserName name="name" placeholder="输入用户名" rules={[{ required: true, message: '请输入用户名' }]} />
                    <Password name="password" placeholder="输入密码" />
                    <Password name="confirmPassword" placeholder="再次输入密码" />
                    <Submit>注册</Submit>
                    <div style={{ float: 'right' }}>
                        {'已有账号？'}
                        <Button type="link" onClick={() => router.push({ pathname: '/login' })}>
                            {'立即登录'}
                        </Button>
                    </div>
                </Tab>
            </Login>
        );
    }
}

LoginRegister.defaultProps = { dispatch: null };
LoginRegister.propTypes = { dispatch: PropTypes.any };

export default LoginRegister;
