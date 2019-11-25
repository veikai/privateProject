import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Card, Row, Col, Statistic } from 'antd';

/** 用户管理界面 */
@connect(({
    crm: { anaTotal = {}, anaToday = {}, anaSeven = {} },
    login: { token } = {},
    global: { admin: { role = '' }, admins: { agent = {} } } = {},
    loading,
}) => ({
    anaTotal,
    anaToday,
    anaSeven,
    token,
    role,
    agent,
    loading: loading.models.userManage,
}))

class Analystic extends PureComponent {
    /** 组件挂载之前 */
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({ type: 'crm/getAnalystic' });
    }

    /** 组件挂载 */
    render() {
        const { anaTotal = {}, anaToday = {}, anaSeven = {} } = this.props;
        return (
            <Row gutter={20} style={{ marginBottom: 20 }}>
                <Col span={8}>
                    <Card>
                        <Row>
                            <Col span={6}><Statistic title="用户数" value={anaTotal.user} /></Col>
                            <Col span={6}><Statistic title="VIP数" value={anaTotal.vip} /></Col>
                            <Col span={6}><Statistic title="试用数" value={anaTotal.test} /></Col>
                            <Col span={6}><Statistic title="下单数" value={anaTotal.charge} /></Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Row>
                            <Col span={8}><Statistic title="今日登录" value={anaToday.login} /></Col>
                            <Col span={8}><Statistic title="今日注册" value={anaToday.register} /></Col>
                            <Col span={8}><Statistic title="今日下单" value={anaToday.charge} /></Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Row>
                            <Col span={8}><Statistic title="七日登录" value={anaSeven.login} /></Col>
                            <Col span={8}><Statistic title="七日注册" value={anaSeven.register} /></Col>
                            <Col span={8}><Statistic title="七日下单" value={anaSeven.charge} /></Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    }
}

Analystic.defaultProps = {
    dispatch: null,
    anaTotal: {},
    anaToday: {},
    anaSeven: {},
};
Analystic.propTypes = {
    dispatch: PropTypes.any,
    anaTotal: PropTypes.any,
    anaToday: PropTypes.any,
    anaSeven: PropTypes.any,
};
export default Analystic;
