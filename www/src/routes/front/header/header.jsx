import React, { PropTypes } from 'react';
import Menu from '../../../components/menu/menu';
import style from './header.less';
import { Row, Col, Carousel, Tabs, Card, Layout} from 'antd';
const { Header, Footer, Sider, Content,Icon } = Layout;
const TabPane = Tabs.TabPane;

class Headers extends React.Component {
    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Header className={style.wrap}>
                        <div className={style.menu}>
                            <Menu />
                        </div>
                </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Row className={style.content}>
                        <Col span={12} offset={3}>
                            <Row>
                                <Card>
                                    <Carousel autoplay>
                                        <div>
                                            <img alt="example" src={`http://localhost:9000/avatar/1.jpg`} className={style.image}/>
                                            <h3>1</h3>
                                        </div>
                                        <div>
                                            <img alt="example" src={`http://localhost:9000/avatar/2.jpg`} className={style.image} />
                                            <h3>2</h3>
                                        </div>
                                        <div>
                                            <img alt="example" src={`http://localhost:9000/avatar/4.jpg`} className={style.image} />
                                            <h3>4</h3>
                                        </div>
                                    </Carousel>
                                </Card>
                            </Row>
                            <Row>
                                <Card title="新闻" extra={<a href="#">更多</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Row>
                            <Row>
                                <Card title="军事" extra={<a href="#">更多</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Row>
                            <Row>
                                <Card title="娱乐" extra={<a href="#">更多</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Row>
                        </Col>
                        <Col span={5} offset={1}>
                            <Row>
                                <Tabs type="card">
                                    <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
                                    <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
                                    <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
                                </Tabs>
                            </Row>
                            <Row>
                                <Card title="美食" extra={<a href="#">更多</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Row>
                            <Row>
                                <Card title="友情链接" extra={<a href="#">更多</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
            </Layout>
        );
    }
}

export default Headers;


