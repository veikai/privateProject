import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message, Card } from 'antd';
import * as history from 'umi/router';
import { connect } from 'dva';
import Styles from './index.less';

/** 链接dva */
@connect()

/** 个人中心 */
class PersonalCenter extends PureComponent {
        /** 数据提交 */
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                const { newPassword, confirmNewPassword, password } = values;
                if (!err) {
                    if (newPassword != confirmNewPassword) {
                        message.error('两次密码输入不一致，请重新输入');
                    } else if (password == confirmNewPassword) {
                        message.info('您的密码与新密码一致，无需更改');
                    } else {
                        const { dispatch } = this.props;
                        dispatch({
                            type: 'admin/setPassword',
                            payload: { password, newPassword },
                        });
                    }
                }
            });
        }

        /** 组件挂载 */
        render() {
            const { form: { getFieldDecorator } } = this.props;
            const formItemLayout = {
                labelCol: { xs: { span: 24 }, sm: { span: 8 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 8 } },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                },
            };
            return (
                <Card>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className={Styles.infomation}>
                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入初始密码!' },
                                    { whitespace: true, message: '不能输入空格' },
                                    { pattern: /^[\u0021-\u007E]{6,16}$/, message: '密码格式不正确，格式应为6-16字符' },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="新密码">
                            {getFieldDecorator('newPassword', {
                                rules: [
                                    { required: true, message: '请输入新密码！' },
                                    { whitespace: true, message: '不能输入空格' },
                                    { pattern: /^[\u0021-\u007E]{6,16}$/, message: '密码格式不正确，格式应为6-16字符' },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="确认密码">
                            {
                                getFieldDecorator('confirmNewPassword', {
                                    rules: [
                                        { required: true, message: '请确认新密码!' },
                                        { whitespace: true, message: '不能输入空格' },
                                        { pattern: /^[\u0021-\u007E]{6,16}$/, message: '密码格式不正确，格式应为6-16字符' },
                                    ],
                                })(<Input.Password />)
                            }
                        </Form.Item>
                        {/* <span onClick={this.ForgotPassword} className={Styles.oldPwd}>忘记原始密码？</span> */}
                        <Form.Item {...tailFormItemLayout} className={Styles.chgPasswordBtn}>
                            <Button onClick={history.goBack}>关闭</Button>
                            <Button type="primary" htmlType="submit" className={Styles.btn}>保存</Button>
                        </Form.Item>
                    </Form>
                </Card>

            );
        }
}

PersonalCenter.defaultProps = {
    dispatch: () => {},
    form: '',

};
PersonalCenter.propTypes = {
    dispatch: PropTypes.any,
    form: PropTypes.any,
};

export default Form.create({ name: 'UpdatePWD' })(PersonalCenter);
