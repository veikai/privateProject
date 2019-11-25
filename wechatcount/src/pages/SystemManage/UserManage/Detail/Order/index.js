import { Form, Row, Col, Button, Input, DatePicker, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import router from 'umi/router';
import moment from 'moment';
// import styles from './index.less';
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

class OrderDetail extends PureComponent {
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
        const { orderVipStartTime, orderVipEndTime, vipEndTime } = this.state;
        const { form, dispatch } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'crm/setUserInfo',
                    payload: { ...values, orderVipStartTime, orderVipEndTime, vipEndTime },
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
    close= () => {
        router.push('/systemManage/userManage');
    }

    /** 组件挂载 */
    render() {
        const { isEdit } = this.state;
        const { orderCreateDate, orderPackage, orderAdmin, orderPrice, orderVipStartTime, orderVipEndTime, orderMemo, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form
                onSubmit={this.handleSearch}
                labelCol={{ xs: { span: 24 }, md: { span: 6 }, xxl: { span: 4 } }}
                wrapperCol={{ xs: { span: 24 }, md: { span: 18 }, xxl: { span: 20 } }}
                style={{ paddingTop: 15 }}
            >
                <Row gutter={24}>
                    <Col span={12} key="orderCreateDate">
                        <Form.Item label="注册时间">
                            {getFieldDecorator('orderCreateDate', { initialValue: orderCreateDate == '0000-00-00 00:00:00' ? '' : moment(orderCreateDate, 'YYYY-MM-DD HH:mm:ss') })(
                                <DatePicker style={{ width: '100%' }} disabled />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="orderPackage">
                        <Form.Item label="购买套餐">
                            {getFieldDecorator('orderPackage', {
                                initialValue: orderPackage,
                                // rules: [{ message: '请输入购买套餐!' }],
                            })(<Input placeholder="请输入" disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="orderPrice">
                        <Form.Item label="交易金额">
                            {getFieldDecorator('orderPrice', {
                                initialValue: orderPrice,
                                rules: [{ message: '请输入交易金额!' }],
                            })(<Input prefix="￥" disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="orderAdmin">
                        <Form.Item label="签单人员">
                            {getFieldDecorator('orderAdmin', {
                                initialValue: orderAdmin,
                                // rules: [{ message: '请输入签单人员!' }],
                            })(<Input placeholder="请输入" disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="orderVipStartTime">
                        <Form.Item label="会员开始时间">
                            {getFieldDecorator('orderVipStartTime', {
                                initialValue: isEmpty(orderVipStartTime) ? '' : moment(orderVipStartTime, 'YYYY-MM-DD HH:mm:ss'),
                                // rules: [{ message: '请输入会员开始时间!' }],
                            })(<DatePicker placeholder="请选择" style={{ width: '100%' }} onChange={value => this.handleChange('orderVipStartTime', value.format('YYYY-MM-DD HH:mm:ss'))} disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="orderVipEndTime">
                        <Form.Item label="会员到期时间">
                            {getFieldDecorator('orderVipEndTime', {
                                initialValue: isEmpty(orderVipEndTime) ? '' : moment(orderVipEndTime, 'YYYY-MM-DD HH:mm:ss'),
                                // rules: [{ message: '请输入会员到期时间!' }],
                            })(<DatePicker placeholder="请选择" style={{ width: '100%' }} onChange={value => this.handleChange('orderVipEndTime', value.format('YYYY-MM-DD HH:mm:ss'))} disabled={!isEdit} />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} key="orderMemo">
                        <Form.Item label="备注信息">
                            {getFieldDecorator('orderMemo', { initialValue: orderMemo })(<TextArea placeholder="请输入" autosize={{ minRows: 4 }} disabled={!isEdit} />)}
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
OrderDetail.defaultProps = {
    dispatch: null,
    form: '',
};
OrderDetail.propTypes = {
    dispatch: PropTypes.any,
    form: PropTypes.any,
    /** 合同 */
    orderCreateDate: PropTypes.any.isRequired,
    orderPackage: PropTypes.any.isRequired,
    orderPrice: PropTypes.any.isRequired,
    orderAdmin: PropTypes.any.isRequired,
    orderVipStartTime: PropTypes.any.isRequired,
    orderVipEndTime: PropTypes.any.isRequired,
    orderMemo: PropTypes.any.isRequired,
};
export default Form.create({ name: 'OrderDetail' })(OrderDetail);
