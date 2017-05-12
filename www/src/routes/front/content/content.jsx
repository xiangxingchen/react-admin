import React, { PropTypes } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'
import style from '../header/header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class content extends React.Component {
    state = {
        current: 'mail',
    };
    componentWillMount() {
        // this.props.dispatch({
        //     type: 'posts/getPostsList',
        //     payload: {pageInfo: {limit: 10, page: 1}}
        // });
        this.props.dispatch({type: 'posts/getImageList'});
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        const {posts}=this.props;
        console.log(posts.imagePostList);
        const items=[];
        posts.imagePostList.map(item => {
            items.push(<Link to={`/detail/${item._id}`} key={item._id}>
                <img src={item.images[0].url} className={style.image}/>
                <div className={style.title}>
                <h3>{item.title}</h3>
                </div>
            </Link>)
        })
        return (
            <Layout style={{ height: '100vh' }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Row className={style.content}>
                        <Col span={12} offset={3}>
                            <Row>
                                <Card bodyStyle={{ padding: 0 }}>
                                    <Carousel autoplay>
                                        {posts.imagePostList.length > 0 ? items : <div></div>}
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
            </Layout>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts,
    };
}

export default connect(mapStateToProps)(content);