import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Table, Button, Input, Modal, Row, Col, Typography, message } from 'antd';
import moment from 'moment';
/** 新建优惠码弹框 */
import NewCoupon from './NewCoupon';
import { isOperate } from '@/utils/common';

const { confirm } = Modal;
const { Search } = Input;
const { Paragraph } = Typography;
/**  */
@connect(({
    coupon: { coupons, couponsTotal, keywords } = {},
    global: { packages = {}, admin: { role } } = {},
    loading,
}) => ({
    coupons,
    couponsTotal,
    keywords,
    packages,
    role,
    loading: loading.models.coupon,
}))

/** 优惠券管理页面 */
class Coupon extends Component {
    /** 优惠券表头内容 */
    columns=[
        { title: '兑换码', dataIndex: 'id', width: 350, render: text => <Paragraph style={{ marginBottom: 0 }} copyable>{text}</Paragraph> },
        { title: '金额', dataIndex: 'price', width: 60 },
        { title: '创建人', dataIndex: 'createAdmin', width: 80 },
        { title: '代理商', dataIndex: 'ownerAdmin', width: 150 },
        { title: '限定电话', dataIndex: 'mobile', width: 100 },
        {
            title: '限定套餐',
            dataIndex: 'packageId',
            width: 80,
            render: (text) => {
                const { packages: { vip = [] } = {} } = this.props;
                return vip[text] && vip[text].name;
            },
        },
        { title: '生效时间', dataIndex: 'validDate', width: 100, render: text => moment(text).format('YYYY-MM-DD') },
        { title: '失效时间', dataIndex: 'invalidDate', width: 100, render: text => moment(text).format('YYYY-MM-DD') },
        {
            title: '状态',
            dataIndex: 'status',
            width: 60,
            render: (text, record) => {
                if (Date.parse(record.invalidDate) <= new Date()) return '已失效';
                if (text == 'used') return '已使用';
                return '未使用';
            },
        },
        {
            title: '操作',
            key: 'Action',
            width: 50,
            render: (text, record) => {
                const { role } = this.props;
                if (isOperate(role)) {
                    return <Button type="link" style={{ padding: 0 }} onClick={() => this.delCoupon(record.id)}>删除</Button>;
                }
                return true;
            },
        },
    ]

    /** 构造函数 */
    constructor(props) {
        super(props);
        this.state = {
            keywords: '', // 搜索用户账号
            page: 1, // 当前的页数
        };
    }

    /** 搜索及翻页 */
    onPage=(page) => {
        const { dispatch } = this.props;
        const { keywords } = this.state;
        this.setState({ page });
        /** 获取列表数据 */
        dispatch({ type: 'coupon/getCoupons', payload: { page, pageSize: 10, keywords } });
    }

    /** 删除优惠券 */
    delCoupon=(id) => {
        const { dispatch, role } = this.props;
        const { page, keywords } = this.state;
        confirm({
            title: '确定删除？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                if (!isOperate(role)) return message('暂无权限');
                /** 删除优惠券 */
                await dispatch({ type: 'coupon/delCoupon', payload: { id } });
                /** 重新获取数据 */
                await dispatch({ type: 'coupon/getCoupons', payload: { page, pageSize: 10, keywords } });
                return true;
            },
        });
    }

    /** 组件挂载 */
    render() {
        const { coupons, couponsTotal, loading, role } = this.props;
        return (
            <Card border={false}>
                <Row>
                    {isOperate(role) && (
                        <Col span={2}>
                            <Button type="primary" onClick={() => this.newCoupon.onShow()}>新增优惠券</Button>
                        </Col>
                    )}
                    <Col span={22}>
                        <Search
                            placeholder="请输入账号"
                            onSearch={keywords => this.setState({ keywords }, () => this.onPage(1))}
                            style={{ maxWidth: 300 }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Table
                            columns={this.columns}
                            dataSource={coupons}
                            pagination={{ total: couponsTotal, onChange: this.onPage, size: 'small' }}
                            loading={loading}
                        />
                    </Col>
                </Row>
                <NewCoupon ref={(e) => { this.newCoupon = e; }} onOk={() => this.onPage(1)} />
            </Card>
        );
    }
}

Coupon.defaultProps = {
    coupons: [],
    packages: [],
    couponsTotal: 0,
    dispatch: () => {},
    role: '',
    loading: false,
};
Coupon.propTypes = {
    coupons: PropTypes.any,
    packages: PropTypes.any,
    couponsTotal: PropTypes.any,
    dispatch: PropTypes.any,
    role: PropTypes.any,
    loading: PropTypes.any,

};


export default Coupon;
