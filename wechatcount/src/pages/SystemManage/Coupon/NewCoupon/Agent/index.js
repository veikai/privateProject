import { Button, Form, DatePicker, InputNumber, Select, Modal, Descriptions } from 'antd';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
/** 连接dva */
@connect(({
    global: { packages = {}, admins = {} } = {},
    loading,
}) => ({
    packages,
    admins,
    loading: loading.models.coupon,
}))
/** 新增代理商优惠券 */
class Agent extends PureComponent {
    /** 新增优惠券 */
    addCoupon = () => {
        const { form, dispatch, admins = {}, packages: { vip = [] } } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const { ownerAdmin, count, invalidDate, validDate, price, packageId } = values;
                /** 确认信息 */
                Modal.confirm({
                    title: '请确认代理商开券信息!',
                    content: (
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="代理商">{admins.agent && admins.agent[ownerAdmin] && admins.agent[ownerAdmin].name}</Descriptions.Item>
                            <Descriptions.Item label="优惠金额">{price}</Descriptions.Item>
                            <Descriptions.Item label="数量">{count}</Descriptions.Item>
                            <Descriptions.Item label="使用套餐">{vip && vip[packageId] && vip[packageId].name}</Descriptions.Item>
                            <Descriptions.Item label="生效时间">{validDate.format('YYYY-MM-DD')}</Descriptions.Item>
                            <Descriptions.Item label="失效时间">{invalidDate.format('YYYY-MM-DD')}</Descriptions.Item>
                        </Descriptions>),
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        await dispatch({
                            type: 'coupon/addCoupons',
                            payload: {
                                ownerAdmin,
                                count,
                                price,
                                packageId,
                                invalidDate: invalidDate.format('YYYY-MM-DD 23:59:59'),
                                validDate: validDate.format('YYYY-MM-DD HH:mm:ss'),
                            },
                        });
                        /** 刷新优惠券列表 */
                        await dispatch({ type: 'coupon/getCoupons', payload: { page: 1, pageSize: 10, keywords: '' } });
                    },
                });
            }
        });
    }

    /** 渲染 */
    render() {
        const { form: { getFieldDecorator }, packages: { vip = [] }, admins: { agent = {} } } = this.props;
        return (
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                style={{ padding: '0 30px' }}
            >
                <Form.Item label="代理商">
                    {getFieldDecorator('ownerAdmin', { rules: [{ required: true, message: '不能为空，请重新输入！' }] })(
                        <Select>
                            {agent && Object.keys(agent).map(item => <Select.Option key={agent[item].id} value={agent[item].id}>{agent[item].name}</Select.Option>) }
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="数量">
                    {getFieldDecorator('count', {
                        initialValue: 1,
                        rules: [{ required: true, message: '不能为空，请重新输入！' }],
                    })(<InputNumber max="1000" min="0" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="金额">
                    {getFieldDecorator('price', {
                        initialValue: 1.00,
                        rules: [{ required: true, message: '不能为空，请重新输入！' }],
                    })(<InputNumber max="10000" min="0" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="生效时间">
                    {getFieldDecorator('validDate', { rules: [{ required: true, message: '不能为空，请重新输入！' }] })(<DatePicker format="YYYY/MM/DD HH:mm:ss" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="失效时间">
                    {getFieldDecorator('invalidDate', { rules: [{ required: true, message: '不能为空，请重新输入！' }] })(<DatePicker format="YYYY/MM/DD 23:59:59" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="使用套餐">
                    {getFieldDecorator('packageId', { rules: [{ required: true, message: '不能为空，请重新输入！' }] })(
                        <Select>
                            {vip && Object.keys(vip).map(item => <Select.Option key={vip[item].id} value={vip[item].id}>{vip[item].name}</Select.Option>) }
                        </Select>,
                    )}
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={this.addCoupon}>生成兑换码</Button>
                </div>
            </Form>
        );
    }
}

Agent.defaultProps = {
    form: {},
    dispatch: () => {},
    admins: [],
    packages: {},
};

Agent.propTypes = {
    dispatch: PropTypes.any,
    form: PropTypes.any,
    admins: PropTypes.any,
    packages: PropTypes.any,
};

export default Form.create({ name: 'agent' })(Agent);
