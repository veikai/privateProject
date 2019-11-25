import { Form, Row, Col, Button, Input, DatePicker, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import router from 'umi/router';
import moment from 'moment';
import { isEmpty } from '@/utils/common';

const { confirm } = Modal;
const { TextArea } = Input;

/** 用户详情页 */
@connect(({
    crm,
    loading,
}) => ({
    ...crm,
    loading: loading.models.crm,
}))

class UserDetail extends PureComponent {
    /** 构造函数 */
    constructor(props) {
        super(props);
        this.state = { isEdit: false };
    }

    /**
     * handleOk 处理表单中不是 表单控件的 变化值
     * @author Terrence
     * @param string type 变化的类型
     * @param string value 变化的值
     */
    handleChange = (type, value) => {
        const object = {};
        object[type] = value;
        this.setState(object);
    }

    /**
     * handleSubmit 表单提交
     * @author Terrence
     */
    handleSubmit = () => {
        /** 从 state 中获取值 */
        const { form, dispatch } = this.props;
        const { vipStartTime, vipEndTime } = this.state;
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'crm/setUserInfo',
                    payload: { ...values, vipStartTime, vipEndTime },
                }).then(() => {
                    router.push('/systemManage/userManage');
                });
            }
        });
    }

    /**
     * close 关闭功能
     * @author david
     */
    close = () => {
        router.push('/systemManage/userManage');
    }

    /** 组件挂载 */
    render() {
        const { isEdit } = this.state;
        const { name, mobile, vipStartTime, vipEndTime, qq, email, companyAddress, companyDomain, companyProduct, compamyName, form, memo } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form
                onSubmit={this.handleSearch}
                labelCol={{ xs: { span: 24 }, md: { span: 6 }, xxl: { span: 4 } }}
                wrapperCol={{ xs: { span: 24 }, md: { span: 18 }, xxl: { span: 20 } }}
                style={{ paddingTop: 15 }}
            >
                <Row gutter={24}>
                    <Col span={12} key="name">
                        <Form.Item label="用户名">
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(<Input disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="role">
                        <Form.Item label="用户类型">
                            {getFieldDecorator('role', { initialValue: (Date.parse(new Date(vipEndTime)) > Date.parse(new Date())) ? 'VIP用户' : '试用用户' })(<Input disabled />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="mobile">
                        <Form.Item label="手机号">
                            {getFieldDecorator('mobile', {
                                initialValue: mobile,
                                rules: [
                                    { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请输入正确的手机号码!' },
                                    { required: true, message: '请输入手机号!' },
                                ],
                            })(<Input disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="email">
                        <Form.Item label="邮箱">
                            {getFieldDecorator('email', {
                                initialValue: email,
                                rules: [{ type: 'email', message: '请检查后重新输入邮箱信息!' }],
                            })(<Input disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="qq">
                        <Form.Item label="QQ">
                            {getFieldDecorator('qq', { initialValue: qq })(<Input disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="compamyName">
                        <Form.Item label="公司名称">
                            {getFieldDecorator('compamyName', { initialValue: compamyName })(<Input disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="companyDomain">
                        <Form.Item label="公司网址">
                            {getFieldDecorator('companyDomain', { initialValue: companyDomain })(<Input disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="companyAddress">
                        <Form.Item label="公司地址">
                            {getFieldDecorator('companyAddress', { initialValue: companyAddress })(<Input disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="vipStartTime">
                        <Form.Item label="会员开始时间">
                            {getFieldDecorator('vipStartTime', {
                                initialValue: isEmpty(vipStartTime) ? '' : moment(vipStartTime, 'YYYY-MM-DD HH:mm:ss'),
                                rules: [{ required: true, message: '请选择会员开始时间!' }],
                            })(<DatePicker placeholder="请选择" style={{ width: '100%' }} onChange={value => this.handleChange('vipStartTime', value.format('YYYY-MM-DD HH:mm:ss'))} disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="vipEndTime">
                        <Form.Item label="会员到期时间">
                            {getFieldDecorator('vipEndTime', {
                                initialValue: isEmpty(vipEndTime) ? '' : moment(vipEndTime, 'YYYY-MM-DD HH:mm:ss'),
                                rules: [{ required: true, message: '请选择会员到期时间!' }],
                            })(<DatePicker placeholder="请选择" style={{ width: '100%' }} onChange={value => this.handleChange('vipEndTime', value.format('YYYY-MM-DD HH:mm:ss'))} disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="companyProduct">
                        <Form.Item label="经营产品">
                            {getFieldDecorator('companyProduct', { initialValue: companyProduct })(<TextArea autosize={{ minRows: 4 }} disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="memo">
                        <Form.Item label="备注">
                            {getFieldDecorator('memo', { initialValue: memo })(<TextArea autosize={{ minRows: 4 }} disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        {!isEdit && <Button type="primary" onClick={() => this.setState({ isEdit: !isEdit })}>编辑</Button>}
                        {isEdit && <Button type="primary" onClick={() => confirm({ title: '确定保存?', okText: '确定', okType: 'danger', cancelText: '取消', onOk: () => this.handleSubmit() })}> 保存 </Button>}
                        <Button style={{ marginLeft: 8 }} onClick={this.close}>关闭</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
UserDetail.defaultProps = {
    dispatch: null,
    form: '',
};
UserDetail.propTypes = {
    dispatch: PropTypes.any,
    form: PropTypes.any,
    /** 公司 */
    companyAddress: PropTypes.any.isRequired,
    companyDomain: PropTypes.any.isRequired,
    companyProduct: PropTypes.any.isRequired,
    compamyName: PropTypes.any.isRequired,
    /** 用户 */
    name: PropTypes.any.isRequired,
    mobile: PropTypes.any.isRequired,
    vipStartTime: PropTypes.any.isRequired,
    vipEndTime: PropTypes.any.isRequired,
    qq: PropTypes.any.isRequired,
    email: PropTypes.any.isRequired,
    memo: PropTypes.any.isRequired,
};
export default Form.create({ name: 'UserDetail' })(UserDetail);
