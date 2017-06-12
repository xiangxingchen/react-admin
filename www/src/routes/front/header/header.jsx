import React, { PropTypes } from 'react';
import {connect} from 'dva';
import Menu from '../../../components/menu/menu';
import style from './header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class Headers extends React.Component {
    state = {
        current: 'mail',
    };
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        const {children,posts} = this.props;
        return (
            <Layout style={{ height: '100vh' }}>
                <Header className={style.wrap}>
                        <div className={style.menu}>
                            <Menu />
                        </div>
                </Header>
                <div>{children}</div>
                <Footer style={{ textAlign: 'center' }}>
                    <div>
                        <span>企业后台管理系统©2017 Created by</span>
                        <a href="https://github.com/xiangxingchen"><Icon type="github"/><em>chen xiang</em></a>
                    </div>
                </Footer>
            </Layout>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts,
    };
}

export default connect(mapStateToProps)(Headers);


