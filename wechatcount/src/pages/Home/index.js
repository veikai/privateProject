import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import router from 'umi/router';
import Login from '@/components/Login';

const { Tab, Password, UserName, Submit } = Login;
/** 连接dva */
@connect()
/** 账号登录/手机号登录 */
class List extends PureComponent {
    /** 进行登录 */
    onSubmit = (err, values) => {
        if (!err) {
            const { dispatch } = this.props;
            const { name, password } = values;
            dispatch({
                type: 'login/login',
                payload: { name, password },
                callBack: () => router.push({ pathname: '/fullNetworkSearch' }),
            });
        }
    };

    /** 组件挂载 */
    render() {
        return (
            <div>this is list content</div>
        );
    }
}

List.defaultProps = { dispatch: null };
List.propTypes = { dispatch: PropTypes.any };

export default List;
