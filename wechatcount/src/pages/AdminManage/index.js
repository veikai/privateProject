import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Modal, Form, Input, Select, Table, Card } from 'antd';

const { Option } = Select;
/** 连接dva */
@connect(({
    admin: { adminsTotal = [], admins = 0 } = {},
    loading,
}) => ({
    adminsTotal,
    admins,
    loading: loading.models.admin,
}))

/** OA用户管理 */
class AdminManage extends Component {
    /** 管理员列表表头 */
    columns = [
        { title: '用户名', dataIndex: 'name', key: 'name' },
        { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
        { title: '创建时间', dataIndex: 'createdate', key: 'createdate' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '角色', dataIndex: 'role', key: 'role', render: text => this.state.role[text] },
    ];

    /** 构造函数 */
    constructor(props) {
        super(props);
        this.state = {
            // 新增管理员表单状态
            isShow: false,
            // 列表每页数量
            pageSize: 10,
            // 管理员角色
            role: {
                super: '超级管理员',
                admin: '管理员',
                agent: '代理商',
                sale: '销售',
                customer: '客服',
            },
        };
        this.getAdmins(1);
    }

    /** 新增管理员 */
    addAdmin=(e) => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'admin/addAdmin',
                    payload: values,
                    callBack: () => {
                        this.setState({ isShow: false });
                        form.resetFields();
                        this.getAdmins(1);
                    },
                });
            }
        });
    }

    /** 获取管理员列表 */
    getAdmins=(page) => {
        const { dispatch } = this.props;
        const { pageSize } = this.state;
        dispatch({ type: 'admin/getAdmins', payload: { page, pageSize } });
    }

    /** 组件挂载 */
    render() {
        const { form: { getFieldDecorator }, adminsTotal, admins, loading } = this.props;
        const { isShow } = this.state;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 4 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
        };
        return (
            <Card>
                <Button
                    type="primary"
                    onClick={() => { this.setState({ isShow: true }); }}
                    style={{ marginBottom: 24 }}
                >
                    添加代理商
                </Button>
                <Modal
                    title="添加管理员"
                    visible={isShow}
                    onOk={this.addAdmin}
                    onCancel={() => { this.setState({ isShow: false }); }}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="用户名">
                            {getFieldDecorator('name', {
                                rules: [
                                    { whitespace: true, message: '不能输入空格，请重新输入' },
                                    { required: true, message: '用户名称不能为空' },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="电话">
                            {getFieldDecorator('mobile', {
                                rules: [
                                    { required: true, message: '请正确输入电话' },
                                    { whitespace: true, message: '不能输入空格，请重新输入' },
                                    { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请输入正确的手机号码!' },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    { whitespace: true, message: '不能输入空格，请重新输入' },
                                    { required: true, message: '邮箱不能为空' },
                                    { type: 'email', message: '请正确是输入邮箱' },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="角色">
                            {getFieldDecorator('role', { rules: [{ required: true, message: '用户角色不能为空' }] })(
                                <Select placeholder="请选择角色">
                                    <Option value="agent">代理商</Option>
                                    <Option value="admin">管理员</Option>
                                    <Option value="customer">客服</Option>
                                    <Option value="sale">销售</Option>
                                </Select>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
                <Table
                    columns={this.columns}
                    dataSource={admins}
                    pagination={{ total: adminsTotal, onChange: this.getAdmins, size: 'small' }}
                    loading={loading}
                />
            </Card>
        );
    }
}

AdminManage.defaultProps = {
    dispatch: () => {},
    getFieldDecorator: '',
    form: '',
    adminsTotal: 0,
    admins: [],
    loading: false,
};
AdminManage.propTypes = {
    dispatch: PropTypes.any,
    getFieldDecorator: PropTypes.any,
    form: PropTypes.any,
    adminsTotal: PropTypes.number,
    admins: PropTypes.array,
    loading: PropTypes.bool,
};

export default Form.create({ name: 'addAdmin' })(AdminManage);
