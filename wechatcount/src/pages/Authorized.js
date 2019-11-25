import React from 'react';
import Redirect from 'umi/redirect';
// import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Authorized from '@/utils/Authorized';
/** 授权模块 */
function AuthComponent({ children }) {
    // const auth = getAuthority();
    // const isLogin = auth && auth[0] !== 'guest';// 是否登录的判断段条件
    return (
        <Authorized
            authority={['super', 'admin', 'agent', 'sale', 'customer']}// 登录条件
            noMatch={<Redirect to="/login" />}// 不满足上面的条件 就
        >
            {children}
        </Authorized>
    );
}

AuthComponent.defaultProps = { children: '' };
AuthComponent.propTypes = { children: PropTypes.any };
// export default connect(({ menu: menuModel, userPay: showModal }) => ({ routerData: menuModel.routerData, showModal }))(
//     AuthComponent,
// );
export default connect(({
    menu: { menuModel } = {},
    login: { visible } = {},
    userPay: { showModal, vipTime, vipPayType, payCode } = {},
    loading,
}) => ({
    menuModel,
    visible,
    showModal,
    vipTime,
    vipPayType,
    payCode,
    loginLoading: loading.models.login,
    userPayLoading: loading.models.userPay,
}))(AuthComponent);
