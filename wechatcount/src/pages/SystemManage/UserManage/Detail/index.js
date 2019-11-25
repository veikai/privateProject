import { Card, Tabs } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { isEmpty } from '@/utils/common';

import User from './User';
import Order from './Order';


/** 用户详情页 */
@connect(({
    crm,
    loading,
}) => ({
    ...crm,
    userLoading: loading.models.user,
}))

class Detail extends PureComponent {
    /** 加载之前 */
    componentWillMount() {
        const { dispatch, location: { query: { id } } } = this.props;
        if (!isEmpty(id)) {
            dispatch({ type: 'crm/getUserInfo', payload: { id } });
        } else {
            dispatch({ type: 'crm/emptyUserInfo' });
        }
    }

    /** 组件卸载 */
    componentWillUnmount() {
        const { dispatch } = this.props;
        /** 清空信息 */
        dispatch({ type: 'crm/emptyUserInfo' });
        /** 调取列表信息 */
        if (window.crmList) {
            window.crmList.onLoad();
            window.crmList = null;
        }
    }

    /** 组件挂载 */
    render() {
        return (
            <Card>
                <Tabs defaultActiveKey="user" animated={false}>
                    <Tabs.TabPane tab="用户详情" key="user">
                        <User />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="合同详情" key="order">
                        <Order />
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        );
    }
}

Detail.defaultProps = {
    dispatch: null,
    location: '',
    query: '',
};

Detail.propTypes = {
    dispatch: PropTypes.any,
    location: PropTypes.any,
    query: PropTypes.any,
};
export default Detail;
