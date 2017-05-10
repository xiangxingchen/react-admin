import React, { PropTypes } from 'react';
import Menu from '../../../components/menu/menu';
import style from './header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class content extends React.Component {
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
                                <Tabs className={style.tabs}>
                                    <TabPane tab="最新动态" key="1">
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </TabPane>
                                    <TabPane tab="最热动态" key="2">
                                        <p>Card content1</p>
                                        <p>Card content1</p>
                                        <p>Card content1</p>
                                    </TabPane>
                                </Tabs>
                            </Row>
                            <Row>
                                <Card title="热门标签" extra={<a href="#">更多</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
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
                    <div>
                        <span>Ant Design ©2016 Created by</span>
                        <a href="https://github.com/xiangxingchen"><Icon type="github"/><em>chen xiang</em></a>
                    </div>
                </Footer>
            </Layout>
        );
    }
}

export default ontent;