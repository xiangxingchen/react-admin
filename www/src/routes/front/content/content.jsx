import React, { PropTypes } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import style from '../header/header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon, Popover, Button } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
moment.locale(window.navigator.language);

class content extends React.Component {
    state = {
        current: 'mail',
    };
    componentWillMount() {
        this.props.dispatch({
            type: 'posts/getPostsList',
            payload: {pageInfo: {limit: 10, page: 1}}
        });
        this.props.dispatch({type: 'posts/getImageList'});
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    getContent = (items) => {
        const content = [];
        return (items||[]).map((data,index)=> {
            const cont=(
                <div>
                    <p>Content</p>
                    <p>Content</p>
                </div>
            );
            // content.push(
                return (<Row key={data._id} className={style.preView}>
                    <Link to={`post/${data._id}`}>
                        <Col span={20}>
                            <Row>
                                <Col span={2} key={data.author}>
                                    <Popover content={cont}>
                                        {data.author}
                                    </Popover>
                                </Col>
                                <Col span={2} key={data.tags[0].id}>
                                    <Popover content={cont}>
                                        {data.tags[0].name}
                                    </Popover>
                                </Col>
                                <span>{moment(data.publish_time).fromNow()} </span>
                            </Row>
                            <a href={`post/${data._id}`}>
                                <h1>{data.title}</h1>
                            </a>
                            <ul>
                                <li>
                                    <a><Icon type="like" /><span>{data.like_count}</span></a>
                                    <a><Icon type="message" /><span>{data.comment_count}</span></a>
                                    <a><Icon type="eye" /><span>{data.comment_count}</span></a>
                                </li>
                            </ul></Col>
                        <Col span={4}>
                            {data.images[0] && <img src={data.images[0].url} className={style.contentImage}/>}
                        </Col>
                    </Link>
                </Row>)
            // )
        })
        // return content;
    };
    render() {
        const {posts}=this.props;
        const datasource = posts.postsList.data;
        const data = datasource && datasource[0];
        const content = this.getContent(datasource);
        console.log("content",content);


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
                                <Card title="新闻" extra={<a href="#">更多</a>} bodyStyle={{ padding: 0 }}>
                                    {datasource && datasource.length > 0 ? content : <div></div>}
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