import { Button, Input, Form, DatePicker, InputNumber, Select } from 'antd';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { copy } from '@/utils/common';
/** 连接dva */
@connect(({
    global: { packages = {} } = {},
    loading,
}) => ({
    packages,
    loading: loading.models.coupon,
}))
/** 新增普通优惠券 */
class Common extends PureComponent {
    /** 构造器 */
    constructor(props) {
        super(props);
        this.state = { coupon: '' };
    }

    /** 新增优惠券 */
    addCoupon = () => {
        const { form, dispatch } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const { invalidDate, validDate, mobile, price, packageId } = values;
                dispatch({
                    type: 'coupon/addCoupon',
                    payload: {
                        invalidDate: invalidDate.format('YYYY-MM-DD 23:59:59'),
                        validDate: validDate.format('YYYY-MM-DD HH:mm:ss'),
                        mobile,
                        price,
                        packageId,
                    },
                    callBack: (response) => {
                        const { coupon = '' } = response;
                        /** 填入优惠券 */
                        this.setState({ coupon });
                        form.setFieldsValue({ coupon });
                        /** 刷新优惠券列表 */
                        dispatch({ type: 'coupon/getCoupons', payload: { page: 1, pageSize: 10, keywords: '' } });
                    },
                });
            }
        });
    }

    /** 渲染 */
    render() {
        const { coupon } = this.state;
        const { form: { getFieldDecorator }, packages: { vip = {} } = {} } = this.props;
        return (
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                style={{ padding: '0 30px' }}
            >
                <Form.Item label="电话">
                    {getFieldDecorator('mobile', {
                        rules: [
                            { whitespace: true, message: '不能输入空格，请重新输入' },
                            { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请输入正确的手机号码!' },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="金额">
                    {getFieldDecorator('price', {
                        initialValue: 1.00,
                        rules: [{ required: true, message: '不能为空，请重新输入！' }],
                    })(<InputNumber max="10000" min="0" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="使用套餐">
                    {getFieldDecorator('packageId')(
                        <Select>
                            {vip && Object.keys(vip).map(item => <Select.Option key={vip[item].id} value={vip[item].id}>{vip[item].name}</Select.Option>) }
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="生效时间">
                    {getFieldDecorator('validDate', { rules: [{ required: true, message: '不能为空，请重新输入！' }] })(<DatePicker format="YYYY/MM/DD HH:mm:ss" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="失效时间">
                    {getFieldDecorator('invalidDate', { rules: [{ required: true, message: '不能为空，请重新输入！' }] })(<DatePicker format="YYYY/MM/DD 23:59:59" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="优惠券码">
                    {getFieldDecorator('coupon', { initialValue: coupon })(<Input readOnly />)}
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={this.addCoupon}>生成兑换码</Button>
                    <Button type="primary" onClick={() => copy(coupon)} disabled={!coupon} style={{ marginLeft: 15 }}>复制兑换码</Button>
                </div>
            </Form>
        );
    }
}


Common.defaultProps = {
    form: {},
    packages: {},
    dispatch: () => {},
};

Common.propTypes = {
    dispatch: PropTypes.any,
    packages: PropTypes.any,
    form: PropTypes.any,
};

export default Form.create({ name: 'common' })(Common);
