import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Card, Button, Form, Select, DatePicker, Input, Table, Row, Col, Alert, Typography } from 'antd';
import router from 'umi/router';
import moment from 'moment';
import { isEmpty, isOperate } from '@/utils/common';

import Analystic from './Analystic';

const { RangePicker } = DatePicker;
const { Option } = Select;

/** 用户管理界面 */
@connect(({
    crm,
    login: { token } = {},
    global: { admin: { role = '' }, admins: { agent = {}, customer = {} } } = {},
    loading,
}) => ({
    ...crm,
    token,
    role,
    agent,
    customer,
    loading: loading.models.crm,
}))

class List extends PureComponent {
    dateFormat = 'YYYY-MM-DD';

    /** 表格列表项 */
    columns = [
        { title: '用户名', width: 100, dataIndex: 'name' },
        {
            title: '手机号',
            width: 100,
            dataIndex: 'mobile',
            render: text => <Button type="link" style={{ padding: 0 }} onClick={() => this.getToken(text)}>{text}</Button>,
        },
        { title: '注册时间', width: 100, dataIndex: 'createdate', render: text => moment(text).format('YYYY-MM-DD') },
        {
            title: '会员开始时间',
            width: 100,
            dataIndex: 'vipStartTime',
            render: (text, record) => (text == record.vipEndTime ? '' : moment(text).format('YYYY-MM-DD')),
        },
        {
            title: '会员到期时间',
            width: 100,
            dataIndex: 'vipEndTime',
            render: (text, record) => (text == record.vipStartTime ? '' : moment(text).format('YYYY-MM-DD')),
        },
        {
            title: '类型',
            width: 60,
            dataIndex: 'role',
            render: (text, record) => ((Date.parse(new Date(record.vipEndTime)) > Date.parse(new Date())) ? 'VIP' : '试用'),
        },
        {
            title: '来源',
            width: 60,
            dataIndex: 'admin',
        },
        {
            title: '客服',
            width: 60,
            render: (text, record) => {
                const { customer = {} } = this.props;
                return (
                    <Select
                        size="small"
                        defaultValue={!isEmpty(Number(record.customer_id)) && record.customer_id}
                        style={{ width: 80 }}
                        onChange={val => this.changeCustomer(record.id, val)}
                    >
                        <Option value="">清空</Option>
                        {customer && Object.keys(customer).map(item => <Select.Option key={customer[item].id} value={customer[item].id}>{customer[item].name}</Select.Option>) }
                    </Select>
                );
            },
        },
        {
            title: '备注',
            dataIndex: 'memo',
            width: 200,
            render: text => <Typography.Paragraph ellipsis style={{ margin: 0, maxWidth: 200 }} title={text}>{text}</Typography.Paragraph>,
        },
        {
            title: '操作',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => {
                        window.crmList = this;
                        router.push({ pathname: '/systemManage/userManage/detail', query: { id: record.id } });
                    }}
                >
                    详情
                </Button>
            ),
        },
    ];

    /** 构造函数 */
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 10,
        };
    }

    /** 组件挂载之前 */
    componentWillMount() {
        this.onLoad(1);
    }

    /** 手机号单点登陆 */
    getToken = (mobile) => {
        const { dispatch } = this.props;
        if (!isEmpty(mobile)) {
            dispatch({
                type: 'login/getToken',
                payload: { mobile },
                callBack: (response) => {
                    const { token = '' } = response;
                    if (!isEmpty(token)) {
                        /** 判断是否在预发环境下 */
                        if (window.location.href.indexOf('pr.') == -1) {
                            window.open('about:blank').location.href = `https://tonpalgs.zhaobuyer.com/#/login?token=${token}`;
                        } else {
                            window.open('about:blank').location.href = `http://pr.tonpalgs.zhaobuyer.com/#/login?token=${token}`;
                        }
                        return true;
                    }
                    return <Alert type="error" text="无法跳转，请重试！" />;
                },
            });
        }
    }

    /** 更改客服信息 */
    changeCustomer = (userId, customerId) => {
        const { dispatch } = this.props;
        dispatch({ type: 'crm/setCustomer', payload: { userId, customerId } });
    }

    /** 进行加载 */
    onLoad = (val) => {
        const { form, dispatch } = this.props;
        let { page } = this.state;
        if (val) page = val;

        form.validateFields((err, values) => {
            if (!err) {
                const { searchKey, admin, userRole, registerTime, vipStartTime, vipEndTime, customer } = values;
                /** 对时间进行处理 */
                const registerTimeBack = [];
                const vipStartTimeBack = [];
                const vipEndTimeBack = [];
                if (!isEmpty(registerTime)) {
                    if (registerTime[0]) registerTimeBack[0] = registerTime[0].format('YYYY-MM-DD');
                    if (registerTime[1]) registerTimeBack[1] = registerTime[1].format('YYYY-MM-DD');
                }
                if (!isEmpty(vipStartTime)) {
                    if (vipStartTime[0]) vipStartTimeBack[0] = vipStartTime[0].format('YYYY-MM-DD');
                    if (vipStartTime[1]) vipStartTimeBack[1] = vipStartTime[1].format('YYYY-MM-DD');
                }
                if (!isEmpty(vipEndTime)) {
                    if (vipEndTime[0]) vipEndTimeBack[0] = vipEndTime[0].format('YYYY-MM-DD');
                    if (vipEndTime[1]) vipEndTimeBack[1] = vipEndTime[1].format('YYYY-MM-DD');
                }
                /** 调用接口 */
                const { pageSize } = this.state;
                this.setState({ page }, () => {
                    dispatch({
                        type: 'crm/getUsers',
                        payload: { page, pageSize, searchKey, admin, userRole, registerTime: registerTimeBack, vipStartTime: vipStartTimeBack, vipEndTime: vipEndTimeBack, customer },
                    });
                });
            }
        });
    }

    /** 组件挂载 */
    render() {
        const { form: { getFieldDecorator }, users, usersTotal, loading, children, role, agent, customer } = this.props;
        const { page, pageSize } = this.state;
        const { location: { pathname } } = this.props;
        return (
            pathname == '/systemManage/userManage' ? (
                <>
                    {/* 数据分析 */}
                    {isOperate(role) && <Analystic />}
                    <Card>
                        {/* 筛选条件框 */}
                        <Row>
                            <Col span={20}>
                                <Form
                                    onSubmit={this.onLoad}
                                    layout="inline"
                                    className="search-condition"
                                >
                                    <div>
                                        <Form.Item>
                                            {getFieldDecorator('searchKey')(
                                                <Input style={{ minWidth: 285 }} placeholder="请输入用户名/手机号关键字" />,
                                            )}
                                        </Form.Item>
                                        { isOperate(role) && (
                                            <Form.Item>
                                                {getFieldDecorator('admin')(
                                                    <Select placeholder="用户来源" style={{ width: 285 }}>
                                                        <Option value="">全部</Option>
                                                        {agent && Object.keys(agent).map(item => <Option key={agent[item].id} value={agent[item].id}>{agent[item].name}</Option>) }
                                                    </Select>,
                                                )}
                                            </Form.Item>
                                        )}
                                        { isOperate(role) && (
                                            <Form.Item>
                                                {getFieldDecorator('customer')(
                                                    <Select placeholder="客服" style={{ width: 134 }}>
                                                        <Option value="">全部</Option>
                                                        {customer && Object.keys(customer).map(item => <Option key={customer[item].id} value={customer[item].id}>{customer[item].name}</Option>) }
                                                    </Select>,
                                                )}
                                            </Form.Item>
                                        )}
                                        <Form.Item>
                                            {getFieldDecorator('userRole')(
                                                <Select placeholder="用户类型" style={{ width: 134 }}>
                                                    <Option value="">全部</Option>
                                                    <Option value="user">VIP用户</Option>
                                                    <Option value="guest">试用用户</Option>
                                                </Select>,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" onClick={() => this.onLoad(1)}>查询</Button>
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item>
                                            {getFieldDecorator('registerTime')(
                                                <RangePicker style={{ width: 285 }} placeholder={['注册时间开始', '注册时间开始']} />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('vipStartTime')(
                                                <RangePicker style={{ width: 285 }} placeholder={['会员开始时间开始', '会员开始时间结束']} />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('vipEndTime')(
                                                <RangePicker style={{ width: 285 }} placeholder={['会员结束时间开始', '会员结束时间结束']} />,
                                            )}
                                        </Form.Item>
                                    </div>
                                </Form>
                            </Col>
                            <Col span={4} style={{ textAlign: 'right' }}>
                                { isOperate(role) && <Button type="primary" onClick={() => router.push({ pathname: '/systemManage/userManage/detail' })}>添加用户</Button>}
                            </Col>
                        </Row>
                        {/* 展示列表 */}
                        <Table
                            loading={loading}
                            columns={this.columns}
                            dataSource={users}
                            pagination={{
                                disabled: loading,
                                onChange: value => this.onLoad(value),
                                pageSize,
                                total: Number(usersTotal),
                                current: page,
                                size: 'small',
                            }}
                            rowKey={record => record.id}
                        />
                    </Card>
                </>

            ) : children
        );
    }
}

List.defaultProps = {
    dispatch: null,
    form: '',
    users: [],
    usersTotal: 0,
    loading: false,
    agent: {},
    customer: {},
    location: '',
    children: '',
    role: '',
};
List.propTypes = {
    dispatch: PropTypes.any,
    form: PropTypes.any,
    users: PropTypes.any,
    usersTotal: PropTypes.any,
    loading: PropTypes.any,
    agent: PropTypes.any,
    customer: PropTypes.any,
    location: PropTypes.any,
    children: PropTypes.any,
    role: PropTypes.any,
};
export default Form.create({ name: 'UserManageForm' })(List);
