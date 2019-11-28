import React, { PureComponent } from 'react';
import { Button, Table, Select, Card, Form, Input, Divider, Tag } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import moment from 'moment';

const { Option } = Select;
const { Search } = Input;

/** 连接dva */
@connect(({
    list: { list = [] } = {},
    loading,
}) => ({
    list,
    loading: loading.models.list,
}))
/** 账号登录/手机号登录 */
class List extends PureComponent {
    /** table标题 */
    columns = [
        { title: '编号', align: 'center', dataIndex: 'wxid', width: 200 },
        { title: '分组', align: 'center', dataIndex: 'group', width: 100 },
        { title: '微信昵称', align: 'center', dataIndex: 'nickname', width: 100 },
        { title: '备注', align: 'center', dataIndex: 'remark', width: 200 },
        { title: '标注', align: 'center', dataIndex: 'tag', width: 80 },
        { title: '已加粉', align: 'center', dataIndex: 'fans_count', width: 80 },
        { title: '上线时间', align: 'center', width: 180, dataIndex: 'login_time', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
        { title: '已运行', align: 'center', dataIndex: 'run_time' },
        { title: '离线时间', dataIndex: 'logout_time', align: 'center', render: text => (text > 0 ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-') },
        {
            title: '状态',
            dataIndex: 'state',
            render: (text) => {
                const { states } = this.state;
                return states[text] && <Tag color={states[text].color}>{states[text].name}</Tag>;
            },
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 190,
            render: () => (
                <span>
                    <Button icon="star" type="link" size="small">标注</Button>
                    <Divider type="vertical" />
                    <Button icon="user" type="link" size="small">加粉</Button>
                </span>
            ),
        },
    ]

    /** 构造器 */
    constructor(props) {
        super(props);
        this.state = {
            states: [
                { name: '离线', color: '#999' },
                { name: '在线', color: '#87d068' },
            ],
        };
    }

    /** 组件即将加载 */
    componentWillMount() {
        this.onLoad();
    }

    /** 数据加载 */
    onLoad = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'list/getList' });
    }

    /** 组件挂载 */
    render() {
        const { list = [], loading } = this.props;
        const { selected } = this.state;
        return (
            <Card>
                <Form layout="inline" style={{ marginBottom: 20 }}>
                    <Form.Item><Search placeholder="微信昵称/备注" /></Form.Item>
                    <Form.Item>
                        <Select placeholder="状态" style={{ minWidth: 120 }}>
                            <Option value="">全部</Option>
                            <Option value="online">在线</Option>
                            <Option value="offline">离线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item><Button type="danger" icon="share-alt">分享</Button></Form.Item>
                    <Form.Item><Button type="default" icon="delete">删除离线账号</Button></Form.Item>
                    <Form.Item><Button type="danger" icon="delete">删除离线账号</Button></Form.Item>
                    <Form.Item><Button type="primary" icon="line-chart">统计粉丝数量</Button></Form.Item>
                </Form>
                <Form layout="inline" style={{ marginBottom: 20 }}>
                    <Form.Item><Button type="default" icon="plus">创建分组</Button></Form.Item>
                    <Form.Item><Button type="danger" icon="bars">管理分组</Button></Form.Item>
                    <Form.Item><Button type="primary" icon="enter">加入分组</Button></Form.Item>
                </Form>
                <Table
                    columns={this.columns}
                    loading={loading}
                    dataSource={list}
                    rowKey={row => row.id}
                    rowSelection={{
                        selected,
                        onChange: val => this.setState({ selected: val }),
                    }}
                    pagination={{
                        onChange: val => this.onLoad(val),
                        pageSize: 10,
                        defaultCurrent: 1,
                        total: Number(list.length),
                        size: 'small',
                    }}
                />
            </Card>
        );
    }
}

List.defaultProps = {
    dispatch: null,
    loading: false,
    list: [],
};
List.propTypes = {
    dispatch: PropTypes.any,
    loading: PropTypes.any,
    list: PropTypes.any,
};

export default Form.create({ name: 'wechatList' })(List);
