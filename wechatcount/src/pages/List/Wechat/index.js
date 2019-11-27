import React, { PureComponent } from 'react';
import { Button, Table, Select, Card, Form, Input, Divider } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';

const { Option } = Select;

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
        { title: '编号', dataIndex: 'wxid' },
        { title: '分组', dataIndex: 'group' },
        { title: '微信昵称', dataIndex: 'nickname' },
        { title: '备注', dataIndex: 'remark' },
        { title: '标注', dataIndex: 'tag' },
        { title: '已加粉', dataIndex: 'fans_count' },
        { title: '上线时间', dataIndex: 'login_time' },
        { title: '已运行', dataIndex: 'run_time' },
        { title: '离线时间', dataIndex: 'logout_time' },
        { title: '状态', dataIndex: 'state' },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <span>
                    <Button type="link" size="small">标注</Button>
                    <Divider type="vertical" />
                    <Button type="link" size="small">加粉记录</Button>
                </span>
            ),
        },
    ]

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
        const { list = [], loading, form: { getFieldDecorator } } = this.props;
        return (
            <Card>
                <Form
                    onSubmit={this.onLoad}
                    layout="inline"
                    className="search-condition"
                >
                    <Form.Item>
                        {getFieldDecorator('searchKey')(
                            <Input style={{ minWidth: 285 }} placeholder="微信昵称/备注" />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('status')(
                            <Select placeholder="状态" style={{ minWidth: 120 }}>
                                <Option value="">全部</Option>
                                <Option value="online">在线</Option>
                                <Option value="offline">离线</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.onLoad}>查询</Button>
                    </Form.Item>
                </Form>
                <Table
                    columns={this.columns}
                    loading={loading}
                    dataSource={list}
                    rowKey={row => row.id}
                    pagination={{
                        onChange: this.emailSalePage,
                        pageSize: 10,
                        defaultCurrent: 1,
                        total: 10,
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
    form: {},
};
List.propTypes = {
    dispatch: PropTypes.any,
    loading: PropTypes.any,
    list: PropTypes.any,
    form: PropTypes.any,
};

export default Form.create({ name: 'wechatList' })(List);
