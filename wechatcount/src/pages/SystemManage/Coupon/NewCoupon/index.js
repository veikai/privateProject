import { Modal, Tabs } from 'antd';
import { PureComponent } from 'react';
import Common from './Common';
import Agent from './Agent';

const { TabPane } = Tabs;

/** 新增优惠券 */
class NewCoupon extends PureComponent {
    /** 构造器 */
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    /** 取消弹框 */
    onCancel = () => {
        this.setState({ visible: false });
        // eslint-disable-next-line no-unused-expressions
        this.agent && this.agent.resetFields && this.agent.resetFields();
        // eslint-disable-next-line no-unused-expressions
        this.common && this.common.resetFields && this.common.resetFields();
    }

    /** 进行展示 */
    onShow = () => {
        this.setState({ visible: true });
    }

    /** 渲染 */
    render() {
        const { visible } = this.state;
        return (
            <Modal
                visible={visible}
                title={null}
                onCancel={this.onCancel}
                footer={null}
            >
                <Tabs
                    defaultActiveKey="common"
                    animated={false}
                    style={{ textAlign: 'center' }}
                >
                    <TabPane tab="普通优惠券" key="common">
                        <Common ref={(e) => { this.common = e; }} />
                    </TabPane>
                    <TabPane tab="代理商" key="agent">
                        <Agent ref={(e) => { this.agent = e; }} />
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}

export default NewCoupon;
