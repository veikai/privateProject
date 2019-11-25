import React from 'react';
import PropTypes from 'prop-types';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

/** 系统管理页面 */
function SystemManage(props) {
    const { children } = props;
    return (
        <PageHeaderWrapper>
            {children}
        </PageHeaderWrapper>
    );
}

SystemManage.defaultProps = {
    children: null,
    // location: null,
};
SystemManage.propTypes = {
    children: PropTypes.object,
    // location: PropTypes.any,
};
export default SystemManage;
