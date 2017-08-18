import React, { PropTypes } from 'react';
import {connect} from 'dva';
import PreContent from './preView';
import style from '../header/header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class tools extends React.Component {
    componentWillMount() {
        const {dispatch,params}=this.props;
        dispatch({
            type: 'posts/getFrontArticleList',
            payload: {pageInfo: {limit: 10, page: 1},condition:{tagId:params.id}}
        });
    }
    getContentView = (items,likeList) => {
        const {dispatch}=this.props;
        return (items||[]).map((data,index)=> {
            return <PreContent data={data} key={index} likeList={likeList} dispatch={dispatch}/>
        })
    };
    render() {
        const {posts,likeList,location}=this.props;
        const content = this.getContentView(posts.data,likeList);
        return (
            <Layout style={{ height: '100vh' }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Row className={style.content}>
                        <Col span={12} offset={3}>
                            <Row>
                                <Card title={location.query.name}>
                                    {content}
                                </Card>
                            </Row>
                        </Col>
                        <Col span={5} offset={1}>
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
        posts: state.posts.postsList,
        likeList:state.user.account.likeList,
    };
}

export default connect(mapStateToProps)(tools);
